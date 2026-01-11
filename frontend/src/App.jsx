import React, { useState, useEffect } from 'react';
import GateForm from './components/GateForm';
import OfferModal from './components/OfferModal';
import AdminDashboard from './components/AdminDashboard';
import AdminSignupPage from './pages/AdminSignupPage';
import HubPage from './pages/HubPage';
import ItemPage from './pages/ItemPage';

function App() {
  const [step, setStep] = useState('gate'); // flow: 'gate' | 'offer' | 'hub'

  // Initialize route from current hash to avoid flash of landing page
  const getInitialRoute = () => {
    const hash = window.location.hash.slice(1);
    if (!hash) return null;
    
    // Filter out empty strings to handle leading slashes
    const parts = hash.split('/').filter(p => p);
    if (parts.length === 0) return null;

    if (parts[0] === 'admin') {
        if (parts[1] === 'signup') return { name: 'admin_signup' };
        return { name: 'admin' };
    }
    
    if (parts[0] === 'hub') {
      const seg = parts[1] || 'all';
      let filter = 'all';
      if (seg === 'report') filter = 'report';
      else if (seg === 'tools' || seg === 'ai_tool') filter = 'ai_tool';
      else if (seg === 'open-source' || seg === 'open_source') filter = 'open_source';
      return { name: 'hub', filter };
    }
    
    if (parts[0] === 'item' && parts[1]) {
        const id = parseInt(parts[1], 10);
        if (!Number.isNaN(id)) {
          return { name: 'item', id };
        }
    }
    return null;
  };

  const [route, setRoute] = useState(getInitialRoute()); // { name: 'hub', filter } | { name: 'item', id } | { name: 'admin' }

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step, route]);

  // Hash routing
  useEffect(() => {
    const handleRoute = () => {
      const newRoute = getInitialRoute();
      setRoute(newRoute);
    };
    // No need to call handleRoute() immediately since we initialized state
    window.addEventListener('hashchange', handleRoute);
    return () => window.removeEventListener('hashchange', handleRoute);
  }, []);

  const handleGateSuccess = () => {
    setStep('offer');
  };

  const handleSkipOffer = () => {
    setStep('hub');
  };

  return (
    <div className="min-h-screen bg-bg text-text selection:bg-primary selection:text-white">
      {/* Routed pages */}
      {route?.name === 'admin' && <AdminDashboard />}
      {route?.name === 'admin_signup' && <AdminSignupPage />}
      {route?.name === 'hub' && <HubPage initialFilter={route.filter} />}
      {route?.name === 'item' && <ItemPage itemId={route.id} />}

      {/* Default funnel */}
      {!route && step === 'gate' && (
        <GateForm onSuccess={handleGateSuccess} />
      )}
      {!route && step === 'offer' && (
        <OfferModal onSkip={handleSkipOffer} />
      )}
      {!route && step === 'hub' && (
        <HubPage initialFilter="all" />
      )}
    </div>
  );
}

export default App;
