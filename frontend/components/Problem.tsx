import React from 'react';
import { motion } from 'motion/react';
import GlitchText from './GlitchText';

interface Props {
  lang: 'ru' | 'en';
}

export default function Problem({ lang }: Props) {
  const errors = lang === 'ru' ? [
    {
      code: "Error 404",
      title: "Выгорание Людей",
      desc: "Выгорание сотрудников. Падение эффективности на 40% после 6 месяцев работы.",
      color: "border-cyber-red text-cyber-red shadow-[0_0_15px_rgba(255,0,60,0.2)]"
    },
    {
      code: "System Lag",
      title: "Сорванные Дедлайны",
      desc: "Сорванные дедлайны. Человеческий фактор, больничные, отпуска, выходные.",
      color: "border-yellow-500 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.2)]"
    },
    {
      code: "Overflow",
      title: "Раздутый Бюджет",
      desc: "Раздутый ФОТ. Налоги, страховка, рабочие места, печеньки в офисе.",
      color: "border-cyber-purple text-cyber-purple shadow-[0_0_15px_rgba(176,38,255,0.2)]"
    }
  ] : [
    {
      code: "Error 404",
      title: "Human Burnout",
      desc: "Employee burnout. 40% efficiency drop after 6 months of work.",
      color: "border-cyber-red text-cyber-red shadow-[0_0_15px_rgba(255,0,60,0.2)]"
    },
    {
      code: "System Lag",
      title: "Missed Deadlines",
      desc: "Missed deadlines. Human factor, sick leaves, vacations, weekends.",
      color: "border-yellow-500 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.2)]"
    },
    {
      code: "Overflow",
      title: "Budget Overflow",
      desc: "Bloated payroll. Taxes, insurance, workplaces, office cookies.",
      color: "border-cyber-purple text-cyber-purple shadow-[0_0_15px_rgba(176,38,255,0.2)]"
    }
  ];

  return (
    <section className="py-24 px-6 relative z-10 bg-cyber-graphite/50 overflow-hidden">
      {/* Noise overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-5 pointer-events-none mix-blend-overlay"></div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-white mb-16 uppercase tracking-tighter">
            <span className="text-cyber-red">//</span> <GlitchText text={lang === 'ru' ? "Сбой Системы" : "The Glitch"} />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {errors.map((error, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className={`border ${error.color} bg-black/60 backdrop-blur-sm p-8 relative overflow-hidden group`}
              >
                {/* Glitch animation on hover */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                
                <div className="flex items-center justify-between mb-6">
                  <span className={`font-mono text-sm tracking-widest uppercase ${error.color.split(' ')[1]}`}>
                    [{error.code}]
                  </span>
                  <div className={`w-2 h-2 rounded-full ${error.color.split(' ')[1].replace('text-', 'bg-')} animate-ping`}></div>
                </div>

                <h3 className="text-2xl font-mono font-bold text-white mb-4 uppercase tracking-tight relative z-10 group-hover:animate-[glitch-anim_0.2s_linear_infinite]">
                  <GlitchText text={error.title} />
                </h3>

                <p className="text-cyber-muted font-sans text-sm leading-relaxed relative z-10">
                  {error.desc}
                </p>

                {/* Decorative lines */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-20"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
