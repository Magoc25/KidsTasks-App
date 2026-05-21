# Changelog — KidsTasks

Todas as mudanças notáveis neste projeto estão documentadas aqui.
Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/).

---

## [2.1.0] — Maio 2026

### 🔒 Segurança e conformidade legal

- Adição de `Content-Security-Policy` no `<head>` do HTML — bloqueia scripts externos não autorizados, restringe conexões a `*.supabase.co` e impede exfiltração de dados via XSS.
- Criação de `PRIVACY.md` — Aviso de Privacidade completo (LGPD Art. 9º + Art. 14 + Art. 18 + Art. 33), detalhando as três camadas de dados e o tratamento de dados de menores.
- Criação de `SECURITY.md` — Política de Segurança e Plano de Resposta a Incidentes (LGPD Arts. 46–49 + Resolução CD/ANPD nº 15/2024).
- Criação de `ACCESSIBILITY.md` — Declaração de Acessibilidade (LBI Art. 63 + WCAG 2.2 + ABNT NBR 17225:2025).
- Criação de `DATA_INVENTORY.md` — Inventário simplificado de tratamento de dados (LGPD Art. 37 + ATPP).

### 📄 Documentação

- Atualização de `TERMS.md` (v2.1.0): referências cruzadas para os quatro novos documentos legais e adição de cláusula de obrigações do usuário sobre atualizações de segurança (CC Art. 945 + CDC Art. 12 §3º).
- Atualização de `README.md`: adição do Bloco 5b (GRANTs explícitos de acesso) nas instruções do Supabase — obrigatório a partir de 30/05/2026.

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
