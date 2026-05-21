# Aviso de Privacidade — KidsTasks

**Versão:** 1.0 · **Última atualização:** Maio de 2026

---

## 1. Quem somos

**Controlador:** Marlon Gomes da Costa (MGC Dev)
**Contato:** marlongc25@protonmail.com
**Porte:** Agente de Tratamento de Pequeno Porte (ATPP) conforme [Resolução CD/ANPD nº 2/2022](https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/resolucao-cd-anpd-no-2-de-27-de-janeiro-de-2022).

---

## 2. Arquitetura de dados — três camadas

O KidsTasks opera em três camadas distintas, com responsabilidades diferentes sobre os dados:

| Camada | Quem controla | O que armazena |
|---|---|---|
| **Camada 1** — Infraestrutura do desenvolvedor | MGC Dev | Avaliações e pings anônimos (Supabase compartilhado); código hospedado no GitHub Pages |
| **Camada 2** — Dispositivo do usuário | Você (usuário) | Todos os dados de família, crianças, tarefas e configurações (localStorage do navegador) |
| **Camada 3** — Banco de dados pessoal | Você (usuário) | Dados sincronizados no seu próprio projeto Supabase, se configurado |

> Para a **Camada 3**, o KidsTasks se conecta ao banco de dados que você mesmo criou e controla. O desenvolvedor não tem acesso a esse banco, não conhece suas credenciais e não pode ler os dados armazenados lá.

---

## 3. Quais dados coletamos e por quê

### 3.1 Dados na Camada 1 (MGC Dev como controlador)

#### a) Identificador anônimo de dispositivo (`device_id`)

- **O que é:** UUID aleatório gerado automaticamente pelo app na primeira abertura.
- **Por que coletamos:** contar quantos dispositivos únicos utilizam o app nos últimos 30 dias, sem identificar o usuário.
- **Base legal:** legítimo interesse do controlador ([LGPD Art. 7º, IX](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm)) — métricas de uso anônimas para avaliar adoção do app.
- **O que é enviado:** `device_id`, nome do app (`KidsTasks`), versão, data do ping (1×/dia).
- **Retenção:** 30 dias a partir de cada ping; substituído automaticamente por dados mais recentes.
- **Onde fica:** Supabase compartilhado (região EUA — ver transferência internacional).

#### b) Dados de avaliações (opcionais, mediante ação explícita do usuário)

- **O que é:** nome, comentário, quantidade de estrelas, indicação de doação e data — fornecidos voluntariamente ao clicar em "☕ Apoiar" e depois "✅ Já fiz o PIX — quero avaliar".
- **Por que coletamos:** exibir avaliações para outros usuários do app.
- **Base legal:** consentimento ([LGPD Art. 7º, I](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm)) — o usuário inicia ativamente o fluxo de avaliação.
- **O que é enviado:** nome (máx. 40 caracteres), comentário (máx. 200 caracteres), estrelas (1–5), indicação de doação (sim/não), data (formato pt-BR), timestamp ISO.
- **Retenção:** indefinida enquanto o app estiver ativo; remoção mediante solicitação ao canal de contato.
- **Onde fica:** Supabase compartilhado (região EUA — ver transferência internacional).

### 3.2 Dados na Camada 2 (dispositivo do usuário — fora do controle do desenvolvedor)

Todos os dados operacionais do app ficam no `localStorage` do navegador no seu próprio dispositivo:

- Dados de família e crianças (nome, cor de avatar)
- Tarefas, instâncias, pagamentos semanais e metas
- Configurações do app (chave e URL do seu Supabase, PIN do responsável)
- Preferências e estado da interface

Esses dados **nunca saem do seu dispositivo** a menos que você configure sua própria conta no Supabase (Camada 3).

### 3.3 Dados na Camada 3 (Supabase pessoal do usuário — fora do controle do desenvolvedor)

Se você configurar o Supabase opcional:

- Todos os dados listados na Camada 2 são replicados no banco de dados que você criou e controla.
- O desenvolvedor **não tem acesso** a esse banco — as credenciais ficam apenas no seu dispositivo e nunca são enviadas ao desenvolvedor.
- As políticas de privacidade e segurança do Supabase (sua conta) regem esses dados.

---

## 4. Dados de crianças e adolescentes

O KidsTasks é destinado a responsáveis legais para organizar as tarefas de seus filhos. Em conformidade com o [Art. 14 da LGPD](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm) e com a [Lei 15.211/2025 (ECA Digital)](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/l15211.htm):

- Nomes e dados de crianças inseridos no app ficam **exclusivamente no dispositivo do responsável** (Camada 2) ou no banco de dados pessoal do responsável (Camada 3), ambos sob controle do próprio responsável.
- **O desenvolvedor não coleta, não acessa e não armazena dados identificáveis de crianças** no Supabase compartilhado (Camada 1).
- As avaliações (Camada 1) são ações voluntárias de adultos — o app não solicita nem armazena dados de crianças no sistema de avaliações.
- O identificador anônimo de dispositivo (Camada 1) não contém qualquer informação pessoal de crianças.
- O app **não é destinado ao uso direto por menores** — é uma ferramenta para responsáveis. A interação da criança com o app ocorre mediante supervisão do responsável no mesmo dispositivo.

---

## 5. Com quem compartilhamos

