import React from 'react';
import { COMPANIES } from '../constants';

const LogoTicker: React.FC = () => {
  return (
    <section className="py-10 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-8">Trusted by 5,000+ High Growth Teams</p>
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {COMPANIES.map((company) => (
            <div key={company} className="text-xl md:text-2xl font-bold text-gray-400 font-sans tracking-tight hover:text-gray-800 transition-colors cursor-default">
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoTicker;
