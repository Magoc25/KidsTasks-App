# 👧 KidsTasks

> **App de tarefas e mesada para crianças — gerencie tarefas diárias, aprove com estrelas e acompanhe metas e recompensas.**

Desenvolvido por **Marlon Gomes da Costa (MGC Dev)**

> ⚠️ **Este é um projeto pessoal**, desenvolvido de forma independente pelo autor.
> Não representa, não é financiado e não tem vínculo institucional com o IFMA
> ou qualquer outra organização.

[![Versão](https://img.shields.io/badge/versão-2.4.1-blue)](#-licença-e-termos-de-uso)
[![Licença](https://img.shields.io/badge/licença-não%20comercial-orange)](#-licença-e-termos-de-uso)
[![PIX](https://img.shields.io/badge/apoie-PIX-brightgreen)](#-apoiar-o-projeto)
[![Dispositivos ativos](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/Magoc25/KidsTasks-App/master/stats.json&query=$.active_30d&label=dispositivos%20ativos%20(30d)&color=blue&suffix=%20dispositivos)](./stats.json)

---

## ▶ Abrir agora — sem baixar nada

O app já está publicado online. Clique e use:

**[▶ Abrir o KidsTasks](https://magoc25.github.io/KidsTasks-App/KidsTasks.html)**

Funciona em qualquer navegador moderno (Chrome, Edge, Firefox, Safari) — no celular, tablet ou computador. **Não precisa de cadastro, login, conta GitHub ou download de arquivos.** Após o primeiro acesso, o app funciona **offline**. Seus dados ficam **somente no seu dispositivo** (no armazenamento do próprio navegador).

Quer entender como o app funciona por dentro antes de usar? **[📖 Página de apresentação](https://magoc25.github.io/KidsTasks-App/apresentacao.html)** — o que ele faz, onde seus dados moram, o que sai do aparelho e o que ele ainda não faz bem, em linguagem corrente (com um modo técnico para quem quiser o detalhe).

### 📱 Instalar como app no seu dispositivo

Depois de abrir a URL acima, você pode instalar como aplicativo nativo, com ícone na tela inicial / área de trabalho:

| Plataforma | Como instalar |
|---|---|
| **Chrome / Edge no PC** | Clique no ícone de instalação (☐ com seta) na barra de endereços → Instalar |
| **Android (Chrome)** | Menu (⋮) → "Instalar app" ou "Adicionar à tela inicial" |
| **iPhone / iPad (Safari)** | Compartilhar (□↑) → "Adicionar à Tela de Início" |

### 🚀 Primeiros passos (1ª vez)

1. Abra o app e toque em **🔒 Responsável** (PIN padrão: **`1234`** — troque depois em Configurações).
2. Vá em **Configurações → Família/Responsável e Crianças**.
3. Crie a **Família/Responsável** e **adicione as crianças**.
4. Na aba **Tarefas**, cadastre as tarefas de cada criança.
5. Pronto! No modo **👦 Criança**, ela marca as tarefas; no modo Responsável, você aprova com ⭐.

> Tudo isso funciona **offline, só no seu dispositivo** — não precisa de conta nem internet. Para usar a mesma família em **mais de um dispositivo**, configure a sincronização opcional (veja [Configurar Supabase](#-configurar-supabase)).

---

## 🤔 Por que usar o KidsTasks?

Se você está avaliando este app, provavelmente já viu opções na Play Store ou App Store. Antes de decidir, considere:

- **Seus dados são seus** — nenhuma empresa, servidor externo ou desenvolvedor acessa o histórico de tarefas e recompensas da sua família. Os dados ficam no seu dispositivo ou no seu próprio banco de dados, sob seu controle total.
- **Sem propagandas** — apps "gratuitos" nas lojas se sustentam exibindo anúncios. O KidsTasks não exibe nenhum.
- **Sem prazo de expiração** — muitos apps oferecem um período de teste e depois bloqueiam funcionalidades ou cobram assinatura. O KidsTasks é gratuito para sempre, sem limitações.
- **Funciona sem internet** — abre e funciona normalmente mesmo sem conexão. Sincroniza quando a internet voltar, se você quiser.
- **Várias crianças, dados separados** — cada criança tem suas próprias tarefas, metas e progresso, de forma independente. Muitos apps gratuitos tratam tudo num monte só.
- **Mesada de verdade, não só pontinhos** — converte ⭐ em R$ pelo valor que *você* define, calcula a recompensa da semana e gera até o QR Code PIX por criança. A maioria dos apps de tarefas para na "estrelinha".
- **Controle do responsável** — a aprovação é tarefa por tarefa (de 1 a 5 ⭐) e fica protegida por PIN.
- **Dados de crianças sob seu controle** — informações de menores ficam no seu dispositivo ou no seu próprio Supabase (relevante diante da LGPD e do ECA Digital), nunca num servidor do desenvolvedor.

O único "custo" honesto: a instalação é um pouco mais manual do que clicar em "Instalar" na loja — mas você faz uma única vez e leva menos de 5 minutos.

---

## 📂 O que são todos esses arquivos?

Se você veio aqui só para **usar o app**, pode ignorar a grande maioria dos arquivos deste repositório — eles são documentação técnica e configuração voltadas para desenvolvedores.

Para você, basta clicar na URL pública da seção [▶ Abrir agora](#-abrir-agora--sem-baixar-nada). Tudo o que importa é:

| Arquivo | O que é | URL |
|---|---|---|
| `KidsTasks.html` | O app inteiro — é o único arquivo que você precisa | [magoc25.github.io/KidsTasks-App/KidsTasks.html](https://magoc25.github.io/KidsTasks-App/KidsTasks.html) |
| `apresentacao.html` | Página de apresentação: como funciona, onde ficam os dados, limitações | [magoc25.github.io/KidsTasks-App/apresentacao.html](https://magoc25.github.io/KidsTasks-App/apresentacao.html) |

---

## ✨ O que é

O **KidsTasks** é um Progressive Web App (PWA) para famílias que querem organizar as tarefas das crianças e vincular a conclusão delas a recompensas financeiras semanais — de forma simples, segura e sem precisar instalar nada.

O app funciona no modo **Criança** (marca tarefas e acompanha metas) e modo **Responsável** (aprova tarefas com 1–5 ⭐, gerencia crianças, metas e pagamentos). Tudo funciona offline e pode ser sincronizado opcionalmente com o Supabase para uso em múltiplos dispositivos.

Suporta múltiplas crianças por família, cada uma com suas próprias tarefas, metas e progresso independentes.

> 👨‍👩‍👧 **Um app = uma Família/Responsável (com várias crianças).** O KidsTasks foi pensado para **um único responsável** gerenciando **quantas crianças quiser** — não há suporte a vários responsáveis/famílias separados no mesmo app. Para um **segundo responsável** (outra casa), use **outro dispositivo**; e, se for sincronizar, uma **conta Supabase separada** — nunca a mesma URL/chave de outra família.

---

## 🚀 Funcionalidades

- **Modo Criança** — visualiza tarefas do dia, marca como concluídas e acompanha metas
- **Modo Responsável** — aprova tarefas com 1–5 ⭐, protegido por PIN
- **Família/Responsável e Crianças** — painel com a família/responsável no topo e as crianças vinculadas logo abaixo, em hierarquia
- **Aprovação com estrelas** — de 1 a 5 ⭐ por tarefa aprovada, com botão "Aprovar todas"
- **Multi-criança** — tarefas, metas e progresso separados por criança
- **Metas e recompensas** — acumule ⭐ para conquistar presentes e recompensas
- **Conversão ⭐ → R$** — configure quanto vale cada estrela em dinheiro
- **Tipo de tarefa** — 💰 Dinheiro (converte em R$) ou 🏆 Meta (acumula para conquistas)
- **Recompensa semanal** — calcula R$ acumulado e registra o pagamento (com QR Code PIX por criança)
- **Período semanal configurável** — Dom–Sáb, Seg–Dom ou Seg–Sex
- **Mensagens motivacionais** — ao concluir uma tarefa, a criança recebe um incentivo animado
- **Offline-first** — funciona sem internet; sincroniza quando conectado
- **Supabase opcional** — sincronização entre dispositivos com seu próprio banco
- **PWA instalável** — instale como app no Android, iOS, Windows e macOS

---

## 📦 Como usar

### Opção 1 — Online _(recomendado)_

Use a URL pública da seção [▶ Abrir agora](#-abrir-agora--sem-baixar-nada). É a forma mais simples — sem instalação, sem cadastro, sem download. Funciona em qualquer dispositivo com navegador.

Seus dados ficam salvos **no próprio navegador**, apenas no seu dispositivo. Para fazer backup ou levar para outro computador, use o card **💾 Backup** dentro do app (exporta/importa um arquivo `.json`).

> **Atenção:** se limpar o histórico/cache do navegador, os dados locais somem. Faça backup periódico ou use a **Opção 3** (sincronização) para maior segurança.

### Opção 2 — Cópia local _(opcional)_

Como o app é um **HTML single-file** (estilos e scripts embutidos), **você não precisa baixar a pasta inteira nem o ZIP**: basta o próprio arquivo principal.

- Abra a URL pública e use **Ctrl+S** (salvar página); ou, no repositório, abra `KidsTasks.html` → **Download raw file** (ícone ⬇). Depois é só dar duplo clique no arquivo.

Funciona offline, igual à versão online.

> ⚠️ A **instalação como PWA** (ícone na tela, cache offline automático) usa a versão publicada — por isso a **Opção 1** é a recomendada. Um arquivo solto roda do disco, mas não se instala como aplicativo.

### Opção 3 — Sincronizar entre dois ou mais dispositivos _(opcional)_

Se quiser que os dados apareçam no PC **e** no celular automaticamente, configure uma conta gratuita no Supabase — veja [Configurar Supabase](#-configurar-supabase). É opcional: o app funciona perfeitamente sem isso.

---

## 🔧 Configurar Supabase

> _Opcional — só para sincronizar entre dispositivos._ O Supabase é gratuito para uso pessoal.
> Cada família usa **seu próprio projeto Supabase** — os dados ficam isolados e ninguém além
> da família tem acesso.

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

```sql
CREATE TABLE public.families (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text        NOT NULL,
  settings   jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.children (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id    uuid        NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
  name         text        NOT NULL,
  avatar_data  text,
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
  created_at       timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT task_instances_unique_day
    UNIQUE (family_id, child_id, task_id, date)
);

CREATE TABLE public.weekly_payments (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id       uuid        NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
  child_id        uuid        NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  week_start_date date        NOT NULL,
  week_end_date   date        NOT NULL,
  total_points    integer     NOT NULL DEFAULT 0,
  goal_stars      integer     NOT NULL DEFAULT 0,
  money_stars     integer     NOT NULL DEFAULT 0,
  point_value_brl numeric(10,4),
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

-- Índices de performance
CREATE INDEX idx_children_family_id          ON public.children(family_id);
CREATE INDEX idx_tasks_family_child          ON public.tasks(family_id, child_id);
CREATE INDEX idx_task_instances_family_child ON public.task_instances(family_id, child_id, date);
CREATE INDEX idx_weekly_payments_family      ON public.weekly_payments(family_id, child_id, week_start_date, week_end_date);
CREATE INDEX idx_goals_family_child          ON public.goals(family_id, child_id);

-- Segurança: Row Level Security
ALTER TABLE public.families        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.children        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_instances  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weekly_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goals           ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso (single-tenant: uma família por projeto)
CREATE POLICY "families_anon"        ON public.families        FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "children_anon"        ON public.children        FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "tasks_anon"           ON public.tasks           FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "task_instances_anon"  ON public.task_instances  FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "weekly_payments_anon" ON public.weekly_payments FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "goals_anon"           ON public.goals           FOR ALL TO anon USING (true) WITH CHECK (true);

-- Permissões de acesso (necessárias para o app ler/gravar via supabase-js)
GRANT SELECT, INSERT, UPDATE, DELETE ON public.families        TO anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.children        TO anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tasks           TO anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.task_instances  TO anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.weekly_payments TO anon, authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.goals           TO anon, authenticated, service_role;
```

Ao final, vá em **Table Editor** e confirme que as **6 tabelas** aparecem: `families`, `children`, `tasks`, `task_instances`, `weekly_payments`, `goals`.

---

**Sobre a suspensão por inatividade — o que você precisa saber (nenhuma configuração):**

O plano gratuito do Supabase **suspende projetos sem uso por cerca de 7 dias**. Como isso afeta você, em três frases:

- **Usar o app mantém o projeto ativo.** Cada vez que você abre o KidsTasks, ele conversa com o seu banco, e isso conta. Abrindo ao menos uma vez por semana, você nunca verá uma suspensão.
- **Se ficar muito tempo sem abrir, a sincronização para.** O app continua funcionando normalmente no aparelho — as tarefas, as estrelas e o histórico estão salvos localmente —, mas deixa de conversar com o banco.
- **Voltar é um clique e não custa nada.** Entre em [supabase.com](https://supabase.com), abra o projeto e clique em **Restore project**. Em um ou dois minutos tudo volta. **Nada é apagado:** suspensão é pausa, não exclusão.

> 🔍 **Por que não sugerimos um "agendamento automático" aqui.** Uma receita comum na internet é criar um agendamento (`pg_cron`) dentro do próprio banco para fingir atividade. **Testamos e não funciona:** neste projeto o agendamento rodou com sucesso toda semana durante dois meses, e o Supabase suspendeu o projeto assim mesmo — cinco dias depois da última execução. A suspensão é medida por acesso ao **serviço**, não por consulta interna do banco. Preferimos não te dar um passo que não resolve.

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

### Passo 5 — Criar Família/Responsável e criança

1. No app, alterne para o modo **Responsável** (botão no topo)
2. Vá em **Configurações → Família/Responsável e Crianças**
3. Digite o nome da Família/Responsável e clique em **Criar Família/Responsável** — ela aparece no topo, como um banner
4. Digite o nome da criança e clique em **Adicionar criança** — ela aparece vinculada, logo abaixo
5. Clique em **Atualizar lista** se precisar recarregar

A partir daí, cadastre as tarefas na aba **Tarefas** e use o app normalmente.

---

## ☕ Apoiar o Projeto

O projeto é gratuito e possui **código-fonte disponível**. Se foi útil, considere apoiar:

Clique em **💖 Apoiar (PIX)** no rodapé do app para contribuir via PIX.

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
- [PRIVACY.md](./PRIVACY.md) · [SECURITY.md](./SECURITY.md) · [ACCESSIBILITY.md](./ACCESSIBILITY.md)

---

## 👤 Autor

**Marlon Gomes da Costa**
Desenvolvedor independente · MGC Dev

*Professor do IFMA Campus São Raimundo das Mangabeiras — projetos são iniciativas pessoais,
sem vínculo institucional.*

---

*© 2026 MGC Dev — Feito com ☕ no Maranhão*
