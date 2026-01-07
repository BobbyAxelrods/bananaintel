import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const faqs = [
    { q: "Do I need coding skills?", a: "While we provide open source solutions that require some technical knowledge, many can be deployed with minimal coding. We also include no-code alternatives where possible." },
    { q: "Is this only for Asians?", a: "The opportunities are validated for Asian markets (Southeast Asia, India, etc.), but the principles and tools can often be applied globally. However, our unique value is the local nuance." },
    { q: "How often are new opportunities added?", a: "We release a comprehensive report every week with 5-10 new validated opportunities and matching tools." },
    { q: "What if I don't find opportunities I like?", a: "We offer a 14-day money-back guarantee if you're not satisfied with the quality of the research." },
    { q: "Can I upgrade from monthly to lifetime?", a: "Yes, you can upgrade at any time. We'll even credit your last month's payment towards the lifetime deal." }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
              <button 
                className="w-full flex justify-between items-center p-6 bg-white hover:bg-gray-50 text-left transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-bold text-lg">{faq.q}</span>
                {openIndex === index ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-48' : 'max-h-0'}`}
              >
                <div className="p-6 pt-0 bg-white text-gray-600 leading-relaxed border-t border-gray-100">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
