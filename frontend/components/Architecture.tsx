import React from 'react';
import { motion } from 'motion/react';
import GlitchText from './GlitchText';

interface Props {
  lang: 'ru' | 'en';
}

export default function Architecture({ lang }: Props) {
  const nodes = lang === 'ru' ? [
    { id: 1, name: "Оркестратор", desc: "Нейро-ядро", x: "50%", y: "10%", color: "border-cyber-blue" },
    { id: 2, name: "API Шлюз", desc: "Общая Память", x: "20%", y: "50%", color: "border-cyber-purple" },
    { id: 3, name: "Агент 1", desc: "Кодер", x: "50%", y: "50%", color: "border-cyber-green" },
    { id: 4, name: "Агент 2", desc: "Дизайнер", x: "80%", y: "50%", color: "border-cyber-blue" },
    { id: 5, name: "Интеграция", desc: "Telegram, Docs", x: "50%", y: "90%", color: "border-cyber-red" },
  ] : [
    { id: 1, name: "Orchestrator", desc: "Neural Core", x: "50%", y: "10%", color: "border-cyber-blue" },
    { id: 2, name: "API Gateway", desc: "Shared Memory", x: "20%", y: "50%", color: "border-cyber-purple" },
    { id: 3, name: "Sub-Agent 1", desc: "Coder", x: "50%", y: "50%", color: "border-cyber-green" },
    { id: 4, name: "Sub-Agent 2", desc: "Designer", x: "80%", y: "50%", color: "border-cyber-blue" },
    { id: 5, name: "Integration", desc: "Telegram, Docs", x: "50%", y: "90%", color: "border-cyber-red" },
  ];

  return (
    <section className="py-24 px-6 relative z-10 bg-cyber-black overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-white mb-16 uppercase tracking-tighter">
            <span className="text-cyber-blue">//</span> <GlitchText text={lang === 'ru' ? "Неоновый Канал" : "Neon Pipeline"} />
          </h2>

          <div className="relative h-[600px] border border-cyber-muted/20 bg-cyber-graphite/30 backdrop-blur-sm rounded-sm p-8">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

            {/* SVG Lines */}
            <svg viewBox="0 0 1000 600" className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#B026FF" stopOpacity="0.8" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Paths */}
              <path id="path1" d="M 500 60 L 200 300" stroke="url(#grad1)" strokeWidth="2" fill="none" filter="url(#glow)" />
              <path id="path2" d="M 500 60 L 500 300" stroke="#00F0FF" strokeWidth="2" fill="none" filter="url(#glow)" />
              <path id="path3" d="M 500 60 L 800 300" stroke="#00F0FF" strokeWidth="2" fill="none" filter="url(#glow)" />
              <path id="path4" d="M 200 300 L 500 540" stroke="#B026FF" strokeWidth="2" fill="none" filter="url(#glow)" />
              <path id="path5" d="M 500 300 L 500 540" stroke="#00FF41" strokeWidth="2" fill="none" filter="url(#glow)" />
              <path id="path6" d="M 800 300 L 500 540" stroke="#00F0FF" strokeWidth="2" fill="none" filter="url(#glow)" />

              {/* Animated Data Packets */}
              <circle r="4" fill="#FFFFFF" filter="url(#glow)">
                <animateMotion dur="2s" repeatCount="indefinite"><mpath href="#path1" /></animateMotion>
              </circle>
              <circle r="4" fill="#FFFFFF" filter="url(#glow)">
                <animateMotion dur="1.5s" repeatCount="indefinite" begin="0.5s"><mpath href="#path2" /></animateMotion>
              </circle>
              <circle r="4" fill="#FFFFFF" filter="url(#glow)">
                <animateMotion dur="2.5s" repeatCount="indefinite" begin="1s"><mpath href="#path3" /></animateMotion>
              </circle>
              <circle r="4" fill="#FFFFFF" filter="url(#glow)">
                <animateMotion dur="1.8s" repeatCount="indefinite" begin="0.2s"><mpath href="#path4" /></animateMotion>
              </circle>
              <circle r="4" fill="#FFFFFF" filter="url(#glow)">
                <animateMotion dur="1.2s" repeatCount="indefinite" begin="0.8s"><mpath href="#path5" /></animateMotion>
              </circle>
              <circle r="4" fill="#FFFFFF" filter="url(#glow)">
                <animateMotion dur="2.2s" repeatCount="indefinite" begin="0.4s"><mpath href="#path6" /></animateMotion>
              </circle>
            </svg>

            {/* Nodes */}
            {nodes.map((node, i) => (
              <motion.div
                key={node.id}
                className={`absolute w-32 h-32 -ml-16 -mt-16 rounded-sm border ${node.color} bg-black/80 flex flex-col items-center justify-center cursor-crosshair group transition-all hover:scale-110 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] z-20`}
                style={{ left: node.x, top: node.y }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                data-interactive="true"
              >
                <div className="text-xs font-mono text-cyber-muted mb-1 uppercase tracking-widest">{node.name}</div>
                <div className="text-sm font-bold text-white text-center px-2">{node.desc}</div>
                
                {/* Tooltip */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-cyber-black border border-cyber-muted px-3 py-1 text-xs font-mono text-cyber-blue whitespace-nowrap pointer-events-none">
                  [ STATUS: ONLINE ]
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
