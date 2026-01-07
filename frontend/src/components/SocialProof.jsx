import React from 'react';

const SocialProof = () => {
  return (
    <section className="py-10 bg-white border-y border-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 mb-6 text-center">
        <p className="text-gray-400 font-medium uppercase tracking-widest text-xs">As featured on & trusted by builders from</p>
      </div>
      
      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-16 px-8">
          <span className="text-2xl font-bold text-gray-300 flex items-center gap-2"><span className="text-orange-500">Reddit</span></span>
          <span className="text-2xl font-bold text-gray-300 flex items-center gap-2"><span className="text-orange-500">Product Hunt</span></span>
          <span className="text-2xl font-bold text-gray-300 flex items-center gap-2"><span className="text-orange-500">Indie Hackers</span></span>
          <span className="text-2xl font-bold text-gray-300 flex items-center gap-2">HackerNews</span>
          <span className="text-xl font-mono text-gray-400 border-l-2 border-gray-100 pl-8">50+ Validated Opps</span>
          <span className="text-xl font-mono text-gray-400">100+ Repos</span>
          <span className="text-xl font-mono text-gray-400">40h Research/Week</span>
        </div>
        
        <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center gap-16 px-8">
          <span className="text-2xl font-bold text-gray-300 flex items-center gap-2"><span className="text-orange-500">Reddit</span></span>
          <span className="text-2xl font-bold text-gray-300 flex items-center gap-2"><span className="text-orange-500">Product Hunt</span></span>
          <span className="text-2xl font-bold text-gray-300 flex items-center gap-2"><span className="text-orange-500">Indie Hackers</span></span>
          <span className="text-2xl font-bold text-gray-300 flex items-center gap-2">HackerNews</span>
          <span className="text-xl font-mono text-gray-400 border-l-2 border-gray-100 pl-8">50+ Validated Opps</span>
          <span className="text-xl font-mono text-gray-400">100+ Repos</span>
          <span className="text-xl font-mono text-gray-400">40h Research/Week</span>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
