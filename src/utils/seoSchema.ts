// SEO Schema Markup generators

export const generateBookSchema = (book: {
  id?: number;
  title: string;
  author: string;
  cover: string;
  genero?: string;
  ano?: string;
  sinopse?: string;
  isbn?: string;
  preco?: number;
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: book.title,
    author: {
      '@type': 'Person',
      name: book.author
    },
    image: `https://editoraverticeliterario.vercel.app${book.cover}`,
    bookFormat: 'Hardcover',
    inLanguage: 'pt-PT',
    publisher: {
      '@type': 'Organization',
      name: 'Editora Vértice Literário'
    },
    ...(book.isbn && { isbn: book.isbn }),
    ...(book.ano && { datePublished: `${book.ano}-01-01` }),
    ...(book.genero && { genre: book.genero }),
    ...(book.sinopse && { description: book.sinopse }),
    ...(book.preco && {
      offers: {
        '@type': 'Offer',
        price: book.preco,
        priceCurrency: 'MZN',
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'Organization',
          name: 'Editora Vértice Literário'
        }
      }
    })
  };
};

export const generateArticleSchema = (post: {
  id: number;
  title: string;
  author: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    image: post.image,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'Editora Vértice Literário',
      logo: {
        '@type': 'ImageObject',
        url: 'https://editoraverticeliterario.vercel.app/logo.png'
      }
    },
    description: post.excerpt,
    articleBody: post.content
  };
};

export const generateAuthorSchema = (author: {
  nome: string;
  foto?: string;
  bio: string;
  genero?: string;
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.nome,
    ...(author.foto && { image: `https://editoraverticeliterario.vercel.app${author.foto}` }),
    jobTitle: author.genero ? `Autor de ${author.genero}` : 'Autor',
    description: author.bio,
    affiliation: {
      '@type': 'Organization',
      name: 'Editora Vértice Literário'
    }
  };
};

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
};

export const generateOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Editora Vértice Literário',
    alternateName: 'Vértice Literário',
    url: 'https://editoraverticeliterario.vercel.app/',
    logo: 'https://editoraverticeliterario.vercel.app/logo.png',
    description: 'Editora moçambicana dedicada à promoção e desenvolvimento da literatura.',
    foundingDate: '2024',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Paragem Juventude, Mercado Cambinde, Estrada Nacional nº 7',
      addressLocality: 'Tete',
      addressCountry: 'MZ'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+258834698880',
      contactType: 'customer service',
      availableLanguage: 'Portuguese'
    },
    sameAs: [
      'https://www.facebook.com/profile.php?id=61569927223809',
      'https://www.instagram.com/edit.oraverticeliterario/'
    ],
    email: 'editoraverticeliterario@gmail.com',
    areaServed: ['MZ', 'PT', 'BR'],
    knowsAbout: [
      'Publicação de livros',
      'Revisão literária',
      'Design editorial',
      'Literatura moçambicana'
    ]
  };
};
