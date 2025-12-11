
import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, ChevronDown, ChevronRight, Zap, Brain, Sparkles, Layout, Users, ShoppingBag, BarChart3, Globe, Shield, CreditCard, HelpCircle, FileText, BookOpen, Briefcase, Phone, Play, ArrowRight, Bot, Settings, Mail, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onLoginClick?: () => void;
  onSignupClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick, onSignupClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (menu: string) => setActiveDropdown(menu);
  const handleMouseLeave = () => setActiveDropdown(null);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-gray-100 py-3' 
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center relative">
          
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer z-50" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className={`p-2 rounded-lg ${scrolled ? 'bg-brand-600 text-white' : 'bg-brand-600 text-white shadow-lg'}`}>
               <MessageCircle size={24} strokeWidth={3} />
            </div>
            <span className={`text-2xl font-bold font-display tracking-tight ${scrolled ? 'text-gray-900' : 'text-gray-900'}`}>UNPHUC</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            
            {/* SOLUTIONS */}
            <NavItem 
              title="Solutions" 
              isActive={activeDropdown === 'solutions'} 
              onMouseEnter={() => handleMouseEnter('solutions')}
              onMouseLeave={handleMouseLeave}
            >
              <div className="w-[600px] grid grid-cols-2 gap-2 p-4">
                <MenuLink icon={Zap} title="Sales Automation" desc="Close deals faster" />
                <MenuLink icon={ShoppingBag} title="WhatsApp Commerce" desc="Sell directly in chat" />
                <MenuLink icon={Globe} title="Marketing & Campaigns" desc="Reach customers at scale" />
                <MenuLink icon={Settings} title="Integrations" desc="Connect your stack" />
                <MenuLink icon={Users} title="Customer Support" desc="24/7 AI assistance" />
                <MenuLink icon={Mic} title="Voice AI Agent" desc="Speak with customers" />
                <MenuLink icon={Briefcase} title="Team Productivity" desc="Collaborate efficiently" />
                <MenuLink icon={Bot} title="AI Conversations" desc="Smart auto-replies" />
              </div>
            </NavItem>

            {/* FEATURES */}
            <NavItem 
              title="Features" 
              isActive={activeDropdown === 'features'} 
              onMouseEnter={() => handleMouseEnter('features')}
              onMouseLeave={handleMouseLeave}
            >
              <div className="w-[900px] flex rounded-2xl overflow-hidden">
                {/* Core Features */}
                <div className="w-2/3 p-6 bg-white grid grid-cols-2 gap-x-8 gap-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Layout size={14} /> Core Platform
                    </h4>
                    <div className="space-y-1">
                      <MenuLinkSmall title="WhatsApp Inbox" />
                      <MenuLinkSmall title="Team Inbox" />
                      <MenuLinkSmall title="Templates & Quick Replies" />
                      <MenuLinkSmall title="Contact CRM" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Zap size={14} /> Growth Tools
                    </h4>
                    <div className="space-y-1">
                      <MenuLinkSmall title="Broadcasts & Segments" />
                      <MenuLinkSmall title="Automation Builder" />
                      <MenuLinkSmall title="Chatbot Builder" />
                      <MenuLinkSmall title="Catalog & Payments" />
                    </div>
                  </div>
                  <div className="col-span-2 pt-4 border-t border-gray-50 flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                           <BarChart3 size={16} className="text-brand-500" /> Analytics
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                           <Shield size={16} className="text-brand-500" /> Enterprise Security
                        </div>
                     </div>
                     <a href="#" className="text-brand-600 text-sm font-bold hover:underline flex items-center">
                       View All Features <ChevronRight size={14} />
                     </a>
                  </div>
                </div>

                {/* AI Features Highlight */}
                <div className="w-1/3 bg-gradient-to-br from-gray-900 to-gray-800 p-6 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                  
                  <h4 className="text-xs font-bold text-brand-300 uppercase tracking-wider mb-6 flex items-center gap-2 relative z-10">
                    <Sparkles size={14} /> AI Intelligence
                  </h4>
                  
                  <div className="space-y-4 relative z-10">
                    <AIFeatureItem icon={Brain} title="Conversation Memory" desc="Remembers context forever" />
                    <AIFeatureItem icon={Users} title="Digital Twin" desc="Clones your best agent" />
                    <AIFeatureItem icon={Zap} title="Next Best Action" desc="Auto-suggests moves" />
                    <AIFeatureItem icon={ShoppingBag} title="Auto Catalog" desc="Instant product pages" />
                  </div>

                  <button className="mt-8 w-full py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 relative z-10">
                    Explore AI Engine <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </NavItem>

            {/* PRICING */}
            <NavItem 
              title="Pricing" 
              isActive={activeDropdown === 'pricing'} 
              onMouseEnter={() => handleMouseEnter('pricing')}
              onMouseLeave={handleMouseLeave}
            >
              <div className="w-[600px] flex p-2">
                <div className="w-1/2 p-4 space-y-2">
                  <MenuLink icon={CreditCard} title="Plans & Pricing" desc="Flexible options for all sizes" />
                  <MenuLink icon={BarChart3} title="Compare Plans" desc="Detailed feature breakdown" />
                  <MenuLink icon={Database} title="WhatsApp API Pricing" desc="Official Meta rates" />
                  <MenuLink icon={HelpCircle} title="FAQ & Add-ons" desc="Common questions answered" />
                </div>
                <div className="w-1/2 p-4 bg-gray-50 rounded-xl m-2 flex flex-col justify-center text-center border border-gray-100">
                   <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-4 text-brand-600">
                      <Briefcase size={24} />
                   </div>
                   <h4 className="font-bold text-gray-900 mb-1">Enterprise Needs?</h4>
                   <p className="text-xs text-gray-500 mb-4">Custom volume, SLA guarantees, and dedicated support manager.</p>
                   <button className="text-sm bg-gray-900 text-white py-2 rounded-lg font-bold hover:bg-gray-800 transition-colors">
                     Contact Sales
                   </button>
                </div>
              </div>
            </NavItem>

            {/* CUSTOMERS */}
            <NavItem 
              title="Customers" 
              isActive={activeDropdown === 'customers'} 
              onMouseEnter={() => handleMouseEnter('customers')}
              onMouseLeave={handleMouseLeave}
            >
              <div className="w-[700px] flex p-1">
                <div className="w-2/3 p-6 grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Resources</h4>
                    <div className="space-y-1">
                      <MenuLinkSmall title="Case Studies" icon={FileText} />
                      <MenuLinkSmall title="Customer Stories" icon={Users} />
                      <MenuLinkSmall title="Blog" icon={BookOpen} />
                      <MenuLinkSmall title="Help Center" icon={HelpCircle} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Industries</h4>
                    <div className="space-y-1">
                      <MenuLinkSmall title="E-commerce" />
                      <MenuLinkSmall title="Education" />
                      <MenuLinkSmall title="Healthcare" />
                      <MenuLinkSmall title="Real Estate" />
                    </div>
                  </div>
                </div>
                <div className="w-1/3 bg-brand-50 m-2 rounded-xl p-5 border border-brand-100 flex flex-col justify-between relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-20 h-20 bg-brand-200 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                   <div>
                      <div className="flex items-center gap-1 mb-2">
                        {[1,2,3,4,5].map(i => <Sparkles key={i} size={10} className="text-yellow-500 fill-current" />)}
                      </div>
                      <p className="text-sm font-medium text-gray-800 italic mb-4">"We doubled our conversion rate in 30 days using UNPHUC's auto-catalog feature."</p>
                   </div>
                   <div className="flex items-center gap-3">
                      <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" className="w-8 h-8 rounded-full object-cover" alt="User" />
                      <div>
                        <div className="text-xs font-bold text-gray-900">Sarah Jenkins</div>
                        <div className="text-[10px] text-gray-500">CMO, StyleUp</div>
                      </div>
                   </div>
                </div>
              </div>
            </NavItem>
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <button 
              onClick={onLoginClick}
              className="text-gray-600 font-semibold hover:text-brand-600 transition-colors text-sm"
            >
              Login
            </button>
            <button 
              onClick={onSignupClick}
              className="bg-brand-600 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-brand-700 transition-all shadow-lg shadow-brand-500/20 hover:shadow-brand-500/40 transform hover:-translate-y-0.5"
            >
              Get Started — Free
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center z-50">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-gray-900 p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden fixed inset-0 top-[70px] bg-white z-40 overflow-y-auto"
          >
            <div className="px-4 py-6 space-y-6 pb-24">
              <MobileSection title="Solutions" items={["Sales Automation", "Marketing", "Support", "Integrations"]} />
              <MobileSection title="Features" items={["Inbox", "Broadcasts", "Automation", "AI Engine"]} />
              <MobileSection title="Pricing" items={["Plans", "Enterprise"]} />
              <MobileSection title="Customers" items={["Case Studies", "Blog"]} />

              <div className="pt-6 flex flex-col space-y-4 border-t border-gray-100">
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    onSignupClick?.();
                  }}
                  className="w-full py-4 bg-brand-600 text-white font-bold rounded-xl shadow-md text-lg"
                >
                  Get Started — Free
                </button>
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    onLoginClick?.();
                  }}
                  className="w-full py-4 text-gray-700 font-bold border border-gray-200 rounded-xl"
                >
                  Login
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- SUBCOMPONENTS ---

