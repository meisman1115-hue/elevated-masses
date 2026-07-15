-- Updates membership tiers to match the new Patreon tier structure (Seedling
-- $5, Vegging $20, Flowering $50, Harvest $100). Run once in Supabase
-- (Dashboard > SQL Editor > New query > paste > Run), after
-- schema-plant-ai-limits.sql has already been applied.
--
-- New weekly Plant AI limits:
--   'free'      — 10 diagnoses/week   (default for everyone)
--   'seedling'  — 25 diagnoses/week   (Patreon $5/mo)
--   'vegging'   — 100 diagnoses/week  (Patreon $20/mo)
--   'flowering' — 100 diagnoses/week  (Patreon $50/mo)
--   'harvest'   — unlimited           (Patreon $100/mo)
--
-- To set a member's tier: Supabase Dashboard > Table Editor > profiles >
-- find their row > set `membership_tier`.

-- Remap anyone already set under the old tier names before the constraint
-- tightens back up.
update public.profiles set membership_tier = 'vegging' where membership_tier = 'supporter';
update public.profiles set membership_tier = 'harvest' where membership_tier = 'patron';

alter table public.profiles drop constraint if exists profiles_membership_tier_check;

alter table public.profiles
  add constraint profiles_membership_tier_check
  check (membership_tier in ('free', 'seedling', 'vegging', 'flowering', 'harvest'));
