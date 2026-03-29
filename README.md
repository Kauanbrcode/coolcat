# COOL CAT 🔴
> Roupa das Ruas — Disgrama Online

Loja de roupas de periferia com tela de login, catálogo, carrinho e sistema de troca.

---

## 🗂 Estrutura do Projeto

```
coolcat/
├── index.html          ← Tela de login
├── pages/
│   └── loja.html       ← Tela da loja
├── css/
│   ├── global.css      ← Variáveis, reset e componentes compartilhados
│   ├── login.css       ← Estilos da tela de login
│   └── loja.css        ← Estilos da loja, cards, modais
├── js/
│   ├── utils.js        ← Funções compartilhadas (toast, ripple, formatPreco)
│   ├── dados.js        ← Array de produtos (futuro: conectar a API)
│   ├── login.js        ← Lógica de autenticação
│   ├── carrinho.js     ← Carrinho com localStorage
│   ├── troca.js        ← Sistema de troca
│   └── loja.js         ← Render, filtros, busca e sidebar
└── README.md
```

---

## ✅ Funcionalidades

- **Login** — valida campos, salva usuário na `sessionStorage` e redireciona
- **Catálogo** — 8 produtos com emoji, categoria, preço e descrição
- **Filtro por categoria** — camiseta, moletom, calça, boné, tênis
- **Busca em tempo real** — filtra nome, descrição e categoria
- **Página do produto** — modal com descrição completa e ações
- **Carrinho** — drawer lateral, controle de quantidade, total calculado, `localStorage`
- **Sistema de troca** — formulário com validação
- **Toast** — notificações animadas no canto da tela
- **Responsivo** — funciona em mobile e desktop

---

## 🚀 Como rodar

Só abrir o `index.html` no navegador. Sem dependências, sem build, sem frescura.

```bash
# Se quiser um servidor local simples:
npx serve .
# ou
python3 -m http.server 3000
```

---

## 🌐 Como subir no GitHub Pages

1. Sobe o projeto no GitHub
2. Vai em **Settings → Pages**
3. Escolhe a branch `main` e pasta `/root`
4. Salva — em alguns minutos o site tá no ar

---

## 🎨 Stack

- HTML5 semântico
- CSS3 com variáveis (sem framework)
- JavaScript vanilla (sem bibliotecas)
- Google Fonts: Bebas Neue + Share Tech Mono + Barlow Condensed

---

© 2026 Cool Cat // Disgrama Online // Rouba Não Potoca
