import React from 'react';
import { motion } from 'motion/react';
import {
  BookOpen, CheckCircle, Layout, Palette, Users, Megaphone, Tablet, GraduationCap,
  ArrowRight, Send, MessageCircle, Facebook, Instagram
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ShareButton from './components/ShareButton';
import BlogModal from './components/BlogModal';
import BookModal from './components/BookModal';
import ManuscriptModal from './components/ManuscriptModal';
import Newsletter from './components/Newsletter';
import { SERVICES, FEATURED_BOOKS } from './constants';

const API_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:3001';

const App = () => {
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = React.useState<{id:number;title:string;author:string;date:string;image:string;excerpt:string;content:string} | null>(null);
  const [apiPosts, setApiPosts] = React.useState<typeof selectedPost[]>([]);
  const [selectedBook, setSelectedBook] = React.useState<typeof FEATURED_BOOKS[0] | null>(null);
  const [siteContent, setSiteContent] = React.useState<{
    hero: { titulo: string; subtitulo: string };
    sobre: { texto: string; missao: string; visao: string };
    contacto: { morada: string; telefone: string; email: string; facebook: string; instagram: string; whatsapp: string };
  } | null>(null);
  const [showManuscript, setShowManuscript] = React.useState(false);
  const [formData, setFormData] = React.useState({ nome: '', email: '', servico: 'Edição e Publicação', mensagem: '' });
  const [formStatus, setFormStatus] = React.useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  React.useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      setTimeout(() => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }, 100);
    }
  }, []);

  React.useEffect(() => {
    const fetchPosts = () => {
      fetch('/data/posts.json').then(r => r.json()).then(data => {
        if (Array.isArray(data)) setApiPosts(data);
      }).catch(() => {});
    };
    const fetchSiteContent = () => {
      fetch('/data/site-content.json').then(r => r.json()).then(data => {
        if (data && data.hero && data.sobre && data.contacto) setSiteContent(data);
      }).catch(() => {});
    };
    fetchPosts();
    fetchSiteContent();
    const interval = setInterval(() => { fetchPosts(); fetchSiteContent(); }, 30000);
    return () => clearInterval(interval);
  }, []);

  const previewPosts = apiPosts.slice(0, 2);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      // Since we're frontend-only, just show success message
      // In production, you'd use a serverless function or third-party email service
      setFormStatus('success');
      setFormData({ nome: '', email: '', servico: 'Edição e Publicação', mensagem: '' });
      setTimeout(() => setFormStatus('idle'), 3000);
    } catch { setFormStatus('error'); }
  };

  const iconMap: Record<string, React.ReactNode> = {
    BookOpen: <BookOpen />, CheckCircle: <CheckCircle />, Layout: <Layout />,
    Palette: <Palette />, Users: <Users />, Megaphone: <Megaphone />,
    Tablet: <Tablet />, GraduationCap: <GraduationCap />,
  };

  return (
    <div className="min-h-screen">
      <ManuscriptModal open={showManuscript} onClose={() => setShowManuscript(false)} />
      <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
      <Navbar />
      <WhatsAppButton />

      {/* Hero */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-navy">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=2000"
            alt="Biblioteca com livros - Editora Vértice Literário" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/50 to-navy/10"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-12 w-full py-20 md:py-0">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
              {siteContent?.hero?.titulo ? siteContent.hero.titulo.replace('florescer.', '') : 'A palavra é a semente, a nossa missão é fazê-la '}
              <span className="text-primary-blue">florescer.</span>
            </h1>
            <p className="text-base sm:text-xl text-slate-300 mb-8 leading-relaxed font-light">
              {siteContent?.hero?.subtitulo ?? 'Apoiamos autores e transformamos palavras em obras publicadas com excelência, ética e sofisticação cultural.'}
            </p>
            <div className="flex justify-center sm:justify-start">
              <motion.a href="#contacto" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="inline-flex bg-gold text-navy px-6 py-4 font-bold tracking-widest text-xs rounded-sm items-center gap-2 hover:bg-white transition-all duration-300">
                PUBLICAR O MEU LIVRO <ArrowRight size={16} />
              </motion.a>
            </div>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block">
          <div className="w-[1px] h-20 bg-gradient-to-b from-gold to-transparent mx-auto"></div>
          <span className="text-[10px] text-gold tracking-[0.5em] mt-4 block uppercase font-bold">Scroll</span>
        </motion.div>
      </section>

      {/* Catálogo */}
      <section id="catalogo" className="bg-white py-16 md:py-24 px-5 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="text-gold font-bold tracking-widest text-xs mb-4 block">CATÁLOGO</span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-navy leading-tight">Obras Publicadas e Disponíveis para Aquisição</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {FEATURED_BOOKS.slice(0, 4).map((book, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: (index % 4) * 0.1 }} viewport={{ once: true }}
                className="group cursor-pointer" onClick={() => setSelectedBook(book)}>
                <div className="relative overflow-hidden mb-4 aspect-[3/4] shadow-xl">
                  <img src={book.cover} alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-navy/20 group-hover:bg-navy/0 transition-colors duration-500"></div>
                </div>
                <h3 className="font-serif font-bold text-base text-navy mb-1 leading-snug">{book.title}</h3>
                <p className="text-slate-500 text-xs italic">{book.author}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <button onClick={() => navigate('/catalogo')}
              className="inline-flex items-center gap-2 bg-navy text-white px-8 py-4 text-xs font-bold tracking-widest hover:bg-gold transition-all duration-300 rounded-sm">
              VER TODAS AS OBRAS <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="bg-navy py-16 md:py-24 px-5 md:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 -skew-x-12 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <span className="text-gold font-bold tracking-widest text-xs mb-4 block">SOLUÇÕES EDITORIAIS</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-6">Áreas de Actuação e Serviços</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Oferecemos um ecossistema completo para que a sua obra alcance o patamar de excelência que o mercado literário exige.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, index) => (
              <motion.div key={index} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }} viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 hover:bg-white hover:border-white transition-all duration-500 group">
                <div className="text-gold mb-6 group-hover:text-navy transition-colors duration-500">{iconMap[service.icon] || <BookOpen />}</div>
                <h4 className="text-white font-serif font-bold text-lg mb-4 group-hover:text-navy transition-colors duration-500">{service.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-600 transition-colors duration-500">{service.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a href="#contacto" whileHover={{ scale: 1.05 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gold text-navy px-10 py-5 font-bold tracking-widest text-sm rounded-sm hover:bg-white transition-all duration-300 shadow-2xl">
              SOLICITAR SERVIÇO <ArrowRight size={18} />
            </motion.a>
            <motion.button onClick={() => setShowManuscript(true)} whileHover={{ scale: 1.05 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white/10 border border-white/30 text-white px-10 py-5 font-bold tracking-widest text-sm rounded-sm hover:bg-white/20 transition-all duration-300 shadow-2xl">
              SUBMETER MANUSCRITO <ArrowRight size={18} />
            </motion.button>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="bg-white py-16 md:py-24 px-5 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-4">
            <div className="max-w-2xl">
              <span className="text-gold font-bold tracking-widest text-xs mb-4 block">CONHECIMENTO & CULTURA</span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-navy leading-tight">Blog Vértice Literário</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {previewPosts.length === 0 ? (
              <div className="col-span-3 text-center py-10">
                <p className="text-slate-400 text-base">Sem publicações de momento.</p>
                <p className="text-slate-400 text-sm mt-1">Volte em breve para novos artigos.</p>
              </div>
            ) : previewPosts.map((post, index) => (
              <motion.article key={post.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }} viewport={{ once: true }} className="flex flex-col group">
                <div className="relative overflow-hidden aspect-video mb-6 shadow-lg">
                  <img src={post.image} alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                  <div className="absolute top-4 left-4 bg-navy text-white text-[10px] font-bold tracking-widest px-3 py-1 uppercase">{post.date}</div>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-gold tracking-widest mb-3 uppercase">
                  <Users size={12} /> {post.author}
                </div>
                <h3 className="text-xl font-serif font-bold text-navy mb-4 group-hover:text-gold transition-colors duration-300 leading-snug">{post.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">{post.excerpt}</p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <button onClick={() => setSelectedPost(post)} className="text-xs font-bold tracking-widest text-navy hover:text-gold transition-colors flex items-center gap-2 uppercase">
                    Ler Mais <ArrowRight size={14} />
                  </button>
                  <div className="flex gap-3 text-slate-400">
                    <a href="https://www.facebook.com/profile.php?id=61569927223809" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors"><Facebook size={16} /></a>
                    <a href="https://www.instagram.com/edit.oraverticeliterario/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors"><Instagram size={16} /></a>
                    <ShareButton url={`${window.location.origin}/#blog`} title={post.title} />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          <div className="mt-12 text-center">
            <button onClick={() => navigate('/blog')}
              className="inline-flex items-center gap-2 bg-navy text-white px-8 py-4 text-xs font-bold tracking-widest hover:bg-gold transition-all duration-300 rounded-sm">
              VER TODOS OS ARTIGOS <ArrowRight size={14} />
            </button>
          </div>
          <div className="mt-16"><Newsletter /></div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="bg-slate-50 py-16 md:py-24 px-5 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-gold font-bold tracking-widest text-xs mb-4 block">CONTACTO</span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-navy mb-6 leading-tight">Vamos Dar Vida à Sua Obra Literária</h2>
              <p className="text-slate-600 mb-12 leading-relaxed">Estamos prontos para ouvir a sua história e transformá-la num livro de excelência.</p>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-white shadow-md flex items-center justify-center shrink-0"><Send className="text-gold" size={24} /></div>
                  <div><h4 className="font-serif font-bold text-navy text-lg mb-1">E-mail</h4><p className="text-slate-500">editoraverticeliterario@gmail.com</p></div>
                </div>
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-white shadow-md flex items-center justify-center shrink-0"><MessageCircle className="text-gold" size={24} /></div>
                  <div><h4 className="font-serif font-bold text-navy text-lg mb-1">WhatsApp / Telefone</h4><p className="text-slate-500">(+258) 83 46 98 880</p></div>
                </div>
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-white shadow-md flex items-center justify-center shrink-0"><BookOpen className="text-gold" size={24} /></div>
                  <div><h4 className="font-serif font-bold text-navy text-lg mb-1">Localização</h4><p className="text-slate-500">Cidade de Tete, Paragem Juventude, junto ao Mercado Cambinde. Estrada Nacional nº 7, Moçambique.</p></div>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-white p-5 sm:p-8 md:p-12 shadow-2xl rounded-sm">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Nome Completo</label>
                    <input type="text" required value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})}
                      className="w-full bg-slate-50 border-b border-slate-200 p-4 focus:border-gold outline-none transition-colors" placeholder="Ex: João Silva" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">E-mail</label>
                    <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-slate-50 border-b border-slate-200 p-4 focus:border-gold outline-none transition-colors" placeholder="exemplo@email.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Serviço de Interesse</label>
                  <select value={formData.servico} onChange={e => setFormData({...formData, servico: e.target.value})}
                    className="w-full bg-slate-50 border-b border-slate-200 p-4 focus:border-gold outline-none transition-colors appearance-none">
                    <option>Edição e Publicação</option>
                    <option>Revisão Textual</option>
                    <option>Design de Capa</option>
                    <option>Outros</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Mensagem</label>
                  <textarea rows={4} required value={formData.mensagem} onChange={e => setFormData({...formData, mensagem: e.target.value})}
                    className="w-full bg-slate-50 border-b border-slate-200 p-4 focus:border-gold outline-none transition-colors resize-none" placeholder="Conte-nos sobre o seu projeto..."></textarea>
                </div>
                <button type="submit" disabled={formStatus === 'sending'}
                  className="w-full bg-navy text-white py-5 font-bold tracking-widest text-xs hover:bg-gold transition-all duration-300 shadow-lg uppercase disabled:opacity-60">
                  {formStatus === 'sending' ? 'A ENVIAR...' : 'Enviar Mensagem'}
                </button>
                {formStatus === 'success' && <p className="text-center text-sm text-green-600 font-medium">Mensagem enviada com sucesso!</p>}
                {formStatus === 'error' && <p className="text-center text-sm text-red-500 font-medium">Erro ao enviar. Tente novamente.</p>}
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer contacto={siteContent?.contacto} />
    </div>
  );
};

export default App;
