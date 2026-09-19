import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SEOHead from '../components/SEOHead';
import { Facebook, Instagram } from 'lucide-react';
import ShareButton from '../components/ShareButton';
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

const BlogPage = () => {
  const [posts] = useState<Post[]>(postsData as Post[]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <SEOHead 
        title="Blog Vértice Literário"
        description="Leia artigos sobre eventos literários, lançamentos de livros, autores moçambicanos e notícias da Editora Vértice Literário. Cultura e literatura de Moçambique."
        keywords="blog literatura moçambicana, lançamentos de livros, eventos literários tete, autores moçambicanos, editora vértice literário notícias"
        url="https://overticeliterario.com/blog"
        schema={posts.length > 0 ? {
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'Blog — Editora Vértice Literário',
          description: 'Artigos, eventos e notícias sobre literatura moçambicana publicados pela Editora Vértice Literário.',
          url: 'https://overticeliterario.com/blog',
          publisher: {
            '@type': 'Organization',
            name: 'Editora Vértice Literário',
            logo: { '@type': 'ImageObject', url: 'https://overticeliterario.com/logo.png' }
          },
          blogPost: posts.map(post => ({
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            image: `https://overticeliterario.com${post.image}`,
            datePublished: post.date,
            author: { '@type': 'Person', name: post.author },
            publisher: { '@type': 'Organization', name: 'Editora Vértice Literário' }
          }))
        } : undefined}
      />
      <Navbar forceScrolled />

      {/* Header */}
      <div className="pt-24 sm:pt-32 pb-8 px-5 md:px-12 text-center">
        <span className="text-gold font-bold tracking-widest text-xs mb-4 block">CONHECIMENTO & CULTURA</span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-navy mb-3">Blog Vértice Literário</h1>
        <p className="text-slate-500 text-sm mb-6">Artigos, reflexões e novidades do mundo literário.</p>
        <div className="w-16 h-0.5 bg-gold mx-auto mb-8"></div>
      </div>

      {/* Posts */}
      <div className="max-w-6xl mx-auto px-4 sm:px-12 py-8 pb-20">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg mb-2">Sem publicações de momento.</p>
            <p className="text-slate-400 text-sm">Volte em breve para novos artigos.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="bg-white rounded-sm shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group overflow-hidden"
                onClick={() => navigate(`/blog/${slugify(post.title)}`)}
              >
                <div className="relative overflow-hidden aspect-video">
                  <img src={post.image} alt={`Artigo: "${post.title}" - Blog Editora Vértice Literário`}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gold tracking-widest mb-2 uppercase">
                    <Users size={11} /> {post.author}
                  </div>
                  <h3 className="font-serif font-bold text-navy text-base mb-2 leading-snug group-hover:text-gold transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-widest text-navy group-hover:text-gold transition-colors flex items-center gap-1 uppercase">
                      Ler Mais <ArrowRight size={12} />
                    </span>
                    <div className="flex gap-2 text-slate-400">
                      <a href="https://www.facebook.com/profile.php?id=61569927223809" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors"><Facebook size={14} /></a>
                      <a href="https://www.instagram.com/edit.oraverticeliterario/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors"><Instagram size={14} /></a>
                      <ShareButton url={`${window.location.origin}/blog/${slugify(post.title)}`} title={post.title} />
                    </div>
                  </div>
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
