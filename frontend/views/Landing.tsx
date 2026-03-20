import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import Problem from '../components/Problem';
import InteractiveTerminal from '../components/InteractiveTerminal';
import Architecture from '../components/Architecture';
import SquadBuilder from '../components/SquadBuilder';
import { Language } from '../types';

interface LandingProps {
  lang: Language;
  onNavigate: (view: string) => void;
  onConnect?: () => void;
  isConnected?: boolean;
  onDeploy?: () => void;
}

export const Landing: React.FC<LandingProps> = ({ lang, onNavigate, onConnect, isConnected, onDeploy }) => {
  return (
    <div className="space-y-0">
      <HeroSection 
        onConnect={onConnect || (() => {})} 
        isConnected={isConnected || false} 
        lang={lang as 'ru' | 'en'} 
      />
      <Problem lang={lang as 'ru' | 'en'} />
      <InteractiveTerminal lang={lang as 'ru' | 'en'} />
      <Architecture lang={lang as 'ru' | 'en'} />
      <SquadBuilder 
        onDeploy={onDeploy || (() => {})} 
        isConnected={isConnected || false} 
        lang={lang as 'ru' | 'en'} 
      />
    </div>
  );
};
