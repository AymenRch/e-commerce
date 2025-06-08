import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-charcoal-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-charcoal-900 font-serif font-bold text-sm">S</span>
              </div>
              <span className="font-serif text-xl font-semibold">ScentSpace</span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Discover your signature scent with our curated collection of luxury perfumes. 
              Quality fragrances delivered to your doorstep.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'Shop', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-3">
              {['Men\'s Fragrances', 'Women\'s Fragrances', 'Unisex', 'Gift Sets'].map((item) => (
                <li key={item}>
                  <Link 
                    to="/shop"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <Phone size={16} />
                <span>+213 555 123 456</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <Mail size={16} />
                <span>info@scentspace.dz</span>
              </div>
              <div className="flex items-start space-x-3 text-sm text-gray-300">
                <MapPin size={16} className="mt-0.5" />
                <span>123 Perfume Street<br />Algiers, Algeria</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 ScentSpace. All rights reserved. | Cash on Delivery Available
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 