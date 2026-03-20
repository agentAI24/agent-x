import React, { useState } from 'react';
import { motion } from 'motion/react';

interface Props {
  lang: 'ru' | 'en';
}

export default function Footer({ lang }: Props) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer className="py-24 px-6 relative z-10 bg-cyber-black border-t border-cyber-muted/20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-cyber-green font-mono text-sm mb-8 uppercase tracking-widest">
            &gt; {lang === 'ru' ? 'Защищенное соединение установлено.' : 'Secure connection established.'}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-mono font-bold text-white mb-6 uppercase tracking-tighter">
                <span className="text-cyber-blue">//</span> {lang === 'ru' ? 'Связь' : 'Uplink'}
              </h3>
              <ul className="space-y-4 font-mono text-cyber-muted">
                <li>
                  <a href="#" className="hover:text-cyber-blue transition-colors flex items-center">
                    <span className="text-cyber-blue mr-2">&gt;</span> {lang === 'ru' ? 'Telegram Канал' : 'Telegram Channel'}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyber-blue transition-colors flex items-center">
                    <span className="text-cyber-blue mr-2">&gt;</span> {lang === 'ru' ? 'Зашифрованный Email' : 'Encrypted Email'}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyber-blue transition-colors flex items-center">
                    <span className="text-cyber-blue mr-2">&gt;</span> {lang === 'ru' ? 'Документация' : 'Documentation'}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-mono font-bold text-white mb-6 uppercase tracking-tighter">
                <span className="text-cyber-green">//</span> {lang === 'ru' ? 'Инициализация' : 'Initialize'}
              </h3>
              
              <form onSubmit={handleSubmit} className="font-mono text-sm">
                <div className="mb-4">
                  <label className="block text-cyber-muted mb-2">&gt; {lang === 'ru' ? 'Введите ваш email:' : 'Enter your email:'}</label>
                  <div className="flex items-center border border-cyber-muted/50 bg-cyber-graphite/50 p-2 focus-within:border-cyber-green transition-colors">
                    <span className="text-cyber-green mr-2">[</span>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-transparent border-none outline-none text-white w-full placeholder-cyber-muted/30"
                      placeholder="user@corp.com"
                      required
                    />
                    <span className="text-cyber-green ml-2">]</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-cyber-muted">&gt; {lang === 'ru' ? 'Выполнить contact_protocol (Y/N)?' : 'Execute contact_protocol (Y/N)?'}</span>
                  <button 
                    type="submit"
                    className="px-4 py-1 border border-cyber-green text-cyber-green hover:bg-cyber-green hover:text-black transition-colors"
                  >
                    {lang === 'ru' ? '[ ДА ]' : '[ YES ]'}
                  </button>
                </div>
                
                {submitted && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 text-cyber-green animate-pulse"
                  >
                    &gt; {lang === 'ru' ? 'Протокол запущен. Ожидание ответа...' : 'Protocol initiated. Awaiting response...'}
                  </motion.div>
                )}
              </form>
            </div>
          </div>

          <div className="mt-24 pt-8 border-t border-cyber-muted/20 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-cyber-muted/50 overflow-hidden">
            <div>© 2026 BOXED AI WORKFORCE. ALL RIGHTS RESERVED.</div>
            <div className="mt-4 md:mt-0 flex space-x-4 whitespace-nowrap animate-[marquee_20s_linear_infinite]">
              <span>BTC: 0x9f8...3a1</span>
              <span>ETH: 0x1b2...9c4</span>
              <span>SYS_STATUS: OPTIMAL</span>
              <span>LATENCY: 12ms</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
