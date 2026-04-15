import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, BookOpen } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'INÍCIO', href: '#home' },
    { name: 'CATÁLOGO', href: '#catalogo' },
    { name: 'AUTORES', href: '/autores' },
    { name: 'BLOG', href: '#blog' },
    { name: 'SOBRE', href: '#sobre' },
    { name: 'CONTACTO', href: '#contacto' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'glass-nav py-1' : 'bg-transparent py-1'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <motion.a 
          href="#home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-3 group"
        >
          <div className="h-20 flex items-center overflow-visible">
            <img 
              src="/logo.png" 
              alt="Editora Vértice Literário" 
              className="h-full w-auto object-contain"
            />
          </div>
          <div className="hidden sm:block">
            <span className={`font-serif font-bold text-sm leading-tight block ${scrolled ? 'text-navy' : 'text-white'}`}>Editora Vértice</span>
            <span className="font-serif text-xs leading-tight block text-gold">Literário</span>
          </div>
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-xs font-semibold tracking-widest hover:text-gold transition-colors duration-300 ${scrolled ? 'text-navy' : 'text-white'}`}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contacto"
            className={`px-6 py-2.5 text-xs font-bold tracking-widest hover:bg-gold transition-all duration-300 rounded-sm ${scrolled ? 'bg-navy text-white' : 'bg-white/20 text-white border border-white/30 hover:border-gold'}`}
          >
            PUBLICAR
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className={`md:hidden ${scrolled ? 'text-navy' : 'text-white'}`} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl md:hidden"
          >
            <div className="flex flex-col p-8 gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-bold tracking-widest text-navy hover:text-gold"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contacto"
                onClick={() => setIsOpen(false)}
                className="bg-navy text-white py-4 text-center text-xs font-bold tracking-widest rounded-sm"
              >
                PUBLICAR O MEU LIVRO
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
