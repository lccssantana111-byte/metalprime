-- ============================================================
-- FIX: "staff can ..." policies checked auth.role() = 'authenticated'
-- instead of an actual staff role. Any logged-in user — including
-- corporate portal clients — is 'authenticated' in Supabase, so these
-- policies let a client read/write clients, leads, lead_interactions,
-- quotes, projects, project_milestones and portfolio_items belonging
-- to OTHER clients via the public anon key + their own session,
-- bypassing the app's own role checks (which only guard the Next.js
-- API routes, not direct PostgREST access).
--
-- Not currently exploited through the app UI (all admin reads go
-- through the service-role client), but exploitable directly against
-- the Supabase REST API by anyone with a valid corporate-portal login.
-- ============================================================

-- clients
drop policy if exists "staff can read clients" on clients;
create policy "staff can read clients"
  on clients for select
  using (exists (select 1 from user_profiles up where up.id = auth.uid() and up.role in ('admin', 'comercial', 'viewer')));

drop policy if exists "staff can write clients" on clients;
create policy "staff can write clients"
  on clients for all
  using (exists (select 1 from user_profiles up where up.id = auth.uid() and up.role in ('admin', 'comercial')));

-- leads
drop policy if exists "staff can read leads" on leads;
create policy "staff can read leads"
  on leads for select
  using (exists (select 1 from user_profiles up where up.id = auth.uid() and up.role in ('admin', 'comercial', 'viewer')));

drop policy if exists "staff can update leads" on leads;
create policy "staff can update leads"
  on leads for update
  using (exists (select 1 from user_profiles up where up.id = auth.uid() and up.role in ('admin', 'comercial')));

-- lead_interactions
drop policy if exists "staff can read interactions" on lead_interactions;
create policy "staff can read interactions"
  on lead_interactions for select
  using (exists (select 1 from user_profiles up where up.id = auth.uid() and up.role in ('admin', 'comercial', 'viewer')));

drop policy if exists "staff can insert interactions" on lead_interactions;
create policy "staff can insert interactions"
  on lead_interactions for insert
  with check (exists (select 1 from user_profiles up where up.id = auth.uid() and up.role in ('admin', 'comercial')));

-- quotes
drop policy if exists "staff can read quotes" on quotes;
create policy "staff can read quotes"
  on quotes for select
  using (exists (select 1 from user_profiles up where up.id = auth.uid() and up.role in ('admin', 'comercial', 'viewer')));

drop policy if exists "staff can update quotes" on quotes;
create policy "staff can update quotes"
  on quotes for update
  using (exists (select 1 from user_profiles up where up.id = auth.uid() and up.role in ('admin', 'comercial')));

-- projects
drop policy if exists "staff can read projects" on projects;
create policy "staff can read projects"
  on projects for select
  using (exists (select 1 from user_profiles up where up.id = auth.uid() and up.role in ('admin', 'comercial', 'viewer')));

drop policy if exists "staff can write projects" on projects;
create policy "staff can write projects"
  on projects for all
  using (exists (select 1 from user_profiles up where up.id = auth.uid() and up.role in ('admin', 'comercial')));

-- project_milestones
drop policy if exists "staff can manage milestones" on project_milestones;
create policy "staff can manage milestones"
  on project_milestones for all
  using (exists (select 1 from user_profiles up where up.id = auth.uid() and up.role in ('admin', 'comercial')));

-- portfolio_items
drop policy if exists "staff can manage portfolio" on portfolio_items;
create policy "staff can manage portfolio"
  on portfolio_items for all
  using (exists (select 1 from user_profiles up where up.id = auth.uid() and up.role in ('admin', 'comercial')));
