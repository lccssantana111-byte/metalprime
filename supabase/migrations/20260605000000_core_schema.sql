-- ============================================================
-- EXTENSIONS
-- ============================================================
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm";

-- ============================================================
-- ENUMS
-- ============================================================
create type service_type as enum (
  'portoes',
  'grades_e_cercas',
  'escadas',
  'corrimoes',
  'estruturas_metalicas',
  'sob_medida'
);

create type lead_status as enum (
  'novo',
  'em_contato',
  'proposta_enviada',
  'em_negociacao',
  'ganho',
  'perdido',
  'sem_interesse'
);

create type quote_status as enum (
  'pendente',
  'em_analise',
  'proposta_enviada',
  'aprovado',
  'recusado',
  'expirado'
);

create type project_status as enum (
  'planejamento',
  'medicao',
  'producao',
  'instalacao',
  'concluido',
  'pausado',
  'cancelado'
);

create type client_type as enum (
  'pessoa_fisica',
  'condominio',
  'construtora',
  'empresa'
);

create type user_role as enum (
  'admin',
  'comercial',
  'viewer'
);

-- ============================================================
-- USER PROFILES
-- ============================================================
create table user_profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  full_name    text not null,
  role         user_role not null default 'viewer',
  phone        text,
  avatar_url   text,
  is_active    boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into user_profiles (id, full_name, role)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.email), 'viewer');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ============================================================
