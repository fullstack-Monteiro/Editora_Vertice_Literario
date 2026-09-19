# SEO Implementation Guide - Editora Vértice Literário

## Overview
Este documento detalha a estratégia de SEO para o website da Editora Vértice Literário, uma editora moçambicana focada em publicação de obras literárias em português.

---

## 1. Meta Tags & Head Elements

### 1.1 Title Tags
**Padrão**: `[Página] | Editora Vértice Literário`

- **Homepage**: "Editora Vértice Literário - Publicação de Livros em Moçambique"
- **Catálogo**: "Catálogo de Obras - Editora Vértice Literário"
- **Blog**: "Blog - Editora Vértice Literário"
- **Autores**: "Autores - Editora Vértice Literário"
- **Sobre**: "Sobre Nós - Editora Vértice Literário"

**Tamanho**: 50-60 caracteres (ideal para Google)
**Incluir**: Palavra-chave principal + marca

### 1.2 Meta Descriptions
**Tamanho**: 150-160 caracteres
**Inclusão**: Sempre incluir CTA (Call-to-Action)

Exemplos:
- **Homepage**: "Editora Vértice Literário publica obras de autores moçambicanos. Serviços de edição, revisão e design. Descubra nossos livros publicados."
- **Catálogo**: "Explore nosso catálogo com 28+ obras publicadas. Literatura, Poesia, Não-Ficção. Adquira livros de autores moçambicanos."
- **Blog**: "Artigos sobre literatura, publicação e desenvolvimento de autores. Dicas práticas para escritores."

### 1.3 Meta Keywords
**Principais (por página)**:
- Homepage: "editora moçambicana, publicação livros, autores moçambicanos, edição, literatura portuguesa"
- Catálogo: "livros moçambicanos, catálogo obras, poesia, não-ficção, adquirir livros"
- Autores: "autores moçambicanos, escritores, biografias, perfis autores"

**Nota**: Keywords no meta tag têm baixo impacto em 2024, mas devem estar presentes no conteúdo.

---

## 2. Open Graph & Social Meta Tags

### 2.1 OG Tags (Facebook/LinkedIn)
```html
<meta property="og:title" content="Editora Vértice Literário - Publicação de Livros" />
<meta property="og:description" content="Discover our catalog of Mozambican literature" />
<meta property="og:image" content="https://editoraverticeliterario.com/og-image-1200x630.png" />
<meta property="og:url" content="https://editoraverticeliterario.com" />
<meta property="og:type" content="website" />
```

### 2.2 Twitter Card Tags
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Editora Vértice Literário" />
<meta name="twitter:description" content="Publicação de obras literárias moçambicanas" />
<meta name="twitter:image" content="https://editoraverticeliterario.com/twitter-image.png" />
```

---

## 3. Structured Data (Schema.org)

### 3.1 Organization Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Editora Vértice Literário",
  "url": "https://editoraverticeliterario.com",
  "logo": "https://editoraverticeliterario.com/logo.png",
  "description": "Editora de livros focada em autores moçambicanos",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Cidade de Tete, Paragem Juventude",
    "addressLocality": "Tete",
    "addressCountry": "MZ"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "telephone": "+258834698880",
    "email": "editoraverticeliterario@gmail.com"
  }
}
```

### 3.2 Book Schema
Para cada livro no catálogo:
```json
{
  "@context": "https://schema.org",
  "@type": "Book",
  "name": "O Talento que a Crise Revela",
  "author": {
    "@type": "Person",
    "name": "Moséstia Machava"
  },
  "isbn": "ISBN-NUMBER",
  "publisher": {
    "@type": "Organization",
    "name": "Editora Vértice Literário"
  },
  "datePublished": "2025-01-01",
  "image": "https://editoraverticeliterario.com/covers/...png",
  "description": "Um testemunho vivo sobre reinvenção...",
  "genre": "Não-Ficção"
}
```

