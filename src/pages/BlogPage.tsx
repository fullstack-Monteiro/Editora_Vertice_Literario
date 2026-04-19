import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Users } from 'lucide-react';
import Navbar from '../components/Navbar';
import BlogModal from '../components/BlogModal';
import { BLOG_POSTS } from '../constants';

const API_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:3001';

type Post = typeof BLOG_POSTS[0];

const BlogPage = () => {
  const [apiPosts, setApiPosts] = useState<Post[]>([]);
  const [selected, setSelected] = useState<Post | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/posts`)
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setApiPosts(data); })
      .catch(() => {});
    window.scrollTo(0, 0);
  }, []);

  const allPosts = [...apiPosts, ...BLOG_POSTS];

  const filtered = allPosts;

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <Navbar forceScrolled />
      <BlogModal post={selected} onClose={() => setSelected(null)} />

      {/* Header */}
      <div className="pt-24 sm:pt-32 pb-8 px-5 md:px-12 text-center">
        <span className="text-gold font-bold tracking-widest text-xs mb-4 block">CONHECIMENTO & CULTURA</span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-navy mb-3">Blog Vértice Literário</h1>
        <p className="text-slate-500 text-sm mb-6">Artigos, reflexões e novidades do mundo literário.</p>
        <div className="w-16 h-0.5 bg-gold mx-auto mb-8"></div>
      </div>

      {/* Posts Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-12 py-8 pb-20">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg mb-2">Nenhum artigo encontrado.</p>
            <button onClick={() => {}} className="text-gold text-sm font-bold hover:underline">Limpar pesquisa</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post, index) => (
              <motion.article key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="bg-white rounded-sm shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group overflow-hidden"
                onClick={() => setSelected(post)}
              >
                <div className="relative overflow-hidden aspect-video">
                  <img src={post.image} alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer" />
                  <div className="absolute top-3 left-3 bg-navy text-white text-[10px] font-bold tracking-widest px-2 py-1 uppercase">
                    {post.date}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gold tracking-widest mb-2 uppercase">
                    <Users size={11} /> {post.author}
                  </div>
                  <h3 className="font-serif font-bold text-navy text-base mb-2 leading-snug group-hover:text-gold transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
                  <span className="text-xs font-bold tracking-widest text-navy group-hover:text-gold transition-colors flex items-center gap-1 uppercase">
                    Ler Mais <ArrowRight size={12} />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
