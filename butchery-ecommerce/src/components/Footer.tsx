import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-red-400">Prime Cuts Butchery</h3>
            <p className="text-gray-300">
              Your trusted local butcher since 1985. We provide the finest quality meats 
              with exceptional service and expertise.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-red-400 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-red-400 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-red-400 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <nav className="space-y-2">
              <Link href="/products" className="block text-gray-300 hover:text-red-400 transition-colors">
                All Products
              </Link>
              <Link href="/products?category=beef" className="block text-gray-300 hover:text-red-400 transition-colors">
                Premium Beef
              </Link>
              <Link href="/products?category=chicken" className="block text-gray-300 hover:text-red-400 transition-colors">
                Free-Range Chicken
              </Link>
              <Link href="/products?category=seafood" className="block text-gray-300 hover:text-red-400 transition-colors">
                Fresh Seafood
              </Link>
              <Link href="/about" className="block text-gray-300 hover:text-red-400 transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="block text-gray-300 hover:text-red-400 transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Customer Service</h4>
            <nav className="space-y-2">
              <Link href="/shipping" className="block text-gray-300 hover:text-red-400 transition-colors">
                Shipping Info
              </Link>
              <Link href="/returns" className="block text-gray-300 hover:text-red-400 transition-colors">
                Returns & Exchanges
              </Link>
              <Link href="/faq" className="block text-gray-300 hover:text-red-400 transition-colors">
                FAQ
              </Link>
              <Link href="/care-instructions" className="block text-gray-300 hover:text-red-400 transition-colors">
                Meat Care Guide
              </Link>
              <Link href="/cooking-tips" className="block text-gray-300 hover:text-red-400 transition-colors">
                Cooking Tips
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">123 Butcher Street</p>
                  <p className="text-gray-300">Meatville, MV 12345</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-red-400 flex-shrink-0" />
                <p className="text-gray-300">(555) 123-MEAT</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-red-400 flex-shrink-0" />
                <p className="text-gray-300">info@primecutsbutchery.com</p>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Mon-Sat: 8AM - 8PM</p>
                  <p className="text-gray-300">Sunday: 10AM - 6PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Prime Cuts Butchery. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-red-400 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-red-400 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-red-400 text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}