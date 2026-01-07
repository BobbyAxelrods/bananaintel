import React from 'react';

const FeatureShowcase = () => {
  const features = [
    {
      title: "HustleScout Database",
      subtitle: "50+ Pre-Researched Asian Opportunities",
      description: "Pain scores, revenue potential, search data, go-to-market strategies.",
      image: "https://placehold.co/600x400/FF6B35/white?text=HustleScout+Database",
      align: "left"
    },
    {
      title: "RepoScout",
      subtitle: "100+ Open Source Solutions Mapped",
      description: "Deployment guides, monetization angles, Malaysian adaptations.",
      image: "https://placehold.co/600x400/004E89/white?text=RepoScout+GitHub",
      align: "right"
    },
    {
      title: "NicheScout",
      subtitle: "Real-Time Market Intelligence",
      description: "Reddit monitoring, search trends, competition analysis.",
      image: "https://placehold.co/600x400/F7B801/white?text=NicheScout+Analytics",
      align: "left"
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-4xl font-bold text-center mb-16">What's in Every Weekly Report?</h2>

        <div className="space-y-24">
          {features.map((feature, index) => (
            <div key={index} className={`flex flex-col ${feature.align === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}>
              <div className="flex-1">
                <img 
                  src={feature.image} 
                  alt={feature.title} 
                  className="rounded-2xl shadow-xl border border-gray-100 hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              <div className="flex-1 space-y-4">
                <span className="text-primary font-bold tracking-wider uppercase text-sm">{feature.title}</span>
                <h3 className="text-3xl font-bold">{feature.subtitle}</h3>
                <p className="text-xl text-gray-600 leading-relaxed">{feature.description}</p>
                <ul className="space-y-2 text-gray-600">
                  {/* Mock bullets based on description split */}
                  {feature.description.split(', ').map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {item.replace('.', '')}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
