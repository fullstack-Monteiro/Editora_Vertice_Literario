import React from 'react';
import { motion } from 'motion/react';

interface Author {
  id: number;
  nome: string;
  foto: string;
  bio: string;
  obras: string[];
  genero: string;
}

interface AuthorsSectionProps {
  authors: Author[];
}

const AuthorsSection = ({ authors }: AuthorsSectionProps) => {
  if (authors.length === 0) return null;

  return (
    <section id="autores" className="bg-slate-50 py-16 md:py-24 px-5 md:px-12">
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
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              {/* Foto circular */}
              <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg">
                {author.foto ? (
                  <img src={author.foto} alt={author.nome} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                    <span className="text-4xl font-serif font-bold text-slate-400">{author.nome.charAt(0)}</span>
                  </div>
                )}
              </div>

              <h3 className="font-serif font-bold text-navy text-xl mb-2">{author.nome}</h3>

              {author.genero && (
                <span className="text-gold text-xs font-bold tracking-widest uppercase block mb-4">{author.genero}</span>
              )}

              <p className="text-slate-500 text-sm leading-relaxed text-center line-clamp-4">{author.bio}</p>

              {author.obras.length > 0 && (
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {author.obras.map((obra, i) => (
                    <span key={i} className="text-[10px] font-bold tracking-widest bg-navy/5 text-navy px-3 py-1 rounded-sm">
                      {obra}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuthorsSection;
