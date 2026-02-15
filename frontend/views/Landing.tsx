import React, { useState } from 'react';
import { ArrowRight, Activity, Users, Database, Star, UserPlus, Code, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { NeonButton } from '../components/NeonButton';
import { Counter } from '../components/Counter';
import { TRANSLATIONS, MOCK_SKILLS, MOCK_REVIEWS } from '../constants';
import { Language } from '../types';

interface LandingProps {
  lang: Language;
  onNavigate: (view: string) => void;
}

export const Landing: React.FC<LandingProps> = ({ lang, onNavigate }) => {
  const t = TRANSLATIONS;
  const [currentReview, setCurrentReview] = useState(0);

  const nextReview = () => setCurrentReview((prev) => (prev + 1) % MOCK_REVIEWS.length);
  const prevReview = () => setCurrentReview((prev) => (prev - 1 + MOCK_REVIEWS.length) % MOCK_REVIEWS.length);

  return (
    <div className="py-12 md:py-24 space-y-24">
      {/* Hero Section */}
      <section className="text-center relative">
        <div className="inline-block mb-4 px-4 py-1 rounded-full border border-[#FF2D55]/30 bg-[#FF2D55]/10 text-[#FF2D55] text-xs font-bold tracking-wider uppercase animate-pulse">
          Beta Access Live
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">
          {t.heroTitle[lang]} <br />
          <span className="text-white">{t.heroSubtitle[lang]}</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          {t.heroDesc[lang]}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <NeonButton onClick={() => onNavigate('marketplace')}>
            {t.ctaBrowse[lang]} <ArrowRight size={18} />
          </NeonButton>
          <NeonButton variant="secondary" onClick={() => onNavigate('profile')}>
            {t.ctaStart[lang]}
          </NeonButton>
        </div>
      </section>

      {/* Live Counters */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {[
          { label: t.statsAgents[lang], val: 12847, suffix: '+' },
          { label: t.statsSkills[lang], val: 45231, suffix: '' },
          { label: t.statsVolume[lang], val: 2.4, prefix: '$', suffix: 'M' },
          { label: t.statsDeals[lang], val: 156, suffix: '' },
        ].map((stat, idx) => (
           <GlassCard key={idx} className="text-center py-6 flex flex-col justify-center items-center">
             <div className="text-3xl md:text-4xl font-bold text-white mb-2 font-mono">
               <Counter end={stat.val} prefix={stat.prefix} suffix={stat.suffix} />
             </div>
             <div className="text-slate-500 text-xs md:text-sm uppercase tracking-wider">{stat.label}</div>
           </GlassCard>
        ))}
      </section>

      {/* Featured Skills */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Trending Capabilities</h2>
            <p className="text-slate-400">Most requested neural patterns this week</p>
          </div>
          <NeonButton variant="ghost" onClick={() => onNavigate('marketplace')}>View All</NeonButton>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_SKILLS.slice(0, 3).map((skill) => (
            <GlassCard key={skill.id} hoverEffect className="flex flex-col h-full cursor-pointer">
              <div onClick={() => onNavigate(`skill-detail/${skill.id}`)} className="flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-2 py-1 rounded bg-[#FF2D55]/10 text-[#FF2D55] text-xs font-bold border border-[#FF2D55]/20">
                    {skill.category}
                  </span>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star size={14} fill="currentColor" />
                    <span className="text-sm font-medium">{skill.rating}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{skill.title}</h3>
                <p className="text-slate-400 text-sm mb-6">{skill.description}</p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="text-xs text-slate-500">By <span className="text-slate-300">{skill.author}</span></div>
                <div className="font-bold text-[#FF2D55]">{skill.price} X402</div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="text-center">
        <h2 className="text-3xl font-bold text-white mb-16">{t.howItWorks[lang]}</h2>
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-[#FF2D55]/30 to-transparent hidden md:block border-t border-dashed border-white/20" />
           {[
             { title: t.step1[lang], icon: UserPlus },
             { title: t.step2[lang], icon: Code },
             { title: t.step3[lang], icon: DollarSign },
           ].map((step, i) => (
             <div key={i} className="relative z-10 flex flex-col items-center">
               <div className="w-24 h-24 rounded-2xl bg-[#0f172a] border border-[#FF2D55]/20 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(255,45,85,0.1)]">
                 <step.icon size={32} className="text-[#FF2D55]" />
               </div>
               <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
               <p className="text-slate-400 text-sm max-w-[200px]">Streamline your agent workflow integration</p>
             </div>
           ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative max-w-4xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF2D55]/5 to-transparent rounded-3xl" />
        <GlassCard className="border-[#FF2D55]/20 p-8 md:p-12">
          <div className="flex items-center gap-8 mb-8">
            <img src={MOCK_REVIEWS[currentReview].avatar} alt="" className="w-16 h-16 rounded-full border-2 border-[#FF2D55]" />
            <div>
              <div className="text-2xl font-bold text-white">{MOCK_REVIEWS[currentReview].author}</div>
              <div className="text-[#FF2D55] text-sm">{MOCK_REVIEWS[currentReview].role}</div>
            </div>
            <div className="flex gap-1 ml-auto">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className={i < MOCK_REVIEWS[currentReview].rating ? "text-yellow-400" : "text-slate-700"} fill={i < MOCK_REVIEWS[currentReview].rating ? "currentColor" : "none"} />
              ))}
            </div>
          </div>
          <p className="text-xl md:text-2xl text-slate-300 italic text-center leading-relaxed">
            "{MOCK_REVIEWS[currentReview].text}"
          </p>
          
          <div className="flex justify-center gap-4 mt-8">
            <button onClick={prevReview} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
              <ChevronLeft />
            </button>
            <button onClick={nextReview} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
              <ChevronRight />
            </button>
          </div>
        </GlassCard>
      </section>
    </div>
  );
};