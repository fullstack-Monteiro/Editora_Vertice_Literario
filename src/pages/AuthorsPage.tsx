import React, { useState } from 'react';
import { motion } from 'motion/react';
import AuthorModal from '../components/AuthorModal';
import Navbar from '../components/Navbar';
import { AUTHORS } from '../constants';

type Author = typeof AUTHORS[0];

const AuthorsPage = () => {
  const [selected, setSelected] = useState<Author | null>(null);

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <Navbar forceScrolled />
      <AuthorModal author={selected} onClose={() => setSelected(null)} />

      <div className="pt-32 pb-8 px-5 md:px-12 text-center">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-navy mb-3">Os Nossos Autores</h1>
        <p className="text-slate-500 text-sm">As mentes brilhantes que dão vida ao nosso catálogo.</p>
        <div className="w-16 h-0.5 bg-gold mx-auto mt-4"></div>
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-12 py-10 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {[...AUTHORS].sort((a, b) => a.nome.localeCompare(b.nome, 'pt')).map((author, index) => (
            <motion.div key={author.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="text-center cursor-pointer group"
              onClick={() => setSelected(author)}
            >
              <div className="w-44 h-44 mx-auto mb-5 rounded-full overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 border-4 border-white">
                {author.foto ? (
                  <img src={author.foto} alt={author.nome}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                    <span className="text-4xl font-serif font-bold text-slate-400">{author.nome.charAt(0)}</span>
                  </div>
                )}
              </div>
              <h3 className="font-serif font-bold text-navy text-xl mb-1 group-hover:text-gold transition-colors duration-300 leading-snug">
                {author.nome}
              </h3>
              {author.genero && (
                <span className="text-gold text-[11px] font-bold tracking-widest uppercase block mb-3">
                  {author.genero}
                </span>
              )}
              <p className="text-slate-500 text-sm leading-relaxed line-clamp-4 text-left">
                {author.bio}
              </p>
              <button className="mt-3 text-xs font-bold tracking-widest text-gold hover:text-navy transition-colors">
                LER MAIS →
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorsPage;
