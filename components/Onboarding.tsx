import React from 'react';
import { motion } from 'framer-motion';
import { ONBOARDING_STEPS } from '../constants';
import { ArrowRight } from 'lucide-react';

const Onboarding: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold font-display text-gray-900 mb-4">Go live in minutes, not months</h2>
            <p className="text-gray-600">No coding required. Simple drag-and-drop setup.</p>
        </div>

        <div className="relative">
             {/* Connecting Line */}
             <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 z-0"></div>
             
             <div className="grid grid-cols-2 md:grid-cols-5 gap-8 relative z-10">
                 {ONBOARDING_STEPS.map((step, idx) => (
                     <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.15 }}
                        className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg flex flex-col items-center text-center group hover:border-brand-500 transition-colors"
                     >
                         <div className="w-12 h-12 rounded-full bg-gray-50 text-gray-500 flex items-center justify-center mb-4 group-hover:bg-brand-600 group-hover:text-white transition-all shadow-sm">
                             {step.icon}
                         </div>
                         <h4 className="font-bold text-gray-900 text-sm mb-1">{step.title}</h4>
                         <span className="text-xs text-gray-400 font-mono">Step 0{idx + 1}</span>
                     </motion.div>
                 ))}
             </div>
        </div>

        <div className="mt-16 text-center">
             <button className="inline-flex items-center text-brand-600 font-bold hover:underline">
                 View implementation guide <ArrowRight className="ml-2 w-4 h-4" />
             </button>
        </div>
      </div>
    </section>
  );
};

export default Onboarding;