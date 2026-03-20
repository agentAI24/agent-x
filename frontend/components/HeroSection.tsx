import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import GlitchText from './GlitchText';

interface Props {
  onConnect: () => void;
  isConnected: boolean;
  lang: 'ru' | 'en';
}

export default function HeroSection({ onConnect, isConnected, lang }: Props) {
  const [typedText, setTypedText] = useState('');
  const fullText = lang === 'ru' ? "НАНИМАЙ ИИ.\nА НЕ ЛЮДЕЙ." : "HIRE AI.\nNOT PEOPLE.";

  useEffect(() => {
    setTypedText('');
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [fullText]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20 pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-cyber-blue blur-[150px]"></div>
      </div>

      <div className="z-10 max-w-5xl mx-auto w-full flex flex-col items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <span className="text-cyber-green font-mono text-sm tracking-widest uppercase">
            &gt; {lang === 'ru' ? 'Система инициализирована...' : 'System initialized...'}
          </span>
        </motion.div>

        <h1 className="text-6xl md:text-8xl lg:text-9xl font-mono font-bold text-white leading-none tracking-tighter mb-8 whitespace-pre-line">
          <GlitchText text={typedText} />
          <span className="animate-pulse text-cyber-green">_</span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-cyber-muted text-lg md:text-2xl max-w-2xl mb-12 font-sans"
        >
          {lang === 'ru' 
            ? 'Полностью автономные цифровые сотрудники. Не спят. Не ноют. Дают результат.' 
            : 'Fully autonomous digital employees. They don\'t sleep. They don\'t complain. They deliver results.'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <button 
            onClick={onConnect}
            disabled={isConnected}
            className={`group relative px-8 py-4 bg-transparent border ${isConnected ? 'border-cyber-green text-cyber-green' : 'border-cyber-blue text-cyber-blue'} font-mono text-lg uppercase tracking-widest overflow-hidden transition-all ${isConnected ? '' : 'hover:bg-cyber-blue hover:text-cyber-black glitch-hover'}`}
          >
            <span className="relative z-10">
              {isConnected 
                ? (lang === 'ru' ? '[ СВЯЗЬ УСТАНОВЛЕНА ]' : '[ UPLINK ESTABLISHED ]')
                : (lang === 'ru' ? '[ ИНИЦИАЛИЗАЦИЯ СВЯЗИ / ПОДКЛЮЧИТЬ КОШЕЛЕК ]' : '[ INITIALIZE UPLINK / CONNECT WALLET ]')}
            </span>
            {!isConnected && <div className="absolute inset-0 bg-cyber-blue opacity-0 group-hover:opacity-20 transition-opacity"></div>}
          </button>
        </motion.div>
      </div>
      
      {/* Abstract Data Silhouette Placeholder - Main Architect */}
      <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-20 pointer-events-none hidden lg:flex items-end justify-end">
        <svg viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-h-[800px] object-contain object-bottom animate-[spin_60s_linear_infinite]">
          {/* 3D Hologram of Main Architect */}
          <g transform="translate(200, 300)">
            <path fill="none" stroke="#00F0FF" strokeWidth="1" d="M0,-200 L100,-100 L150,0 L100,100 L0,200 L-100,100 L-150,0 L-100,-100 Z" />
            <path fill="none" stroke="#00F0FF" strokeWidth="0.5" d="M0,-200 L0,200 M-150,0 L150,0 M-100,-100 L100,100 M-100,100 L100,-100" />
            <circle cx="0" cy="0" r="50" fill="none" stroke="#00F0FF" strokeWidth="2" strokeDasharray="5 5" />
            <circle cx="0" cy="0" r="100" fill="none" stroke="#00F0FF" strokeWidth="1" strokeDasharray="2 10" />
            <circle cx="0" cy="0" r="5" fill="#00F0FF" />
            <circle cx="100" cy="-100" r="3" fill="#00F0FF" />
            <circle cx="-100" cy="100" r="3" fill="#00F0FF" />
            <circle cx="150" cy="0" r="3" fill="#00F0FF" />
            <circle cx="-150" cy="0" r="3" fill="#00F0FF" />
          </g>
        </svg>
      </div>
    </section>
  );
}
