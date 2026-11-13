-- ════════════════════════════════════════════════════════════════════
-- AlphaFlow Digital — esquema do banco (Supabase / PostgreSQL)
-- Execute no painel do Supabase: SQL Editor → New query → cole → Run.
-- O script é idempotente: pode ser executado mais de uma vez.
-- ════════════════════════════════════════════════════════════════════

-- ── Perfis (1:1 com auth.users) ─────────────────────────────────────
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text,
  company     text,
  phone       text,
  role        text not null default 'client' check (role in ('client', 'admin')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Função auxiliar: o usuário atual é administrador?
-- SECURITY DEFINER evita recursão de RLS ao consultar a própria tabela profiles.
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

-- Cria o perfil automaticamente quando alguém se cadastra.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, company)
  values (new.id, new.raw_user_meta_data->>'full_name', nullif(new.raw_user_meta_data->>'company', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- Impede que um cliente altere o próprio papel (role).
-- auth.uid() é nulo no SQL Editor e na service role (contextos confiáveis), então
-- a trava vale apenas para usuários logados pelo site. Visitantes anônimos já
-- são bloqueados pela política de RLS de update.
create or replace function public.protect_profile_role()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.role is distinct from old.role and auth.uid() is not null and not public.is_admin() then
    raise exception 'Somente administradores podem alterar papéis.';
  end if;
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists profiles_protect_role on public.profiles;
create trigger profiles_protect_role before update on public.profiles
  for each row execute function public.protect_profile_role();

alter table public.profiles enable row level security;

drop policy if exists "profiles: leitura própria ou admin" on public.profiles;
create policy "profiles: leitura própria ou admin" on public.profiles
  for select using (id = auth.uid() or public.is_admin());

drop policy if exists "profiles: atualização própria ou admin" on public.profiles;
create policy "profiles: atualização própria ou admin" on public.profiles
  for update using (id = auth.uid() or public.is_admin())
  with check (id = auth.uid() or public.is_admin());

-- ── Projetos ────────────────────────────────────────────────────────
create table if not exists public.projects (
  id             uuid primary key default gen_random_uuid(),
  client_id      uuid not null references public.profiles(id) on delete cascade,
  name           text not null,
  plan           text not null check (plan in ('alpha_start', 'alpha_business', 'alpha_premium')),
  status         text not null default 'aguardando_briefing'
                 check (status in ('aguardando_briefing','planejamento','design','desenvolvimento','revisao','publicado','manutencao')),
  notes          text,
  published_url  text,
  domain         text,
  started_at     date,
  published_at   date,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);
create index if not exists projects_client_idx on public.projects(client_id);

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$ begin new.updated_at := now(); return new; end; $$;
drop trigger if exists projects_touch on public.projects;
create trigger projects_touch before update on public.projects
  for each row execute function public.touch_updated_at();

alter table public.projects enable row level security;

drop policy if exists "projects: cliente vê os próprios, admin vê todos" on public.projects;
create policy "projects: cliente vê os próprios, admin vê todos" on public.projects
  for select using (client_id = auth.uid() or public.is_admin());

drop policy if exists "projects: somente admin cria" on public.projects;
create policy "projects: somente admin cria" on public.projects
  for insert with check (public.is_admin());

drop policy if exists "projects: somente admin altera" on public.projects;
create policy "projects: somente admin altera" on public.projects
  for update using (public.is_admin()) with check (public.is_admin());

drop policy if exists "projects: somente admin exclui" on public.projects;
create policy "projects: somente admin exclui" on public.projects
  for delete using (public.is_admin());

-- ── Orçamentos (formulário do site) ─────────────────────────────────
-- Gravados pelo servidor com a SERVICE ROLE (ignora RLS). Ninguém insere pelo navegador.
create table if not exists public.leads (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  company      text not null,
  segment      text not null,
  whatsapp     text not null,
  email        text not null,
  plan         text not null,
  description  text not null,
  consent_at   timestamptz not null,
  status       text not null default 'novo' check (status in ('novo','em_contato','convertido','descartado')),
  created_at   timestamptz not null default now()
);

alter table public.leads enable row level security;

drop policy if exists "leads: admin lê" on public.leads;
create policy "leads: admin lê" on public.leads for select using (public.is_admin());

drop policy if exists "leads: admin altera" on public.leads;
create policy "leads: admin altera" on public.leads for update using (public.is_admin()) with check (public.is_admin());

-- ════════════════════════════════════════════════════════════════════
-- Tornar um usuário administrador (rode UMA vez, depois de se cadastrar no site):
--   update public.profiles set role = 'admin'
--   where id = (select id from auth.users where email = 'SEU-EMAIL@exemplo.com');
-- ════════════════════════════════════════════════════════════════════