-- CLIENTS
-- ============================================================
create table clients (
  id             uuid primary key default gen_random_uuid(),
  type           client_type not null default 'pessoa_fisica',
  name           text not null,
  document       text,
  email          text,
  phone          text not null,
  phone_alt      text,
  address        text,
  city           text,
  state          text default 'SP',
  cep            text,
  notes          text,
  portal_user_id uuid references auth.users(id) on delete set null,
  portal_enabled boolean not null default false,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index idx_clients_name on clients using gin (name gin_trgm_ops);
create index idx_clients_phone on clients (phone);
create index idx_clients_type on clients (type);

-- ============================================================
-- LEADS
-- ============================================================
create table leads (
  id              uuid primary key default gen_random_uuid(),
  client_id       uuid references clients(id) on delete set null,
  name            text not null,
  phone           text not null,
  email           text,
  client_type     client_type not null default 'pessoa_fisica',
  service         service_type,
  source          text not null default 'website',
  message         text,
  status          lead_status not null default 'novo',
  assigned_to     uuid references user_profiles(id) on delete set null,
  converted_at    timestamptz,
  lost_reason     text,
  utm_source      text,
  utm_medium      text,
  utm_campaign    text,
  utm_content     text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index idx_leads_status on leads (status);
create index idx_leads_service on leads (service);
create index idx_leads_created_at on leads (created_at desc);
create index idx_leads_assigned_to on leads (assigned_to);

-- ============================================================
-- LEAD INTERACTIONS
-- ============================================================
create table lead_interactions (
  id            uuid primary key default gen_random_uuid(),
  lead_id       uuid not null references leads(id) on delete cascade,
  author_id     uuid references user_profiles(id) on delete set null,
  type          text not null default 'note',
  content       text not null,
  metadata      jsonb default '{}',
  created_at    timestamptz not null default now()
);

create index idx_interactions_lead_id on lead_interactions (lead_id, created_at desc);

-- ============================================================
-- QUOTES
-- ============================================================
create table quotes (
  id               uuid primary key default gen_random_uuid(),
  lead_id          uuid references leads(id) on delete set null,
  client_id        uuid references clients(id) on delete set null,
  name             text not null,
  phone            text not null,
  email            text,
  service          service_type not null,
  description      text,
  specs            jsonb default '{}',
  address          text,
  city             text,
  reference_images text[] default '{}',
  estimated_value  numeric(12,2),
  final_value      numeric(12,2),
  status           quote_status not null default 'pendente',
  assigned_to      uuid references user_profiles(id) on delete set null,
  valid_until      date,
  notes            text,
  proposal_url     text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index idx_quotes_status on quotes (status);
create index idx_quotes_service on quotes (service);
create index idx_quotes_created_at on quotes (created_at desc);
create index idx_quotes_lead_id on quotes (lead_id);

-- ============================================================
-- PROJECTS
-- ============================================================
create table projects (
  id               uuid primary key default gen_random_uuid(),
  quote_id         uuid references quotes(id) on delete set null,
  client_id        uuid not null references clients(id) on delete restrict,
  name             text not null,
  description      text,
  service          service_type not null,
  status           project_status not null default 'planejamento',
  start_date       date,
  estimated_end    date,
  actual_end       date,
  contract_value   numeric(12,2) not null,
  amount_paid      numeric(12,2) not null default 0,
  assigned_to      uuid references user_profiles(id) on delete set null,
  address          text,
  city             text,
  internal_notes   text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index idx_projects_status on projects (status);
create index idx_projects_client_id on projects (client_id);
create index idx_projects_service on projects (service);

-- ============================================================
-- PROJECT MILESTONES
-- ============================================================
create table project_milestones (
  id           uuid primary key default gen_random_uuid(),
  project_id   uuid not null references projects(id) on delete cascade,
  title        text not null,
  description  text,
  due_date     date,
  completed_at timestamptz,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now()
);

create index idx_milestones_project_id on project_milestones (project_id, sort_order);

-- ============================================================
-- PORTFOLIO ITEMS
-- ============================================================
create table portfolio_items (
  id              uuid primary key default gen_random_uuid(),
  project_id      uuid references projects(id) on delete set null,
  slug            text not null unique,
  title           text not null,
  short_desc      text,
  description     text,
  service         service_type not null,
  client_name     text,
  city            text,
  year            integer,
  featured        boolean not null default false,
  published       boolean not null default false,
  cover_image     text not null,
  images          text[] not null default '{}',
  seo_title       text,
  seo_description text,
  sort_order      integer not null default 0,
  view_count      integer not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index idx_portfolio_slug on portfolio_items (slug);
create index idx_portfolio_service on portfolio_items (service);
create index idx_portfolio_featured on portfolio_items (featured) where published = true;
create index idx_portfolio_published on portfolio_items (published, sort_order);

-- ============================================================
-- SERVICES (CMS)
-- ============================================================
create table services (
  id              uuid primary key default gen_random_uuid(),
  slug            service_type not null unique,
  name            text not null,
  tagline         text,
  description     text,
  hero_image      text,
  features        jsonb default '[]',
  faq             jsonb default '[]',
  seo_title       text,
  seo_description text,
  sort_order      integer not null default 0,
  updated_at      timestamptz not null default now()
);

-- ============================================================
-- TESTIMONIALS
-- ============================================================
create table testimonials (
  id           uuid primary key default gen_random_uuid(),
  client_name  text not null,
  client_role  text,
  content      text not null,
  rating       integer check (rating between 1 and 5) default 5,
  service      service_type,
  avatar_url   text,
  published    boolean not null default false,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now()
);

create index idx_testimonials_published on testimonials (published, sort_order);

-- ============================================================
-- SITE SETTINGS
-- ============================================================
create table site_settings (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz not null default now()
);

insert into site_settings (key, value) values
  ('company_name',     '"Metalprime Serralheria"'),
  ('company_phone',    '"(11) 99999-9999"'),
  ('whatsapp_number',  '"5511999999999"'),
  ('company_email',    '"contato@metalprime.com.br"'),
  ('company_address',  '"Rua das Indústrias, 123 - São Paulo, SP"'),
  ('company_tagline',  '"Estruturas de aço com precisão e elegância"'),
  ('google_maps_url',  '"https://maps.google.com/?q=-23.55,-46.63"'),
  ('social_instagram', '"https://instagram.com/metalprime"'),
  ('social_facebook',  '"https://facebook.com/metalprime"'),
  ('hero_video_url',   'null');

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_updated_at before update on user_profiles  for each row execute procedure set_updated_at();
create trigger set_updated_at before update on clients         for each row execute procedure set_updated_at();
create trigger set_updated_at before update on leads           for each row execute procedure set_updated_at();
create trigger set_updated_at before update on quotes          for each row execute procedure set_updated_at();
create trigger set_updated_at before update on projects        for each row execute procedure set_updated_at();
create trigger set_updated_at before update on portfolio_items for each row execute procedure set_updated_at();
create trigger set_updated_at before update on services        for each row execute procedure set_updated_at();
