# SEO Checklist - Editora Vértice Literário

## ✅ Implementado

### SSR (Server-Side Rendering)
- [x] Sistema SSR no backend (`ssr.js`)
- [x] Endpoints SSR para livros individuais (`/livro/:id`)
- [x] Endpoints SSR para autores (`/autor/:id`)
- [x] Endpoints SSR para blog (`/blog/:id`)
- [x] Endpoints SSR para catálogo (`/catalogo`)
- [x] Endpoints SSR para lista de autores (`/autores`)
- [x] Endpoints SSR para lista de blog (`/blog`)
- [x] Meta tags dinâmicas por página
- [x] Open Graph tags
- [x] Twitter Card tags
- [x] Canonical URLs
- [x] JSON-LD Schema.org

### Structured Data (Schema.org)
- [x] Book schema para livros
- [x] Person schema para autores
- [x] BlogPosting schema para artigos
- [x] Organization schema (no index.html)
- [x] WebSite schema (no index.html)

### Meta Tags Básicas
- [x] Title tags otimizadas
- [x] Meta descriptions
- [x] Meta keywords
- [x] Robots meta tag
- [x] Language meta tag
- [x] Viewport meta tag
- [x] Favicon
- [x] Author meta tag

### HTML Semântico
- [x] Página estática HTML com meta tags
- [x] Links internos otimizados
- [x] Alt text em imagens (no SSR)
- [x] Títulos H1, H2 apropriados

---

## ⏳ Próximos Passos (Prioritários)

### 1. Sitemap XML Dinâmico ⭐⭐⭐
```
GET /sitemap.xml
```
- Listar todos os livros, autores e posts
- Incluir data de modificação
- Prioritário para Google indexação
- **Tempo estimado: 30 min**

**Arquivo a criar:** `backend/sitemap.js`

### 2. Robots.txt Otimizado ⭐⭐
```
GET /robots.txt
```
- Apontar sitemap.xml
- Bloquear admin, uploads, dados privados
- Permitir Google Bot, Bing Bot, etc
- **Tempo estimado: 15 min**

**Arquivo a criar:** `backend/robots.txt`

### 3. Verificar no Google Search Console ⭐⭐⭐
1. Ir a https://search.google.com/search-console
2. Adicionar propriedade
3. Verificar domínio
4. Submeter sitemap.xml
5. Monitorar erros de indexação
- **Tempo estimado: 1 dia de verificação**

### 4. Testar Rich Results ⭐⭐
- Ir a https://search.google.com/test/rich-results
- Testar URLs: /livro/1234, /autor/1234, /blog/1234
- Verificar se schema está correto
- Ajustar se necessário
- **Tempo estimado: 30 min**

---

## 📋 Passos Futuros (Secundários)

### 5. RSS Feed do Blog
```
GET /blog/feed.xml
GET /blog/feed.json
```
- Sindicação automática
- Subscribers receberem novos posts
- Aumentar visibilidade

### 6. Performance SEO
- [ ] Lazy loading de imagens
- [ ] Compressão de imagens
- [ ] Cache headers otimizados
- [ ] Minificação CSS/JS
- [ ] Core Web Vitals (LCP, FID, CLS)

### 7. Mobile Optimization
- [ ] Teste de mobile-friendly
- [ ] Responsive design (já tem)
- [ ] Touch-friendly buttons
- [ ] Mobile viewport

### 8. Conteúdo e Links
- [ ] Inbound links internos
- [ ] Otimização de palavras-chave
- [ ] Meta descriptions únicas e atrativas
- [ ] URLs amigáveis e descritivas

### 9. Social Integration
- [ ] Pinterest Rich Pins
- [ ] LinkedIn metadata
- [ ] Facebook Open Graph (já tem)
- [ ] Twitter Card validation

### 10. Analytics e Monitoramento
- [ ] Google Analytics 4
- [ ] Google Search Console
- [ ] Bing Webmaster Tools
- [ ] Monitoramento de rankings

---

## 🎯 URLs Importantes para SEO

### Submeter ao Google
1. **Search Console:** https://search.google.com/search-console
2. **Google My Business:** https://business.google.com (adicionar endereço em Tete)
3. **Bing Webmaster:** https://www.bing.com/webmaster

### Ferramentas de Teste
1. **Rich Results Test:** https://search.google.com/test/rich-results
2. **Mobile-Friendly Test:** https://search.google.com/test/mobile-friendly
3. **Lighthouse:** Chrome DevTools → Lighthouse
4. **Page Speed Insights:** https://pagespeed.web.dev

### Monitoramento
1. **Ahrefs:** https://ahrefs.com (rastrear backlinks)
2. **SEMrush:** https://www.semrush.com (análise de concorrentes)
3. **Moz:** https://moz.com (domain authority)

---

## 📊 KPIs para Monitorar

### Antes vs. Depois
- [ ] Impressões no Google (Search Console)
- [ ] Click-through rate (CTR)
- [ ] Posição média em resultados
- [ ] Tráfego orgânico (Analytics)
- [ ] Conversões (contactos, newsletter)

### Por Tipo de Página
- [ ] Livros: impressões e cliques
- [ ] Autores: tráfego para bios
- [ ] Blog: tráfego para artigos
- [ ] Catálogo: conversões

---

## 🔧 Comandos Úteis

### Testar SSR localmente
```bash
cd backend
npm start
curl http://localhost:3001/livro/1234567890
```

### Ver headers HTTP
```bash
curl -I http://localhost:3001/livro/1234567890
```

### Validar Schema
```bash
# Copiar HTML e colar em:
https://search.google.com/test/rich-results
```

---

## 📝 Notas Importantes

1. **Google indexação**
   - SSR ajuda, mas leva tempo (dias/semanas)
   - Submeter sitemap no Search Console acelera

2. **Conteúdo é rei**
   - Boas sinopses = melhor CTR
   - Bio de autores completa = mais confiança
   - Posts de blog de qualidade = mais tráfego

3. **Backlinks**
   - Procurar links da literatura moçambicana
   - Submeter para diretórios de editoras
   - Parcerias com sites relacionados

4. **Palavras-chave**
   - Moçambique, Tete, autores moçambicanos
   - Publicação, edição, revisão
   - Genres (poesia, prosa, romance, etc)

5. **Atualização regular**
   - Postar regularmente no blog
   - Adicionar novos livros ao catálogo
   - Manter bios de autores atualizadas

---

**Próximo Passo:** Implementar sitemap.xml dinâmico!
