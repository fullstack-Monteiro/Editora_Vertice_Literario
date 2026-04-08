import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface PhilosophyItem {
  title: string;
  desc: string;
}

const PhilosophyModal = ({ item, onClose }: { item: PhilosophyItem | null; onClose: () => void }) => {
  useEffect(() => {
    if (item) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [item]);

  return (
    <AnimatePresence>
      {item && (
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
            className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 z-10 w-9 h-9 bg-navy text-white rounded-full flex items-center justify-center hover:bg-gold transition-colors">
              <X size={18} />
            </button>
            <div className="p-8 md:p-12">
              <div className="w-8 h-1 bg-gold mb-6"></div>
              <h2 className="text-xl md:text-2xl font-serif font-bold text-navy mb-6 leading-tight">{item.title}</h2>
              <p className="text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PhilosophyModal;
