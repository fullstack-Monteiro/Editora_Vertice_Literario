import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Users } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogModal from '../components/BlogModal';
import ShareButton from '../components/ShareButton';
import { BLOG_POSTS } from '../constants';
import { Facebook, Instagram } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-white">
      <Navbar forceScrolled />
      <BlogModal post={selected} onClose={() => setSelected(null)} />

      {/* Header */}
      <div className="bg-navy pt-28 sm:pt-32 pb-12 px-5 md:px-12">
        <div className="max-w-7xl mx-auto">
          <span className="text-gold font-bold tracking-widest text-xs mb-4 block">CONHECIMENTO & CULTURA</span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-4 leading-tight">Blog Vértice Literário</h1>
          <div className="w-20 h-1 bg-gold mt-4"></div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="max-w-7xl mx-auto px-5 md:px-12 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {allPosts.map((post, index) => (
            <motion.article key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col group cursor-pointer"
              onClick={() => setSelected(post)}
            >
              <div className="relative overflow-hidden aspect-video mb-6 shadow-lg">
                <img src={post.image} alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer" />
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
              <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">{post.excerpt}</p>
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <button className="text-xs font-bold tracking-widest text-navy hover:text-gold transition-colors flex items-center gap-2 uppercase">
                  Ler Mais <ArrowRight size={14} />
                </button>
                <div className="flex gap-3 text-slate-400">
                  <a href="https://www.facebook.com/profile.php?id=61569927223809" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors"><Facebook size={16} /></a>
                  <a href="https://www.instagram.com/edit.oraverticeliterario/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors"><Instagram size={16} /></a>
                  <ShareButton url={`${window.location.origin}/blog`} title={post.title} />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPage;
