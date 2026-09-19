import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Users, Calendar } from 'lucide-react';
import Navbar from '../components/Navbar';
import SEOHead from '../components/SEOHead';
import ShareButton from '../components/ShareButton';
import { generateArticleSchema } from '../utils/seoSchema';
import { slugify } from '../utils/slugify';
import postsData from '../data/posts.json';

type Post = {
  id: number;
  title: string;
  author: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
};

const PostDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const posts = postsData as Post[];
  const post = posts.find(p => slugify(p.title) === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center">
        <Navbar forceScrolled />
        <div className="text-center pt-32">
          <p className="text-navy text-xl font-serif mb-4">Artigo não encontrado.</p>
          <Link to="/blog" className="text-gold font-bold text-sm hover:underline">← Voltar ao Blog</Link>
        </div>
      </div>
    );
  }

  const url = `https://overticeliterario.com/blog/${slugify(post.title)}`;

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <SEOHead
        title={post.title}
        description={post.excerpt}
        image={`https://overticeliterario.com${post.image}`}
        url={url}
        type="article"
        keywords={`${post.title}, blog editora vértice literário, literatura moçambicana, ${post.author}`}
        schema={generateArticleSchema(post)}
      />
      <Navbar forceScrolled />

      <div className="max-w-3xl mx-auto px-4 sm:px-8 pt-28 sm:pt-36 pb-20">

        {/* Voltar */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
          <button onClick={() => navigate('/blog')}
            className="flex items-center gap-2 text-xs font-bold tracking-widest text-slate-400 hover:text-gold transition-colors mb-10 uppercase">
            <ArrowLeft size={14} /> Voltar ao Blog
          </button>
        </motion.div>

        {/* Imagem */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="aspect-video overflow-hidden rounded-sm shadow-xl mb-10">
          <img
            src={post.image}
            alt={`${post.title} — artigo do Blog da Editora Vértice Literário`}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Meta */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="flex flex-wrap items-center gap-4 mb-4">
          <span className="flex items-center gap-1.5 text-[10px] font-bold text-gold tracking-widest uppercase">
            <Users size={11} /> {post.author}
          </span>
          <span className="flex items-center gap-1.5 text-[10px] text-slate-400 tracking-widest uppercase">
            <Calendar size={11} /> {post.date}
          </span>
        </motion.div>

        {/* Título */}
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="text-2xl sm:text-4xl font-serif font-bold text-navy mb-8 leading-tight">
          {post.title}
        </motion.h1>

        {/* Conteúdo */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="space-y-5 text-slate-600 leading-relaxed text-base">
          {post.content.split('\n\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </motion.div>

        {/* Partilhar */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="mt-12 pt-6 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-bold tracking-widest uppercase">Partilhar este artigo</span>
          <ShareButton url={url} title={post.title} />
        </motion.div>

        {/* Outros posts */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="mt-12">
          <h3 className="text-sm font-bold tracking-widest text-navy uppercase mb-6">Outros Artigos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {posts.filter(p => p.id !== post.id).slice(0, 4).map(p => (
              <Link key={p.id} to={`/blog/${slugify(p.title)}`}
                className="flex gap-3 bg-white p-4 rounded-sm shadow-sm hover:shadow-md transition-all group">
                <img src={p.image} alt={p.title}
                  className="w-16 h-16 object-cover rounded-sm shrink-0" />
                <div>
                  <p className="text-xs font-bold text-gold tracking-widest uppercase mb-1">{p.date}</p>
                  <p className="text-sm font-serif font-bold text-navy leading-snug group-hover:text-gold transition-colors line-clamp-2">
                    {p.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default PostDetailPage;
