-- ============================================================
-- Sofia Stradiotte — schema do Supabase
-- Rode este arquivo inteiro em: Supabase Dashboard > SQL Editor > New query
-- ============================================================

create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- site_content: blocos de texto/config editáveis (home, about,
-- resume, contact) guardados como JSON. Simplifica o CRUD do
-- painel sem precisar de uma tabela por campo.
-- ------------------------------------------------------------
create table if not exists site_content (
  key text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table site_content enable row level security;

drop policy if exists "site_content_select_public" on site_content;
create policy "site_content_select_public"
  on site_content for select
  using (true);

drop policy if exists "site_content_write_admin" on site_content;
create policy "site_content_write_admin"
  on site_content for insert
  with check (auth.role() = 'authenticated');

drop policy if exists "site_content_update_admin" on site_content;
create policy "site_content_update_admin"
  on site_content for update
  using (auth.role() = 'authenticated');

-- ------------------------------------------------------------
-- portfolio_projects / portfolio_images
-- ------------------------------------------------------------
create table if not exists portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null default 'Novo projeto',
  description text default '',
  category text default '',
  project_date date,
  cover_image_url text,
  order_index integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists portfolio_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references portfolio_projects(id) on delete cascade,
  image_url text not null,
  order_index integer not null default 0
);

alter table portfolio_projects enable row level security;
alter table portfolio_images enable row level security;

drop policy if exists "projects_select_public" on portfolio_projects;
create policy "projects_select_public"
  on portfolio_projects for select
  using (published = true or auth.role() = 'authenticated');

drop policy if exists "projects_write_admin" on portfolio_projects;
create policy "projects_write_admin"
  on portfolio_projects for insert
  with check (auth.role() = 'authenticated');

drop policy if exists "projects_update_admin" on portfolio_projects;
create policy "projects_update_admin"
  on portfolio_projects for update
  using (auth.role() = 'authenticated');

drop policy if exists "projects_delete_admin" on portfolio_projects;
create policy "projects_delete_admin"
  on portfolio_projects for delete
  using (auth.role() = 'authenticated');

drop policy if exists "images_select_public" on portfolio_images;
create policy "images_select_public"
  on portfolio_images for select
  using (true);

drop policy if exists "images_write_admin" on portfolio_images;
create policy "images_write_admin"
  on portfolio_images for insert
  with check (auth.role() = 'authenticated');

drop policy if exists "images_delete_admin" on portfolio_images;
create policy "images_delete_admin"
  on portfolio_images for delete
  using (auth.role() = 'authenticated');

-- ------------------------------------------------------------
-- gallery_photos
-- ------------------------------------------------------------
create table if not exists gallery_photos (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  title text default '',
  caption text default '',
  order_index integer not null default 0,
  created_at timestamptz not null default now()
);

alter table gallery_photos enable row level security;

drop policy if exists "photos_select_public" on gallery_photos;
create policy "photos_select_public"
  on gallery_photos for select
  using (true);

drop policy if exists "photos_write_admin" on gallery_photos;
create policy "photos_write_admin"
  on gallery_photos for insert
  with check (auth.role() = 'authenticated');

drop policy if exists "photos_update_admin" on gallery_photos;
create policy "photos_update_admin"
  on gallery_photos for update
  using (auth.role() = 'authenticated');

drop policy if exists "photos_delete_admin" on gallery_photos;
create policy "photos_delete_admin"
  on gallery_photos for delete
  using (auth.role() = 'authenticated');

-- ------------------------------------------------------------
-- contact_messages: qualquer visitante pode ENVIAR (insert),
-- só a admin autenticada pode LER/editar/excluir.
-- ------------------------------------------------------------
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

alter table contact_messages enable row level security;

drop policy if exists "messages_insert_public" on contact_messages;
create policy "messages_insert_public"
  on contact_messages for insert
  with check (true);

drop policy if exists "messages_select_admin" on contact_messages;
create policy "messages_select_admin"
  on contact_messages for select
  using (auth.role() = 'authenticated');

