import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

const Hero = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // TODO: Connect to backend
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-gradient-to-br from-orange-50/50 to-yellow-50/50">
      {/* Background Shapes */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-orange-200/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl animate-pulse delay-700" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 leading-tight">
            Build What The Market Needs—<br/>
            <span className="text-gradient">Not What You Think Is Cool</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
            I spend 40+ hours weekly mining Reddit, Twitter, and search trends for Asian pain points—then match them with open-source solutions. You get the research. You build what people will actually pay for.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white/50 backdrop-blur-sm p-2 rounded-3xl">
          {submitted ? (
             <div className="bg-green-100 text-green-800 p-6 rounded-2xl flex items-center justify-center gap-3 animate-fade-in-up">
               <Check className="w-6 h-6" />
               <span className="font-bold text-lg">You're in! Check your inbox for the intel.</span>
             </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">
              <div className="flex flex-col gap-4">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email" 
                  className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none text-lg transition-colors"
                  required
                />
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center py-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 text-primary rounded border-gray-300 focus:ring-primary" />
                    <span className="text-gray-600 group-hover:text-primary transition-colors">Send me Open Source Tools</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 text-primary rounded border-gray-300 focus:ring-primary" />
                    <span className="text-gray-600 group-hover:text-primary transition-colors">Send me AI Tools List</span>
                  </label>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Start Building Smarter <ArrowRight className="w-5 h-5" />
                </button>
                
                <p className="text-sm text-gray-400">No spam. Unsubscribe anytime.</p>
              </div>
            </form>
          )}
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 text-sm font-semibold text-gray-600 bg-white/80 backdrop-blur inline-flex px-4 py-2 rounded-full shadow-sm">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Trusted by 1,000+ Asian Builders
        </div>
      </div>
    </section>
  );
};

export default Hero;
