
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowLeft, Mail, Lock, CheckCircle, Smartphone, Chrome, User, Briefcase, ChevronRight, Globe, Zap } from 'lucide-react';

interface SignupProps {
  onBack: () => void;
  onLoginClick: () => void;
  onComplete: () => void;
}

const Signup: React.FC<SignupProps> = ({ onBack, onLoginClick, onComplete }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    work_email: '',
    password: '',
    company_name: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('🚀 Submitting signup form...');
    console.log('API URL:', import.meta.env.VITE_API_URL);
    console.log('Form data:', { ...formData, password: '***' });

    try {
      const apiUrl = `${import.meta.env.VITE_API_URL}/auth/signup`;
      console.log('Calling:', apiUrl);

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', res.status);
      console.log('Response ok:', res.ok);

      if (!res.ok) {
        // Try to parse error message from backend
        const errData = await res.json().catch(() => ({}));
        console.error('Signup failed:', errData);
        alert(errData.error || `Signup failed with status ${res.status}`);
        return;
      }

      const data = await res.json();
      console.log("✅ Signup success:", data);

      // Store the JWT token in localStorage for authenticated API calls
      if (data.data && data.data.token) {
        localStorage.setItem('token', data.data.token);
        console.log('✅ Token stored in localStorage');
      }

      onComplete();
    } catch (error) {
      console.error("❌ Signup error:", error);

      // Provide more specific error messages
      if (error instanceof TypeError && error.message.includes('fetch')) {
        alert(`Cannot connect to backend server.\n\nPlease ensure:\n1. Backend is running on ${import.meta.env.VITE_API_URL}\n2. CORS is properly configured\n\nError: ${error.message}`);
      } else {
        alert(`Backend error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">

      {/* Right Side - Form (Swapped for variety from Login) */}
      <div className="w-full lg:w-1/2 flex flex-col relative overflow-y-auto order-2 lg:order-1">
        <button
          onClick={onBack}
          className="absolute top-8 left-8 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-900 group"
        >
          <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
        </button>

        <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-12">
          <div className="w-full max-w-md space-y-6">

            <div className="text-center lg:text-left">
              <div className="inline-flex items-center justify-center lg:justify-start space-x-2 mb-4">
                <div className="bg-brand-600 p-2 rounded-lg text-white shadow-lg">
                  <MessageCircle size={24} />
                </div>
                <span className="text-2xl font-bold font-display text-gray-900">UNPHUC</span>
              </div>
              <h1 className="text-3xl font-bold font-display text-gray-900 mb-2">Start your 14-day free trial</h1>
              <p className="text-gray-500">No credit card required. Cancel anytime.</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-600 transition-colors">
                  <User size={20} />
                </div>
                <input
                  name="full_name"
                  type="text"
                  required
                  value={formData.full_name}
                  onChange={handleChange}
                  className="block w-full pl-11 pr-4 py-3 border-2 border-gray-100 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all font-medium bg-gray-50/50 focus:bg-white"
                  placeholder="Full Name"
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-600 transition-colors">
                  <Briefcase size={20} />
                </div>
                <input
                  name="company_name"
                  type="text"
                  required
                  value={formData.company_name}
                  onChange={handleChange}
                  className="block w-full pl-11 pr-4 py-3 border-2 border-gray-100 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all font-medium bg-gray-50/50 focus:bg-white"
                  placeholder="Company Name"
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-600 transition-colors">
                  <Mail size={20} />
                </div>
                <input
                  name="work_email"
                  type="email"
                  required
                  value={formData.work_email}
                  onChange={handleChange}
                  className="block w-full pl-11 pr-4 py-3 border-2 border-gray-100 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all font-medium bg-gray-50/50 focus:bg-white"
                  placeholder="Work Email"
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-600 transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-11 pr-4 py-3 border-2 border-gray-100 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all font-medium bg-gray-50/50 focus:bg-white"
                  placeholder="Create a password"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-brand-500/30 text-sm font-bold text-white bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all"
              >
                Create Account <ChevronRight size={18} className="ml-2" />
              </motion.button>
            </form>

            <p className="text-xs text-center text-gray-400">
              By clicking "Create Account", you agree to our <a href="#" className="underline hover:text-gray-600">Terms</a> and <a href="#" className="underline hover:text-gray-600">Privacy Policy</a>.
            </p>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">Or sign up with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl shadow-sm bg-white text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all">
                <Chrome size={20} className="mr-2 text-gray-900" />
                Google
              </button>
              <button className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl shadow-sm bg-white text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all">
                <Smartphone size={20} className="mr-2 text-green-600" />
                WhatsApp
              </button>
            </div>

            <p className="mt-8 text-center text-sm text-gray-500">
              Already have an account?{' '}
              <button onClick={onLoginClick} className="font-bold text-brand-600 hover:text-brand-500">
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Left Side - Visuals & Animation (Order 2 on desktop) */}
      <div className="hidden lg:flex w-1/2 relative bg-brand-900 overflow-hidden flex-col items-center justify-center p-12 order-1 lg:order-2">

        {/* Animated Background Gradients */}
        <div className="absolute inset-0 z-0">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-[100px] translate-y-[-10%] translate-x-[20%]"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-green-600/20 rounded-full blur-[120px] translate-y-[20%] translate-x-[-20%]"
          />
        </div>

        {/* Floating cards */}
        <div className="relative z-10 w-full max-w-lg h-[500px]">
          {/* Main Globe/Connection Visual */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/10 rounded-full flex items-center justify-center">
            <Globe size={120} className="text-white/20" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-t border-brand-400 rounded-full"
            />
          </div>

          {/* Testimonial Card */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-10 -right-4 bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-2xl w-72 shadow-2xl"
          >
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4, 5].map(i => <Zap key={i} size={12} className="text-yellow-400 fill-current" />)}
            </div>
            <p className="text-sm text-gray-200 mb-3 italic">"We automated 80% of our support tickets in the first week. UNPHUC is a game changer."</p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center font-bold text-white text-xs">RJ</div>
              <div>
                <div className="text-xs font-bold text-white">Rahul Jain</div>
                <div className="text-[10px] text-gray-400">CEO, TechFlow</div>
              </div>
            </div>
          </motion.div>

          {/* Stat Card */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute top-20 -left-8 bg-brand-600 p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-brand-500"
          >
            <div className="bg-white/20 p-2 rounded-lg text-white">
              <User size={20} />
            </div>
            <div>
              <div className="text-xs text-brand-200 font-medium">New Leads Today</div>
              <div className="text-xl font-bold text-white">+142</div>
            </div>
          </motion.div>
        </div>

        <div className="text-center mt-8 relative z-10">
          <h2 className="text-2xl font-bold font-display text-white mb-2">Join 14,000+ companies</h2>
          <div className="flex -space-x-3 justify-center mt-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-brand-900 bg-gray-200 flex items-center justify-center overflow-hidden">
                <img src={`https://ui-avatars.com/api/?name=User+${i}&background=random`} alt="User" />
              </div>
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-brand-900 bg-white flex items-center justify-center text-xs font-bold text-gray-600">
              +2k
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Signup;
