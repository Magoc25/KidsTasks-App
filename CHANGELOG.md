# Changelog — KidsTasks

Todas as mudanças notáveis neste projeto estão documentadas aqui.
Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/).

---

## [2.0.0] — Maio 2025

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

## [1.0.0] — Abril 2025

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

*© 2025 MGC Dev — Marlon Gomes da Costa · Projeto pessoal e independente*
