import React from 'react';
import { 
  Brain, Zap, MessageCircle, Users, BarChart3, Fingerprint, Image as ImageIcon, Mic, 
  Star, Bell, CheckCircle, Workflow, TrendingUp, DollarSign, Globe, Smartphone,
  Layout, Headphones, FileText, Share2, Shield, Grid, Calendar, MapPin, Heart, ShoppingBag,
  Bot, Database, Lock, Layers, CreditCard
} from 'lucide-react';
import { Feature, PricingPlan, Testimonial, Stat, SolutionTab } from './types';

export const HERO_CONTENT = {
  headline: "Never Miss a Lead Again — UNPHUC WhatsApp AI CRM",
  subheadline: "The #1 AI-powered conversational growth platform for WhatsApp. Grow sales. Automate follow-ups. Personalize every conversation with AI.",
  ctaPrimary: "Start Free Trial",
  ctaSecondary: "View Demo",
};

export const KEY_ELEVATIONS: Stat[] = [
  {
    id: 'e1',
    title: "The #1 WhatsApp AI Growth Platform",
    value: "#1",
    icon: <Star className="w-5 h-5 text-yellow-500" />
  },
  {
    id: 'e2',
    title: "Never Miss a Customer Message Again",
    value: "100%",
    icon: <Bell className="w-5 h-5 text-red-500" />
  },
  {
    id: 'e3',
    title: "Automate 80% of your WhatsApp tasks",
    value: "80%",
    icon: <Workflow className="w-5 h-5 text-blue-500" />
  },
  {
    id: 'e4',
    title: "AI that remembers like a human",
    value: "∞",
    icon: <Brain className="w-5 h-5 text-purple-500" />
  },
  {
    id: 'e5',
    title: "Convert chats into customers",
    value: "2.5x",
    icon: <TrendingUp className="w-5 h-5 text-green-500" />
  },
  {
    id: 'e6',
    title: "More sales. Less manual work.",
    value: "24/7",
    icon: <DollarSign className="w-5 h-5 text-emerald-500" />
  }
];

export const DEEP_DIVE_SECTIONS = [
  {
    id: 'sales',
    theme: 'blue',
    title: "Sell smarter with AI-powered WhatsApp conversations",
    bullets: [
      "AI Next Best Action Engine guides every deal",
      "Dynamic Pricing Optimizer based on demand",
      "AI Upsell & Cross-Sell Recommendation Engine",
      "Auto-qualify leads instantly 24/7"
    ],
    metrics: [
      { label: "More Conversions", value: "4×" },
      { label: "Faster Lead Response", value: "2×" },
      { label: "Less Manual Workload", value: "70%" }
    ]
  },
  {
    id: 'marketing',
    theme: 'purple',
    title: "Run high-performance WhatsApp marketing campaigns at scale",
    bullets: [
      "Hyper-Local Recommendation Engine (Weather/Events)",
      "Auto Catalog Generation from product photos",
      "Personalized Broadcasts with Image Recognition",
      "Retarget based on purchase intent"
    ],
    metrics: [
      { label: "ROI Increase", value: "3×" },
      { label: "Higher Response Rate", value: "85%" },
      { label: "Lower Campaign Costs", value: "40%" }
    ]
  },
  {
    id: 'support',
    theme: 'teal',
    title: "Deliver exceptional customer support with AI assistance",
    bullets: [
      "Multi-Channel Human Digital Twin (Clones You)",
      "Emotion & Intent Detection for urgent routing",
      "Voice Meeting Notes & Auto-Transcription",
      "Resolve tickets without human intervention"
    ],
    metrics: [
      { label: "CSAT Score", value: "90%" },
      { label: "Fewer Support Hours", value: "50%" },
      { label: "Instant Replies", value: "24/7" }
    ]
  }
];

export const SOLUTIONS_TABS: SolutionTab[] = [
  {
    id: 'sales',
    title: 'Sales',
    description: "Close more deals on WhatsApp with AI-powered sales automation.",
    highlights: ["AI Next Best Action", "Inbuilt pipeline", "Lead scoring", "Payment links"],
    cta: "Explore Sales Features"
  },
  {
    id: 'marketing',
    title: 'Marketing',
    description: "Reach the right customers at the right time.",
    highlights: ["WhatsApp broadcasts", "Segmented audiences", "Personalized offers"],
    cta: "Start Marketing Campaign"
  },
  {
    id: 'support',
    title: 'Support',
    description: "Delight customers with faster, smarter support.",
    highlights: ["AI Digital Twin", "24/7 AI Chatbot", "Emotion Detection"],
    cta: "Automate Support"
  }
];

