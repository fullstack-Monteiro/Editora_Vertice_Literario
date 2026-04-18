import React from 'react';
import { motion } from 'motion/react';
import { Users } from 'lucide-react';
import Navbar from '../components/Navbar';
import { VALUES } from '../constants';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar forceScrolled />

      {/* Hero */}
      <div className="bg-navy pt-32 pb-16 px-5 md:px-12">
        <div className="max-w-7xl mx-auto">
          <span className="text-gold font-bold tracking-widest text-xs mb-4 block">HISTÓRICO INSTITUCIONAL</span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-4 leading-tight">Uma Instituição Moçambicana<br/>Dedicada à Excelência Literária</h1>
          <div className="w-20 h-1 bg-gold mt-6"></div>
        </div>
      </div>

      {/* Sobre */}
      <section className="bg-slate-50 py-16 md:py-24 px-5 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
            <div className="relative z-10">
              <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=1000"
                alt="Office" className="rounded-sm shadow-2xl" referrerPolicy="no-referrer" />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-gold/10 -z-0 hidden md:block"></div>
            <div className="absolute -top-10 -left-10 p-8 bg-navy text-white z-20 hidden md:block">
              <span className="text-4xl font-serif font-bold block mb-2">185809</span>
              <span className="text-[10px] tracking-widest uppercase font-bold text-gold">Registo Oficial</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="space-y-5 text-slate-600 leading-relaxed">
              <p>A Editora Vértice Literário, Lda. é uma instituição moçambicana dedicada à promoção e ao desenvolvimento da literatura no país e no espaço lusófono. Está sediada em Tete, na área da Paragem Juventude, ao pé do Mercado Cambinde, na Estrada Nacional nº 7.</p>
              <p>A constituição oficial da editora está registada no Conservatório de Registo de Entidades Legais de Tete, sob o número 185809.</p>
              <p>Desde a sua origem, a Editora Vértice Literário tem-se destacado no apoio a escritores emergentes e consagrados, na democratização do acesso à publicação e na promoção da diversidade literária.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
              <div>
                <h4 className="font-serif font-bold text-navy mb-3 text-lg border-l-4 border-gold pl-4">Missão</h4>
                <p className="text-sm text-slate-500">Apoiar autores emergentes e consolidados, publicar obras de impacto literário, social e cultural.</p>
              </div>
              <div>
                <h4 className="font-serif font-bold text-navy mb-3 text-lg border-l-4 border-gold pl-4">Visão</h4>
                <p className="text-sm text-slate-500">Ser uma das editoras de referência em Moçambique e no espaço lusófono.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Valores */}
      <section className="bg-white py-16 md:py-24 px-5 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-navy mb-4">Os Nossos Valores Fundamentais</h2>
            <div className="w-20 h-1 bg-gold mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {VALUES.map((value, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }} viewport={{ once: true }}
                className="bg-slate-50 p-8 text-center shadow-sm hover:shadow-xl transition-all duration-500 group">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gold transition-colors duration-500">
                  <value.icon className="text-navy group-hover:text-white transition-colors duration-500" size={24} />
                </div>
                <h4 className="font-serif font-bold text-navy mb-3">{value.title}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filosofia */}
      <section className="bg-navy py-16 md:py-24 px-5 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-gold font-bold tracking-widest text-xs mb-4 block">IDENTIDADE EDITORIAL</span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-6">Filosofia Editorial</h2>
          <p className="text-slate-400 leading-relaxed">
            A Editora Vértice Literário orienta-se por uma filosofia que privilegia a cooperação, a inclusão e a promoção equitativa das expressões literárias moçambicanas e lusófonas. A nossa actuação editorial pauta-se pela convicção de que a literatura constitui um património colectivo e que o ambiente cultural se robustece quando as instituições trabalham em convergência, e não em oposição. Não integramos o mercado editorial com o propósito de competir, rivalizar ou disputar protagonismos. A nossa presença assenta na defesa de um ecossistema literário plural, democrático e aberto, onde diversas editoras, autores, iniciativas e sensibilidades possam coexistir e florescer em benefício da cultura nacional.
          </p>
        </div>
      </section>

      {/* Estrutura Interna */}
      <section className="bg-slate-50 py-16 md:py-24 px-5 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-gold font-bold tracking-widest text-xs mb-4 block">ESTRUTURA INTERNA</span>
            <h2 className="text-4xl font-serif font-bold text-navy mb-4">Estrutura Interna da Editora</h2>
            <div className="w-20 h-1 bg-gold mx-auto mb-4"></div>
          </div>

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-16">
            <div className="bg-white p-8 shadow-sm border border-slate-100">
              <h4 className="font-serif font-bold text-navy text-lg mb-1">Departamento Editorial</h4>
              <p className="text-xs text-gold font-bold tracking-widest uppercase mb-4">Chingodzi – Paragem Juventude</p>
              <ul className="space-y-1">
                {["Acompanhamento a autores", "Revisão e edição", "Preparação estrutural de obras", "Apoio presencial e remoto", "Gestão de projectos editoriais"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full shrink-0"></span>{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-8 shadow-sm border border-slate-100">
              <h4 className="font-serif font-bold text-navy text-lg mb-1">Departamento de Design</h4>
              <p className="text-xs text-gold font-bold tracking-widest uppercase mb-4">Identidade Visual</p>
              <ul className="space-y-1">
                {["Criação de capas", "Diagramação profissional", "Produção de materiais gráficos", "Construção da identidade visual da editora"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full shrink-0"></span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <h3 className="font-serif font-bold text-navy text-xl mb-6 text-center">Colaboradores</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {["Sheila Khan", "Solene Santos Almoço", "Samila Simões Manuel António", "Stephen Pinto"].map((name, index) => (
                <div key={index} className="bg-white p-6 text-center shadow-sm border border-slate-100">
                  <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="text-gold" size={18} />
                  </div>
                  <p className="font-serif font-bold text-navy text-sm">{name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
