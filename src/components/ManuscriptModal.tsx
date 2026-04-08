import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send } from 'lucide-react';

interface ManuscriptModalProps {
  open: boolean;
  onClose: () => void;
}

const empty = { nome: '', email: '', telefone: '', genero: 'Romance', sinopse: '', observacoes: '' };
const generos = ['Romance', 'Poesia', 'Conto', 'Crónica', 'Ensaio', 'Infantojuvenil', 'Biografia', 'Outro'];

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const ManuscriptModal = ({ open, onClose }: ManuscriptModalProps) => {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(`${API_URL}/api/manuscript`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) { setStatus('success'); setForm(empty); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={onClose}>
          <div className="absolute inset-0 bg-navy/80 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}
            className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl"
            onClick={e => e.stopPropagation()}>
            <button onClick={onClose}
              className="absolute top-4 right-4 z-10 w-9 h-9 bg-navy text-white rounded-full flex items-center justify-center hover:bg-gold transition-colors">
              <X size={18} />
            </button>

            <div className="bg-navy p-8">
              <span className="text-gold font-bold tracking-widest text-xs block mb-2">SUBMISSÃO DE ORIGINAL</span>
              <h2 className="text-2xl font-serif font-bold text-white">Submeta o seu Manuscrito</h2>
              <p className="text-slate-400 text-sm mt-2">Preencha o formulário e a nossa equipa editorial entrará em contacto.</p>
            </div>

            <div className="p-8">
              {status === 'success' ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="text-green-600" size={28} />
                  </div>
                  <h3 className="font-serif font-bold text-navy text-xl mb-2">Manuscrito Recebido!</h3>
                  <p className="text-slate-500 text-sm">A nossa equipa irá analisar a sua submissão e responder em breve.</p>
                  <button onClick={onClose} className="mt-6 bg-navy text-white px-8 py-3 text-xs font-bold tracking-widest hover:bg-gold transition-colors rounded-sm">
                    FECHAR
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-1">Nome Completo *</label>
                      <input required value={form.nome} onChange={e => setForm({...form, nome: e.target.value})}
                        className="w-full border border-slate-200 p-3 text-sm outline-none rounded-sm focus:border-gold" placeholder="O seu nome" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-1">Email *</label>
                      <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                        className="w-full border border-slate-200 p-3 text-sm outline-none rounded-sm focus:border-gold" placeholder="email@exemplo.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-1">Telefone</label>
                      <input value={form.telefone} onChange={e => setForm({...form, telefone: e.target.value})}
                        className="w-full border border-slate-200 p-3 text-sm outline-none rounded-sm focus:border-gold" placeholder="+258 ..." />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-1">Género Literário *</label>
                      <select required value={form.genero} onChange={e => setForm({...form, genero: e.target.value})}
                        className="w-full border border-slate-200 p-3 text-sm outline-none rounded-sm focus:border-gold bg-white">
                        {generos.map(g => <option key={g}>{g}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-1">Sinopse da Obra *</label>
                    <textarea required rows={4} value={form.sinopse} onChange={e => setForm({...form, sinopse: e.target.value})}
                      className="w-full border border-slate-200 p-3 text-sm outline-none rounded-sm resize-none focus:border-gold" placeholder="Descreva brevemente a sua obra..." />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-1">Observações</label>
                    <textarea rows={3} value={form.observacoes} onChange={e => setForm({...form, observacoes: e.target.value})}
                      className="w-full border border-slate-200 p-3 text-sm outline-none rounded-sm resize-none focus:border-gold" placeholder="Informações adicionais..." />
                  </div>
                  {status === 'error' && <p className="text-red-500 text-sm">Erro ao enviar. Tente novamente.</p>}
                  <button type="submit" disabled={status === 'sending'}
                    className="w-full flex items-center justify-center gap-2 bg-navy text-white py-4 text-xs font-bold tracking-widest hover:bg-gold transition-colors rounded-sm disabled:opacity-60">
                    <Send size={14} /> {status === 'sending' ? 'A ENVIAR...' : 'SUBMETER MANUSCRITO'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ManuscriptModal;
