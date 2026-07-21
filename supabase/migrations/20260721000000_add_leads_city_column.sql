-- ============================================================
-- FIX: 'leads' table is missing the 'city' column.
--
-- The admin "Novo Lead" form, LeadCard, and the leads API routes
-- (POST /api/admin/leads, PATCH /api/admin/leads/[id]) all read/write
-- a `city` field, and both `clients` and `quotes` already have this
-- column — but `leads` never got it, causing:
--   "Could not find the 'city' column of 'leads' in the schema cache"
-- on every attempt to create or edit a lead with a city filled in.
-- ============================================================

alter table leads add column if not exists city text;
