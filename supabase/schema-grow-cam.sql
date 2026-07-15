-- Grow cam live snapshot — run this once in Supabase (Dashboard > SQL
-- Editor > New query > paste > Run).
--
-- Holds a single image, `latest.jpg`, that the Home page hero displays as an
-- auto-refreshing "live" view into the grow tent. There's no public upload
-- policy here on purpose — only a script running on your own machine (using
-- the Supabase *service role* key, which bypasses RLS) is meant to overwrite
-- this file. See scripts/upload-grow-cam-snapshot.mjs.

insert into storage.buckets (id, name, public)
values ('grow-cam', 'grow-cam', true)
on conflict (id) do nothing;

create policy "Grow cam snapshot is publicly viewable"
  on storage.objects for select
  using (bucket_id = 'grow-cam');
