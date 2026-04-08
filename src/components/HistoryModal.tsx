import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

const HistoryModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-navy/80 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="relative bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 z-10 w-9 h-9 bg-navy text-white rounded-full flex items-center justify-center hover:bg-gold transition-colors">
              <X size={18} />
            </button>

            <div className="p-8 md:p-12">
              <span className="text-gold font-bold tracking-widest text-xs mb-3 block">HISTÓRICO INSTITUCIONAL</span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy mb-8 leading-tight">Editora Vértice Literário, Lda.</h2>

              <div className="space-y-5 text-slate-600 leading-relaxed">
                <p>
                  A <strong>Editora Vértice Literário, Lda.</strong> é uma instituição moçambicana dedicada à promoção e ao desenvolvimento da literatura no país e no espaço lusófono. Está sediada em Tete, na área da Paragem Juventude, ao pé do Mercado Cambinde, na Estrada Nacional nº 7, funcionando como um ponto de referência para autores, leitores e demais interessados no fomento literário.
                </p>
                <p>
                  A constituição oficial da editora está registada no Conservatório de Registo de Entidades Legais de Tete, sob o número <strong>185809</strong>, data que marca formalmente a criação da empresa.
                </p>
                <p>
                  Desde a sua origem, a Editora Vértice Literário tem-se destacado no apoio a escritores emergentes e consagrados, na democratização do acesso à publicação e na promoção da diversidade literária. Com base em valores éticos, responsabilidade cultural e compromisso com a palavra escrita, a editora tornou-se um agente activo no ecossistema literário, intervindo em áreas como edição, design, formação, promoção e mediação cultural.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HistoryModal;
