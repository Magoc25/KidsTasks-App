# Changelog — KidsTasks

Todas as mudanças notáveis neste projeto estão documentadas aqui.
Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/).

---

## [2.3.2] — Junho 2026

### 🐛 Correções

- **Schema do Supabase no README estava desalinhado com o app** — `children` usa `avatar_data` (o README dizia `avatar_color`) e `weekly_payments` precisa de `goal_stars`/`money_stars`. Sem isso, foto da criança e histórico semanal não sincronizavam em bancos criados a partir do README. Incluído bloco de migração para bases já existentes.
- **"Aprovar todas" podia quebrar** diante de uma instância órfã (tarefa removida); agora ignora órfãs em vez de abortar.
- **Instâncias duplicadas entre dispositivos** — `task_instances` ganhou `UNIQUE (family_id, child_id, task_id, date)` e a sincronização passou a usar upsert atômico (com fallback para bancos sem a constraint).
- **Tarefas com `child_id` nulo** podiam duplicar ao alternar de criança — corrigida a substituição por id.
- **Falha ao salvar tarefa na nuvem era silenciosa** — agora o app avisa que ela ficou salva só no dispositivo.

### 🔧 Melhorias

- **Histórico do responsável passa a carregar a semana de todas as crianças** (antes só a criança ativa aparecia com valores).
- **Acessibilidade:** o banner de expandir/retrair crianças agora é acionável por teclado (`role`/`tabindex`/`aria-expanded`).
- **Código:** removida função morta (`markHistoryPaid`) e deduplicadas as rotinas de copiar o código PIX.
- **`SECURITY.md`:** esclarecido que o PIN do modo Responsável é um controle parental local, não uma barreira criptográfica.

---

## [2.3.1] — Junho 2026

### 🆕 Adicionado

- **Expandir/retrair as crianças no banner Família/Responsável** — toque no banner para ocultar ou mostrar a lista de crianças vinculadas (seta ▾ / ▸). Útil quando há muitas crianças, para não precisar rolar a tela. A preferência fica salva no dispositivo.

### 🐛 Correções

- **Número da versão no topo do app não atualizava** — ficava preso por até 6 horas num cache local (`kidstasks_app_version`). Agora o app exibe o cache imediatamente e **revalida o `CHANGELOG.md` a cada carregamento**, refletindo sempre a versão publicada.

---

## [2.3.0] — Junho 2026

### 🆕 Adicionado

- **Painel "Família/Responsável e Crianças" com hierarquia** — a Família/Responsável agora aparece como um **banner no topo** e as crianças ficam **aninhadas logo abaixo**, com uma barra lateral indicando o vínculo. Renomear a Família/Responsável direto no banner (botão ✏️, edição inline). O botão de criação foi renomeado para **"Criar Família/Responsável"**.
- **Botão GitHub no rodapé do app** — abre o repositório em nova aba. Ordem padronizada do rodapé: GitHub → Apoiar → Avaliações.

### 🐛 Correções

- **Família/Responsável não aparecia no painel de Configurações** — só as crianças eram listadas; o nome da família ficava apenas no campo de texto e no cabeçalho. Agora a Família/Responsável tem um elemento visual próprio (banner) acima das crianças.

### 🔧 Melhorias

- **Service Worker `network-first` para o HTML** — o app passa a carregar **sempre a versão publicada** quando online, caindo no cache só offline. Evita ficar preso numa versão antiga após uma atualização. Ícones, `manifest.json` e `favicon.svg` seguem `cache-first`. `CACHE_NAME` → `kidstasks-v57`.

### 📄 Documentação

- **README reescrito no padrão MGC Dev** — nova seção **"▶ Abrir agora"** com a URL pública em destaque e a instalação como PWA mesclada; **"Como usar"** reorganizado em Opção 1 (online) / 2 (cópia local) / 3 (sincronização); seção **"O que são os arquivos?"** corrigida (sem instruções de publicação no GitHub, que são tarefa do desenvolvedor); badge de versão atualizado.

---

## [2.2.0] — Maio 2026

### 🆕 Adicionado

