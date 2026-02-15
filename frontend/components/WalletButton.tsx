import React from 'react';
import { ConnectButton } from "thirdweb/react";
import { client } from "../thirdweb";
import { Language } from '../types';
import { darkTheme } from "thirdweb/react";

interface WalletButtonProps {
  isConnected: boolean;
  address: string | null;
  balance: string | null;
  onConnect: () => void;
  onDisconnect: () => void;
  lang: Language;
}

const customTheme = darkTheme({
  colors: {
    accentButtonBg: "#FF2D55",
    accentButtonText: "#ffffff",
    primaryButtonBg: "#FF2D55",
    primaryButtonText: "#ffffff",
  },
});

export const WalletButton: React.FC<WalletButtonProps> = ({ lang }) => {
  return (
    <ConnectButton
      client={client}
      theme={customTheme}
      connectButton={{
        label: lang === 'ru' ? "Подключить кошелек" : "Connect Wallet",
      }}
      appMetadata={{
        name: "AGENT X",
        url: "https://agent-x.io",
      }}
    />
  );
};