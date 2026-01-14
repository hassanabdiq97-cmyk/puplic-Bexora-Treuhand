
'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Lock, CheckCircle2, Loader2, Send } from 'lucide-react';
import { deDict } from '../dictionaries/de';
import { frDict } from '../dictionaries/fr';

export default function ContactSection({ lang = 'DE' }: { lang?: 'DE' | 'FR' }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const dict = lang === 'DE' ? deDict : frDict;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // 1. Versuch: Senden an interne API (via SMTP)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
        // Reset success message after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        // Wenn API fehlschlägt (z.B. SMTP nicht konfiguriert), Fehler werfen um Fallback auszulösen
        throw new Error('API submission failed');
      }
    } catch (error) {
      // 2. Sicherheits-Fallback: E-Mail Client öffnen (mailto)
      // Dies garantiert, dass der Nutzer uns immer erreichen kann, auch wenn der Server streikt.
      const subject = `Anfrage via Webseite: ${form.name}`;
      const body = `Name: ${form.name}\nE-Mail: ${form.email}\n\nNachricht:\n${form.message}`;
      window.location.href = `mailto:info@bexora.ch?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus('idle');
    }
  };

  return (
    <section id="contact" className="min-h-screen flex flex-col items-center justify-center py-20 md:py-32 px-6 max-w-7xl mx-auto relative z-20 scroll-mt-24">
      <div className="w-full bg-white dark:bg-slate-900 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10 flex flex-col lg:flex-row transition-colors duration-500">
        
        {/* Left Side: Brand Color (Always Blue/White Text) */}
        <div className="lg:w-1/2 p-10 md:p-12 lg:p-20 bg-blue-600 text-white flex flex-col relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
           
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-white/20 self-start relative z-10">
              {dict.nav.contact}
           </div>
           <h2 className="text-4xl md:text-5xl font-black mb-10 tracking-tighter relative z-10">{dict.contact.title}</h2>
           
           <div className="space-y-8 md:space-y-10 mt-auto relative z-10 pt-8 lg:pt-0">
             <div className="flex items-center gap-6 group cursor-pointer hover:translate-x-2 transition-transform">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
                    <Phone size={24} aria-hidden="true"/>
                </div>
                <p className="text-lg md:text-xl font-black break-all">+41 32 123 45 67</p>
             </div>
             <div className="flex items-center gap-6 group cursor-pointer hover:translate-x-2 transition-transform">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
                    <Mail size={24} aria-hidden="true"/>
                </div>
                <p className="text-lg md:text-xl font-black break-all">info@bexora.ch</p>
             </div>
             <div className="flex items-center gap-6 group cursor-pointer hover:translate-x-2 transition-transform">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
                    <MapPin size={24} aria-hidden="true"/>
                </div>
                <p className="text-lg md:text-xl font-medium">{dict.contact.address}</p>
             </div>
           </div>
        </div>
        
        {/* Right Side: Form (Theme Aware) */}
        <div className="lg:w-1/2 p-10 md:p-12 lg:p-20 bg-white dark:bg-slate-950 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-white/5 transition-colors duration-500">
           {status === 'success' ? (
             <div className="flex flex-col items-center justify-center h-full text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white">{dict.contact.success}</h3>
                <p className="text-slate-600 dark:text-slate-400">Wir haben Ihre Nachricht erhalten.</p>
             </div>
           ) : (
             <form className="space-y-8" onSubmit={handleSubmit} aria-label={dict.aria.submitContact}>
                <div className="group relative">
                  <input 
                      type="text" 
                      name="name"
                      placeholder={dict.contact.placeholderName}
                      aria-label={dict.aria.inputName}
                      className="w-full bg-transparent border-b border-slate-200 dark:border-white/10 py-4 focus:border-blue-500 outline-none text-slate-900 dark:text-white text-lg md:text-xl font-light transition-colors peer placeholder-shown:translate-y-0 placeholder:text-slate-400 dark:placeholder:text-slate-500" 
                      required 
                      value={form.name}
                      disabled={status === 'submitting'}
                      onChange={e => setForm({...form, name: e.target.value})} 
                  />
                  <div className="absolute right-0 top-4 text-blue-500 opacity-0 peer-focus:opacity-100 transition-opacity">
                      <CheckCircle2 size={20} />
                  </div>
                </div>
                
                <div className="group relative">
                    <input 
                      type="email" 
                      name="email"
                      placeholder={dict.contact.placeholderEmail}
                      aria-label={dict.aria.inputEmail}
                      className="w-full bg-transparent border-b border-slate-200 dark:border-white/10 py-4 focus:border-blue-500 outline-none text-slate-900 dark:text-white text-lg md:text-xl font-light transition-colors peer placeholder:text-slate-400 dark:placeholder:text-slate-500" 
                      required 
                      value={form.email}
                      disabled={status === 'submitting'}
                      onChange={e => setForm({...form, email: e.target.value})} 
                    />
                    <div className="absolute right-0 top-4 text-blue-500 opacity-0 peer-focus:opacity-100 transition-opacity">
                      <CheckCircle2 size={20} />
                    </div>
                </div>

                <textarea 
                  name="message"
                  placeholder={dict.contact.placeholderMessage}
                  aria-label={dict.aria.inputMessage}
                  rows={4} 
                  className="w-full bg-transparent border-b border-slate-200 dark:border-white/10 py-4 focus:border-blue-500 outline-none text-slate-900 dark:text-white text-lg md:text-xl font-light resize-none transition-colors placeholder:text-slate-400 dark:placeholder:text-slate-500" 
                  required 
                  value={form.message}
                  disabled={status === 'submitting'}
                  onChange={e => setForm({...form, message: e.target.value})}
                ></textarea>
                
                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  aria-label={dict.aria.submitContact}
                  className="w-full py-5 md:py-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:shadow-xl hover:-translate-y-1 active:translate-y-0 relative overflow-hidden group transition-all disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        Senden...
                      </>
                    ) : (
                      <>
                        {dict.common.send}
                        <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                </button>

                <div className="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-widest pt-2">
                   <Lock size={12} className="text-emerald-500" />
                   {dict.contact.trust}
                </div>
             </form>
           )}
        </div>
      </div>
    </section>
  );
}
