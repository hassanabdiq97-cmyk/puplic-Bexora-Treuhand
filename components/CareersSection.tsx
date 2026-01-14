
'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUpRight, MapPin, Clock, X, CheckCircle2, ArrowRight, Sparkles, Heart, GraduationCap } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { deDict } from '../dictionaries/de';
import { frDict } from '../dictionaries/fr';

interface CareersSectionProps {
  t?: any;
  onApplyClick: () => void;
  lang?: 'DE' | 'FR';
}

const CareersSection: React.FC<CareersSectionProps> = ({ onApplyClick, lang = 'DE' }) => {
  const dict = lang === 'DE' ? deDict : frDict;
  const content = dict.sections.careers;
  const jobs = dict.jobs;
  
  const [selectedJob, setSelectedJob] = useState<any>(null);

  const benefitIcons = [Sparkles, Heart, GraduationCap];

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedJob(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const openJob = (job: any) => {
    setSelectedJob(job);
    document.body.style.overflow = 'hidden';
  };

  const closeJob = () => {
    setSelectedJob(null);
    document.body.style.overflow = 'auto';
  };

  const handleApply = () => {
    closeJob();
    setTimeout(() => {
      onApplyClick();
    }, 100);
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start relative z-10 py-10">
        {/* Left: Employer Branding */}
        <div className="lg:col-span-5 space-y-10 animate-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 text-[10px] font-black uppercase tracking-[0.2em] border border-slate-200 dark:border-white/10">
            {content.badge}
          </div>
          <h2 className="text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tighter">
            {content.title} <br/>
            <span className="text-blue-600">{content.accent}</span>
          </h2>
          <p className="text-xl text-slate-700 dark:text-slate-300 font-light leading-relaxed">
            {content.desc}
          </p>
          
          <div className="space-y-6 pt-6">
            {content.benefits.map((benefit: any, i: number) => {
              const Icon = benefitIcons[i % benefitIcons.length];
              return (
                <div key={i} className="flex gap-5 group">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-blue-600 dark:text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">{benefit.title}</h3>
                    <p className="text-xs text-slate-700 dark:text-slate-400">{benefit.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Job Listings */}
        <div className="lg:col-span-7 space-y-6 animate-up">
          {jobs.map((job: any) => (
            <div 
              key={job.id} 
              onClick={() => openJob(job)}
              role="button"
              tabIndex={0}
              aria-label={`${dict.aria.jobCard} ${job.title}`}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openJob(job)}
              className="group p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:border-blue-600/30 hover:shadow-2xl hover:shadow-blue-600/5 transition-all cursor-pointer relative overflow-hidden focus:outline-none focus:ring-4 focus:ring-blue-500/30"
            >
              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                <ArrowUpRight className="text-blue-600" size={24} aria-hidden="true" />
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag: string) => (
                      <span key={tag} className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 bg-blue-100 dark:bg-blue-600/10 text-blue-700 dark:text-blue-400 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-6 text-slate-600 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">
                    <span className="flex items-center gap-2"><Clock size={14} aria-hidden="true"/> {job.pensum}</span>
                    <span className="flex items-center gap-2"><MapPin size={14} aria-hidden="true"/> {job.location}</span>
                  </div>
                </div>
                
                <MagneticButton 
                  variant="outline" 
                  onClick={(e) => { e.stopPropagation(); openJob(job); }}
                  className="md:w-auto w-full !px-8 !py-3 !text-[10px] !rounded-2xl group-hover:!bg-blue-600 group-hover:!text-white group-hover:!border-blue-600"
                >
                  {content.cta}
                </MagneticButton>
              </div>
            </div>
          ))}

          <div className="p-10 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-white/5 flex flex-col items-center justify-center text-center space-y-4 hover:border-blue-600/20 transition-colors bg-slate-50/50 dark:bg-transparent">
            <h4 className="text-slate-900 dark:text-white font-black uppercase text-sm tracking-widest">{content.empty}</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xs leading-relaxed">{content.emptyDesc}</p>
            <button onClick={onApplyClick} className="group flex items-center gap-2 text-blue-600 font-black uppercase text-[10px] tracking-widest hover:text-blue-500 transition-colors focus:outline-none focus:underline">
              {content.apply} <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 md:p-12 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={closeJob} />
          
          <div className="relative w-full max-w-4xl bg-white dark:bg-[#0d1425] rounded-[3rem] shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-8 duration-500" role="dialog" aria-modal="true" aria-labelledby="job-title">
            <div className="flex justify-between items-center p-8 md:p-12 border-b border-slate-100 dark:border-white/5">
              <div>
                <div className="flex gap-2 mb-4">
                  {selectedJob.tags.map((tag: string) => (
                    <span key={tag} className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 bg-blue-100 dark:bg-blue-600/10 text-blue-700 dark:text-blue-400 rounded-md">{tag}</span>
                  ))}
                </div>
                <h3 id="job-title" className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">{selectedJob.title}</h3>
                <div className="flex items-center gap-6 mt-4 text-slate-600 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest">
                  <span className="flex items-center gap-2"><Clock size={14} aria-hidden="true"/> {selectedJob.pensum}</span>
                  <span className="flex items-center gap-2"><MapPin size={14} aria-hidden="true"/> {selectedJob.location}</span>
                </div>
              </div>
              <button onClick={closeJob} className="p-4 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500" aria-label={dict.common.close}>
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-8 md:p-12 space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">{content.tasksTitle}</h4>
                  <ul className="space-y-4">
                    {selectedJob.tasks.map((task: string, i: number) => (
                      <li key={i} className="flex gap-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                        <CheckCircle2 size={18} className="text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">{content.reqTitle}</h4>
                  <ul className="space-y-4">
                    {selectedJob.requirements.map((req: string, i: number) => (
                      <li key={i} className="flex gap-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-2" aria-hidden="true" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-blue-600/5 rounded-3xl p-8 border border-blue-600/10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="max-w-md text-left">
                    <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2">{content.apply}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Wir freuen uns darauf, Sie persönlich kennenzulernen. Senden Sie uns eine Nachricht oder rufen Sie uns direkt an.</p>
                  </div>
                  <MagneticButton variant="primary" className="!px-10 !py-4" onClick={handleApply}>
                    {content.apply} <ArrowRight size={18} aria-hidden="true" />
                  </MagneticButton>
                </div>
              </div>
            </div>

            <div className="p-6 text-center bg-slate-50 dark:bg-white/[0.02] border-t border-slate-100 dark:border-white/5">
              <button onClick={closeJob} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors focus:outline-none focus:underline">
                {dict.common.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CareersSection;
