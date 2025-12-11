import React from 'react';
import { PLATFORM_MODULES } from '../constants';

const PlatformOverview: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="text-sm font-bold text-brand-600 uppercase tracking-widest mb-2">The Complete Stack</h2>
            <h3 className="text-3xl font-extrabold font-display text-gray-900">Everything you need to scale</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {PLATFORM_MODULES.map((module) => (
            <div 
              key={module.id} 
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-200 transition-all flex flex-col items-center text-center group"
            >
               <div className="text-gray-400 mb-3 group-hover:text-brand-600 transition-colors">
                   {module.icon}
               </div>
               <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900">{module.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformOverview;