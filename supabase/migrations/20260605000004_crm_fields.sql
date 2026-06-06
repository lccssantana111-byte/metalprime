-- Adiciona campos de empresa e observações ao CRM de leads
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS company TEXT,
  ADD COLUMN IF NOT EXISTS notes   TEXT;
