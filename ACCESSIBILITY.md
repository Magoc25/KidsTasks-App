# Declaração de Acessibilidade — KidsTasks

**Versão:** 1.0 · **Última atualização:** Maio de 2026

---

## 1. Compromisso com a acessibilidade

O KidsTasks está comprometido em tornar o app acessível ao maior número possível de pessoas, incluindo aquelas com deficiências visuais, motoras, auditivas ou cognitivas.

Este documento descreve o estado atual de conformidade, os recursos implementados, as limitações conhecidas e o canal para relato de problemas, em atendimento ao [Art. 63 da Lei 13.146/2015 (Estatuto da Pessoa com Deficiência — LBI)](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm).

---

## 2. Padrões de referência

- **[WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/)** (Web Content Accessibility Guidelines) — nível AA como meta
- **[ABNT NBR 17225:2025](https://www.abnt.org.br/)** — Acessibilidade em sistemas web (adota WCAG 2.2)
- **[Lei 13.146/2015 (LBI)](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm)** — Estatuto da Pessoa com Deficiência

---

## 3. Status de conformidade

**Conformidade parcial com WCAG 2.2 nível AA.**

O KidsTasks implementa parte dos requisitos do nível AA, com limitações conhecidas descritas na seção 5. Uma auditoria formal por especialista externo não foi realizada — o status foi autoavaliado pelo desenvolvedor.

---

## 4. Recursos de acessibilidade implementados

### 4.1 Perceptível

- **Idioma declarado:** `<html lang="pt-BR">` — leitores de tela identificam o idioma corretamente.
- **Textos alternativos:** ícones decorativos não possuem texto alternativo separado (usam emojis com semântica textual implícita); imagens funcionais possuem `alt` descritivo.
- **Contraste:** o app usa fundo navy escuro (#0b2a5b) com texto branco no cabeçalho, e fundo claro (#f6f6f5) com texto escuro (#191919) nas áreas de conteúdo — ambos atendem a proporção 4.5:1 para texto normal.
- **Redimensionamento de texto:** o layout usa unidades relativas (`rem`, `em`) e se adapta ao zoom do navegador sem perda de funcionalidade.

### 4.2 Operável

- **Alvos de toque:** botões principais possuem altura mínima de 44px (`--hit: 44px`) para uso em dispositivos touch.
- **Navegação por teclado:** elementos interativos (botões, inputs) seguem a ordem natural do DOM e são acessíveis via `Tab`.
- **Sem armadilhas de teclado:** modais permitem fechamento via botão "✕" e clique no fundo.
- **Sem conteúdo piscante acima de 3Hz:** a animação de confete é puramente estética e não excede os limites seguros.

### 4.3 Compreensível

- **Linguagem:** interface em português brasileiro (pt-BR), com linguagem simples e direta.
- **Rótulos de inputs:** campos de formulário possuem `<label>` associado ou `placeholder` descritivo.
- **Mensagens de erro:** ações inválidas geram alertas textuais explicativos (ex: "Selecione uma avaliação de 1 a 5 estrelas.").
- **Feedback de estado:** ações assíncronas exibem mensagens de confirmação ou erro (ex: "✅ Avaliação sincronizada!" ou "⚠️ Salvo só neste dispositivo.").

### 4.4 Robusto

- **HTML semântico:** uso de `<button>`, `<input>`, `<label>`, `<table>`, `<thead>`, `<tbody>` nos elementos interativos e de dados.
- **PWA instalável:** o app funciona como aplicativo nativo no Android, iOS e desktop, respeitando as configurações de acessibilidade do sistema operacional (tamanho de texto, modo de alto contraste, etc.).

---

## 5. Limitações conhecidas

| Limitação | Área afetada | Impacto | Previsão de melhoria |
|---|---|---|---|
| Ausência de atributos ARIA em componentes customizados | Modais, seletores de estrela, drag & drop | Pode dificultar uso com leitores de tela | Em avaliação |
| Ícones emoji sem `aria-label` explícito | Botões de ação com emojis | Leitores de tela leem a descrição textual do emoji, que pode ser verbosa | Em avaliação |
| Drag & drop de tarefas não acessível por teclado | Painel do responsável (reordenação) | Usuários que dependem de teclado não conseguem reordenar tarefas via arrastar | Em avaliação |
| Ausência de modo de alto contraste nativo | Interface geral | Usuários com baixa visão dependem das configurações do sistema operacional | Em avaliação |
| Auditoria com tecnologia assistiva não realizada | Todo o app | Conformidade com leitores de tela (NVDA, VoiceOver) não foi testada formalmente | Sem data definida |

---

## 6. Relatar problema de acessibilidade

Se você encontrar uma barreira de acessibilidade que não está listada acima, ou que esteja impactando seu uso do app:

**Contato:** marlongc25@protonmail.com
**Assunto:** `[KidsTasks] Acessibilidade`

**Inclua:**
- Descrição do problema e onde ocorre no app
- Tecnologia assistiva utilizada (leitor de tela, teclado, etc.)
- Navegador e sistema operacional

**Prazo de resposta:** até 15 dias úteis.

---

## 7. Histórico de auditoria

| Data | Tipo | Resultado |
|---|---|---|
| Maio de 2026 | Autoavaliação pelo desenvolvedor | Conformidade parcial — limitações registradas neste documento |

**Próxima revisão prevista:** Novembro de 2026

---

*© 2026 MGC Dev — Marlon Gomes da Costa*
*Base legal: [Art. 63 da Lei 13.146/2015 (LBI)](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm) · [WCAG 2.2 (W3C)](https://www.w3.org/WAI/standards-guidelines/wcag/) · [ABNT NBR 17225:2025](https://www.abnt.org.br/)*
