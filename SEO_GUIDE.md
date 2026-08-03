# Guia Completo de SEO - Editora Vértice Literário

## O que é SEO?

SEO (Search Engine Optimization) é o conjunto de técnicas e práticas que melhoram a visibilidade de um site nos motores de busca como Google, Bing e Yahoo. O objetivo é aumentar o tráfego orgânico (não pago) fazendo com que o site apareça nos primeiros resultados quando usuários pesquisam por termos relevantes.

## Por que SEO é importante?

- **Tráfego orgânico gratuito**: Reduz dependência de publicidade paga
- **Credibilidade**: Sites no topo dos resultados são vistos como mais confiáveis
- **Alcance**: Aumenta a visibilidade para autores e obras publicadas
- **ROI**: Um dos melhores investimentos de marketing a longo prazo

## Estrutura SEO da Editora Vértice Literário

### 1. Meta Tags Essenciais

Todos os meta dados estão gerenciados no `index.html` e através de componentes React:

```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="Editora Vértice Literário - Publicação de livros, edição profissional e serviços editoriais em Moçambique." />
<meta name="keywords" content="editora, publicação, livros, literatura moçambicana, edição" />
<meta name="author" content="Editora Vértice Literário" />
<meta name="theme-color" content="#1a2847" />
```

**Checklist:**
- ✅ Meta description (155-160 caracteres) - descreve o conteúdo da página
- ✅ Meta keywords - termos relevantes separados por vírgula
- ✅ Viewport - responsivo em dispositivos móveis
- ✅ Character encoding - UTF-8 para suportar português com acentos

### 2. Estrutura de Headings (H1, H2, H3)

**Regra**: Apenas UM H1 por página

```
H1: "A palavra é a semente, a nossa missão é fazê-la florescer." (Hero Section)
  H2: "Obras Publicadas e Disponíveis para Aquisição" (Catálogo)
  H2: "Áreas de Actuação e Serviços" (Serviços)
  H2: "Blog Vértice Literário" (Blog)
  H2: "Vamos Dar Vida à Sua Obra Literária" (Contacto)
```

**Por que é importante:**
- Google usa headings para entender a hierarquia e conteúdo
- Usuários scaneiam a página pelos headings
- Melhora legibilidade e estrutura semântica

### 3. URLs Otimizadas

Nossas rotas estão bem estruturadas:
- `/` - Página inicial
- `/catalogo` - Catálogo de obras
- `/autores` - Página de autores
- `/blog` - Blog com artigos
- `/sobre` - Sobre a editora

**Boas práticas:**
- ✅ URLs descritivas em português
- ✅ Sem parâmetros complexos
- ✅ Hífens entre palavras (não underscores)
- ⚠️ Considerar URLs em inglês para alcance internacional

### 4. Sitemap XML

O arquivo `public/sitemap.xml` lista todas as páginas principais:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://editoraverticeliterario.com/</loc>
    <lastmod>2025-08-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

**Como funciona:**
- Google e outros search engines leem o sitemap
- Discover novas páginas automaticamente
- Indica frequência de atualização

**Próximas melhorias:**
- Adicionar páginas dinâmicas do catálogo
- Adicionar artigos do blog individual
- Adicionar perfis de autores

### 5. Open Graph (Social Media)

No `index.html`:

```html
<meta property="og:title" content="Editora Vértice Literário" />
<meta property="og:description" content="Publicação de livros e serviços editoriais de excelência em Moçambique." />
<meta property="og:image" content="https://editoraverticeliterario.com/logo.png" />
<meta property="og:url" content="https://editoraverticeliterario.com" />
<meta property="og:type" content="website" />
```

**Por que é importante:**
- Controla como o site aparece no Facebook, LinkedIn, Twitter
- Aumenta taxa de cliques
- Melhora brand awareness

### 6. Robots.txt

Arquivo `public/robots.txt` controla o acesso dos bots:

```
User-agent: *
Allow: /
Disallow: /admin
Sitemap: https://editoraverticeliterario.com/sitemap.xml
```

**Funcionalidade:**
- ✅ Permite crawling geral
- ✅ Bloqueia páginas admin (se existissem)
- ✅ Aponta para sitemap

## Estratégia de Conteúdo

### Blog

O blog é uma ferramenta poderosa de SEO:

- **3 artigos principais** sobre literatura moçambicana, edição profissional e preparação de manuscritos
- **Atualização regular** melhora ranking
- **Palavras-chave** nos títulos e primeiros parágrafos

**Títulos otimizados:**
- "O Futuro da Literatura Moçambicana no Espaço Lusófono" (inclui palavra-chave: literatura moçambicana)
- "A Importância da Revisão Profissional para o Sucesso de uma Obra" (inclui: revisão profissional)
- "Como Preparar o seu Original para Submissão Editorial" (inclui: submissão editorial)

### Catálogo de Livros

Cada livro tem:
- ✅ Título descritivo
- ✅ Autor claramente identificado
- ✅ Sinopse com 100-150 caracteres
- ✅ Gênero categorizado
- ✅ Ano de publicação
- ✅ Imagem de capa de qualidade

