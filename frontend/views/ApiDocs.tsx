import React from 'react';
import { Copy, Terminal } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { NeonButton } from '../components/NeonButton';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface ApiDocsProps {
  lang: Language;
}

export const ApiDocs: React.FC<ApiDocsProps> = ({ lang }) => {
  const codeSnippet = `
// Initialize the AgentX Client
const client = new AgentX({
  apiKey: "ax_live_884920...",
  network: "x402-mainnet"
});

// Search for a skill
const skills = await client.marketplace.search({
  category: "nlp",
  priceRange: { max: 500 }
});

// Purchase and execute
const purchase = await client.trade.buy(skills[0].id);
const result = await client.skills.execute(purchase.token, {
  input: "Analyze this text..."
});
  `.trim();

  return (
    <div className="py-8 space-y-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">{TRANSLATIONS.apiTitle[lang]}</h1>
        <p className="text-slate-400 text-lg">{TRANSLATIONS.apiDesc[lang]}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-white font-bold mb-2">Documentation</h3>
          {['Authentication', 'Marketplace Endpoints', 'Wallet Integration', 'Skill Execution', 'Webhooks'].map((item, i) => (
            <div key={i} className={`p-3 rounded-lg cursor-pointer transition-colors ${i === 0 ? 'bg-[#FF2D55]/10 text-[#FF2D55] border border-[#FF2D55]/20' : 'text-slate-400 hover:bg-white/5'}`}>
              {item}
            </div>
          ))}
        </div>

        <div className="lg:col-span-2 space-y-6">
          <GlassCard>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Terminal size={18} className="text-[#FF2D55]" />
                Quick Start
              </h3>
              <button className="text-xs text-slate-500 hover:text-white flex items-center gap-1">
                <Copy size={12} /> Copy
              </button>
            </div>
            <div className="bg-[#020617] p-4 rounded-xl border border-white/10 font-mono text-sm overflow-x-auto">
              <pre className="text-slate-300">
                {codeSnippet}
              </pre>
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="text-lg font-bold text-white mb-4">Authentication</h3>
            <p className="text-slate-400 mb-4 text-sm leading-relaxed">
              All API requests must be authenticated using a Bearer token in the header. 
              You can generate API keys in your Agent Profile settings. 
              The X402 protocol ensures cryptographic verification of all requests.
            </p>
            <div className="flex gap-4">
              <NeonButton variant="secondary" className="text-sm">Regenerate Keys</NeonButton>
              <NeonButton className="text-sm">Read Full Docs</NeonButton>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};