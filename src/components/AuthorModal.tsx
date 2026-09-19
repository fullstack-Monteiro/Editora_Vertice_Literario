import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen } from 'lucide-react';

interface Author {
  id: number;
  nome: string;
  foto: string;
  bio: string;
  obras: string[];
  genero: string;
}

const AuthorModal = ({ author, onClose }: { author: Author | null; onClose: () => void }) => {
  useEffect(() => {
    if (author) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [author]);

  return (
    <AnimatePresence>
      {author && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={onClose}>
          <div className="absolute inset-0 bg-navy/80 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30 }} transition={{ duration: 0.25 }}
            className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl"
            onClick={e => e.stopPropagation()}>

            <button onClick={onClose}
              className="absolute top-4 right-4 z-10 w-9 h-9 bg-navy text-white rounded-full flex items-center justify-center hover:bg-gold transition-colors">
              <X size={18} />
            </button>

            {/* Header */}
            <div className="bg-slate-50 p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-slate-100">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg shrink-0">
                {author.foto ? (
                  <img src={author.foto} alt={`Fotografia de ${author.nome}, autor de ${author.genero} — Editora Vértice Literário`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                    <span className="text-3xl font-serif font-bold text-slate-400">{author.nome.charAt(0)}</span>
                  </div>
                )}
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-serif font-bold text-navy mb-1">{author.nome}</h2>
                {author.genero && (
                  <span className="text-gold text-xs font-bold tracking-widest uppercase">{author.genero}</span>
                )}
              </div>
            </div>

            {/* Bio */}
            <div className="p-8">
              <p className="text-slate-600 leading-relaxed text-sm">{author.bio}</p>

              {author.obras.length > 0 && (
                <div className="mt-8">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen size={16} className="text-gold" />
                    <h3 className="font-serif font-bold text-navy text-base">Obras Publicadas</h3>
                  </div>
                  <ul className="space-y-2">
                    {author.obras.map((obra, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                        <span className="w-1.5 h-1.5 bg-gold rounded-full shrink-0"></span>
                        {obra}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthorModal;
