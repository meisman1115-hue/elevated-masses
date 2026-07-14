-- Plant AI submissions — run this once in Supabase after schema.sql.
-- Dashboard > SQL Editor > New query > paste this file > Run.
--
-- This stores every photo + symptoms + diagnosis submitted through /plant-ai,
-- building the grower-sourced dataset. Submissions are allowed from anyone
-- (signed in or not) since Plant AI itself doesn't require an account —
-- but if the visitor IS signed in, we record who submitted it.

create table if not exists public.plant_submissions (
  id uuid default gen_random_uuid() primary key,
  author_id uuid references public.profiles(id) on delete set null,
  plant_type text,
  symptoms text,
  image_url text,
  diagnosis jsonb,
  created_at timestamptz default now()
);

alter table public.plant_submissions enable row level security;

-- Anyone can submit (this tool is open, no account required).
create policy "Anyone can submit a plant diagnosis"
  on public.plant_submissions for insert with check (true);

-- Submissions are not publicly browsable — only the record owner (via the
-- Supabase dashboard/service role) reviews them to improve the tool.
create policy "Users can view their own submissions"
  on public.plant_submissions for select using (auth.uid() = author_id);

create index if not exists plant_submissions_created_at_idx on public.plant_submissions (created_at desc);

-- ---------------------------------------------------------------------------
-- Storage bucket for submitted plant photos.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('plant-photos', 'plant-photos', true)
on conflict (id) do nothing;

create policy "Anyone can upload a plant photo"
  on storage.objects for insert
  with check (bucket_id = 'plant-photos');

create policy "Plant photos are publicly viewable"
  on storage.objects for select
  using (bucket_id = 'plant-photos');
