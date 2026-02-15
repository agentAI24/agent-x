import React, { useState } from 'react';
import { X, Check, Loader2, Wallet } from 'lucide-react';
import { NeonButton } from './NeonButton';
import { TRANSLATIONS } from '../constants';
import { Language, Skill } from '../types';

interface PaymentModalProps {
  skill: Skill;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ skill, isOpen, onClose, lang }) => {
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  if (!isOpen) return null;

  const handlePayment = () => {
    setStatus('processing');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('idle');
      }, 2000);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#020617] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF2D55] to-transparent" />
        
        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Check size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Payment Successful!</h3>
            <p className="text-slate-400">Transaction hash: 0x8a...4b2d</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">{TRANSLATIONS.confirmPurchase[lang]}</h3>
              <button onClick={onClose} className="text-slate-500 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="bg-white/5 rounded-xl p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-slate-400">Product</span>
                <span className="text-white font-medium text-right">{skill.title}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-400">Price (X402)</span>
                <span className="text-[#FF2D55] font-mono">{skill.price} X402</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/10">
                <span className="text-slate-400">Total (USDC)</span>
                <span className="text-white font-bold">${(skill.price * 0.15).toFixed(2)}</span>
              </div>
            </div>

            <NeonButton 
              fullWidth 
              onClick={handlePayment}
              disabled={status === 'processing'}
              className={status === 'processing' ? 'opacity-75 cursor-not-allowed' : ''}
            >
              {status === 'processing' ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  {TRANSLATIONS.processing[lang]}
                </>
              ) : (
                <>
                  <Wallet size={18} />
                  Pay with MetaMask
                </>
              )}
            </NeonButton>
          </>
        )}
      </div>
    </div>
  );
};