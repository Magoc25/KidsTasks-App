# Política de Segurança — KidsTasks

**Versão:** 1.0 · **Última atualização:** Maio de 2026

---

## 1. Escopo

Este documento descreve as medidas técnicas de segurança adotadas no KidsTasks, o canal para relato de vulnerabilidades e o plano de resposta a incidentes de segurança, em conformidade com os [Arts. 46–49 da Lei 13.709/2018 (LGPD)](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm) e com a [Resolução CD/ANPD nº 15/2024](https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd) (Regulamento de Comunicação de Incidente de Segurança — RCIS).

Aplica-se apenas aos dados da **Camada 1** (Supabase compartilhado sob controle do desenvolvedor). Os dados das Camadas 2 e 3 estão sob controle exclusivo do usuário — consulte o [PRIVACY.md](./PRIVACY.md) para detalhes da arquitetura.

---

## 2. Medidas técnicas de segurança implementadas

### 2.1 Sanitização de inputs — frontend

Todos os campos de texto fornecidos pelo usuário que são inseridos no DOM via `innerHTML` passam pela função `esc()`, que escapa os caracteres `&`, `<`, `>`, `"` e `'`. Isso previne ataques de Cross-Site Scripting (XSS).

### 2.2 Content Security Policy (CSP)

O HTML do app inclui uma meta tag `Content-Security-Policy` que restringe:

- Scripts externos ao domínio `cdn.jsdelivr.net` (supabase-js e canvas-confetti)
- Conexões de rede ao próprio domínio e a `*.supabase.co`
- Imagens externas a `api.qrserver.com` e `chart.googleapis.com` (usadas para o QR Code PIX)
- Execução de plugins (`object-src: none`)

Isso impede que código malicioso inserido via XSS exfiltre dados para servidores de terceiros.

### 2.3 Constraints SQL no banco compartilhado

A tabela `app_reviews` no Supabase compartilhado possui as seguintes restrições de banco de dados:

- Tamanho máximo de nome: 60 caracteres
- Tamanho máximo de comentário: 1.000 caracteres
- Intervalo de estrelas: 1 a 5
- Bloqueio de padrões de injeção: `<script>`, `<iframe>`, `javascript:`, atributos `on*=`
- Rate limiting: no mínimo 5 minutos entre avaliações do mesmo nome

### 2.4 Row Level Security (RLS) — Supabase

O Supabase compartilhado tem RLS habilitado em todas as tabelas. As políticas atuais permitem inserção e leitura pública (necessário para o sistema de avaliações compartilhadas), mas a combinação com as constraints SQL acima impede o uso abusivo para injeção de conteúdo malicioso.

### 2.5 Dados de menores — separação por arquitetura

Dados identificáveis de crianças (nomes, tarefas, desempenho) nunca transitam pelo Supabase compartilhado — ficam exclusivamente no dispositivo do responsável (localStorage) ou no Supabase pessoal controlado pelo próprio responsável.

### 2.6 Identificador de dispositivo anônimo

O identificador de dispositivo (`device_id`) é um UUID aleatório gerado pelo `crypto.randomUUID()`. Não contém informações pessoais identificáveis, endereço de IP, localização nem qualquer dado que permita identificar o usuário individualmente.

### 2.7 GitHub Pages e integridade do código

O código do app é hospedado no GitHub Pages como arquivo estático. Não há servidor de aplicação, banco de dados acessível publicamente sem autenticação de API, nem mecanismo de execução de código do lado do servidor. O vetor de ataque é restrito ao frontend.

---

## 3. Responsabilidades do usuário sobre atualizações

Em conformidade com o [Art. 12, §3º do CDC](https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm) e com o princípio da culpa concorrente previsto no [Art. 945 do Código Civil](https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm), o usuário tem a responsabilidade de:

- Manter o app atualizado, utilizando o botão "Recarregar" quando o banner de nova versão aparecer.
- Não ignorar atualizações de segurança — o banner exibe a versão disponível; versões com correções de segurança são identificadas como tal no [CHANGELOG.md](./CHANGELOG.md).
- Verificar periodicamente se há nova versão disponível, especialmente se não abrir o app por períodos prolongados.

