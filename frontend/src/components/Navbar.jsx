import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍌</span>
            <span className="font-display font-bold text-xl tracking-tight">Banana Intel</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#tools" className="text-gray-600 hover:text-primary transition-colors">Tools</a>
            <a href="#guides" className="text-gray-600 hover:text-primary transition-colors">Guides</a>
            <a href="#university" className="text-gray-600 hover:text-primary transition-colors">University</a>
            <a href="#newsletter" className="text-gray-600 hover:text-primary transition-colors">Newsletter</a>
            <button className="px-6 py-2.5 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-full hover:shadow-lg hover:-translate-y-0.5 transition-all">
              Get Access
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute w-full bg-white border-b border-gray-100 p-4 flex flex-col gap-4 shadow-xl">
          <a href="#tools" className="text-gray-600 p-2" onClick={() => setIsOpen(false)}>Tools</a>
          <a href="#guides" className="text-gray-600 p-2" onClick={() => setIsOpen(false)}>Guides</a>
          <a href="#university" className="text-gray-600 p-2" onClick={() => setIsOpen(false)}>University</a>
          <a href="#newsletter" className="text-gray-600 p-2" onClick={() => setIsOpen(false)}>Newsletter</a>
          <button className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-full">
            Get Access
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
