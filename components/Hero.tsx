import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, CheckCircle, Zap, MoreVertical, Search, Filter, Phone, Video, Mic, Paperclip, Brain } from 'lucide-react';
import { HERO_CONTENT } from '../constants';

interface HeroProps {
    onSignupClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onSignupClick }) => {
    return (
        <section className="relative pt-32 pb-12 lg:pt-48 lg:pb-20 overflow-hidden bg-gradient-to-b from-white to-green-50/50">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-brand-100/40 rounded-full blur-3xl opacity-50 translate-x-1/4 -translate-y-1/4"></div>
            <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-3xl opacity-50 -translate-x-1/3 translate-y-1/4"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* Left Content */}
                    <div className="text-center lg:text-left z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-bold uppercase tracking-wider mb-6"
                        >
                            <span className="flex h-2 w-2 rounded-full bg-green-600 mr-2 animate-pulse"></span>
                            New: Digital Twin Engine 2.0
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl lg:text-7xl font-extrabold font-display tracking-tight leading-[1.1] mb-6 bg-gradient-to-r from-gray-900 via-brand-600 to-gray-900 bg-[length:200%_auto] animate-shine bg-clip-text text-transparent"
                        >
                            {HERO_CONTENT.headline}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                        >
                            {HERO_CONTENT.subheadline}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
                        >
                            <button
                                onClick={onSignupClick}
                                className="w-full sm:w-auto px-8 py-4 bg-brand-600 text-white rounded-xl font-bold font-display text-lg hover:bg-brand-700 transition-all shadow-xl shadow-brand-500/20 flex items-center justify-center group"
                            >
                                {HERO_CONTENT.ctaPrimary}
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-xl font-bold font-display text-lg hover:bg-gray-50 transition-all flex items-center justify-center hover:border-gray-300 shadow-sm">
                                <Play className="mr-2 w-5 h-5 fill-current text-gray-400" />
                                {HERO_CONTENT.ctaSecondary}
                            </button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="mt-8 flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500 font-medium"
                        >
                            <span className="flex items-center"><CheckCircle className="w-4 h-4 text-brand-600 mr-1.5" /> No credit card required</span>
                            <span className="flex items-center"><CheckCircle className="w-4 h-4 text-brand-600 mr-1.5" /> 14-day free trial</span>
                        </motion.div>
                    </div>

                    {/* Right Visual (Mockup) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="relative lg:h-[600px] flex items-center justify-center"
                    >
                        <InboxMockup />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const InboxMockup = () => {
    const [activeTab, setActiveTab] = useState('all');

    return (
        <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col h-[500px] lg:h-[550px]">
            {/* Header */}
            <div className="bg-[#00a884] p-3 flex justify-between items-center text-white shrink-0">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <img src="https://ui-avatars.com/api/?name=UN&background=random" alt="User" className="w-8 h-8 rounded-full" />
                    </div>
                    <div>
                        <div className="font-bold text-sm">UNPHUC Inbox</div>
                        <div className="text-[10px] text-white/80">Online</div>
                    </div>
                </div>
                <div className="flex space-x-3">
                    <Search size={18} />
                    <MoreVertical size={18} />
                </div>
            </div>

            {/* Sub-header / Filter */}
            <div className="bg-gray-50 border-b border-gray-100 p-2 flex space-x-2 overflow-x-auto shrink-0 scrollbar-hide">
                {['All', 'Unread', 'Awaiting Reply', 'Groups'].map(t => (
                    <button key={t} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600 whitespace-nowrap hover:bg-gray-100">
                        {t}
                    </button>
                ))}
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Chat List (Sidebar equivalent) */}
                <div className="w-1/3 border-r border-gray-100 bg-white flex flex-col overflow-y-auto">
                    {[
                        { name: "Rahul S.", time: "10:42", msg: "Price for bulk?", active: true, unread: 0 },
                        { name: "Sneha K.", time: "10:30", msg: "Payment sent!", active: false, unread: 2 },
                        { name: "John Doe", time: "09:15", msg: "Can I get a demo?", active: false, unread: 1 },
                        { name: "Support Bot", time: "Yesterday", msg: "Ticket #402 Closed", active: false, unread: 0 },
                    ].map((chat, i) => (
                        <div key={i} className={`p-3 border-b border-gray-50 flex space-x-2 cursor-pointer hover:bg-gray-50 ${chat.active ? 'bg-green-50/50' : ''}`}>
                            <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0 relative">
                                <img src={`https://ui-avatars.com/api/?name=${chat.name.replace(' ', '+')}&background=random`} className="rounded-full" />
                                {chat.active && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline">
                                    <h4 className="text-sm font-bold truncate text-gray-800">{chat.name}</h4>
                                    <span className="text-[10px] text-gray-400">{chat.time}</span>
                                </div>
                                <p className="text-xs text-gray-500 truncate">{chat.msg}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Chat Area */}
                <div className="flex-1 bg-[#efeae2] bg-opacity-30 relative flex flex-col">
                    <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                        <div className="flex justify-center mb-4">
                            <span className="bg-white/80 px-2 py-1 rounded shadow-sm text-[10px] text-gray-500 uppercase tracking-widest">Today</span>
                        </div>

                        <div className="flex justify-start">
                            <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm max-w-[85%] text-sm relative">
                                <p>Hi, I am looking for the enterprise plan pricing for 20 agents.</p>
                                <span className="text-[10px] text-gray-400 block text-right mt-1">10:41 AM</span>
                            </div>
                        </div>

                        {/* Animated Reply */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                            className="flex justify-end"
                        >
                            <div className="bg-[#d9fdd3] p-3 rounded-lg rounded-tr-none shadow-sm max-w-[85%] text-sm relative">
                                <div className="flex items-center space-x-1 mb-1 text-green-700 text-xs font-semibold">
                                    <Zap size={12} fill="currentColor" />
                                    <span>AI Assistant</span>
                                </div>
                                <p>Hello Rahul! For 20 agents, we offer a volume discount. The Enterprise plan would be $35/user/month. Would you like a formal quote sent to your email?</p>
                                <span className="text-[10px] text-gray-500 block text-right mt-1 flex justify-end items-center gap-1">
                                    10:42 AM <span className="text-blue-500 font-bold">✓✓</span>
                                </span>
                            </div>
                        </motion.div>

                        {/* AI Suggestions Popup */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 2.5 }}
                            className="absolute bottom-16 left-4 right-4 bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-xl border border-green-100 z-10"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-green-700 flex items-center">
                                    <Zap size={12} className="mr-1" /> Next Best Action
                                </span>
                                <span className="text-[10px] text-gray-400">98% Confidence</span>
                            </div>
                            <div className="space-y-2">
                                <button className="w-full text-left text-xs p-2 bg-green-50 hover:bg-green-100 rounded-lg text-green-900 border border-green-200 transition-colors">
                                    Send Quote PDF & Schedule Call
                                </button>
                                <button className="w-full text-left text-xs p-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700 border border-gray-200 transition-colors">
                                    Ask for company details
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Input Area */}
                    <div className="bg-white p-2 flex items-center space-x-2 border-t border-gray-200 shrink-0">
                        <Paperclip size={20} className="text-gray-400" />
                        <div className="flex-1 bg-gray-100 rounded-full h-9 px-4 flex items-center text-gray-400 text-sm cursor-text">
                            Type a message...
                        </div>
                        <Mic size={20} className="text-gray-400" />
                    </div>
                </div>
            </div>

            {/* Floating Badges */}
            <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-1/4 -right-4 bg-white p-3 rounded-xl shadow-lg border border-gray-100 z-20 flex items-center space-x-3 hidden lg:flex"
            >
                <div className="bg-purple-100 p-2 rounded-full">
                    <Brain className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                    <div className="text-xs font-bold text-gray-800">Memory Active</div>
                    <div className="text-[10px] text-gray-500">Recalled last order</div>
                </div>
            </motion.div>

            <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/3 -left-4 bg-white p-3 rounded-xl shadow-lg border border-gray-100 z-20 flex items-center space-x-3 hidden lg:flex"
            >
                <div className="bg-yellow-100 p-2 rounded-full">
                    <CheckCircle className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                    <div className="text-xs font-bold text-gray-800">Lead Qualified</div>
                    <div className="text-[10px] text-gray-500">Moved to Pipeline</div>
                </div>
            </motion.div>

        </div>
    );
};

export default Hero;