O desenvolvedor não se responsabiliza por danos decorrentes do uso de versões desatualizadas do app quando o usuário tiver sido notificado da atualização disponível pelo mecanismo de banner integrado.

---

## 4. Canal de relato de vulnerabilidades (Responsible Disclosure)

Se você identificar uma vulnerabilidade de segurança no KidsTasks:

**Contato:** marlongc25@protonmail.com
**Assunto:** `[KidsTasks] Vulnerabilidade de segurança`

**Inclua:**
1. Descrição da vulnerabilidade e impacto potencial
2. Passos para reproduzir
3. Versão do app afetada (exibida no rodapé)
4. Ambiente (navegador, sistema operacional)

**Prazo de resposta:** até 7 dias úteis para acuse de recebimento; até 30 dias para comunicar a decisão sobre a correção.

Por favor, **não divulgue publicamente** a vulnerabilidade antes de receber nossa resposta ou antes de decorridos 90 dias do relato (política de responsible disclosure coordenada).

---

## 5. Plano de resposta a incidentes de segurança

Em conformidade com a [Resolução CD/ANPD nº 15/2024](https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd) (RCIS):

### 5.1 Classificação de incidente

Um incidente de segurança relevante inclui, sem limitação:

- Acesso não autorizado ao Supabase compartilhado
- Injeção de conteúdo malicioso nas avaliações visíveis a outros usuários
- Exposição de dados pessoais contidos nas avaliações

### 5.2 Procedimento interno

```
1. DETECÇÃO
   - Registrar data, hora e natureza do incidente
   - Identificar dados afetados e número aproximado de titulares

2. CONTENÇÃO (em até 24h)
   - Revogar ou rolar credenciais do Supabase comprometido
   - Bloquear o vetor de ataque
   - Preservar logs para análise

3. AVALIAÇÃO (em até 48h)
   - Confirmar se há risco ou dano relevante aos titulares
   - Se sim: iniciar comunicação (passo 4)
   - Se não: documentar e registrar como incidente interno

4. COMUNICAÇÃO (em até 3 dias úteis para ATPP: 6 dias úteis)
   - ANPD: formulário CIS disponível em gov.br/anpd
   - Titulares afetados: aviso no canal de contato e banner no app

5. REMEDIAÇÃO
   - Corrigir vulnerabilidade
   - Publicar nova versão com tag de segurança no CHANGELOG.md
   - Bumpar CACHE_NAME no service worker para forçar atualização

6. PÓS-INCIDENTE
   - Relatório interno completo
   - Atualização deste documento se necessário
```

### 5.3 Comunicação preliminar

Se as informações estiverem incompletas no momento do incidente, é permitida comunicação preliminar à ANPD em até 6 dias úteis (regime ATPP), com complementação em até 20 dias.

---

## 6. Versões com correções de segurança

Versões que corrijam vulnerabilidades são identificadas com a tag `🔒 Security` no [CHANGELOG.md](./CHANGELOG.md). Recomenda-se atualizar imediatamente ao identificar esse tipo de entrada.

---

## 7. Dependências de terceiros

| Dependência | Versão | Finalidade | Licença |
|---|---|---|---|
| `@supabase/supabase-js` | v2 (CDN) | Cliente para Supabase (reviews e dados próprios) | MIT |
| `canvas-confetti` | v1.9.3 (CDN) | Animação de confete na interface | MIT |
| DOMPurify | Não utilizado | N/A — app não possui editor de HTML rico | — |

Não há dependências de backend sob controle do desenvolvedor (o app é um arquivo HTML estático).

---

## 8. Contato

**Marlon Gomes da Costa (MGC Dev)**
marlongc25@protonmail.com

---

*© 2026 MGC Dev — Marlon Gomes da Costa*
*Base legal: [Arts. 46–49 da LGPD](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm) · [Resolução CD/ANPD nº 15/2024](https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd) · [Lei 9.609/1998](https://www.planalto.gov.br/ccivil_03/leis/l9609.htm)*
