import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import GlitchText from './GlitchText';

interface Props {
  walletAddress: string;
  lang: 'ru' | 'en';
}

export default function CommandCenter({ walletAddress, lang }: Props) {
  const [activeTab, setActiveTab] = useState('SQUAD');
  const [logs, setLogs] = useState<string[]>([]);

  const actionsRu = [
    "UNIT_01: Распределение задач...",
    "UNIT_03: Генерация ассетов [||||||] 60%",
    "UNIT_04: Парсинг целевых данных...",
    "UNIT_06: Коммит кода в репозиторий...",
    "SYSTEM: Память оптимизирована.",
    "UNIT_02: Черновик готов к проверке."
  ];

  const actionsEn = [
    "UNIT_01: Distributing tasks...",
    "UNIT_03: Generating assets [||||||] 60%",
    "UNIT_04: Parsing target data...",
    "UNIT_06: Committing code to repo...",
    "SYSTEM: Memory optimized.",
    "UNIT_02: Draft ready for review."
  ];

  useEffect(() => {
    if (activeTab !== 'UPLINK') return;

    const actions = lang === 'ru' ? actionsRu : actionsEn;

    const interval = setInterval(() => {
      setLogs(prev => [...prev.slice(-10), `[${new Date().toISOString().split('T')[1].slice(0, 8)}] ${actions[Math.floor(Math.random() * actions.length)]}`]);
    }, 2000);

    return () => clearInterval(interval);
  }, [activeTab, lang]);

  const upgradesRu = [
    { name: "Google Sheets API", desc: "Доступ к таблицам на чтение/запись", price: 50, color: "border-cyber-green" },
    { name: "Notion Integration", desc: "Синхронизация задач и базы знаний", price: 75, color: "border-cyber-blue" },
    { name: "SMTP Protocol", desc: "Отправка автоматических email", price: 100, color: "border-cyber-purple" },
    { name: "Telegram Bot API", desc: "Прямое управление каналом", price: 150, color: "border-cyber-blue" }
  ];

  const upgradesEn = [
    { name: "Google Sheets API", desc: "Read/Write access to spreadsheets", price: 50, color: "border-cyber-green" },
    { name: "Notion Integration", desc: "Sync tasks and knowledge base", price: 75, color: "border-cyber-blue" },
    { name: "SMTP Protocol", desc: "Send automated emails", price: 100, color: "border-cyber-purple" },
    { name: "Telegram Bot API", desc: "Direct channel management", price: 150, color: "border-cyber-blue" }
  ];

  const upgrades = lang === 'ru' ? upgradesRu : upgradesEn;

  return (
    <div className="min-h-screen bg-cyber-black text-cyber-text font-sans selection:bg-cyber-green selection:text-black pt-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-cyber-muted/30 pb-6">
          <div>
            <h1 className="text-4xl font-mono font-bold text-white uppercase tracking-tighter mb-2">
              <span className="text-cyber-blue">//</span> <GlitchText text={lang === 'ru' ? "Командный Центр" : "Command Center"} />
            </h1>
            <div className="font-mono text-sm text-cyber-green flex items-center">
              <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse mr-2"></div>
              {lang === 'ru' ? "СВЯЗЬ УСТАНОВЛЕНА:" : "UPLINK ESTABLISHED:"} {walletAddress}
            </div>
          </div>
          
          <div className="mt-6 md:mt-0 flex space-x-4">
            {['SQUAD', 'UPLINK', 'TREASURY', 'UPGRADES'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-mono text-sm uppercase tracking-widest transition-colors ${activeTab === tab ? 'border-b-2 border-cyber-blue text-cyber-blue' : 'text-cyber-muted hover:text-white'}`}
              >
                [{tab}]
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="min-h-[600px]"
        >
          {activeTab === 'SQUAD' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { id: "UNIT_01", role: "ARCHITECT", status: "EXECUTING TASK", color: "border-cyber-white text-cyber-white" },
                { id: "UNIT_04", role: "DATA_HOUND", status: "ONLINE", color: "border-cyber-green text-cyber-green" },
                { id: "UNIT_06", role: "CODE_MONKEY", status: "IDLE", color: "border-cyber-red text-cyber-red" }
              ].map((agent, i) => (
                <div key={i} className={`border ${agent.color} bg-cyber-graphite/50 p-6 relative overflow-hidden group`}>
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none opacity-50"></div>
                  <div className="flex justify-between items-center mb-4 relative z-10">
                    <span className="font-mono text-sm tracking-widest">{agent.id}</span>
                    <span className={`font-mono text-xs px-2 py-1 border ${agent.status === 'IDLE' ? 'border-cyber-muted text-cyber-muted' : agent.color} ${agent.status === 'EXECUTING TASK' ? 'animate-pulse' : ''}`}>
                      [{lang === 'ru' ? (agent.status === 'EXECUTING TASK' ? 'ВЫПОЛНЯЕТ ЗАДАЧУ' : agent.status === 'ONLINE' ? 'В СЕТИ' : 'ОЖИДАНИЕ') : agent.status}]
                    </span>
                  </div>
                  <h3 className="text-2xl font-mono font-bold mb-6 relative z-10">{agent.role}</h3>
                  <div className="space-y-2 font-mono text-xs text-cyber-muted relative z-10">
                    <div className="flex justify-between"><span>CPU:</span><span>{Math.floor(Math.random() * 40 + 20)}%</span></div>
                    <div className="flex justify-between"><span>MEM:</span><span>{Math.floor(Math.random() * 60 + 40)}%</span></div>
                    <div className="flex justify-between"><span>{lang === 'ru' ? 'ВРЕМЯ РАБОТЫ' : 'UPTIME'}:</span><span>14d 02h 45m</span></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'UPLINK' && (
            <div className="border border-cyber-muted/30 bg-cyber-graphite/80 h-[600px] flex flex-col font-mono text-sm">
              <div className="p-4 border-b border-cyber-muted/30 bg-black/50 flex justify-between items-center">
                <span className="text-cyber-muted">{lang === 'ru' ? 'ЖИВОЙ_ПОТОК_ЛОГОВ' : 'LIVE_STREAM_LOGS'}</span>
                <span className="text-cyber-green animate-pulse">● REC</span>
              </div>
              <div className="p-6 flex-grow overflow-y-auto space-y-2">
                {logs.map((log, i) => (
                  <div key={i} className={log.includes('SYSTEM') ? 'text-cyber-muted' : 'text-cyber-blue'}>
                    {log}
                  </div>
                ))}
                <div className="flex items-center mt-2">
                  <span className="text-cyber-green mr-2">&gt;</span>
                  <span className="w-2 h-5 bg-cyber-green animate-pulse inline-block"></span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'TREASURY' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border border-cyber-gold bg-cyber-graphite/50 p-8">
                <h3 className="text-xl font-mono text-cyber-gold mb-6">{lang === 'ru' ? 'БАЛАНС' : 'BALANCE'}</h3>
                <div className="text-6xl font-mono font-bold text-white mb-2">1,450.00</div>
                <div className="text-cyber-muted font-mono text-sm mb-8">{lang === 'ru' ? 'USDT ДОСТУПНО' : 'USDT AVAILABLE'}</div>
                <button className="w-full py-4 border border-cyber-gold text-cyber-gold font-mono uppercase hover:bg-cyber-gold hover:text-black transition-colors glitch-hover">
                  {lang === 'ru' ? '[ ПОПОЛНИТЬ СЧЕТ ]' : '[ DEPOSIT FUNDS ]'}
                </button>
              </div>
              <div className="border border-cyber-muted/30 bg-cyber-graphite/50 p-8">
                <h3 className="text-xl font-mono text-white mb-6">{lang === 'ru' ? 'ПОДПИСКА' : 'SUBSCRIPTION'}</h3>
                <div className="text-4xl font-mono font-bold text-cyber-green mb-2">{lang === 'ru' ? '24 ДНЯ' : '24 DAYS'}</div>
                <div className="text-cyber-muted font-mono text-sm mb-8">{lang === 'ru' ? 'ОСТАЛОСЬ ДО ОБНОВЛЕНИЯ' : 'REMAINING UNTIL RENEWAL'}</div>
                <div className="space-y-4 font-mono text-sm">
                  <div className="flex justify-between border-b border-cyber-muted/20 pb-2">
                    <span className="text-cyber-muted">{lang === 'ru' ? 'СЛЕДУЮЩЕЕ СПИСАНИЕ:' : 'NEXT BILLING:'}</span>
                    <span className="text-white">800 USDT</span>
                  </div>
                  <div className="flex justify-between border-b border-cyber-muted/20 pb-2">
                    <span className="text-cyber-muted">{lang === 'ru' ? 'АВТО-ПРОДЛЕНИЕ:' : 'AUTO-RENEW:'}</span>
                    <span className="text-cyber-green">{lang === 'ru' ? 'ВКЛЮЧЕНО' : 'ENABLED'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'UPGRADES' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upgrades.map((upgrade, i) => (
                <div key={i} className={`border ${upgrade.color} bg-cyber-graphite/50 p-6 flex flex-col`}>
                  <h3 className="text-xl font-mono font-bold text-white mb-2">{upgrade.name}</h3>
                  <p className="text-cyber-muted font-sans text-sm mb-6 flex-grow">{upgrade.desc}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-mono font-bold text-white">{upgrade.price} USDT</span>
                    <button className={`px-4 py-2 border ${upgrade.color} text-white font-mono text-xs uppercase hover:bg-white/10 transition-colors`}>
                      {lang === 'ru' ? '[ УСТАНОВИТЬ ]' : '[ INSTALL ]'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
