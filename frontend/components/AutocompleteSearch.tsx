import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock } from 'lucide-react';
import { SEARCH_SUGGESTIONS, TRANSLATIONS } from '../constants';
import { Language } from '../types';

interface AutocompleteSearchProps {
  onSearch: (term: string) => void;
  placeholder?: string;
  lang: Language;
}

export const AutocompleteSearch: React.FC<AutocompleteSearchProps> = ({ onSearch, placeholder, lang }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (term: string) => {
    setQuery(term);
    onSearch(term);
    setIsOpen(false);
    
    if (term.trim() && !history.includes(term)) {
      const newHistory = [term, ...history].slice(0, 5);
      setHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    }
  };

  const suggestions = SEARCH_SUGGESTIONS.filter(s => 
    s.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div ref={wrapperRef} className="relative w-full md:w-96 z-40">
      <div className="relative">
        <input 
          type="text" 
          placeholder={placeholder || TRANSLATIONS.marketSearchPlaceholder[lang]}
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch(e.target.value);
            setIsOpen(true);
          }}
          className="w-full bg-[#0f172a] border border-white/20 rounded-xl py-3 pl-12 pr-10 text-white focus:outline-none focus:border-[#FF2D55] focus:ring-1 focus:ring-[#FF2D55] placeholder-slate-500 transition-all"
        />
        <Search className="absolute left-4 top-3.5 text-slate-500" size={18} />
        {query && (
          <button 
            onClick={() => handleSearch('')}
            className="absolute right-3 top-3.5 text-slate-500 hover:text-white"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {isOpen && (query || history.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#020617] border border-white/10 rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl">
          {history.length > 0 && !query && (
            <div className="py-2">
              <div className="px-4 py-1 text-xs font-bold text-slate-500 uppercase">Recent</div>
              {history.map((term, i) => (
                <button
                  key={i}
                  onClick={() => handleSearch(term)}
                  className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-white/5 flex items-center gap-2"
                >
                  <Clock size={14} className="text-slate-500" />
                  {term}
                </button>
              ))}
            </div>
          )}
          
          {suggestions.length > 0 && (
             <div className="py-2 border-t border-white/5">
              <div className="px-4 py-1 text-xs font-bold text-slate-500 uppercase">Suggestions</div>
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSearch(s)}
                  className="w-full text-left px-4 py-2 text-sm text-white hover:bg-[#FF2D55]/10 hover:text-[#FF2D55]"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};