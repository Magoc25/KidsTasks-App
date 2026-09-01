# Changelog — KidsTasks

Todas as mudanças notáveis neste projeto estão documentadas aqui.
Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/).

---

## [2.5.0] — Setembro 2026

### ⚙️ Migração — quem já configurou o Supabase

Rode uma vez no **SQL Editor** do seu projeto Supabase. Sem isso o app continua funcionando, mas duas coisas ficam **presas a cada aparelho** em vez de sincronizadas — sem erro na tela, então não há como perceber sozinho:

```sql
ALTER TABLE public.families ADD COLUMN IF NOT EXISTS settings jsonb;
ALTER TABLE public.weekly_payments ADD COLUMN IF NOT EXISTS point_value_brl numeric(10,4);
```

- `families.settings` — as **configurações da família** (valor da ⭐, período semanal, níveis, PIN, gênero e chave PIX por criança). Sem a coluna, o que você ajusta num aparelho não aparece no outro.
- `weekly_payments.point_value_brl` — o **valor que a ⭐ tinha em cada semana já fechada**. Sem a coluna, o congelamento vale só no aparelho onde a semana foi arquivada; um segundo aparelho que nunca viu aquela semana a exibe pelo valor de hoje.

Quem está começando agora não precisa de nada: o bloco de criação no README já traz as duas colunas.

### 🆕 Adicionado

- **Aba 📊 Estatísticas** no painel do Responsável: acumulados de todas as semanas — estrelas, tarefas aprovadas, conquistas entregues, semanas registradas, total gerado (pago × pendente), média por semana, melhor semana e **ranking por criança**.
- **🎮 Minha Aventura**, no painel da criança: os mesmos números em linguagem para ela. **Dez níveis** (🌱 Brotinho → 👑 Lenda) com barra de progresso, **mascote** que muda conforme sobe, **confete e som** ao subir de nível, e a **trilha completa** (🗺️ *Sua jornada*) mostrando o que já conquistou, onde está e quanto falta para o próximo.
- **Níveis editáveis pelo responsável** — os limiares de estrelas de cada nível saem do padrão e podem ser ajustados em Configurações, com **Restaurar padrão** a um clique.
- **Gênero por criança nos títulos de nível.** Cada criança pode ser 👧 Menina, 👦 Menino ou 🙂 Neutro, e os títulos acompanham (Herói / Heroína / Craque; Campeão / Campeã / Fera; Mago / Maga / Mestre). O padrão é neutro, com nomes que servem a qualquer criança.
- **📖 Como funciona** — botão novo que abre uma página explicando o app para quem nunca vai abrir o GitHub: o que ele faz, onde os dados ficam, **tudo o que sai do aparelho** e as limitações conhecidas, com um interruptor entre leitura simples e técnica.

### 🔧 Melhorado

- **As configurações da família agora sincronizam.** Antes, tudo o que se ajustava em Configurações valia **só no aparelho onde foi ajustado** — o celular abria no padrão. Agora valor da ⭐, período semanal, mostrar dinheiro à criança, limiares de nível, gênero e chave PIX por criança e o PIN viajam entre dispositivos, com registro de quem mudou por último: um aparelho que nunca mexeu numa opção **não empurra o próprio padrão** por cima do que você configurou no outro.
- **Pagamento só de semana já virada.** Antes dava para registrar o pagamento da semana em andamento. Agora o botão só aparece depois que a semana fecha; a semana em curso mostra **📊 Em andamento**, e havendo semana passada pendente o app leva você até ela.
- **Tabelas do Responsável no celular** ganharam uma sombra na borda direita enquanto sobrar coluna escondida — antes a coluna de **Ações** nascia fora da tela sem nenhum sinal, e os botões pareciam não existir.
- **Painel da criança mais enxuto:** *Minhas Semanas* e *Minhas Conquistas* viraram seções recolhíveis e iniciam fechadas.
- O painel do Responsável **sempre abre na aba Semana**.
- **Contador ao vivo `0/200`** no comentário das avaliações — o limite já existia, mas cortava em silêncio.
- **Cabeçalho enxuto:** o título da aba mostrava o nome do app duas vezes; agora é só **KidsTasks**.
- **Instalação no Mac documentada.** A tabela "Instalar como app" do README não tinha nenhuma linha de macOS, e o rótulo *"no PC"* deixava o Mac de fora. Agora cobre Safari (**Arquivo → Adicionar ao Dock**), Chrome/Edge no Mac e Windows/Linux.
- **Testes automáticos a cada envio.** O app passou a ser verificado sozinho no GitHub Actions: dois aparelhos simulados contra um mesmo banco de teste, conferindo que a sincronização não perde configuração. São **77 verificações**, e cada uma foi validada quebrando o app de propósito para confirmar que ela realmente falha — teste que nunca falhou não prova nada.

