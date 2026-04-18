import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ forceScrolled = false }: { forceScrolled?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isScrolled = forceScrolled || scrolled;

  const navLinks = [
    { name: 'INÍCIO', href: '#home', path: '/' },
    { name: 'CATÁLOGO', href: '#catalogo', path: '/catalogo' },
    { name: 'AUTORES', href: '/autores', path: '/autores' },
    { name: 'BLOG', href: '#blog', path: '/blog' },
    { name: 'SOBRE', href: '#sobre', path: '/sobre' },
    { name: 'CONTACTO', href: '#contacto', path: '/#contacto' },
  ];

  const handleNav = (link: typeof navLinks[0]) => {
    setIsOpen(false);
    if (link.path === '/autores' || link.path === '/catalogo' || link.path === '/sobre' || link.path === '/blog') {
      navigate(link.path);
    } else if (isHome) {
      const id = link.href.replace('#', '');
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(link.path);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'glass-nav py-1' : 'bg-transparent py-1'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <motion.button
          onClick={() => handleNav(navLinks[0])}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-3 group"
        >
          <div className="h-14 sm:h-20 flex items-center overflow-visible">
            <img src="/logo.png" alt="Editora Vértice Literário" className="h-full w-auto object-contain" />
          </div>
          <div className="hidden sm:block">
            <span className={`font-serif font-bold text-sm leading-tight block ${isScrolled ? 'text-navy' : 'text-white'}`}>Editora Vértice</span>
            <span className="font-serif text-xs leading-tight block text-gold">Literário</span>
          </div>
        </motion.button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button key={link.name} onClick={() => handleNav(link)}
              className={`text-xs font-semibold tracking-widest hover:text-gold transition-colors duration-300 ${isScrolled ? 'text-navy' : 'text-white'}`}>
              {link.name}
            </button>
          ))}
          <button onClick={() => handleNav(navLinks[5])}
            className={`px-6 py-2.5 text-xs font-bold tracking-widest hover:bg-gold transition-all duration-300 rounded-sm ${isScrolled ? 'bg-navy text-white' : 'bg-white/20 text-white border border-white/30 hover:border-gold'}`}>
            PUBLICAR
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className={`md:hidden ${isScrolled ? 'text-navy' : 'text-white'}`} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl md:hidden">
            <div className="flex flex-col p-5 sm:p-8 gap-5">
              {navLinks.map((link) => (
                <button key={link.name} onClick={() => handleNav(link)}
                  className="text-sm font-bold tracking-widest text-navy hover:text-gold text-left">
                  {link.name}
                </button>
              ))}
              <button onClick={() => handleNav(navLinks[5])}
                className="bg-navy text-white py-4 text-center text-xs font-bold tracking-widest rounded-sm">
                PUBLICAR O MEU LIVRO
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
