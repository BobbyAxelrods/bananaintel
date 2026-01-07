import React from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">What Builders Are Saying</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 text-accent fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">"I spent 3 months researching. This gave me 20 validated ideas in 1 hour. Absolutely game-changing for my solo dev journey."</p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                  AK
                </div>
                <div>
                  <h4 className="font-bold">Ahmad K.</h4>
                  <p className="text-sm text-gray-500">Malaysian Solo Builder</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
