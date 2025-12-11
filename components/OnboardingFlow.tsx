
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, MessageCircle, Users, Zap, Briefcase, Smartphone, ArrowRight, Settings, Loader2 } from 'lucide-react';

interface OnboardingFlowProps {
    onComplete: () => void;
}

const STEPS = [
    { id: 1, title: "Goals", icon: <Briefcase size={18} /> },
    { id: 2, title: "Connect", icon: <Smartphone size={18} /> },
    { id: 3, title: "AI Setup", icon: <Zap size={18} /> },
    { id: 4, title: "Team", icon: <Users size={18} /> },
];

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const handleNext = () => {
        if (currentStep < STEPS.length) {
            setCurrentStep(curr => curr + 1);
        } else {
            setLoading(true);
            setTimeout(onComplete, 2000); // Simulate final setup
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center space-x-2">
                    <div className="bg-brand-600 p-1.5 rounded-lg text-white">
                        <MessageCircle size={18} strokeWidth={3} />
                    </div>
                    <span className="text-xl font-bold font-display text-gray-900">UNPHUC</span>
                </div>
                <div className="text-sm font-medium text-gray-500">
                    Setup Guide
                </div>
            </header>

            <div className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-8 grid lg:grid-cols-12 gap-8">

                {/* Left Sidebar - Progress */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">Your Journey</h3>
                        <div className="space-y-6 relative">
                            {/* Vertical Line */}
                            <div className="absolute left-3.5 top-0 bottom-0 w-0.5 bg-gray-100 -z-10"></div>

                            {STEPS.map((step) => {
                                const isCompleted = step.id < currentStep;
                                const isActive = step.id === currentStep;

                                return (
                                    <div key={step.id} className="flex items-center group">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${isCompleted ? 'bg-brand-600 border-brand-600 text-white' :
                                            isActive ? 'bg-white border-brand-600 text-brand-600' :
                                                'bg-white border-gray-200 text-gray-300'
                                            }`}>
                                            {isCompleted ? <Check size={14} strokeWidth={3} /> : step.icon}
                                        </div>
                                        <div className="ml-3">
                                            <div className={`text-sm font-bold transition-colors ${isActive ? 'text-gray-900' : isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                                                {step.title}
                                            </div>
                                            {isActive && <div className="text-xs text-brand-600 font-medium">In Progress...</div>}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Main Content - Steps */}
                <div className="lg:col-span-9 flex flex-col justify-center">
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden min-h-[500px] flex flex-col relative">

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="flex-1 p-8 md:p-12"
                            >
                                {currentStep === 1 && <StepGoals onNext={handleNext} />}
                                {currentStep === 2 && <StepConnect onNext={handleNext} />}
                                {currentStep === 3 && <StepAI onNext={handleNext} />}
                                {currentStep === 4 && <StepTeam onNext={handleNext} loading={loading} />}
                            </motion.div>
                        </AnimatePresence>

                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Step Components ---

const StepGoals = ({ onNext }: { onNext: () => void }) => {
    const [selected, setSelected] = useState<string[]>([]);

    const toggle = (id: string) => {
        setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    return (
        <div className="h-full flex flex-col">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">What are your primary goals?</h2>
                <p className="text-gray-500">We'll tailor the UNPHUC AI experience based on your needs.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
                {[
                    { id: 'support', title: "Automate Support", desc: "Handle FAQs & tickets automatically", icon: <MessageCircle /> },
                    { id: 'sales', title: "Increase Sales", desc: "Qualify leads & send offers", icon: <Briefcase /> },
                    { id: 'marketing', title: "Marketing Blasts", desc: "Send broadcasts to thousands", icon: <Zap /> },
                    { id: 'ops', title: "Team Operations", desc: "Manage team inbox efficiently", icon: <Settings /> },
                ].map((item) => (
                    <div
                        key={item.id}
                        onClick={() => toggle(item.id)}
                        className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${selected.includes(item.id)
                            ? 'border-brand-500 bg-brand-50 shadow-md'
                            : 'border-gray-100 bg-white hover:border-brand-200'
                            }`}
                    >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${selected.includes(item.id) ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-500'
                            }`}>
                            {item.icon}
                        </div>
                        <h3 className="font-bold text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                    </div>
                ))}
            </div>

            <div className="mt-auto flex justify-end">
                <button
                    onClick={onNext}
                    disabled={selected.length === 0}
                    className="flex items-center px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    Continue <ArrowRight size={18} className="ml-2" />
                </button>
            </div>
        </div>
    );
};

const StepConnect = ({ onNext }: { onNext: () => void }) => {
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [status, setStatus] = useState<'loading' | 'qr_ready' | 'connected' | 'error'>('loading');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isPolling, setIsPolling] = useState(false);

    // Generate QR code on mount
    useEffect(() => {
        generateQRCode();
    }, []);

    // Poll for status every 2 seconds
    useEffect(() => {
        if (status === 'qr_ready' && !isPolling) {
            setIsPolling(true);
            const pollInterval = setInterval(async () => {
                try {
                    const whatsappApi = await import('../src/api/whatsappApi');
                    const result = await whatsappApi.getStatus();

                    if (result.status === 'connected') {
                        setStatus('connected');
                        setPhoneNumber(result.phoneNumber || '');
                        clearInterval(pollInterval);

                        // Auto-redirect to dashboard after 2 seconds
                        setTimeout(() => {
                            window.location.href = '/dashboard';
                        }, 2000);
                    } else if (result.status === 'qr_ready' && result.qrCode) {
                        // Update QR code if it changed (regenerated)
                        setQrCode(result.qrCode);
                    }
                } catch (error) {
                    console.error('Polling error:', error);
                }
            }, 2000);

            return () => {
                clearInterval(pollInterval);
                setIsPolling(false);
            };
        }
    }, [status, isPolling]);

    const generateQRCode = async () => {
        try {
            setStatus('loading');
            setErrorMessage('');

            const whatsappApi = await import('../src/api/whatsappApi');
            const result = await whatsappApi.generateQR();

            if (result.status === 'connected') {
                setStatus('connected');
                setPhoneNumber(result.phoneNumber || '');
            } else if (result.qrCode) {
                setQrCode(result.qrCode);
                setStatus('qr_ready');
            } else {
                setStatus('error');
                setErrorMessage('Failed to generate QR code');
            }
        } catch (error: any) {
            console.error('QR generation error:', error);
            setStatus('error');
            setErrorMessage(error.message || 'Failed to generate QR code');
        }
    };

    const handleSimulateConnect = async () => {
        try {
            const whatsappApi = await import('../src/api/whatsappApi');
            const result = await whatsappApi.simulateConnect('+1234567890');

            setStatus('connected');
            setPhoneNumber(result.phoneNumber);

            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 2000);
        } catch (error: any) {
            console.error('Simulate connect error:', error);
            setErrorMessage(error.message || 'Failed to simulate connection');
        }
    };

    return (
        <div className="h-full flex flex-col">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Connect WhatsApp</h2>
                <p className="text-gray-500">
                    {status === 'connected'
                        ? 'Successfully connected!'
                        : 'Scan the QR code with your WhatsApp mobile app to link your number.'}
                </p>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center mb-8">
                {status === 'loading' && (
                    <div className="flex flex-col items-center">
                        <Loader2 size={48} className="animate-spin text-brand-600 mb-4" />
                        <p className="text-gray-500">Generating QR code...</p>
                    </div>
                )}

                {status === 'error' && (
                    <div className="flex flex-col items-center max-w-md">
                        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-4">
                            <p className="text-red-800 text-center">{errorMessage}</p>
                        </div>
                        <button
                            onClick={generateQRCode}
                            className="px-6 py-2 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {status === 'qr_ready' && qrCode && (
                    <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-200 relative">
                        <div className="w-64 h-64 rounded-xl flex items-center justify-center relative overflow-hidden">
                            <img
                                src={qrCode}
                                alt="WhatsApp QR Code"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="mt-4 text-center">
                            <div className="text-xs font-mono text-gray-400">Waiting for scan...</div>
                            <div className="mt-2 flex items-center justify-center text-xs text-gray-500">
                                <Loader2 size={12} className="animate-spin mr-2" />
                                Polling for connection
                            </div>
                        </div>
                    </div>
                )}

                {status === 'connected' && (
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <Check size={40} className="text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Connected!</h3>
                        <p className="text-gray-600 mb-1">WhatsApp Number:</p>
                        <p className="text-lg font-mono font-bold text-brand-600">{phoneNumber}</p>
                        <p className="text-sm text-gray-500 mt-4">Redirecting to dashboard...</p>
                    </div>
                )}

                {status === 'qr_ready' && (
                    <button
                        onClick={handleSimulateConnect}
                        className="mt-6 text-brand-600 text-sm font-bold hover:underline"
                    >
                        Use a test number instead
                    </button>
                )}
            </div>

            <div className="mt-auto flex justify-end">
                <button
                    onClick={onNext}
                    disabled={status !== 'connected'}
                    className="flex items-center px-8 py-3 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Continue <ArrowRight size={18} className="ml-2" />
                </button>
            </div>
        </div>
    );
};

const StepAI = ({ onNext }: { onNext: () => void }) => {
    const [tone, setTone] = useState('friendly');

    return (
        <div className="h-full flex flex-col">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Train your Digital Twin</h2>
                <p className="text-gray-500">How should your AI agent sound when talking to customers?</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-8 items-center">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">AI Name</label>
                        <input type="text" className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none" placeholder="e.g. Sarah from Sales" defaultValue="Sarah Assistant" />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">Tone of Voice</label>
                        <div className="space-y-3">
                            {['Professional', 'Friendly', 'Enthusiastic'].map((t) => (
                                <div
                                    key={t}
                                    onClick={() => setTone(t.toLowerCase())}
                                    className={`flex items-center p-3 rounded-lg border cursor-pointer ${tone === t.toLowerCase() ? 'border-brand-500 bg-brand-50' : 'border-gray-200 hover:bg-gray-50'
                                        }`}
                                >
                                    <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${tone === t.toLowerCase() ? 'border-brand-600' : 'border-gray-300'
                                        }`}>
                                        {tone === t.toLowerCase() && <div className="w-2 h-2 rounded-full bg-brand-600" />}
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">{t}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Preview */}
                <div className="bg-gray-100 p-6 rounded-2xl relative">
                    <div className="absolute top-0 right-0 bg-gray-200 text-gray-500 text-[10px] px-2 py-1 rounded-bl-lg font-mono">
                        LIVE PREVIEW
                    </div>
                    <div className="space-y-4 mt-2">
                        <div className="flex justify-start">
                            <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm text-sm text-gray-600 max-w-[80%]">
                                Hi, do you have a refund policy?
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <div className="bg-brand-500 p-3 rounded-lg rounded-tr-none shadow-md text-sm text-white max-w-[80%]">
                                {tone === 'professional' && "Yes, we offer a 30-day money-back guarantee on all plans. Please check our terms page."}
                                {tone === 'friendly' && "Hey there! 👋 Yes, we totally do. You have 30 days to try us out risk-free!"}
                                {tone === 'enthusiastic' && "Absolutely! 🚀 We want you to love it. If not, you get a full refund within 30 days! No questions asked!"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-auto flex justify-end">
                <button
                    onClick={onNext}
                    className="flex items-center px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all"
                >
                    Save Configuration <ArrowRight size={18} className="ml-2" />
                </button>
            </div>
        </div>
    );
};

const StepTeam = ({ onNext, loading }: { onNext: () => void, loading: boolean }) => {
    return (
        <div className="h-full flex flex-col">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Invite your team</h2>
                <p className="text-gray-500">Collaborate on the same WhatsApp number with unified inbox.</p>
            </div>

            <div className="flex-1 flex flex-col items-center mb-8">
                <div className="w-full max-w-md space-y-4">
                    <div className="flex gap-2">
                        <input type="email" placeholder="colleague@company.com" className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none" />
                        <select className="p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium">
                            <option>Admin</option>
                            <option>Agent</option>
                        </select>
                    </div>
                    <div className="flex gap-2 opacity-60">
                        <input type="email" placeholder="Another email..." className="flex-1 p-3 border border-gray-300 rounded-xl outline-none" />
                        <select className="p-3 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium">
                            <option>Agent</option>
                        </select>
                    </div>
                    <button className="text-brand-600 text-sm font-bold flex items-center hover:underline">
                        + Add more
                    </button>
                </div>

                <div className="mt-8 p-4 bg-blue-50 text-blue-800 text-sm rounded-xl flex items-start gap-3 max-w-md">
                    <Users size={20} className="shrink-0 mt-0.5" />
                    <p>You can skip this for now. Team members can be added anytime from the dashboard settings.</p>
                </div>
            </div>

            <div className="mt-auto flex justify-between items-center">
                <button
                    onClick={onNext}
                    className="text-gray-500 font-medium hover:text-gray-900"
                >
                    Skip for now
                </button>
                <button
                    onClick={onNext}
                    disabled={loading}
                    className="flex items-center px-8 py-3 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-500/30 disabled:opacity-70"
                >
                    {loading ? (
                        <>
                            <Loader2 size={18} className="mr-2 animate-spin" /> Finalizing...
                        </>
                    ) : (
                        <>
                            Finish Setup <Check size={18} className="ml-2" />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default OnboardingFlow;
