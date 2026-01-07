import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Play, Lock, SkipForward } from 'lucide-react';

const OfferModal = ({ onSkip }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-bg flex flex-col items-center justify-center p-4 lg:p-8 relative overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-yellow-400 to-primary animate-marquee"></div>

      <div className="max-w-5xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center z-10">
        
        {/* Left: VSL */}
        <div className="space-y-6">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-2">It's on the way.</h2>
            <p className="text-gray-600 mb-6">While you wait for the email, watch how I use this data.</p>
            
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden border-2 border-black shadow-brutal group cursor-pointer">
              {/* Placeholder for Video */}
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 group-hover:bg-gray-900/30 transition-all">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white pl-1 shadow-lg group-hover:scale-110 transition-transform">
                  <Play fill="white" size={24} />
                </div>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop" 
                alt="VSL Thumbnail" 
                className="w-full h-full object-cover opacity-60" 
              />
              <div className="absolute bottom-4 left-4 bg-black/80 text-white px-3 py-1 text-sm font-mono rounded">
                2:14 • How I found a $5k/mo digital business ideas. 
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: The Offer */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white border-2 border-black shadow-brutal p-8 relative"
        >
          <div className="absolute -top-4 -right-4 bg-primary text-white font-mono font-bold px-4 py-2 transform rotate-2 shadow-sm border border-black">
            LIMITED OFFER
          </div>

          <h3 className="text-2xl font-bold mb-4 font-display">Unlock The Full Database</h3>
          <p className="text-gray-600 mb-6 text-sm">
            You subscribed to the weekly report. But the <span className="font-bold text-black">Premium Database</span> has 100+ validated ideas, search volume data, and revenue estimates available <i>right now</i>.
          </p>

          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-2 text-sm font-medium">
              <CheckCircle2 className="text-primary w-5 h-5" /> 100+ Validated Asian Market Ideas
            </li>
            <li className="flex items-center gap-2 text-sm font-medium">
              <CheckCircle2 className="text-primary w-5 h-5" /> Identified market gaps and execution plan 
            </li>
            <li className="flex items-center gap-2 text-sm font-medium">
              <CheckCircle2 className="text-primary w-5 h-5" /> 50+ validated open source tools to assist 
            </li>
            <li className="flex items-center gap-2 text-sm font-medium">
              <CheckCircle2 className="text-primary w-5 h-5" /> Essential Courses & Private Community Access
            </li>
          </ul>

          <div className="bg-surface p-4 border border-gray-200 mb-8 text-center">
             <div className="text-gray-500 text-xs uppercase tracking-widest mb-1">Lifetime Access</div>
             <div className="text-4xl font-bold font-mono text-primary">RM 999</div>
             <div className="text-gray-400 text-xs line-through mt-1">RM 3300/year</div>
          </div>

          <button 
            disabled
            className="w-full bg-gray-400 text-gray-800 font-bold py-4 uppercase tracking-widest cursor-not-allowed mb-2 border-2 border-transparent"
          >
            Registration Closed
          </button>
          
          <div className="text-center text-xs text-red-500 font-bold mb-4">
            We are currently at capacity. Please join the waitlist.
          </div>

          <button 
            onClick={onSkip}
            className="w-full bg-black text-white font-bold py-3 uppercase tracking-widest hover:bg-primary transition-colors border-2 border-transparent hover:border-black flex items-center justify-center gap-2"
          >
             Skip to Hub <SkipForward className="w-4 h-4" />
          </button>
          
          <p className="text-center text-gray-500 text-xs mt-4">
            Subscribe to the newsletter to get notified when we open again.
          </p>

        </motion.div>
      </div>
    </motion.div>
  );
};

export default OfferModal;
