import React, { useState } from 'react';
import { motion } from 'motion/react';
import AuthorModal from './AuthorModal';

interface Author {
  id: number;
  nome: string;
  foto: string;
  bio: string;
  obras: string[];
  genero: string;
}

const AuthorsSection = ({ authors }: { authors: Author[] }) => {
  const [selected, setSelected] = useState<Author | null>(null);

  if (authors.length === 0) return null;

  return (
    <section id="autores" className="bg-slate-50 py-16 md:py-24 px-5 md:px-12">
      <AuthorModal author={selected} onClose={() => setSelected(null)} />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-gold font-bold tracking-widest text-xs mb-4 block">EDITORA VÉRTICE LITERÁRIO</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-navy mb-4">Os Nossos Autores</h2>
          <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">As mentes brilhantes que dão vida ao nosso catálogo.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {authors.map((author, index) => (
            <motion.div
              key={author.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              viewport={{ once: true }}
              className="text-center cursor-pointer group"
              onClick={() => setSelected(author)}
            >
              <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                {author.foto ? (
                  <img src={author.foto} alt={author.nome}
                    className="w-full h-full object-cover transition-all duration-500"
                    referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                    <span className="text-4xl font-serif font-bold text-slate-400">{author.nome.charAt(0)}</span>
                  </div>
                )}
              </div>

              <h3 className="font-serif font-bold text-navy text-xl mb-2 group-hover:text-gold transition-colors duration-300">{author.nome}</h3>

              {author.genero && (
                <span className="text-gold text-xs font-bold tracking-widest uppercase block mb-4">{author.genero}</span>
              )}

              <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">{author.bio}</p>

              <button className="mt-4 text-xs font-bold tracking-widest text-navy hover:text-gold transition-colors">
                LER MAIS →
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuthorsSection;
