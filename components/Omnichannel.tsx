
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Facebook, Instagram, Phone, Mail, MessageSquare, Globe, Share2, Smartphone } from 'lucide-react';

const ChannelIcon = ({ icon: Icon, className, delay, x, y, label }: { icon: any, className: string, delay: number, x: string, y: string, label: string }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5, type: "spring" }}
    className="absolute flex flex-col items-center justify-center gap-3"
    style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
  >
    <motion.div 
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
      className={`w-20 h-20 rounded-[1.25rem] shadow-xl flex items-center justify-center z-10 border border-white/10 ${className}`}
    >
      <Icon size={32} strokeWidth={1.5} />
    </motion.div>
    <span className="text-xs font-bold text-gray-600 bg-white/90 px-3 py-1 rounded-full shadow-md backdrop-blur-md whitespace-nowrap border border-gray-100/50">
        {label}
    </span>
  </motion.div>
);

const Omnichannel: React.FC = () => {
  return (
    <section className="py-24 bg-white overflow-hidden border-t border-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="relative z-10 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-extrabold font-display text-gray-900 mb-6 leading-tight">
                WhatsApp at the core. <br />
                <span className="text-brand-600">Conversations everywhere.</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Start with WhatsApp and naturally extend to every channel your customers love. 
                Manage website chat, Instagram, Facebook, SMS, calls, and social channels 
                from one unified inbox.
              </p>
              
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4 text-gray-700 font-medium text-lg">
                   <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                       <MessageCircle size={24} />
                   </div>
                   <span>Unified Customer Profile across all channels</span>
                </div>
                <div className="flex items-center space-x-4 text-gray-700 font-medium text-lg">
                   <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                       <Share2 size={24} />
                   </div>
                   <span>Seamless channel switching without context loss</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Visual - Radial Graphic */}
          <div className="relative h-[650px] flex items-center justify-center order-1 lg:order-2">
            {/* Concentric Circles */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="w-[280px] h-[280px] border border-green-100 rounded-full absolute" 
                 />
                 <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                    className="w-[480px] h-[480px] border border-green-100/60 rounded-full absolute" 
                 />
                 <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                    className="w-[680px] h-[680px] border border-green-50 rounded-full absolute" 
                 />
            </div>

            {/* Center Node (Authentic WhatsApp Symbol) */}
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="relative z-20 w-32 h-32 bg-white rounded-full shadow-2xl flex items-center justify-center border-[6px] border-white"
            >
                <div className="w-full h-full bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-inner relative overflow-hidden">
                    {/* Official WhatsApp Icon Path */}
                    <svg viewBox="0 0 24 24" fill="currentColor" className="text-white w-16 h-16 relative z-10">
                         <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                </div>
                {/* Pulse Effect */}
                <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
            </motion.div>

            {/* Orbiting Icons */}
            <ChannelIcon 
              icon={Facebook} 
              className="bg-[#1877F2] text-white" 
              label="Facebook" 
              x="50%" y="12%" delay={0.2} 
            />
            <ChannelIcon 
              icon={Instagram} 
              className="bg-gradient-to-tr from-[#FFD600] via-[#FF0169] to-[#D300C5] text-white" 
              label="Instagram" 
              x="88%" y="30%" delay={0.3} 
            />
            <ChannelIcon 
              icon={Globe} 
              className="bg-white text-gray-700 border border-gray-100" 
              label="Google Ads" 
              x="85%" y="70%" delay={0.4} 
            />
            <ChannelIcon 
              icon={MessageSquare} 
              className="bg-gradient-to-r from-[#00B2FF] to-[#006AFF] text-white" 
              label="Messenger" 
              x="50%" y="88%" delay={0.5} 
            />
            <ChannelIcon 
              icon={Share2} 
              className="bg-gray-900 text-white" 
              label="Meta Ads" 
              x="15%" y="70%" delay={0.6} 
            />
            <ChannelIcon 
              icon={Smartphone} 
              className="bg-blue-500 text-white" 
              label="RCS" 
              x="12%" y="30%" delay={0.7} 
            />
            
            {/* Inner Circle Icons - Adjusted for larger size */}
            <ChannelIcon 
              icon={Phone} 
              className="bg-green-600 text-white" 
              label="Voice" 
              x="25%" y="20%" delay={0.8} 
            />
            <ChannelIcon 
              icon={Mail} 
              className="bg-orange-500 text-white" 
              label="Email" 
              x="75%" y="20%" delay={0.9} 
            />

          </div>
        </div>
      </div>
    </section>
  );
};

export default Omnichannel;
