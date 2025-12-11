
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, LayoutDashboard, Users, Zap, 
  BarChart3, Settings, LogOut, Menu, X, 
  Bell, Search, ChevronDown, User, Bot,
  CreditCard, Share2, MapPin, TrendingUp, 
  Mic, Image as ImageIcon, ShoppingBag, 
  Layers, Lock, Database
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  user?: { name: string; email: string; avatar: string };
  onLogout: () => void;
  activeView?: string;
  onNavigate?: (viewId: string) => void;
}

// Updated Sidebar Sections to match the Feature List
const SIDEBAR_SECTIONS = [
  {
    title: 'Core Platform',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'inbox', label: 'Unified Inbox', icon: MessageCircle },
      { id: 'leads', label: 'Leads & CRM', icon: Users },
      { id: 'pipeline', label: 'Pipeline & Deals', icon: Layers },
    ]
  },
  {
    title: 'AI Intelligence',
    items: [
      { id: 'ai-twin', label: 'Digital Twin', icon: Bot },
      { id: 'ai-voice', label: 'Voice Notes AI', icon: Mic },
      { id: 'ai-catalog', label: 'Auto Catalog', icon: ShoppingBag },
      { id: 'ai-price', label: 'Price Optimizer', icon: TrendingUp },
      { id: 'ai-local', label: 'Hyper-Local', icon: MapPin },
    ]
  },
  {
    title: 'Growth & Tools',
    items: [
      { id: 'campaigns', label: 'Broadcasts', icon: Share2 },
      { id: 'automation', label: 'Automation', icon: Zap },
      { id: 'commerce', label: 'Payments', icon: CreditCard },
      { id: 'analytics', label: 'Analytics', icon: BarChart3 },
      { id: 'settings', label: 'Settings', icon: Settings },
    ]
  }
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  user, 
  onLogout, 
  activeView = 'dashboard', 
  onNavigate 
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleNavClick = (viewId: string) => {
    if (onNavigate) {
      onNavigate(viewId);
    }
    // On mobile, close sidebar after selection
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] font-sans flex overflow-hidden selection:bg-brand-500 selection:text-white">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-200/30 rounded-full blur-[120px] mix-blend-multiply" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200/30 rounded-full blur-[120px] mix-blend-multiply" />
          <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-purple-200/30 rounded-full blur-[100px] mix-blend-multiply" />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Floating Sidebar */}
      <motion.aside 
        className={`fixed lg:static inset-y-0 left-0 z-50 w-[280px] lg:bg-transparent transition-transform duration-300 ease-in-out lg:transform-none flex flex-col ${
          isSidebarOpen ? 'translate-x-0 bg-white shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full lg:m-4 lg:rounded-3xl lg:bg-white/60 lg:backdrop-blur-xl lg:border lg:border-white/50 lg:shadow-xl">
            {/* Logo Area */}
            <div className="h-20 flex-shrink-0 flex items-center px-8">
              <div className="flex items-center space-x-3 text-brand-600">
                <div className="bg-brand-600 text-white p-1.5 rounded-lg shadow-lg shadow-brand-500/30">
                   <MessageCircle size={20} strokeWidth={3} />
                </div>
                <span className="text-2xl font-bold font-display text-gray-900 tracking-tight">UNPHUC</span>
              </div>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="ml-auto lg:hidden text-gray-500"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 overflow-y-auto py-2 px-4 space-y-8 scrollbar-hide">
              {SIDEBAR_SECTIONS.map((section, idx) => (
                <div key={idx}>
                  <h3 className="px-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-3">
                    {section.title}
                  </h3>
                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-200 group relative overflow-hidden ${
                          activeView === item.id 
                            ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20' 
                            : 'text-gray-500 hover:bg-white hover:text-gray-900 hover:shadow-md'
                        }`}
                      >
                        <item.icon 
                          size={18} 
                          strokeWidth={activeView === item.id ? 2.5 : 2}
                          className={`relative z-10 transition-transform group-hover:scale-110 ${activeView === item.id ? 'text-brand-400' : 'text-gray-400 group-hover:text-brand-600'}`} 
                        />
                        <span className="text-sm font-bold relative z-10">{item.label}</span>
                        
                        {/* Active Indicator Pulse */}
                        {activeView === item.id && (
                             <div className="absolute right-3 w-1.5 h-1.5 bg-brand-400 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.8)] animate-pulse" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
            
            {/* Sidebar Footer (Digital Twin Status) */}
            <div className="p-4 mt-auto">
                <div className="bg-gradient-to-br from-brand-50 to-emerald-50 rounded-2xl p-4 border border-brand-100/50">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-brand-600 shadow-sm">
                            <Bot size={16} fill="currentColor" />
                        </div>
                        <div>
                            <div className="text-xs font-bold text-gray-900">Digital Twin</div>
                            <div className="text-[10px] text-brand-600 font-bold flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse"></span> Learning Mode
                            </div>
                        </div>
                    </div>
                    <div className="w-full bg-white/50 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-brand-500 h-full w-[85%] rounded-full"></div>
                    </div>
                    <div className="mt-1 text-[10px] text-gray-500 text-right">Owner tone match: 85%</div>
                </div>
            </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        
        {/* Top Header */}
        <header className="h-24 flex items-center justify-between px-6 lg:px-10 z-30">
          <div className="flex items-center flex-1 gap-6">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-white shadow-sm text-gray-500 hover:text-gray-900"
            >
              <Menu size={20} />
            </button>
            
            {/* Search Bar */}
            <div className="max-w-md w-full hidden md:block relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="text-gray-400 group-focus-within:text-brand-600 transition-colors" size={18} />
              </div>
              <input 
                type="text"
                placeholder="Search leads, chats, or catalog..."
                className="w-full pl-11 pr-4 py-3 bg-white/60 border border-transparent focus:bg-white focus:border-brand-200 focus:ring-4 focus:ring-brand-500/10 rounded-2xl text-sm font-medium transition-all outline-none shadow-sm backdrop-blur-sm"
              />
              <div className="absolute inset-y-0 right-3 flex items-center">
                  <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md border border-gray-200">⌘ K</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-3 rounded-2xl bg-white/60 hover:bg-white text-gray-500 hover:text-brand-600 transition-all shadow-sm hover:shadow-md border border-transparent hover:border-gray-100">
              <Bell size={20} />
              <span className="absolute top-2.5 right-3 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 focus:outline-none bg-white/60 hover:bg-white p-1.5 pl-3 pr-4 rounded-full transition-all shadow-sm hover:shadow-md border border-transparent hover:border-gray-100"
              >
                <div className="text-right hidden md:block">
                  <div className="text-sm font-bold text-gray-800 leading-none">{user?.name || 'Rahul Verma'}</div>
                  <div className="text-[10px] text-gray-500 font-medium leading-none mt-1">Growth Plan</div>
                </div>
                <div className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold text-xs shadow-md ring-2 ring-white">
                  {user?.name ? user.name.charAt(0) : 'R'}
                </div>
                <ChevronDown size={14} className="text-gray-400 hidden md:block" />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 origin-top-right"
                  >
                     <div className="px-4 py-3 border-b border-gray-50 mb-1">
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Signed in as</div>
                        <div className="text-sm font-bold text-gray-900 truncate">{user?.email || 'rahul@unphuc.com'}</div>
                     </div>
                    <button className="w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-brand-600 flex items-center gap-3 font-medium transition-colors">
                      <User size={16} /> My Profile
                    </button>
                    <button className="w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-brand-600 flex items-center gap-3 font-medium transition-colors">
                      <Settings size={16} /> Workspace Settings
                    </button>
                    <button className="w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-brand-600 flex items-center gap-3 font-medium transition-colors">
                      <Lock size={16} /> Security & Roles
                    </button>
                    <div className="border-t border-gray-50 my-1"></div>
                    <button 
                      onClick={onLogout}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 flex items-center gap-3 font-bold transition-colors"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto px-6 lg:px-10 pb-10 scrollbar-hide">
           <div className="max-w-[1600px] mx-auto">
             {children}
           </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
