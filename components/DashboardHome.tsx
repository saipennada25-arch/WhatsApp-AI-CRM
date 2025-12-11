
import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, Users, DollarSign, 
  Plus, Play, Command, Calendar, Activity,
  Mic, Image as ImageIcon, ShoppingBag, 
  Sparkles, Bot, BarChart3, TrendingUp, MapPin,
  Brain, Layers, Zap, Gift
} from 'lucide-react';

const DashboardHome: React.FC = () => {
  return (
    <div className="space-y-8">
      
      {/* 1. Welcome & Context */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-4xl font-extrabold font-display text-gray-900 tracking-tight">
            Good Morning, Rahul <span className="inline-block animate-wave origin-[70%_70%]">👋</span>
          </h1>
          <p className="text-gray-500 font-medium mt-1 flex items-center gap-2">
            <Calendar size={14} className="text-brand-500" />
            <span>Tuesday, Oct 24</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span className="text-brand-600 font-bold flex items-center gap-1">
                <Activity size={14} /> System Optimal
            </span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span className="text-gray-400 text-xs">24/7 Scalability Active</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
             <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-brand-600 hover:border-brand-200 transition-all shadow-sm">
                 <Command size={18} />
             </button>
             <button className="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-bold text-sm shadow-xl shadow-gray-900/20 transition-all flex items-center gap-2">
                 <Plus size={16} /> New Broadcast
             </button>
        </div>
      </div>

      {/* 2. Bento Grid Layout 
          - lg:grid-cols-12 allows for 8 (Twin) + 2 (Stat) + 2 (Stat) columns
          - auto-rows ensures consistent height for the stacked items
      */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]">
        
        {/* --- DIGITAL TWIN NEXUS (Large Featured) --- 
            lg:row-span-2 allows it to be twice as tall as the stat cards next to it.
        */}
        <div className="col-span-1 md:col-span-4 lg:col-span-8 lg:row-span-2 relative group h-full">
             <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-400 to-blue-500 rounded-[2.5rem] opacity-30 group-hover:opacity-60 blur transition duration-500"></div>
             <div className="relative h-full bg-[#0F172A] rounded-[2.4rem] p-8 text-white overflow-hidden flex flex-col justify-between shadow-2xl">
                 {/* Decor */}
                 <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                 <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4"></div>

                 <div className="relative z-10 flex justify-between items-start">
                     <div>
                         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-xs font-bold text-brand-300 mb-4">
                             <Bot size={14} /> Multi-Channel Digital Twin
                         </div>
                         <h2 className="text-3xl font-display font-bold leading-tight">
                            I'm cloning you in <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-blue-400">12 high-priority conversations</span>.
                         </h2>
                     </div>
                     <div className="text-right hidden sm:block">
                         <div className="text-sm text-gray-400">Clone Accuracy</div>
                         <div className="text-4xl font-mono font-bold text-white tracking-tighter">98.5<span className="text-lg text-gray-500">%</span></div>
                     </div>
                 </div>

                 {/* Visual Pulse Graph */}
                 <div className="relative z-10 h-32 flex items-end gap-1 mt-8 opacity-80">
                      {[30, 45, 35, 60, 50, 75, 60, 85, 95, 80, 70, 90, 65, 55, 40].map((h, i) => (
                          <motion.div 
                            key={i}
                            initial={{ height: '20%' }}
                            animate={{ height: `${h}%` }}
                            transition={{ duration: 1, delay: i * 0.05, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
                            className="flex-1 bg-gradient-to-t from-brand-600/20 to-brand-400 rounded-t-sm"
                          />
                      ))}
                 </div>

                 {/* Action Bar */}
                 <div className="relative z-10 flex items-center gap-4 mt-6 pt-6 border-t border-white/10">
                      <div className="flex -space-x-3">
                          {[1,2,3].map(i => (
                              <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0F172A] bg-gray-700 flex items-center justify-center overflow-hidden">
                                  <img src={`https://ui-avatars.com/api/?name=User+${i}&background=random`} alt="User" />
                              </div>
                          ))}
                          <div className="w-10 h-10 rounded-full border-2 border-[#0F172A] bg-brand-600 flex items-center justify-center text-xs font-bold">
                              +9
                          </div>
                      </div>
                      <div className="text-sm font-medium text-gray-400">
                          Handling negotiations & support automatically.
                      </div>
                      <button className="ml-auto px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-bold hover:bg-gray-100 transition-colors">
                          Monitor Stream
                      </button>
                 </div>
             </div>
        </div>

        {/* --- STAT CARDS (Row 1 on LG) --- */}
        <BentoStat 
            className="col-span-1 md:col-span-2 lg:col-span-2"
            title="Revenue" 
            value="$48.2k" 
            change="+12%" 
            trend="up" 
            color="text-gray-900"
            icon={DollarSign}
            bg="bg-white"
        />
        <BentoStat 
            className="col-span-1 md:col-span-2 lg:col-span-2"
            title="Conversion" 
            value="18.5%" 
            change="+2.1%" 
            trend="up" 
            color="text-gray-900"
            icon={Zap}
            bg="bg-white"
        />

        {/* --- STAT CARDS (Row 2 on LG) --- */}
        <BentoStat 
            className="col-span-1 md:col-span-2 lg:col-span-2"
            title="Total Leads" 
            value="1,402" 
            change="+5%" 
            trend="up" 
            color="text-gray-900"
            icon={Users}
            bg="bg-white"
        />
        
        {/* WhatsApp Orders Card (Custom Stat) */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2 h-full">
             <div className="h-full bg-brand-600 rounded-[2rem] p-6 text-white flex flex-col justify-between shadow-xl shadow-brand-500/20 group cursor-pointer hover:bg-brand-700 transition-colors">
                <div className="flex justify-between items-start">
                    <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                        <ShoppingBag size={20} className="text-white" />
                    </div>
                    <ArrowUpRight size={20} className="opacity-50 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
                <div>
                    <div className="text-3xl font-bold mb-1">24</div>
                    <div className="text-sm font-medium text-brand-100">WhatsApp Orders</div>
                </div>
            </div>
        </div>

        {/* --- HYPER-LOCAL INTEL (Unique Feature) --- */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-gradient-to-br from-orange-50 to-orange-100 rounded-[2.5rem] p-6 shadow-sm border border-orange-100 flex flex-col justify-between h-full">
            <div>
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-white rounded-xl shadow-sm">
                        <MapPin size={20} className="text-orange-500" />
                    </div>
                    <span className="text-[10px] font-bold bg-white px-2 py-1 rounded-full text-orange-600 border border-orange-200">
                        Hyper-Local
                    </span>
                </div>
                <h3 className="font-bold text-gray-900 leading-tight mb-2">Pongal Festival Detected</h3>
                <p className="text-xs text-gray-600 mb-3">
                    High intent for ethnic wear in <span className="font-bold">Andhra Pradesh</span> (28°C Sunny).
                </p>
            </div>
            <button className="w-full py-2 bg-white text-orange-600 rounded-xl text-xs font-bold shadow-sm hover:bg-orange-50 transition-colors flex items-center justify-center gap-2">
                <Gift size={14} /> Send 15% Off Promo
            </button>
        </div>

         {/* --- AUTO CATALOG GENERATION (Unique Feature) --- */}
         <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white rounded-[2.5rem] p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-full">
            <div>
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-pink-50 rounded-xl">
                        <ShoppingBag size={20} className="text-pink-500" />
                    </div>
                    <span className="text-[10px] font-bold bg-pink-50 px-2 py-1 rounded-full text-pink-600">
                        Auto-Catalog
                    </span>
                </div>
                <h3 className="font-bold text-gray-900 leading-tight mb-2">5 Images Processed</h3>
                <p className="text-xs text-gray-500 mb-2">New summer collection images converted to catalog items.</p>
                <div className="flex gap-2">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=100&q=80" className="object-cover w-full h-full" alt="Product" />
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&q=80" className="object-cover w-full h-full" alt="Product" />
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-xs text-gray-400 font-bold">+3</div>
                </div>
            </div>
            <button className="w-full mt-3 py-2 border border-pink-200 text-pink-600 rounded-xl text-xs font-bold hover:bg-pink-50 transition-colors">
                Publish to WhatsApp
            </button>
        </div>

        {/* --- GLOBAL PRICE OPTIMIZER (Unique Feature) --- */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2.5rem] p-6 text-white flex flex-col justify-between shadow-xl h-full">
            <div className="flex justify-between items-start">
                <div className="p-2.5 bg-white/10 rounded-2xl backdrop-blur-md">
                    <TrendingUp size={20} className="text-brand-400" />
                </div>
                <div className="bg-brand-500 text-[10px] font-bold px-2 py-1 rounded-full animate-pulse">
                    Action Needed
                </div>
            </div>
            
            <div className="mt-4">
                <div className="text-gray-400 text-xs font-medium mb-1">Price Optimizer</div>
                <div className="text-3xl font-bold flex items-center gap-2">
                    $149.00 <span className="text-sm font-medium text-brand-400">+15%</span>
                </div>
                <p className="text-xs text-gray-400 mt-3 leading-relaxed">
                    High demand in <span className="text-white font-bold">Bangalore</span>. Competitors out of stock.
                </p>
            </div>
            
            <button className="w-full mt-4 py-2.5 bg-white text-gray-900 rounded-xl text-xs font-bold hover:bg-brand-50 transition-colors">
                Apply Price Update
            </button>
        </div>

        {/* --- DECISION ENGINE & NEXT BEST ACTION (Unique Feature) --- */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white rounded-[2.5rem] p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-full">
             <div className="flex items-center gap-2 mb-3">
                 <div className="bg-yellow-100 p-1.5 rounded-lg text-yellow-600">
                     <Brain size={16} />
                 </div>
                 <h3 className="text-sm font-bold text-gray-900">Next Best Action</h3>
             </div>
             
             <div className="bg-gray-50 rounded-xl p-3 mb-3 border border-gray-100">
                 <div className="flex items-center justify-between mb-1">
                     <span className="text-[10px] font-bold text-gray-500">Lead: Michael Chen</span>
                     <span className="text-[10px] text-green-600 font-bold">High Intent</span>
                 </div>
                 <p className="text-xs font-medium text-gray-900">
                     "He viewed the pricing page 3 times. Send a 10% discount to close now."
                 </p>
             </div>

             <div className="grid grid-cols-2 gap-2">
                 <button className="py-2 bg-brand-600 text-white rounded-lg text-xs font-bold shadow-sm hover:bg-brand-700">
                     Send Offer
                 </button>
                 <button className="py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-xs font-bold hover:bg-gray-50">
                     Ignore
                 </button>
             </div>
        </div>

        {/* --- PIPELINE VISUAL (Wide) --- */}
        <div className="col-span-1 md:col-span-4 lg:col-span-6 bg-white rounded-[2.5rem] p-6 shadow-sm border border-gray-100 relative overflow-hidden h-full min-h-[220px]">
             <div className="flex justify-between items-center mb-6 relative z-10">
                 <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                     <Layers size={18} className="text-brand-500" /> Live Pipeline
                 </h3>
                 <span className="text-xs font-bold text-gray-400">Updated 1m ago</span>
             </div>

             <div className="space-y-5 relative z-10">
                 <PipelineStage stage="New Leads" count={24} color="bg-gray-200" width="w-[30%]" />
                 <PipelineStage stage="AI Qualifying" count={12} color="bg-blue-400" width="w-[45%]" active />
                 <PipelineStage stage="Negotiation" count={5} color="bg-purple-400" width="w-[20%]" />
                 <PipelineStage stage="Closed Won" count={8} color="bg-brand-500" width="w-[35%]" />
             </div>

             {/* Background Decoration */}
             <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
                 <BarChart3 size={200} />
             </div>
        </div>

        {/* --- VOICE NOTES / IMAGE AI (Composite) --- 
            This container spans 6 columns. Inside it has a grid of 2.
            We use h-full to match the Pipeline card's height.
        */}
        <div className="col-span-1 md:col-span-4 lg:col-span-6 h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                {/* Image AI */}
                <div className="bg-white rounded-[2.5rem] p-6 border border-gray-100 shadow-sm flex items-center gap-6 group hover:border-brand-200 transition-colors h-full">
                    <div className="w-24 h-24 rounded-2xl bg-gray-100 overflow-hidden relative shadow-inner shrink-0">
                        <img src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Product" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <ImageIcon size={24} className="text-white" />
                        </div>
                    </div>
                    <div>
                        <div className="text-xs font-bold text-brand-600 mb-1 flex items-center gap-1">
                            <Sparkles size={12} /> Image Recognition
                        </div>
                        <h4 className="font-bold text-gray-900 mb-1">Sneaker detected</h4>
                        <p className="text-xs text-gray-500 mb-3">AI identified "Nike Air Force". Catalog link ready.</p>
                        <button className="text-xs font-bold text-gray-900 border-b border-gray-300 hover:border-brand-600 hover:text-brand-600 transition-colors pb-0.5">
                            Send Product Link
                        </button>
                    </div>
                </div>

                {/* Voice AI */}
                <div className="bg-white rounded-[2.5rem] p-6 border border-gray-100 shadow-sm flex flex-col justify-center relative overflow-hidden group hover:border-brand-200 transition-colors h-full">
                    <div className="flex items-center justify-between mb-4 relative z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                                <Mic size={20} />
                            </div>
                            <div>
                                <div className="font-bold text-gray-900 text-sm">Voice Notes</div>
                                <div className="text-[10px] text-gray-500">Processed 10m ago</div>
                            </div>
                        </div>
                        <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors">
                            <Play size={14} fill="currentColor" />
                        </button>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-600 leading-relaxed relative z-10 group-hover:bg-white group-hover:shadow-sm transition-all border border-transparent group-hover:border-gray-100">
                        "Client confirmed budget of $5k. Wants to start pilot next Monday. Action: Send contract."
                    </div>
                    {/* Visual Waveform Decoration */}
                    <div className="absolute bottom-0 left-0 right-0 h-12 flex items-end gap-1 opacity-10 px-6 pb-2 pointer-events-none">
                        {[...Array(20)].map((_, i) => (
                            <div key={i} className="flex-1 bg-indigo-600 rounded-t-sm" style={{height: `${Math.random() * 100}%`}}></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

// --- Sub-components ---

const BentoStat = ({ title, value, change, trend, icon: Icon, color, bg, className }: any) => (
  <div className={`${className} h-full ${bg} rounded-[2rem] p-6 shadow-sm border border-gray-100 flex flex-col justify-between group hover:shadow-lg transition-all duration-300`}>
     <div className="flex justify-between items-start">
        <div className={`p-3 rounded-2xl ${bg === 'bg-white' ? 'bg-gray-50' : 'bg-white/10'} text-gray-500 group-hover:scale-110 transition-transform`}>
           <Icon size={20} className={color} />
        </div>
        <div className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${
            trend === 'up' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
           {change}
        </div>
     </div>
     <div>
        <h3 className={`text-3xl font-extrabold ${color} tracking-tight`}>{value}</h3>
        <p className="text-sm text-gray-400 font-medium mt-1">{title}</p>
     </div>
  </div>
);

const PipelineStage = ({ stage, count, color, width, active }: any) => (
    <div className="group">
        <div className="flex justify-between text-xs mb-1.5 px-1">
            <span className={`font-bold ${active ? 'text-brand-600' : 'text-gray-500'}`}>{stage}</span>
            <span className="font-mono text-gray-400">{count}</span>
        </div>
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden flex">
            <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full ${color} rounded-full relative`}
                style={{ width: '100%' }} // Animation handles visual width
            >
                {active && (
                    <div className="absolute inset-0 bg-white/30 animate-[shimmer_2s_infinite]"></div>
                )}
            </motion.div>
        </div>
        <div className="mt-1 text-[10px] text-gray-400 px-1 opacity-0 group-hover:opacity-100 transition-opacity">
            $12.5k potential value
        </div>
    </div>
)

export default DashboardHome;
