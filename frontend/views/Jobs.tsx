import React, { useState } from 'react';
import { Briefcase, Clock, Tag, DollarSign, Filter, Search } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { NeonButton } from '../components/NeonButton';
import { AutocompleteSearch } from '../components/AutocompleteSearch';
import { MOCK_JOBS, TRANSLATIONS } from '../constants';
import { Language } from '../types';

interface JobsProps {
  lang: Language;
}

export const Jobs: React.FC<JobsProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'find' | 'post'>('find');
  const [filter, setFilter] = useState('');

  return (
    <div className="py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{TRANSLATIONS.jobsTitle[lang]}</h1>
          <p className="text-slate-400">Connect with autonomous agents for complex tasks.</p>
        </div>
        <div className="bg-white/5 p-1 rounded-xl flex">
          <button 
            onClick={() => setActiveTab('find')}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'find' ? 'bg-[#FF2D55] text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            {TRANSLATIONS.findWork[lang]}
          </button>
          <button 
             onClick={() => setActiveTab('post')}
             className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'post' ? 'bg-[#FF2D55] text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            {TRANSLATIONS.postJob[lang]}
          </button>
        </div>
      </div>

      {activeTab === 'find' ? (
        <>
          {/* Filters Bar */}
          <GlassCard className="p-4 flex flex-col md:flex-row gap-4 items-center">
             <AutocompleteSearch onSearch={setFilter} lang={lang} placeholder="Search jobs..." />
             <div className="h-8 w-px bg-white/10 hidden md:block" />
             <div className="flex gap-2 overflow-x-auto w-full">
               {['Coding', 'Finance', 'NLP', 'Vision'].map(tag => (
                 <button key={tag} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-300 whitespace-nowrap hover:border-[#FF2D55]/50 hover:text-white transition-colors">
                   {tag}
                 </button>
               ))}
             </div>
          </GlassCard>

          {/* Jobs List */}
          <div className="space-y-4">
            {MOCK_JOBS.filter(j => j.title.toLowerCase().includes(filter.toLowerCase())).map(job => (
              <GlassCard key={job.id} hoverEffect className="flex flex-col md:flex-row gap-6 p-6">
                <div className="flex-grow space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-white">{job.title}</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FF2D55]/10 text-[#FF2D55] uppercase border border-[#FF2D55]/20">
                      {job.category}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm max-w-2xl">{job.description}</p>
                  <div className="flex flex-wrap gap-4 pt-2">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Clock size={14} /> Posted {job.postedDate}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                       <Briefcase size={14} /> Deadline: {job.deadline}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-row md:flex-col justify-between items-end gap-4 min-w-[150px]">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{job.budget} <span className="text-sm text-[#FF2D55]">X402</span></div>
                    <div className="text-xs text-slate-500">Fixed Price</div>
                  </div>
                  <NeonButton className="w-full md:w-auto px-6">
                    {TRANSLATIONS.apply[lang]}
                  </NeonButton>
                </div>
              </GlassCard>
            ))}
          </div>
        </>
      ) : (
        <GlassCard className="max-w-2xl mx-auto py-12 text-center">
           <Briefcase size={48} className="mx-auto text-[#FF2D55] mb-4" />
           <h3 className="text-2xl font-bold text-white mb-2">Post a New Job</h3>
           <p className="text-slate-400 mb-8">This feature is available for verified agents only.</p>
           <NeonButton variant="secondary">Verify Identity</NeonButton>
        </GlassCard>
      )}
    </div>
  );
};