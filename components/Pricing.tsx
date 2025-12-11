
import React from 'react';
import { PRICING_PLANS } from '../constants';
import { Check } from 'lucide-react';

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold font-display text-gray-900 mb-4">Simple, transparent pricing</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start for free. Scale as you grow.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PRICING_PLANS.map((plan) => (
            <div 
              key={plan.name}
              className={`relative bg-white rounded-2xl p-8 border transition-all duration-300 flex flex-col hover:-translate-y-2 hover:shadow-2xl ${
                plan.popular 
                  ? 'border-brand-500 shadow-xl scale-105 z-10 hover:ring-4 hover:ring-brand-100' 
                  : 'border-gray-200 shadow-sm'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-600 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide shadow-lg">
                  Most Popular
                </div>
              )}
               {plan.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                  {plan.highlight}
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-xl font-bold font-display text-gray-900">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold font-display text-gray-900">{plan.price}</span>
                  <span className="ml-1 text-gray-500 font-medium">{plan.period}</span>
                </div>
                <p className="mt-4 text-gray-600 text-sm">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="flex-shrink-0 w-5 h-5 text-brand-500 mr-3" />
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 rounded-xl font-bold transition-all duration-300 ${
                plan.popular 
                  ? 'bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50' 
                  : 'bg-brand-50 text-brand-700 hover:bg-brand-100'
              }`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
