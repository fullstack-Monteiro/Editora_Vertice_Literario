# ⚡ Quick Start - SSR em 5 Minutos

## 1️⃣ Instalar Dependências
```bash
cd backend
npm install
```

## 2️⃣ Rodar Servidor
```bash
npm start
# ou em desenvolvimento
npm run dev
```

## 3️⃣ Testar SSR
Abra no navegador (substitua 123 por ID real):

- 📚 Livro: http://localhost:3001/livro/123
- 👤 Autor: http://localhost:3001/autor/123
- 📝 Blog: http://localhost:3001/blog/123
- 📖 Catálogo: http://localhost:3001/catalogo
- 👥 Autores: http://localhost:3001/autores
- 📰 Blog list: http://localhost:3001/blog

## 4️⃣ Ver Meta Tags
Pressione `Ctrl+U` (Windows) ou `Cmd+U` (Mac) para ver o source HTML.

Procure por:
```html
<title>...</title>
<meta name="description" content="...">
<script type="application/ld+json">...</script>
```

## 5️⃣ Validar Schema
Ir a: https://search.google.com/test/rich-results

Cole um URL e clique "Test URL" para validar.

---

## 📁 Arquivos Importantes

```
backend/
├── ssr.js               ← Motor SSR
└── server.js            ← Endpoints

root/
├── SSR_SUMMARY.md       ← Visão geral (ler primeiro!)
├── SSR_SETUP.md         ← Instruções detalhadas
├── SEO_CHECKLIST.md     ← Próximos passos
└── QUICK_START.md       ← Este arquivo
```

---

## 🎯 O Que Mudou

### Novo
- ✅ `backend/ssr.js` - Motor renderizador
- ✅ 6 novos endpoints SSR no backend
- ✅ Meta tags dinâmicas em cada página
- ✅ Schema.org estruturado
- ✅ Open Graph para redes sociais

### Mantém igual
- ✅ Frontend React - sem mudanças
- ✅ APIs JSON existentes
- ✅ Estrutura de dados
- ✅ Funcionalidades

---

## 📊 IDs Reais para Testar

Primeiro, veja quais IDs existem:

```bash
# Livros
curl http://localhost:3001/api/books | jq '.[0].id'

# Autores
curl http://localhost:3001/api/authors | jq '.[0].id'

# Posts
curl http://localhost:3001/api/posts | jq '.[0].id'
```

Depois teste com esses IDs reais.

---

## 🚀 Deploy

### Vercel (recomendado)
Já suporta SSR. Apenas faça push:
```bash
git add .
git commit -m "Add SSR"
git push
```

### Heroku / Self-hosted
Funciona igual. Sem configuração extra.

---

## ✅ Próximos Passos

1. ✅ SSR implementado (feito!)
2. ⏳ Sitemap XML (próximo)
3. ⏳ Robots.txt (próximo)
4. ⏳ Google Search Console (próximo)

---

**Tudo pronto! Sistema SSR operacional.** 🎉

Ler `SSR_SUMMARY.md` para explicação completa.
