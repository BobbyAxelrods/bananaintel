import React from 'react';
import { Search, PenTool, Globe } from 'lucide-react';

const ValueProps = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Search className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Data-Driven Opportunities</h3>
            <p className="text-gray-600 leading-relaxed">
              Stop guessing what to build. I mine Reddit, Twitter, and TikTok for real Asian pain points—validated with search trends and revenue signals. You get pre-researched opportunities every week.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <PenTool className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Open Source Solutions</h3>
            <p className="text-gray-600 leading-relaxed">
              Every opportunity comes with open-source repos, deployment guides, and monetization playbooks. Build for $0-50, not thousands. Includes step-by-step tutorials with missing steps filled in.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Globe className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Asian Market Focus</h3>
            <p className="text-gray-600 leading-relaxed">
              No more copying US ideas that don't translate. Get opportunities validated for Southeast Asian markets—with local pricing models, payment integrations, and cultural adaptations.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ValueProps;
