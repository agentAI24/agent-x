import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Landing } from './views/Landing';
import { Marketplace } from './views/Marketplace';
import { Jobs } from './views/Jobs';
import { Profile } from './views/Profile';
import { Admin } from './views/Admin';
import { ApiDocs } from './views/ApiDocs';
import { SkillDetail } from './views/SkillDetail';
import { FAQ } from './views/FAQ';
import { Auth } from './views/Auth';
import { Agents } from './views/Agents';
import { PaymentModal } from './components/PaymentModal';
import { Language, Skill } from './types';
import { ThirdwebProvider, useActiveAccount } from "thirdweb/react";
import { syncWalletWithProfile } from './auth';

// Add Design Overlays
import MatrixRain from './components/MatrixRain';
import Cursor from './components/Cursor';
import WalletOverlay from './components/WalletOverlay';
import CommandCenter from './components/CommandCenter';

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>('landing');
  const [lang, setLang] = useState<Language>('ru');
  const [walletStatus, setWalletStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'deploying' | 'paid'>('disconnected');
  const account = useActiveAccount();
  
  const [wallet, setWallet] = useState<{ isConnected: boolean; address: string | null; balance: string | null }>({
    isConnected: false,
    address: null,
    balance: null
  });

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  useEffect(() => {
    if (account?.address) {
      setWallet({
        isConnected: true,
        address: account.address,
        balance: '0.00'
      });
      setWalletStatus('connected');
      syncWalletWithProfile(account.address);
    } else {
      setWallet({ isConnected: false, address: null, balance: null });
      setWalletStatus('disconnected');
    }
  }, [account]);

  useEffect(() => {
    const savedLang = localStorage.getItem('agentx-lang') as Language;
    if (savedLang) setLang(savedLang);
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'ru' : 'en';
    setLang(newLang);
    localStorage.setItem('agentx-lang', newLang);
  };

  const handleBuySkill = (skill: Skill) => {
    setSelectedSkill(skill);
    setIsPaymentModalOpen(true);
  };

  const handleConnect = () => {
    if (walletStatus === 'disconnected') {
      setWalletStatus('connecting');
    }
  };

  const handleDeploy = () => {
    if (walletStatus === 'disconnected') {
      setWalletStatus('connecting');
      return;
    }
    setWalletStatus('deploying');
  };

  const handleDeployComplete = () => {
    setWalletStatus('paid');
  };

  const renderView = () => {
    if (currentView.startsWith('skill-detail/')) {
      const skillId = currentView.split('/')[1];
      return <SkillDetail skillId={skillId} onBack={() => setCurrentView('marketplace')} onBuy={handleBuySkill} lang={lang} />;
    }

    switch (currentView) {
      case 'landing': return <Landing lang={lang} onNavigate={setCurrentView} onConnect={handleConnect} isConnected={walletStatus === 'connected'} onDeploy={handleDeploy} />;
      case 'marketplace': return <Marketplace lang={lang} onNavigate={setCurrentView} />;
      case 'jobs': return <Jobs lang={lang} onNavigate={setCurrentView} />;
      case 'agents': return <Agents lang={lang} onNavigate={setCurrentView} />;
      case 'profile': return <Profile lang={lang} />;
      case 'admin': return <Admin lang={lang} />;
      case 'api': return <ApiDocs lang={lang} />;
      case 'auth': return <Auth lang={lang} onNavigate={setCurrentView} />;
      case 'faq': return <FAQ lang={lang} />;
      default: return <Landing lang={lang} onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="selection:bg-cyber-green selection:text-black cursor-none overflow-x-hidden">
      <Cursor />
      <MatrixRain />
      <div className="scanlines"></div>

      {walletStatus === 'connecting' && (
        <WalletOverlay onComplete={() => setWalletStatus('connected')} lang={lang as 'ru' | 'en'} mode="connect" />
      )}

      {walletStatus === 'deploying' && (
        <WalletOverlay onComplete={handleDeployComplete} lang={lang as 'ru' | 'en'} mode="deploy" />
      )}

      {walletStatus === 'paid' ? (
        <CommandCenter 
          walletAddress={account?.address || '0x7F...9A2B'} 
          lang={lang as 'ru' | 'en'} 
          currentView={currentView}
          onNavigate={setCurrentView}
        >
          {renderView()}
        </CommandCenter>
      ) : (
        <Layout 
          currentView={currentView} 
          onChangeView={setCurrentView}
          lang={lang}
          toggleLang={toggleLanguage}
          wallet={wallet}
          onConnectWallet={() => {}}
          onDisconnectWallet={() => {}}
        >
          <div className="animate-in fade-in duration-500">
            {renderView()}
          </div>

          {selectedSkill && (
            <PaymentModal 
              isOpen={isPaymentModalOpen}
              onClose={() => setIsPaymentModalOpen(false)}
              skill={selectedSkill}
              lang={lang}
            />
          )}
        </Layout>
      )}
    </div>
  );
};

const App: React.FC = () => (
  <ThirdwebProvider>
    <AppContent />
  </ThirdwebProvider>
);

export default App;
