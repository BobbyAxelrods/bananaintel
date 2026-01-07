import React from 'react';
import { Check } from 'lucide-react';

const Offer = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What's Inside?</h2>
          <p className="text-xl text-gray-600">From free weekly intel to lifetime course access—choose your path</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
          
          {/* Tier 1: Free */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
            <span className="bg-gray-100 text-gray-600 px-4 py-1 rounded-full text-sm font-bold">Start Here</span>
            <h3 className="text-2xl font-bold mt-4 mb-2">Weekly Scout Brief</h3>
            <p className="text-4xl font-bold mb-6">$0</p>
            
            <ul className="space-y-4 mb-8 text-gray-600">
              <li className="flex gap-3"><Check className="w-5 h-5 text-green-500" /> Weekly newsletter</li>
              <li className="flex gap-3"><Check className="w-5 h-5 text-green-500" /> Open source tool highlights</li>
              <li className="flex gap-3"><Check className="w-5 h-5 text-green-500" /> 5 sample opportunities</li>
              <li className="flex gap-3"><Check className="w-5 h-5 text-green-500" /> TikTok/YouTube content</li>
            </ul>
            
            <button className="w-full py-3 border-2 border-gray-200 text-gray-700 font-bold rounded-full hover:border-gray-900 hover:text-gray-900 transition-colors">
              Subscribe Free
            </button>
          </div>

          {/* Tier 2: Scout Access */}
          <div className="relative bg-white p-8 rounded-2xl shadow-2xl border-2 border-primary transform md:-translate-y-4">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-1 rounded-full text-sm font-bold whitespace-nowrap">
              Most Popular
            </div>
            
            <h3 className="text-2xl font-bold mt-4 mb-2">Complete Databases</h3>
            <div className="mb-6">
              <p className="text-gray-400 line-through text-sm">$300/month</p>
              <div className="flex items-baseline gap-1">
                <p className="text-4xl font-bold text-gray-900">$20</p>
                <span className="text-gray-500">/mo</span>
              </div>
              <p className="text-sm text-gray-500 mt-2 font-medium">OR Get Lifetime: <span className="text-primary font-bold">$300</span></p>
            </div>
            
            <ul className="space-y-4 mb-8 text-gray-700">
              <li className="flex gap-3"><Check className="w-5 h-5 text-primary" /> <strong>All 3 Scout Databases</strong></li>
              <li className="flex gap-3"><Check className="w-5 h-5 text-primary" /> 50+ validated opportunities</li>
              <li className="flex gap-3"><Check className="w-5 h-5 text-primary" /> 100+ open source repos</li>
              <li className="flex gap-3"><Check className="w-5 h-5 text-primary" /> Implementation tutorials</li>
              <li className="flex gap-3"><Check className="w-5 h-5 text-primary" /> Weekly market updates</li>
            </ul>
            
            <button className="w-full py-4 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-full hover:shadow-lg hover:scale-[1.02] transition-all">
              Get Lifetime Access
            </button>
            <p className="text-center text-xs text-gray-500 mt-4 flex justify-center items-center gap-1">
              <span className="animate-pulse">🔥</span> 87/100 lifetime spots left
            </p>
          </div>

          {/* Tier 3: Builder Community */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
            <span className="bg-secondary/10 text-secondary px-4 py-1 rounded-full text-sm font-bold">Premium</span>
            <h3 className="text-2xl font-bold mt-4 mb-2">Full Support</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <p className="text-4xl font-bold text-gray-900">$50</p>
              <span className="text-gray-500">/mo</span>
            </div>
            
            <ul className="space-y-4 mb-8 text-gray-600">
              <li className="flex gap-3"><Check className="w-5 h-5 text-secondary" /> Everything in Scout Access</li>
              <li className="flex gap-3"><Check className="w-5 h-5 text-secondary" /> Weekly live office hours</li>
              <li className="flex gap-3"><Check className="w-5 h-5 text-secondary" /> Private Discord community</li>
              <li className="flex gap-3"><Check className="w-5 h-5 text-secondary" /> Monthly group coaching</li>
              <li className="flex gap-3"><Check className="w-5 h-5 text-secondary" /> Priority support</li>
            </ul>
            
            <button className="w-full py-3 border-2 border-gray-200 text-gray-700 font-bold rounded-full hover:border-secondary hover:text-secondary transition-colors">
              Join Community
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Offer;
