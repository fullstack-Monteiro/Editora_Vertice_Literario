import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Plus, Pencil, Trash2, X, LogOut, Save, BookOpen, Newspaper, Upload, Mail, Settings, FileText, MessageSquare } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface Post {
  id: number; title: string; author: string;
  date: string; image: string; excerpt: string; content: string;
}
interface Book {
  id: number; title: string; author: string; cover: string;
  sinopse?: string; genero?: string; ano?: string; isbn?: string;
}

const emptyPost = { title: '', author: '', date: '', image: '', excerpt: '', content: '' };
const emptyBook = { title: '', author: '', cover: '', sinopse: '', genero: '', ano: '', isbn: '' };

const AdminPanel = ({ onClose }: { onClose: () => void }) => {
  const [tab, setTab] = useState<'posts' | 'books' | 'newsletter' | 'content' | 'manuscripts' | 'contacts'>('posts');
  const [token, setToken] = useState('');
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  // Posts state
  const [posts, setPosts] = useState<Post[]>([]);
  const [form, setForm] = useState(emptyPost);
  const [editing, setEditing] = useState<number | null>(null);

  // Books state
  const [books, setBooks] = useState<Book[]>([]);
  const [bookForm, setBookForm] = useState(emptyBook);
  const [editingBook, setEditingBook] = useState<number | null>(null);

  interface Subscriber { email: string; date: string; }
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  interface Manuscript { id: number; nome: string; email: string; telefone: string; genero: string; sinopse: string; observacoes: string; data: string; estado: string; }
  const [manuscripts, setManuscripts] = useState<Manuscript[]>([]);

  interface Contact { id: number; nome: string; email: string; servico: string; mensagem: string; data: string; lida: boolean; }
  const [contacts, setContacts] = useState<Contact[]>([]);

  interface SiteContent {
    hero: { titulo: string; subtitulo: string };
    sobre: { texto: string; missao: string; visao: string };
    contacto: { morada: string; telefone: string; email: string; facebook: string; instagram: string; whatsapp: string };
  }
  const [content, setContent] = useState<SiteContent | null>(null);
  const [contentMsg, setContentMsg] = useState('');

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [uploading, setUploading] = useState(false);
  const postImageRef = useRef<HTMLInputElement>(null);
  const bookCoverRef = useRef<HTMLInputElement>(null);

  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

  const uploadImage = async (file: File, onSuccess: (url: string) => void) => {
    setUploading(true);
    const fd = new FormData();
    fd.append('image', file);
    try {
      const res = await fetch(`${API}/api/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: fd,
      });
      if (res.ok) {
        const { url } = await res.json();
        onSuccess(url);
      } else {
        setMsg('Erro ao fazer upload da imagem.');
      }
    } catch { setMsg('Erro ao fazer upload.'); }
    setUploading(false);
  };

  const fetchPosts = async () => {
    const res = await fetch(`${API}/api/posts`);
    setPosts(await res.json());
  };
  const fetchBooks = async () => {
    const res = await fetch(`${API}/api/books`);
    setBooks(await res.json());
  };
  const fetchSubscribers = async () => {
    const res = await fetch(`${API}/api/newsletter`, { headers });
    if (res.ok) { const data = await res.json(); setSubscribers(data.subscribers || []); }
  };
  const fetchContent = async () => {
    const res = await fetch(`${API}/api/content`);
    if (res.ok) setContent(await res.json());
  };
  const fetchManuscripts = async () => {
    const res = await fetch(`${API}/api/manuscripts`, { headers });
    if (res.ok) setManuscripts(await res.json());
  };
  const fetchContacts = async () => {
    const res = await fetch(`${API}/api/contacts`, { headers });
    if (res.ok) setContacts(await res.json());
  };

  // Verifica se o token expirou
  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp * 1000 < Date.now()) {
          localStorage.removeItem('admin_token');
          setToken('');
          return;
        }
      } catch { localStorage.removeItem('admin_token'); setToken(''); return; }
      fetchPosts(); fetchBooks(); fetchSubscribers(); fetchContent(); fetchManuscripts(); fetchContacts();
    }
  }, [token]);

  // Carrega conteúdo quando muda para o tab content
  useEffect(() => {
    if (tab === 'content' && !content) fetchContent();
  }, [tab]);
    e.preventDefault();
    setLoginError('');
    const res = await fetch(`${API}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginForm),
    });
    if (res.ok) {
      const { token: t } = await res.json();
      localStorage.setItem('admin_token', t);
      setToken(t);
    } else {
      setLoginError('Utilizador ou palavra-passe incorrectos.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setToken('');
    onClose();
  };

  // ── Posts handlers ───────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const url = editing ? `${API}/api/posts/${editing}` : `${API}/api/posts`;
    const method = editing ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers, body: JSON.stringify(form) });
    if (res.ok) {
      setMsg(editing ? 'Notícia atualizada!' : 'Notícia publicada!');
      setForm(emptyPost); setEditing(null); fetchPosts();
    } else { setMsg('Erro ao guardar.'); }
    setLoading(false);
    setTimeout(() => setMsg(''), 3000);
  };

  const handleEdit = (post: Post) => {
    setEditing(post.id);
    setForm({ title: post.title, author: post.author, date: post.date, image: post.image, excerpt: post.excerpt, content: post.content });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Apagar esta notícia?')) return;
    await fetch(`${API}/api/posts/${id}`, { method: 'DELETE', headers });
    fetchPosts();
  };

  // ── Books handlers ───────────────────────────────────────
  const handleBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const url = editingBook ? `${API}/api/books/${editingBook}` : `${API}/api/books`;
    const method = editingBook ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers, body: JSON.stringify(bookForm) });
    if (res.ok) {
      setMsg(editingBook ? 'Livro atualizado!' : 'Livro adicionado!');
      setBookForm(emptyBook); setEditingBook(null); fetchBooks();
    } else { setMsg('Erro ao guardar.'); }
    setLoading(false);
    setTimeout(() => setMsg(''), 3000);
  };

  const handleEditBook = (book: Book) => {
    setEditingBook(book.id);
    setBookForm({ title: book.title, author: book.author, cover: book.cover, sinopse: book.sinopse || '', genero: book.genero || '', ano: book.ano || '', isbn: book.isbn || '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteBook = async (id: number) => {
    if (!confirm('Apagar este livro?')) return;
    await fetch(`${API}/api/books/${id}`, { method: 'DELETE', headers });
    fetchBooks();
  };

  // ── Login ────────────────────────────────────────────────
  if (!token) return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-sm rounded-sm shadow-2xl overflow-hidden">
        <div className="p-8 text-center border-b border-slate-100">
          <img src="/logo.png" alt="Vértice Literário" className="h-32 w-auto object-contain mx-auto mb-2" />
          <p className="text-slate-500 text-xs font-bold tracking-widest uppercase">Painel de Administração</p>
        </div>
        <form onSubmit={handleLogin} className="p-8 space-y-5">
          <div>
            <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-1">Utilizador</label>
            <input required value={loginForm.username} onChange={e => setLoginForm({...loginForm, username: e.target.value})}
              className="w-full border border-slate-200 p-3 text-sm outline-none rounded-sm" placeholder="admin" />
          </div>
          <div>
            <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-1">Palavra-passe</label>
            <input required type="password" value={loginForm.password} onChange={e => setLoginForm({...loginForm, password: e.target.value})}
              className="w-full border border-slate-200 p-3 text-sm outline-none rounded-sm" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full bg-navy text-white py-3 font-bold tracking-widest text-xs hover:bg-gold transition-colors rounded-sm">
            ENTRAR
          </button>
          <button type="button" onClick={onClose} className="w-full text-slate-400 text-xs hover:text-slate-600 transition-colors">
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );

  // ── Painel ───────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-navy text-white px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-serif font-bold text-xl text-gold">Painel de Administração</h1>
          <p className="text-slate-400 text-xs">Editora Vértice Literário</p>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors">
          <LogOut size={16} /> Sair
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 bg-white px-6 overflow-x-auto">
        <div className="max-w-4xl mx-auto flex gap-0 min-w-max">
          <button onClick={() => setTab('posts')}
            className={`flex items-center gap-2 px-4 py-4 text-xs font-bold tracking-widest border-b-2 transition-colors whitespace-nowrap ${tab === 'posts' ? 'border-gold text-navy' : 'border-transparent text-slate-400 hover:text-navy'}`}>
            <Newspaper size={14} /> NOTÍCIAS
          </button>
          <button onClick={() => setTab('books')}
            className={`flex items-center gap-2 px-4 py-4 text-xs font-bold tracking-widest border-b-2 transition-colors whitespace-nowrap ${tab === 'books' ? 'border-gold text-navy' : 'border-transparent text-slate-400 hover:text-navy'}`}>
            <BookOpen size={14} /> LIVROS
          </button>
          <button onClick={() => setTab('newsletter')}
            className={`flex items-center gap-2 px-4 py-4 text-xs font-bold tracking-widest border-b-2 transition-colors whitespace-nowrap ${tab === 'newsletter' ? 'border-gold text-navy' : 'border-transparent text-slate-400 hover:text-navy'}`}>
            <Mail size={14} /> NEWSLETTER ({subscribers.length})
          </button>
          <button onClick={() => setTab('content')}
            className={`flex items-center gap-2 px-4 py-4 text-xs font-bold tracking-widest border-b-2 transition-colors whitespace-nowrap ${tab === 'content' ? 'border-gold text-navy' : 'border-transparent text-slate-400 hover:text-navy'}`}>
            <Settings size={14} /> CONTEÚDO
          </button>
          <button onClick={() => setTab('manuscripts')}
            className={`flex items-center gap-2 px-4 py-4 text-xs font-bold tracking-widest border-b-2 transition-colors whitespace-nowrap ${tab === 'manuscripts' ? 'border-gold text-navy' : 'border-transparent text-slate-400 hover:text-navy'}`}>
            <FileText size={14} /> MANUSCRITOS ({manuscripts.length})
          </button>
          <button onClick={() => setTab('contacts')}
            className={`flex items-center gap-2 px-4 py-4 text-xs font-bold tracking-widest border-b-2 transition-colors whitespace-nowrap ${tab === 'contacts' ? 'border-gold text-navy' : 'border-transparent text-slate-400 hover:text-navy'}`}>
            <MessageSquare size={14} /> MENSAGENS ({contacts.filter(c => !c.lida).length > 0 ? <span className="bg-gold text-navy rounded-full px-1">{contacts.filter(c => !c.lida).length}</span> : contacts.length})
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 md:py-10 space-y-8 md:space-y-10">

        {/* ── POSTS TAB ── */}
        {tab === 'posts' && (<>
          <div className="bg-white shadow-sm rounded-sm p-8">
            <h2 className="font-serif font-bold text-navy text-xl mb-6 flex items-center gap-2">
              {editing ? <><Pencil size={18} className="text-gold" /> Editar Notícia</> : <><Plus size={18} className="text-gold" /> Nova Notícia</>}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-1">Título *</label>
                  <input required value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                    className="w-full border border-slate-200 p-3 text-sm outline-none rounded-sm" placeholder="Título da notícia" />
                </div>
                <div>
                  <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-1">Autor</label>
                  <input value={form.author} onChange={e => setForm({...form, author: e.target.value})}
                    className="w-full border border-slate-200 p-3 text-sm outline-none rounded-sm" placeholder="Redação Vértice" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-1">Data</label>
                  <input value={form.date} onChange={e => setForm({...form, date: e.target.value})}
                    className="w-full border border-slate-200 p-3 text-sm outline-none rounded-sm" placeholder="Ex: 01 Janeiro, 2025" />
                </div>
                <div>
                  <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-1">URL da Imagem</label>
                  <div className="flex gap-2">
                    <input value={form.image} onChange={e => setForm({...form, image: e.target.value})}
                      className="flex-1 border border-slate-200 p-3 text-sm outline-none rounded-sm" placeholder="https://..." />
                    <button type="button" onClick={() => postImageRef.current?.click()}
                      className="flex items-center gap-1 border border-slate-200 px-3 text-xs font-bold text-slate-500 hover:border-gold hover:text-gold transition-colors rounded-sm">
                      <Upload size={13} /> {uploading ? '...' : 'Upload'}
                    </button>
                  </div>
                  <input ref={postImageRef} type="file" accept="image/*" className="hidden"
                    onChange={e => e.target.files?.[0] && uploadImage(e.target.files[0], url => setForm(f => ({...f, image: url})))} />
                  {form.image && <img src={form.image} alt="preview" className="mt-2 h-24 object-cover rounded-sm" referrerPolicy="no-referrer" />}
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-1">Resumo</label>
                <input value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})}
                  className="w-full border border-slate-200 p-3 text-sm outline-none rounded-sm" placeholder="Breve descrição do artigo..." />
              </div>
              <div>
                <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-1">Conteúdo *</label>
                <textarea required rows={8} value={form.content} onChange={e => setForm({...form, content: e.target.value})}
                  className="w-full border border-slate-200 p-3 text-sm outline-none rounded-sm resize-none" placeholder="Conteúdo completo do artigo..." />
              </div>
              {msg && <p className={`text-sm font-medium ${msg.includes('Erro') ? 'text-red-500' : 'text-green-600'}`}>{msg}</p>}
              <div className="flex gap-3">
                <button type="submit" disabled={loading}
                  className="flex items-center gap-2 bg-navy text-white px-6 py-3 text-xs font-bold tracking-widest hover:bg-gold transition-colors rounded-sm disabled:opacity-60">
                  <Save size={14} /> {loading ? 'A guardar...' : editing ? 'Atualizar' : 'Publicar'}
                </button>
                {editing && (
                  <button type="button" onClick={() => { setEditing(null); setForm(emptyPost); }}
                    className="flex items-center gap-2 border border-slate-200 text-slate-600 px-6 py-3 text-xs font-bold tracking-widest hover:bg-slate-50 transition-colors rounded-sm">
                    <X size={14} /> Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>

          <div>
            <h2 className="font-serif font-bold text-navy text-xl mb-6">Notícias Publicadas ({posts.length})</h2>
            {posts.length === 0 ? <p className="text-slate-400 text-sm">Nenhuma notícia publicada ainda.</p> : (
              <div className="space-y-4">
                {posts.map(post => (
                  <motion.div key={post.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="bg-white shadow-sm rounded-sm p-5 flex items-start gap-4">
                    <img src={post.image} alt={post.title} className="w-20 h-14 object-cover rounded-sm shrink-0" referrerPolicy="no-referrer" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif font-bold text-navy text-sm leading-snug mb-1 truncate">{post.title}</h3>
                      <p className="text-xs text-slate-400">{post.date} · {post.author}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => handleEdit(post)}
                        className="w-8 h-8 flex items-center justify-center border border-slate-200 hover:border-gold hover:text-gold transition-colors rounded-sm">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => handleDelete(post.id)}
                        className="w-8 h-8 flex items-center justify-center border border-slate-200 hover:border-red-400 hover:text-red-400 transition-colors rounded-sm">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </>)}

        {/* ── BOOKS TAB ── */}
        {tab === 'books' && (<>
          <div className="bg-white shadow-sm rounded-sm p-8">
            <h2 className="font-serif font-bold text-navy text-xl mb-6 flex items-center gap-2">
              {editingBook ? <><Pencil size={18} className="text-gold" /> Editar Livro</> : <><Plus size={18} className="text-gold" /> Novo Livro</>}
            </h2>
            <form onSubmit={handleBookSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-1">Título *</label>
                  <input required value={bookForm.title} onChange={e => setBookForm({...bookForm, title: e.target.value})}
                    className="w-full border border-slate-200 p-3 text-sm outline-none rounded-sm" placeholder="Título do livro" />
                </div>
                <div>
                  <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-1">Autor *</label>
                  <input required value={bookForm.author} onChange={e => setBookForm({...bookForm, author: e.target.value})}
                    className="w-full border border-slate-200 p-3 text-sm outline-none rounded-sm" placeholder="Nome do autor" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-1">URL da Capa</label>
                <div className="flex gap-2">
                  <input value={bookForm.cover} onChange={e => setBookForm({...bookForm, cover: e.target.value})}
                    className="flex-1 border border-slate-200 p-3 text-sm outline-none rounded-sm" placeholder="https://..." />
                  <button type="button" onClick={() => bookCoverRef.current?.click()}
                    className="flex items-center gap-1 border border-slate-200 px-3 text-xs font-bold text-slate-500 hover:border-gold hover:text-gold transition-colors rounded-sm">
                    <Upload size={13} /> {uploading ? '...' : 'Upload'}
                  </button>
                </div>
                <input ref={bookCoverRef} type="file" accept="image/*" className="hidden"
                  onChange={e => e.target.files?.[0] && uploadImage(e.target.files[0], url => setBookForm(f => ({...f, cover: url})))} />
                {bookForm.cover && <img src={bookForm.cover} alt="preview" className="mt-3 h-32 object-cover rounded-sm" referrerPolicy="no-referrer" />}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-1">Género</label>
                  <input value={bookForm.genero} onChange={e => setBookForm({...bookForm, genero: e.target.value})}
                    className="w-full border border-slate-200 p-3 text-sm outline-none rounded-sm" placeholder="Romance, Poesia..." />
                </div>
                <div>
                  <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-1">Ano</label>
                  <input value={bookForm.ano} onChange={e => setBookForm({...bookForm, ano: e.target.value})}
                    className="w-full border border-slate-200 p-3 text-sm outline-none rounded-sm" placeholder="2024" />
                </div>
                <div>
                  <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-1">ISBN</label>
                  <input value={bookForm.isbn} onChange={e => setBookForm({...bookForm, isbn: e.target.value})}
                    className="w-full border border-slate-200 p-3 text-sm outline-none rounded-sm" placeholder="978-..." />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-1">Sinopse</label>
                <textarea rows={4} value={bookForm.sinopse} onChange={e => setBookForm({...bookForm, sinopse: e.target.value})}
                  className="w-full border border-slate-200 p-3 text-sm outline-none rounded-sm resize-none" placeholder="Breve descrição da obra..." />
              </div>
              {msg && <p className={`text-sm font-medium ${msg.includes('Erro') ? 'text-red-500' : 'text-green-600'}`}>{msg}</p>}
              <div className="flex gap-3">
                <button type="submit" disabled={loading}
                  className="flex items-center gap-2 bg-navy text-white px-6 py-3 text-xs font-bold tracking-widest hover:bg-gold transition-colors rounded-sm disabled:opacity-60">
                  <Save size={14} /> {loading ? 'A guardar...' : editingBook ? 'Atualizar' : 'Adicionar'}
                </button>
                {editingBook && (
                  <button type="button" onClick={() => { setEditingBook(null); setBookForm(emptyBook); }}
                    className="flex items-center gap-2 border border-slate-200 text-slate-600 px-6 py-3 text-xs font-bold tracking-widest hover:bg-slate-50 transition-colors rounded-sm">
                    <X size={14} /> Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>

          <div>
            <h2 className="font-serif font-bold text-navy text-xl mb-6">Catálogo ({books.length} livros)</h2>
            {books.length === 0 ? <p className="text-slate-400 text-sm">Nenhum livro no catálogo.</p> : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {books.map(book => (
                  <motion.div key={book.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="bg-white shadow-sm rounded-sm overflow-hidden">
                    <img src={book.cover} alt={book.title} className="w-full aspect-[3/4] object-cover" referrerPolicy="no-referrer" />
                    <div className="p-3">
                      <p className="font-serif font-bold text-navy text-xs leading-snug truncate">{book.title}</p>
                      <p className="text-[10px] text-slate-400 italic truncate">{book.author}</p>
                      <div className="flex gap-1 mt-2">
                        <button onClick={() => handleEditBook(book)}
                          className="flex-1 flex items-center justify-center py-1 border border-slate-200 hover:border-gold hover:text-gold transition-colors rounded-sm">
                          <Pencil size={12} />
                        </button>
                        <button onClick={() => handleDeleteBook(book.id)}
                          className="flex-1 flex items-center justify-center py-1 border border-slate-200 hover:border-red-400 hover:text-red-400 transition-colors rounded-sm">
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </>)}
        {/* ── NEWSLETTER TAB ── */}
        {tab === 'newsletter' && (
          <div>
            <h2 className="font-serif font-bold text-navy text-xl mb-6">Subscritores ({subscribers.length})</h2>
            {subscribers.length === 0 ? (
              <p className="text-slate-400 text-sm">Nenhum subscritor ainda.</p>
            ) : (
              <div className="bg-white shadow-sm rounded-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="text-left p-4 text-[10px] font-bold tracking-widest text-slate-400 uppercase">Email</th>
                      <th className="text-left p-4 text-[10px] font-bold tracking-widest text-slate-400 uppercase">Data</th>
                      <th className="p-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((s, i) => (
                      <tr key={i} className="border-b border-slate-50 hover:bg-slate-50">
                        <td className="p-4 text-navy font-medium">{s.email}</td>
                        <td className="p-4 text-slate-400 text-xs">{new Date(s.date).toLocaleDateString('pt-PT')}</td>
                        <td className="p-4 text-right">
                          <button onClick={async () => {
                            if (!confirm('Remover subscritor?')) return;
                            await fetch(`${API}/api/newsletter/${encodeURIComponent(s.email)}`, { method: 'DELETE', headers });
                            fetchSubscribers();
                          }} className="text-red-400 hover:text-red-600 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── CONTENT TAB ── */}
        {tab === 'content' && (
          !content ? (
            <div className="bg-white shadow-sm rounded-sm p-8 text-center">
              <p className="text-slate-400 text-sm">A carregar conteúdo...</p>
              <button onClick={fetchContent} className="mt-4 text-xs font-bold text-navy hover:text-gold transition-colors">
                Tentar novamente
              </button>
            </div>
          ) : (
          <div className="space-y-8">
            {/* Hero */}
            <div className="bg-white shadow-sm rounded-sm p-8">
              <h2 className="font-serif font-bold text-navy text-xl mb-6 flex items-center gap-2">
                <Settings size={18} className="text-gold" /> Secção Principal (Hero)
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-1">Título</label>
                  <textarea rows={2} value={content.hero.titulo}
                    onChange={e => setContent({...content, hero: {...content.hero, titulo: e.target.value}})}
                    className="w-full border border-slate-200 p-3 text-sm outline-none rounded-sm resize-none" />
                </div>
                <div>
                  <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-1">Subtítulo</label>
                  <textarea rows={2} value={content.hero.subtitulo}
                    onChange={e => setContent({...content, hero: {...content.hero, subtitulo: e.target.value}})}
                    className="w-full border border-slate-200 p-3 text-sm outline-none rounded-sm resize-none" />
                </div>
              </div>
            </div>

            {/* Sobre */}
            <div className="bg-white shadow-sm rounded-sm p-8">
              <h2 className="font-serif font-bold text-navy text-xl mb-6">Secção Sobre Nós</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-1">Texto Principal</label>
                  <textarea rows={4} value={content.sobre.texto}
                    onChange={e => setContent({...content, sobre: {...content.sobre, texto: e.target.value}})}
                    className="w-full border border-slate-200 p-3 text-sm outline-none rounded-sm resize-none" />
                </div>
                <div>
                  <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-1">Missão</label>
                  <textarea rows={3} value={content.sobre.missao}
                    onChange={e => setContent({...content, sobre: {...content.sobre, missao: e.target.value}})}
                    className="w-full border border-slate-200 p-3 text-sm outline-none rounded-sm resize-none" />
                </div>
                <div>
                  <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-1">Visão</label>
                  <textarea rows={3} value={content.sobre.visao}
                    onChange={e => setContent({...content, sobre: {...content.sobre, visao: e.target.value}})}
                    className="w-full border border-slate-200 p-3 text-sm outline-none rounded-sm resize-none" />
                </div>
              </div>
            </div>

            {/* Contacto */}
            <div className="bg-white shadow-sm rounded-sm p-8">
              <h2 className="font-serif font-bold text-navy text-xl mb-6">Informações de Contacto</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { label: 'Morada', key: 'morada' },
                  { label: 'Telefone', key: 'telefone' },
                  { label: 'Email', key: 'email' },
                  { label: 'WhatsApp (só números)', key: 'whatsapp' },
                  { label: 'Facebook URL', key: 'facebook' },
                  { label: 'Instagram URL', key: 'instagram' },
                ].map(({ label, key }) => (
                  <div key={key}>
                    <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-1">{label}</label>
                    <input value={(content.contacto as Record<string, string>)[key]}
                      onChange={e => setContent({...content, contacto: {...content.contacto, [key]: e.target.value}})}
                      className="w-full border border-slate-200 p-3 text-sm outline-none rounded-sm" />
                  </div>
                ))}
              </div>
            </div>

            {contentMsg && <p className={`text-sm font-medium ${contentMsg.includes('Erro') ? 'text-red-500' : 'text-green-600'}`}>{contentMsg}</p>}
            <button onClick={async () => {
              const res = await fetch(`${API}/api/content`, { method: 'PUT', headers, body: JSON.stringify(content) });
              if (res.ok) { setContentMsg('Conteúdo guardado!'); setTimeout(() => setContentMsg(''), 3000); }
              else setContentMsg('Erro ao guardar.');
            }} className="flex items-center gap-2 bg-navy text-white px-8 py-3 text-xs font-bold tracking-widest hover:bg-gold transition-colors rounded-sm">
              <Save size={14} /> GUARDAR ALTERAÇÕES
            </button>
          </div>
          )
        )}

        {/* ── MANUSCRIPTS TAB ── */}
        {tab === 'manuscripts' && (
          <div>
            <h2 className="font-serif font-bold text-navy text-xl mb-6">Manuscritos Submetidos ({manuscripts.length})</h2>
            {manuscripts.length === 0 ? <p className="text-slate-400 text-sm">Nenhuma submissão ainda.</p> : (
              <div className="space-y-4">
                {manuscripts.map(m => (
                  <motion.div key={m.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="bg-white shadow-sm rounded-sm p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-serif font-bold text-navy">{m.nome}</h3>
                          <span className={`text-[10px] font-bold tracking-widest px-2 py-1 rounded-sm ${m.estado === 'pendente' ? 'bg-amber-100 text-amber-700' : m.estado === 'aprovado' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {m.estado.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mb-3">{m.email} · {m.telefone} · {m.genero} · {new Date(m.data).toLocaleDateString('pt-PT')}</p>
                        <p className="text-sm text-slate-600 mb-2"><span className="font-bold">Sinopse:</span> {m.sinopse}</p>
                        {m.observacoes && <p className="text-sm text-slate-500"><span className="font-bold">Obs:</span> {m.observacoes}</p>}
                      </div>
                      <div className="flex flex-col gap-2 shrink-0">
                        <select value={m.estado}
                          onChange={async e => {
                            await fetch(`${API}/api/manuscripts/${m.id}`, { method: 'PUT', headers, body: JSON.stringify({ estado: e.target.value }) });
                            fetchManuscripts();
                          }}
                          className="border border-slate-200 p-2 text-xs outline-none rounded-sm">
                          <option value="pendente">Pendente</option>
                          <option value="em analise">Em Análise</option>
                          <option value="aprovado">Aprovado</option>
                          <option value="rejeitado">Rejeitado</option>
                        </select>
                        <button onClick={async () => {
                          if (!confirm('Apagar esta submissão?')) return;
                          await fetch(`${API}/api/manuscripts/${m.id}`, { method: 'DELETE', headers });
                          fetchManuscripts();
                        }} className="flex items-center justify-center gap-1 border border-slate-200 hover:border-red-400 hover:text-red-400 p-2 text-xs transition-colors rounded-sm">
                          <Trash2 size={12} /> Apagar
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── CONTACTS TAB ── */}
        {tab === 'contacts' && (
          <div>
            <h2 className="font-serif font-bold text-navy text-xl mb-6">
              Mensagens ({contacts.length}) {contacts.filter(c => !c.lida).length > 0 && <span className="text-sm text-amber-600 font-normal">· {contacts.filter(c => !c.lida).length} não lidas</span>}
            </h2>
            {contacts.length === 0 ? <p className="text-slate-400 text-sm">Nenhuma mensagem ainda.</p> : (
              <div className="space-y-4">
                {contacts.map(c => (
                  <motion.div key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className={`bg-white shadow-sm rounded-sm p-6 border-l-4 ${c.lida ? 'border-slate-200' : 'border-gold'}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-serif font-bold text-navy">{c.nome}</h3>
                          {!c.lida && <span className="text-[10px] font-bold tracking-widest bg-gold/20 text-gold px-2 py-0.5 rounded-sm">NOVA</span>}
                        </div>
                        <p className="text-xs text-slate-400 mb-3">{c.email} · {c.servico} · {new Date(c.data).toLocaleDateString('pt-PT')}</p>
                        <p className="text-sm text-slate-600">{c.mensagem}</p>
                      </div>
                      <div className="flex flex-col gap-2 shrink-0">
                        {!c.lida && (
                          <button onClick={async () => {
                            await fetch(`${API}/api/contacts/${c.id}`, { method: 'PUT', headers, body: JSON.stringify({ lida: true }) });
                            fetchContacts();
                          }} className="border border-slate-200 hover:border-gold hover:text-gold p-2 text-xs transition-colors rounded-sm whitespace-nowrap">
                            Marcar lida
                          </button>
                        )}
                        <a href={`mailto:${c.email}`} className="flex items-center justify-center gap-1 bg-navy text-white p-2 text-xs hover:bg-gold transition-colors rounded-sm">
                          <Mail size={12} /> Responder
                        </a>
                        <button onClick={async () => {
                          if (!confirm('Apagar esta mensagem?')) return;
                          await fetch(`${API}/api/contacts/${c.id}`, { method: 'DELETE', headers });
                          fetchContacts();
                        }} className="flex items-center justify-center gap-1 border border-slate-200 hover:border-red-400 hover:text-red-400 p-2 text-xs transition-colors rounded-sm">
                          <Trash2 size={12} /> Apagar
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminPanel;
