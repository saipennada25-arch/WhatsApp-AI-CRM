
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, MoreHorizontal, Phone, Video, 
  Paperclip, Mic, Send, Bot, Smile, Check, 
  Clock, Tag, User, Briefcase, Calendar, 
  MoreVertical, Sparkles, AlertCircle, ChevronRight,
  Archive, Trash2, Star, Download, Reply, Brain,
  Zap, CreditCard, ShoppingBag, Image as ImageIcon,
  DollarSign, FileText, X, LayoutTemplate, Settings
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent' | 'system' | 'ai';
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
  type?: 'text' | 'image' | 'template' | 'payment';
  imageUrl?: string;
}

interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  status: 'online' | 'offline' | 'away';
  tags: string[];
  pipelineStage: string;
  sentiment: 'positive' | 'neutral' | 'negative' | 'urgent';
  email: string;
  phone: string;
  company: string;
  dealValue: string;
  memory: string[];
}

// --- MOCK DATA ---
const MOCK_TEMPLATES = [
  { id: 't1', name: 'order_confirmation', category: 'Utility', language: 'en', body: 'Hi {{1}}, your order #{{2}} has been confirmed. We will notify you when it ships.' },
  { id: 't2', name: 'appointment_reminder', category: 'Utility', language: 'en', body: 'Hello {{1}}, this is a reminder for your appointment on {{2}} at {{3}}.' },
  { id: 't3', name: 'feedback_request', category: 'Marketing', language: 'en', body: 'Hi {{1}}, thanks for visiting! How would you rate your experience? Tap a button below.' },
  { id: 't4', name: 'abandoned_cart', category: 'Marketing', language: 'en', body: 'Hi {{1}}, you left something in your cart! Use code SAVE10 for 10% off.' },
];

const MOCK_CONTACTS: Contact[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastMessage: 'Where is my order?? 😡',
    time: '2m',
    unread: 1,
    status: 'online',
    tags: ['High Value', 'Complaint'],
    pipelineStage: 'Support',
    sentiment: 'urgent',
    email: 'sarah.j@gmail.com',
    phone: '+91 98765 43210',
    company: 'StyleUp Boutique',
    dealValue: '$1,200',
    memory: ['Prefers formal tone', 'Last complained about delay in Aug', 'Buys mostly ethnic wear']
  },
  {
    id: '2',
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastMessage: 'The proposal looks good. Lets proceed.',
    time: '15m',
    unread: 0,
    status: 'offline',
    tags: ['Lead', 'Enterprise'],
    pipelineStage: 'Negotiation',
    sentiment: 'positive',
    email: 'm.chen@techcorp.com',
    phone: '+91 99887 76655',
    company: 'TechCorp Inc.',
    dealValue: '$45,000',
    memory: ['Interested in API features', 'Decision maker', 'Budget approved: $50k']
  },
];

const MOCK_MESSAGES: Record<string, Message[]> = {
  '1': [
    { id: 'm1', text: 'Hi Sarah, thanks for shopping with us!', sender: 'agent', timestamp: 'Yesterday', status: 'read' },
    { id: 'm2', text: 'Order #4401 shipped yesterday.', sender: 'system', timestamp: 'Yesterday' },
    { id: 'm3', text: 'It has been 24 hours and no tracking number!', sender: 'user', timestamp: '10:30 AM' },
    { id: 'm4', text: 'Where is my order?? 😡', sender: 'user', timestamp: '10:32 AM' },
  ],
  '2': [
    { id: 'm1', text: 'Hi Michael, here is the updated proposal.', sender: 'agent', timestamp: 'Yesterday', status: 'read' },
    { id: 'm2', text: 'The proposal looks good. Lets proceed.', sender: 'user', timestamp: '10:15 AM' },
  ]
};

