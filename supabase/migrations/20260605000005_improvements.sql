-- ============================================================
-- Migration 005 — Platform improvements
-- ============================================================

-- 1. Add lead_score computed column support
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS lead_score  INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS score_label TEXT    DEFAULT 'Frio';

-- Index for sorting leads by score in CRM views
CREATE INDEX IF NOT EXISTS idx_leads_score ON leads (lead_score DESC);

-- 2. Index for stale lead queries (updated_at + status)
CREATE INDEX IF NOT EXISTS idx_leads_stale
  ON leads (status, updated_at)
  WHERE status IN ('novo', 'em_contato', 'proposta_enviada', 'em_negociacao');

-- 3. Index for unassigned active leads
CREATE INDEX IF NOT EXISTS idx_leads_unassigned
  ON leads (assigned_to, status)
  WHERE assigned_to IS NULL AND status IN ('novo', 'em_contato', 'proposta_enviada', 'em_negociacao');

-- 4. Index for deduplication by phone
CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads (phone);

-- 5. Full-text search on lead name + company
CREATE INDEX IF NOT EXISTS idx_leads_name_trgm  ON leads USING gin (name  gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_leads_company_trgm ON leads USING gin (company gin_trgm_ops);

-- 6. Portfolio sort_order index (for drag-and-drop reorder)
CREATE INDEX IF NOT EXISTS idx_portfolio_sort ON portfolio_items (sort_order ASC);

-- 7. site_settings — ensure key is unique (idempotent)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE tablename = 'site_settings' AND indexname = 'site_settings_key_key'
  ) THEN
    ALTER TABLE site_settings ADD CONSTRAINT site_settings_key_key UNIQUE (key);
  END IF;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- 8. Function: automatically compute lead_score on INSERT/UPDATE
CREATE OR REPLACE FUNCTION compute_lead_score()
RETURNS TRIGGER AS $$
DECLARE
  score INTEGER := 0;
  lbl   TEXT    := 'Frio';
BEGIN
  -- Service
  score := score + CASE NEW.service
    WHEN 'estruturas_metalicas' THEN 30
    WHEN 'portoes'              THEN 25
    WHEN 'escadas'              THEN 20
    WHEN 'sob_medida'           THEN 20
    WHEN 'corrimoes'            THEN 15
    WHEN 'grades_e_cercas'      THEN 10
    ELSE 5
  END;

  -- Client type
  score := score + CASE NEW.client_type
    WHEN 'construtora'    THEN 30
    WHEN 'condominio'     THEN 25
    WHEN 'empresa'        THEN 20
    WHEN 'pessoa_fisica'  THEN 10
    ELSE 5
  END;

  -- Source
  score := score + CASE NEW.source
    WHEN 'indicacao' THEN 20
    WHEN 'website'   THEN 10
    WHEN 'google'    THEN 10
    WHEN 'instagram' THEN 8
    WHEN 'facebook'  THEN 8
    WHEN 'manual'    THEN 5
    ELSE 5
  END;

  -- Email provided
  IF NEW.email IS NOT NULL AND NEW.email <> '' THEN
    score := score + 10;
  END IF;

  -- Company provided
  IF NEW.company IS NOT NULL AND NEW.company <> '' THEN
    score := score + 5;
  END IF;

  -- Label
  lbl := CASE
    WHEN score >= 60 THEN 'Quente'
    WHEN score >= 35 THEN 'Morno'
    ELSE 'Frio'
  END;

  NEW.lead_score  := score;
  NEW.score_label := lbl;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_lead_score ON leads;
CREATE TRIGGER trg_lead_score
  BEFORE INSERT OR UPDATE OF service, client_type, source, email, company
  ON leads
  FOR EACH ROW EXECUTE FUNCTION compute_lead_score();

-- Backfill existing leads
UPDATE leads SET updated_at = updated_at; -- triggers fire on all rows
