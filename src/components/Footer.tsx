import React from 'react';
import { motion } from 'motion/react';
import { Facebook, Instagram, Mail, MapPin, Phone, MessageCircle } from 'lucide-react';

const Footer = ({ contacto }: { contacto?: { morada: string; telefone: string; email: string; facebook: string; instagram: string; whatsapp: string } }) => {
  const c = contacto || {
    morada: 'Cidade de Tete, Moçambique. Paragem Juventude, Mercado Cambinde.',
    telefone: '(+258) 83 46 98 880',
    email: 'editoraverticeliterario@gmail.com',
    facebook: 'https://www.facebook.com/profile.php?id=61569927223809',
    instagram: 'https://www.instagram.com/edit.oraverticeliterario/',
    whatsapp: '258834698880',
  };
  return (
    <footer className="bg-navy text-white pt-8 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="relative h-24 flex items-center">
              <img 
                src="/logo.png" 
                alt="Editora Vértice Literário" 
                className="h-full w-auto object-contain brightness-0 invert"
              />
            </div>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            A palavra é a semente, a nossa missão é fazê-la florescer. Dedicados à excelência editorial em Moçambique.
          </p>
          <div className="flex gap-4">
            <a href={c.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-gold hover:border-gold transition-all duration-300">
              <Facebook size={18} />
            </a>
            <a href={c.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-gold hover:border-gold transition-all duration-300">
              <Instagram size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-serif font-bold text-lg mb-6 text-gold">Links Rápidos</h4>
          <ul className="space-y-4 text-sm text-slate-400">
            <li><a href="#home" className="hover:text-white transition-colors">Início</a></li>
            <li><a href="#catalogo" className="hover:text-white transition-colors">Catálogo</a></li>
            <li><a href="/autores" className="hover:text-white transition-colors">Autores</a></li>
            <li><a href="#blog" className="hover:text-white transition-colors">Blog</a></li>
            <li><a href="#sobre" className="hover:text-white transition-colors">Sobre</a></li>
            <li><a href="#contacto" className="hover:text-white transition-colors">Contacto</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif font-bold text-lg mb-6 text-gold">Contacto</h4>
          <ul className="space-y-4 text-sm text-slate-400">
            <li className="flex gap-3">
              <MapPin size={18} className="text-gold shrink-0" />
              <span>{c.morada}</span>
            </li>
            <li className="flex gap-3">
              <Phone size={18} className="text-gold shrink-0" />
              <span>{c.telefone}</span>
            </li>
            <li className="flex gap-3">
              <Mail size={18} className="text-gold shrink-0" />
              <span>{c.email}</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif font-bold text-lg mb-6 text-gold">Pagamentos</h4>
          <div className="grid grid-cols-2 gap-3">
            {/* Visa */}
            <div className="bg-white rounded-md p-3 flex items-center justify-center h-12">
              <svg viewBox="0 0 48 16" className="h-5 w-auto">
                <text x="0" y="13" fontFamily="Arial" fontWeight="bold" fontSize="14" fill="#1A1F71">VISA</text>
              </svg>
            </div>
            {/* PayPal */}
            <div className="bg-white rounded-md p-3 flex items-center justify-center h-12">
              <svg viewBox="0 0 80 24" className="h-5 w-auto">
                <text x="0" y="18" fontFamily="Arial" fontWeight="bold" fontSize="16" fill="#003087">Pay</text>
                <text x="28" y="18" fontFamily="Arial" fontWeight="bold" fontSize="16" fill="#009cde">Pal</text>
              </svg>
            </div>
            {/* Conta Móvel */}
            <div className="bg-[#1B2A4A] rounded-md p-3 flex items-center justify-center h-12 gap-1.5 border border-white/20">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white shrink-0">
                <path d="M17 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-5 18a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm5-4H7V4h10v12z"/>
              </svg>
              <span className="text-white text-[10px] font-bold tracking-wide">CONTA MÓVEL</span>
            </div>
            {/* WhatsApp */}
            <div className="bg-[#25D366] rounded-md p-3 flex items-center justify-center h-12 gap-1.5">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L.057 23.882a.5.5 0 0 0 .61.61l6.086-1.461A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.504-5.23-1.385l-.374-.217-3.87.929.944-3.81-.237-.386A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              <span className="text-white text-[10px] font-bold">WhatsApp</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Editora Vértice Literário, Lda. Todos os direitos reservados.</p>
        <div className="flex items-center gap-4">
          <p>Desenvolvido por <a href="https://bluevisiontech.site/ai" target="_blank" rel="noopener noreferrer" className="text-primary-blue font-semibold hover:text-gold transition-colors">Bluevision Tech</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
