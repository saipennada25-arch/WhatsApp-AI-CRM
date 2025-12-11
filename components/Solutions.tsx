import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, MessageCircle, Instagram, Megaphone, ShoppingBag, Zap, Brain, Smile, Frown, AlertCircle } from 'lucide-react';
import { DEEP_DIVE_SECTIONS } from '../constants';

const Solutions: React.FC = () => {
  return (
    <div id="solutions" className="flex flex-col space-y-0">
      {DEEP_DIVE_SECTIONS.map((section, index) => (
        <Section key={section.id} data={section} index={index} />
      ))}
    </div>
  );
};

const Section: React.FC<{ data: typeof DEEP_DIVE_SECTIONS[0], index: number }> = ({ data, index }) => {
  const isEven = index % 2 === 0;

  // Theme configurations
  const themeStyles = {
    blue: {
      gradStart: 'from-[#0044FF]/20',
      gradEnd: 'to-[#66AAFF]/20',
      accent: 'text-blue-600',
      bg: 'bg-blue-50',
      blob: 'bg-blue-200',
      bubble: 'bg-blue-500',
      button: 'bg-blue-600 hover:bg-blue-700',
    },
    purple: {
      gradStart: 'from-[#7A00FF]/20',
      gradEnd: 'to-[#C27DFF]/20',
      accent: 'text-purple-600',
      bg: 'bg-purple-50',
      blob: 'bg-purple-200',
      bubble: 'bg-purple-500',
      button: 'bg-purple-600 hover:bg-purple-700',
    },
    teal: {
      gradStart: 'from-[#00B89F]/20',
      gradEnd: 'to-[#5ED6C2]/20',
      accent: 'text-teal-600',
      bg: 'bg-teal-50',
      blob: 'bg-teal-200',
      bubble: 'bg-teal-500',
      button: 'bg-teal-600 hover:bg-teal-700',
    },
  };

  // @ts-ignore
  const theme = themeStyles[data.theme] || themeStyles.blue;

  return (
    <section className="py-24 overflow-hidden relative">
       {/* Background gradient hint */}
      <div className={`absolute top-0 ${isEven ? 'right-0' : 'left-0'} w-1/2 h-full bg-gradient-to-b ${theme.gradStart} ${theme.gradEnd} opacity-30 blur-3xl -z-10`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col lg:flex-row items-center gap-16 ${isEven ? '' : 'lg:flex-row-reverse'}`}>
          
          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase mb-6 ${theme.bg} ${theme.accent}`}>
              {data.id.toUpperCase()} SUITE
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold font-display text-gray-900 mb-6 leading-tight">
              {data.title}
            </h2>
            
            <ul className="space-y-4 mb-8">
              {data.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle2 className={`w-6 h-6 mr-3 flex-shrink-0 ${theme.accent}`} />
                  <span className="text-lg text-gray-600 font-medium">{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-3 gap-6 border-t border-gray-100 pt-8">
              {data.metrics.map((metric, i) => (
                <div key={i}>
                  <div className={`text-3xl font-bold font-display ${theme.accent}`}>{metric.value}</div>
                  <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide mt-1">{metric.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Animation Side */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="flex-1 relative w-full h-[500px] flex items-center justify-center"
          >
            {/* Ambient Back Glow */}
            <div className={`absolute w-[400px] h-[400px] rounded-full ${theme.blob} blur-[80px] opacity-60 animate-pulse`} />

            {/* Visual Logic Switcher */}
            {data.id === 'sales' && <SalesAnimation theme={theme} />}
            {data.id === 'marketing' && <MarketingAnimation theme={theme} />}
            {data.id === 'support' && <SupportAnimation theme={theme} />}

          </motion.div>
        </div>
      </div>
    </section>
  );
};

// 🎯 SALES VISUAL
const SalesAnimation = ({ theme }: { theme: any }) => (
  <div className="relative w-[320px]">
    {/* Product Card */}
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-2xl p-4 shadow-xl border border-gray-100 mb-4 z-10 relative"
    >
      <div className="h-32 bg-gray-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Shoe" className="object-cover w-full h-full" />
      </div>
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-bold text-gray-900 text-sm">Nike Air Max 270</h4>
          <p className="text-xs text-gray-500">Only 2 left in stock</p>
        </div>
        <span className="font-bold text-blue-600 text-sm">$120</span>
      </div>
      <button className="w-full bg-[#25D366] text-white py-2 rounded-lg font-bold text-sm flex items-center justify-center space-x-2">
        <MessageCircle size={16} /> <span>Send Order</span>
      </button>
    </motion.div>

    {/* Chat Bubbles */}
    <div className="space-y-3 relative z-20">
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-3 rounded-xl rounded-tl-none shadow-lg max-w-[85%] border border-gray-100"
      >
        <p className="text-sm text-gray-700">I love these! Do you have size 10?</p>
      </motion.div>

      <motion.div 
        initial={{ x: 20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-blue-500 p-3 rounded-xl rounded-tr-none shadow-lg max-w-[85%] ml-auto text-white"
      >
        <p className="text-sm">Yes! Size 10 is available. I've reserved it for 30 mins. Want to checkout?</p>
      </motion.div>
    </div>

    {/* AI Tag Floating */}
    <motion.div 
      animate={{ y: [0, -5, 0] }}
      transition={{ repeat: Infinity, duration: 3 }}
      className="absolute -right-8 top-1/2 bg-white px-3 py-2 rounded-lg shadow-lg border border-blue-100 flex items-center gap-2 z-30"
    >
      <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
      <span className="text-xs font-bold text-blue-800">Intent: High Purchase</span>
    </motion.div>
  </div>
);

// 🎯 MARKETING VISUAL
const MarketingAnimation = ({ theme }: { theme: any }) => (
  <div className="relative w-full max-w-sm">
    {/* Instagram Ad Mockup */}
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="absolute top-0 left-0 bg-white p-3 rounded-2xl shadow-xl border border-gray-100 w-48 z-10 -rotate-6 origin-bottom-left"
    >
      <div className="flex items-center space-x-2 mb-2">
        <Instagram size={14} className="text-pink-600" />
        <span className="text-xs font-bold text-gray-900">Sponsored</span>
      </div>
      <div className="aspect-square bg-gray-100 rounded-lg mb-2 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" className="object-cover w-full h-full" alt="Ad" />
      </div>
      <div className="bg-blue-500 text-white text-[10px] text-center py-1.5 rounded font-bold">
        Send Message
      </div>
    </motion.div>

    {/* Connection Arc (SVG) */}
    <svg className="absolute top-20 left-40 w-24 h-24 z-0 pointer-events-none">
       <path d="M 0 10 Q 50 10 70 60" fill="none" stroke="#C27DFF" strokeWidth="2" strokeDasharray="4 4" />
    </svg>

    {/* WhatsApp Chat Popup */}
    <motion.div 
      initial={{ x: 20, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="absolute top-32 right-0 bg-white p-4 rounded-2xl shadow-2xl border-l-4 border-[#25D366] w-64 z-20"
    >
      <div className="flex items-center space-x-2 mb-2">
        <div className="w-2 h-2 bg-green-500 rounded-full" />
        <span className="text-xs font-bold text-gray-500">Auto-Triggered</span>
      </div>
      <div className="bg-[#DCF8C6] p-2 rounded-lg text-sm text-gray-800 mb-2">
        Hey! 👋 Saw you liked our Summer Collection. Here's a 10% coupon just for you!
      </div>
      <div className="text-xs text-gray-400 text-right">Just now</div>
    </motion.div>

    {/* Floating Ad Icons */}
    <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -top-10 right-10 bg-white p-2 rounded-full shadow-lg">
      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">G</div>
    </motion.div>
    <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }} className="absolute bottom-0 left-10 bg-white p-2 rounded-full shadow-lg">
      <Megaphone size={20} className="text-purple-500" />
    </motion.div>
  </div>
);

// 🎯 SUPPORT VISUAL
const SupportAnimation = ({ theme }: { theme: any }) => (
  <div className="relative w-[320px]">
    {/* Background Circles */}
    <div className="absolute inset-0 flex items-center justify-center">
       <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.2 }} className="w-[300px] h-[300px] border border-teal-100 rounded-full" />
       <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.4 }} className="w-[200px] h-[200px] border border-teal-200 rounded-full absolute" />
    </div>

    {/* Main Chat Interface */}
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden relative z-10"
    >
      <div className="bg-[#075E54] p-3 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-white">
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <Brain size={14} />
          </div>
          <span className="text-xs font-bold">Support Twin</span>
        </div>
      </div>
      <div className="bg-[#efeae2] p-4 space-y-3 h-64 overflow-hidden relative">
        <div className="bg-white p-2 rounded-lg rounded-tl-none shadow-sm max-w-[90%] text-sm">
           I've been waiting 3 days for my refund! This is ridiculous 😡
        </div>
        <div className="bg-[#d9fdd3] p-2 rounded-lg rounded-tr-none shadow-sm max-w-[90%] ml-auto text-sm">
           I completely understand your frustration, Rahul. I've just escalated this to our finance team with high priority 🔴. You'll receive the refund confirmation within 2 hours.
        </div>
        
        {/* Sentiment Analysis Overlay */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg border border-red-100 flex items-center justify-between"
        >
          <div className="flex items-center space-x-2">
            <AlertCircle size={16} className="text-red-500" />
            <span className="text-xs font-bold text-red-700">High Urgency Detected</span>
          </div>
          <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-bold">Angry</span>
        </motion.div>
      </div>
    </motion.div>

    {/* Floating Sentiment Icons */}
    <motion.div 
      animate={{ x: [0, 10, 0], y: [0, -5, 0] }}
      transition={{ repeat: Infinity, duration: 5 }}
      className="absolute -right-6 top-10 bg-white p-2 rounded-full shadow-lg text-yellow-500 z-20"
    >
      <Frown size={24} />
    </motion.div>
    <motion.div 
      animate={{ x: [0, -10, 0], y: [0, 5, 0] }}
      transition={{ repeat: Infinity, duration: 4, delay: 1 }}
      className="absolute -left-6 bottom-20 bg-white p-2 rounded-full shadow-lg text-green-500 z-20"
    >
      <Smile size={24} />
    </motion.div>
  </div>
);

export default Solutions;