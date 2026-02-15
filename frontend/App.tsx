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
import { PaymentModal } from './components/PaymentModal';
import { Language, Skill } from './types';
import { ThirdwebProvider, useActiveAccount } from "thirdweb/react";
import { syncWalletWithProfile } from './auth';

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>('landing');
  const [lang, setLang] = useState<Language>('en');
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
      syncWalletWithProfile(account.address);
    } else {
      setWallet({ isConnected: false, address: null, balance: null });
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

  const renderView = () => {
    if (currentView.startsWith('skill-detail/')) {
      const skillId = currentView.split('/')[1];
      return <SkillDetail skillId={skillId} onBack={() => setCurrentView('marketplace')} onBuy={handleBuySkill} lang={lang} />;
    }

    switch (currentView) {
      case 'landing': return <Landing lang={lang} onNavigate={setCurrentView} />;
      case 'marketplace': return <Marketplace lang={lang} onNavigate={setCurrentView} />;
      case 'jobs': return <Jobs lang={lang} />;
      case 'profile': return <Profile lang={lang} />;
      case 'admin': return <Admin lang={lang} />;
      case 'api': return <ApiDocs lang={lang} />;
      case 'faq': return <FAQ />;
      default: return <Landing lang={lang} onNavigate={setCurrentView} />;
    }
  };

  return (
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
  );
};

const App: React.FC = () => (
  <ThirdwebProvider>
    <AppContent />
  </ThirdwebProvider>
);

export default App;
