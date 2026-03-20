import React from 'react';
import { motion } from 'motion/react';
import GlitchText from './GlitchText';

export default function Squad() {
  const agents = [
    {
      id: "UNIT-01",
      role: "CODER",
      color: "border-cyber-green text-cyber-green shadow-[0_0_15px_rgba(0,255,65,0.2)]",
      bg: "bg-cyber-green/10",
      specs: [
        { label: "Language", value: "Python/TS" },
        { label: "Logic", value: "99%" },
        { label: "Speed", value: "1000 tokens/sec" }
      ]
    },
    {
      id: "UNIT-02",
      role: "DESIGNER",
      color: "border-cyber-blue text-cyber-blue shadow-[0_0_15px_rgba(0,240,255,0.2)]",
      bg: "bg-cyber-blue/10",
      specs: [
        { label: "Engine", value: "Midjourney/SD" },
        { label: "Vision", value: "100%" },
        { label: "Resolution", value: "4K Native" }
      ]
    },
    {
      id: "UNIT-03",
      role: "MARKETER",
      color: "border-cyber-purple text-cyber-purple shadow-[0_0_15px_rgba(176,38,255,0.2)]",
      bg: "bg-cyber-purple/10",
      specs: [
        { label: "Logic", value: "Claude 3.5" },
        { label: "Strategy", value: "99%" },
        { label: "Conversion", value: "+45% Avg" }
      ]
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
            <span className="text-cyber-purple">//</span> <GlitchText text="The Squad" />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {agents.map((agent, i) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className={`border ${agent.color} bg-cyber-graphite/50 backdrop-blur-sm p-6 flex flex-col group relative overflow-hidden`}
              >
                {/* Scanline overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none opacity-50"></div>
                
                {/* Agent Header */}
                <div className="flex justify-between items-center mb-6 relative z-10">
                  <div className="font-mono text-sm tracking-widest text-cyber-muted">{agent.id}</div>
                  <div className={`w-2 h-2 rounded-full ${agent.bg.replace('/10', '')} animate-pulse`}></div>
                </div>

                {/* Agent Avatar Placeholder (Wireframe Head) */}
                <div className={`w-full h-48 mb-6 border border-cyber-muted/30 ${agent.bg} flex items-center justify-center relative z-10 overflow-hidden`}>
                  <svg viewBox="0 0 100 100" className="w-24 h-24 opacity-60 group-hover:opacity-100 transition-opacity avatar-glitch">
                    <path d="M50,5 L75,25 L75,65 L50,95 L25,65 L25,25 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                    <path d="M50,5 L50,95 M25,25 L75,25 M25,65 L75,65" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    <path d="M25,25 L50,45 L75,25 M25,65 L50,45 L75,65" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="50" cy="45" r="2" fill="currentColor" />
                    <circle cx="35" cy="35" r="1.5" fill="currentColor" />
                    <circle cx="65" cy="35" r="1.5" fill="currentColor" />
                  </svg>
                </div>

                <h3 className={`text-2xl font-mono font-bold mb-6 ${agent.color.split(' ')[1]} uppercase tracking-tight relative z-10`}>
                  {agent.role}
                </h3>

                {/* Specs */}
                <div className="space-y-3 mb-8 flex-grow relative z-10">
                  {agent.specs.map((spec, j) => (
                    <div key={j} className="flex justify-between border-b border-cyber-muted/20 pb-1">
                      <span className="text-cyber-muted font-mono text-xs uppercase">{spec.label}</span>
                      <span className="text-white font-mono text-sm">{spec.value}</span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <button className={`w-full py-3 border ${agent.color.split(' ')[0]} ${agent.color.split(' ')[1]} font-mono text-sm uppercase tracking-widest hover:bg-white/5 transition-colors relative z-10 glitch-hover`}>
                  [ VIEW PROFILE ]
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
