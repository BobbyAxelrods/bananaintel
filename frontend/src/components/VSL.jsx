import React from 'react';
import { Play, CheckCircle2 } from 'lucide-react';

const VSL = () => {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Video Column */}
          <div className="relative aspect-video bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-700 group cursor-pointer">
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-20 h-20 bg-primary/90 rounded-full flex items-center justify-center pl-1 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-orange-500/20">
                <Play className="w-8 h-8 text-white fill-current" />
              </div>
            </div>
            {/* Placeholder for video thumbnail */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
              <span className="text-lg font-bold">Watch: How I Find $5K-50K Opportunities</span>
            </div>
            <div className="absolute top-4 right-4 bg-black/70 px-3 py-1 rounded-md text-sm font-mono">1:23</div>
          </div>

          {/* Content Column */}
          <div>
            <span className="text-accent font-bold tracking-wider text-sm uppercase mb-2 block">See How It Works</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Let us do the research. You start Building.</h2>
            
            <ul className="space-y-6">
              {[
                "How I mine 12+ subreddits weekly",
                "Validating pain points with search data",
                "Matching opportunities to open-source tools",
                "Creating execution plans for Asian markets"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-gray-300">{item}</span>
                </li>
              ))}
            </ul>

            <button className="mt-10 px-8 py-4 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-colors">
              Get This Week's Report Free
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default VSL;
