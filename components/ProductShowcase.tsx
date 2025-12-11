import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, CheckCheck, Send, Paperclip, MoreVertical, Smartphone, X, Zap } from 'lucide-react';

const MESSAGES = [
    { type: 'in', text: "Hi, I'm interested in the Premium Plan, but I need to know if it integrates with Shopify?" },
    { type: 'out', text: "Hey! 👋 Yes, UNPHUC integrates natively with Shopify. I can sync your orders, inventory, and customer data in about 2 minutes. Would you like to see how it works?" },
    { type: 'in', text: "That would be great. Can it handle refunds automatically?" },
    { type: 'out', text: "Absolutely. I can process refunds based on your policy (e.g., store credit instantly, original payment method within 5 days). I'll send you a quick video demo." },
    { type: 'media', text: "Demo_Refund_Flow.mp4", sub: "12 MB • Video" }
];

const ProductShowcase: React.FC = () => {
    const [msgIndex, setMsgIndex] = useState(0);

    useEffect(() => {
        if (msgIndex < MESSAGES.length) {
            const timeout = setTimeout(() => {
                setMsgIndex(prev => prev + 1);
            }, msgIndex === 0 ? 1000 : 2500);
            return () => clearTimeout(timeout);
        } else {
             const timeout = setTimeout(() => {
                setMsgIndex(0);
            }, 5000);
             return () => clearTimeout(timeout);
        }
    }, [msgIndex]);

    return (
        <section id="demo" className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Interactive Mobile Mockup */}
                    <div className="relative mx-auto lg:mx-0 w-[320px] h-[650px] bg-gray-900 rounded-[3rem] border-8 border-gray-900 shadow-2xl overflow-hidden">
                        {/* Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-20"></div>
                        
                        {/* WhatsApp Header */}
                        <div className="bg-[#075E54] text-white pt-10 pb-3 px-4 flex items-center justify-between z-10 relative shadow-md">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs">
                                    <Smartphone size={16} />
                                </div>
                                <div>
                                    <div className="font-bold text-sm">UNPHUC Support</div>
                                    <div className="text-[10px] opacity-80">Online</div>
                                </div>
                            </div>
                            <MoreVertical size={18} />
                        </div>

                        {/* Chat Background */}
                        <div className="bg-[#E5DDD5] absolute inset-0 pt-24 pb-16 overflow-y-auto px-3 space-y-3">
                             <div className="text-center text-xs text-gray-500 my-4 bg-[#E1F3FB] py-1 rounded-md shadow-sm border border-blue-100 mx-4">
                                 Messages are secured with end-to-end encryption.
                             </div>

                             <AnimatePresence mode="popLayout">
                                {MESSAGES.slice(0, msgIndex).map((msg, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        layout
                                        className={`flex w-full ${msg.type === 'in' ? 'justify-start' : 'justify-end'}`}
                                    >
                                        <div className={`max-w-[80%] rounded-lg p-2 shadow-sm text-sm relative ${
                                            msg.type === 'in' 
                                            ? 'bg-white rounded-tl-none text-gray-800' 
                                            : 'bg-[#DCF8C6] rounded-tr-none text-gray-800'
                                        }`}>
                                            {msg.type === 'media' ? (
                                                <div className="flex items-center space-x-3 bg-white/50 p-2 rounded mb-1">
                                                    <div className="bg-red-500 w-8 h-8 rounded flex items-center justify-center text-white font-bold text-xs">VID</div>
                                                    <div>
                                                        <div className="font-semibold">{msg.text}</div>
                                                        <div className="text-xs opacity-60">{msg.sub}</div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <p className="leading-snug">{msg.text}</p>
                                            )}
                                            
                                            <div className="flex justify-end items-center space-x-1 mt-1 opacity-60">
                                                <span className="text-[10px]">10:{30 + idx} AM</span>
                                                {msg.type !== 'in' && <CheckCheck size={12} className="text-blue-500" />}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                                {msgIndex < MESSAGES.length && msgIndex % 2 !== 0 && (
                                     <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex justify-start w-full">
                                         <div className="bg-white rounded-lg p-2 rounded-tl-none shadow-sm flex space-x-1 items-center h-8">
                                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                                         </div>
                                     </motion.div>
                                )}
                             </AnimatePresence>
                        </div>

                        {/* Input Area */}
                        <div className="absolute bottom-0 w-full bg-white p-2 flex items-center space-x-2 z-20">
                            <div className="flex-1 bg-gray-100 rounded-full h-9 px-4 flex items-center text-gray-400 text-sm">
                                Type a message...
                            </div>
                            <div className="w-10 h-10 bg-[#075E54] rounded-full flex items-center justify-center text-white shadow-md">
                                <Send size={18} />
                            </div>
                        </div>

                    </div>

                    {/* Text Content */}
                    <div>
                         <div className="inline-block bg-brand-100 text-brand-700 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wide mb-6">
                            Live Demo
                        </div>
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
                            Feels like Magic. <br/>
                            <span className="text-brand-600">Works like Logic.</span>
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            UNPHUC isn't just a chatbot. It's a complete CRM that lives inside WhatsApp. 
                            It understands context, processes images, and even handles complex workflows like refunds 
                            or appointment scheduling without human intervention.
                        </p>
                        
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
                                    <Zap size={24} />
                                </div>
                                <div className="ml-4">
                                    <h4 className="text-xl font-bold text-gray-900">Instant Response</h4>
                                    <p className="text-gray-600 mt-1">Under 200ms latency on average. Customers feel like they're chatting with a super-human.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
                                    <Smartphone size={24} />
                                </div>
                                <div className="ml-4">
                                    <h4 className="text-xl font-bold text-gray-900">Native Mobile Experience</h4>
                                    <p className="text-gray-600 mt-1">No apps to download. It works right where your customers already are—WhatsApp.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10">
                            <button className="px-8 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-lg">
                                Explore the Automation Builder
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ProductShowcase;