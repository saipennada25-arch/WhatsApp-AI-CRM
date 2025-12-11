
import React from 'react';
import { motion } from 'framer-motion';
import { WHY_UNPHUC_FEATURES } from '../constants';

const WhyUnphuc: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold font-display text-gray-900 mb-6">
            9 AI Superpowers <br/><span className="text-brand-600">no other CRM has</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl">
            We don't just route messages. We understand them. Our AI engine is purpose-built with unique capabilities for commerce and support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_UNPHUC_FEATURES.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white rounded-3xl p-1 border border-gray-100 hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-2xl"
            >
              {/* Gradient Border on Hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-300 via-purple-300 to-blue-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>
              
              <div className="bg-white rounded-[1.3rem] p-8 h-full flex flex-col items-start relative overflow-hidden">
                  {/* Subtle Background Splash */}
                  <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full ${feature.color ? feature.color.split(' ')[0] : 'bg-gray-100'} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity`}></div>
                  
                  <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-sm`}>
                    {feature.icon}
                  </div>
                  
                  <h4 className="text-xl font-bold font-display text-gray-900 mb-3 group-hover:text-brand-700 transition-colors">
                      {feature.title}
                  </h4>
                  
                  <p className="text-gray-600 leading-relaxed font-medium relative z-10">
                      {feature.description}
                  </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUnphuc;