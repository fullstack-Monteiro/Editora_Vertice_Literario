import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface Book {
  id?: number;
  title: string;
  author: string;
  cover: string;
  sinopse?: string;
  genero?: string;
  ano?: string;
  isbn?: string;
}

interface BookModalProps {
  book: Book | null;
  onClose: () => void;
}

const BookModal = ({ book, onClose }: BookModalProps) => {
  useEffect(() => {
    if (book) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [book]);

  return (
    <AnimatePresence>
      {book && (
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

            <div className="flex flex-col md:flex-row">
              <div className="md:w-48 shrink-0">
                <img src={book.cover} alt={book.title}
                  className="w-full md:h-full object-cover aspect-[3/4] md:aspect-auto"
                  referrerPolicy="no-referrer" />
              </div>
              <div className="p-8 flex-1">
                {book.genero && (
                  <span className="text-[10px] font-bold tracking-widest text-gold uppercase block mb-3">{book.genero}</span>
                )}
                <h2 className="text-2xl font-serif font-bold text-navy mb-1 leading-tight">{book.title}</h2>
                <p className="text-slate-500 text-sm italic mb-6">{book.author}</p>

                {(book.ano || book.isbn) && (
                  <div className="flex gap-6 mb-6 text-xs text-slate-400">
                    {book.ano && <span><span className="font-bold text-navy">Ano:</span> {book.ano}</span>}
                    {book.isbn && <span><span className="font-bold text-navy">ISBN:</span> {book.isbn}</span>}
                  </div>
                )}

                {book.sinopse && (
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">Sinopse</p>
                    <p className="text-slate-600 text-sm leading-relaxed">{book.sinopse}</p>
                  </div>
                )}

                <a href={`https://wa.me/258834698880?text=${encodeURIComponent(`Olá! Tenho interesse em adquirir a obra "${book.title}" de ${book.author}. Poderia fornecer mais informações sobre disponibilidade e preço?`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 bg-navy text-white px-6 py-3 text-xs font-bold tracking-widest hover:bg-gold transition-colors rounded-sm">
                  ADQUIRIR ESTA OBRA
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookModal;
