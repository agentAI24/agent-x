import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, Zap, Box, User, Terminal, HelpCircle, Briefcase } from 'lucide-react';
import { WalletButton } from './WalletButton';
import { Language } from '../types';
import { supabase } from '../lib/supabase';

interface LayoutProps {
  children: React.ReactNode;
  currentView: string;
  onChangeView: (view: string) => void;
  lang: Language;
  toggleLang: () => void;
  wallet: { isConnected: boolean; address: string | null; balance: string | null };
  onConnectWallet: () => void;
  onDisconnectWallet: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  currentView, 
  onChangeView,
  lang,
  toggleLang,
  wallet
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.from('profiles').select('role').eq('id', user.id).single();
      if (data?.role === 'admin') setIsAdmin(true);
    };
    checkAdmin();
  }, [wallet.isConnected]);

  const activeNavId = currentView.startsWith('skill-detail') ? 'marketplace' : currentView;

  const navItems = [
    { id: 'landing', label: { en: 'Home', ru: 'Главная' }, icon: Zap },
    { id: 'marketplace', label: { en: 'Marketplace', ru: 'Маркет' }, icon: Box },
    { id: 'jobs', label: { en: 'Jobs', ru: 'Биржа' }, icon: Briefcase },
    { id: 'faq', label: { en: 'FAQ', ru: 'Помощь' }, icon: HelpCircle },
    { id: 'api', label: { en: 'API', ru: 'API' }, icon: Terminal },
  ];

  return (
    <div className="min-h-screen relative flex flex-col font-sans text-slate-200">
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#FF2D55] opacity-[0.08] blur-[120px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600 opacity-[0.05] blur-[150px] rounded-full"></div>
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => onChangeView('landing')}>
              <div className="w-8 h-8 rounded-lg bg-[#FF2D55] flex items-center justify-center shadow-[0_0_15px_#FF2D55]">
                <span className="font-bold text-white text-lg">X</span>
              </div>
              <span className="text-2xl font-bold tracking-tighter text-white group-hover:text-white/90 transition-colors">
                AGENT<span className="text-[#FF2D55]">X</span>
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onChangeView(item.id)}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    activeNavId === item.id ? 'text-[#FF2D55]' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <item.icon size={16} />
                  {item.label[lang]}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button onClick={toggleLang} className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-white uppercase border border-white/10 px-2 py-1 rounded-md">
                <Globe size={12} /> {lang}
              </button>
              
              <WalletButton isConnected={wallet.isConnected} address={wallet.address} balance={wallet.balance} onConnect={() => {}} onDisconnect={() => {}} lang={lang} />
              
              {isAdmin && (
                <button onClick={() => onChangeView('admin')} className="p-2 text-slate-400 hover:text-[#FF2D55] transition-colors" title="Admin Panel">
                  <User size={18} />
                </button>
              )}
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-300 hover:text-white p-2">
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#020617] border-b border-white/10 absolute w-full z-50">
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { onChangeView(item.id); setIsMobileMenuOpen(false); }}
                  className={`flex items-center gap-3 w-full p-3 rounded-lg ${activeNavId === item.id ? 'bg-[#FF2D55]/10 text-[#FF2D55]' : 'text-slate-300'}`}
                >
                  <item.icon size={18} />
                  {item.label[lang]}
                </button>
              ))}
              {isAdmin && (
                <button onClick={() => { onChangeView('admin'); setIsMobileMenuOpen(false); }} className="flex items-center gap-3 w-full p-3 rounded-lg text-slate-300">
                   <User size={18} /> Admin Panel
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full z-10">
        {children}
      </main>

      <footer className="border-t border-white/5 bg-[#020617]/50 mt-20 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-500 text-sm">
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded bg-[#FF2D55] flex items-center justify-center text-xs text-white font-bold">X</div>
            <span className="font-semibold text-slate-300">AGENT X</span>
          </div>
          <p>&copy; 2026 AGENT X Protocol. Experimental Build.</p>
        </div>
      </footer>
    </div>
  );
};