- **Mensagens motivacionais ao concluir tarefa** — ao marcar uma tarefa como feita, uma mensagem animada aparece no centro da tela por 1s (ex: "Arrasou! ⭐", "Mandou bem! 🎉", "Que orgulho! ✨") sorteada aleatoriamente entre 10 opções.
- **Botão "✅ Aprovar todas"** — no cabeçalho do painel de aprovações; aprova todas as tarefas pendentes do dia de uma vez, usando as estrelas sugeridas por tarefa (baseado no cronômetro, se configurado).
- **Período semanal configurável** — em Configurações → Período semanal: escolha entre Dom–Sáb (padrão), Seg–Dom ou Seg–Sex (dias úteis). O app recalcula semana e histórico com base na opção salva. O cabeçalho do painel de semana exibe o período correto dinamicamente.

---

## [2.1.5] — Maio 2026

### 🐛 Correções

- **"🎖️ Conquistas" e "🎖️ Metas concluídas" não apareciam em dispositivos novos** — `goalsHistory` é armazenado apenas em localStorage; ao abrir o app em um dispositivo sem histórico local, as seções de conquistas ficavam vazias mesmo com metas entregues no Supabase. Corrigido: `loadGoalsFromSupabase()` agora verifica metas com `delivered:true` e, para cada uma sem entrada correspondente em `goalsHistory`, cria a entrada automaticamente a partir dos dados do Supabase.

---

## [2.1.4] — Maio 2026

### 🐛 Correções

- **Estrelas de aprovação quebravam linha no mobile** — `.starPick` sem `white-space:nowrap` permitia que os 5 botões de estrela fossem para a próxima linha em telas estreitas, dificultando identificar qual era a 5ª estrela. Corrigido com `display:flex;flex-wrap:nowrap` no container.

---

## [2.1.3] — Maio 2026

### 🐛 Correções

- **`archiveWeek()` sobrescrevia dados corretos no Supabase com instâncias parciais** — ao abrir o app em um segundo dispositivo com dados locais desatualizados, a função detectava virada de semana e fazia upsert em `weekly_payments` com totais menores do que o correto, apagando os dados reais. Corrigido: antes do upsert, compara com o valor já existente no Supabase; se o Supabase tiver `total_points` maior, o upsert é ignorado e um aviso é emitido no console.

---

## [2.1.2] — Maio 2026

### 🐛 Correções

- **"Marcar entregue" não persistia no Supabase** — ao recarregar o app (Ctrl+Shift+R ou trocar de dispositivo), o Supabase sobrescrevia o estado local com `delivered:false`, fazendo a meta voltar para a lista ativa. Corrigido: o handler agora chama `updateGoalInSupabase()` após salvar localmente.
- **Painel do responsável (Metas)** — metas com `delivered:true` ainda apareciam na lista ativa com barra e "🎉 Meta atingida!". Corrigido: o mesmo filtro do painel da criança foi aplicado ao painel do responsável; metas entregues aparecem apenas em "🎖️ Metas concluídas".

---

## [2.1.1] — Maio 2026

### 🐛 Correções

- **Painel da criança — metas entregues** continuavam aparecendo na lista ativa com barra cheia e "Meta atingida! Fale com o responsável." após serem marcadas como entregues. Agora metas com `delivered=true` são ignoradas na lista ativa e aparecem apenas em "🎖️ Conquistas".
- **Duplo clique em "Marcar entregue"** gerava entradas duplicadas em "🎖️ Metas concluídas" e "🎖️ Conquistas". Adicionado guard `if(goal.delivered) return` no início do handler.
- **Sem botão para remover entrada do histórico de metas** — adicionado botão ✕ em cada entrada de "🎖️ Metas concluídas" no painel do responsável para remoção de duplicatas ou entradas indesejadas.

---

## [2.1.0] — Maio 2026

### 🆕 Funcionalidades novas

#### Sincronização e histórico
- **Backup local** — exportar e importar dados completos em arquivo `.json` (card 💾 em Configurações)
- **Supabase Realtime** — subscription push-based em `task_instances`: ações de um dispositivo aparecem instantaneamente no outro sem recarregar
- **Auto-sync por polling** — recarrega instâncias do Supabase a cada 30s e ao voltar ao app (`visibilitychange`), como fallback quando Realtime não está disponível
- **Coluna `money_stars`** — armazena estrelas monetárias separado de estrelas de metas; elimina ambiguidade para tarefas tipo "Ambos"
- **Re-arquivo da semana anterior via Supabase** (`reArchivePrevWeekFromSupabase`) — na virada de semana, recarrega instâncias da semana anterior e re-arquiva; garante que aprovações feitas em outro dispositivo no último dia não sejam perdidas

