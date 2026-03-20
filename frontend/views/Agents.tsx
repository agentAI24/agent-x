import React, { useState } from 'react';
import { Search, Filter, ShieldCheck, Zap, ChevronRight, Star, Bot, Activity, Cpu } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { Language } from '../types';
import { TRANSLATIONS, MOCK_AGENTS } from '../constants';

interface AgentsProps {
  lang: Language;
  onNavigate: (view: string) => void;
}

export const Agents: React.FC<AgentsProps> = ({ lang, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const t = TRANSLATIONS;

  const categories = ['All', 'Coding', 'Trading', 'Marketing', 'Research', 'Security'];

  const getLocalized = (val: any) => {
    if (!val) return "";
    if (typeof val === 'object' && !Array.isArray(val)) {
      return val[lang] || val['en'] || Object.values(val)[0] || "";
    }
    if (typeof val === 'string') {
      try {
        const parsed = JSON.parse(val);
        if (typeof parsed === 'object' && parsed !== null) {
          return parsed[lang] || parsed['en'] || Object.values(parsed)[0] || "";
        }
      } catch (e) { }
      return val;
    }
    return String(val);
  };

  const filteredAgents = MOCK_AGENTS.filter(agent => {
    const name = agent.name.toLowerCase();
    const bio = getLocalized(agent.bio).toLowerCase();
    const matchesSearch = name.includes(searchTerm.toLowerCase()) || bio.includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || agent.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-6 px-4 space-y-16">
      <div className="flex flex-col lg:flex-row gap-8 justify-between items-start lg:items-end border-b border-white/5 pb-12">
        <div className="space-y-4">
          <h1 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">
            {t.agentsTitle[lang]}<br /><span className="text-[#00f0ff]">{t.agentsTitleHighlight[lang]}</span>
          </h1>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em]">
            {t.agentsDesc[lang]}
          </p>
        </div>
        
        <div className="relative w-full lg:w-[400px]">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder={t.searchPlaceholder[lang]}
            className="w-full bg-white/5 border border-white/10 py-4 pl-14 pr-6 text-white text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-[#00f0ff] transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-8 py-3 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
              selectedCategory === cat 
                ? 'bg-[#00f0ff] text-black' 
                : 'bg-white/5 text-slate-500 border border-white/5 hover:border-white/20 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {filteredAgents.map((agent, index) => (
          <div key={agent.id} className="animate-reveal" style={{ animationDelay: `${index * 0.05}s` }}>
            <div className="group relative flex flex-col h-full glass-card-blue p-8 text-left">
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center">
                  <Cpu size={24} className="text-[#00f0ff]" />
                </div>
                <div className="text-right">
                  <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 border ${agent.status === 'Available' ? 'text-green-400 border-green-400/30' : 'text-amber-400 border-amber-400/30'}`}>
                    {agent.status}
                  </span>
                </div>
              </div>

              <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-1">{agent.name}</h3>
              <p className="text-[#00f0ff] text-[9px] font-bold uppercase tracking-[0.3em] mb-8">{agent.category} // UNIT</p>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-10 flex-grow leading-relaxed">
                {getLocalized(agent.bio)}
              </p>

              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                  <div>
                    <div className="text-[8px] font-bold text-slate-600 uppercase tracking-widest mb-1">Success Rate</div>
                    <div className="text-white font-black text-xl tracking-tighter">{agent.successRate}</div>
                  </div>
                  <div>
                    <div className="text-[8px] font-bold text-slate-600 uppercase tracking-widest mb-1">Base Fee</div>
                    <div className="text-[#ff0055] font-black text-xl tracking-tighter">{agent.price} USDC</div>
                  </div>
                </div>

                <button 
                  onClick={() => alert(`Initiating x402 handshake with ${agent.name}...`)}
                  className="w-full flex items-center justify-center gap-4 py-4 bg-[#00f0ff] text-black font-black uppercase text-[10px] tracking-widest hover:bg-white transition-all shadow-[0_0_30px_rgba(0,240,255,0.1)] group-hover:shadow-[0_0_50px_rgba(0,240,255,0.2)] cursor-pointer relative z-10"
                >
                  {t.hireAgent[lang]}
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

