import React from 'react';
import { User, QrCode, CreditCard, Clock, ChevronRight, Settings } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { NeonButton } from '../components/NeonButton';
import { MOCK_AGENT, MOCK_TRANSACTIONS, TRANSLATIONS } from '../constants';
import { Language } from '../types';

interface ProfileProps {
  lang: Language;
}

export const Profile: React.FC<ProfileProps> = ({ lang }) => {
  return (
    <div className="py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column: Profile Info & Wallet */}
      <div className="space-y-8">
        {/* Identity Card */}
        <GlassCard className="text-center relative">
          <div className="absolute top-4 right-4 text-slate-500 hover:text-white cursor-pointer">
            <Settings size={20} />
          </div>
          <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-gradient-to-br from-[#FF2D55] to-purple-600 p-1">
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                <User size={40} className="text-slate-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">{MOCK_AGENT.name}</h2>
          <p className="text-sm text-[#FF2D55] mb-4">Autonomous Trading Unit</p>
          <p className="text-slate-400 text-sm mb-6 px-4">{MOCK_AGENT.bio}</p>
          <div className="flex justify-center gap-4 text-sm">
             <div className="flex flex-col">
                <span className="font-bold text-white">12</span>
                <span className="text-slate-500 text-xs">Skills</span>
             </div>
             <div className="flex flex-col">
                <span className="font-bold text-white">850</span>
                <span className="text-slate-500 text-xs">Sales</span>
             </div>
             <div className="flex flex-col">
                <span className="font-bold text-white">4.9</span>
                <span className="text-slate-500 text-xs">Rating</span>
             </div>
          </div>
        </GlassCard>

        {/* X402 Wallet */}
        <GlassCard className="bg-gradient-to-br from-[#0f172a] to-[#FF2D55]/10 border-[#FF2D55]/30">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-sm text-slate-400 mb-1">{TRANSLATIONS.walletBalance[lang]}</p>
              <h3 className="text-3xl font-bold text-white font-mono tracking-tight">
                {MOCK_AGENT.balance.toLocaleString()} <span className="text-[#FF2D55] text-lg">X402</span>
              </h3>
            </div>
            <div className="bg-white p-2 rounded-lg">
              <QrCode className="text-black" size={32} />
            </div>
          </div>
          <div className="space-y-3">
             <NeonButton fullWidth>Deposit Funds</NeonButton>
             <NeonButton variant="secondary" fullWidth>Withdraw</NeonButton>
          </div>
          <div className="mt-4 pt-4 border-t border-white/10 text-xs text-center text-slate-500">
            Network Status: <span className="text-green-500">Online</span> • Block: #849201
          </div>
        </GlassCard>
      </div>

      {/* Right Column: Content */}
      <div className="lg:col-span-2 space-y-8">
        
        {/* Purchased Skills */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
             <h3 className="text-xl font-bold text-white">My Library</h3>
             <button className="text-sm text-[#FF2D55]">View All</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {MOCK_AGENT.purchases.map(skill => (
               <GlassCard key={skill.id} className="p-4 flex gap-4 items-center">
                 <div className="w-12 h-12 rounded bg-slate-800 flex items-center justify-center text-[#FF2D55]">
                   <CreditCard size={20} />
                 </div>
                 <div>
                   <h4 className="font-bold text-white text-sm">{skill.title}</h4>
                   <p className="text-xs text-slate-500">v1.2 • Updated yesterday</p>
                 </div>
               </GlassCard>
             ))}
          </div>
        </div>

        {/* Transaction History */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">{TRANSLATIONS.latestTrans[lang]}</h3>
          <div className="space-y-3">
            {MOCK_TRANSACTIONS.map((tx) => (
              <GlassCard key={tx.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    tx.type === 'buy' ? 'bg-red-500/20 text-red-500' : 
                    tx.type === 'sell' ? 'bg-green-500/20 text-green-500' : 
                    'bg-blue-500/20 text-blue-500'
                  }`}>
                    {tx.type === 'buy' ? <CreditCard size={18} /> : 
                     tx.type === 'sell' ? <Settings size={18} /> : 
                     <Clock size={18} />}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{tx.description}</p>
                    <p className="text-xs text-slate-500">{tx.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                   <span className={`font-mono font-bold ${
                     tx.amount > 0 ? 'text-green-500' : 'text-white'
                   }`}>
                     {tx.amount > 0 ? '+' : ''}{tx.amount} X402
                   </span>
                   <ChevronRight size={16} className="text-slate-600" />
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};