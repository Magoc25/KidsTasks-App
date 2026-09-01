# Inventário de Tratamento de Dados — KidsTasks

**Agente:** Marlon Gomes da Costa (MGC Dev) · **Porte:** ATPP · **Atualizado em:** Maio de 2026

Inventário simplificado conforme [LGPD Art. 37](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm) e [Resolução CD/ANPD nº 2/2022 (Art. 7º)](https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/resolucao-cd-anpd-no-2-de-27-de-janeiro-de-2022).

> ⚠️ Este inventário cobre apenas os dados sob controle do desenvolvedor (Camada 1 — Supabase compartilhado). Os dados das Camadas 2 (localStorage) e 3 (Supabase pessoal do usuário) estão sob controle exclusivo do usuário.

---

## Operações de tratamento sob controle do desenvolvedor

| # | Dado | Categoria | Origem | Finalidade | Base legal (LGPD Art. 7º) | Compartilhamento | Retenção | Transferência internacional | Medidas de segurança |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `device_id` (UUID aleatório) | Identificador de dispositivo (não pessoal identificável diretamente) | Gerado pelo app no dispositivo do usuário | Contagem de dispositivos ativos nos últimos 30 dias (métrica de uso anônima) | IX — Legítimo interesse | Supabase Inc. (infraestrutura) | 30 dias (substituição automática) | EUA — Supabase Inc. | RLS habilitado; UUID sem vínculo a dados pessoais |
| 2 | `app_name`, `version`, `ping_date` | Metadados técnicos | Gerados pelo app | Associar o ping ao app e à versão correta | IX — Legítimo interesse | Supabase Inc. (infraestrutura) | 30 dias (junto ao ping) | EUA — Supabase Inc. | RLS habilitado |
| 3 | Nome (texto livre, máx. 40 chars) | Dado pessoal — cadastral | Fornecido voluntariamente pelo usuário no formulário de avaliação | Identificar a avaliação na listagem pública | I — Consentimento | Supabase Inc. (infraestrutura); outros usuários do app (leitura pública) | Indefinido; remoção sob solicitação | EUA — Supabase Inc. | Constraints SQL (tamanho, bloqueio de padrões de injeção); RLS; `esc()` no frontend |
| 4 | Comentário (texto livre, máx. 200 chars) | Dado pessoal — opinião | Fornecido voluntariamente pelo usuário no formulário de avaliação | Exibir avaliação qualitativa a outros usuários | I — Consentimento | Supabase Inc. (infraestrutura); outros usuários do app (leitura pública) | Indefinido; remoção sob solicitação | EUA — Supabase Inc. | Constraints SQL (tamanho, bloqueio de padrões de injeção); RLS; `esc()` no frontend |
| 5 | Quantidade de estrelas (1–5) | Dado não pessoal | Selecionado pelo usuário | Classificação da avaliação | I — Consentimento | Supabase Inc. (infraestrutura); outros usuários do app | Indefinido; remoção sob solicitação | EUA — Supabase Inc. | Constraint SQL (range 1–5) |
| 6 | Indicação de doação (booleano) | Dado não pessoal | Marcado pelo usuário (padrão: verdadeiro) | Badge de apoiador na exibição da avaliação | I — Consentimento | Supabase Inc. (infraestrutura); outros usuários do app | Indefinido; remoção sob solicitação | EUA — Supabase Inc. | RLS |
| 7 | Data da avaliação (formato pt-BR) | Dado não pessoal | Gerado pelo app no momento do envio | Ordenação e exibição cronológica das avaliações | I — Consentimento | Supabase Inc. (infraestrutura); outros usuários do app | Indefinido; remoção sob solicitação | EUA — Supabase Inc. | RLS |

---

## Dados fora do escopo deste inventário (sob controle do usuário)

Os dados abaixo são tratados exclusivamente pelo usuário. O desenvolvedor não tem acesso a eles.

| Dado | Onde fica | Quem controla |
|---|---|---|
| Nome da família | localStorage do dispositivo / Supabase pessoal | Usuário |
| Nomes das crianças e **foto da criança** (opcional, escolhida pelo responsável e redimensionada no aparelho) | localStorage do dispositivo / Supabase pessoal | Usuário |
| Tarefas, instâncias, pagamentos, metas | localStorage do dispositivo / Supabase pessoal | Usuário |
| PIN do responsável | localStorage do dispositivo | Usuário |
| Chave e URL do Supabase pessoal | localStorage do dispositivo | Usuário |
| Preferências e estado da interface | localStorage do dispositivo | Usuário |

---

## Notas sobre o enquadramento

- **Porte:** o desenvolvedor é pessoa física (ATPP), sem fins lucrativos, sem cobrança, sem vínculo institucional com o IFMA.
- **Ausência de DPO formal:** dispensado para ATPP conforme Resolução CD/ANPD nº 2/2022. Canal de comunicação publicado: marlongc25@protonmail.com.
- **Dados de menores:** nenhum dado identificável de crianças é coletado pelo desenvolvedor na Camada 1. Os dados operacionais do app (nomes de crianças, tarefas) ficam exclusivamente sob controle do responsável legal (Camadas 2 e 3).
- **Transferência internacional:** todos os dados da Camada 1 transitam por infraestrutura do Supabase Inc. (EUA). Base legal: Art. 33, II da LGPD (garantias contratuais) para dados de pings e metadados; consentimento expresso (Art. 7º, I) para dados de avaliações.

---

## Atualização deste inventário

Este inventário deve ser atualizado sempre que:

- Um novo tipo de dado for coletado pelo desenvolvedor
- A finalidade ou base legal de tratamento existente mudar
- Um novo terceiro receber os dados
- A política de retenção mudar

Próxima revisão programada: **Novembro de 2026**

---

*© 2026 MGC Dev — Marlon Gomes da Costa*
*Base legal: [LGPD Art. 37](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm) · [Resolução CD/ANPD nº 2/2022 Art. 7º](https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/resolucao-cd-anpd-no-2-de-27-de-janeiro-de-2022)*
