
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowLeft, Mail, Lock, CheckCircle, Smartphone, Zap, Sparkles, ArrowRight, Chrome } from 'lucide-react';

interface LoginProps {
  onBack: () => void;
  onSignupClick?: () => void;
  onLoginSuccess?: () => void;
}

const Login: React.FC<LoginProps> = ({ onBack, onSignupClick, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const apiUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/auth/login`;
      console.log('🔐 Logging in...', apiUrl);

      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        console.error('Login failed:', errData);
        setError(errData.error || `Login failed with status ${res.status}`);
        return;
      }

      const data = await res.json();
      console.log('✅ Login success:', data);

      // Store the JWT token in localStorage for authenticated API calls
      if (data.data && data.data.token) {
        localStorage.setItem('token', data.data.token);
        console.log('✅ Token stored in localStorage');
      }

      if (onLoginSuccess) onLoginSuccess();
    } catch (error) {
      console.error('❌ Login error:', error);
      setError(error instanceof Error ? error.message : 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      {/* Left Side - Visuals & Animation */}
      <div className="hidden lg:flex w-1/2 relative bg-gray-900 overflow-hidden flex-col items-center justify-center p-12">

        {/* Animated Background Gradients */}
        <div className="absolute inset-0 z-0">
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4"
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-lg">

          {/* Mock Chat Interaction */}
          <div className="space-y-6 mb-12">

            {/* User Message */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-start"
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/5 text-white p-4 rounded-2xl rounded-tl-sm shadow-xl max-w-[80%]">
                <p className="text-sm font-medium">Do you have the enterprise plan available?</p>
              </div>
            </motion.div>

            {/* AI Processing Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex items-center space-x-2 text-brand-300 text-xs font-bold uppercase tracking-wider pl-2"
            >
              <Sparkles size={12} className="animate-spin-slow" />
              <span>AI Analyzing Intent...</span>
            </motion.div>

            {/* AI Response */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex justify-end relative"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="bg-brand-500 text-white p-5 rounded-2xl rounded-tr-sm shadow-2xl shadow-brand-500/20 max-w-[90%] relative border border-brand-400"
              >
                <div className="absolute -top-3 -left-3 bg-white text-brand-600 p-1.5 rounded-lg shadow-sm">
                  <Zap size={16} fill="currentColor" />
                </div>
                <p className="text-sm font-medium leading-relaxed">
                  Yes! It includes unlimited seats and our Digital Twin engine. Would you like a demo call?
                </p>
                <div className="mt-3 flex gap-2">
                  <div className="bg-white/20 px-3 py-1 rounded-lg text-xs font-bold">Book Demo</div>
                  <div className="bg-white/20 px-3 py-1 rounded-lg text-xs font-bold">View Pricing</div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold font-display text-white">Automate your growth</h2>
            <p className="text-gray-400">Join the WhatsApp-first revolution.</p>
          </div>

        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col relative overflow-y-auto">
        <button
          onClick={onBack}
          className="absolute top-8 left-8 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-900 group"
        >
          <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
        </button>

        <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-24">
          <div className="w-full max-w-md space-y-8">

            <div className="text-center lg:text-left">
              <div className="inline-flex items-center justify-center lg:justify-start space-x-2 mb-6">
                <div className="bg-brand-600 p-2 rounded-lg text-white shadow-lg">
                  <MessageCircle size={24} />
                </div>
                <span className="text-2xl font-bold font-display text-gray-900">UNPHUC</span>
              </div>
              <h1 className="text-3xl font-bold font-display text-gray-900 mb-2">Welcome back</h1>
              <p className="text-gray-500">Enter your details to access your workspace.</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-600 transition-colors">
                    <Mail size={20} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3.5 border-2 border-gray-100 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all font-medium bg-gray-50/50 focus:bg-white"
                    placeholder="name@company.com"
                  />
                </div>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-600 transition-colors">
                    <Lock size={20} />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3.5 border-2 border-gray-100 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all font-medium bg-gray-50/50 focus:bg-white"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded cursor-pointer"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm font-medium text-gray-500 cursor-pointer">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-bold text-brand-600 hover:text-brand-500">
                    Forgot password?
                  </a>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-800">
                  {error}
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-brand-500/30 text-sm font-bold text-white bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all"
              >
                Sign in to Dashboard
              </motion.button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
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

            <div className="mt-6">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 bg-gray-50 py-3 rounded-lg border border-gray-100">
                <CheckCircle size={16} className="text-brand-500 fill-brand-100" />
                <span className="font-medium">Loved & trusted by <span className="text-gray-900 font-bold">14,000+</span> businesses</span>
              </div>
            </div>

            <p className="mt-8 text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <button
                onClick={onSignupClick}
                className="font-bold text-brand-600 hover:text-brand-500"
              >
                Sign up for free trial
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
