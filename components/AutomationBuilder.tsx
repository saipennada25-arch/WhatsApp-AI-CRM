
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Plus, Clock, MessageCircle, CreditCard, 
  CheckCircle, Play, Pause, MoreVertical, 
  ArrowRight, Users, LayoutTemplate, Settings, X,
  Save, GitBranch, Trash2
} from 'lucide-react';

const INITIAL_WORKFLOWS = [
  { 
    id: 1, 
    name: 'New Lead Welcome', 
    trigger: 'New lead created', 
    status: 'active', 
    stats: { sent: 1240, open: '98%', reply: '45%' },
    steps: ['Wait 2 min', 'Send Welcome Template', 'Tag: New Lead']
  },
  { 
    id: 2, 
    name: 'Abandoned Cart Recovery', 
    trigger: 'Cart updated (no checkout)', 
    status: 'active', 
    stats: { sent: 56, open: '92%', reply: '12%' },
    steps: ['Wait 1 hour', 'Send Discount Offer (10%)', 'Notify Sales']
  },
  { 
    id: 3, 
    name: 'Payment Reminder', 
    trigger: 'Invoice due date', 
    status: 'paused', 
    stats: { sent: 89, open: '95%', reply: '80%' },
    steps: ['Send Payment Link', 'Wait 24h', 'Send Follow-up']
  },
  { 
    id: 4, 
    name: 'Out of Office Reply', 
    trigger: 'Message received (Outside Hours)', 
    status: 'active', 
    stats: { sent: 342, open: '100%', reply: '0%' },
    steps: ['Send OOO Template']
  }
];

