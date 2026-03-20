import React from 'react';
import { Cpu, Shield, Zap, Wallet } from 'lucide-react';
import { Language } from '../types';
import { ConnectButton } from 'thirdweb/react';
import { client } from '../thirdweb';

interface AuthProps {
  lang: Language;
  onNavigate: (view: string) => void;
}

export const Auth: React.FC<AuthProps> = ({ lang, onNavigate }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative">
      {/* Background effects */}
      <div className="fixed inset-0 cyber-grid pointer-events-none opacity-10"></div>
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#05d9e8]/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#ff2a6d]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-white flex items-center justify-center shadow-[4px_4px_0px_#ff2a6d]">
              <span className="font-black text-black text-2xl italic">X</span>
            </div>
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tighter italic text-white mb-2">
            {lang === 'ru' ? 'Подключение' : 'Connect'}
          </h1>
          <p className="text-slate-500 text-xs uppercase tracking-[0.3em] font-bold">
            {lang === 'ru' ? 'Подключите кошелёк для доступа к системе' : 'Connect your wallet to access the system'}
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#05d9e8]/30 to-transparent"></div>

          {/* Features */}
          <div className="space-y-4 mb-8">
            {[
              {
                icon: <Wallet size={16} className="text-[#05d9e8]" />,
                title: lang === 'ru' ? 'Без паролей' : 'No passwords',
                desc: lang === 'ru' ? 'Ваш кошелёк — ваша идентичность' : 'Your wallet is your identity'
              },
              {
                icon: <Shield size={16} className="text-[#ff2a6d]" />,
                title: lang === 'ru' ? 'Полный контроль' : 'Full control',
                desc: lang === 'ru' ? 'Только вы управляете своими средствами' : 'Only you control your funds'
              },
              {
                icon: <Zap size={16} className="text-[#05d9e8]" />,
                title: lang === 'ru' ? 'Мгновенный доступ' : 'Instant access',
                desc: lang === 'ru' ? 'Подключи и начинай работу' : 'Connect and start working'
              },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-white/5 border border-white/5">
                <div className="w-8 h-8 flex items-center justify-center bg-white/5 border border-white/10 shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <div className="text-[10px] font-black text-white uppercase tracking-wider">{feature.title}</div>
                  <div className="text-[9px] text-slate-500 uppercase tracking-widest">{feature.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Thirdweb Connect Button */}
          <div className="flex justify-center">
            <ConnectButton client={client} />
          </div>

          {/* Supported wallets hint */}
          <div className="mt-6 pt-4 border-t border-white/5 text-center">
            <p className="text-[9px] text-slate-600 font-bold uppercase tracking-[0.2em]">
              {lang === 'ru' ? 'Поддерживаемые кошельки' : 'Supported wallets'}
            </p>
            <p className="text-[9px] text-slate-500 mt-1">
              MetaMask • Coinbase • WalletConnect • Rainbow
            </p>
          </div>
        </div>

        {/* Security badge */}
        <div className="flex items-center justify-center gap-2 mt-6 text-[9px] text-slate-600 font-bold uppercase tracking-[0.3em]">
          <Cpu size={10} />
          {lang === 'ru' ? 'Зашифрованный нейронный протокол' : 'Encrypted Neural Handshake Protocol'}
        </div>
      </div>
    </div>
  );
};

