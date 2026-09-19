import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, BookOpen } from 'lucide-react';
import Navbar from '../components/Navbar';
import SEOHead from '../components/SEOHead';
import { generateAuthorSchema } from '../utils/seoSchema';
import { slugify } from '../utils/slugify';
import authorsData from '../data/authors.json';

type Author = {
  id: number;
  nome: string;
  foto: string;
  bio: string;
  obras: string[];
  genero: string;
};

const AuthorDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const authors = authorsData as Author[];
  const author = authors.find(a => slugify(a.nome) === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!author) {
    return (
      <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center">
        <Navbar forceScrolled />
        <div className="text-center pt-32">
          <p className="text-navy text-xl font-serif mb-4">Autor não encontrado.</p>
          <Link to="/autores" className="text-gold font-bold text-sm hover:underline">← Voltar aos Autores</Link>
        </div>
      </div>
    );
  }

  const url = `https://overticeliterario.com/autor/${slugify(author.nome)}`;
  // Primeira frase da bio como description
  const description = author.bio.split('.')[0] + '. Autor publicado pela Editora Vértice Literário.';

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <SEOHead
        title={author.nome}
        description={description}
        image={author.foto ? `https://overticeliterario.com${author.foto}` : 'https://overticeliterario.com/logo.png'}
        url={url}
        keywords={`${author.nome}, autor moçambicano, ${author.genero}, editora vértice literário, ${author.obras.join(', ')}`}
        schema={generateAuthorSchema(author)}
      />
      <Navbar forceScrolled />

      <div className="max-w-3xl mx-auto px-4 sm:px-8 pt-28 sm:pt-36 pb-20">

        {/* Voltar */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
          <button onClick={() => navigate('/autores')}
            className="flex items-center gap-2 text-xs font-bold tracking-widest text-slate-400 hover:text-gold transition-colors mb-10 uppercase">
            <ArrowLeft size={14} /> Voltar aos Autores
          </button>
        </motion.div>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-12 bg-white p-8 rounded-sm shadow-md">
          <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-[#f5f0e8] shadow-lg shrink-0">
            {author.foto ? (
              <img
                src={author.foto}
                alt={`Fotografia de ${author.nome}, autor de ${author.genero} — Editora Vértice Literário`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                <span className="text-5xl font-serif font-bold text-slate-400">{author.nome.charAt(0)}</span>
              </div>
            )}
          </div>
          <div className="text-center sm:text-left">
            <span className="text-gold text-[10px] font-bold tracking-widest uppercase block mb-2">{author.genero}</span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-navy mb-3 leading-tight">{author.nome}</h1>
            <p className="text-slate-500 text-sm leading-relaxed">Autor publicado pela Editora Vértice Literário</p>
          </div>
        </motion.div>

        {/* Bio */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="mb-10">
          <h2 className="text-xs font-bold tracking-widest text-gold uppercase mb-4">Biografia</h2>
          <div className="space-y-4 text-slate-600 leading-relaxed text-base">
            {author.bio.split('. ').reduce<string[][]>((acc, sentence, i) => {
              const group = Math.floor(i / 3);
              if (!acc[group]) acc[group] = [];
              acc[group].push(sentence);
              return acc;
            }, []).map((group, i) => (
              <p key={i}>{group.join('. ')}{group[group.length - 1].endsWith('.') ? '' : '.'}</p>
            ))}
          </div>
        </motion.div>

        {/* Obras */}
        {author.obras.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-sm shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <BookOpen size={16} className="text-gold" />
              <h2 className="text-xs font-bold tracking-widest text-navy uppercase">Obras Publicadas</h2>
            </div>
            <ul className="space-y-3">
              {author.obras.map((obra, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full shrink-0"></span>
                  {obra}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Outros autores */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="mt-12">
          <h3 className="text-sm font-bold tracking-widest text-navy uppercase mb-6">Outros Autores</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {authors.filter(a => a.id !== author.id).slice(0, 4).map(a => (
              <Link key={a.id} to={`/autor/${slugify(a.nome)}`}
                className="flex flex-col items-center text-center bg-white p-4 rounded-sm shadow-sm hover:shadow-md transition-all group">
                <div className="w-16 h-16 rounded-full overflow-hidden mb-3 border-2 border-[#f5f0e8]">
                  {a.foto ? (
                    <img src={a.foto} alt={a.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  ) : (
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                      <span className="text-xl font-serif font-bold text-slate-400">{a.nome.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <p className="text-xs font-serif font-bold text-navy group-hover:text-gold transition-colors leading-snug">{a.nome}</p>
              </Link>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default AuthorDetailPage;
