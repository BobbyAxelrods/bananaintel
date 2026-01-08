import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ArrowRight, Check, ShieldCheck } from 'lucide-react';

const GateForm = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedResources, setSelectedResources] = useState({
    opensource: true,
    ai_guide: true,
    market_gaps: true
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    
    // Simulate API call
    // Change api url to real url 
    try {
      const response = await fetch(`${API_BASE_URL}/api/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          lead_magnets: Object.keys(selectedResources).filter(k => selectedResources[k]),
          source: 'landing_page_gate'
        }),
      });
      
      const data = await response.json();
      // Even if API fails (e.g. locally without backend running properly), we proceed for demo
      // In prod, check data.success
    } catch (err) {
      console.error("Submission error", err);
    } finally {
      setTimeout(() => {
        setLoading(false);
        onSuccess();
      }, 1000); // Fake delay for UX
    }
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col lg:flex-row font-sans">
      {/* Left Column - Hook */}
      <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center border-r-2 border-black">
        <div className="mb-8">
          <span className="font-mono text-sm bg-black text-white px-2 py-1">
            &gt; EST. 2025 // BANANA INTEL
          </span>
        </div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          Don't Build in <span className="text-primary underline decoration-4 underline-offset-4">the Dark.</span>
        </motion.h1>
        
        <p className="text-xl lg:text-2xl text-gray-800 mb-8 max-w-lg leading-relaxed">
         While others fear AI taking their jobs, you'll be building profitable solutions. We find the problems via socials(Reddit, Twitter), validate the demand (search data), research the tools (open-source), teach the skills (AI techniques)—you just pick which one , build it and monetize.
        </p>
        
        <div className="flex items-center gap-4 text-sm font-mono border-t-2 border-black pt-6">
          <div className="flex -space-x-2">
             {[1,2,3,4].map(i => (
               <div key={i} className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-bold">
                 {String.fromCharCode(64+i)}
               </div>
             ))}
          </div>
          <p>Trusted by 843+ builders .</p>
        </div>
      </div>

      {/* Right Column - Terminal Input */}
      <div className="w-full lg:w-1/2 bg-surface p-8 lg:p-16 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="terminal-card w-full max-w-md relative"
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between border-b border-gray-700 pb-4 mb-6">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-gray-400 text-xs font-mono">SELECT_RESOURCES.exe</div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <label className="text-gray-400 text-sm uppercase tracking-wider">Which resource do you need?</label>
              
              {/* Checkbox 1 */}
              <label className="flex items-start gap-3 p-3 border border-gray-700 rounded hover:bg-gray-900 cursor-pointer transition-colors group">
                <div className="relative flex items-center mt-1">
                  <input 
                    type="checkbox" 
                    checked={selectedResources.opensource}
                    onChange={(e) => setSelectedResources({...selectedResources, opensource: e.target.checked})}
                    className="peer sr-only"
                  />
                  <div className="w-5 h-5 border-2 border-gray-500 rounded bg-transparent peer-checked:bg-primary peer-checked:border-primary transition-all"></div>
                  <Check className="w-3.5 h-3.5 text-white absolute top-1 left-0.5 opacity-0 peer-checked:opacity-100 pointer-events-none" />
                </div>
                <div>
                  <div className="font-bold text-white group-hover:text-primary transition-colors">Open Source Tech Database</div>
                  <div className="text-gray-500 text-xs">100+ validated Repositories to be explored </div>
                </div>
              </label>

              {/* Checkbox 2 */}
              <label className="flex items-start gap-3 p-3 border border-gray-700 rounded hover:bg-gray-900 cursor-pointer transition-colors group">
                <div className="relative flex items-center mt-1">
                  <input 
                    type="checkbox" 
                    checked={selectedResources.ai_guide}
                    onChange={(e) => setSelectedResources({...selectedResources, ai_guide: e.target.checked})}
                    className="peer sr-only"
                  />
                  <div className="w-5 h-5 border-2 border-gray-500 rounded bg-transparent peer-checked:bg-primary peer-checked:border-primary transition-all"></div>
                  <Check className="w-3.5 h-3.5 text-white absolute top-1 left-0.5 opacity-0 peer-checked:opacity-100 pointer-events-none" />
                </div>
                <div>
                  <div className="font-bold text-white group-hover:text-primary transition-colors">AI Tools Database</div>
                  <div className="text-gray-500 text-xs">Validate AI tools to help you be productive</div>
                </div>
              </label>

               {/* Checkbox 3 */}
               <label className="flex items-start gap-3 p-3 border border-gray-700 rounded hover:bg-gray-900 cursor-pointer transition-colors group">
                <div className="relative flex items-center mt-1">
                  <input 
                    type="checkbox" 
                    checked={selectedResources.market_gaps}
                    onChange={(e) => setSelectedResources({...selectedResources, market_gaps: e.target.checked})}
                    className="peer sr-only"
                  />
                  <div className="w-5 h-5 border-2 border-gray-500 rounded bg-transparent peer-checked:bg-primary peer-checked:border-primary transition-all"></div>
                  <Check className="w-3.5 h-3.5 text-white absolute top-1 left-0.5 opacity-0 peer-checked:opacity-100 pointer-events-none" />
                </div>
                <div>
                  <div className="font-bold text-white group-hover:text-primary transition-colors">Sample Market Research </div>
                  <div className="text-gray-500 text-xs">Fresh validated data driven ideas</div>
                </div>
              </label>
            </div>

            <div className="space-y-2 pt-4 border-t border-gray-800">
              <label className="text-gray-400 text-sm uppercase tracking-wider">Destination</label>
              <div className="flex items-center gap-2 border-b-2 border-gray-600 focus-within:border-primary transition-colors pb-2">
                <span className="text-primary font-bold">{'>'}</span>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="enter_email_address_" 
                  className="bg-transparent border-none text-white w-full focus:ring-0 placeholder-gray-600 font-mono"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary text-white font-mono font-bold uppercase py-4 border-2 border-transparent hover:bg-white hover:text-primary hover:border-primary transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="animate-pulse">TRANSMITTING...</span>
              ) : (
                <>
                  [ SEND TO MY INBOX ] <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
            
            <p className="text-center text-gray-500 text-xs">
              <ShieldCheck className="w-3 h-3 inline mr-1" />
              We'll fire this to your inbox immediately.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default GateForm;
