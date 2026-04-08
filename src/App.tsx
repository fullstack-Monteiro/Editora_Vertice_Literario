import React from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  CheckCircle, 
  Layout, 
  Palette, 
  Users, 
  Megaphone, 
  Tablet, 
  GraduationCap,
  ArrowRight,
  Send,
  MessageCircle,
  Facebook,
  Instagram,
  Share2
} from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ShareButton from './components/ShareButton';
import BlogModal from './components/BlogModal';
import BookModal from './components/BookModal';
import AdminPanel from './components/AdminPanel';
import HistoryModal from './components/HistoryModal';
import PhilosophyModal from './components/PhilosophyModal';
import ManuscriptModal from './components/ManuscriptModal';
import Newsletter from './components/Newsletter';
import { SERVICES, VALUES, BLOG_POSTS, FEATURED_BOOKS } from './constants';

const API_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:3001';

const App = () => {
  const [showAllBooks, setShowAllBooks] = React.useState(false);
  const [selectedPost, setSelectedPost] = React.useState<typeof BLOG_POSTS[0] | null>(null);
  const [showAdmin, setShowAdmin] = React.useState(false);
  const [apiPosts, setApiPosts] = React.useState<typeof BLOG_POSTS>([]);
  const [apiBooks, setApiBooks] = React.useState<typeof FEATURED_BOOKS>([]);
  const [selectedBook, setSelectedBook] = React.useState<typeof FEATURED_BOOKS[0] | null>(null);
  const [siteContent, setSiteContent] = React.useState<{
    hero: { titulo: string; subtitulo: string };
    sobre: { texto: string; missao: string; visao: string };
    contacto: { morada: string; telefone: string; email: string; facebook: string; instagram: string; whatsapp: string };
  } | null>(null);
  const [showAllPosts, setShowAllPosts] = React.useState(false);
  const [showFullHistory, setShowFullHistory] = React.useState(false);
  const [showHistoryModal, setShowHistoryModal] = React.useState(false);
  const [selectedPhilosophy, setSelectedPhilosophy] = React.useState<{title:string;desc:string}|null>(null);
  const [showManuscript, setShowManuscript] = React.useState(false);

  React.useEffect(() => {
    const fetchPosts = () => {
      fetch(`${API_URL}/api/posts`)
        .then(r => r.json())
        .then(data => { if (Array.isArray(data)) setApiPosts(data); })
        .catch(() => {});
    };
    const fetchBooks = () => {
      fetch(`${API_URL}/api/books`)
        .then(r => r.json())
        .then(data => { if (Array.isArray(data)) setApiBooks(data); })
        .catch(() => {});
    };
    const fetchSiteContent = () => {
      fetch(`${API_URL}/api/content`)
        .then(r => r.json())
        .then(data => { if (data) setSiteContent(data); })
        .catch(() => {});
    };
    fetchPosts();
    fetchBooks();
    fetchSiteContent();
    const interval = setInterval(() => { fetchPosts(); fetchBooks(); fetchSiteContent(); }, 30000);
    return () => clearInterval(interval);
  }, []);

  const allPosts = [...apiPosts, ...BLOG_POSTS];
  const visiblePosts = showAllPosts ? allPosts : allPosts.slice(0, 3);
  const [formData, setFormData] = React.useState({ nome: '', email: '', servico: 'Edição e Publicação', mensagem: '' });
  const [formStatus, setFormStatus] = React.useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormStatus('success');
        setFormData({ nome: '', email: '', servico: 'Edição e Publicação', mensagem: '' });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  const iconMap: Record<string, React.ReactNode> = {
    BookOpen: <BookOpen />,
    CheckCircle: <CheckCircle />,
    Layout: <Layout />,
    Palette: <Palette />,
    Users: <Users />,
    Megaphone: <Megaphone />,
    Tablet: <Tablet />,
    GraduationCap: <GraduationCap />,
  };

  if (showAdmin) return <AdminPanel onClose={() => setShowAdmin(false)} />;

  return (
    <div className="min-h-screen">
      <PhilosophyModal item={selectedPhilosophy} onClose={() => setSelectedPhilosophy(null)} />
      <HistoryModal open={showHistoryModal} onClose={() => setShowHistoryModal(false)} />
      <ManuscriptModal open={showManuscript} onClose={() => setShowManuscript(false)} />
      <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
      <Navbar />
      <WhatsAppButton />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-navy">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=2000" 
            alt="Library background" 
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-12 w-full py-32 md:py-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
              {siteContent?.hero?.titulo ? siteContent.hero.titulo.replace('florescer.', '') : 'A palavra é a semente, a nossa missão é fazê-la '}<span className="text-primary-blue">florescer.</span>
            </h1>
            <p className="text-base sm:text-xl text-slate-300 mb-8 leading-relaxed font-light">
              {siteContent?.hero?.subtitulo ?? 'Apoiamos autores e transformamos palavras em obras publicadas com excelência, ética e sofisticação cultural.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.a
                href="#contacto"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gold text-navy px-6 py-4 font-bold tracking-widest text-xs rounded-sm flex items-center justify-center gap-2 hover:bg-white transition-all duration-300"
              >
                PUBLICAR O MEU LIVRO <ArrowRight size={16} />
              </motion.a>
              <motion.a
                href="https://wa.me/258834698880"
                target="_blank"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 py-4 font-bold tracking-widest text-xs rounded-sm flex items-center justify-center gap-2 hover:bg-white/20 transition-all duration-300"
              >
                FALAR NO WHATSAPP <MessageCircle size={16} />
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <div className="w-[1px] h-20 bg-gradient-to-b from-gold to-transparent mx-auto"></div>
          <span className="text-[10px] text-gold tracking-[0.5em] mt-4 block uppercase font-bold">Scroll</span>
        </motion.div>
      </section>

      {/* Featured Books Section */}
      <section className="bg-white py-16 md:py-24 px-5 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="text-gold font-bold tracking-widest text-xs mb-4 block">CATÁLOGO SELECIONADO</span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-navy leading-tight">Obras que Definem a Nossa Identidade Cultural</h2>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {(showAllBooks ? (apiBooks.length ? apiBooks : FEATURED_BOOKS) : (apiBooks.length ? apiBooks : FEATURED_BOOKS).slice(0, 4)).map((book, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: (index % 4) * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => setSelectedBook(book)}
              >
                <div className="relative overflow-hidden mb-4 aspect-[3/4] shadow-xl">
                  <img 
                    src={book.cover} 
                    alt={book.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-navy/20 group-hover:bg-navy/0 transition-colors duration-500"></div>
                </div>
                <h3 className="font-serif font-bold text-base text-navy mb-1 leading-snug">{book.title}</h3>
                <p className="text-slate-500 text-xs italic">{book.author}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAllBooks(!showAllBooks)}
              className="inline-flex items-center gap-2 bg-navy text-white px-8 py-4 text-xs font-bold tracking-widest hover:bg-gold transition-all duration-300 rounded-sm"
            >
              {showAllBooks ? 'VER MENOS' : `VER TODAS AS ${(apiBooks.length ? apiBooks : FEATURED_BOOKS).length} OBRAS`}
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="bg-slate-50 py-16 md:py-24 px-5 md:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=1000" 
                alt="Office" 
                className="rounded-sm shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-gold/10 -z-0 hidden md:block"></div>
            <div className="absolute -top-10 -left-10 p-8 bg-navy text-white z-20 hidden md:block">
              <span className="text-4xl font-serif font-bold block mb-2">185809</span>
              <span className="text-[10px] tracking-widest uppercase font-bold text-gold">Registo Oficial</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gold font-bold tracking-widest text-xs mb-4 block">HISTÓRICO INSTITUCIONAL</span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-navy mb-6 leading-tight">Uma Instituição Moçambicana Dedicada à Excelência Literária</h2>
            <div className="space-y-5 text-slate-600 leading-relaxed">
              <p>
                {siteContent?.sobre?.texto ?? 'A Editora Vértice Literário, Lda. é uma instituição moçambicana dedicada à promoção e ao desenvolvimento da literatura no país e no espaço lusófono.'}
              </p>              <button
                onClick={() => setShowHistoryModal(true)}
                className="text-[#4A90D9] font-bold text-xs tracking-widest hover:text-gold transition-colors flex items-center gap-1"
              >
                VER MAIS ↓
              </button>
            </div>

            <div className="grid grid-cols-2 gap-8 mt-12">
              <div>
                <h4 className="font-serif font-bold text-navy mb-3 text-lg border-l-4 border-gold pl-4">Missão</h4>
                <p className="text-sm text-slate-500">{siteContent?.sobre?.missao ?? 'Apoiar autores emergentes e consolidados, publicar obras de impacto literário, social e cultural.'}</p>
              </div>
              <div>
                <h4 className="font-serif font-bold text-navy mb-3 text-lg border-l-4 border-gold pl-4">Visão</h4>
                <p className="text-sm text-slate-500">{siteContent?.sobre?.visao ?? 'Ser uma das editoras de referência em Moçambique e no espaço lusófono.'}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values Sub-section */}
        <div className="max-w-7xl mx-auto mt-16 md:mt-32">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-serif font-bold text-navy mb-4">Nossos Valores Fundamentais</h3>
            <div className="w-20 h-1 bg-gold mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {VALUES.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 text-center shadow-sm hover:shadow-xl transition-all duration-500 group"
              >
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gold transition-colors duration-500">
                  <value.icon className="text-navy group-hover:text-white transition-colors duration-500" size={24} />
                </div>
                <h4 className="font-serif font-bold text-navy mb-3">{value.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-navy py-16 md:py-24 px-5 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-gold font-bold tracking-widest text-xs mb-4 block">IDENTIDADE EDITORIAL</span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-6">Filosofia Editorial</h2>
            <p className="text-slate-400 max-w-3xl mx-auto leading-relaxed">
              A Editora Vértice Literário orienta-se por uma filosofia que privilegia a cooperação, a inclusão e a promoção equitativa das expressões literárias moçambicanas e lusófonas. A nossa actuação editorial pauta-se pela convicção de que a literatura constitui um património colectivo e que o ambiente cultural se robustece quando as instituições trabalham em convergência, e não em oposição. Não integramos o mercado editorial com o propósito de competir, rivalizar ou disputar protagonismos. A nossa presença assenta na defesa de um ecossistema literário plural, democrático e aberto, onde diversas editoras, autores, iniciativas e sensibilidades possam coexistir e florescer em benefício da cultura nacional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Princípio da Cooperação Interinstitucional", desc: "A Editora Vértice Literário reconhece que o desenvolvimento da literatura moçambicana depende de relações institucionais baseadas na colaboração e no respeito mútuo. Assim, assumimos o compromisso de estabelecer práticas que estimulem parcerias, diálogos intereditoriais, intercâmbios culturais e acções conjuntas com actores públicos e privados do sector." },
              { title: "Princípio da Democratização do Acesso Editorial", desc: "A nossa filosofia estabelece a democratização da publicação como pilar essencial. Defendemos que todos os autores, independentemente da sua posição social, experiência ou notoriedade, devem ter acesso a processos editoriais transparentes, dignos e profissionalizados. Trabalhamos no sentido de garantir oportunidades a escritores emergentes, jovens criadores e vozes oriundas de contextos frequentemente marginalizados." },
              { title: "Princípio da Valorização da Diversidade Literária", desc: "A Editora Vértice Literário considera a multiplicidade de estilos, temas, perspectivas e trajectórias autorais como um bem cultural de elevado valor. Comprometemo-nos a acolher produções literárias que reflitam a diversidade sociocultural do país, contribuindo para o enriquecimento do panorama literário e para a preservação da memória colectiva." },
              { title: "Princípio da Ética Editorial", desc: "Toda a nossa actuação é regida por elevados padrões éticos, que incluem a integridade nos procedimentos, a transparência nas decisões, o respeito absoluto pelos direitos de autor, a honestidade no relacionamento com escritores e parceiros, e a recusa de práticas que fomentem rivalidades ou disputas inadequadas no sector editorial." },
              { title: "Princípio da Promoção Cultural", desc: "A Editora Vértice Literário compromete-se a contribuir para o desenvolvimento cultural de Moçambique através da edição, divulgação e valorização de obras literárias que reforcem o pensamento crítico, promovam o diálogo social e enriqueçam o imaginário colectivo. Este compromisso estende-se às actividades formativas que potenciem o surgimento de novos talentos e fortaleçam a educação literária." },
              { title: "Declaração Final", desc: "A presença da Editora Vértice Literário no cenário editorial moçambicano fundamenta-se numa visão não competitiva, orientada pela cooperação, pela democracia e pela responsabilidade cultural. Procuramos actuar como uma instituição que soma, que edifica e que contribui para a consolidação de um ambiente literário saudável, diversificado e humanamente comprometido com o futuro da palavra escrita." },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                className="border border-white/10 p-8 hover:border-gold/50 transition-all duration-300 flex flex-col"
              >
                <div className="w-8 h-1 bg-gold mb-6"></div>
                <h4 className="font-serif font-bold text-white text-base mb-3">{item.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed flex-1">
                  {item.desc.substring(0, 100)}...
                </p>
                <button
                  onClick={() => setSelectedPhilosophy(item)}
                  className="mt-4 text-[#4A90D9] text-xs font-bold tracking-widest hover:text-gold transition-colors text-left"
                >
                  LER MAIS →
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-slate-50 py-16 md:py-24 px-5 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-gold font-bold tracking-widest text-xs mb-4 block">ESTRUTURA INTERNA</span>
            <h2 className="text-4xl font-serif font-bold text-navy mb-4">Estrutura Interna da Editora</h2>
            <div className="w-20 h-1 bg-gold mx-auto mb-4"></div>
            <p className="text-slate-500 text-sm max-w-xl mx-auto">A estrutura organizacional assegura qualidade, coordenação e eficiência nas operações.</p>
          </div>

          {/* Direcção + Admin */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-12">
            {[
              { name: "Bonifácio B. Fabião", role: "Diretor Executivo", desc: "Responsável pela orientação estratégica, representação institucional e supervisão global das actividades editoriais, administrativas e culturais." },
              { name: "Egas M. Mepuanda", role: "Administrador", desc: "Executam tarefas de gestão interna, documentação, comunicação e articulação com autores, estagiários e parceiros culturais." },
            ].map((member, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.15 }} viewport={{ once: true }}
                className="bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-300 border-t-4 border-gold">
                <h4 className="font-serif font-bold text-navy text-xl mb-1">{member.name}</h4>
                <span className="text-gold text-xs font-bold tracking-widest uppercase block mb-4">{member.role}</span>
                <p className="text-slate-500 text-sm leading-relaxed">{member.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Departamentos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="bg-white p-8 shadow-sm border border-slate-100">
              <h4 className="font-serif font-bold text-navy text-lg mb-1">Departamento Editorial</h4>
              <p className="text-xs text-gold font-bold tracking-widest uppercase mb-4">Chingodzi – Paragem Juventude</p>
              <p className="text-slate-500 text-sm mb-4">Núcleo técnico da editora. As funções incluem:</p>
              <ul className="space-y-1">
                {["Acompanhamento a autores", "Revisão e edição", "Preparação estrutural de obras", "Apoio presencial e remoto", "Gestão de projectos editoriais"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full shrink-0"></span>{item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }}
              className="bg-white p-8 shadow-sm border border-slate-100">
              <h4 className="font-serif font-bold text-navy text-lg mb-1">Departamento de Design</h4>
              <p className="text-xs text-gold font-bold tracking-widest uppercase mb-4">Identidade Visual</p>
              <p className="text-slate-500 text-sm mb-4">Responsável pela componente visual das obras e identidade institucional, incluindo:</p>
              <ul className="space-y-1">
                {["Criação de capas", "Diagramação profissional", "Produção de materiais gráficos", "Construção da identidade visual da editora"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full shrink-0"></span>{item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Colaboradores */}
          <div className="max-w-4xl mx-auto">
            <h3 className="font-serif font-bold text-navy text-xl mb-6 text-center">Colaboradores</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {["Sheila Khan", "Solene Santos Almoço", "Samila Simões Manuel António", "Augusto Mambasse"].map((name, index) => (
                <div key={index} className="bg-white p-6 text-center shadow-sm border border-slate-100">
                  <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="text-gold" size={18} />
                  </div>
                  <p className="font-serif font-bold text-navy text-sm">{name}</p>
                </div>
              ))}
            </div>
            <div className="bg-white p-8 shadow-sm border border-slate-100">
              <p className="text-xs font-bold tracking-widest text-gold uppercase mb-4">Áreas de Contribuição</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {["Apoio na revisão e preparação textual", "Organização técnica de conteúdos", "Assistência administrativa", "Recolha e pesquisa de informação", "Colaboração em processos editoriais", "Maquetização e diagramação"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full shrink-0"></span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
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
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 hover:bg-white hover:border-white transition-all duration-500 group"
              >
                <div className="text-gold mb-6 group-hover:text-navy transition-colors duration-500">
                  {iconMap[service.icon] || <BookOpen />}
                </div>
                <h4 className="text-white font-serif font-bold text-lg mb-4 group-hover:text-navy transition-colors duration-500">{service.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-600 transition-colors duration-500">{service.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <motion.a
              href="#contacto"
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-3 bg-gold text-navy px-10 py-5 font-bold tracking-widest text-sm rounded-sm hover:bg-white transition-all duration-300 shadow-2xl"
            >
              SOLICITAR SERVIÇO <ArrowRight size={18} />
            </motion.a>
            <motion.button
              onClick={() => setShowManuscript(true)}
              whileHover={{ scale: 1.05 }}
              className="ml-4 inline-flex items-center gap-3 bg-white/10 border border-white/30 text-white px-10 py-5 font-bold tracking-widest text-sm rounded-sm hover:bg-white/20 transition-all duration-300 shadow-2xl"
            >
              SUBMETER MANUSCRITO <ArrowRight size={18} />
            </motion.button>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="bg-white py-16 md:py-24 px-5 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-4">
            <div className="max-w-2xl">
              <span className="text-gold font-bold tracking-widest text-xs mb-4 block">CONHECIMENTO & CULTURA</span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-navy leading-tight">Blog Vértice Literário</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {visiblePosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col group"
              >
                <div className="relative overflow-hidden aspect-video mb-6 shadow-lg">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-navy text-white text-[10px] font-bold tracking-widest px-3 py-1 uppercase">
                    {post.date}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-gold tracking-widest mb-3 uppercase">
                  <Users size={12} /> {post.author}
                </div>
                <h3 className="text-xl font-serif font-bold text-navy mb-4 group-hover:text-gold transition-colors duration-300 leading-snug">
                  {post.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                  {post.excerpt}
                </p>
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

          {allPosts.length > 3 && (
            <div className="mt-12 text-center">
              <button
                onClick={() => setShowAllPosts(!showAllPosts)}
                className="inline-flex items-center gap-2 bg-navy text-white px-8 py-4 text-xs font-bold tracking-widest hover:bg-gold transition-all duration-300 rounded-sm"
              >
                {showAllPosts ? 'VER MENOS' : `VER TODOS (${allPosts.length})`}
              </button>
            </div>
          )}

          <div className="mt-16">
            <Newsletter />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="bg-slate-50 py-16 md:py-24 px-5 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-gold font-bold tracking-widest text-xs mb-4 block">CONTACTO</span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-navy mb-6 leading-tight">Vamos Dar Vida à Sua Obra Literária</h2>
              <p className="text-slate-600 mb-12 leading-relaxed">
                Estamos prontos para ouvir a sua história e transformá-la num livro de excelência. Entre em contacto connosco para orçamentos ou consultoria.
              </p>

              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-white shadow-md flex items-center justify-center shrink-0">
                    <Send className="text-gold" size={24} />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-navy text-lg mb-1">E-mail</h4>
                    <p className="text-slate-500">editoraverticeliterario@gmail.com</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-white shadow-md flex items-center justify-center shrink-0">
                    <MessageCircle className="text-gold" size={24} />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-navy text-lg mb-1">WhatsApp / Telefone</h4>
                    <p className="text-slate-500">(+258) 83 46 98 880</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-white shadow-md flex items-center justify-center shrink-0">
                    <BookOpen className="text-gold" size={24} />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-navy text-lg mb-1">Localização</h4>
                    <p className="text-slate-500">Cidade de Tete, Paragem Juventude, junto ao Mercado Cambinde. Estrada Nacional nº 7, Moçambique.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-6 sm:p-10 md:p-16 shadow-2xl rounded-sm"
            >
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Nome Completo</label>
                    <input type="text" required value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} className="w-full bg-slate-50 border-b border-slate-200 p-4 focus:border-gold outline-none transition-colors" placeholder="Ex: João Silva" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">E-mail</label>
                    <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-50 border-b border-slate-200 p-4 focus:border-gold outline-none transition-colors" placeholder="exemplo@email.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Serviço de Interesse</label>
                  <select value={formData.servico} onChange={e => setFormData({...formData, servico: e.target.value})} className="w-full bg-slate-50 border-b border-slate-200 p-4 focus:border-gold outline-none transition-colors appearance-none">
                    <option>Edição e Publicação</option>
                    <option>Revisão Textual</option>
                    <option>Design de Capa</option>
                    <option>Outros</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Mensagem</label>
                  <textarea rows={4} required value={formData.mensagem} onChange={e => setFormData({...formData, mensagem: e.target.value})} className="w-full bg-slate-50 border-b border-slate-200 p-4 focus:border-gold outline-none transition-colors resize-none" placeholder="Conte-nos sobre o seu projeto..."></textarea>
                </div>
                <button type="submit" disabled={formStatus === 'sending'} className="w-full bg-navy text-white py-5 font-bold tracking-widest text-xs hover:bg-gold transition-all duration-300 shadow-lg uppercase disabled:opacity-60">
                  {formStatus === 'sending' ? 'A ENVIAR...' : 'Enviar Mensagem'}
                </button>
                {formStatus === 'success' && (
                  <p className="text-center text-sm text-green-600 font-medium">Mensagem enviada com sucesso!</p>
                )}
                {formStatus === 'error' && (
                  <p className="text-center text-sm text-red-500 font-medium">Erro ao enviar. Tente novamente.</p>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer onAdmin={() => setShowAdmin(true)} contacto={siteContent?.contacto} />
    </div>
  );
};

export default App;
