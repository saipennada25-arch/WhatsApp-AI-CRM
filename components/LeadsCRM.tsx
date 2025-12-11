
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Plus, MoreHorizontal, Phone, 
  MessageCircle, Globe, Facebook, LayoutGrid, List,
  ArrowUpRight, Download, Calendar, Tag, X, User,
  Mail, Building, MapPin, CheckSquare, Clock, FileText,
  Activity, ArrowRight, DollarSign, BarChart3, SlidersHorizontal,
  Zap, ChevronDown, PhoneCall, Send, Linkedin, Trash2, Edit2,
  CheckCircle2
} from 'lucide-react';

// --- INITIAL MOCK DATA ---
const INITIAL_LEADS = [
  { id: 1, name: 'Amit Patel', company: 'Gujarat Textiles', source: 'WhatsApp', status: 'New', score: 85, value: '$5,000', lastActive: '2m ago', avatar: 'https://ui-avatars.com/api/?name=Amit+Patel&background=random', email: 'amit@gtextiles.com', phone: '+91 98765 43210', nextAction: 'Send Catalog', nextActionType: 'whatsapp', tasks: [] },
  { id: 2, name: 'Sarah Jenkins', company: 'StyleUp', source: 'Instagram Ad', status: 'Qualified', score: 92, value: '$12,500', lastActive: '1h ago', avatar: 'https://ui-avatars.com/api/?name=Sarah+Jenkins&background=random', email: 'sarah@styleup.com', phone: '+91 98765 12345', nextAction: 'Schedule Demo', nextActionType: 'call', tasks: [{id: 101, text: 'Send proposal', due: 'Tomorrow', completed: false}] },
  { id: 3, name: 'Michael Chen', company: 'TechCorp', source: 'Website Form', status: 'Negotiation', score: 78, value: '$45,000', lastActive: '1d ago', avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=random', email: 'mchen@techcorp.com', phone: '+1 415 555 0123', nextAction: 'Follow up on Quote', nextActionType: 'email', tasks: [] },
  { id: 4, name: 'Priya Sharma', company: 'EduTech', source: 'WhatsApp', status: 'Contacted', score: 60, value: '$2,400', lastActive: '4h ago', avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=random', email: 'priya@edutech.in', phone: '+91 99887 77665', nextAction: 'Qualify Budget', nextActionType: 'whatsapp', tasks: [] },
  { id: 5, name: 'John Doe', company: 'Freelance', source: 'Manual', status: 'New', score: 45, value: '$800', lastActive: '2d ago', avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random', email: 'john@doe.design', phone: '+91 88776 65544', nextAction: 'Send Introduction', nextActionType: 'email', tasks: [] },
];

const STAGES = ['New', 'Contacted', 'Qualified', 'Negotiation', 'Won'];
const STAGE_COLORS: Record<string, string> = {
    'New': 'bg-blue-500',
    'Contacted': 'bg-indigo-500',
    'Qualified': 'bg-purple-500',
    'Negotiation': 'bg-orange-500',
    'Won': 'bg-green-500'
};

const LeadsCRM: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('kanban');
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');

  // Form State
  const [newLead, setNewLead] = useState({ name: '', company: '', email: '', phone: '', source: 'Manual', value: '' });

  const handleAddLead = (e: React.FormEvent) => {
      e.preventDefault();
      const lead = {
          id: Date.now(),
          ...newLead,
          status: 'New',
          score: 50,
          lastActive: 'Just now',
          avatar: `https://ui-avatars.com/api/?name=${newLead.name.replace(' ', '+')}&background=random`,
          nextAction: 'Initial Contact',
          nextActionType: 'whatsapp',
          tasks: []
      };
      setLeads([lead, ...leads]);
      setShowAddModal(false);
      setNewLead({ name: '', company: '', email: '', phone: '', source: 'Manual', value: '' });
  };

  const handleAddTask = () => {
      if (!newTaskText.trim() || !selectedLead) return;
      const updatedLeads = leads.map(l => {
          if (l.id === selectedLead.id) {
              const newTask = { id: Date.now(), text: newTaskText, due: 'Today', completed: false };
              const updated = { ...l, tasks: [newTask, ...l.tasks] };
              setSelectedLead(updated); // Update panel view
              return updated;
          }
          return l;
      });
      setLeads(updatedLeads);
      setNewTaskText('');
  };

  const toggleTask = (taskId: number) => {
      if (!selectedLead) return;
      const updatedLeads = leads.map(l => {
          if (l.id === selectedLead.id) {
              const updatedTasks = l.tasks.map((t: any) => t.id === taskId ? { ...t, completed: !t.completed } : t);
              const updated = { ...l, tasks: updatedTasks };
              setSelectedLead(updated);
              return updated;
          }
          return l;
      });
      setLeads(updatedLeads);
  };

  const moveStage = (leadId: number, newStage: string) => {
      setLeads(leads.map(l => l.id === leadId ? { ...l, status: newStage } : l));
      if (selectedLead && selectedLead.id === leadId) {
          setSelectedLead({ ...selectedLead, status: newStage });
      }
  };

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col relative">
      
      {/* 1. Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 shrink-0">
        <div>
           <div className="flex items-center gap-2 mb-1">
               <h1 className="text-2xl font-bold font-display text-gray-900">Pipeline</h1>
               <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md text-xs font-bold border border-gray-200">
                   Oct 2023
               </span>
           </div>
           <p className="text-gray-500 text-sm">Manage your sales funnel and track conversion metrics.</p>
        </div>
        <div className="flex items-center gap-2">
            <div className="bg-white border border-gray-200 rounded-lg p-1 flex shadow-sm">
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-gray-100 text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    <List size={18} />
                </button>
                <button 
                  onClick={() => setViewMode('kanban')}
                  className={`p-2 rounded-md transition-all ${viewMode === 'kanban' ? 'bg-gray-100 text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    <LayoutGrid size={18} />
                </button>
            </div>
            <button 
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/20"
            >
                <Plus size={16} /> New Lead
            </button>
        </div>
      </div>

      {/* 2. Stats Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 shrink-0">
          {[
              { label: 'Total Pipeline', value: '$582,000', change: '+12%', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
              { label: 'Active Leads', value: leads.length.toString(), change: '+24', icon: User, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Conversion Rate', value: '18.2%', change: '+2.1%', icon: Activity, color: 'text-purple-600', bg: 'bg-purple-50' },
              { label: 'Avg Deal Size', value: '$4,100', change: '-5%', icon: BarChart3, color: 'text-orange-600', bg: 'bg-orange-50' },
          ].map((stat, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                  <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">{stat.label}</p>
                      <h3 className="text-xl font-extrabold text-gray-900 mt-1">{stat.value}</h3>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                      <stat.icon size={20} />
                  </div>
              </div>
          ))}
      </div>

      {/* 3. Filter Bar */}
      <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-sm flex flex-wrap gap-2 items-center shrink-0">
          <div className="relative flex-1 min-w-[200px] ml-2">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
             <input type="text" placeholder="Search by name, company, or email..." className="w-full pl-10 pr-4 py-2 bg-transparent text-sm focus:outline-none placeholder-gray-400 text-gray-700 font-medium" />
          </div>
          <div className="h-6 w-px bg-gray-200 mx-2"></div>
          <FilterDropdown label="Source" />
          <FilterDropdown label="Assigned To" />
          <FilterDropdown label="Lead Score" />
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <SlidersHorizontal size={18} />
          </button>
      </div>

      {/* 4. Main Content Area */}
      <div className="flex-1 overflow-hidden relative">
        {viewMode === 'list' ? (
           <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-full flex flex-col">
              <div className="overflow-auto flex-1">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50/50 sticky top-0 z-10 backdrop-blur-sm">
                        <tr>
                            <th className="p-4 pl-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Contact Name</th>
                            <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Stage</th>
                            <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Source</th>
                            <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">AI Score</th>
                            <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Value</th>
                            <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right pr-6">Next Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {leads.map((lead) => (
                            <tr key={lead.id} onClick={() => setSelectedLead(lead)} className="hover:bg-gray-50/80 transition-colors group cursor-pointer">
                                <td className="p-4 pl-6">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <img src={lead.avatar} className="w-10 h-10 rounded-full border border-gray-100" alt="" />
                                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900 text-sm">{lead.name}</div>
                                            <div className="text-xs text-gray-500 font-medium">{lead.company}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${
                                        lead.status === 'New' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                        lead.status === 'Qualified' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                                        lead.status === 'Negotiation' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                        'bg-gray-100 text-gray-600 border-gray-200'
                                    }`}>
                                        {lead.status}
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                                        {lead.source === 'WhatsApp' && <div className="p-1 bg-green-50 rounded text-green-600"><MessageCircle size={14} /></div>}
                                        {lead.source.includes('Ad') && <div className="p-1 bg-blue-50 rounded text-blue-600"><Facebook size={14} /></div>}
                                        {lead.source.includes('Web') && <div className="p-1 bg-gray-100 rounded text-gray-500"><Globe size={14} /></div>}
                                        {lead.source}
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <span className={`text-sm font-bold ${lead.score > 80 ? 'text-green-600' : lead.score > 50 ? 'text-yellow-600' : 'text-gray-500'}`}>{lead.score}</span>
                                        <div className="w-16 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                            <div className={`h-full rounded-full ${lead.score > 80 ? 'bg-green-500' : lead.score > 50 ? 'bg-yellow-500' : 'bg-gray-400'}`} style={{ width: `${lead.score}%` }}></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-sm font-bold text-gray-900">{lead.value}</td>
                                <td className="p-4 text-right pr-6">
                                     <button className="text-xs font-bold text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 px-3 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1.5">
                                         {lead.nextActionType === 'whatsapp' ? <MessageCircle size={12} /> : lead.nextActionType === 'call' ? <PhoneCall size={12} /> : <Mail size={12} />}
                                         {lead.nextAction}
                                     </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
              </div>
           </div>
        ) : (
            <div className="h-full overflow-x-auto overflow-y-hidden pb-4">
                <div className="flex h-full gap-5 min-w-[1200px] px-1">
                    {STAGES.map((stage) => {
                        const stageLeads = leads.filter(l => l.status === stage);
                        const stageValue = stageLeads.reduce((acc, curr) => acc + (parseInt(curr.value.replace(/[^0-9]/g, '')) || 0), 0);
                        
                        return (
                        <div key={stage} className="flex-1 flex flex-col min-w-[280px] bg-gray-50/50 rounded-2xl border border-gray-100/50 p-2 h-full">
                            {/* Column Header */}
                            <div className="flex justify-between items-start mb-3 px-2 pt-2">
                                <div>
                                    <h3 className="font-bold text-sm text-gray-800 flex items-center gap-2">
                                        <div className={`w-2.5 h-2.5 rounded-full ${STAGE_COLORS[stage] || 'bg-gray-400'}`}></div>
                                        {stage}
                                    </h3>
                                    <p className="text-[10px] text-gray-400 font-medium ml-4.5 mt-0.5">${stageValue.toLocaleString()} Potential</p>
                                </div>
                                <span className="bg-white border border-gray-200 text-gray-500 px-2 py-0.5 rounded-md text-xs font-bold shadow-sm">
                                    {stageLeads.length}
                                </span>
                            </div>
                            
                            {/* Scrollable Card Area */}
                            <div className="flex-1 overflow-y-auto space-y-3 px-1 scrollbar-thin">
                                {stageLeads.map((lead) => (
                                    <motion.div 
                                        layoutId={`lead-card-${lead.id}`}
                                        key={lead.id} 
                                        onClick={() => setSelectedLead(lead)}
                                        whileHover={{ y: -2 }}
                                        className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-brand-200 transition-all group relative"
                                    >
                                        {/* Header */}
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center gap-2">
                                                 {lead.source === 'WhatsApp' && <div className="p-1 bg-green-50 rounded text-green-600 border border-green-100"><MessageCircle size={10} /></div>}
                                                 <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{lead.source}</span>
                                            </div>
                                            {/* Quick Actions (Hover) */}
                                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity absolute top-3 right-3 bg-white pl-2">
                                                <button className="p-1.5 hover:bg-green-50 text-gray-400 hover:text-green-600 rounded-lg transition-colors"><MessageCircle size={14} /></button>
                                                <button className="p-1.5 hover:bg-blue-50 text-gray-400 hover:text-blue-600 rounded-lg transition-colors"><PhoneCall size={14} /></button>
                                            </div>
                                        </div>
                                        
                                        {/* Profile */}
                                        <div className="flex items-center gap-3 mb-4">
                                            <img src={lead.avatar} className="w-9 h-9 rounded-full border border-gray-100" alt="" />
                                            <div>
                                                <div className="font-bold text-sm text-gray-900 leading-tight">{lead.name}</div>
                                                <div className="text-xs text-gray-500 font-medium">{lead.company}</div>
                                            </div>
                                        </div>

                                        {/* AI Next Action */}
                                        <div className="bg-gray-50 rounded-lg p-2 mb-3 border border-gray-100 flex items-center gap-2">
                                            <Zap size={12} className="text-brand-500 fill-brand-500" />
                                            <span className="text-xs font-bold text-gray-700 truncate">
                                                Next: <span className="text-brand-700">{lead.nextAction}</span>
                                            </span>
                                        </div>

                                        {/* Footer */}
                                        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                                            <span className="text-xs font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded">{lead.value}</span>
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-12 bg-gray-100 rounded-full h-1 overflow-hidden">
                                                    <div className={`h-full rounded-full ${lead.score > 80 ? 'bg-green-500' : 'bg-yellow-500'}`} style={{ width: `${lead.score}%` }}></div>
                                                </div>
                                                <span className="text-[10px] text-gray-400 font-bold">{lead.score}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                                <button 
                                    onClick={() => setShowAddModal(true)}
                                    className="w-full py-3 border border-dashed border-gray-300 rounded-xl text-gray-400 text-sm font-bold hover:bg-white hover:text-brand-600 hover:border-brand-300 transition-all flex items-center justify-center gap-2 group"
                                >
                                    <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                                        <Plus size={12} />
                                    </div>
                                    Add Deal
                                </button>
                            </div>
                        </div>
                    )})}
                </div>
            </div>
        )}
      </div>

      {/* --- ADD LEAD MODAL --- */}
      <AnimatePresence>
        {showAddModal && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-[60] flex items-center justify-center bg-gray-900/20 backdrop-blur-sm p-4"
                onClick={() => setShowAddModal(false)}
            >
                 <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6"
                 >
                     <div className="flex justify-between items-center mb-6">
                         <h2 className="text-xl font-bold text-gray-900">Add New Lead</h2>
                         <button onClick={() => setShowAddModal(false)}><X size={20} className="text-gray-400 hover:text-gray-600" /></button>
                     </div>
                     <form onSubmit={handleAddLead} className="space-y-4">
                         <div>
                             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
                             <input required value={newLead.name} onChange={e => setNewLead({...newLead, name: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:border-brand-500 outline-none" placeholder="e.g. John Smith" />
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                             <div>
                                 <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Company</label>
                                 <input required value={newLead.company} onChange={e => setNewLead({...newLead, company: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:border-brand-500 outline-none" placeholder="Acme Inc" />
                             </div>
                             <div>
                                 <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Value ($)</label>
                                 <input required value={newLead.value} onChange={e => setNewLead({...newLead, value: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:border-brand-500 outline-none" placeholder="$10,000" />
                             </div>
                         </div>
                         <div>
                             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
                             <input type="email" required value={newLead.email} onChange={e => setNewLead({...newLead, email: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:border-brand-500 outline-none" placeholder="john@example.com" />
                         </div>
                         <div>
                             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone</label>
                             <input type="tel" required value={newLead.phone} onChange={e => setNewLead({...newLead, phone: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:border-brand-500 outline-none" placeholder="+91..." />
                         </div>
                         <div className="pt-2">
                             <button type="submit" className="w-full py-3 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 transition-colors shadow-lg shadow-brand-500/20">
                                 Create Lead
                             </button>
                         </div>
                     </form>
                 </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* --- LEAD DETAILS SLIDE-OVER --- */}
      <AnimatePresence>
        {selectedLead && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 flex justify-end bg-gray-900/10 backdrop-blur-[2px]"
                onClick={() => setSelectedLead(null)}
            >
                <motion.div 
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-xl bg-white shadow-2xl h-full border-l border-gray-100 flex flex-col"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50/50">
                        <div className="flex gap-4">
                            <div className="relative">
                                <img src={selectedLead.avatar} className="w-16 h-16 rounded-full border-4 border-white shadow-sm" alt="" />
                                <div className="absolute bottom-0 right-0 p-1 bg-white rounded-full">
                                   {selectedLead.source === 'WhatsApp' ? <MessageCircle size={16} className="text-green-500" fill="currentColor" /> : <Globe size={16} className="text-blue-500" />}
                                </div>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">{selectedLead.name}</h2>
                                <p className="text-gray-500 text-sm font-medium flex items-center gap-1">
                                    <Building size={12} /> {selectedLead.company}
                                </p>
                                <div className="flex gap-2 mt-3 items-center">
                                    <div className="relative group">
                                        <button className="px-2.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-md border border-blue-200 flex items-center gap-1 hover:bg-blue-200 transition-colors">
                                            {selectedLead.status} <ChevronDown size={10} />
                                        </button>
                                        <div className="absolute top-full left-0 mt-1 w-32 bg-white rounded-lg shadow-xl border border-gray-100 py-1 hidden group-hover:block z-20">
                                            {STAGES.map(s => (
                                                <button key={s} onClick={() => moveStage(selectedLead.id, s)} className="w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-gray-50 text-gray-700">{s}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <span className="px-2.5 py-0.5 bg-gray-100 text-gray-600 text-xs font-bold rounded-md flex items-center gap-1 border border-gray-200">
                                        <Activity size={10} /> Score: {selectedLead.score}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => setSelectedLead(null)} className="p-2 bg-white rounded-full text-gray-400 hover:text-gray-900 shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-gray-100 px-6">
                        {['Overview', 'Activity', 'Notes', 'Files'].map((tab, i) => (
                            <button key={tab} className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors ${i === 0 ? 'border-brand-600 text-brand-600' : 'border-transparent text-gray-500 hover:text-gray-800'}`}>
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-8">
                        
                        {/* Quick Contact Info */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 border border-gray-100 rounded-xl bg-gray-50/50 flex flex-col gap-1 hover:border-gray-300 transition-colors cursor-pointer group">
                                <label className="text-[10px] text-gray-400 font-bold uppercase flex items-center gap-1">Email <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100" /></label>
                                <div className="text-sm font-bold text-gray-900 flex items-center gap-2 truncate">
                                    <Mail size={14} className="text-gray-400" /> {selectedLead.email}
                                </div>
                            </div>
                            <div className="p-3 border border-gray-100 rounded-xl bg-gray-50/50 flex flex-col gap-1 hover:border-gray-300 transition-colors cursor-pointer group">
                                <label className="text-[10px] text-gray-400 font-bold uppercase flex items-center gap-1">Phone <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100" /></label>
                                <div className="text-sm font-bold text-gray-900 flex items-center gap-2 truncate">
                                    <Phone size={14} className="text-gray-400" /> {selectedLead.phone}
                                </div>
                            </div>
                        </div>

                        {/* AI Insights Block */}
                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-5 border border-indigo-100 relative overflow-hidden">
                             <div className="absolute top-0 right-0 p-3 opacity-10">
                                 <Zap size={64} />
                             </div>
                             <h3 className="text-sm font-bold text-indigo-900 mb-3 flex items-center gap-2 relative z-10">
                                 <Zap size={16} className="text-indigo-600 fill-current" /> AI Insights
                             </h3>
                             <ul className="space-y-2 relative z-10">
                                 <li className="text-xs font-medium text-indigo-800 flex gap-2">
                                     <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0"></span>
                                     Showed high intent on pricing page (3 visits).
                                 </li>
                                 <li className="text-xs font-medium text-indigo-800 flex gap-2">
                                     <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0"></span>
                                     Suggested Action: {selectedLead.nextAction} within 24h.
                                 </li>
                             </ul>
                        </div>

                        {/* Recent Timeline */}
                        <div>
                            <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Clock size={16} /> Recent Activity
                            </h3>
                            <div className="relative pl-4 border-l-2 border-gray-100 space-y-6">
                                {[
                                    { title: 'Moved to ' + selectedLead.status, subtitle: 'Pipeline Stage Updated', time: 'Just now', icon: <ArrowRight size={14} />, color: 'bg-blue-100 text-blue-600' },
                                    { title: 'Inbound WhatsApp', subtitle: '"Can you send the pricing PDF?"', time: '4 hours ago', icon: <MessageCircle size={14} />, color: 'bg-green-100 text-green-600' },
                                    { title: 'Outbound Call', subtitle: 'Talked to Sarah (5m 20s)', time: 'Yesterday', icon: <Phone size={14} />, color: 'bg-purple-100 text-purple-600' },
                                    { title: 'Lead Created', subtitle: 'Imported from ' + selectedLead.source, time: '2 days ago', icon: <Plus size={14} />, color: 'bg-gray-100 text-gray-600' }
                                ].map((item, i) => (
                                    <div key={i} className="relative group">
                                        <div className={`absolute -left-[21px] w-8 h-8 rounded-full border-2 border-white ${item.color} flex items-center justify-center shadow-sm z-10`}>
                                            {item.icon}
                                        </div>
                                        <div className="bg-white border border-gray-100 p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start">
                                                <p className="text-sm font-bold text-gray-900">{item.title}</p>
                                                <span className="text-[10px] text-gray-400 whitespace-nowrap">{item.time}</span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-0.5">{item.subtitle}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tasks */}
                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                             <div className="flex justify-between items-center mb-3">
                                 <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2"><CheckSquare size={16} /> Tasks</h3>
                             </div>
                             <div className="flex gap-2 mb-3">
                                 <input 
                                    value={newTaskText}
                                    onChange={(e) => setNewTaskText(e.target.value)}
                                    placeholder="Add a new task..."
                                    className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-brand-500"
                                    onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                                 />
                                 <button onClick={handleAddTask} className="bg-gray-900 text-white px-3 py-2 rounded-lg text-xs font-bold">Add</button>
                             </div>
                             <div className="space-y-2">
                                 {selectedLead.tasks && selectedLead.tasks.length > 0 ? (
                                    selectedLead.tasks.map((task: any) => (
                                     <div key={task.id} onClick={() => toggleTask(task.id)} className="flex items-start gap-3 bg-white p-3 rounded-xl border border-gray-200 shadow-sm hover:border-brand-300 transition-colors cursor-pointer group">
                                         <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-colors ${task.completed ? 'bg-brand-500 border-brand-500' : 'border-gray-300 hover:border-brand-500'}`}>
                                             {task.completed && <CheckCircle2 size={12} className="text-white" />}
                                         </div>
                                         <div className="flex-1">
                                             <p className={`text-sm font-bold ${task.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>{task.text}</p>
                                             <p className="text-xs text-gray-400 font-bold mt-1 flex items-center gap-1">
                                                 <Clock size={10} /> {task.due}
                                             </p>
                                         </div>
                                         <img src={selectedLead.avatar} className="w-6 h-6 rounded-full opacity-50 grayscale group-hover:grayscale-0" alt="Assignee" />
                                     </div>
                                    ))
                                 ) : (
                                     <div className="text-center py-4 text-xs text-gray-400">No tasks yet.</div>
                                 )}
                             </div>
                        </div>

                    </div>

                    {/* Footer Actions */}
                    <div className="p-4 border-t border-gray-100 flex gap-3 bg-gray-50/50">
                        <button className="flex-1 py-3 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 transition-colors flex justify-center items-center gap-2 shadow-lg shadow-brand-500/20">
                            <MessageCircle size={18} /> Chat on WhatsApp
                        </button>
                        <button className="px-4 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors hover:text-gray-900">
                            <Phone size={18} />
                        </button>
                        <button className="px-4 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors hover:text-gray-900">
                            <MoreHorizontal size={18} />
                        </button>
                    </div>

                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FilterDropdown = ({ label }: { label: string }) => (
    <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg text-xs font-bold hover:bg-gray-100 border border-transparent hover:border-gray-200 transition-all">
        {label} <ChevronDown size={12} className="text-gray-400" />
    </button>
);

export default LeadsCRM;
