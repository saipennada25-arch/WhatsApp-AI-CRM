import { ReactNode } from 'react';

export interface BaseItem {
  id: string;
  title: string;
  description?: string;
}

export interface Feature extends BaseItem {
  icon: ReactNode;
  color?: string;
}

export interface Stat extends BaseItem {
  value: string;
  icon: ReactNode;
}

export interface SolutionTab extends BaseItem {
  highlights: string[];
  cta: string;
  image?: string; // Placeholder for logic
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  highlight?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
}
