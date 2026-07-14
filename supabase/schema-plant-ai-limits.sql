-- Plant AI weekly usage limits. Run this once in Supabase (after schema.sql
-- and schema-plant-ai.sql): Dashboard > SQL Editor > New query > paste > Run.
--
-- Tiers (set manually for now — no live Patreon integration yet):
--   'free'      — 10 diagnoses / week   (default for everyone)
--   'supporter' — 100 diagnoses / week  (Patreon $20-$99/mo)
--   'patron'    — unlimited             (Patreon $100+/mo)
--
-- To upgrade a supporter: Supabase Dashboard > Table Editor > profiles >
-- find their row > set `membership_tier` to 'supporter' or 'patron'.
-- Weeks reset Sunday 00:00 UTC.

alter table public.profiles
  add column if not exists membership_tier text not null default 'free'
  check (membership_tier in ('free', 'supporter', 'patron'));

create table if not exists public.plant_ai_usage (
  user_id uuid references public.profiles(id) on delete cascade not null,
  week_start date not null,
  count integer not null default 0,
  primary key (user_id, week_start)
);

alter table public.plant_ai_usage enable row level security;

create policy "Users can view their own Plant AI usage"
  on public.plant_ai_usage for select using (auth.uid() = user_id);

create policy "Users can insert their own Plant AI usage"
  on public.plant_ai_usage for insert with check (auth.uid() = user_id);

create policy "Users can update their own Plant AI usage"
  on public.plant_ai_usage for update using (auth.uid() = user_id);

-- Atomically increments (or creates) this week's usage row for the calling
-- user and returns the new count. security definer so the upsert works
-- regardless of RLS, but auth.uid() still resolves to the caller's own JWT.
create or replace function public.increment_plant_ai_usage(p_week_start date)
returns integer
language plpgsql
security definer set search_path = public
as $$
declare
  new_count integer;
begin
  insert into public.plant_ai_usage (user_id, week_start, count)
  values (auth.uid(), p_week_start, 1)
  on conflict (user_id, week_start)
  do update set count = public.plant_ai_usage.count + 1
  returning count into new_count;
  return new_count;
end;
$$;

grant execute on function public.increment_plant_ai_usage(date) to authenticated;
