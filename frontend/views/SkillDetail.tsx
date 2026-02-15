import React, { useEffect, useState } from 'react';
import { ArrowLeft, Star, Download, Share2, ShoppingCart, User, Activity, Cpu, Loader2 } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { NeonButton } from '../components/NeonButton';
import { Skill, Language } from '../types';
import { getSkill } from '../client';

interface SkillDetailProps {
  skillId: string;
  onBack: () => void;
  onBuy: (skill: Skill) => void;
  lang: Language;
}

export const SkillDetail: React.FC<SkillDetailProps> = ({ skillId, onBack, onBuy, lang }) => {
  const [skill, setSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        setLoading(true);
        const data = await getSkill(skillId);
        setSkill(data);
      } catch (err) {
        console.error('Failed to fetch skill:', err);
        setError('Failed to load skill details.');
      } finally {
        setLoading(false);
      }
    };
    fetchSkill();
  }, [skillId]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin text-[#FF2D55]" size={48} />
      </div>
    );
  }

  if (error || !skill) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-white mb-4">Skill Not Found</h2>
        <button onClick={onBack} className="text-[#FF2D55] hover:underline">
          Back to Market
        </button>
      </div>
    );
  }

  return (
    <div className="py-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
        <ArrowLeft size={16} /> Back to Market
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-8">
          <GlassCard className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="px-3 py-1 rounded bg-[#FF2D55]/10 text-[#FF2D55] text-xs font-bold border border-[#FF2D55]/20 mb-3 inline-block">
                  {skill.category}
                </span>
                <h1 className="text-4xl font-bold text-white mb-2">{skill.title}</h1>
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1 text-yellow-400">
                    <Star size={16} fill="currentColor" /> {skill.rating} ({skill.reviews?.length || 0} reviews)
                  </span>
                  <span className="flex items-center gap-1">
                    <Download size={16} /> {skill.downloads} downloads
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-[#FF2D55] mb-1">{skill.price} X402</div>
                <div className="text-sm text-slate-500">≈ ${(skill.price * 0.15).toFixed(2)} USD</div>
              </div>
            </div>

            <p className="text-lg text-slate-300 leading-relaxed mb-8">{skill.description}</p>

            <div className="flex gap-4">
              <NeonButton onClick={() => onBuy(skill)} className="flex-1">
                Buy Now
              </NeonButton>
              <NeonButton variant="secondary">
                <ShoppingCart size={18} /> Add to Cart
              </NeonButton>
              <NeonButton variant="ghost">
                <Share2 size={18} />
              </NeonButton>
            </div>
          </GlassCard>

          {/* Technical Specs */}
          {skill.specs && (
            <GlassCard>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Cpu size={20} className="text-[#FF2D55]" /> Technical Specifications
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(skill.specs).map(([key, value]) => (
                  <div key={key} className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <div className="text-slate-500 text-xs uppercase tracking-wider mb-1">{key}</div>
                    <div className="text-white font-mono">{value}</div>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {/* Reviews */}
          {skill.reviews && skill.reviews.length > 0 && (
            <GlassCard>
              <h3 className="text-xl font-bold text-white mb-6">Agent Reviews</h3>
              <div className="space-y-6">
                {skill.reviews.map(review => (
                  <div key={review.id} className="border-b border-white/5 pb-6 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <img src={review.avatar} alt="" className="w-10 h-10 rounded-full" />
                        <div>
                          <div className="font-bold text-white">{review.author}</div>
                          <div className="text-xs text-[#FF2D55]">{review.role}</div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className={i < review.rating ? "text-yellow-400" : "text-slate-700"} fill={i < review.rating ? "currentColor" : "none"} />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-400 text-sm">{review.text}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <GlassCard>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Author</h3>
            <div className="flex items-center gap-4 mb-4">
               <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500">
                 <User size={24} />
               </div>
               <div>
                 <div className="font-bold text-white">{skill.author}</div>
                 <div className="text-xs text-green-400 flex items-center gap-1">
                   <Activity size={10} /> Online
                 </div>
               </div>
            </div>
            <NeonButton variant="secondary" fullWidth className="text-sm">View Profile</NeonButton>
          </GlassCard>

          <GlassCard>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {skill.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-slate-300 text-xs border border-white/10">
                  #{tag}
                </span>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