const NavItem: React.FC<{ 
  title: string; 
  isActive: boolean; 
  children: React.ReactNode; 
  onMouseEnter: () => void; 
  onMouseLeave: () => void;
}> = ({ title, isActive, children, onMouseEnter, onMouseLeave }) => {
  return (
    <div 
      className="relative px-4 py-3"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button className={`flex items-center space-x-1 font-medium text-sm transition-colors ${isActive ? 'text-brand-600' : 'text-gray-600 hover:text-brand-600'}`}>
        <span>{title}</span>
        <ChevronDown size={14} className={`transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full left-0 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 ring-1 ring-black/5"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MenuLink = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <a href="#" className="flex items-start p-3 rounded-xl hover:bg-gray-50 transition-colors group">
    <div className="mt-1 mr-3 text-gray-400 group-hover:text-brand-600 transition-colors">
      <Icon size={20} />
    </div>
    <div>
      <div className="text-sm font-bold text-gray-900 group-hover:text-brand-600 transition-colors">{title}</div>
      <div className="text-xs text-gray-500 mt-0.5 font-medium">{desc}</div>
    </div>
  </a>
);

const MenuLinkSmall = ({ title, icon: Icon }: { title: string, icon?: any }) => (
  <a href="#" className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-brand-700 hover:bg-brand-50 rounded-lg transition-colors font-medium">
    {Icon && <Icon size={16} className="mr-2 text-gray-400" />}
    {title}
  </a>
);

const AIFeatureItem = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="flex items-start group cursor-pointer">
    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center mr-3 text-brand-300 group-hover:bg-brand-500 group-hover:text-white transition-all">
       <Icon size={16} />
    </div>
    <div>
      <div className="text-sm font-bold text-white group-hover:text-brand-300 transition-colors">{title}</div>
      <div className="text-[10px] text-gray-400 font-medium">{desc}</div>
    </div>
  </div>
);

// Mobile helper
const Mic = ({size, className}: {size?: number, className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
);

const MobileSection: React.FC<{ title: string; items: string[]; highlight?: boolean }> = ({ title, items, highlight }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`border-b border-gray-50 pb-2 ${highlight ? 'bg-purple-50/50 p-4 rounded-xl border-none' : ''}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex w-full justify-between items-center py-2 text-lg font-bold text-gray-900"
      >
        <span className={highlight ? 'text-brand-600 flex items-center gap-2' : ''}>
          {highlight && <Sparkles size={18} />}
          {title}
        </span>
        <ChevronDown size={20} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="py-2 space-y-3 pl-2">
              {items.map((item, idx) => (
                <a key={idx} href="#" className="block text-gray-600 font-medium text-sm py-1">
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
