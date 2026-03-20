import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface Props {
  onComplete: (address: string) => void;
  lang: 'ru' | 'en';
  mode: 'connect' | 'deploy';
}

export default function WalletOverlay({ onComplete, lang, mode }: Props) {
  const [lines, setLines] = useState<string[]>([]);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    setGlitch(true);
    setTimeout(() => setGlitch(false), 200);
    setTimeout(() => setGlitch(true), 400);
    setTimeout(() => setGlitch(false), 500);

    const sequenceConnect = lang === 'ru' ? [
      { text: "> Инициализация Web3 Провайдера...", delay: 600 },
      { text: "> Запрос подписи...", delay: 1200 },
      { text: "> Расшифровка подписи...", delay: 2000 },
      { text: "> Проверка смарт-контракта...", delay: 2800 },
      { text: "> Доступ разрешен. Добро пожаловать, 0x7F...9A2B", delay: 3500 }
    ] : [
      { text: "> Initializing Web3 Provider...", delay: 600 },
      { text: "> Requesting signature...", delay: 1200 },
      { text: "> Decrypting signature...", delay: 2000 },
      { text: "> Verifying smart contract...", delay: 2800 },
      { text: "> Access Granted. Welcome, 0x7F...9A2B", delay: 3500 }
    ];

    const sequenceDeploy = lang === 'ru' ? [
      { text: "> Формирование транзакции...", delay: 600 },
      { text: "> Ожидание подтверждения в кошельке...", delay: 1200 },
      { text: "> Транзакция подписана. Отправка в сеть...", delay: 2000 },
      { text: "> Развертывание смарт-контракта отряда...", delay: 2800 },
      { text: "> Отряд успешно развернут. Инициализация Uplink...", delay: 3500 }
    ] : [
      { text: "> Building transaction...", delay: 600 },
      { text: "> Waiting for wallet confirmation...", delay: 1200 },
      { text: "> Transaction signed. Broadcasting to network...", delay: 2000 },
      { text: "> Deploying squad smart contract...", delay: 2800 },
      { text: "> Squad deployed successfully. Initializing Uplink...", delay: 3500 }
    ];

    const sequence = mode === 'connect' ? sequenceConnect : sequenceDeploy;

    let timer: NodeJS.Timeout;
    sequence.forEach((item, i) => {
      timer = setTimeout(() => {
        setLines(prev => [...prev, item.text]);
        if (i === sequence.length - 1) {
          // Play audio sample
          try {
            const audio = new Audio('https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg');
            audio.volume = 0.2;
            audio.play().catch(() => {});
          } catch (e) {}
          setTimeout(() => onComplete("0x7F...9A2B"), 1500);
        }
      }, item.delay);
    });

    return () => clearTimeout(timer);
  }, [onComplete, lang, mode]);

  return (
    <div className={`fixed inset-0 z-[200] bg-cyber-black flex items-center justify-center ${glitch ? 'animate-[glitch-anim_0.1s_linear_infinite]' : ''}`}>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-10 pointer-events-none mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none opacity-50"></div>
      
      <div className="w-full max-w-2xl p-8 border border-cyber-green/30 bg-cyber-graphite/80 backdrop-blur-md shadow-[0_0_50px_rgba(0,255,65,0.1)]">
        <div className="flex items-center mb-6 border-b border-cyber-green/30 pb-4">
          <div className="w-3 h-3 rounded-full bg-cyber-red/80 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-cyber-green/80 mr-4"></div>
          <div className="font-mono text-cyber-green text-sm tracking-widest">SECURE_UPLINK.EXE</div>
        </div>
        
        <div className="font-mono text-lg space-y-2 min-h-[200px]">
          {lines.map((line, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={i === lines.length - 1 ? "text-cyber-green font-bold" : "text-cyber-muted"}
            >
              {line}
            </motion.div>
          ))}
          <div className="flex items-center mt-2">
            <span className="text-cyber-green mr-2">&gt;</span>
            <span className="w-3 h-6 bg-cyber-green animate-pulse inline-block"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
