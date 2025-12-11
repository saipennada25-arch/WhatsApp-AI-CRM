
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, Mic, Volume2, History, Settings, 
  BarChart3, User, Globe, Activity, MoreHorizontal,
  Play, Pause, Download, ChevronRight, Save, X, MessageSquare
} from 'lucide-react';

const VoiceAgent: React.FC = () => {
  const [showConfig, setShowConfig] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isManualMode, setIsManualMode] = useState(false);
  const [transcript, setTranscript] = useState<{sender: string, text: string}[]>([]);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  // Configuration State
  const [config, setConfig] = useState({
      voice: 'Sarah (Friendly)',
      language: 'English (India)',
      prompt: "You are a helpful support agent for StyleUp. Be polite, concise, and professional."
  });

  // Call Simulation Logic
  useEffect(() => {
      let interval: any;
      if (isCallActive && !isManualMode) {
          const conversation = [
              { sender: 'Rohan', text: 'Is the store open on Sundays?' },
              { sender: 'AI', text: 'Yes, we are open from 10 AM to 9 PM every Sunday. Would you like to book a visit?' },
              { sender: 'Rohan', text: 'Do you have parking available?' },
              { sender: 'AI', text: 'Yes, we have a dedicated parking lot for customers right behind the store.' },
              { sender: 'Rohan', text: 'Great, thanks!' },
              { sender: 'AI', text: 'You are welcome! Have a great day.' }
          ];
          
          let index = 0;
          interval = setInterval(() => {
              if (index < conversation.length) {
                  setTranscript(prev => [...prev, conversation[index]]);
                  index++;
              } else {
                  setIsCallActive(false); // End call
              }
          }, 2000);
      }
      return () => clearInterval(interval);
  }, [isCallActive, isManualMode]);

  useEffect(() => {
      transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript]);

  const startSimulation = () => {
      setTranscript([]);
      setIsCallActive(true);
      setIsManualMode(false);
  };

  const endCall = () => {
      setIsCallActive(false);
      setIsManualMode(false);
  };

  return (
    <div className="space-y-8 relative">
       {/* Header */}
       <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
               <span className={`flex h-2 w-2 rounded-full ${isCallActive ? 'bg-green-600 animate-pulse' : 'bg-indigo-600'}`}></span>
               {isCallActive ? 'Live Call in Progress' : 'Voice Engine Ready'}
           </div>
           <h1 className="text-2xl font-bold font-display text-gray-900">Voice-to-Voice AI Agent</h1>
           <p className="text-gray-500 text-sm">Real-time handling of inbound WhatsApp calls.</p>
        </div>
        <div className="flex items-center gap-3">
             <div className="bg-white border border-gray-200 px-4 py-2 rounded-xl flex items-center gap-3 shadow-sm">
                 <div className="text-right">
                     <div className="text-[10px] text-gray-400 font-bold uppercase">Status</div>
                     <div className={`text-sm font-bold ${isCallActive ? 'text-green-600' : 'text-gray-500'}`}>{isCallActive ? 'Listening' : 'Idle'}</div>
                 </div>
                 <div className={`w-3 h-3 rounded-full ${isCallActive ? 'bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]' : 'bg-gray-300'}`}></div>
             </div>
             <button 
                onClick={() => setShowConfig(true)}
                className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors"
             >
                <Settings size={16} /> Configure Voice
             </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Live Call Simulation */}
          <div className="lg:col-span-2">
              <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-gray-100 relative overflow-hidden min-h-[400px] flex flex-col items-center justify-center">
                  
                  {/* Background Animation (Active State) */}
                  {isCallActive && (
                      <div className="absolute inset-0 z-0 pointer-events-none">
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-indigo-100 rounded-full opacity-50 animate-[ping_4s_linear_infinite]"></div>
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-indigo-200 rounded-full opacity-60 animate-[ping_3s_linear_infinite_1s]"></div>
                      </div>
                  )}

                  {!isCallActive ? (
                      <div className="text-center z-10">
                          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                              <Phone size={32} />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">No Active Calls</h3>
                          <p className="text-gray-500 mb-6">Waiting for inbound calls...</p>
                          <button onClick={startSimulation} className="px-6 py-3 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/30">
                              Simulate Inbound Call
                          </button>
                      </div>
                  ) : (
                      /* Active Call Card */
                      <div className="relative z-10 w-full max-w-md">
                          <div className="bg-white/90 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-6 text-center">
                              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 flex justify-center items-center gap-2">
                                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span> Active Call • 00:42
                              </div>
                              
                              <div className="flex justify-center items-center gap-8 mb-8">
                                  {/* Caller */}
                                  <div className="relative">
                                      <div className="w-20 h-20 rounded-full bg-gray-100 p-1 border-2 border-gray-200">
                                          <img src="https://ui-avatars.com/api/?name=Rohan+M&background=random" className="w-full h-full rounded-full object-cover" />
                                      </div>
                                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-900 text-white text-[10px] font-bold rounded-full whitespace-nowrap">
                                          Rohan M.
                                      </div>
                                  </div>

                                  {/* Connection Wave */}
                                  <div className="flex gap-1 items-center h-8">
                                      {[...Array(5)].map((_, i) => (
                                          <motion.div 
                                            key={i}
                                            animate={{ height: ['20%', '100%', '20%'] }}
                                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                                            className="w-1 bg-indigo-500 rounded-full"
                                          />
                                      ))}
                                  </div>

                                  {/* AI Agent */}
                                  <div className="relative">
                                      <div className={`w-20 h-20 rounded-full p-1 border-2 flex items-center justify-center transition-colors ${isManualMode ? 'bg-yellow-100 border-yellow-200' : 'bg-indigo-100 border-indigo-200'}`}>
                                          {isManualMode ? <User size={32} className="text-yellow-600" /> : <Mic size={32} className="text-indigo-600" />}
                                      </div>
                                      <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 text-white text-[10px] font-bold rounded-full whitespace-nowrap ${isManualMode ? 'bg-yellow-600' : 'bg-indigo-600'}`}>
                                          {isManualMode ? 'Human Agent' : 'AI Agent'}
                                      </div>
                                  </div>
                              </div>

                              {/* Live Transcript */}
                              <div className="bg-gray-50 rounded-2xl p-4 text-left space-y-3 h-48 overflow-y-auto mb-4 border border-gray-100 scrollbar-thin">
                                  {transcript.map((line, i) => (
                                      <p key={i} className="text-sm">
                                          <span className={`font-bold ${line.sender === 'AI' ? 'text-indigo-800' : 'text-gray-900'}`}>{line.sender}:</span> <span className={line.sender === 'AI' ? 'text-indigo-600 font-medium' : 'text-gray-500'}>{line.text}</span>
                                      </p>
                                  ))}
                                  <div ref={transcriptEndRef} />
                                  {!isManualMode && (
                                    <div className="flex gap-1 items-center mt-2">
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                                    </div>
                                  )}
                              </div>

                              {/* Manual Text Input */}
                              {isManualMode && (
                                  <div className="flex gap-2 mb-4">
                                      <input autoFocus placeholder="Type to speak..." className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm outline-none focus:border-indigo-500" 
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                setTranscript([...transcript, { sender: 'AI (Human)', text: e.currentTarget.value }]);
                                                e.currentTarget.value = '';
                                            }
                                        }}
                                      />
                                      <button className="p-2 bg-indigo-600 text-white rounded-xl"><MessageSquare size={20} /></button>
                                  </div>
                              )}

                              <div className="flex justify-center gap-4">
                                  <button onClick={endCall} className="p-3 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors shadow-sm">
                                      <Phone size={20} className="rotate-[135deg]" />
                                  </button>
                                  <button className="p-3 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors shadow-sm">
                                      <Volume2 size={20} />
                                  </button>
                                  <button 
                                    onClick={() => setIsManualMode(!isManualMode)}
                                    className={`px-6 py-3 text-white rounded-full text-sm font-bold transition-colors shadow-lg ${isManualMode ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-900 hover:bg-gray-800'}`}
                                  >
                                      {isManualMode ? 'Resume AI Mode' : 'Take Over Call'}
                                  </button>
                              </div>
                          </div>
                      </div>
                  )}
              </div>
          </div>

          {/* Call Logs & Stats */}
          <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Activity size={18} className="text-indigo-500" /> Performance Today
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-gray-50 rounded-xl">
                          <div className="text-[10px] text-gray-400 uppercase font-bold">Calls Handled</div>
                          <div className="text-2xl font-bold text-gray-900">48</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-xl">
                          <div className="text-[10px] text-gray-400 uppercase font-bold">Avg. Duration</div>
                          <div className="text-2xl font-bold text-gray-900">1m 20s</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-xl">
                          <div className="text-[10px] text-gray-400 uppercase font-bold">Resolution Rate</div>
                          <div className="text-2xl font-bold text-green-600">92%</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-xl">
                          <div className="text-[10px] text-gray-400 uppercase font-bold">Sentiment</div>
                          <div className="text-2xl font-bold text-indigo-600">Positive</div>
                      </div>
                  </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex-1">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <History size={18} className="text-gray-400" /> Recent Calls
                  </h3>
                  <div className="space-y-4">
                      {[1, 2, 3].map((_, i) => (
                          <div key={i} className="flex items-center justify-between group">
                              <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                      <User size={14} />
                                  </div>
                                  <div>
                                      <div className="text-sm font-bold text-gray-900">+91 98*** ***12</div>
                                      <div className="text-[10px] text-gray-400">Today, 10:30 AM • 2m 15s</div>
                                  </div>
                              </div>
                              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500"><Play size={12} /></button>
                                  <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500"><Download size={12} /></button>
                              </div>
                          </div>
                      ))}
                  </div>
                  <button className="w-full mt-4 text-xs font-bold text-indigo-600 hover:text-indigo-700">View All History</button>
              </div>
          </div>
      </div>

      {/* --- CONFIGURATION SLIDE-OVER --- */}
      <AnimatePresence>
      {showConfig && (
        <div 
          className="fixed inset-0 z-50 bg-gray-900/20 backdrop-blur-sm flex justify-end"
          onClick={() => setShowConfig(false)}
        >
            <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md bg-white shadow-2xl h-full border-l border-gray-100 flex flex-col"
            >
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Voice Configuration</h2>
                        <p className="text-xs text-gray-500">Settings for your WhatsApp AI Agent.</p>
                    </div>
                    <button onClick={() => setShowConfig(false)} className="p-2 hover:bg-gray-200 rounded-full"><X size={20} /></button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    
                    {/* Voice Selection */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 mb-3">AI Personality & Voice</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {['Sarah (Friendly)', 'Mike (Professional)', 'Emma (Calm)'].map((voice, i) => (
                                <div 
                                    key={i} 
                                    onClick={() => setConfig({...config, voice})}
                                    className={`p-3 border rounded-xl cursor-pointer flex items-center gap-3 ${config.voice === voice ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:bg-gray-50'}`}
                                >
                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${config.voice === voice ? 'border-indigo-600' : 'border-gray-300'}`}>
                                        {config.voice === voice && <div className="w-2 h-2 rounded-full bg-indigo-600"></div>}
                                    </div>
                                    <span className="text-xs font-bold text-gray-700">{voice.split(' ')[0]}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Language */}
                    <div>
                         <h3 className="text-sm font-bold text-gray-900 mb-3">Language Support</h3>
                         <select 
                            value={config.language}
                            onChange={(e) => setConfig({...config, language: e.target.value})}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-indigo-500"
                         >
                             <option>English (India)</option>
                             <option>Hindi</option>
                             <option>Hinglish (Mix)</option>
                         </select>
                    </div>

                    {/* System Prompt */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 mb-3">System Instruction</h3>
                        <p className="text-xs text-gray-500 mb-2">Define how the AI should behave during calls.</p>
                        <textarea 
                            value={config.prompt}
                            onChange={(e) => setConfig({...config, prompt: e.target.value})}
                            className="w-full h-32 p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-indigo-500 resize-none"
                        />
                    </div>

                    {/* Handoff Rules */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 mb-3">Human Handoff Triggers</h3>
                        <div className="space-y-2">
                            {['Customer uses angry language', 'Customer asks for human', 'AI confidence score < 60%'].map((rule, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                    <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600 rounded" />
                                    <span className="text-sm text-gray-700">{rule}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                <div className="p-6 border-t border-gray-100">
                    <button onClick={() => setShowConfig(false)} className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                        <Save size={18} /> Save Settings
                    </button>
                </div>
            </motion.div>
        </div>
      )}
      </AnimatePresence>

    </div>
  );
};

export default VoiceAgent;
