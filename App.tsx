
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import KeyElevations from './components/KeyElevations';
import Solutions from './components/Solutions';
import WhyUnphuc from './components/WhyUnphuc';
import PlatformOverview from './components/PlatformOverview';
import TrustMarks from './components/TrustMarks';
import Onboarding from './components/Onboarding';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import Omnichannel from './components/Omnichannel';
import Integrations from './components/Integrations';
import Performance from './components/Performance';
import Login from './components/Login';
import Signup from './components/Signup';
import OnboardingFlow from './components/OnboardingFlow';
import DashboardLayout from './components/DashboardLayout';
import DashboardHome from './components/DashboardHome';
import UnifiedInbox from './components/UnifiedInbox';
import LeadsCRM from './components/LeadsCRM';
import AutomationBuilder from './components/AutomationBuilder';
import VoiceAgent from './components/VoiceAgent';

type ViewState = 'landing' | 'login' | 'signup' | 'onboarding' | 'dashboard';
type DashboardView = 'dashboard' | 'inbox' | 'leads' | 'automation' | 'ai-twin' | 'ai-upsell' | 'ai-price' | 'ai-voice' | 'analytics' | 'campaigns' | 'catalog' | 'settings' | 'pipeline' | 'commerce' | 'ai-local';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('landing');
  const [dashboardView, setDashboardView] = useState<DashboardView>('dashboard');

  if (view === 'login') {
    return (
      <Login
        onBack={() => setView('landing')}
        onSignupClick={() => setView('signup')}
        onLoginSuccess={() => setView('dashboard')}
      />
    );
  }

  if (view === 'signup') {
    return (
      <Signup
        onBack={() => setView('landing')}
        onLoginClick={() => setView('login')}
        onComplete={() => setView('onboarding')}
      />
    );
  }

  if (view === 'onboarding') {
    return (
      <OnboardingFlow
        onComplete={() => setView('dashboard')}
      />
    );
  }

  if (view === 'dashboard') {
    return (
      <DashboardLayout
        onLogout={() => setView('landing')}
        user={{ name: 'Rahul Verma', email: 'rahul@unphuc.com', avatar: '' }}
        activeView={dashboardView}
        onNavigate={(viewId) => setDashboardView(viewId as DashboardView)}
      >
        {dashboardView === 'dashboard' && <DashboardHome />}
        {dashboardView === 'inbox' && <UnifiedInbox />}
        {dashboardView === 'leads' && <LeadsCRM />}
        {dashboardView === 'automation' && <AutomationBuilder />}
        {dashboardView === 'ai-voice' && <VoiceAgent />}

        {/* Placeholder for other views */}
        {['ai-twin', 'ai-upsell', 'ai-price', 'analytics', 'campaigns', 'catalog', 'settings', 'pipeline', 'commerce', 'ai-local'].includes(dashboardView) && (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)] text-center">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Work in Progress</h2>
              <p className="text-gray-500">The {dashboardView.replace('-', ' ')} module is coming soon.</p>
              <button
                onClick={() => setDashboardView('dashboard')}
                className="mt-6 px-6 py-2 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        )}
      </DashboardLayout>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        onLoginClick={() => setView('login')}
        onSignupClick={() => setView('signup')}
      />
      <main>
        <Hero onSignupClick={() => setView('signup')} />
        <KeyElevations />
        <Solutions />
        <Performance />
        <WhyUnphuc />
        <Omnichannel />
        <PlatformOverview />
        <Integrations />
        <TrustMarks />
        <Onboarding />
        <Testimonials />
        <Pricing />
        <FinalCTA onSignupClick={() => setView('signup')} />
      </main>
      <Footer />
    </div>
  );
};

export default App;
