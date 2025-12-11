
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShoppingBag, Database, Layout, Mail, CreditCard, BarChart, ShoppingCart, Cloud, MessageCircle, Link, Repeat } from 'lucide-react';

interface IntegrationItem {
  name: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
}

const Integrations: React.FC = () => {
  const leftIntegrations: IntegrationItem[] = [
    { name: 'Salesforce', icon: <Cloud size={26} />, color: 'text-[#00A1E0]', bg: 'bg-[#F0F9FF]' },
    { name: 'HubSpot', icon: <Layout size={26} />, color: 'text-[#FF7A59]', bg: 'bg-[#FFF5F2]' },
    { name: 'Zoho', icon: <Database size={26} />, color: 'text-[#D7B102]', bg: 'bg-[#FFFBE6]' },
    { name: 'Pabbly', icon: <Link size={26} />, color: 'text-green-600', bg: 'bg-green-50' },
    { name: 'Leadsquared', icon: <BarChart size={26} />, color: 'text-red-500', bg: 'bg-red-50' },
    { name: 'PayTabs', icon: <CreditCard size={26} />, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  ];

  const rightIntegrations: IntegrationItem[] = [
    { name: 'Shopify', icon: <ShoppingBag size={26} />, color: 'text-[#96BF48]', bg: 'bg-[#F2F7E6]' },
    { name: 'WooCommerce', icon: <ShoppingCart size={26} />, color: 'text-[#96588A]', bg: 'bg-[#F8F0F6]' },
    { name: 'Klaviyo', icon: <Mail size={26} />, color: 'text-gray-800', bg: 'bg-gray-100' },
    { name: 'Zapier', icon: <Zap size={26} />, color: 'text-[#FF4F00]', bg: 'bg-[#FFF0E6]' },
    { name: 'Twilio', icon: <MessageCircle size={26} />, color: 'text-[#F22F46]', bg: 'bg-[#FEF2F3]' },
    { name: 'Make.com', icon: <Repeat size={26} />, color: 'text-[#6232F9]', bg: 'bg-[#F2F0FE]' },
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <h2 className="text-brand-600 font-bold tracking-wide uppercase text-sm mb-3">Integrations</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold font-display text-gray-900 mb-6">
            Connects with everything.
          </h3>
          <p className="text-xl text-gray-600">
            Sync data, trigger workflows, and automate actions across your entire stack.
          </p>
        </div>

        <div className="relative flex justify-center items-center h-[600px]">
          
          {/* Connection Lines Layer (SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
             <defs>
               <linearGradient id="lineGradientLeft" x1="100%" y1="0%" x2="0%" y2="0%">
                 <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
                 <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
               </linearGradient>
               <linearGradient id="lineGradientRight" x1="0%" y1="0%" x2="100%" y2="0%">
                 <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
                 <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
               </linearGradient>
             </defs>
             {leftIntegrations.map((_, i) => (
               <motion.path
                  key={`l-${i}`}
                  d={`M ${50} ${50} C ${35} ${50}, ${30} ${15 + (i * 14)}, ${15} ${15 + (i * 14)}`} 
                  fill="none"
                  stroke="url(#lineGradientLeft)"
                  strokeWidth="3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.2 }}
                  vectorEffect="non-scaling-stroke"
                  transform={`translate(${typeof window !== 'undefined' ? window.innerWidth < 768 ? 200 : 600 : 600}, 300) scale(5, 4)`}
                  className="hidden md:block opacity-30"
               />
             ))}
          </svg>

          {/* Central Hub */}
          <div className="relative z-20 flex-shrink-0 mx-12 md:mx-24">
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-[2.5rem] shadow-2xl flex items-center justify-center border-8 border-brand-50 relative"
            >
              <div className="w-24 h-24 md:w-28 md:h-28 bg-brand-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-inner">
                <Zap size={64} fill="currentColor" />
              </div>
              {/* Glow */}
              <div className="absolute inset-0 bg-brand-400 blur-3xl opacity-30 -z-10 rounded-full"></div>
            </motion.div>
          </div>

          {/* Left Stack */}
          <div className="flex flex-col gap-4 absolute left-4 md:left-[5%] lg:left-[15%]">
            {leftIntegrations.map((item, index) => (
              <IntegrationCard key={index} item={item} direction="left" index={index} />
            ))}
          </div>

          {/* Right Stack */}
          <div className="flex flex-col gap-4 absolute right-4 md:right-[5%] lg:right-[15%]">
            {rightIntegrations.map((item, index) => (
              <IntegrationCard key={index} item={item} direction="right" index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface IntegrationCardProps {
  item: IntegrationItem;
  direction: 'left' | 'right';
  index: number;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({ item, direction, index }) => (
  <motion.div
    initial={{ x: direction === 'left' ? -50 : 50, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ scale: 1.05, x: direction === 'left' ? 5 : -5 }}
    className={`bg-white p-4 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-5 w-48 md:w-64 backdrop-blur-sm z-10 cursor-default group ${direction === 'left' ? 'flex-row-reverse md:flex-row' : 'flex-row'}`}
  >
     <div className={`w-14 h-14 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform`}>
         {item.icon}
     </div>
     <span className="font-bold text-base text-gray-800">{item.name}</span>
     
     {/* Connection Line Stub for visuals */}
     <div className={`absolute top-1/2 w-12 h-[3px] bg-gray-100 hidden md:block ${direction === 'left' ? '-right-12 bg-gradient-to-r from-gray-200 to-transparent' : '-left-12 bg-gradient-to-l from-gray-200 to-transparent'}`}></div>
  </motion.div>
);

export default Integrations;
