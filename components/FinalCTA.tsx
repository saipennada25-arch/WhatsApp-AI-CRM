import React from 'react';
import { motion } from 'framer-motion';

interface FinalCTAProps {
  onSignupClick?: () => void;
}

const FinalCTA: React.FC<FinalCTAProps> = ({ onSignupClick }) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-brand-600 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden"
        >
          {/* Decorative Circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full translate-x-1/2 translate-y-1/2"></div>

          <h2 className="text-3xl md:text-5xl font-extrabold font-display mb-6 relative z-10">
            Start converting WhatsApp chats <br /> into sales — automatically.
          </h2>
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4 relative z-10">
            <button
              onClick={onSignupClick}
              className="px-8 py-4 bg-white text-brand-700 font-bold rounded-full hover:bg-gray-50 transition-colors shadow-lg"
            >
              Get Started Free
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-colors">
              Talk to Sales
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;