const AutomationBuilder: React.FC = () => {
  const [workflows, setWorkflows] = useState(INITIAL_WORKFLOWS);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [activeWorkflow, setActiveWorkflow] = useState<any>(null);

  const openEditor = (flow?: any) => {
    setActiveWorkflow(flow || { name: 'Untitled Workflow', trigger: 'Manual Trigger', steps: [], status: 'active', stats: { sent: 0, open: '0%', reply: '0%' } });
    setIsEditorOpen(true);
  };

  const handleSaveWorkflow = (updatedFlow: any) => {
      if (updatedFlow.id) {
          setWorkflows(workflows.map(w => w.id === updatedFlow.id ? updatedFlow : w));
      } else {
          setWorkflows([...workflows, { ...updatedFlow, id: Date.now() }]);
      }
      setIsEditorOpen(false);
  };

  const handleDeleteWorkflow = (id: number) => {
      if (confirm('Are you sure you want to delete this workflow?')) {
          setWorkflows(workflows.filter(w => w.id !== id));
      }
  };

  const toggleStatus = (id: number) => {
      setWorkflows(workflows.map(w => w.id === id ? { ...w, status: w.status === 'active' ? 'paused' : 'active' } : w));
  };

  if (isEditorOpen) {
    return <WorkflowEditor onClose={() => setIsEditorOpen(false)} workflow={activeWorkflow} onSave={handleSaveWorkflow} />;
  }

  return (
    <div className="space-y-8">
       {/* Header */}
       <div className="flex justify-between items-end">
        <div>
           <h1 className="text-2xl font-bold font-display text-gray-900">Automation Flows</h1>
           <p className="text-gray-500 text-sm">Design automated messaging journeys without code.</p>
        </div>
        <button 
          onClick={() => openEditor()}
          className="flex items-center gap-2 bg-brand-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-brand-700 transition-colors shadow-lg shadow-brand-500/20"
        >
            <Plus size={16} /> Create Workflow
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Active Workflows List */}
          <div className="lg:col-span-2 space-y-4">
              {workflows.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
                      <p className="text-gray-400">No workflows found. Create one to get started.</p>
                  </div>
              )}
              {workflows.map((flow) => (
                  <div key={flow.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-brand-200 transition-colors group">
                      <div className="flex justify-between items-start mb-6">
                          <div className="flex items-start gap-4">
                              <div className={`p-3 rounded-xl transition-colors ${flow.status === 'active' ? 'bg-brand-50 text-brand-600' : 'bg-gray-100 text-gray-500'}`}>
                                  <Zap size={24} fill={flow.status === 'active' ? 'currentColor' : 'none'} />
                              </div>
                              <div>
                                  <h3 className="font-bold text-gray-900 text-lg">{flow.name}</h3>
                                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                      <Play size={12} /> Trigger: <span className="font-medium text-gray-700">{flow.trigger}</span>
                                  </div>
                              </div>
                          </div>
                          <div className="flex items-center gap-2">
                              <button 
                                onClick={() => toggleStatus(flow.id)}
                                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1.5 transition-colors ${
                                  flow.status === 'active' ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                              }`}>
                                  <span className={`w-2 h-2 rounded-full ${flow.status === 'active' ? 'bg-green-600 animate-pulse' : 'bg-yellow-600'}`}></span>
                                  {flow.status}
                              </button>
                              <div className="relative group/menu">
                                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg"><MoreVertical size={18} /></button>
                                <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-lg shadow-xl border border-gray-100 py-1 hidden group-hover/menu:block z-10">
                                    <button onClick={() => handleDeleteWorkflow(flow.id)} className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 font-bold flex items-center gap-2">
                                        <Trash2 size={12} /> Delete
                                    </button>
                                </div>
                              </div>
                          </div>
                      </div>

                      {/* Visual Steps Mini-map */}
                      <div className="bg-gray-50 rounded-xl p-4 mb-6 flex items-center gap-2 overflow-x-auto scrollbar-hide">
                          {flow.steps.length > 0 ? flow.steps.map((step, idx) => (
                              <React.Fragment key={idx}>
                                  <div className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-600 whitespace-nowrap shadow-sm">
                                      {step}
                                  </div>
                                  {idx < flow.steps.length - 1 && (
                                      <ArrowRight size={14} className="text-gray-300 shrink-0" />
                                  )}
                              </React.Fragment>
                          )) : <span className="text-xs text-gray-400 italic">No steps defined</span>}
                      </div>

                      {/* Stats Footer */}
                      <div className="flex items-center gap-6 pt-4 border-t border-gray-50">
                          <div className="flex flex-col">
                              <span className="text-[10px] text-gray-400 font-bold uppercase">Sent</span>
                              <span className="text-sm font-bold text-gray-900">{flow.stats.sent}</span>
                          </div>
                          <div className="flex flex-col">
                              <span className="text-[10px] text-gray-400 font-bold uppercase">Open Rate</span>
                              <span className="text-sm font-bold text-gray-900">{flow.stats.open}</span>
                          </div>
                          <div className="flex flex-col">
                              <span className="text-[10px] text-gray-400 font-bold uppercase">Replied</span>
                              <span className="text-sm font-bold text-gray-900">{flow.stats.reply}</span>
                          </div>
                          <button 
                            onClick={() => openEditor(flow)}
                            className="ml-auto text-sm font-bold text-brand-600 hover:text-brand-700"
                          >
                            Edit Flow
                          </button>
                      </div>
                  </div>
              ))}
          </div>

          {/* Quick Templates Sidebar */}
          <div className="space-y-6">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden">
                  <div className="relative z-10">
                      <h3 className="font-bold text-xl mb-2">Automation Templates</h3>
                      <p className="text-sm text-gray-400 mb-6">Start with pre-built flows designed for conversion.</p>
                      
                      <div className="space-y-3">
                          {[
                              { icon: <MessageCircle size={16} />, label: "Review Request" },
                              { icon: <Clock size={16} />, label: "Meeting Reminder" },
                              { icon: <CreditCard size={16} />, label: "Subscription Renewal" },
                              { icon: <LayoutTemplate size={16} />, label: "Product Launch" },
                          ].map((t, i) => (
                              <button key={i} className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-left group">
                                  <div className="p-2 bg-brand-500 rounded-lg text-white shadow-sm group-hover:scale-110 transition-transform">
                                      {t.icon}
                                  </div>
                                  <span className="text-sm font-bold text-gray-200 group-hover:text-white">{t.label}</span>
                                  <Plus size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                              </button>
                          ))}
                      </div>
                  </div>
                  
                  {/* Decor */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
              </div>
          </div>
      </div>
    </div>
  );
};

// --- VISUAL EDITOR COMPONENT ---
const WorkflowEditor = ({ onClose, workflow, onSave }: { onClose: () => void, workflow: any, onSave: (flow: any) => void }) => {
    const [name, setName] = useState(workflow.name);
    const [trigger, setTrigger] = useState(workflow.trigger);
    
    // In a real app, steps would be a complex object array, simplifying for UI demo
    const [steps, setSteps] = useState<string[]>(workflow.steps || []);

    const handleSave = () => {
        onSave({ ...workflow, name, trigger, steps });
    };

    return (
        <div className="h-[calc(100vh-8rem)] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden relative">
            {/* Toolbar */}
            <div className="h-16 border-b border-gray-100 flex justify-between items-center px-6 bg-gray-50/50">
                <div className="flex items-center gap-4">
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors"><X size={20} /></button>
                    <div>
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-transparent font-bold text-lg text-gray-900 outline-none hover:bg-white hover:px-2 -ml-2 rounded transition-all focus:bg-white focus:ring-2 focus:ring-brand-200" 
                        />
                        <div className="flex items-center gap-1 text-xs text-gray-400 font-bold mt-1">
                            {steps.length} Steps • {workflow.status}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 text-gray-600 font-bold text-sm bg-white border border-gray-200 rounded-xl hover:bg-gray-50">Test Run</button>
                    <button onClick={handleSave} className="px-4 py-2 bg-brand-600 text-white font-bold text-sm rounded-xl hover:bg-brand-700 shadow-lg shadow-brand-500/20 flex items-center gap-2">
                        <Save size={16} /> Save & Publish
                    </button>
                </div>
            </div>

            {/* Canvas Area */}
            <div className="flex-1 relative bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-gray-50 overflow-auto flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-50"></div>
                
                <div className="relative z-10 flex flex-col items-center gap-8 min-w-[300px] py-10">
                    {/* Trigger Node */}
                    <div className="w-80 bg-white rounded-2xl p-4 shadow-lg border-2 border-brand-100 relative group">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-100 text-brand-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                            Trigger
                        </div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-brand-50 rounded-lg text-brand-600"><Zap size={20} /></div>
                            <input 
                                value={trigger}
                                onChange={(e) => setTrigger(e.target.value)}
                                className="font-bold text-gray-900 bg-transparent outline-none w-full"
                            />
                        </div>
                        <p className="text-xs text-gray-500">Event that starts this workflow.</p>
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-gray-300"></div>
                    </div>

                    {/* Dynamic Steps */}
                    {steps.map((step, idx) => (
                        <div key={idx} className="w-80 bg-white rounded-2xl p-4 shadow-lg border border-gray-200 relative group hover:border-brand-500 transition-colors cursor-pointer">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-gray-50 rounded-lg text-gray-600"><Clock size={20} /></div>
                                <span className="font-bold text-gray-900">Action Step {idx + 1}</span>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-2 text-xs font-mono text-center border border-gray-200">
                                {step}
                            </div>
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-gray-300"></div>
                            <button 
                                onClick={() => setSteps(steps.filter((_, i) => i !== idx))}
                                className="absolute -right-10 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-md text-red-500 opacity-0 group-hover:opacity-100 hover:bg-red-50 transition-all"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))}

                    {/* Add Node Button */}
                    <button 
                        onClick={() => setSteps([...steps, "New Action"])}
                        className="mt-4 p-3 rounded-full bg-white border-2 border-dashed border-gray-300 text-gray-400 hover:border-brand-500 hover:text-brand-600 transition-all shadow-sm"
                    >
                        <Plus size={24} />
                    </button>

                </div>
            </div>

            {/* Sidebar Tools */}
            <div className="w-64 border-l border-gray-100 bg-white p-4 overflow-y-auto">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Drag & Drop Blocks</h3>
                <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-brand-400 cursor-grab flex items-center gap-3 shadow-sm" onClick={() => setSteps([...steps, "Wait 1 Day"])}>
                        <Clock size={16} className="text-blue-500" /> <span className="text-sm font-bold text-gray-700">Delay</span>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-brand-400 cursor-grab flex items-center gap-3 shadow-sm" onClick={() => setSteps([...steps, "Send Template"])}>
                        <MessageCircle size={16} className="text-green-500" /> <span className="text-sm font-bold text-gray-700">Send Message</span>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-brand-400 cursor-grab flex items-center gap-3 shadow-sm" onClick={() => setSteps([...steps, "Check Condition"])}>
                        <GitBranch size={16} className="text-purple-500" /> <span className="text-sm font-bold text-gray-700">Condition</span>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-brand-400 cursor-grab flex items-center gap-3 shadow-sm" onClick={() => setSteps([...steps, "Assign to Agent"])}>
                        <Users size={16} className="text-orange-500" /> <span className="text-sm font-bold text-gray-700">Assign Agent</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AutomationBuilder;