### 🐛 Correções

- **Aumentar o valor da ⭐ reprecificava o histórico inteiro, inclusive semanas já pagas.** É esperado que o valor da estrela suba com o tempo — mas o aumento voltava no tempo: uma semana fechada por R$ 5,00 passava a exibir R$ 25,00 depois de a taxa ir de R$ 0,10 para R$ 0,50. Agora **cada semana arquivada guarda o valor que a ⭐ tinha na época**, e o card mostra esse valor quando ele difere do de hoje. A semana em curso continua seguindo o valor novo — é ela que ainda pode mudar. ⚠️ Semanas que já haviam sido reprecificadas **antes** desta correção não voltam ao valor original: ele não estava guardado em lugar nenhum.
- **Configurar uma criança podia apagar a configuração da outra.** Valia para o gênero e para a chave PIX: se o computador definia o da Ana e o celular — que ainda não tinha recebido essa mudança — definia o do Bruno, **a Ana desaparecia dos dois** no carregamento seguinte, sem erro e sem aviso. Agora cada criança tem o próprio registro e a fusão é criança a criança: o que existe só num aparelho nunca é apagado pelo outro.
- **Importar backup deixava duas configurações para trás** — o período semanal e as chaves PIX por criança não eram restaurados, e a criança ficava sem a chave depois de uma restauração.
- **A versão no rodapé podia mentir** sobre qual app estava rodando: era buscada do site, não do código em execução. Num build antigo preso em cache, mostrava a versão nova e escondia exatamente o problema que se queria enxergar.
- **Desfazer um pagamento** gravava de volta uma contagem de estrelas calculada pelo valor de hoje, corrompendo o registro da semana.
- **Contagem de dispositivos ativos** passou a considerar só dispositivos recorrentes — aba anônima, dados limpos e reinstalações geravam identificadores efêmeros que inflavam o número.
- **O aviso de privacidade descrevia a foto da criança como "cor de avatar".** O app permite ao responsável associar uma **foto** a cada criança; ela é escolhida por ele, redimensionada no próprio aparelho e guardada com os demais dados — nunca enviada ao desenvolvedor. Os documentos agora descrevem isso como é.
- **Blindagem de interface:** um elemento escondido pelo código podia continuar visível na tela.

---

## [2.4.1] — Junho 2026

### 🔧 Melhorias

- **Checagem de atualização mais robusta** — a versão deste build virou uma constante única (`APP_VERSION`) e a comparação com a versão publicada (`app_config`) ficou à prova de valores malformados. O banner de "nova versão" só dispara quando o app em execução está **realmente desatualizado** (versão publicada > versão do build), evitando aviso indevido.

---

## [2.4.0] — Junho 2026

### 🆕 Adicionado

- **Uso 100% offline, sem nuvem** — agora é possível **criar a Família/Responsável e as crianças sem configurar o Supabase** (os dados ficam só no dispositivo). Antes, esses botões exigiam o Supabase; um usuário novo sem nuvem não conseguia nem montar a família. O app cumpre o offline-first de ponta a ponta — a sincronização entre dispositivos continua opcional via Supabase.
- **Fluxo de cadastro mais intuitivo** — o botão **➕ adicionar criança** agora fica **no banner da Família/Responsável** e só aparece depois que ela é criada (antes ficava solto, ao lado de "Criar Família"). Reforça o caminho criar família → crianças → tarefas.

### 📄 Documentação

- README: deixado claro que o app é para **uma Família/Responsável com várias crianças** — para um segundo responsável, use outro dispositivo e (se sincronizar) uma conta Supabase separada. Adicionada a seção **Primeiros passos** (PIN padrão, criar Família/Responsável, crianças e tarefas).

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