#### Pagamentos e PIX
- **Modal de pagamento PIX / Dinheiro** — ao clicar em "Registrar pagamento", abre modal com opções: PIX (QR Code com valor exato) ou Dinheiro
- **Chave PIX por criança** — campo configurável em Configurações → Família e crianças
- **Desfazer pagamento** — botão "Desfazer" no Histórico do responsável
- **Modal inteligente** — se a semana atual tem 0 estrelas, redireciona automaticamente para a semana anterior não paga
- **Label da semana no modal** — exibe período exato ("📅 03/mai – 09/mai") da semana sendo paga
- **Banner de semana anterior pendente** — aba "Semana" exibe aviso amarelo com período, valor e botão direto "💳 Registrar"

#### Interface e UX
- **Cronômetro em tela cheia** — overlay fullscreen com círculo SVG animado; verde → amarelo → vermelho; Wake Lock API mantém tela acesa
- **Cards "Hoje" e "Semana" separados** no painel criança
- **Progresso semanal correto** — `weekTotal` calculado por frequência (diária=7, semanal=1, personalizada=nº dias)
- **Detecção de virada de dia** — `setInterval` de 60s detecta mudança de data com app aberto
- **Histórico ao vivo** — semana atual exibida em andamento em "Minhas Semanas" e "Histórico"
- **Header da aba Semana com datas** — exibe o período exato da semana atual
- **Drag & drop para reordenar tarefas** — alça ⠿ na tabela do responsável; Pointer Events (mouse + toque); ordem reflete no painel da criança; persiste via `state.taskOrder`

#### Metas e recompensas
- **Histórico permanente de metas entregues** (`goalsHistory[]`) — registro salvo ao marcar "Entregue"; visível em "🎖️ Metas concluídas" e "🎖️ Conquistas"; persiste mesmo após exclusão da meta
- **`totalGoalStars` acumulado entre semanas** — soma estrelas de todas as semanas arquivadas + semana atual; não zera na virada de domingo

### 🔧 Melhorias

- Botões do header ícone-only no mobile (👦 / 🔒) com tooltip — evita quebra de linha
- Modal PIN — input full-width + `autocomplete="off"`
- Fuso horário Brasília (UTC-3) — `getTodayISO()` e `getWeekRange()` usam `America/Sao_Paulo`
- QR Code PIX normalizado — `normPix()` remove acentos dos campos 59/60 do EMV; resolve "Parâmetros inválidos" em bancos que rejeitam UTF-8

### 🐛 Correções

- Bug raiz de sincronização — `loadTaskInstancesFromSupabase` filtrava por `i.id` em vez de `isUuidLike(i.taskId)`; causava instâncias duplicadas
- Race condition de polling — poll de 30s sobrescrevia estado local durante sync ativo; corrigido com `_lastLocalChange` (trava 15s após ação local)
- Dados do sábado perdidos na virada — corrigido com `reArchivePrevWeekFromSupabase()`
- `totalGoalStars` zerado após virada — `computeSummary()` agora acumula `goalStars` das semanas arquivadas
- `moneyBRL` do histórico sobrescrito pelo DEFAULT 0 do Supabase — preserva valor local quando banco tem 0
- `TypeError: .catch is not a function` em `_markHistoryPaidDirect` — `PostgrestBuilder` do Supabase v2 só implementa `.then()`; corrigido para `try/catch`
- `syncInstanceToSupabase` usava `state.childId` em vez de `instance.childId`
- Exclusão de metas não chamava `.delete()` no Supabase
- R$ zerado para tarefas "Ambos" — `fixHistoryMoneyBRL()` corrige entradas históricas
- `unmarkHistoryPaid` revertia ao sincronizar — trocado por `upsert` com registro completo
- `const currentWeekStart` duplicado em `renderHistory` causava `SyntaxError`
- Ícones PWA — `icon-192.png` e `icon-512.png` estavam 690×629px; redimensionados para 192×192 e 512×512
- Tarefas fantasma (`child_id IS NULL`) detectadas como causa de recarregamento indevido após sync

### 🏗️ Infraestrutura

- Renomeação: `KidsTasks2.html` → `KidsTasks.html`
- `favicon.svg` — quadrado navy arredondado com estrela dourada
- Ping anônimo de dispositivos ativos — 1 ping/dia à tabela `app_pings` do Supabase compartilhado
- GitHub Action `update-stats.yml` — diário, grava `stats.json` com contagem de dispositivos únicos (30d)
- Badge dinâmico no README — shields.io lendo `stats.json`
- pg_cron keep-alive — agendamento nativo no Supabase do usuário; instruções no README