### 3.3 Author Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Nome do Autor",
  "description": "Biografia do autor",
  "image": "https://editoraverticeliterario.com/authors/...jpg",
  "url": "https://editoraverticeliterario.com/autores#author-id"
}
```

---

## 4. Technical SEO

### 4.1 Site Speed
- **Target**: <3 segundos de load time
- **Ferramentas**: Google PageSpeed Insights, GTmetrix
- **Otimizações**:
  - Compressão de imagens (WebP format)
  - Lazy loading para imagens
  - Minificação CSS/JS
  - CDN para assets estáticos
  - Caching estratégico

### 4.2 Mobile Responsiveness
- **Ensure**: 100% responsivo em todos os devices
- **Test**: Google Mobile-Friendly Test
- **ViewPort**: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`

### 4.3 URL Structure
**Padrão recomendado**:
```
/catálogo
/autores
/blog/post-title
/sobre
/contacto
```

**Características**:
- URLs descritivas e legíveis
- Sem parâmetros desnecessários
- Use hífens, não underscores
- Minúsculas

### 4.4 XML Sitemap
**Localização**: `/sitemap.xml`
**Conteúdo esperado**:
- Homepage
- Todas as páginas principais
- Catálogo (cada livro como URL)
- Blog posts
- Páginas de autores

**Atualização**: Mensal ou ao adicionar conteúdo novo

### 4.5 Robots.txt
```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api
Sitemap: https://editoraverticeliterario.com/sitemap.xml
```

---

## 5. On-Page SEO

### 5.1 Heading Structure (H1, H2, H3)
- **1 H1 por página** (título principal)
- **H2s**: Seções principais
- **H3s**: Subsecções
- Incluir keywords naturalmente

Exemplo:
```
H1: Catálogo de Obras - Editora Vértice Literário
  H2: Obras Publicadas em 2025
    H3: Poesia
    H3: Não-Ficção
  H2: Filtros de Busca
```

### 5.2 Image Optimization
- **Alt Text**: Descritivo e com keywords (máx 125 caracteres)
- **Filename**: `talento-crise-revela-cover.png` (não `image1.png`)
- **Format**: WebP quando possível, JPEG/PNG como fallback
- **Tamanho**: Otimizado para web (<100KB)

Exemplo:
```html
<img 
  src="/covers/talento-crise-revela.png" 
  alt="Capa do livro O Talento que a Crise Revela de Moséstia Machava - Editora Vértice Literário"
/>
```

### 5.3 Internal Linking
- **Anchor Text**: Descritivo (não "clique aqui")
- **Estratégia**: Link de homepage → categorias → páginas específicas
- **Densidade**: 2-4 links internos por 1000 palavras

Exemplos:
```
"Conheça nosso [catálogo de obras literárias](/catalogo)"
"Saiba mais sobre o [autor Moséstia Machava](/autores#moséstia-machava)"
```

### 5.4 Content Length
- **Homepage**: 1500-2000 palavras
- **Páginas de serviços**: 1000-1500 palavras
- **Blog posts**: 1500-3000 palavras
- **Páginas de autores**: 500-800 palavras

---

## 6. Content Strategy

### 6.1 Keywords Target (Pesquisa Recomendada)
**Primárias**:
- "editora moçambicana"
- "publicar livro em Moçambique"
- "autores moçambicanos"
- "editora literatura portuguesa"

**Secundárias**:
- "serviços editoriais"
- "revisão de livros"
- "design de capa"
- "publicação de poesia"

### 6.2 Content Calendar
- **Blog**: 2 artigos/mês (mín)
- **Autores**: Perfil novo a cada 2-3 meses
- **Newsletter**: Semanal ou bi-semanal
- **Social**: Daily (reels, stories, posts)

### 6.3 Blog Topics (SEO-Focused)
1. "Como publicar um livro em Moçambique"
2. "Guia completo de revisão editorial"
3. "Diferenças entre poesia e prosa"
4. "Mercado literário lusófono 2025"
5. "Dicas para autores iniciantes"
6. "História da literatura moçambicana"

---

## 7. Off-Page SEO

### 7.1 Backlinks
**Estratégia**:
- Guest posts em blogs literários
- Menções em diretórios de editoras
- Parcerias com universidades/institutos culturais
- Press releases para mídia moçambicana

**Alvos**:
- Rádio Moçambique
- Jornais digitais
- Blogs culturais
- Plataformas literárias

