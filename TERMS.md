# Termos de Uso e Licença — KidsTasks

**Versão:** 2.1.0
**Data:** Maio de 2026
**Autor:** Marlon Gomes da Costa (MGC Dev)

---

## 1. Uso permitido

O **KidsTasks** é um software com **código-fonte disponível**, de uso gratuito para fins não comerciais. É permitido:

- Usar o app para fins pessoais, familiares, educacionais, acadêmicos, demonstrativos, de pesquisa e de avaliação técnica, sem custo.
- Copiar e distribuir o arquivo original sem modificações, desde que mantida a autoria e estes termos.
- Sugerir melhorias e reportar problemas via GitHub Issues.

---

## 2. Uso comercial

O uso comercial é **proibido sem autorização prévia, expressa e por escrito** do autor, incluindo, mas não se limitando a:

- Venda, sublicenciamento ou licenciamento pago do software, total ou parcialmente;
- Integração em produtos, sistemas ou serviços pagos ou monetizados;
- Uso como base de SaaS, plataforma, painel, app white-label ou solução vendida a terceiros;
- Prestação de serviço remunerado que dependa substancialmente deste código;
- Monetização direta (cobranças, assinaturas, publicidade) ou indireta baseada no software ou em parte substancial dele.

Para solicitar licença comercial: **marlongc25@protonmail.com**

---

## 3. Modificações e redistribuição

Modificações no código-fonte são permitidas apenas para uso pessoal, interno, acadêmico, educacional ou experimental, **sem finalidade comercial**.

A redistribuição pública de versões modificadas, forks adaptados ou derivações relevantes depende de autorização do autor e deve:

- manter os créditos originais visíveis;
- indicar claramente que houve modificação em relação ao original;
- não induzir terceiros a erro quanto à autoria original do projeto.

---

## 4. Propriedade intelectual

O código-fonte, design e documentação do KidsTasks são propriedade de **Marlon Gomes da Costa**. Todos os direitos reservados, exceto onde explicitamente permitido nestes termos.

O acesso público ao código-fonte **não implica cessão de titularidade**, transferência de direitos autorais ou autorização automática para uso comercial.

A **remoção de créditos, avisos de autoria, termos de uso ou referências ao projeto original** não extingue os direitos do autor original.

---

## 5. Isenção de responsabilidade

O software é fornecido **"como está"**, sem garantias de qualquer tipo, expressas ou implícitas. O autor não se responsabiliza por:

- Perda de dados causada por falha no navegador, dispositivo ou serviço de terceiros.
- Uso indevido do app por terceiros.
- Decisões financeiras tomadas com base nas informações exibidas pelo app.

O app **não realiza transações financeiras reais** — o registro de pagamento é apenas um controle interno para as famílias.

---

## 6. Dados, privacidade e acessibilidade

Os documentos abaixo detalham integralmente as práticas de tratamento de dados e a política de segurança do KidsTasks:

- [PRIVACY.md](./PRIVACY.md) — Aviso de Privacidade ([LGPD Art. 9º](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm))
- [SECURITY.md](./SECURITY.md) — Política de Segurança e Plano de Resposta a Incidentes ([LGPD Arts. 46–49](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm) + [Resolução CD/ANPD nº 15/2024](https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd))
- [ACCESSIBILITY.md](./ACCESSIBILITY.md) — Declaração de Acessibilidade ([LBI Art. 63](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm) + WCAG 2.2)
- [DATA_INVENTORY.md](./DATA_INVENTORY.md) — Inventário de Tratamento de Dados ([LGPD Art. 37](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm))

Em resumo:

- Os dados da família (nomes, tarefas, pontos) ficam armazenados **localmente no navegador** do usuário via `localStorage`.
- Quando o usuário configura o Supabase opcional, os dados são sincronizados **no projeto Supabase do próprio usuário** — o autor não tem acesso a esses dados.
- O sistema de avaliações usa um Supabase compartilhado gerenciado pelo autor, contendo apenas: nome do avaliador, comentário, número de estrelas e data. Não são coletados dados bancários.
- O app envia **um ping anônimo por dia** ao Supabase do autor para contagem de dispositivos ativos, contendo apenas um identificador aleatório sem vínculo com dados pessoais.

---

## 6.1 Obrigações do usuário sobre atualizações de segurança

O KidsTasks disponibiliza atualizações de segurança por meio do banner de nova versão exibido automaticamente no app. O usuário tem a responsabilidade de aplicar as atualizações disponibilizadas em prazo razoável.

Em conformidade com o princípio da **culpa concorrente** previsto no [Art. 945 do Código Civil](https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm) e com o [Art. 12, §3º do Código de Defesa do Consumidor](https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm), o autor não se responsabiliza por danos decorrentes de vulnerabilidades em versões anteriores nas seguintes condições:

1. A vulnerabilidade foi corrigida e documentada no [CHANGELOG.md](./CHANGELOG.md) com a tag `🔒 Security`;
2. O usuário foi notificado por meio do banner de atualização integrado ao app;
3. O usuário manteve em uso a versão vulnerável mesmo após a notificação.

O mecanismo de banner e o log de versões no CHANGELOG constituem o canal oficial de comunicação de atualizações de segurança do KidsTasks.

---

## 7. Foro legal

Fica eleito o foro da comarca de **São Raimundo das Mangabeiras — MA, Brasil** para dirimir quaisquer questões decorrentes destes termos, com renúncia a qualquer outro, por mais privilegiado que seja.

---

## 8. Alterações nos termos

O autor reserva-se o direito de alterar estes termos a qualquer momento. Alterações serão comunicadas via CHANGELOG.md e pela atualização da data neste documento.

---

*© 2026 MGC Dev — Marlon Gomes da Costa*
*Desenvolvedor independente — Projeto pessoal e independente, sem vínculo institucional com o IFMA*
