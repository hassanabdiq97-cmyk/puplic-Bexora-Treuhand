
'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Lock, CheckCircle2 } from 'lucide-react';
import { deDict } from '../dictionaries/de';
import { frDict } from '../dictionaries/fr';

export default function ContactSection({ lang = 'DE' }: { lang?: 'DE' | 'FR' }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const dict = lang === 'DE' ? deDict : frDict;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Anfrage via Webseite: ${form.name}`;
    const body = `Name: ${form.name}\nE-Mail: ${form.email}\n\nNachricht:\n${form.message}`;
    window.location.href = `mailto:info@bexora.ch?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="py-32 md:py-48 px-6 max-w-7xl mx-auto relative z-20 scroll-mt-24">
      <div className="bg-slate-900 rounded-[4rem] overflow-hidden shadow-2xl border border-white/10 flex flex-col lg:flex-row">
        <div className="lg:w-1/2 p-12 lg:p-20 bg-blue-600 text-white flex flex-col relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
           
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-white/20 self-start relative z-10">
              {dict.nav.contact}
           </div>
           <h2 className="text-5xl font-black mb-10 tracking-tighter relative z-10">{dict.contact.title}</h2>
           
           <div className="space-y-10 mt-auto relative z-10">
             <div className="flex items-center gap-6 group cursor-pointer hover:translate-x-2 transition-transform">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                    <Phone size={24} aria-hidden="true"/>
                </div>
                <p className="text-xl font-black">+41 32 123 45 67</p>
             </div>
             <div className="flex items-center gap-6 group cursor-pointer hover:translate-x-2 transition-transform">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                    <Mail size={24} aria-hidden="true"/>
                </div>
                <p className="text-xl font-black">info@bexora.ch</p>
             </div>
             <div className="flex items-center gap-6 group cursor-pointer hover:translate-x-2 transition-transform">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                    <MapPin size={24} aria-hidden="true"/>
                </div>
                <p className="text-xl font-medium">{dict.contact.address}</p>
             </div>
           </div>
        </div>
        
        <div className="lg:w-1/2 p-12 lg:p-20 bg-slate-950 flex flex-col justify-center border-l border-white/5">
           <form className="space-y-8" onSubmit={handleSubmit} aria-label={dict.aria.submitContact}>
              <div className="group relative">
                <input 
                    type="text" 
                    placeholder={dict.contact.placeholderName}
                    aria-label={dict.aria.inputName}
                    className="w-full bg-transparent border-b border-white/10 py-4 focus:border-blue-500 outline-none text-white text-xl font-light transition-colors peer placeholder-shown:translate-y-0" 
                    required 
                    onChange={e => setForm({...form, name: e.target.value})} 
                />
                <div className="absolute right-0 top-4 text-blue-500 opacity-0 peer-focus:opacity-100 transition-opacity">
                    <CheckCircle2 size={20} />
                </div>
              </div>
              
              <div className="group relative">
                  <input 
                    type="email" 
                    placeholder={dict.contact.placeholderEmail}
                    aria-label={dict.aria.inputEmail}
                    className="w-full bg-transparent border-b border-white/10 py-4 focus:border-blue-500 outline-none text-white text-xl font-light transition-colors peer" 
                    required 
                    onChange={e => setForm({...form, email: e.target.value})} 
                  />
                  <div className="absolute right-0 top-4 text-blue-500 opacity-0 peer-focus:opacity-100 transition-opacity">
                    <CheckCircle2 size={20} />
                  </div>
              </div>

              <textarea 
                placeholder={dict.contact.placeholderMessage}
                aria-label={dict.aria.inputMessage}
                rows={4} 
                className="w-full bg-transparent border-b border-white/10 py-4 focus:border-blue-500 outline-none text-white text-xl font-light resize-none transition-colors" 
                required 
                onChange={e => setForm({...form, message: e.target.value})}
              ></textarea>
              
              <button 
                type="submit" 
                aria-label={dict.aria.submitContact}
                className="w-full py-6 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] transition-all transform hover:-translate-y-1 active:translate-y-0 relative overflow-hidden group"
              >
                <span className="relative z-10">{dict.common.send}</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>

              <div className="flex items-center justify-center gap-2 text-slate-500 text-[10px] uppercase tracking-widest pt-2">
                 <Lock size={12} className="text-emerald-500" />
                 {dict.contact.trust}
              </div>
           </form>
        </div>
      </div>
    </section>
  );
}
