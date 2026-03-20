import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import GlitchText from './GlitchText';

export default function InteractiveTerminal() {
  const [lines, setLines] = useState<{text: string, color: string}[]>([]);
  const [currentLine, setCurrentLine] = useState<{text: string, color: string} | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  const scenario = [
    { text: "> User: Create a content plan for crypto-startup.", delay: 500, color: "text-cyber-text" },
    { text: "> AI_Marketer: Analyzing market... Done. Here is 5 topics...", delay: 1000, color: "text-cyber-purple" },
    { text: "> AI_Designer: Generating covers... [||||||||||] 100%", delay: 1500, color: "text-cyber-blue" },
    { text: "> System: Task completed in 4.2s.", delay: 1000, color: "text-cyber-green" }
  ];

  const startSimulation = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setLines([]);
    setCurrentLine(null);
    
    for (let i = 0; i < scenario.length; i++) {
      const step = scenario[i];
      await new Promise(resolve => setTimeout(resolve, step.delay));
      
      setCurrentLine({ text: '', color: step.color });
      
      // Type letter by letter
      for (let j = 0; j <= step.text.length; j++) {
        setCurrentLine({ text: step.text.substring(0, j), color: step.color });
        // Randomize typing speed slightly for realism
        await new Promise(resolve => setTimeout(resolve, Math.random() * 30 + 20));
      }
      
      setLines(prev => [...prev, { text: step.text, color: step.color }]);
      setCurrentLine(null);
    }
    
    setTimeout(() => setIsRunning(false), 2000);
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines, currentLine]);

  return (
    <section className="py-24 px-6 relative z-10 bg-cyber-black">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-white mb-12 uppercase tracking-tighter">
            <span className="text-cyber-green">//</span> <GlitchText text="Test Drive" />
          </h2>

          <div className="border border-cyber-muted/30 bg-cyber-graphite/80 backdrop-blur-md rounded-sm overflow-hidden shadow-[0_0_30px_rgba(0,255,65,0.05)]">
            {/* Terminal Header */}
            <div className="flex items-center px-4 py-2 border-b border-cyber-muted/30 bg-black/50">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-cyber-red/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-cyber-green/80"></div>
              </div>
              <div className="mx-auto text-xs font-mono text-cyber-muted tracking-widest">
                root@cyber-staff:~
              </div>
            </div>

            {/* Terminal Body */}
            <div 
              ref={terminalRef}
              className="p-6 h-[300px] overflow-y-auto font-mono text-sm md:text-base"
            >
              <div className="text-cyber-muted mb-4">
                System ready. Enter task...
              </div>
              
              {lines.map((line, i) => (
                <div key={i} className={`mb-2 ${line.color}`}>
                  {line.text}
                </div>
              ))}
              
              {currentLine && (
                <div className={`mb-2 ${currentLine.color}`}>
                  {currentLine.text}
                  <span className="w-2 h-5 bg-current animate-pulse inline-block align-middle ml-1"></span>
                </div>
              )}
              
              {!currentLine && (
                <div className="mt-2 flex items-center">
                  <span className="text-cyber-green mr-2">&gt;</span>
                  <span className="w-2 h-5 bg-cyber-green animate-pulse inline-block"></span>
                </div>
              )}
            </div>
            
            {/* Terminal Footer / Controls */}
            <div className="p-4 border-t border-cyber-muted/30 bg-black/50 flex justify-end">
              <button 
                onClick={startSimulation}
                disabled={isRunning}
                className="px-6 py-2 border border-cyber-green text-cyber-green font-mono text-sm uppercase hover:bg-cyber-green hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRunning ? '[ EXECUTING... ]' : '[ RUN SIMULATION ]'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
