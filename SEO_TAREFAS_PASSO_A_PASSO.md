# 📋 Guia de Tarefas SEO - Passo a Passo
## Editora Vértice Literário

---

## ✅ FASE 1: Configuração Inicial (30 minutos)

### Tarefa 1.1: Verificar Propriedade no Google Search Console
**O que é:** Ferramenta do Google para monitorar como seu site aparece nos resultados de busca.

**Situação Atual:** Vamos usar o método mais simples: **Propriedade de Prefixo de URL**

**Passos:**

1. No Google Search Console, clique em **"Experimenta uma propriedade do prefixo do URL"** (como diz na mensagem de erro)

2. Na nova página, digite EXATAMENTE: `https://editora-vertice-literario.vercel.app/`
   - Cuidado com espaços!
   - Deve ser HTTPS (com S)
   - Termina com barra /

3. Clique em **"Continuar"**

4. Google oferecerá várias opções de verificação. Procure por:
   - **"Arquivo HTML"** ← Escolha esta
   - Ele fornecerá um arquivo chamado algo como `google1234567.html`

5. **Para adicionar o arquivo:**
   - Faça download do arquivo
   - Coloque na pasta `public/` do seu projeto
   - Commit e push
   - Aguarde Vercel fazer deploy (2-3 minutos)

6. **Depois volte ao Google Search Console** e clique **"Verificar"**

**Resultado esperado:** ✅ "Propriedade verificada com sucesso"

---

**ALTERNATIVA SE NÃO CONSEGUIR COM ARQUIVO HTML:**

Se o arquivo HTML não funcionar, siga para próxima opção:

1. Na mesma página de verificação, procure por **"Google Analytics"**
2. Se você tiver código Google Analytics no site, ele verifica automaticamente
3. Nosso site já tem Google Analytics no index.html
4. Pode levar 24h para reconhecer

---

**RESUMO:**
1. Clique "Propriedade do prefixo de URL"
2. Digite: `https://editora-vertice-literario.vercel.app/`
3. Escolha "Arquivo HTML"
4. Coloque arquivo em `public/`
5. Clique "Verificar"

---

### Tarefa 1.2: Submeter Sitemap ao Google
**O que é:** Informar ao Google todas as páginas do seu site.

**Passos:**
1. No Google Search Console, vá a **Sitemaps** (no menu esquerdo)
2. No campo "Adicionar novo sitemap", digite: `sitemap.xml`
3. Clique em "Enviar"
4. Aguarde 10-30 segundos e atualize a página
5. Deve aparecer "Sucesso" em verde

**Resultado esperado:** ✅ Sitemap indexado (pode levar 24-48h)

---

### Tarefa 1.3: Verificar robots.txt
**O que é:** Arquivo que controla o que o Google pode ou não rastrear.

**Passos:**
1. No Google Search Console, vá a **Configurações** → **Crawler**
2. Procure por "robots.txt"
3. Clique em "Testar robots.txt"
4. Confirme que aparecem as URLs permitidas
5. Se algo estiver errado, edite `public/robots.txt` e salve

**Resultado esperado:** ✅ Teste passou

---

## ✅ FASE 2: Monitoramento Básico (15 minutos/dia)

### Tarefa 2.1: Acompanhar Desempenho no Google Search Console

**Frequência:** Diariamente (5 minutos)

**O que fazer:**
1. Acesse: https://search.google.com/search-console/
2. Vá à aba **Desempenho**
3. Observe estas métricas:
   - **Cliques:** Quantas pessoas clicaram no seu site nos resultados
   - **Impressões:** Quantas vezes seu site apareceu
   - **CTR (Taxa de cliques):** Impressões ÷ Cliques (objetivo: > 5%)
   - **Posição média:** Em qual posição aparece (objetivo: top 10)

**Ações recomendadas:**
- Se CTR < 5%: Meta description não está atrativa, considere reescrever
- Se posição > 20: Conteúdo precisa de otimização
- Se cliques < 10/dia: Site precisa de mais conteúdo

---

### Tarefa 2.2: Verificar Core Web Vitals
**O que é:** Métricas técnicas que afetam ranking no Google.

**Frequência:** Semanalmente

