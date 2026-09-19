import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Users } from 'lucide-react';
import ShareButton from './ShareButton';

interface Post {
  id: number;
  title: string;
  date: string;
  author: string;
  image: string;
  excerpt: string;
  content: string;
}

interface BlogModalProps {
  post: Post | null;
  onClose: () => void;
}

const BlogModal = ({ post, onClose }: BlogModalProps) => {
  useEffect(() => {
    if (post) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [post]);

  return (
    <AnimatePresence>
      {post && (
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
            className="relative bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-9 h-9 bg-navy text-white rounded-full flex items-center justify-center hover:bg-gold transition-colors"
            >
              <X size={18} />
            </button>

            {/* Image */}
            <div className="aspect-video overflow-hidden">
              <img src={post.image} alt={`${post.title} — artigo do Blog da Editora Vértice Literário, por ${post.author}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center gap-1 text-[10px] font-bold text-gold tracking-widest uppercase">
                  <Users size={11} /> {post.author}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy mb-6 leading-tight">{post.title}</h2>

              <div className="space-y-4 text-slate-600 leading-relaxed">
                {post.content.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium tracking-widest uppercase">Partilhar este artigo</span>
                <ShareButton url={`${window.location.origin}/#blog`} title={post.title} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BlogModal;
