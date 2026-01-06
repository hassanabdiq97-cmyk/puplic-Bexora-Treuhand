
import React from 'react';
import { Briefcase, MapPin, Clock, ArrowUpRight, Heart, Sparkles, GraduationCap } from 'lucide-react';
import MagneticButton from './MagneticButton';

const CareersSection: React.FC = () => {
  const jobs = [
    {
      id: 1,
      title: 'Mandatsleiter/in Treuhand',
      pensum: '80 - 100%',
      location: 'Solothurn / Hybrid',
      tags: ['Steuerexperte', 'Kundenbetreuung']
    },
    {
      id: 2,
      title: 'Sachbearbeiter/in Rechnungswesen',
      pensum: '60 - 100%',
      location: 'Lengnau BE',
      tags: ['Digital Native', 'Belegwesen']
    }
  ];

  const benefits = [
    { icon: Sparkles, title: 'Moderne IT', desc: 'Arbeiten mit modernsten Cloud-Tools & KI.' },
    { icon: Heart, title: 'Flexibilität', desc: 'Homeoffice-Optionen & flexible Zeitmodelle.' },
    { icon: GraduationCap, title: 'Entwicklung', desc: 'Unterstützung bei Fachausweisen & Diplomen.' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start relative z-10 py-10">
      {/* Left: Employer Branding */}
      <div className="lg:col-span-5 space-y-10 animate-up">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 text-blue-500 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest border border-blue-600/20">
          Arbeiten bei Bexora
        </div>
        <h2 className="text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tighter">
          Wir suchen Talente, <br/>
          <span className="text-blue-600">keine Aktenfresser.</span>
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-400 font-light leading-relaxed">
          Bexora ist mehr als ein Treuhandbüro. Wir sind ein Tech-Hub für Finanzen. 
          Wir suchen Menschen, die Digitalisierung als Chance sehen und Spass an Effizienz haben.
        </p>
        
        <div className="space-y-6 pt-6">
          {benefits.map((benefit, i) => (
            <div key={i} className="flex gap-5 group">
              <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-blue-600 dark:text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                <benefit.icon size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">{benefit.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-500">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Job Listings */}
      <div className="lg:col-span-7 space-y-6 animate-up">
        {jobs.map((job) => (
          <div 
            key={job.id} 
            className="group p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:border-blue-600/30 hover:shadow-2xl hover:shadow-blue-600/5 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
              <ArrowUpRight className="text-blue-600" size={24} />
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {job.tags.map(tag => (
                    <span key={tag} className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 bg-blue-600/10 text-blue-600 dark:text-blue-400 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  {job.title}
                </h3>
                <div className="flex items-center gap-6 text-slate-500 text-xs font-medium uppercase tracking-wider">
                  <span className="flex items-center gap-2"><Clock size={14}/> {job.pensum}</span>
                  <span className="flex items-center gap-2"><MapPin size={14}/> {job.location}</span>
                </div>
              </div>
              
              <MagneticButton variant="outline" className="md:w-auto w-full !px-8 !py-3 !text-[10px] !rounded-2xl group-hover:!bg-blue-600 group-hover:!text-white group-hover:!border-blue-600">
                Details ansehen
              </MagneticButton>
            </div>
          </div>
        ))}

        <div className="p-10 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-white/5 flex flex-col items-center justify-center text-center space-y-4 hover:border-blue-600/20 transition-colors bg-slate-50/50 dark:bg-transparent">
          <h4 className="text-slate-900 dark:text-white font-black uppercase text-sm tracking-widest">Nichts passendes dabei?</h4>
          <p className="text-xs text-slate-500 dark:text-slate-500 max-w-xs leading-relaxed">Wir sind immer auf der Suche nach innovativen Köpfen. Senden Sie uns eine Initiativbewerbung.</p>
          <a href="mailto:info@bexora.ch" className="group flex items-center gap-2 text-blue-600 font-black uppercase text-[10px] tracking-widest hover:text-blue-500 transition-colors">
            E-Mail senden <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CareersSection;