const UnifiedInbox: React.FC = () => {
  const [selectedContactId, setSelectedContactId] = useState<string>('1');
  const [messages, setMessages] = useState<Record<string, Message[]>>(MOCK_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [showAiDraft, setShowAiDraft] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showApiConfig, setShowApiConfig] = useState(false);

  // API Config State
  const [apiConfig, setApiConfig] = useState({
      webhookUrl: 'https://api.unphuc.com/v1/webhook',
      apiKey: 'sk_live_51M...',
      verifyToken: 'unphuc_verify_123'
  });

  const activeContact = MOCK_CONTACTS.find(c => c.id === selectedContactId) || MOCK_CONTACTS[0];
  const activeMessages = messages[selectedContactId] || [];

  const handleSendMessage = (text: string = inputText, type: 'text' | 'template' | 'payment' = 'text') => {
    if (!text.trim() && type === 'text') return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'agent',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
      type
    };

    setMessages(prev => ({
      ...prev,
      [selectedContactId]: [...(prev[selectedContactId] || []), newMessage]
    }));
    setInputText('');
    setShowAiDraft(false);
    setShowTemplates(false);
  };

  const handleSelectTemplate = (tpl: any) => {
      // Simulate variable replacement
      const filledText = tpl.body
        .replace('{{1}}', activeContact.name.split(' ')[0])
        .replace('{{2}}', '12345')
        .replace('{{3}}', '10:00 AM');
      setInputText(filledText);
      setShowTemplates(false);
  };

  const simulateImageRecog = () => {
      const imgMsg: Message = {
          id: Date.now().toString(),
          text: 'Uploaded an image',
          sender: 'user',
          timestamp: 'Now',
          type: 'image',
          imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&q=80'
      };
       setMessages(prev => ({
          ...prev,
          [selectedContactId]: [...(prev[selectedContactId] || []), imgMsg]
       }));

       // Simulate AI analysis
       setTimeout(() => {
           const analysisMsg: Message = {
               id: (Date.now() + 1).toString(),
               text: "AI Analysis: Nike Air Force 1 detected. Recommend checking stock for Size 9/10.",
               sender: 'system',
               timestamp: 'Now'
           };
            setMessages(prev => ({
              ...prev,
              [selectedContactId]: [...(prev[selectedContactId] || []), analysisMsg]
           }));
       }, 1500);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6 relative">
      
      {/* 1. CONTACT LIST (Left Pane) */}
      <div className="w-80 flex flex-col bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden shrink-0">
        
        {/* Header & Search */}
        <div className="p-5 pb-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold font-display text-gray-900">Inbox</h2>
            <div className="flex gap-2">
               <button onClick={() => setShowApiConfig(true)} className="p-2 hover:bg-gray-100 rounded-xl text-gray-500 transition-colors" title="API Settings">
                 <Settings size={18} />
               </button>
               <button className="p-2 hover:bg-gray-100 rounded-xl text-gray-500 transition-colors">
                 <MoreHorizontal size={18} />
               </button>
            </div>
          </div>
          
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent focus:bg-white focus:border-brand-200 focus:ring-4 focus:ring-brand-500/10 rounded-xl text-sm font-medium transition-all outline-none"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {['All', 'Unread', 'High Value', 'Urgent'].map((filter) => (
              <button key={filter} className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-lg text-xs font-bold text-gray-600 whitespace-nowrap transition-colors">
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-1 scrollbar-thin">
          {MOCK_CONTACTS.map((contact) => (
            <div 
              key={contact.id}
              onClick={() => setSelectedContactId(contact.id)}
              className={`group p-3 rounded-2xl cursor-pointer transition-all border border-transparent ${
                selectedContactId === contact.id 
                  ? 'bg-brand-50/50 border-brand-100 shadow-sm' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative shrink-0">
                  <img src={contact.avatar} className="w-12 h-12 rounded-full object-cover border border-gray-100" alt="" />
                  {contact.status === 'online' && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className={`text-sm font-bold truncate ${selectedContactId === contact.id ? 'text-gray-900' : 'text-gray-700'}`}>
                      {contact.name}
                    </h3>
                    <span className="text-[10px] text-gray-400 font-medium">{contact.time}</span>
                  </div>
                  
                  <p className={`text-xs truncate ${contact.unread > 0 ? 'font-bold text-gray-900' : 'text-gray-500'}`}>
                    {contact.lastMessage}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    {contact.sentiment === 'urgent' && (
                       <span className="px-1.5 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded flex items-center gap-1">
                         <AlertCircle size={10} /> Urgent
                       </span>
                    )}
                    {contact.tags.map(tag => (
                       <span key={tag} className="px-1.5 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-medium rounded">
                         {tag}
                       </span>
                    ))}
                  </div>
                </div>

                {contact.unread > 0 && (
                  <div className="shrink-0 flex flex-col items-end gap-2">
                    <span className="w-5 h-5 bg-brand-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {contact.unread}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. CHAT AREA (Middle Pane) */}
      <div className="flex-1 flex flex-col bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden relative">
        
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img src={activeContact.avatar} className="w-10 h-10 rounded-full object-cover" alt="" />
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                 <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                {activeContact.name}
                <span className="px-2 py-0.5 bg-brand-100 text-brand-700 text-[10px] rounded-full font-bold">WhatsApp</span>
              </h3>
              <p className="text-xs text-gray-500">Last active: Just now</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg text-xs font-bold transition-colors">
              Assign to Me
            </button>
            <div className="h-6 w-px bg-gray-200 mx-1"></div>
            <button className="p-2 hover:bg-gray-50 rounded-full text-gray-400 hover:text-gray-900 transition-colors">
              <Phone size={18} />
            </button>
            <button className="p-2 hover:bg-gray-50 rounded-full text-gray-400 hover:text-gray-900 transition-colors">
              <Search size={18} />
            </button>
            <button className="p-2 hover:bg-gray-50 rounded-full text-gray-400 hover:text-gray-900 transition-colors">
              <MoreVertical size={18} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#efeae2]/40 relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>

          {activeMessages.map((msg, idx) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex w-full ${msg.sender === 'user' ? 'justify-start' : msg.sender === 'system' ? 'justify-center' : 'justify-end'}`}
            >
              {msg.sender === 'system' ? (
                <div className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full font-medium flex items-center gap-2">
                  <Sparkles size={10} className="text-brand-500" /> {msg.text}
                </div>
              ) : (
                <div className={`max-w-[70%] relative group`}>
                   
                   {/* Special Image Message */}
                   {msg.type === 'image' && msg.imageUrl && (
                       <div className="mb-1 rounded-lg overflow-hidden border border-gray-200">
                           <img src={msg.imageUrl} alt="Uploaded" className="max-w-[200px]" />
                       </div>
                   )}

                   {/* Special Payment Message */}
                   {msg.type === 'payment' && (
                       <div className="bg-white border border-green-100 rounded-2xl p-4 mb-1 shadow-sm w-64">
                           <div className="flex items-center gap-2 text-green-600 font-bold mb-2">
                               <DollarSign size={18} /> Payment Request
                           </div>
                           <p className="text-sm text-gray-800 mb-3">{msg.text}</p>
                           <button className="w-full py-2 bg-green-500 text-white rounded-lg text-sm font-bold">Pay Now</button>
                       </div>
                   )}

                   {/* Special Template Message */}
                   {msg.type === 'template' && (
                       <div className="bg-white border border-brand-100 rounded-2xl p-4 mb-1 shadow-sm w-72">
                           <div className="flex items-center gap-2 text-brand-600 font-bold mb-2 text-xs uppercase tracking-wide">
                               <LayoutTemplate size={14} /> WhatsApp Template
                           </div>
                           <p className="text-sm text-gray-800 mb-3 whitespace-pre-wrap">{msg.text}</p>
                           <div className="grid grid-cols-2 gap-2">
                               <button className="py-2 bg-gray-50 text-brand-600 rounded-lg text-xs font-bold border border-gray-200">Button 1</button>
                               <button className="py-2 bg-gray-50 text-brand-600 rounded-lg text-xs font-bold border border-gray-200">Button 2</button>
                           </div>
                       </div>
                   )}

                   {msg.type === 'text' && (
                       <div className={`p-3 rounded-2xl shadow-sm text-sm leading-relaxed ${
                        msg.sender === 'agent' 
                        ? 'bg-brand-600 text-white rounded-tr-none' 
                        : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                        }`}>
                            {msg.text}
                       </div>
                   )}
                   
                   <div className={`flex items-center gap-1 mt-1 text-[10px] ${msg.sender === 'agent' ? 'justify-end text-gray-400' : 'text-gray-400'}`}>
                      <span>{msg.timestamp}</span>
                      {msg.sender === 'agent' && (
                        <Check size={12} className={msg.status === 'read' ? 'text-blue-500' : 'text-gray-400'} />
                      )}
                   </div>
                </div>
              )}
            </motion.div>
          ))}
          
          {/* AI Suggestion Chip (Next Best Action) */}
          <AnimatePresence>
            {activeContact.sentiment === 'urgent' && messages[selectedContactId].length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex justify-center"
              >
                 <button 
                    onClick={() => {
                        setInputText("I apologize for the delay, Sarah. I'm checking the status right now with our logistics partner.");
                        setShowAiDraft(true);
                    }}
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white pl-3 pr-4 py-2 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all text-xs font-bold"
                 >
                    <Zap size={14} className="animate-pulse" /> Next Best Action: Apologize & Check Status
                 </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100 relative z-20">
          
          {/* AI Draft Preview */}
          <AnimatePresence>
            {showAiDraft && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-3 bg-purple-50 border border-purple-100 rounded-xl p-3 flex justify-between items-start"
              >
                  <div className="flex gap-2">
                     <Bot size={16} className="text-purple-600 mt-0.5" />
                     <div>
                        <div className="text-xs font-bold text-purple-700 mb-1">AI Draft Generated</div>
                        <p className="text-xs text-gray-600 italic">"Based on customer's angry sentiment and missing order context."</p>
                     </div>
                  </div>
                  <button onClick={() => setShowAiDraft(false)} className="text-gray-400 hover:text-gray-600"><Trash2 size={14} /></button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-end gap-2">
            <div className="flex gap-2 mb-2">
               <button onClick={simulateImageRecog} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors" title="Simulate Image Upload">
                   <ImageIcon size={20} />
               </button>
               <button 
                  onClick={() => setShowTemplates(true)}
                  className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
                  title="Insert Template"
               >
                   <LayoutTemplate size={20} />
               </button>
               <button 
                  onClick={() => handleSendMessage("Payment link for $1,200 (Order #4401)", 'payment')}
                  className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors" 
                  title="Request Payment"
               >
                   <CreditCard size={20} />
               </button>
               <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"><FileText size={20} /></button>
            </div>
            
            <div className="flex-1 bg-gray-50 border border-transparent focus-within:border-brand-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-brand-500/10 rounded-2xl transition-all relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                    }
                }}
                placeholder="Type a message or /template..."
                className="w-full bg-transparent border-none focus:ring-0 p-3 max-h-32 min-h-[50px] resize-none text-sm text-gray-900 placeholder-gray-400"
                rows={1}
              />
            </div>
            
            <button 
                onClick={() => handleSendMessage()}
                className={`p-3 rounded-xl shadow-lg transition-all ${
                    inputText.trim() 
                    ? 'bg-brand-600 text-white hover:bg-brand-700 hover:scale-105' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
            >
              <Send size={20} className={inputText.trim() ? "fill-current" : ""} />
            </button>
          </div>
          
          <div className="flex justify-between mt-2 px-1">
             <p className="text-[10px] text-gray-400">
               <span className="font-bold">Enter</span> to send, <span className="font-bold">Shift + Enter</span> for new line
             </p>
             <button className="text-[10px] font-bold text-gray-500 hover:text-brand-600 flex items-center gap-1 transition-colors">
                <Archive size={10} /> Close Conversation
             </button>
          </div>
        </div>
      </div>

      {/* 3. CRM DETAILS (Right Pane - Responsive) */}
      <div className="w-80 hidden xl:flex flex-col gap-6 overflow-y-auto scrollbar-hide pb-6">
          
          {/* Profile Card */}
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 text-center relative group">
              <div className="absolute top-4 right-4 text-gray-300 group-hover:text-brand-500 cursor-pointer transition-colors">
                  <Star size={18} />
              </div>
              <img src={activeContact.avatar} className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-brand-50" alt="" />
              <h2 className="text-xl font-bold text-gray-900">{activeContact.name}</h2>
              <p className="text-sm text-gray-500 font-medium mb-4">{activeContact.company}</p>
              
              <div className="flex justify-center gap-3 mb-6">
                  <button className="p-2.5 bg-gray-50 hover:bg-brand-50 text-gray-600 hover:text-brand-600 rounded-xl transition-colors">
                      <Phone size={18} />
                  </button>
                  <button className="p-2.5 bg-gray-50 hover:bg-brand-50 text-gray-600 hover:text-brand-600 rounded-xl transition-colors">
                      <Video size={18} />
                  </button>
                  <button className="p-2.5 bg-gray-50 hover:bg-brand-50 text-gray-600 hover:text-brand-600 rounded-xl transition-colors">
                      <Calendar size={18} />
                  </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-left">
                  <div className="p-3 bg-gray-50 rounded-xl">
                      <div className="text-[10px] text-gray-400 uppercase font-bold mb-1">Deal Value</div>
                      <div className="text-sm font-bold text-gray-900">{activeContact.dealValue}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                      <div className="text-[10px] text-gray-400 uppercase font-bold mb-1">Pipeline</div>
                      <div className="text-sm font-bold text-brand-600">{activeContact.pipelineStage}</div>
                  </div>
              </div>
          </div>

          {/* AI Memory (Unique Feature) */}
          <div className="bg-gradient-to-br from-purple-50 to-white rounded-[2rem] p-6 shadow-sm border border-purple-100">
             <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-bold text-purple-900 flex items-center gap-2">
                      <Brain size={16} /> AI Memory
                  </h3>
                  <span className="text-[10px] text-purple-500 font-bold bg-white px-2 py-0.5 rounded-full shadow-sm">Updated</span>
             </div>
             <ul className="space-y-2">
                 {activeContact.memory.map((mem, i) => (
                     <li key={i} className="flex gap-2 text-xs text-gray-600 leading-relaxed">
                         <span className="text-purple-400 mt-1">•</span> {mem}
                     </li>
                 ))}
             </ul>
          </div>

          {/* Contact Details */}
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
               <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                   <User size={16} className="text-gray-400" /> Contact Info
               </h3>
               <div className="space-y-4">
                   <div>
                       <label className="text-xs text-gray-400 font-medium block mb-1">Email Address</label>
                       <div className="text-sm font-bold text-gray-700 flex justify-between group">
                           {activeContact.email}
                           <button className="opacity-0 group-hover:opacity-100 text-brand-600 text-xs">Copy</button>
                       </div>
                   </div>
                   <div>
                       <label className="text-xs text-gray-400 font-medium block mb-1">Phone Number</label>
                       <div className="text-sm font-bold text-gray-700 flex justify-between group">
                           {activeContact.phone}
                           <button className="opacity-0 group-hover:opacity-100 text-brand-600 text-xs">Copy</button>
                       </div>
                   </div>
                   <div>
                       <label className="text-xs text-gray-400 font-medium block mb-1">Tags</label>
                       <div className="flex flex-wrap gap-2">
                           {activeContact.tags.map(tag => (
                               <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold border border-gray-200">
                                   {tag}
                               </span>
                           ))}
                           <button className="px-2 py-1 border border-dashed border-gray-300 text-gray-400 rounded-lg text-xs hover:border-gray-400 hover:text-gray-600 transition-colors">
                               + Add
                           </button>
                       </div>
                   </div>
               </div>
          </div>
      </div>

      {/* --- TEMPLATE PICKER MODAL --- */}
      <AnimatePresence>
        {showTemplates && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 bg-gray-900/20 backdrop-blur-sm flex items-center justify-center p-6"
                onClick={() => setShowTemplates(false)}
            >
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col overflow-hidden"
                >
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-lg text-gray-900">WhatsApp Templates</h3>
                            <p className="text-xs text-gray-500">Select a pre-approved template to start a conversation.</p>
                        </div>
                        <button onClick={() => setShowTemplates(false)} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                            <X size={20} />
                        </button>
                    </div>
                    
                    <div className="p-4 border-b border-gray-100 bg-gray-50 flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input 
                                type="text" 
                                placeholder="Search templates..." 
                                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-brand-300 outline-none"
                            />
                        </div>
                        <select className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 outline-none">
                            <option>All Categories</option>
                            <option>Marketing</option>
                            <option>Utility</option>
                            <option>Authentication</option>
                        </select>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 gap-4 bg-gray-50">
                        {MOCK_TEMPLATES.map((tpl) => (
                            <div key={tpl.id} className="bg-white p-4 rounded-xl border border-gray-200 hover:border-brand-400 hover:shadow-md transition-all cursor-pointer group flex flex-col"
                                onClick={() => handleSelectTemplate(tpl)}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold rounded uppercase">{tpl.category}</span>
                                    <span className="text-[10px] text-gray-400">{tpl.language}</span>
                                </div>
                                <h4 className="font-bold text-sm text-gray-900 mb-2">{tpl.name}</h4>
                                <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 mb-4 flex-1">
                                    {tpl.body}
                                </p>
                                <button className="w-full py-2 bg-brand-50 text-brand-600 rounded-lg text-xs font-bold group-hover:bg-brand-600 group-hover:text-white transition-colors">
                                    Use Template
                                </button>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* --- API CONFIG MODAL --- */}
      <AnimatePresence>
        {showApiConfig && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 bg-gray-900/20 backdrop-blur-sm flex items-center justify-center p-6"
                onClick={() => setShowApiConfig(false)}
            >
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <Settings size={20} className="text-gray-400" /> API Configuration
                        </h2>
                        <button onClick={() => setShowApiConfig(false)}><X size={20} className="text-gray-400" /></button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Webhook URL</label>
                            <input 
                                value={apiConfig.webhookUrl} 
                                onChange={e => setApiConfig({...apiConfig, webhookUrl: e.target.value})}
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono text-gray-700 outline-none focus:border-brand-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">WhatsApp Cloud API Key</label>
                            <input 
                                value={apiConfig.apiKey} 
                                onChange={e => setApiConfig({...apiConfig, apiKey: e.target.value})}
                                type="password"
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono text-gray-700 outline-none focus:border-brand-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Verify Token</label>
                            <input 
                                value={apiConfig.verifyToken} 
                                onChange={e => setApiConfig({...apiConfig, verifyToken: e.target.value})}
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono text-gray-700 outline-none focus:border-brand-500"
                            />
                        </div>
                    </div>

                    <div className="mt-8 flex gap-3">
                         <button onClick={() => setShowApiConfig(false)} className="flex-1 py-3 text-gray-600 font-bold hover:bg-gray-50 rounded-xl transition-colors">Cancel</button>
                         <button onClick={() => setShowApiConfig(false)} className="flex-1 py-3 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 transition-colors">Save Changes</button>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default UnifiedInbox;
