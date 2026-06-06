-- Portfolio images (public)
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true);

-- Quote reference images (private)
insert into storage.buckets (id, name, public)
values ('quote-attachments', 'quote-attachments', false);

-- Proposal PDFs (private)
insert into storage.buckets (id, name, public)
values ('proposals', 'proposals', false);

-- Service page images (public)
insert into storage.buckets (id, name, public)
values ('services', 'services', true);

-- Portfolio bucket policies
create policy "public can read portfolio images"
  on storage.objects for select
  using (bucket_id = 'portfolio');

create policy "staff can upload portfolio images"
  on storage.objects for insert
  with check (bucket_id = 'portfolio' and auth.role() = 'authenticated');

create policy "staff can delete portfolio images"
  on storage.objects for delete
  using (bucket_id = 'portfolio' and auth.role() = 'authenticated');

-- Quote attachments
create policy "anyone can upload quote attachments"
  on storage.objects for insert
  with check (bucket_id = 'quote-attachments');

create policy "staff can read quote attachments"
  on storage.objects for select
  using (bucket_id = 'quote-attachments' and auth.role() = 'authenticated');

-- Services bucket
create policy "public can read service images"
  on storage.objects for select
  using (bucket_id = 'services');

create policy "admin can manage service images"
  on storage.objects for all
  using (
    bucket_id = 'services' and
    exists (select 1 from user_profiles up where up.id = auth.uid() and up.role = 'admin')
  );