// UNIQUE AI FEATURES LIST (1-10)
export const WHY_UNPHUC_FEATURES: Feature[] = [
  {
    id: 'w1',
    title: 'AI Conversation Memory',
    description: 'Human-like long-term memory. Remembers preferences, past complaints, and context per user to personalise every chat.',
    icon: <Brain className="w-6 h-6" />,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    id: 'w2',
    title: 'Multi-Channel Digital Twin',
    description: 'AI clone of the business owner. Learns your tone, vocabulary, and thinking style to chat exactly like you.',
    icon: <Users className="w-6 h-6" />,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: 'w3',
    title: 'Global Price Optimizer',
    description: 'Dynamic pricing engine. Adjusts prices based on demand, location, time, and competition signals in real-time.',
    icon: <DollarSign className="w-6 h-6" />,
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 'w4',
    title: 'Hyper-Local Intel',
    description: 'Identifies location trends (festivals, weather) to suggest relevant promotions (e.g., "Pongal Sale" in AP).',
    icon: <MapPin className="w-6 h-6" />,
    color: 'bg-orange-100 text-orange-600'
  },
  {
    id: 'w5',
    title: 'Next Best Action Engine',
    description: 'Predicts the single best move (offer, appointment, voice note) based on customer behavior logic.',
    icon: <Zap className="w-6 h-6" />,
    color: 'bg-yellow-100 text-yellow-600'
  },
  {
    id: 'w6',
    title: 'Emotion & Intent Detection',
    description: 'Detects anger or urgency instantly. Auto-escalates unhappy clients to senior managers.',
    icon: <Heart className="w-6 h-6" />,
    color: 'bg-red-100 text-red-600'
  },
  {
    id: 'w7',
    title: 'Image Recognition AI',
    description: 'Analyzes customer photos (e.g., skin issues, room decor) to recommend the perfect solution automatically.',
    icon: <ImageIcon className="w-6 h-6" />,
    color: 'bg-indigo-100 text-indigo-600'
  },
  {
    id: 'w8',
    title: 'Auto Catalog Generation',
    description: 'Generates dynamic catalogs from raw images or text requirements (e.g., "Show packages under $600").',
    icon: <Grid className="w-6 h-6" />,
    color: 'bg-pink-100 text-pink-600'
  },
  {
    id: 'w9',
    title: 'Voice Meeting Notes',
    description: 'Converts voice notes into structured summaries and action items stored in the CRM.',
    icon: <Mic className="w-6 h-6" />,
    color: 'bg-teal-100 text-teal-600'
  },
  {
    id: 'w10',
    title: 'AI Upsell Engine',
    description: 'Personalised recommendation engine suggesting bundles or add-ons that specific customer is most likely to buy.',
    icon: <TrendingUp className="w-6 h-6" />,
    color: 'bg-cyan-100 text-cyan-600'
  }
];

// STANDARD MODULES LIST (1-15)
export const PLATFORM_MODULES: Feature[] = [
  { id: 'p1', title: 'WhatsApp Inbox & API', description: '', icon: <MessageCircle /> },
  { id: 'p2', title: 'Lead Capture & Mgmt', description: '', icon: <Users /> },
  { id: 'p3', title: 'Automated Messaging', description: '', icon: <Bot /> },
  { id: 'p4', title: 'Templates & Interactive', description: '', icon: <Layout /> },
  { id: 'p5', title: 'Pipeline & Stages', description: '', icon: <Layers /> },
  { id: 'p6', title: 'Analytics & Reporting', description: '', icon: <BarChart3 /> },
  { id: 'p7', title: 'Marketing Broadcasts', description: '', icon: <Share2 /> },
  { id: 'p8', title: 'Integration & API', description: '', icon: <Workflow /> },
  { id: 'p9', title: 'Payments & Commerce', description: '', icon: <CreditCard /> },
  { id: 'p10', title: 'Automated Chatbot', description: '', icon: <Bot /> },
  { id: 'p11', title: 'Security & Compliance', description: '', icon: <Lock /> },
  { id: 'p12', title: 'Multi-Agent Login', description: '', icon: <Headphones /> },
  { id: 'p13', title: 'Contact CRM', description: '', icon: <Database /> },
  { id: 'p14', title: 'Automation Builder', description: '', icon: <Zap /> },
  { id: 'p15', title: '24/7 Scalability', description: '', icon: <Globe /> },
];

export const TRUST_STATS = [
  { label: "Faster Response", value: "90%" },
  { label: "Less Manual Work", value: "70%" },
  { label: "More Conversions", value: "25%" },
  { label: "Productivity Boost", value: "5x" }
];

export const ONBOARDING_STEPS = [
  { title: "Connect WhatsApp", icon: <Smartphone className="w-5 h-5" /> },
  { title: "Add Team", icon: <Users className="w-5 h-5" /> },
  { title: "Import Contacts", icon: <FileText className="w-5 h-5" /> },
  { title: "Set Automation", icon: <Zap className="w-5 h-5" /> },
  { title: "Start Chatting", icon: <MessageCircle className="w-5 h-5" /> },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Starter',
    price: '$0',
    period: '/mo',
    description: 'Perfect for small businesses just starting out.',
    features: ['100 AI Conversations', 'Basic Automation', '1 User Seat', 'Standard Support'],
    cta: 'Get Started - Free',
    highlight: 'Free Forever'
  },
  {
    name: 'Growth',
    price: '$49',
    period: '/mo',
    description: 'For growing teams that need power and scale.',
    features: ['Unlimited AI Conversations', 'Digital Twin Training', '5 Team Members', 'Broadcasts', 'Analytics'],
    cta: 'Start Free Trial',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For organizations requiring custom integrations.',
    features: ['Dedicated Account Manager', 'Custom LLM Fine-tuning', 'Unlimited Seats', 'SLA Guarantees', 'API Access'],
    cta: 'Contact Sales'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Rahul Verma',
    role: 'Founder',
    company: 'Urban Decor',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    quote: "We replaced 3 tools with UNPHUC. Our response time went from hours to seconds, and conversion rates doubled in the first month."
  },
  {
    id: 't2',
    name: 'Priya Sharma',
    role: 'Sales Head',
    company: 'EduTech India',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    quote: "The Digital Twin feature is insane. It handles 80% of our student queries automatically. My team focuses only on closing."
  },
  {
    id: 't3',
    name: 'Amit Patel',
    role: 'Director',
    company: 'Gujarat Textiles',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    quote: "Voice note transcription saves us hours every day. Field agents just talk, and the CRM updates itself. Highly recommended."
  }
];

export const COMPANIES = ["Lenskart", "Nykaa", "Zomato", "Dunzo", "Meesho"];

export const FEATURES = WHY_UNPHUC_FEATURES;