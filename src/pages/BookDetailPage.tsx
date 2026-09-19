import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ShoppingCart, BookOpen } from 'lucide-react';
import Navbar from '../components/Navbar';
import SEOHead from '../components/SEOHead';
import { generateBookSchema } from '../utils/seoSchema';
import { slugify } from '../utils/slugify';
import booksData from '../data/books.json';

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

const BookDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const books = booksData as Book[];
  const book = books.find(b => slugify(b.title) === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!book) {
    return (
      <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center">
        <Navbar forceScrolled />
        <div className="text-center pt-32">
          <p className="text-navy text-xl font-serif mb-4">Livro não encontrado.</p>
          <Link to="/catalogo" className="text-gold font-bold text-sm hover:underline">← Voltar ao Catálogo</Link>
        </div>
      </div>
    );
  }

  const url = `https://overticeliterario.com/livro/${slugify(book.title)}`;
  const description = book.sinopse
    ? book.sinopse.slice(0, 160)
    : `${book.title}, de ${book.author}. ${book.genero || 'Literatura'} publicado pela Editora Vértice Literário.`;

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <SEOHead
        title={`${book.title} — ${book.author}`}
        description={description}
        image={`https://overticeliterario.com${book.cover}`}
        url={url}
        type="book"
        keywords={`${book.title}, ${book.author}, ${book.genero || 'literatura'}, livro moçambicano, editora vértice literário`}
        schema={generateBookSchema(book)}
      />
      <Navbar forceScrolled />

      <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-28 sm:pt-36 pb-20">

        {/* Voltar */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
          <button onClick={() => navigate('/catalogo')}
            className="flex items-center gap-2 text-xs font-bold tracking-widest text-slate-400 hover:text-gold transition-colors mb-10 uppercase">
            <ArrowLeft size={14} /> Voltar ao Catálogo
          </button>
        </motion.div>

        {/* Main */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Capa */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="aspect-[3/4] overflow-hidden shadow-2xl rounded-sm bg-slate-100">
              <img
                src={book.cover}
                alt={`Capa do livro "${book.title}" de ${book.author} — Editora Vértice Literário`}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}>
            {book.genero && (
              <span className="text-gold text-[10px] font-bold tracking-widest uppercase block mb-3">
                {book.genero}{book.ano ? ` · ${book.ano}` : ''}
              </span>
            )}
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-navy mb-2 leading-tight">{book.title}</h1>
            <p className="text-slate-500 text-sm italic mb-6">{book.author}</p>

            {book.isbn && (
              <p className="text-xs text-slate-400 mb-4">ISBN: {book.isbn}</p>
            )}

            {book.sinopse && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen size={14} className="text-gold" />
                  <h2 className="text-xs font-bold tracking-widest text-navy uppercase">Sinopse</h2>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm">{book.sinopse}</p>
              </div>
            )}

            {book.preco ? (
              <div className="flex items-center justify-between bg-white p-5 rounded-sm shadow-sm mb-6">
                <div>
                  <p className="text-xs text-slate-400 tracking-widest uppercase mb-1">Preço</p>
                  <p className="text-2xl font-bold text-gold">{book.preco} <span className="text-sm font-normal text-slate-400">MZN</span></p>
                </div>
                <a href="https://wa.me/258834698880?text=Olá,%20tenho%20interesse%20no%20livro%20" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-navy text-white px-5 py-3 text-xs font-bold tracking-widest uppercase hover:bg-gold transition-colors">
                  <ShoppingCart size={14} /> Adquirir
                </a>
              </div>
            ) : (
              <a href="https://wa.me/258834698880" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-navy text-white px-5 py-3 text-xs font-bold tracking-widest uppercase hover:bg-gold transition-colors mb-6">
                <ShoppingCart size={14} /> Informações e Aquisição
              </a>
            )}

            <div className="pt-4 border-t border-slate-200">
              <p className="text-xs text-slate-400">Publicado pela <span className="text-navy font-bold">Editora Vértice Literário</span></p>
            </div>
          </motion.div>
        </div>

        {/* Outros livros */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="mt-16">
          <h3 className="text-sm font-bold tracking-widest text-navy uppercase mb-6">Outras Obras</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {books.filter(b => b.id !== book.id).slice(0, 4).map(b => (
              <Link key={b.id} to={`/livro/${slugify(b.title)}`}
                className="group text-center cursor-pointer">
                <div className="aspect-[3/4] overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 mb-2 bg-slate-100 rounded-sm">
                  <img src={b.cover} alt={`Capa de ${b.title}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <p className="text-xs font-serif font-bold text-navy group-hover:text-gold transition-colors leading-snug line-clamp-2">{b.title}</p>
                <p className="text-[10px] text-slate-400 italic">{b.author}</p>
              </Link>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default BookDetailPage;
