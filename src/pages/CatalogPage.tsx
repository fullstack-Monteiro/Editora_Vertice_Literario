import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Filter, Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import BookModal from '../components/BookModal';
import { FEATURED_BOOKS } from '../constants';

const ALL_BOOKS = FEATURED_BOOKS.map((b, i) => ({
  ...b,
  id: i + 1,
  genero: (b as any).genero || '',
  sinopse: (b as any).sinopse || '',
  ano: (b as any).ano || '',
  isbn: (b as any).isbn || '',
}));

const CatalogPage = () => {
  const [search, setSearch] = useState('');
  const [generoFilter, setGeneroFilter] = useState('Todos');
  const [autorFilter, setAutorFilter] = useState('Todos');
  const [selected, setSelected] = useState<typeof ALL_BOOKS[0] | null>(null);

  const generos = ['Todos', ...Array.from(new Set(ALL_BOOKS.map(b => b.genero).filter(Boolean)))];
  const autores = ['Todos', ...Array.from(new Set(ALL_BOOKS.map(b => b.author).filter(Boolean))).sort((a, b) => a.localeCompare(b, 'pt'))];

  const filtered = useMemo(() => {
    return ALL_BOOKS.filter(b => {
      const matchSearch = search === '' ||
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.author.toLowerCase().includes(search.toLowerCase());
      const matchGenero = generoFilter === 'Todos' || b.genero === generoFilter;
      const matchAutor = autorFilter === 'Todos' || b.author === autorFilter;
      return matchSearch && matchGenero && matchAutor;
    });
  }, [search, generoFilter, autorFilter]);

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <Navbar forceScrolled />
      <BookModal book={selected} onClose={() => setSelected(null)} />

      <div className="pt-28 pb-16 max-w-7xl mx-auto px-5 md:px-12 flex flex-col md:flex-row gap-8">

        {/* Sidebar filtros */}
        <aside className="w-full md:w-56 shrink-0">
          <h2 className="flex items-center gap-2 font-serif font-bold text-navy text-lg mb-6">
            <Filter size={18} className="text-gold" /> Filtros
          </h2>

          {/* Search */}
          <div className="relative mb-6">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Buscar livro ou autor..."
              className="w-full pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-sm bg-white outline-none focus:border-gold" />
          </div>

          {/* Género */}
          <div className="mb-6">
            <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-3">Género</p>
            <div className="space-y-2">
              {generos.map(g => (
                <label key={g} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="genero" checked={generoFilter === g}
                    onChange={() => setGeneroFilter(g)}
                    className="accent-gold" />
                  <span className={`text-sm ${generoFilter === g ? 'font-bold text-navy' : 'text-slate-500'}`}>{g}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Autor */}
          <div>
            <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-3">Autor</p>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {autores.map(a => (
                <label key={a} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="autor" checked={autorFilter === a}
                    onChange={() => setAutorFilter(a)}
                    className="accent-gold" />
                  <span className={`text-sm ${autorFilter === a ? 'font-bold text-navy' : 'text-slate-500'}`}>{a}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Grid livros */}
        <div className="flex-1">
          <p className="text-sm text-slate-400 mb-6">Mostrando {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}</p>

          {filtered.length === 0 ? (
            <p className="text-slate-400 text-center py-20">Nenhum livro encontrado.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((book, index) => (
                <motion.div key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="cursor-pointer group"
                  onClick={() => setSelected(book)}
                >
                  {/* Capa */}
                  <div className="aspect-[3/4] overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 mb-4 bg-slate-100">
                    <img src={book.cover} alt={book.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer" />
                  </div>

                  {/* Info */}
                  {book.genero && (
                    <p className="text-gold text-[10px] font-bold tracking-widest uppercase mb-1">
                      {book.genero}{book.ano ? ` • ${book.ano}` : ''}
                    </p>
                  )}
                  <h3 className="font-serif font-bold text-navy text-xl leading-snug group-hover:text-gold transition-colors mb-1">
                    {book.title}
                  </h3>
                  <p className="text-slate-500 text-sm italic">{book.author}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
