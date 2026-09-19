import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import BookModal from '../components/BookModal';
import SEOHead from '../components/SEOHead';
import { generateBookSchema } from '../utils/seoSchema';
type Book = {
  id: number;
  title: string;
  author: string;
  cover: string;
  genero?: string;
  sinopse?: string;
  ano?: string;
  preco?: number;
  isbn?: string;
};

const CatalogPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Book | null>(null);

  useEffect(() => {
    fetch('/data/books.json')
      .then(res => res.json())
      .then(data => setBooks(data as Book[]))
      .catch(err => console.error('Erro ao carregar livros:', err));
  }, []);

  const filtered = useMemo(() => {
    const normalize = (s: string) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const q = normalize(search.trim());
    if (!q) return books;
    return books.filter(b =>
      normalize(b.title).includes(q) ||
      normalize(b.author).includes(q) ||
      normalize(b.genero || '').includes(q)
    );
  }, [search, books]);

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <SEOHead 
        title="Catálogo de Obras Publicadas"
        description="Explore o catálogo com 28 obras publicadas pela Editora Vértice Literário. Literatura moçambicana, poesia, ficção e não-ficção. Descubra novos autores e histórias de Moçambique."
        keywords="catálogo de livros, obras publicadas, literatura moçambicana, poesia, ficção, não-ficção, editora tete, livros moçambicanos"
        url="https://overticeliterario.com/catalogo"
        schema={books.length > 0 ? {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Catálogo de Obras — Editora Vértice Literário',
          description: 'Lista de obras publicadas pela Editora Vértice Literário, editora moçambicana sediada em Tete.',
          numberOfItems: books.length,
          itemListElement: books.map((book, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: generateBookSchema(book)
          }))
        } : undefined}
      />
      <Navbar forceScrolled />
      <BookModal book={selected} onClose={() => setSelected(null)} />

      {/* Header */}
      <div className="pt-24 sm:pt-32 pb-8 px-5 md:px-12 text-center">
        <span className="text-gold font-bold tracking-widest text-xs mb-4 block">EDITORA VÉRTICE LITERÁRIO</span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-navy mb-3">Catálogo de Obras</h1>
        <p className="text-slate-500 text-sm mb-6">Obras publicadas e disponíveis para aquisição.</p>
        <div className="w-16 h-0.5 bg-gold mx-auto mb-8"></div>

        {/* Barra de pesquisa */}
        <div className="relative max-w-md mx-auto">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Pesquisar por título, autor ou género..."
            className="w-full pl-11 pr-4 py-3 text-sm bg-white border border-slate-200 text-navy placeholder-slate-400 rounded-sm outline-none focus:border-gold transition-all shadow-sm"
          />
        </div>
        {search && (
          <p className="text-sm text-slate-400 mt-3">
            {filtered.length} resultado{filtered.length !== 1 ? 's' : ''} para
            <span className="text-gold font-bold"> "{search}"</span>
            <button onClick={() => setSearch('')} className="ml-2 text-slate-400 hover:text-navy underline text-xs">limpar</button>
          </p>
        )}
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-12 py-8 pb-20">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg mb-2">Nenhuma obra encontrada.</p>
            <button onClick={() => setSearch('')} className="text-gold text-sm font-bold hover:underline">
              Limpar pesquisa
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((book, index) => (
              <motion.div key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="cursor-pointer group text-center"
                onClick={() => setSelected(book)}
              >
                <div className="aspect-[3/4] overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 mb-3 bg-slate-100 rounded-sm">
                  <img src={book.cover} alt={`Capa do livro "${book.title}" de ${book.author}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer" />
                </div>
                {book.genero && (
                  <p className="text-gold text-[9px] font-bold tracking-widest uppercase mb-0.5">
                    {book.genero}{book.ano ? ` • ${book.ano}` : ''}
                  </p>
                )}
                <h3 className="font-serif font-bold text-navy text-sm leading-snug group-hover:text-gold transition-colors mb-0.5">
                  {book.title}
                </h3>
                <p className="text-slate-500 text-xs italic mb-1">{book.author}</p>
                {book.preco && <p className="text-gold text-xs font-bold">{book.preco} MZN</p>}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
