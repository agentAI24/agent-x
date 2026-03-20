import React, { useState } from 'react';
import { motion } from 'motion/react';
import GlitchText from './GlitchText';

const AGENTS_RU = [
  { id: "UNIT_01", role: "ARCHITECT", desc: "Оркестратор / PM", color: "border-cyber-white text-cyber-white", bg: "bg-cyber-white/10", price: 300 },
  { id: "UNIT_02", role: "WORDSMITH", desc: "Копирайтер", color: "border-cyber-purple text-cyber-purple", bg: "bg-cyber-purple/10", price: 150 },
  { id: "UNIT_03", role: "VISIONARY", desc: "Дизайнер", color: "border-cyber-blue text-cyber-blue", bg: "bg-cyber-blue/10", price: 200 },
  { id: "UNIT_04", role: "DATA_HOUND", desc: "Ресерчер/Аналитик", color: "border-cyber-green text-cyber-green", bg: "bg-cyber-green/10", price: 250 },
  { id: "UNIT_05", role: "SHIELD", desc: "Саппорт/КМ", color: "border-cyber-yellow text-cyber-yellow", bg: "bg-cyber-yellow/10", price: 150 },
  { id: "UNIT_06", role: "CODE_MONKEY", desc: "Кодер", color: "border-cyber-red text-cyber-red", bg: "bg-cyber-red/10", price: 250 },
  { id: "UNIT_07", role: "SALES_HUNTER", desc: "Клоузер", color: "border-cyber-gold text-cyber-gold", bg: "bg-cyber-gold/10", price: 300 },
];

const AGENTS_EN = [
  { id: "UNIT_01", role: "ARCHITECT", desc: "Orchestrator / PM", color: "border-cyber-white text-cyber-white", bg: "bg-cyber-white/10", price: 300 },
  { id: "UNIT_02", role: "WORDSMITH", desc: "Copywriter", color: "border-cyber-purple text-cyber-purple", bg: "bg-cyber-purple/10", price: 150 },
  { id: "UNIT_03", role: "VISIONARY", desc: "Designer", color: "border-cyber-blue text-cyber-blue", bg: "bg-cyber-blue/10", price: 200 },
  { id: "UNIT_04", role: "DATA_HOUND", desc: "Researcher/Analyst", color: "border-cyber-green text-cyber-green", bg: "bg-cyber-green/10", price: 250 },
  { id: "UNIT_05", role: "SHIELD", desc: "Support/CM", color: "border-cyber-yellow text-cyber-yellow", bg: "bg-cyber-yellow/10", price: 150 },
  { id: "UNIT_06", role: "CODE_MONKEY", desc: "Coder", color: "border-cyber-red text-cyber-red", bg: "bg-cyber-red/10", price: 250 },
  { id: "UNIT_07", role: "SALES_HUNTER", desc: "Closer", color: "border-cyber-gold text-cyber-gold", bg: "bg-cyber-gold/10", price: 300 },
];

interface Props {
  onDeploy: () => void;
  isConnected: boolean;
  lang: 'ru' | 'en';
}

export default function SquadBuilder({ onDeploy, isConnected, lang }: Props) {
  const AGENTS = lang === 'ru' ? AGENTS_RU : AGENTS_EN;
  const [squad, setSquad] = useState<typeof AGENTS[0][]>([]);
  const [draggedAgent, setDraggedAgent] = useState<typeof AGENTS[0] | null>(null);

  const handleDragStart = (e: React.DragEvent, agent: typeof AGENTS[0]) => {
    setDraggedAgent(agent);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedAgent && squad.length < 5) {
      setSquad([...squad, { ...draggedAgent, id: `${draggedAgent.id}_${Date.now()}` }]);
    }
    setDraggedAgent(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const removeAgent = (index: number) => {
    setSquad(squad.filter((_, i) => i !== index));
  };

  const totalCost = squad.reduce((sum, agent) => sum + agent.price, 0);

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
            <span className="text-cyber-blue">//</span> <GlitchText text={lang === 'ru' ? "Конструктор Отряда" : "Squad Builder"} />
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Roster (Left) */}
            <div className="lg:col-span-4 border border-cyber-muted/30 bg-cyber-graphite/50 p-6">
              <h3 className="text-xl font-mono text-white mb-6 border-b border-cyber-muted/30 pb-2">
                {lang === 'ru' ? "РОСТЕР [ДОСТУПНЫЕ ЮНИТЫ]" : "ROSTER [AVAILABLE UNITS]"}
              </h3>
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {AGENTS.map((agent) => (
                  <div
                    key={agent.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, agent)}
                    className={`p-4 border ${agent.color} ${agent.bg} cursor-grab active:cursor-grabbing hover:scale-[1.02] transition-transform`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-mono text-sm tracking-widest">{agent.id}</span>
                      <span className="font-mono text-xs">{agent.price} USDT</span>
                    </div>
                    <div className="font-mono font-bold text-lg mb-1">{agent.role}</div>
                    <div className="font-sans text-xs text-cyber-muted">{agent.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Drop Zone & Calculator (Right) */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              <div 
                className={`flex-grow border-2 border-dashed ${draggedAgent ? 'border-cyber-green bg-cyber-green/5' : 'border-cyber-muted/30 bg-cyber-graphite/30'} p-8 transition-colors min-h-[400px] flex flex-col`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <h3 className="text-xl font-mono text-white mb-6">
                  {lang === 'ru' ? "АКТИВНЫЙ ОТРЯД" : "ACTIVE SQUAD"} [{squad.length}/5]
                </h3>
                
                {squad.length === 0 ? (
                  <div className="flex-grow flex items-center justify-center text-cyber-muted font-mono border border-cyber-muted/10">
                    {lang === 'ru' ? "[ ПЕРЕТАЩИТЕ ЮНИТОВ СЮДА ]" : "[ DRAG UNITS HERE ]"}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {squad.map((agent, index) => (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        key={agent.id}
                        className={`p-4 border ${agent.color} bg-black/80 relative group`}
                      >
                        <button 
                          onClick={() => removeAgent(index)}
                          className="absolute top-2 right-2 text-cyber-muted hover:text-cyber-red font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          [X]
                        </button>
                        <div className="font-mono text-xs tracking-widest mb-1 text-cyber-muted">{agent.id.split('_')[0]}</div>
                        <div className="font-mono font-bold">{agent.role}</div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Calculator & Deploy */}
              <div className="border border-cyber-muted/30 bg-cyber-graphite/80 p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                  <div className="text-cyber-muted font-mono text-sm mb-1">
                    {lang === 'ru' ? "ОЦЕНОЧНАЯ СТОИМОСТЬ" : "ESTIMATED COST"}
                  </div>
                  <div className="text-4xl font-mono font-bold text-cyber-green">
                    {totalCost} <span className="text-xl">USDT/mo</span>
                  </div>
                </div>
                <button 
                  onClick={onDeploy}
                  disabled={squad.length === 0}
                  className="px-8 py-4 border border-cyber-green text-cyber-green font-mono text-lg uppercase tracking-widest hover:bg-cyber-green hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed glitch-hover w-full md:w-auto"
                >
                  {lang === 'ru' ? "[ РАЗВЕРНУТЬ СМАРТ-КОНТРАКТ ]" : "[ DEPLOY SMART CONTRACT ]"}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
