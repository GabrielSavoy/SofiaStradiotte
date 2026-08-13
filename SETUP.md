# Configuração — Sofia Stradiotte (Next.js + Supabase + Vercel)

Este documento cobre tudo que precisa ser feito **fora do código** pra colocar o site no ar
com o painel administrativo funcionando: criar o projeto no Supabase, configurar variáveis
de ambiente, conectar na Vercel e criar o primeiro usuário administrador.

Você só precisa fazer isso **uma vez**. Depois disso, qualquer atualização de conteúdo é
feita direto pelo painel em `/admin`, sem tocar em código ou no GitHub.

---

## 1. Criar o projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e crie uma conta (ou faça login).
2. Clique em **New Project**.
3. Escolha um nome (ex: `sofia-stradiotte`), uma senha forte para o banco (guarde essa
   senha em local seguro) e a região mais próxima do Brasil.
4. Aguarde alguns minutos até o projeto ficar pronto.

## 2. Rodar o schema do banco

1. Dentro do projeto no Supabase, abra o menu **SQL Editor**.
2. Clique em **New query**.
3. Abra o arquivo `supabase/schema.sql` (está na raiz deste projeto), copie todo o
   conteúdo e cole no editor.
4. Clique em **Run**.

Isso cria automaticamente:

- as tabelas de conteúdo (`site_content`, `portfolio_projects`, `portfolio_images`,
  `gallery_photos`, `contact_messages`);
- as políticas de segurança (RLS) — leitura pública, escrita só para quem estiver
  autenticado;
- dois buckets de Storage: `site-images` (fotos/imagens) e `site-documents` (PDF do
  currículo), ambos com leitura pública e escrita só para administrador autenticado;
- um conteúdo inicial (textos que já existiam no site), pra ele não ficar vazio.

Se quiser conferir, vá em **Table Editor** e **Storage** no menu lateral — as tabelas e
os dois buckets devem aparecer lá.

## 3. Pegar as chaves da API

1. No Supabase, vá em **Project Settings** (ícone de engrenagem) → **API**.
2. Copie três valores:
   - **Project URL** → vai virar `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → vai virar `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → vai virar `SUPABASE_SERVICE_ROLE_KEY` (essa é secreta —
     nunca compartilhe nem coloque no GitHub)

## 4. Criar o primeiro usuário administrador (a Sofia)

1. No Supabase, vá em **Authentication** → **Users**.
2. Clique em **Add user** → **Create new user**.
3. Preencha o e-mail e a senha que a Sofia vai usar pra entrar em `/admin`.
4. Marque a opção **Auto Confirm User** (assim ela já consegue logar na hora, sem
   precisar confirmar e-mail).
5. Clique em **Create user**.

Não existe cadastro público no site — esse é o único jeito de criar um login novo, e só
quem tem acesso ao painel do Supabase consegue fazer isso. Se um dia precisar trocar a
senha, a própria Sofia pode fazer isso em **Configurações** dentro do painel `/admin`.

## 5. Variáveis de ambiente

Copie o arquivo `.env.example` para um novo arquivo chamado `.env.local` (para testar
localmente) e preencha com os valores do passo 3:

```
NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role
```

`.env.local` nunca deve ser enviado ao GitHub (o `.gitignore` já está configurado pra
ignorá-lo).

## 6. Testar localmente (opcional)

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000` para o site público e `http://localhost:3000/admin` para
o login administrativo.

## 7. Subir para o GitHub

```bash
git init
git add .
git commit -m "Site Sofia Stradiotte com painel administrativo"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/sofia-stradiotte.git
git push -u origin main
```

## 8. Conectar/fazer deploy na Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login (pode usar a conta do GitHub).
2. Clique em **Add New... → Project**.
3. Selecione o repositório do GitHub que você acabou de criar.
4. Na tela de configuração, abra **Environment Variables** e adicione as três variáveis
   do passo 5 (os mesmos nomes e valores).
5. Clique em **Deploy**.

A cada novo `git push` para o `main`, a Vercel gera um novo deploy automaticamente. O
conteúdo do site (textos, projetos, fotos, currículo) **não depende de deploy** — isso é
tudo editado direto no painel e lido do Supabase em tempo real.

Se o domínio já estava configurado no projeto anterior na Vercel, basta importar este
mesmo repositório no projeto existente (ou apontar o domínio para o novo projeto) — não
precisa reconfigurar DNS.

## 9. Checklist final

- [ ] Schema rodado no Supabase sem erros
- [ ] Buckets `site-images` e `site-documents` existem e estão marcados como públicos
- [ ] Usuário administrador criado em Authentication → Users
- [ ] Variáveis de ambiente configuradas na Vercel
- [ ] Deploy concluído sem erros
- [ ] `/admin` pede login e `/admin/dashboard` só abre depois de autenticar
- [ ] Página inicial, Sobre Mim, Portfólio, Fotos, Currículo e Contato abrem sem login
- [ ] Um teste de upload de imagem no painel funciona e aparece no site público