drop policy if exists "messages_update_admin" on contact_messages;
create policy "messages_update_admin"
  on contact_messages for update
  using (auth.role() = 'authenticated');

drop policy if exists "messages_delete_admin" on contact_messages;
create policy "messages_delete_admin"
  on contact_messages for delete
  using (auth.role() = 'authenticated');

-- ============================================================
-- STORAGE — buckets públicos para imagens e documentos (PDF).
-- Leitura pública, escrita só para quem está autenticado.
-- ============================================================

insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('site-documents', 'site-documents', true)
on conflict (id) do nothing;

drop policy if exists "site_images_select_public" on storage.objects;
create policy "site_images_select_public"
  on storage.objects for select
  using (bucket_id = 'site-images');

drop policy if exists "site_images_write_admin" on storage.objects;
create policy "site_images_write_admin"
  on storage.objects for insert
  with check (bucket_id = 'site-images' and auth.role() = 'authenticated');

drop policy if exists "site_images_update_admin" on storage.objects;
create policy "site_images_update_admin"
  on storage.objects for update
  using (bucket_id = 'site-images' and auth.role() = 'authenticated');

drop policy if exists "site_images_delete_admin" on storage.objects;
create policy "site_images_delete_admin"
  on storage.objects for delete
  using (bucket_id = 'site-images' and auth.role() = 'authenticated');

drop policy if exists "site_documents_select_public" on storage.objects;
create policy "site_documents_select_public"
  on storage.objects for select
  using (bucket_id = 'site-documents');

drop policy if exists "site_documents_write_admin" on storage.objects;
create policy "site_documents_write_admin"
  on storage.objects for insert
  with check (bucket_id = 'site-documents' and auth.role() = 'authenticated');

drop policy if exists "site_documents_update_admin" on storage.objects;
create policy "site_documents_update_admin"
  on storage.objects for update
  using (bucket_id = 'site-documents' and auth.role() = 'authenticated');

drop policy if exists "site_documents_delete_admin" on storage.objects;
create policy "site_documents_delete_admin"
  on storage.objects for delete
  using (bucket_id = 'site-documents' and auth.role() = 'authenticated');

-- ============================================================
-- Conteúdo inicial (mesmo texto que já existia no site em HTML).
-- Pode editar tudo depois pelo painel /admin.
-- ============================================================

insert into site_content (key, data) values (
  'home',
  '{
    "eyebrow": "olá, eu sou a",
    "name": "Sofia Stradiotte",
    "description": "Estudante de Moda na FAAP apaixonada por criação, estilo e contar histórias através do design.",
    "cta_label": "Saiba mais sobre mim →",
    "hero_image_url": "",
    "profile_photo_url": "",
    "cards": [
      {"title": "Sobre Mim", "description": "Um pouco sobre quem sou, minha trajetória e minhas paixões.", "href": "/sobre"},
      {"title": "Portfólio", "description": "Confira meus projetos e trabalhos acadêmicos de Moda.", "href": "/portfolio"},
      {"title": "Fotos", "description": "Uma seleção especial de fotos e registros que me inspiram.", "href": "/fotos"},
      {"title": "Currículo", "description": "Veja minha formação, experiências e habilidades.", "href": "/curriculo"},
      {"title": "Contato", "description": "Vamos conversar? Estou aberta a novas conexões!", "href": "/contato"}
    ]
  }'::jsonb
) on conflict (key) do nothing;

insert into site_content (key, data) values (
  'about',
  '{"heading": "Sobre Mim", "bio": "Página em construção.", "formation": "", "interests": "", "skills": [], "image_url": ""}'::jsonb
) on conflict (key) do nothing;

insert into site_content (key, data) values (
  'resume',
  '{"formation": [], "experience": [], "courses": [], "skills": [], "softwares": [], "languages": [], "pdf_url": ""}'::jsonb
) on conflict (key) do nothing;

insert into site_content (key, data) values (
  'contact',
  '{"email": "", "instagram": "", "pinterest": "", "phone": "", "other_links": [], "page_text": "Vamos conversar? Preencha o formulário abaixo ou me chame nas redes sociais."}'::jsonb
) on conflict (key) do nothing;
