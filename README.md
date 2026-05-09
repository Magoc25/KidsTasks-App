# 👧 KidsTasks

> **App de tarefas e mesada para crianças — gerencie tarefas diárias, aprove com estrelas e acompanhe metas e recompensas.**

Desenvolvido por **Marlon Gomes da Costa (MGC Dev)**

> ⚠️ **Este é um projeto pessoal**, desenvolvido de forma independente pelo autor.
> Não representa, não é financiado e não tem vínculo institucional com o IFMA
> ou qualquer outra organização.

[![Versão](https://img.shields.io/badge/versão-2.0.1-blue)](#changelog)
[![Licença](https://img.shields.io/badge/licença-não%20comercial-orange)](#licença)
[![PIX](https://img.shields.io/badge/apoie-PIX-brightgreen)](#apoiar)
[![Dispositivos ativos](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/Magoc25/KidsTasks-App/master/stats.json&query=$.active_30d&label=dispositivos%20ativos%20(30d)&color=blue&suffix=%20dispositivos)](./stats.json)

---

## ✨ O que é

O **KidsTasks** é um Progressive Web App (PWA) para famílias que querem organizar as tarefas das crianças e vincular a conclusão delas a recompensas financeiras semanais — de forma simples, segura e sem precisar instalar nada.

O app funciona no modo **Criança** (marca tarefas e acompanha metas) e modo **Responsável** (aprova tarefas com 1–5 ⭐, gerencia crianças, metas e pagamentos). Tudo funciona offline e pode ser sincronizado opcionalmente com o Supabase para uso em múltiplos dispositivos.

Suporta múltiplas crianças por família, cada uma com suas próprias tarefas, metas e progresso independentes.

---

## 🚀 Funcionalidades

- **Modo Criança** — visualiza tarefas do dia, marca como concluídas e acompanha metas
- **Modo Responsável** — aprova tarefas com 1–5 ⭐, protegido por PIN
- **Aprovação com estrelas** — de 1 a 5 ⭐ por tarefa aprovada
- **Multi-criança** — tarefas, metas e progresso separados por criança
- **Metas e recompensas** — acumule ⭐ para conquistar presentes e recompensas
- **Conversão ⭐ → R$** — configure quanto vale cada estrela em dinheiro
- **Tipo de tarefa** — 💰 Dinheiro (converte em R$) ou 🏆 Meta (acumula para conquistas)
- **Recompensa semanal** — calcula R$ acumulado e registra o pagamento
- **Offline-first** — funciona sem internet; sincroniza quando conectado
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

**Bloco 1 — Limpar tabelas existentes (se houver):**
```sql
DROP TABLE IF EXISTS public.goals            CASCADE;
DROP TABLE IF EXISTS public.weekly_payments  CASCADE;
DROP TABLE IF EXISTS public.task_instances   CASCADE;
DROP TABLE IF EXISTS public.tasks            CASCADE;
DROP TABLE IF EXISTS public.children         CASCADE;
DROP TABLE IF EXISTS public.families         CASCADE;
```

**Bloco 2 — Criar tabelas (schema v2.0):**
```sql
CREATE TABLE public.families (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text        NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.children (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id    uuid        NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
  name         text        NOT NULL,
  avatar_color text,
  created_at   timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.tasks (
  id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id      uuid        NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
  child_id       uuid        REFERENCES public.children(id) ON DELETE SET NULL,
  title          text        NOT NULL,
  points         integer     NOT NULL DEFAULT 1 CHECK (points BETWEEN 1 AND 5),
  frequency      text        NOT NULL DEFAULT 'daily',
  is_active      boolean     NOT NULL DEFAULT true,
  icon           text        NOT NULL DEFAULT '✅',
  tint           text        NOT NULL DEFAULT 'mint',
  reward_type    text        NOT NULL DEFAULT 'money',
  days           jsonb       DEFAULT NULL,
  target_minutes integer     DEFAULT NULL,
  created_at     timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.task_instances (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id        uuid        NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
  child_id         uuid        NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  task_id          uuid        NOT NULL REFERENCES public.tasks(id)    ON DELETE CASCADE,
  date             date        NOT NULL,
  status           text        NOT NULL DEFAULT 'pending',
  approved_stars   integer     CHECK (approved_stars BETWEEN 1 AND 5),
  elapsed_seconds  integer     DEFAULT NULL,
  timer_started_at timestamptz DEFAULT NULL,
  created_at       timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.weekly_payments (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id       uuid        NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
  child_id        uuid        NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  week_start_date date        NOT NULL,
  week_end_date   date        NOT NULL,
  total_points    integer     NOT NULL DEFAULT 0,
  paid_at         timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT weekly_payments_unique_week
    UNIQUE (family_id, child_id, week_start_date, week_end_date)
);

CREATE TABLE public.goals (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id    uuid        NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
  child_id     uuid        NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  title        text        NOT NULL,
  icon         text        NOT NULL DEFAULT '🎯',
  target_stars integer     NOT NULL DEFAULT 30 CHECK (target_stars >= 1),
  delivered    boolean     NOT NULL DEFAULT false,
  delivered_at timestamptz,
  created_at   timestamptz NOT NULL DEFAULT now()
);
```

**Bloco 3 — Índices de performance:**
```sql
CREATE INDEX idx_children_family_id          ON public.children(family_id);
CREATE INDEX idx_tasks_family_child          ON public.tasks(family_id, child_id);
CREATE INDEX idx_task_instances_family_child ON public.task_instances(family_id, child_id, date);
CREATE INDEX idx_weekly_payments_family      ON public.weekly_payments(family_id, child_id, week_start_date, week_end_date);
CREATE INDEX idx_goals_family_child          ON public.goals(family_id, child_id);
```

**Bloco 4 — Ativar segurança (RLS):**
```sql
ALTER TABLE public.families        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.children        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_instances  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weekly_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goals           ENABLE ROW LEVEL SECURITY;
```

**Bloco 5 — Permissões de acesso (single-tenant):**
```sql
CREATE POLICY "families_anon"        ON public.families        FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "children_anon"        ON public.children        FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "tasks_anon"           ON public.tasks           FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "task_instances_anon"  ON public.task_instances  FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "weekly_payments_anon" ON public.weekly_payments FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "goals_anon"           ON public.goals           FOR ALL TO anon USING (true) WITH CHECK (true);
```

5. Execute cada bloco separadamente. Ao final, vá em **Table Editor** e confirme que as **6 tabelas** aparecem: `families`, `children`, `tasks`, `task_instances`, `weekly_payments`, `goals`.

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

O projeto é gratuito e possui **código-fonte disponível**. Se foi útil, considere apoiar:

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

## 📄 Licença e termos de uso

Este projeto possui **código-fonte disponível** para estudo, uso pessoal, familiar, educacional, acadêmico e avaliação técnica.

**Não é uma licença open source permissiva tradicional.** O uso comercial, a redistribuição comercial, o white-label, a revenda e a exploração econômica de versões derivadas dependem de autorização prévia e por escrito do autor.

Consulte os arquivos:

- [LICENSE.md](./LICENSE.md)
- [TERMS.md](./TERMS.md)
- [CHANGELOG.md](./CHANGELOG.md)

---

## 👤 Autor

**Marlon Gomes da Costa**
Desenvolvedor independente · MGC Dev

*Professor do IFMA Campus São Raimundo das Mangabeiras — projetos são iniciativas pessoais,
sem vínculo institucional.*

---

*© 2026 MGC Dev — Feito com ☕ no Maranhão*
