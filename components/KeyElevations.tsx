import React from 'react';
import { motion } from 'framer-motion';
import { KEY_ELEVATIONS } from '../constants';

const KeyElevations: React.FC = () => {
  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
          {KEY_ELEVATIONS.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center group cursor-default"
            >
              <div className="mb-3 p-3 bg-gray-50 rounded-full group-hover:bg-brand-50 transition-colors duration-300">
                {stat.icon}
              </div>
              <div className="text-2xl font-extrabold font-display text-gray-900 mb-1">{stat.value}</div>
              <p className="text-xs text-gray-500 font-medium leading-snug px-2">{stat.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyElevations;