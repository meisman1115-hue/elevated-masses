-- Elevated Masses — forum + accounts schema
-- Run this once in your Supabase project: Dashboard > SQL Editor > New query > paste > Run.

-- ---------------------------------------------------------------------------
-- Profiles: one row per user, holds the public username.
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "Users can insert their own profile"
  on public.profiles for insert with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update using (auth.uid() = id);

-- Auto-create a profile when a new user signs up, using the username they
-- provided at sign-up (stored in user metadata).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username)
  values (
    new.id,
    coalesce(nullif(trim(new.raw_user_meta_data->>'username'), ''), 'grower_' || substr(new.id::text, 1, 6))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Threads
-- ---------------------------------------------------------------------------
create table if not exists public.threads (
  id uuid default gen_random_uuid() primary key,
  category text not null,
  title text not null check (char_length(title) between 3 and 160),
  body text not null default '' check (char_length(body) <= 8000),
  author_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamptz default now()
);

alter table public.threads enable row level security;

create policy "Threads are viewable by everyone"
  on public.threads for select using (true);

create policy "Authenticated users can create threads"
  on public.threads for insert with check (auth.uid() = author_id);

create policy "Authors can update their own threads"
  on public.threads for update using (auth.uid() = author_id);

create policy "Authors can delete their own threads"
  on public.threads for delete using (auth.uid() = author_id);

create index if not exists threads_created_at_idx on public.threads (created_at desc);
create index if not exists threads_category_idx on public.threads (category);

-- ---------------------------------------------------------------------------
-- Replies
-- ---------------------------------------------------------------------------
create table if not exists public.replies (
  id uuid default gen_random_uuid() primary key,
  thread_id uuid references public.threads(id) on delete cascade not null,
  body text not null check (char_length(body) between 1 and 8000),
  author_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamptz default now()
);

alter table public.replies enable row level security;

create policy "Replies are viewable by everyone"
  on public.replies for select using (true);

create policy "Authenticated users can reply"
  on public.replies for insert with check (auth.uid() = author_id);

create policy "Authors can update their own replies"
  on public.replies for update using (auth.uid() = author_id);

create policy "Authors can delete their own replies"
  on public.replies for delete using (auth.uid() = author_id);

create index if not exists replies_thread_id_idx on public.replies (thread_id);
