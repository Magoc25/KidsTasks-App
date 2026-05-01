# 👧 KidsTasks

> **App de tarefas e mesada para crianças — gerencie tarefas diárias, aprove conclusões e calcule a recompensa semanal.**

Desenvolvido por **Marlon Gomes da Costa (MGC Dev)**

> ⚠️ **Este é um projeto pessoal**, desenvolvido de forma independente pelo autor.
> Não representa, não é financiado e não tem vínculo institucional com o IFMA
> ou qualquer outra organização.

[![Versão](https://img.shields.io/badge/versão-1.0.0-blue)](#changelog)
[![Licença](https://img.shields.io/badge/licença-uso%20pessoal%20livre-green)](#licença)
[![PIX](https://img.shields.io/badge/apoie-PIX-brightgreen)](#apoiar)

---

## ✨ O que é

O **KidsTasks** é um Progressive Web App (PWA) para famílias que querem organizar as tarefas das crianças e vincular a conclusão delas a recompensas financeiras semanais — de forma simples, segura e sem precisar instalar nada.

O app funciona no modo **Criança** (marca tarefas concluídas) e modo **Responsável** (aprova tarefas e registra o pagamento semanal). Tudo funciona offline e pode ser sincronizado opcionalmente com o Supabase para uso em múltiplos dispositivos.

Ideal para crianças a partir de 3 anos, com interface de ícones grandes e poucos elementos visuais para não sobrecarregar.

---

## 🚀 Funcionalidades

- **Modo Criança** — visualiza tarefas do dia e marca como concluídas
- **Modo Responsável** — aprova/reprova tarefas, protegido por PIN
- **Recompensa semanal** — calcula pontos acumulados e registra o pagamento
- **Offline-first** — funciona sem internet; sincroniza quando conectado
- **Multi-criança** — suporte a múltiplas crianças na mesma família
- **Supabase opcional** — sincronização entre dispositivos com seu próprio banco
- **PWA instalável** — instale como app no Android, iOS, Windows e macOS

---

## 📦 Como usar

### Cenário 1 — Uso local simples _(sem nuvem)_

1. Baixe `KidsTasks.html` e `service-worker.js` para a mesma pasta
2. Abra no Chrome, Edge ou Safari
3. Pronto — os dados ficam salvos no próprio navegador

**Backup:** exporte os dados regularmente e guarde o arquivo em local seguro.

---

### Cenário 2 — Dois dispositivos com sincronização _(Supabase)_

1. Crie conta no Supabase (gratuito) — veja [Configurar Supabase](#configurar-supabase)
2. Copie o arquivo HTML para cada dispositivo
3. Em cada dispositivo, abra o app, acesse ☁️ e configure as chaves
4. Os dados sincronizam automaticamente entre os dispositivos

---

### Cenário 3 — Acesso de qualquer lugar pela URL _(Supabase + GitHub Pages)_

1. Configure o Supabase (Cenário 2)
2. Ative o GitHub Pages — veja [Configurar GitHub Pages](#configurar-github-pages)
3. Acesse a URL em qualquer dispositivo e configure o Supabase uma vez

---

## 🔧 Configurar Supabase

#### 1. Criar conta e projeto
1. Acesse supabase.com → New Project
2. Nome: `kidstasks-familia` · Região: South America (São Paulo)

#### 2. Criar as tabelas (SQL Editor)

Consulte o arquivo `Guia_Supabase_KidsTasks.md` para o pacote SQL completo com tabelas, índices e políticas RLS.

#### 3. Copiar as chaves
Settings → Data API:
- **Project URL** — `https://xxxx.supabase.co`
- **Publishable key** — começa com `sb_publis...`

#### 4. Configurar no app
Abra o app → ☁️ → cole URL e Key → Testar conexão → Salvar

---

## 🔧 Configurar GitHub Pages

1. Repositório → Settings → Pages
2. Source: Deploy from a branch → Branch: main → / (root) → Save
3. Aguarde ~2 min
4. URL: `https://Magoc25.github.io/KidsTasks-App/KidsTasks.html`

> ⚠️ A URL base (`/KidsTasks-App/`) retorna 404 — sempre use a URL com o nome do arquivo.

---

## 📱 Instalar como app no celular

**Android (Chrome):** Menu (⋮) → Adicionar à tela inicial → Confirmar

**iPhone/iPad (Safari):** Compartilhar → Adicionar à tela de início

---

## ☕ Apoiar o Projeto

O projeto é gratuito e de código aberto. Se foi útil, considere apoiar:

Clique em **☕ Apoiar** no rodapé do app para contribuir via PIX.

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

## 📄 Licença

Uso pessoal e educacional livre. Uso comercial requer autorização.
Consulte [TERMS.md](TERMS.md) para os termos completos.

---

## 👤 Autor

**Marlon Gomes da Costa**
Desenvolvedor independente · MGC Dev

*Professor do IFMA Campus São Raimundo das Mangabeiras — projetos são iniciativas pessoais,
sem vínculo institucional.*

---

*© 2025 MGC Dev — Feito com ☕ no Maranhão*