### 🔒 Segurança e conformidade legal

- `Content-Security-Policy` no `<head>` do HTML — bloqueia scripts externos não autorizados, restringe conexões a `*.supabase.co`
- `PRIVACY.md` — Aviso de Privacidade (LGPD Art. 9º + Art. 14 + Art. 18 + Art. 33), arquitetura em três camadas, tratamento de dados de menores
- `SECURITY.md` — Política de Segurança e Plano de Resposta a Incidentes (LGPD Arts. 46–49 + ANPD Res. 15/2024)
- `ACCESSIBILITY.md` — Declaração de Acessibilidade (LBI Art. 63 + WCAG 2.2 + ABNT NBR 17225:2025)
- `DATA_INVENTORY.md` — Inventário simplificado de tratamento de dados (LGPD Art. 37 — ATPP)

### 📄 Documentação

- `TERMS.md` v2.1.0: referências cruzadas para os documentos legais e cláusula de obrigações do usuário sobre atualizações (CC Art. 945 + CDC Art. 12 §3º)
- `README.md`: Bloco 5b com GRANTs explícitos de acesso ao Supabase — obrigatório a partir de 30/05/2026

---

## [2.0.1] — Maio 2026

### 📄 Documentação e licenciamento
- Inclusão do arquivo `LICENSE.md` com licença própria de uso não comercial.
- Revisão de `README.md` para remover referências a "open source" permissivo e esclarecer que o projeto possui código-fonte disponível com restrições comerciais.
- Atualização de `TERMS.md` com cláusulas mais detalhadas de propriedade intelectual, modificações, redistribuição e uso comercial.
- Alinhamento de todos os documentos ao ano de 2026 e ao registro correto do lançamento inicial em abril de 2026.

---

## [2.0.0] — Maio 2026

### 🎨 Nova interface
- Design profissional com tema navy/branco, cards, tipografia e sistema de cores
- Layout responsivo: grade 2 colunas no desktop, 1 coluna no mobile
- Tarefas com ícones emoji grandes e cores por tarefa (mint, peach, sky, yellow, lavender)
- Modo Criança e Painel do Responsável como painéis separados (não abas)
- Toast notifications em vez de alertas do navegador

### 🆕 Funcionalidades novas
- **Aprovação com estrelas (1–5)** — responsável atribui de 1 a 5 ⭐ ao aprovar cada tarefa
- **Suporte multi-criança** — tarefas, instâncias e metas separadas por criança
- **Aba Metas por criança** — cada criança tem suas próprias metas e progresso independentes
- **Editar tarefa** — modal para editar nome, ícone, estrelas, frequência e tipo
- **Editar meta** — modal para editar nome, ícone, alvo e marcar como entregue
- **Excluir tarefa e meta** — com confirmação
- **Mostrar dinheiro para criança** — toggle opcional nas configurações
- **KPI Dashboard** — painel do responsável com Pendentes, Aprovadas e Estrelas da semana

### 🔧 Melhorias
- Conversão ⭐ → R$ configurável pelo responsável
- Tarefas tipo 💰 Dinheiro ou 🏆 Meta definidas por tarefa
- Semana Dom–Sáb
- Versão automática lida do CHANGELOG.md
- Banner de nova versão via Supabase app_config

### 🗄️ Banco de dados
- Novas colunas: `icon`, `tint`, `reward_type` em `tasks`
- Nova coluna: `approved_stars` em `task_instances`
- Nova tabela: `goals` (metas por criança com alvo em estrelas)

---

## [1.0.0] — Abril 2026

### 🚀 Lançamento inicial

- Modo Criança: visualização e marcação de tarefas diárias com ícones grandes
- Modo Responsável: aprovação/reprovação de tarefas protegido por PIN
- Cadastro de família, crianças e tarefas com pontos e frequência
- Resumo semanal de pontos aprovados e registro de pagamento
- Sincronização opcional com Supabase (multi-dispositivo)
- Armazenamento em `localStorage` (offline-first)
- PWA instalável (Android, iOS, desktop)
- Indicador de status de conexão com nuvem
- Sistema de avaliações e apoio via PIX

---

*© 2026 MGC Dev — Marlon Gomes da Costa · Projeto pessoal e independente*
