-- ============================================================
-- RLS POLICIES
-- ============================================================

-- user_profiles
alter table user_profiles enable row level security;

create policy "users can read own profile"
  on user_profiles for select
  using (auth.uid() = id);

create policy "admins can read all profiles"
  on user_profiles for select
  using (
    exists (select 1 from user_profiles up where up.id = auth.uid() and up.role = 'admin')
  );

create policy "admins can update profiles"
  on user_profiles for update
  using (
    exists (select 1 from user_profiles up where up.id = auth.uid() and up.role = 'admin')
  );

-- clients
alter table clients enable row level security;

create policy "staff can read clients"
  on clients for select
  using (auth.role() = 'authenticated');

create policy "staff can write clients"
  on clients for all
  using (auth.role() = 'authenticated');

create policy "client can see own record"
  on clients for select
  using (portal_user_id = auth.uid());

-- leads
alter table leads enable row level security;

create policy "public can insert leads"
  on leads for insert
  with check (true);

create policy "staff can read leads"
  on leads for select
  using (auth.role() = 'authenticated');

create policy "staff can update leads"
  on leads for update
  using (auth.role() = 'authenticated');

-- lead_interactions
alter table lead_interactions enable row level security;

create policy "staff can read interactions"
  on lead_interactions for select
  using (auth.role() = 'authenticated');

create policy "staff can insert interactions"
  on lead_interactions for insert
  with check (auth.role() = 'authenticated');

-- quotes
alter table quotes enable row level security;

create policy "public can insert quotes"
  on quotes for insert
  with check (true);

create policy "staff can read quotes"
  on quotes for select
  using (auth.role() = 'authenticated');

create policy "staff can update quotes"
  on quotes for update
  using (auth.role() = 'authenticated');

create policy "clients can see own quotes"
  on quotes for select
  using (
    client_id in (
      select id from clients where portal_user_id = auth.uid()
    )
  );

-- projects
alter table projects enable row level security;

create policy "staff can read projects"
  on projects for select
  using (auth.role() = 'authenticated');

create policy "staff can write projects"
  on projects for all
  using (auth.role() = 'authenticated');

create policy "clients can see own projects"
  on projects for select
  using (
    client_id in (
      select id from clients where portal_user_id = auth.uid()
    )
  );

-- project_milestones
alter table project_milestones enable row level security;

create policy "staff can manage milestones"
  on project_milestones for all
  using (auth.role() = 'authenticated');

create policy "clients can read milestones"
  on project_milestones for select
  using (
    project_id in (
      select p.id from projects p
      join clients c on c.id = p.client_id
      where c.portal_user_id = auth.uid()
    )
  );

-- portfolio_items
alter table portfolio_items enable row level security;

create policy "public can read published portfolio"
  on portfolio_items for select
  using (published = true);

create policy "staff can manage portfolio"
  on portfolio_items for all
  using (auth.role() = 'authenticated');

-- services
alter table services enable row level security;

create policy "public can read services"
  on services for select
  using (true);

create policy "admin can write services"
  on services for all
  using (
    exists (select 1 from user_profiles up where up.id = auth.uid() and up.role = 'admin')
  );

-- testimonials
alter table testimonials enable row level security;

create policy "public can read published testimonials"
  on testimonials for select
  using (published = true);

create policy "admin can manage testimonials"
  on testimonials for all
  using (
    exists (select 1 from user_profiles up where up.id = auth.uid() and up.role = 'admin')
  );

-- site_settings
alter table site_settings enable row level security;

create policy "public can read settings"
  on site_settings for select
  using (true);

create policy "admin can update settings"
  on site_settings for update
  using (
    exists (select 1 from user_profiles up where up.id = auth.uid() and up.role = 'admin')
  );
