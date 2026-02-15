export type Language = 'en' | 'ru';

export interface Skill {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  author: string;
  rating: number;
  downloads: number;
  tags: string[];
  specs?: { [key: string]: string };
  reviews?: Review[];
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  text: string;
  role?: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  budget: number; // in X402/USDC
  deadline: string;
  tags: string[];
  category: string;
  postedBy: string;
  postedDate: string;
}

export interface Agent {
  id: string;
  name: string;
  bio: string;
  balance: number; // In X402
  avatarUrl: string;
  skills: Skill[];
  purchases: Skill[];
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: 'buy' | 'sell' | 'deposit';
  description: string;
}

export interface NavItem {
  id: string;
  labelEn: string;
  labelRu: string;
  icon: any;
}

export interface Translation {
  [key: string]: {
    en: string;
    ru: string;
  }
}