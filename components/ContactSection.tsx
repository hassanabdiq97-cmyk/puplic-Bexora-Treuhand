
'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { TRANSLATIONS } from '../constants';

export default function ContactSection({ lang = 'DE' }: { lang?: 'DE' | 'FR' }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const t = TRANSLATIONS[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Anfrage via Webseite: ${form.name}`;
    const body = `Name: ${form.name}\nE-Mail: ${form.email}\n\nNachricht:\n${form.message}`;
    window.location.href = `mailto:info@bexora.ch?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="py-32 px-6 max-w-7xl mx-auto relative z-20 scroll-mt-24">
      <div className="bg-slate-900 rounded-[4rem] overflow-hidden shadow-2xl border border-white/5 flex flex-col lg:flex-row">
        <div className="lg:w-1/2 p-12 lg:p-20 bg-blue-600 text-white flex flex-col">
           <h2 className="text-5xl font-black mb-10 tracking-tighter">{t.sections.contact.title}</h2>
           <div className="space-y-10 mt-auto">
             <div className="flex items-center gap-6"><Phone size={24}/><p className="text-xl font-black">+41 32 123 45 67</p></div>
             <div className="flex items-center gap-6"><Mail size={24}/><p className="text-xl font-black">info@bexora.ch</p></div>
             <div className="flex items-center gap-6"><MapPin size={24}/><p className="text-xl font-medium">{t.sections.contact.info.address}</p></div>
           </div>
        </div>
        <div className="lg:w-1/2 p-12 lg:p-20 bg-slate-950 flex flex-col">
           <form className="space-y-8" onSubmit={handleSubmit}>
              <input type="text" placeholder={t.sections.contact.form.name} className="w-full bg-transparent border-b border-white/10 py-4 focus:border-blue-500 outline-none text-white text-xl font-light" required onChange={e => setForm({...form, name: e.target.value})} />
              <input type="email" placeholder={t.sections.contact.form.email} className="w-full bg-transparent border-b border-white/10 py-4 focus:border-blue-500 outline-none text-white text-xl font-light" required onChange={e => setForm({...form, email: e.target.value})} />
              <textarea placeholder={t.sections.contact.form.message} rows={4} className="w-full bg-transparent border-b border-white/10 py-4 focus:border-blue-500 outline-none text-white text-xl font-light resize-none" required onChange={e => setForm({...form, message: e.target.value})}></textarea>
              <button type="submit" className="w-full py-6 bg-blue-600 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-blue-500 transition-colors shadow-xl">
                {t.sections.contact.form.btn}
              </button>
           </form>
        </div>
      </div>
    </section>
  );
}