**Passos:**
1. No Google Search Console, vá a **Core Web Vitals**
2. Observe os status (Verde = Bom, Laranja = Precisa melhorar, Vermelho = Crítico)
3. Se algum estiver vermelho, clique para detalhes
4. Vá a: https://pagespeed.web.dev/
5. Digite: `https://editora-vertice-literario.vercel.app/`
6. Aguarde análise (1-2 minutos)
7. Observe scores em Desktop e Mobile
8. Se score < 50: Há problemas de performance

**Ações recomendadas:**
- Score 90+: Excelente, manter assim
- Score 50-89: Bom, mas há melhorias
- Score < 50: Crítico, precisa otimizar

---

## ✅ FASE 3: Conteúdo e Otimização (2-3 horas/semana)

### Tarefa 3.1: Expandir o Blog
**Frequência:** 1-2 artigos por semana

**O que fazer:**
1. Escolha um tema relevante (ex: "Dicas para novos autores")
2. Crie arquivo em `public/data/posts.json` (já existe)
3. Adicione novo artigo com estrutura:
```json
{
  "id": 4,
  "title": "Seu Título Aqui",
  "author": "Seu Nome",
  "date": "15 Agosto, 2026",
  "image": "https://seu-url-da-imagem.jpg",
  "excerpt": "Resumo do artigo em 150 caracteres...",
  "content": "Conteúdo completo do artigo..."
}
```

4. Inclua na descrição:
   - Mínimo 800 palavras
   - Estrutura com H2 e H3
   - Palavras-chave naturais (não forçadas)
   - Links internos (para /catalogo, /autores)
   - Imagem de qualidade (mínimo 600x400px)

5. Commit e push no GitHub

**Impacto:** Cada artigo gera +5-10 cliques/mês em média

---

### Tarefa 3.2: Otimizar Descrições de Livros
**Frequência:** Conforme adiciona novos livros

**O que fazer:**
1. Abra `public/data/books.json`
2. Para cada livro, verifique:
   - **Sinopse:** Mínimo 100 caracteres, máximo 300
   - **Genero:** Preenchido corretamente
   - **Ano:** Preenchido
   - **Capa:** Imagem em boa qualidade

3. Exemplo de sinopse otimizada:
```
"sinopse": "Um testemunho vivo sobre reinvenção, coragem e transformação de crises em oportunidades de crescimento. Descubra como superar adversidades."
```

4. Commit e push

**Impacto:** Melhora CTR nas buscas por livro específico

---

### Tarefa 3.3: Atualizar Descrições de Autores
**Frequência:** Conforme adiciona novos autores

**O que fazer:**
1. Abra `public/data/authors.json`
2. Para cada autor, verifique:
   - **Bio:** Mínimo 150 caracteres (informações relevantes)
   - **Foto:** Imagem profissional (preferível headshot)
   - **Gênero:** Preenchido
   - **Obras:** Lista de livros publicados

3. Exemplo de bio otimizada:
```
"bio": "Moséstia Machava é médica licenciada em Medicina Geral e mestre em Saúde Pública pela Universidade Eduardo Mondlane. Autora de 'O Talento que a Crise Revela', combina rigor científico com visão humanizada do cuidado à pessoa."
```

4. Commit e push

**Impacto:** Cada autor é uma oportunidade de tráfego novo

---

## ✅ FASE 4: Construção de Autoridade (Mensal)

### Tarefa 4.1: Solicitar Backlinks
**Frequência:** 2-3 vezes por mês

**O que fazer:**
1. Identifique sites relacionados a:
   - Outras editoras moçambicanas
   - Sites de literatura africana
   - Blogs de escrita criativa
   - Associações de autores
   - Meios de comunicação moçambicanos

2. Envie email personalizado:
```
Assunto: Parceria - Editora Vértice Literário

Olá [Nome],

Somos a Editora Vértice Literário, baseada em Tete, Moçambique.
Publicamos literatura de qualidade e gostávamos de parceria.
Pode mencionarmos no seu blog/site?

Nosso site: https://editora-vertice-literario.vercel.app/

Obrigado,
[Seu Nome]
```

3. Monitore respostas
4. Quando fizerem link, verifique em Google Search Console → **Links**

**Impacto:** Cada backlink qualificado aumenta ranking 5-10 posições

---

