import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🍌</span>
              <span className="font-display font-bold text-xl">Banana Intel</span>
            </div>
            <p className="text-gray-500 mb-6"> Data driven research. Stop guessing, start building what people really wants.</p>
            <div className="flex gap-4">
              {/* Social placeholders */}
              <div className="w-8 h-8 bg-gray-100 rounded-full hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer flex items-center justify-center">X</div>
              <div className="w-8 h-8 bg-gray-100 rounded-full hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer flex items-center justify-center">In</div>
              <div className="w-8 h-8 bg-gray-100 rounded-full hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer flex items-center justify-center">Y</div>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#" className="hover:text-primary transition-colors">Tools</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Guides</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">University</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Newsletter</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Resources</h4>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">API Docs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>&copy; 2025 Banana Intel. All rights reserved.</p>
          <p className="flex items-center gap-2">Built in Asia 🇲🇾</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
