
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star } from 'lucide-react';

const Performance: React.FC = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold font-display text-gray-900 mb-6">
            10X your performance with UNPHUC AI
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed font-medium">
            Let UNPHUC AI handle repetitive work for you, so your team can focus on real conversations that build relationships and revenue.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Card 1 - Pink/Purple */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative"
          >
             {/* Glowing Gradient Border */}
             <div className="absolute -inset-[3px] bg-gradient-to-r from-[#FF7CE9] to-[#C77BFF] rounded-[2.5rem] opacity-70 blur-sm group-hover:opacity-100 group-hover:blur-md transition-all duration-500"></div>
             
             {/* Card Content */}
             <div className="relative h-[500px] bg-white rounded-[2.3rem] overflow-hidden flex flex-col items-center justify-center p-8">
                 {/* Background Effects */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-pink-100/40 rounded-full blur-[80px]"></div>
                 <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100/60 rounded-full blur-2xl"></div>

                 <h3 className="text-3xl font-bold font-display text-gray-900 mb-12 relative z-10 text-center">
                    Qualify & Convert Leads 24/7
                 </h3>

                 <div className="w-full max-w-sm relative z-10 space-y-6">
                     {/* Customer Message */}
                     <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                     >
                        <motion.div 
                            animate={{ y: [0, -6, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="bg-blue-50 p-5 rounded-2xl rounded-tl-none shadow-sm border border-blue-100 text-gray-700 font-medium leading-relaxed relative"
                        >
                            Hey, we’re evaluating your product for our team. Can you share more details?
                        </motion.div>
                     </motion.div>

                     {/* AI Reply */}
                     <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                     >
                        <motion.div 
                            animate={{ y: [0, -6, 0] }}
                            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
                            className="bg-white p-5 rounded-2xl rounded-tr-none shadow-xl border-2 border-pink-100 text-gray-800 font-medium leading-relaxed relative ml-8"
                        >
                            <Sparkles className="absolute -top-3 -right-3 text-pink-500 w-6 h-6 animate-pulse" fill="#FF7CE9" />
                            Hi there! Thanks for considering UNPHUC CRM. What features matter most to your business?
                        </motion.div>
                     </motion.div>
                 </div>
                 
                 {/* Floating Particles */}
                 <div className="absolute inset-0 pointer-events-none">
                     <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute top-20 left-10 w-3 h-3 bg-pink-300 rounded-full opacity-60"></motion.div>
                     <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 5 }} className="absolute bottom-20 right-10 w-2 h-2 bg-purple-300 rounded-full opacity-60"></motion.div>
                 </div>
             </div>
          </motion.div>

          {/* Card 2 - Blue */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative"
          >
             {/* Glowing Gradient Border */}
             <div className="absolute -inset-[3px] bg-gradient-to-r from-[#009DFF] to-[#66CCFF] rounded-[2.5rem] opacity-70 blur-sm group-hover:opacity-100 group-hover:blur-md transition-all duration-500"></div>
             
             {/* Card Content */}
             <div className="relative h-[500px] bg-white rounded-[2.3rem] overflow-hidden flex flex-col items-center justify-center p-8">
                 {/* Background Effects */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-blue-100/40 rounded-full blur-[80px]"></div>
                 <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-100/60 rounded-full blur-2xl"></div>

                 <h3 className="text-3xl font-bold font-display text-gray-900 mb-12 relative z-10 text-center">
                    60% queries answered instantly!
                 </h3>

                 <div className="w-full max-w-sm relative z-10 space-y-6">
                     {/* Customer Message */}
                     <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                     >
                        <motion.div
                            animate={{ y: [0, -6, 0] }}
                            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                            className="bg-green-50 p-5 rounded-2xl rounded-tl-none shadow-sm border border-green-100 text-gray-700 font-medium leading-relaxed relative"
                        >
                            How do I track all my WhatsApp leads?
                        </motion.div>
                     </motion.div>

                     {/* AI Reply */}
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2, type: "spring" }}
                     >
                        <motion.div
                            animate={{ y: [0, -6, 0] }}
                            transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 0.8 }}
                            className="bg-white p-5 rounded-2xl rounded-tr-none shadow-xl border-2 border-teal-100 text-gray-800 font-medium leading-relaxed relative ml-8"
                        >
                            <Star className="absolute -top-3 -right-3 text-teal-400 w-6 h-6 animate-spin-slow" fill="#2dd4bf" style={{ animationDuration: '3s' }} />
                            With UNPHUC AI, every lead is auto-captured, scored, and organized. I’ll walk you through it!
                        </motion.div>
                     </motion.div>
                 </div>

                 {/* Floating Particles */}
                 <div className="absolute inset-0 pointer-events-none">
                     <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 6 }} className="absolute top-32 right-12 w-3 h-3 bg-blue-300 rounded-full opacity-60"></motion.div>
                     <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute bottom-12 left-20 w-4 h-4 bg-teal-300 rounded-full opacity-60"></motion.div>
                 </div>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Performance;