### Tarefa 4.2: Submeter para Diretórios
**Frequência:** 1 vez por mês

**O que fazer:**
1. Submeta seu site a:
   - **DMOZ Português:** https://www.dmoz.org/World/Português/
   - **Diretório Editoras:** Procure "diretório editoras Portugal"
   - **Listagens Google My Business** (se quiser local SEO)

2. Para cada submissão:
   - Título: "Editora Vértice Literário - Publicação de Livros"
   - Descrição: "Editora moçambicana dedicada à publicação profissional..."
   - Categoria: "Editoras" ou "Negócios/Publicação"
   - URL: https://editora-vertice-literario.vercel.app/

**Impacto:** Cada diretório = +1-2 backlinks valiosos

---

## ✅ FASE 5: Análise e Relatório (Mensal)

### Tarefa 5.1: Gerar Relatório de SEO
**Frequência:** 1º de cada mês

**O que fazer:**
1. Acesse Google Search Console
2. Registre em planilha:
   - Cliques do mês anterior
   - Impressões do mês anterior
   - CTR médio
   - Posição média
   - Termos mais buscados
   - Páginas mais visitadas

3. Acesse Google Analytics 4
4. Registre:
   - Tráfego orgânico total
   - Páginas com mais sessões
   - Taxa de rejeição (bounce rate)
   - Conversões (contactos)

5. Compare com mês anterior
6. Identifique tendências positivas/negativas

**Exemplo de relatório:**
```
Agosto 2026 - Relatório SEO
- Cliques: 143 (+25%)
- Impressões: 2.847 (+15%)
- CTR: 5.02% (objetivo: 5-8%)
- Posição média: 18 (objetivo: top 10)
- Termos top: "editora moçambicana" (5 cliques), "publicar livro" (3 cliques)
```

---

## ✅ LISTA DE VERIFICAÇÃO SEMANAL

```
[ ] Google Search Console - Verificar cliques do dia
[ ] Google Analytics - 1 novo artigo ou conteúdo criado
[ ] Imagens otimizadas - Alt-text adequados
[ ] Links internos - Novo conteúdo linkado
[ ] Performance - Verificar PageSpeed Insights
[ ] Redes sociais - Compartilhar conteúdo recente
```

---

## ✅ LISTA DE VERIFICAÇÃO MENSAL

```
[ ] Relatório SEO completo
[ ] 4-8 novos artigos no blog
[ ] Novos livros no catálogo
[ ] Revisão de Core Web Vitals
[ ] Verificação de backlinks
[ ] Submissão em 1-2 diretórios
[ ] Análise de termos não ranqueados
[ ] Otimização de páginas com baixo CTR
```

---

## 📊 MÉTRICAS IMPORTANTES

### Meta de 6 Meses (Dezembro 2026):
- **Tráfego orgânico:** 500+ sessões/mês
- **Cliques:** 200+ cliques/mês
- **Posição média:** 15-20
- **CTR:** 5-8%
- **Backlinks:** 20+

### Meta de 1 Ano (Agosto 2027):
- **Tráfego orgânico:** 2.000+ sessões/mês
- **Cliques:** 800+ cliques/mês
- **Posição média:** 5-15
- **CTR:** 8-12%
- **Backlinks:** 100+

---

## 🔧 FERRAMENTAS ESSENCIAIS

| Ferramenta | URL | Frequência | Custo |
|-----------|-----|-----------|--------|
| Google Search Console | https://search.google.com/search-console/ | Diária | Grátis |
| Google Analytics 4 | https://analytics.google.com/ | Semanal | Grátis |
| PageSpeed Insights | https://pagespeed.web.dev/ | Semanal | Grátis |
| Ubersuggest | https://ubersuggest.com/ | Mensal | $99/ano |
| Ahrefs | https://ahrefs.com/ | Mensal | $99/mês |

---

## 📞 SUPORTE

Se tiver dúvidas em algum passo, consulte:
1. **SEO_GUIDE.md** - Conceitos detalhados
2. **SEO_IMPLEMENTATION_STATUS.md** - Status atual do projeto
3. Google Help Center: https://support.google.com/webmasters/

---

**Boa sorte! 🚀 SEO é uma maratona, não um sprint. Siga este guia consistentemente e verá resultados em 3-6 meses.**

