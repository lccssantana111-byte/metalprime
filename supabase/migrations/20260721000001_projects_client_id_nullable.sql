-- ============================================================
-- FIX: 'projects.client_id' is NOT NULL, but the "Novo Projeto" form
-- offers "Sem cliente vinculado" (no client) as a valid option,
-- sending client_id: null — which violates the not-null constraint
-- and blocks project creation with a database error.
--
-- Making it nullable matches what the UI already allows: a project
-- can exist without being linked to a client record yet.
-- ============================================================

alter table projects alter column client_id drop not null;
