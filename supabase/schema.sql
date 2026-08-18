-- Apex Capital Partners Phase 2 schema.
-- Run this in the Supabase SQL Editor before adding the first admin user.

create extension if not exists pgcrypto;

create type public.media_type as enum ('image', 'video');
create type public.inquiry_status as enum ('new', 'contacted', 'in_progress', 'completed', 'archived');

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;

grant execute on function public.is_admin() to authenticated;

create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  file_name text not null,
  original_file_name text not null,
  media_type public.media_type not null,
  storage_key text not null unique,
  public_url text not null,
  file_size bigint not null check (file_size > 0),
  mime_type text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  country text not null,
  service text not null,
  number_of_applicants integer not null check (number_of_applicants > 0),
  message text not null,
  status public.inquiry_status not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists media_type_created_at_idx on public.media (media_type, created_at desc);
create index if not exists inquiries_status_created_at_idx on public.inquiries (status, created_at desc);

create or replace function public.enforce_media_limit()
returns trigger
language plpgsql
as $$
declare
  current_count integer;
  allowed_count integer;
begin
  perform pg_advisory_xact_lock(hashtext(new.media_type::text));
  select count(*) into current_count from public.media where media_type = new.media_type;
  allowed_count := case when new.media_type = 'image' then 5 else 3 end;
  if current_count >= allowed_count then
    raise exception 'Maximum number of % reached', new.media_type;
  end if;
  return new;
end;
$$;

drop trigger if exists media_enforce_limit on public.media;
create trigger media_enforce_limit before insert on public.media for each row execute function public.enforce_media_limit();

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists media_set_updated_at on public.media;
create trigger media_set_updated_at before update on public.media for each row execute function public.set_updated_at();
drop trigger if exists inquiries_set_updated_at on public.inquiries;
create trigger inquiries_set_updated_at before update on public.inquiries for each row execute function public.set_updated_at();

alter table public.media enable row level security;
alter table public.inquiries enable row level security;

-- Public media is readable. Only authenticated users can mutate it.
drop policy if exists "Public can view media" on public.media;
create policy "Public can view media" on public.media for select using (true);
drop policy if exists "Authenticated admins can insert media" on public.media;
create policy "Authenticated admins can insert media" on public.media for insert to authenticated with check (public.is_admin());
drop policy if exists "Authenticated admins can update media" on public.media;
create policy "Authenticated admins can update media" on public.media for update to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "Authenticated admins can delete media" on public.media;
create policy "Authenticated admins can delete media" on public.media for delete to authenticated using (public.is_admin());

-- Public visitors can submit, but can never read, update, or delete inquiries.
drop policy if exists "Public can submit inquiries" on public.inquiries;
create policy "Public can submit inquiries" on public.inquiries for insert to anon, authenticated with check (true);
drop policy if exists "Authenticated admins can view inquiries" on public.inquiries;
create policy "Authenticated admins can view inquiries" on public.inquiries for select to authenticated using (public.is_admin());
drop policy if exists "Authenticated admins can update inquiries" on public.inquiries;
create policy "Authenticated admins can update inquiries" on public.inquiries for update to authenticated using (public.is_admin()) with check (public.is_admin());

-- Keep the Auth user list private; admin access is controlled by Supabase Auth.
revoke all on table public.media from anon;
grant select on table public.media to anon;
revoke all on table public.inquiries from anon;
grant insert on table public.inquiries to anon;
grant select, insert, update, delete on table public.media to authenticated;
grant select, insert, update on table public.inquiries to authenticated;
revoke all on table public.admin_users from anon, authenticated;

-- Create the owner in Supabase Dashboard > Authentication > Users.
-- Never put a password in this file or in Git.