### 7.2 Local SEO
- **Google Business Profile**: Verificar e atualizar
- **Local Citations**: Diretórios moçambicanos
- **Schema LocalBusiness**: Incluir endereço, telefone, horário
- **Avaliações**: Incentivar reviews em Google, Facebook

### 7.3 Social Signals
- **Facebook**: Conteúdo editorial, behind-the-scenes
- **Instagram**: Capas de livros, citações, reels
- **LinkedIn**: Artigos sobre indústria editorial
- **WhatsApp**: Newsletter e alertas de lançamentos

---

## 8. Analytics & Monitoring

### 8.1 Google Analytics 4 Setup
- Rastrear eventos: visualizações de livro, cliques em compra, downloads
- Segmentação: por página, tipo de conteúdo, origem de tráfego
- KPIs: sessões, bounce rate, conversão

### 8.2 Google Search Console
- Monitorar keywords
- Verificar erros de indexação
- Analisar CTR (Click-Through Rate)
- Monitorar mobile usability

### 8.3 Ranking Tracking
**Ferramentas recomendadas**:
- SEMrush
- Ahrefs
- SE Ranking
- Moz

**Keywords a rastrear**:
- "editora moçambicana"
- "livros Moçambique"
- Nomes de autores publicados

### 8.4 Monthly Metrics to Review
- Organic traffic
- Keyword rankings
- Backlink profile
- Page speed
- Mobile usability
- Conversion rate

---

## 9. Local & Portuguese Language SEO

### 9.1 Language & Regional Targeting
- **HTML Lang**: `<html lang="pt-MZ">` ou `pt-PT`
- **Hreflang Tags**: Se tiver versões em diferentes variantes de português
- **Content**: Usar português moçambicano/português europeu apropriadamente

### 9.2 Moçambique-Specific SEO
- **Local Keywords**: "Tete", "Maputo", "Moçambique"
- **Cultural References**: Literatura lusófona, contexto local
- **Partnerships**: Conectar com influenciadores moçambicanos
- **Events**: Lançamentos de livros, feiras literárias

---

## 10. Implementation Checklist

- [ ] Meta tags em todas as páginas
- [ ] OG tags configuradas
- [ ] Schema.org implementado (Organization, Book, Person)
- [ ] Sitemap.xml criado e submetido
- [ ] Robots.txt configurado
- [ ] Google Search Console verificado
- [ ] Google Analytics 4 instalado
- [ ] Mobile responsiveness testado
- [ ] Page speed otimizado (<3s)
- [ ] URLs amigáveis
- [ ] Imagens otimizadas com alt text
- [ ] Internal linking estratégico
- [ ] Blog com conteúdo mensal
- [ ] Google Business Profile atualizado
- [ ] Social media ligado ao site

---

## 11. Quick Wins (Implementar Agora)

1. **Adicionar meta descriptions** a todas as páginas
2. **Otimizar imagens** - converter para WebP, reduzir tamanho
3. **Adicionar schema Book** para cada livro no catálogo
4. **Criar blog content** - 2 artigos sobre "como publicar"
5. **Configurar Google My Business** para Tete
6. **Adicionar CTA** em todas as páginas
7. **Implementar FAQ schema** - Perguntas sobre serviços
8. **Verificar e submeter sitemap** ao GSC

---

## 12. Tools & Resources

**SEO Tools**:
- Google Search Console (gratuito)
- Google Analytics 4 (gratuito)
- Google PageSpeed Insights (gratuito)
- Ubersuggest
- AnswerThePublic

**Content Research**:
- Google Keyword Planner
- SEMrush
- Ahrefs

**Technical**:
- Lighthouse
- GTmetrix
- Screaming Frog

---

## 13. Long-term Goals (6-12 months)

1. Ranking para "editora moçambicana" (top 10)
2. 5000+ sessões/mês de tráfego orgânico
3. 50+ backlinks de qualidade
4. 100+ indexadas páginas
5. Estabelecer autoridade em literatura lusófona
6. Conversão de visitantes em clientes

---

**Última atualização**: Agosto 2026
**Próxima revisão**: Novembro 2026
