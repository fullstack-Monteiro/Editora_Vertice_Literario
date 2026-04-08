import React, { useState } from 'react';
import { Send } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error' | 'duplicate'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(`${API_URL}/api/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) { setStatus('success'); setEmail(''); }
      else if (res.status === 409) setStatus('duplicate');
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  return (
    <div className="bg-gold/10 border border-gold/30 rounded-sm p-8 text-center max-w-xl mx-auto">
      <h3 className="font-serif font-bold text-navy text-xl mb-2">Newsletter Vértice Literário</h3>
      <p className="text-slate-500 text-sm mb-6">Receba novidades sobre livros, eventos e publicações directamente no seu email.</p>

      {status === 'success' ? (
        <p className="text-green-600 font-bold text-sm">Subscrito com sucesso! Verifique o seu email.</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            required type="email" value={email}
            onChange={e => { setEmail(e.target.value); setStatus('idle'); }}
            placeholder="O seu email"
            className="flex-1 border border-slate-200 p-3 text-sm outline-none rounded-sm focus:border-gold"
          />
          <button type="submit" disabled={status === 'sending'}
            className="flex items-center gap-2 bg-navy text-white px-5 py-3 text-xs font-bold tracking-widest hover:bg-gold transition-colors rounded-sm disabled:opacity-60 whitespace-nowrap">
            <Send size={13} /> {status === 'sending' ? '...' : 'SUBSCREVER'}
          </button>
        </form>
      )}
      {status === 'duplicate' && <p className="text-amber-600 text-xs mt-2">Este email já está subscrito.</p>}
      {status === 'error' && <p className="text-red-500 text-xs mt-2">Erro ao subscrever. Tente novamente.</p>}
    </div>
  );
};

export default Newsletter;
