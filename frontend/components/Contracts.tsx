import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import GlitchText from './GlitchText';

function RunningNumber({ target }: { target: string }) {
  const [display, setDisplay] = useState(target);
  const chars = '0123456789$#@%';
  
  useEffect(() => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplay(target.split('').map((char, i) => {
        if (char === ' ' || char === '/') return char;
        if (i < iterations) return target[i];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(''));
      if (iterations >= target.length) clearInterval(interval);
      iterations += 1/3;
    }, 30);
    return () => clearInterval(interval);
  }, [target]);
  
  return <span>{display}</span>;
}

export default function Contracts() {
  const plans = [
    {
      id: "SOLO",
      name: "SOLO CONTRACT",
      desc: "Одиночный наемник для точечных задач",
      price: "$499/mo",
      color: "border-cyber-green text-cyber-green",
      bg: "bg-cyber-green/5",
      features: ["1 AI-Агент", "Базовая интеграция", "Доступ к базе знаний", "Поддержка 24/7"]
    },
    {
      id: "SQUAD",
      name: "SQUAD CONTRACT",
      desc: "Боевая тройка. Синхронизация 100%",
      price: "$1299/mo",
      color: "border-cyber-blue text-cyber-blue",
      bg: "bg-cyber-blue/10",
      features: ["3 AI-Агента", "Оркестратор", "Интеграция с CRM", "Кастомные промпты", "Аналитика"]
    },
    {
      id: "CORP",
      name: "CORP SYNDICATE",
      desc: "Полная интеграция. Свои сервера. Безлимит",
      price: "CALL US",
      color: "border-cyber-red text-cyber-red",
      bg: "bg-cyber-red/10",
      features: ["Неограниченно Агентов", "On-Premise", "Полная приватность", "Персональный менеджер", "SLA 99.9%"]
    }
  ];

  return (
    <section className="py-24 px-6 relative z-10 bg-cyber-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-white mb-16 uppercase tracking-tighter">
            <span className="text-cyber-red">//</span> <GlitchText text="Contracts" />
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 group/board">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className={`relative group/card transition-all duration-500 hover:scale-105 hover:z-20 opacity-100 group-hover/board:opacity-40 hover:!opacity-100`}
              >
                {/* Datapad Physical Casing */}
                <div className={`border-4 ${plan.color.split(' ')[0]} bg-cyber-graphite p-2 rounded-sm shadow-[0_0_20px_rgba(0,0,0,0.5)] h-full flex flex-col`}>
                  
                  {/* Datapad Screen */}
                  <div className="relative bg-black h-full p-6 flex flex-col border border-cyber-muted/30 overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
                    
                    {/* Screen Glow & Scanlines */}
                    <div className={`absolute inset-0 ${plan.bg} opacity-10 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none opacity-50"></div>

                    {/* Header */}
                    <div className="flex justify-between items-start mb-8 relative z-10">
                      <h3 className={`text-2xl font-mono font-bold uppercase tracking-tight ${plan.color.split(' ')[1]}`}>
                        <GlitchText text={plan.name} />
                      </h3>
                      {plan.id === "CORP" && (
                        <div className="text-[10px] font-mono text-cyber-red border border-cyber-red px-2 py-1 uppercase animate-pulse">
                          Warning
                        </div>
                      )}
                    </div>

                    <p className="text-cyber-muted font-sans text-sm mb-8 relative z-10 min-h-[40px]">
                      {plan.desc}
                    </p>

                    {/* Price with Running Numbers */}
                    <div className={`text-4xl font-mono font-bold mb-8 relative z-10 ${plan.id === "CORP" ? "text-cyber-red" : "text-white"}`}>
                      <RunningNumber target={plan.price} />
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 mb-12 flex-grow relative z-10">
                      {plan.features.map((feature, j) => (
                        <li key={j} className="flex items-center text-sm font-mono text-cyber-text">
                          <span className={`mr-3 ${plan.color.split(' ')[1]}`}>&gt;</span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Action Button */}
                    <button className={`w-full py-4 border ${plan.color} ${plan.color.split(' ')[1]} font-mono text-lg uppercase tracking-widest hover:bg-white/10 transition-colors relative z-10 glitch-hover`}>
                      [ SIGN CONTRACT ]
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
