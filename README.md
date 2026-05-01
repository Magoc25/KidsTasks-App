# 👧 KidsTasks

> **App de tarefas e mesada para crianças — gerencie tarefas diárias, aprove conclusões e calcule a recompensa semanal.**

Desenvolvido por **Marlon Gomes da Costa (MGC Dev)**

> ⚠️ **Este é um projeto pessoal**, desenvolvido de forma independente pelo autor.
> Não representa, não é financiado e não tem vínculo institucional com o IFMA
> ou qualquer outra organização.

[![Versão](https://img.shields.io/badge/versão-1.0.0-blue)](#changelog)
[![Licença](https://img.shields.io/badge/licença-uso%20pessoal%20livre-green)](#licença)
[![PIX](https://img.shields.io/badge/apoie-PIX-brightgreen)](#apoiar)

---

## ✨ O que é

O **KidsTasks** é um Progressive Web App (PWA) para famílias que querem organizar as tarefas das crianças e vincular a conclusão delas a recompensas financeiras semanais — de forma simples, segura e sem precisar instalar nada.

O app funciona no modo **Criança** (marca tarefas concluídas) e modo **Responsável** (aprova tarefas e registra o pagamento semanal). Tudo funciona offline e pode ser sincronizado opcionalmente com o Supabase para uso em múltiplos dispositivos.

Ideal para crianças a partir de 3 anos, com interface de ícones grandes e poucos elementos visuais para não sobrecarregar.

---

## 🚀 Funcionalidades

- **Modo Criança** — visualiza tarefas do dia e marca como concluídas
- **Modo Responsável** — aprova/reprova tarefas, protegido por PIN
- **Recompensa semanal** — calcula pontos acumulados e registra o pagamento
- **Offline-first** — funciona sem internet; sincroniza quando conectado
- **Multi-criança** — suporte a múltiplas crianças na mesma família
- **Supabase opcional** — sincronização entre dispositivos com seu próprio banco
- **PWA instalável** — instale como app no Android, iOS, Windows e macOS

---

## 📦 Como usar

### Cenário 1 — Uso local simples _(sem nuvem)_

1. Baixe o arquivo `KidsTasks.html` para o seu computador
2. Abra no Chrome, Edge ou Safari
3. Pronto — os dados ficam salvos no próprio navegador

> **Backup:** os dados ficam no navegador. Se limpar o histórico/cache, os dados somem.
> Exporte periodicamente ou use o Cenário 2 para maior segurança.

---

### Cenário 2 — Dois ou mais dispositivos com sincronização _(Supabase)_

1. Crie conta no Supabase (gratuito) — veja [Configurar Supabase](#-configurar-supabase)
2. Em cada dispositivo, abra o app, acesse ☁️ e configure as chaves
3. Os dados sincronizam automaticamente entre os dispositivos

---

### Cenário 3 — Acesso de qualquer lugar pela URL _(GitHub Pages + Supabase)_

1. Configure o Supabase (Cenário 2)
2. Publique o app no GitHub Pages — veja [Publicar no GitHub Pages](#-publicar-no-github-pages)
3. Acesse a URL gerada em qualquer dispositivo e configure o Supabase uma vez

---

## 🔧 Configurar Supabase

> O Supabase é gratuito para uso pessoal. Cada família usa **seu próprio projeto Supabase** —
> os dados ficam isolados e ninguém além da família tem acesso.

### Passo 1 — Criar conta e projeto

1. Acesse [supabase.com](https://supabase.com) e clique em **Start your project**
2. Crie uma conta (pode usar o login do Google ou GitHub)
3. Clique em **New project**
4. Preencha:
   - **Name:** `kidstasks-suafamilia` (ex: `kidstasks-silva`)
   - **Database Password:** crie uma senha forte e guarde
   - **Region:** South America (São Paulo)
5. Clique em **Create new project** e aguarde ~1 minuto

---

### Passo 2 — Criar as tabelas (SQL Editor)

1. No painel do projeto, clique em **SQL Editor** no menu lateral
2. Clique em **+ New query**
3. Cole o bloco abaixo e clique em **Run** (▶)

**Bloco 1 — Tabelas:**
```sql
create table if not exists public.families (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.children (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references public.families(id) on delete cascade,
  name text not null,
  avatar_color text,
  created_at timestamptz not null default now()
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references public.families(id) on delete cascade,
  child_id uuid references public.children(id) on delete set null,
  title text not null,
  description text,
  points integer not null default 0,
  frequency text not null default 'daily',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.task_instances (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references public.families(id) on delete cascade,
  child_id uuid not null references public.children(id) on delete cascade,
  task_id uuid not null references public.tasks(id) on delete cascade,
  date date not null,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists public.weekly_payments (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references public.families(id) on delete cascade,
  child_id uuid not null references public.children(id) on delete cascade,
  week_start_date date not null,
  week_end_date date not null,
  total_points integer not null default 0,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  constraint weekly_payments_unique_week
    unique (family_id, child_id, week_start_date, week_end_date)
);
```

4. Após o **Run** aparecer ✅, clique em **+ New query** novamente e cole o próximo bloco

**Bloco 2 — Índices de performance:**
```sql
create index if not exists idx_children_family_id
  on public.children(family_id);

create index if not exists idx_tasks_family_id
  on public.tasks(family_id);

create index if not exists idx_task_instances_family_child_date
  on public.task_instances(family_id, child_id, date);

create index if not exists idx_weekly_payments_family_child_week
  on public.weekly_payments(family_id, child_id, week_start_date, week_end_date);
```

**Bloco 3 — Ativar segurança (RLS):**
```sql
alter table public.families enable row level security;
alter table public.children enable row level security;
alter table public.tasks enable row level security;
alter table public.task_instances enable row level security;
alter table public.weekly_payments enable row level security;
```

**Bloco 4 — Permissões de acesso:**
```sql
create policy "families_all_anon_single_tenant"
  on public.families for all to anon using (true) with check (true);

create policy "children_all_anon_single_tenant"
  on public.children for all to anon using (true) with check (true);

create policy "tasks_all_anon_single_tenant"
  on public.tasks for all to anon using (true) with check (true);

create policy "task_instances_all_anon_single_tenant"
  on public.task_instances for all to anon using (true) with check (true);

create policy "weekly_payments_all_anon_single_tenant"
  on public.weekly_payments for all to anon using (true) with check (true);
```

5. Execute cada bloco separadamente. Ao final, vá em **Table Editor** e confirme que as 5 tabelas aparecem: `families`, `children`, `tasks`, `task_instances`, `weekly_payments`.

---

### Passo 3 — Copiar as chaves

1. No painel do projeto, clique em **Settings → Data API**
2. Copie:
   - **Project URL** — ex: `https://abcdefgh.supabase.co`
   - **Publishable key** — começa com `sb_publishable_...`

> ⚠️ Nunca compartilhe a **service_role key** — use apenas a **publishable key** no app.

---

### Passo 4 — Configurar no app

1. Abra o KidsTasks no navegador
2. Clique no ícone de **nuvem ☁️** no topo do app
3. Cole a **Project URL** e a **Publishable key**
4. Clique em **Testar conexão** — deve aparecer "Conexão bem-sucedida"
5. Clique em **Salvar e sincronizar**

---

### Passo 5 — Criar família e criança

1. No app, alterne para o modo **Responsável** (botão no topo)
2. Vá em **Configurações → Família e crianças**
3. Digite o nome da família e clique em **Criar família**
4. Digite o nome da criança e clique em **Adicionar criança**
5. Clique em **Atualizar lista** — a criança deve aparecer

A partir daí, cadastre as tarefas na aba **Tarefas** e use o app normalmente.

---

## 🌐 Publicar no GitHub Pages

> O GitHub Pages permite acessar o app por uma URL fixa de qualquer dispositivo, de graça.
> Siga os passos abaixo mesmo que nunca tenha usado o GitHub antes.

### Passo 1 — Criar conta no GitHub

1. Acesse [github.com](https://github.com) e clique em **Sign up**
2. Escolha um nome de usuário, e-mail e senha
3. Confirme o e-mail recebido

---

### Passo 2 — Criar um repositório

1. Após fazer login, clique no **+** (canto superior direito) → **New repository**
2. Preencha:
   - **Repository name:** `KidsTasks-App`
   - **Visibility:** ✅ Public _(obrigatório para GitHub Pages gratuito)_
   - **Deixe as demais opções desmarcadas**
3. Clique em **Create repository**

---

### Passo 3 — Enviar os arquivos

1. Na página do repositório recém-criado, clique em **uploading an existing file**
2. Arraste ou selecione os arquivos do KidsTasks:
   - `KidsTasks.html`
   - `sw.js`
   - `manifest.json`
   - `icon-192.png`
   - `icon-512.png`
   - `.nojekyll` _(arquivo oculto — pode precisar ativar "mostrar arquivos ocultos" no seu sistema)_
3. No campo **Commit changes**, deixe a mensagem padrão ou escreva `primeiro envio`
4. Clique em **Commit changes**

---

### Passo 4 — Ativar o GitHub Pages

1. No repositório, clique em **Settings** (engrenagem no menu superior)
2. No menu lateral, clique em **Pages**
3. Em **Source**, selecione **Deploy from a branch**
4. Em **Branch**, selecione **main** e a pasta **/ (root)**
5. Clique em **Save**
6. Aguarde ~2 minutos e recarregue a página — a URL do app aparecerá em destaque

---

### Passo 5 — Acessar o app

A URL do app terá o formato:
```
https://seu-usuario.github.io/KidsTasks-App/KidsTasks.html
```

> ⚠️ A URL sem o nome do arquivo (`/KidsTasks-App/`) retorna erro 404 — sempre use a URL completa com `KidsTasks.html` no final.

Cole essa URL no navegador de qualquer dispositivo para acessar o app. Para instalar como aplicativo, veja a seção abaixo.

---

## 📱 Instalar como app no celular

**Android (Chrome):** Menu (⋮) → Adicionar à tela inicial → Confirmar

**iPhone/iPad (Safari):** Compartilhar → Adicionar à tela de início

---

## ☕ Apoiar o Projeto

O projeto é gratuito e de código aberto. Se foi útil, considere apoiar:

Clique em **☕ Apoiar** no rodapé do app para contribuir via PIX.

**Chave PIX:** `4c6086a2-4bb8-474b-a4cf-ced8c8d82189` · MGC Dev

### ⭐ Avaliações compartilhadas

Após apoiar, deixe uma avaliação com estrelas e comentário. As avaliações são
**compartilhadas entre todos os usuários** do app.

### 👑 Badges de apoiador

| Badge | Meses de apoio |
|---|---|
| ☕ Apoiador | 1 mês |
| ⭐ Fã | 2–3 meses |
| 🔥 Dedicado | 4–6 meses |
| 👑 Patrono | 7+ meses |

---

## 📄 Licença

Uso pessoal e educacional livre. Uso comercial requer autorização.
Consulte [TERMS.md](TERMS.md) para os termos completos.

---

## 👤 Autor

**Marlon Gomes da Costa**
Desenvolvedor independente · MGC Dev

*Professor do IFMA Campus São Raimundo das Mangabeiras — projetos são iniciativas pessoais,
sem vínculo institucional.*

---

*© 2025 MGC Dev — Feito com ☕ no Maranhão*
