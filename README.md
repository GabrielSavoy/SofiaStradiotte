# Sofia Stradiotte — site + painel administrativo

Site de portfólio da Sofia Stradiotte, com uma área administrativa privada para editar
todo o conteúdo sem precisar mexer em código.

## O que mudou em relação à versão anterior (HTML puro)

O site antigo era HTML/CSS/JS estático — qualquer alteração de texto, imagem ou projeto
exigia editar arquivo e subir de novo pro GitHub. Como a ideia agora é a própria Sofia
editar o conteúdo sozinha, o projeto foi migrado para **Next.js**, com os textos, projetos,
fotos e currículo guardados no **Supabase** (banco de dados + login + armazenamento de
imagens) em vez de presos dentro do HTML. O visual — cores, tipografia, layout, cards,
decorações — foi mantido igual ao site original; nada foi redesenhado.

## Estrutura

```
sofia-nextjs/
├── app/                      → páginas (rotas) do site
│   ├── page.js                 → Início            (público)
│   ├── sobre/                  → Sobre Mim          (público)
│   ├── portfolio/               → Portfólio          (público)
│   ├── fotos/                  → Fotos              (público)
│   ├── curriculo/              → Currículo          (público)
│   ├── contato/                → Contato            (público)
│   └── admin/
│       ├── page.js             → tela de login      (/admin)
│       └── dashboard/          → painel             (/admin/dashboard, exige login)
├── components/                → componentes de interface (navbar, cards, formulários...)
├── lib/                       → acesso ao Supabase (banco, storage, autenticação)
├── styles/globals.css         → todo o visual do site (portado do projeto original)
├── supabase/schema.sql        → script para criar as tabelas e permissões no Supabase
├── middleware.js              → protege as rotas /admin/dashboard/*
├── SETUP.md                   → passo a passo de configuração (Supabase, Vercel, etc.)
└── .env.example                → modelo das variáveis de ambiente necessárias
```

## Como a Sofia vai usar o painel

1. Acessar `seusite.com/admin`.
2. Entrar com o e-mail e senha cadastrados (ver `SETUP.md`, passo 4).
3. No menu lateral, escolher o que editar: Página Inicial, Sobre Mim, Portfólio, Fotos,
   Currículo, Contato ou Configurações.
4. Alterar o texto ou trocar a imagem, e clicar em **Salvar alterações**.
5. Pronto — a mudança já aparece no site público na hora, sem precisar de deploy.

Alguns pontos específicos:

- **Portfólio**: em "+ Novo projeto" ela preenche título, categoria, data, descrição e a
  imagem de capa. Depois de criar, pode voltar e adicionar mais imagens ao mesmo projeto,
  reordenar os projetos com as setinhas, ou marcar como rascunho (não aparece no site até
  ela publicar).
- **Fotos**: envia uma ou várias fotos de uma vez, dá título/legenda pra cada uma,
  reordena com as setinhas e exclui quando quiser.
- **Currículo**: até 6 entradas em Formação, Experiência e Cursos (linhas em branco
  simplesmente não aparecem no site), além de habilidades/softwares/idiomas em formato de
  tags e upload do PDF do currículo.
- **Contato**: e-mail, Instagram, LinkedIn, telefone, outros links e o texto da página.
  As mensagens enviadas pelo formulário de contato do site aparecem numa lista logo
  abaixo, com opção de marcar como lida ou excluir.
- **Configurações**: trocar a própria senha.

## Segurança, em resumo

- O login é de verdade (Supabase Auth) — não é uma senha fixa escrita no código.
- Só existe o usuário que for criado manualmente no Supabase; não há cadastro público.
- As chaves secretas do Supabase ficam em variáveis de ambiente, nunca no código-fonte
  nem no navegador.
- Qualquer visitante pode ler o conteúdo do site; só quem estiver logado consegue
  criar, editar ou excluir alguma coisa (isso é garantido tanto pelo `middleware.js`
  quanto pelas regras de segurança do próprio banco — RLS —, então mesmo que alguém
  tentasse burlar a tela de login, o banco recusaria a escrita).

## Primeira configuração

Veja o passo a passo completo em **[SETUP.md](./SETUP.md)**: criar o projeto no
Supabase, rodar o `schema.sql`, gerar as chaves, criar o usuário administrador, configurar
as variáveis de ambiente e conectar na Vercel.