| Dado | Destinatário | Finalidade | País |
|---|---|---|---|
| `device_id`, versão, data | Supabase Inc. (infraestrutura) | Hospedagem do banco de dados compartilhado | EUA |
| Avaliações (nome, comentário) | Supabase Inc. (infraestrutura) | Hospedagem do banco de dados compartilhado | EUA |
| Avaliações | Outros usuários do KidsTasks | Exibição pública das avaliações | — |
| Código do app | GitHub Inc. (infraestrutura) | Hospedagem do GitHub Pages | EUA |

Não vendemos, cedemos nem compartilhamos dados para fins publicitários, analíticos comerciais ou quaisquer outros fins além dos descritos acima.

---

## 6. Transferência internacional de dados

Os dados da Camada 1 (device_id e avaliações) são armazenados no Supabase compartilhado, cuja infraestrutura está hospedada nos Estados Unidos.

Essa transferência ocorre com base no [Art. 33, II da LGPD](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm) (garantias contratuais — Supabase adota cláusulas de proteção de dados compatíveis com padrões internacionais) e, para avaliações, no consentimento expresso do usuário ao submeter a avaliação voluntariamente.

---

## 7. Por quanto tempo guardamos os dados

| Dado | Período de retenção |
|---|---|
| `device_id` e pings | 30 dias a partir de cada ping (substituição automática) |
| Avaliações | Indefinido enquanto o app estiver ativo; remoção sob solicitação |
| Dados na Camada 2 (localStorage) | Controlados pelo usuário — permanecem até o usuário limpar os dados do navegador ou usar a função de limpeza do app |
| Dados na Camada 3 (Supabase pessoal) | Controlados pelo usuário — sob as políticas do banco de dados que o usuário mantém |

---

## 8. Seus direitos (Art. 18 da LGPD)

Como titular dos dados, você tem os seguintes direitos:

| Direito | Como exercer |
|---|---|
| Confirmação e acesso | Solicite ao contato abaixo — informaremos se tratamos dados associáveis a você |
| Correção | Para avaliações: solicite a alteração ou remoção pelo contato abaixo |
| Eliminação | Para device_id e pings: aguardam exclusão automática em 30 dias. Para avaliações: solicite ao contato |
| Portabilidade | Disponibilizaremos os dados em formato legível sob solicitação |
| Revogação do consentimento | Para avaliações: solicite remoção ao contato abaixo |
| Informação sobre compartilhamento | Detalhado na seção 5 acima |
| Oposição | Envie solicitação ao contato com fundamento no Art. 18, IX |

**Prazo de resposta:** até 30 dias (regime ATPP conforme Resolução CD/ANPD nº 2/2022).
**Canal:** marlongc25@protonmail.com — identifique-se e descreva a solicitação.

> Os dados das Camadas 2 e 3 estão sob seu próprio controle — você pode excluí-los diretamente pelas configurações do app ou do seu Supabase pessoal, sem precisar solicitar ao desenvolvedor.

---

## 9. Segurança dos dados

Consulte o [SECURITY.md](./SECURITY.md) para detalhes sobre as medidas técnicas e o plano de resposta a incidentes adotados.

Em resumo:

- **Camada 1:** acesso ao Supabase compartilhado restrito por Row Level Security (RLS); inputs sanitizados no frontend (função `esc()`) e protegidos por Content Security Policy (CSP) no HTML; constraints SQL limitam tamanho e formato dos dados de avaliação.
- **Camada 2:** localStorage do navegador — protegido pelas políticas de segurança do próprio navegador e do sistema operacional do usuário.
- **Camada 3:** Supabase pessoal do usuário — protegido pelas configurações de segurança que o usuário mesmo define.

---

## 10. Cookies e tecnologias similares

O KidsTasks **não utiliza cookies** no sentido tradicional. Em seu lugar, usa o `localStorage` do navegador — uma tecnologia de armazenamento local que funciona de forma similar a cookies, mas sem enviar dados ao servidor automaticamente a cada requisição.

O `localStorage` armazena dados **exclusivamente no seu dispositivo** e está descrito na seção 3.2 acima. Você pode limpar esse armazenamento pelas configurações do seu navegador a qualquer momento.

---

## 11. Menores de 18 anos como usuários diretos

Este app não é destinado ao uso autônomo por menores de 18 anos. É uma ferramenta para responsáveis legais. Caso identifiquemos uso indevido por menores sem supervisão de responsável, tomaremos as medidas cabíveis para remoção dos dados, conforme o [Art. 14 da LGPD](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm) e a [Lei 15.211/2025](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/l15211.htm).

---

## 12. Alterações neste aviso

Qualquer alteração material será comunicada por meio do banner de atualização exibido no próprio app. A data da última revisão está no topo deste documento. O histórico de versões significativas consta no [CHANGELOG.md](./CHANGELOG.md).

---

## 13. Contato

**Marlon Gomes da Costa (MGC Dev)**
marlongc25@protonmail.com

*Desenvolvedor independente. Professor do IFMA Campus São Raimundo das Mangabeiras — projetos são iniciativas pessoais, sem vínculo institucional.*

---

*© 2026 MGC Dev — Marlon Gomes da Costa*
*Base legal: [Lei 13.709/2018 (LGPD)](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm) · [Resolução CD/ANPD nº 2/2022](https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/resolucao-cd-anpd-no-2-de-27-de-janeiro-de-2022) · [Lei 15.211/2025 (ECA Digital)](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/l15211.htm)*