**Impacto SEO:**
- Conteúdo rico facilita ranking em buscas por livros
- Imagens com alt-text melhoram busca por imagem
- Mais conteúdo = mais oportunidades de keyword

### Página de Autores

31 autores com:
- ✅ Foto profissional
- ✅ Biografia completa (100-300 palavras)
- ✅ Gênero de escrita
- ✅ Lista de obras publicadas

**Benefícios:**
- Aumenta conteúdo único
- Cada autor pode trazer tráfego próprio
- Melhora E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)

## Otimizações Técnicas

### 1. Performance (Page Speed)

Fatores que afetam ranking:

```
Boas práticas implementadas:
✅ Vite para build otimizado
✅ Motion para animações eficientes
✅ Imagens em pasta public (cache estático)
✅ CSS Tailwind (sem código desnecessário)
✅ Lazy loading de componentes
```

**Como medir:**
- Google PageSpeed Insights: https://pagespeed.web.dev/
- GTmetrix: https://gtmetrix.com/
- WebPageTest: https://www.webpagetest.org/

**Meta de performance:**
- Tempo de carregamento < 3 segundos
- Core Web Vitals: Verde em todos os testes

### 2. Mobile-First

Desde 2021, Google prioriza versão mobile:

```
✅ Responsive design com Tailwind
✅ Touch-friendly buttons
✅ Texto legível em mobile
✅ Sem pop-ups que cobrem conteúdo
```

**Teste em:** https://search.google.com/test/mobile-friendly

### 3. Schema Markup

Ajuda Google entender melhor o conteúdo:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Editora Vértice Literário",
  "url": "https://editoraverticeliterario.com",
  "logo": "https://editoraverticeliterario.com/logo.png",
  "contact": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "telephone": "+258834698880",
    "email": "editoraverticeliterario@gmail.com"
  }
}
```

**Impacto:**
- Melhor compreensão pelo Google
- Pode gerar Rich Snippets nos resultados
- Aumenta CTR (Click Through Rate)

### 4. HTTPS

✅ Implementado - Certificado SSL obrigatório para ranking

### 5. Structured Data para Livros

```json
{
  "@context": "https://schema.org",
  "@type": "Book",
  "name": "O Talento que a Crise Revela",
  "author": "Moséstia Machava",
  "image": "https://editoraverticeliterario.com/covers/Talento-que-a-Crise-Revela.png",
  "bookFormat": "Hardcover",
  "inLanguage": "pt-PT",
  "isPartOf": {
    "@type": "CreativeWork",
    "name": "Editora Vértice Literário"
  }
}
```

## Palavras-Chave Principais

### Volume Alto (Difíceis)
- Literatura moçambicana
- Editora em Moçambique
- Publicação de livros
- Serviços editoriais

### Volume Médio (Moderados)
- Edição de livros Tete
- Revisão profissional de textos
- Como publicar um livro
- Submissão de manuscritos

### Long-tail (Fáceis)
- Editora vértice literário tete
- Como preparar um manuscrito
- Publicar poesia moçambicana
- Autores moçambicanos contemporâneos

**Estratégia:** Comece com long-tail, ganhe autoridade, depois compete pelas palavras-chave maiores.

## Checklist de Implementação

### On-Page SEO
- ✅ H1 único por página
- ✅ Meta descriptions otimizadas
- ✅ URLs descritivas
- ✅ Alt-text em todas as imagens
- ✅ Internal linking entre páginas
- ✅ Conteúdo de qualidade 300+ palavras

### Off-Page SEO
- ⚠️ Backlinks (sites que linkam para você)
- ⚠️ Local SEO (Google My Business)
- ⚠️ Social media presence

### Técnico
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ HTTPS
- ✅ Mobile responsive
- ⚠️ Schema markup (parcialmente)
- ⚠️ Core Web Vitals otimizados

## Próximas Ações Recomendadas

### Curto Prazo (1-2 semanas)
1. Enviar sitemap.xml ao Google Search Console
2. Verificar site no Google My Business
3. Adicionar alt-text descritivos em todas imagens
4. Criar robots.txt completo

### Médio Prazo (1-3 meses)
1. Expandir conteúdo do blog (1 artigo/semana)
2. Implementar schema markup completo
3. Otimizar Core Web Vitals
4. Criar landing pages por tema (poesia, não-ficção, etc.)

### Longo Prazo (3-12 meses)
1. Construir backlinks através de parcerias
2. Criar programa de guest posting
3. SEO local em Tete
4. Campanhas de newsletter para CTR

## Ferramentas Recomendadas (Gratuitas)

- **Google Search Console**: Monitorar performance nos resultados
- **Google Analytics 4**: Entender comportamento do usuário
- **Ubersuggest**: Pesquisa de palavras-chave
- **Google PageSpeed Insights**: Performance do site
- **Screaming Frog SEO Spider**: Auditoria técnica

## Monitoramento

Métricas a acompanhar mensalmente:

```
📊 Impressões nos resultados de busca
📊 CTR (Taxa de cliques)
📊 Posicionamento médio
📊 Tráfego orgânico
📊 Bounce rate
📊 Tempo em página
📊 Conversões
```

---

**Última atualização**: Agosto 2026  
**Status**: Frontend-only, sem backend. SEO completamente estático e escalável.
