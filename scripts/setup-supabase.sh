#!/usr/bin/env bash
# ──────────────────────────────────────────────
# Metalprime — Supabase setup script
# Uso: bash scripts/setup-supabase.sh
# ──────────────────────────────────────────────
set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="$ROOT/.env.local"
MIGRATIONS_DIR="$ROOT/supabase/migrations"

echo ""
echo "┌─────────────────────────────────────────┐"
echo "│     Metalprime — Supabase Setup         │"
echo "└─────────────────────────────────────────┘"
echo ""

# ── 1. Coletar credenciais ──────────────────────
echo "Cole as credenciais do Supabase Dashboard:"
echo "  Settings → API"
echo ""

read -rp "  Project URL (https://xxxx.supabase.co): " SUPABASE_URL
read -rp "  anon public key: " ANON_KEY
read -rsp "  service_role secret key: " SERVICE_KEY
echo ""

read -rp "  Número WhatsApp (ex: 5511999999999): " WA_NUMBER
read -rp "  URL do site (ex: http://localhost:3000): " SITE_URL

# ── 2. Gerar segredo ISR ────────────────────────
REVALIDATE_SECRET=$(openssl rand -hex 32)

# ── 3. Escrever .env.local ──────────────────────
cat > "$ENV_FILE" <<EOF
# ── Supabase ─────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=${SUPABASE_URL}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${ANON_KEY}
SUPABASE_SERVICE_ROLE_KEY=${SERVICE_KEY}

# ── Site ─────────────────────────────────────────
NEXT_PUBLIC_SITE_URL=${SITE_URL}
NEXT_PUBLIC_BRAND_NAME=Metalprime Serralheria

# ── WhatsApp ──────────────────────────────────────
NEXT_PUBLIC_WHATSAPP_NUMBER=${WA_NUMBER}

# ── ISR Revalidation ─────────────────────────────
REVALIDATE_SECRET=${REVALIDATE_SECRET}

# ── Analytics (opcional) ──────────────────────────
# NEXT_PUBLIC_GTAG_ID=G-XXXXXXXXXX
EOF

echo ""
echo "✓ .env.local criado"

# ── 4. Rodar migrations via Supabase CLI ────────
PROJECT_REF=$(echo "$SUPABASE_URL" | sed 's|https://||' | cut -d'.' -f1)

echo ""
echo "Rodando migrations no projeto: $PROJECT_REF"
echo "(pode pedir login Supabase na primeira vez)"
echo ""

cd "$ROOT"

supabase link --project-ref "$PROJECT_REF" 2>/dev/null || \
  npx supabase link --project-ref "$PROJECT_REF"

supabase db push 2>/dev/null || \
  npx supabase db push

echo ""
echo "┌─────────────────────────────────────────┐"
echo "│  Setup concluído!                       │"
echo "│                                         │"
echo "│  Próximos passos:                       │"
echo "│  1. npm run dev                         │"
echo "│  2. Acesse /admin/login e crie          │"
echo "│     um usuário admin no Supabase Auth   │"
echo "└─────────────────────────────────────────┘"
echo ""
