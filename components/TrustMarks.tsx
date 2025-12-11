import React from 'react';
import { TRUST_STATS } from '../constants';
import { motion } from 'framer-motion';

const TrustMarks: React.FC = () => {
  return (
    <section className="py-20 bg-gray-900 text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold font-display mb-4">Trusted by 14,000+ small businesses across India</h2>
          <div className="flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500 mt-8">
             {/* Simple Text Logos for specific brands in Indian context if real logos aren't available */}
             <span className="text-2xl font-bold">Lenskart</span>
             <span className="text-2xl font-bold">Nykaa</span>
             <span className="text-2xl font-bold">Zomato</span>
             <span className="text-2xl font-bold">Dunzo</span>
             <span className="text-2xl font-bold">Meesho</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-800">
          {TRUST_STATS.map((stat, idx) => (
             <motion.div 
               key={idx}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1 }}
               className="px-4"
             >
                <div className="text-4xl md:text-5xl font-extrabold font-display text-brand-400 mb-2">{stat.value}</div>
                <div className="text-sm md:text-base text-gray-400 font-medium">{stat.label}</div>
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustMarks;