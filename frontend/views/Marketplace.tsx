import React, { useState, useEffect } from 'react';
import { Filter, Download, Loader2 } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { AutocompleteSearch } from '../components/AutocompleteSearch';
import { TRANSLATIONS } from '../constants';
import { Language, Skill } from '../types';
import { getSkills } from '../client';

interface MarketplaceProps {
  lang: Language;
  onNavigate: (view: string) => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({ lang, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const categories = ['All', 'NLP', 'Vision', 'Finance', 'Coding', 'Audio', 'Logic'];
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getSkills();
        setSkills(data);
      } catch (err) {
        console.error('Failed to fetch skills:', err);
        setError('Failed to load marketplace data. Is the backend running?');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          skill.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin text-[#FF2D55]" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-64 items-center justify-center flex-col gap-4 text-center">
        <p className="text-red-500 font-bold">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-white/10 rounded hover:bg-white/20 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="py-8 space-y-8">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{TRANSLATIONS.ctaBrowse[lang]}</h1>
          <p className="text-slate-400">Discover capabilities for your AI agents.</p>
        </div>
        
        <AutocompleteSearch onSearch={setSearchTerm} lang={lang} />
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat 
                ? 'bg-[#FF2D55] text-white shadow-[0_0_10px_#FF2D55]' 
                : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill) => (
          <GlassCard key={skill.id} hoverEffect className="flex flex-col group cursor-pointer">
            <div onClick={() => onNavigate(`skill-detail/${skill.id}`)} className="flex-grow flex flex-col">
              <div className="flex justify-between items-start mb-4">
                 <div className="bg-slate-800 p-2 rounded-lg border border-white/5 group-hover:border-[#FF2D55]/50 transition-colors">
                   <Filter size={20} className="text-[#FF2D55]" />
                 </div>
                 <div className="flex flex-col items-end">
                    <span className="text-[#FF2D55] font-bold text-lg">{skill.price} X402</span>
                    <div className="flex items-center text-xs text-slate-500 gap-1">
                      <Download size={12} /> {skill.downloads}
                    </div>
                 </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#FF2D55] transition-colors">{skill.title}</h3>
              <p className="text-slate-400 text-sm mb-4 line-clamp-2">{skill.description}</p>

              <div className="flex items-center gap-2 mb-6 mt-auto">
                 {skill.tags.map(tag => (
                   <span key={tag} className="text-[10px] uppercase tracking-wider text-slate-500 bg-white/5 px-2 py-1 rounded">
                     #{tag}
                   </span>
                 ))}
              </div>
            </div>
            
            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
               <div className="flex items-center gap-2">
                 <div className="w-6 h-6 rounded-full bg-slate-700"></div>
                 <span className="text-xs text-slate-300">{skill.author}</span>
               </div>
               <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate(`skill-detail/${skill.id}`);
                }}
                className="flex items-center gap-2 text-sm font-medium text-white bg-[#FF2D55]/80 hover:bg-[#FF2D55] px-4 py-2 rounded-lg transition-colors shadow-lg shadow-[#FF2D55]/20"
              >
                 {TRANSLATIONS.buyNow[lang]}
               </button>
            </div>
          </GlassCard>
        ))}
      </div>
      
      {filteredSkills.length === 0 && (
        <div className="text-center py-20 text-slate-500">
          No capabilities found matching your criteria.
        </div>
      )}
    </div>
  );
};
