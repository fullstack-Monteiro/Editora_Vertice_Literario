# Setup do Sistema SSR

## Pré-requisitos
- Node.js 16+
- npm ou yarn
- Git

## Instalação

### 1. Atualizar dependências do backend

```bash
cd backend
npm install
```

Isto vai instalar React e ReactDOM que foram adicionados ao `package.json`.

### 2. Iniciar servidor com SSR

```bash
# Em desenvolvimento (com auto-reload)
npm run dev

# Em produção
npm start
```

O servidor vai correr em `http://localhost:3001` (ou a porta configurada em `.env`).

## Testar SSR

### URLs de Teste

Assumindo que já tem dados no JSON (livros, autores, posts), teste:

```bash
# 1. Página de um livro
curl http://localhost:3001/livro/1234567890

# 2. Página de um autor
curl http://localhost:3001/autor/1234567890

# 3. Artigo do blog
curl http://localhost:3001/blog/1234567890

# 4. Catálogo
curl http://localhost:3001/catalogo

# 5. Lista de autores
curl http://localhost:3001/autores

# 6. Lista de blog
curl http://localhost:3001/blog
```

### Verificar Meta Tags no Navegador

1. Abra um dos URLs no navegador
2. Pressione `Ctrl+U` (ou `Cmd+U` no Mac) para ver o source
3. Procure por:
   - `<title>` - Título da página
   - `<meta name="description">` - Descrição
   - `<meta property="og:` - Open Graph tags
   - `<script type="application/ld+json">` - Structured data

### Verificar no Google Rich Results Test

1. Ir a: https://search.google.com/test/rich-results
2. Cole o URL completo: `http://localhost:3001/livro/1234567890`
3. Clique em "Test URL"
4. Veja se o schema está correto

## Arquivos Criados

### Backend SSR
- **`backend/ssr.js`** - Motor de renderização SSR com:
  - `generateHTMLWithSEO()` - Gera HTML com meta tags
  - `renderBookPage()` - Renderiza página de livro
  - `renderAuthorPage()` - Renderiza página de autor
  - `renderBlogPage()` - Renderiza artigo do blog
  - `renderCatalogPage()` - Renderiza catálogo
  - `renderAuthorsPage()` - Renderiza lista de autores
  - `renderBlogListPage()` - Renderiza lista de blog

### Backend Server (Modificado)
- **`backend/server.js`** - Adicionados endpoints:
  - `GET /livro/:id` - SSR para livro individual
  - `GET /autor/:id` - SSR para autor
  - `GET /blog/:id` - SSR para artigo
  - `GET /catalogo` - SSR para catálogo
  - `GET /autores` - SSR para autores
  - `GET /blog` - SSR para blog

### Documentação
- **`backend/SSR_GUIDE.md`** - Guia técnico completo do SSR
- **`backend/ssr-example.html`** - Exemplo de HTML renderizado
- **`SEO_CHECKLIST.md`** - Checklist de SEO com próximos passos
- **`SSR_SETUP.md`** - Este arquivo (instruções de setup)

## O Que Muda no Frontend?

**Nada!** O frontend continua exatamente igual. O que muda é:

1. Quando Google visita `/livro/1234`, ele recebe HTML com meta tags do livro
2. Quando Facebook compartilha, usa og: tags do livro
3. Quando um usuário normal visita, o React carrega normalmente

É um sistema híbrido:
- **Crawlers** recebem SSR (HTML completo com SEO)
- **Usuários** recebem SPA React (experiência normal)

## Próximas Melhorias

### Prioritário (próxima fase)
1. **Sitemap XML** - `GET /sitemap.xml`
2. **Robots.txt** - `GET /robots.txt`
3. **RSS Feed** - `GET /blog/feed.xml`

### Recomendado
1. Otimizar imagens (compressão, lazy loading)
2. Adicionar mais keywords nos títulos
3. Melhorar descriptions para serem mais atrativas
4. Adicionar structured data para preço (se vender)

## Troubleshooting

### Erro: "Cannot find module 'react'"
```bash
cd backend
npm install react react-dom
```

### URLs retornam 404
- Verificar se existem dados no JSON correspondente
- Verificar se o ID existe: `curl http://localhost:3001/api/books`

### Meta tags não aparecem
- Verificar se o servidor está rodando
- Inspecionar com `curl` ou no source da página
- Não aparecem no DevTools porque o DevTools mostra o DOM após JavaScript

### JSON-LD schema não valida
- Usar: https://search.google.com/test/rich-results
- Procurar por avisos ou erros específicos
- Validar JSON em: https://jsonlint.com

## Deploy para Produção

### Vercel (recomendado para o seu projeto)

O Vercel suporta SSR nativamente. Não precisa de mudanças.

```bash
# Fazer push para Git
git add .
git commit -m "Add SSR system"
git push

# Vercel detecta e faz deploy automaticamente
```

### Heroku

```bash
# Configurar como antes
git push heroku main
```

SSR funciona igual no Heroku.

### Self-hosted (VPS/Servidor próprio)

```bash
# Build
npm run build

# Deploy com PM2 (recomendado)
npm install -g pm2
pm2 start backend/server.js --name "vertice-backend"

# Restart após atualizar
pm2 restart vertice-backend
```

## Monitorar em Produção

### 1. Google Search Console
- https://search.google.com/search-console
- Adicionar sitemap.xml quando criado
- Monitorar "Performance" para impressões e cliques

### 2. Google Analytics
- Adicionar ID ao frontend (já feito?)
- Monitorar páginas renderizadas via SSR

### 3. Logs do servidor
```bash
# Ver logs em produção
tail -f logs/server.log
```

## Suporte

Para dúvidas sobre SSR:
1. Ler `backend/SSR_GUIDE.md`
2. Ver exemplo em `backend/ssr-example.html`
3. Consultar documentação do schema.org em https://schema.org

---

**Status:** ✅ Sistema SSR pronto para usar!
