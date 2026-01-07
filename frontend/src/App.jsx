import React, { useState, useEffect } from 'react';
import GateForm from './components/GateForm';
import OfferModal from './components/OfferModal';
import AdminDashboard from './components/AdminDashboard';
import HubPage from './pages/HubPage';
import ItemPage from './pages/ItemPage';

function App() {
  const [step, setStep] = useState('gate'); // flow: 'gate' | 'offer' | 'hub'
  const [route, setRoute] = useState(null); // { name: 'hub', filter } | { name: 'item', id } | { name: 'admin' }

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step, route]);

  // Hash routing
  useEffect(() => {
    const handleRoute = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) {
        setRoute(null);
        return;
      }
      const parts = hash.split('/');
      if (parts[0] === 'admin') {
        setRoute({ name: 'admin' });
        return;
      }
      if (parts[0] === 'hub') {
        const seg = parts[1] || 'all';
        const filter = seg === 'report' ? 'report' : seg === 'tools' ? 'ai_tool' : seg === 'open-source' ? 'open_source' : 'all';
        setRoute({ name: 'hub', filter });
        return;
      }
      if (parts[0] === 'item' && parts[1]) {
        const id = parseInt(parts[1], 10);
        if (!Number.isNaN(id)) {
          setRoute({ name: 'item', id });
          return;
        }
      }
      setRoute(null);
    };
    handleRoute();
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
