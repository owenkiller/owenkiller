'use client'

import Link from 'next/link'
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin, 
  FaYoutube,
  FaLeaf,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowRight
} from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    platform: [
      { name: 'Climate News', href: '/blog' },
      { name: 'Innovation Lab', href: '/innovation' },
      { name: 'Impact Map', href: '/impact' },
      { name: 'Marketplace', href: '/marketplace' },
      { name: 'Education Hub', href: '/education' },
    ],
    community: [
      { name: 'Monthly Challenges', href: '/challenges' },
      { name: 'Partner Network', href: '/partners' },
      { name: 'Success Stories', href: '/stories' },
      { name: 'Community Guidelines', href: '/community/guidelines' },
      { name: 'Volunteer', href: '/volunteer' },
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Technical Support', href: '/support' },
      { name: 'API Documentation', href: '/api/docs' },
      { name: 'Bug Reports', href: '/bug-report' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Team', href: '/team' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press Kit', href: '/press' },
      { name: 'Investor Relations', href: '/investors' },
    ],
  }

  const socialLinks = [
    { name: 'Facebook', icon: FaFacebook, href: 'https://facebook.com/wastelightafrica', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: FaTwitter, href: 'https://twitter.com/wastelightafrica', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: FaInstagram, href: 'https://instagram.com/wastelightafrica', color: 'hover:text-pink-600' },
    { name: 'LinkedIn', icon: FaLinkedin, href: 'https://linkedin.com/company/wastelight-africa', color: 'hover:text-blue-700' },
    { name: 'YouTube', icon: FaYoutube, href: 'https://youtube.com/wastelightafrica', color: 'hover:text-red-600' },
  ]

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log('Newsletter signup submitted')
  }

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="relative">
                <FaLeaf className="h-10 w-10 text-green-500" />
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-primary-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold gradient-text">WasteLight</h1>
                <p className="text-sm text-gray-400 -mt-1">Africa</p>
              </div>
            </Link>
            
            <p className="text-gray-300 leading-relaxed mb-6">
              Transforming African communities through innovative waste-to-energy solutions. 
              Building a sustainable future, one bio-kit at a time.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span className="text-gray-300">Nairobi, Kenya & Kampala, Uganda</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="h-4 w-4 text-green-500 flex-shrink-0" />
                <a href="mailto:hello@wastelight.africa" className="text-gray-300 hover:text-green-400 transition-colors duration-200">
                  hello@wastelight.africa
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span className="text-gray-300">+254 700 123 456</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 ${social.color} transition-colors duration-200`}
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Platform */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Platform</h3>
              <ul className="space-y-3">
                {footerLinks.platform.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Community */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Community</h3>
              <ul className="space-y-3">
                {footerLinks.community.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-display font-semibold mb-2 text-white">
                Stay Updated
              </h3>
              <p className="text-gray-300">
                Get the latest news about waste-to-energy innovations and community impact stories.
              </p>
            </div>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-primary-500 text-white rounded-lg font-semibold hover:from-green-600 hover:to-primary-600 transition-all duration-200 flex items-center space-x-2 justify-center"
              >
                <span>Subscribe</span>
                <FaArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © {currentYear} WasteLight Africa. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <Link 
                href="/privacy" 
                className="text-gray-400 hover:text-green-400 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-gray-400 hover:text-green-400 transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link 
                href="/cookies" 
                className="text-gray-400 hover:text-green-400 transition-colors duration-200"
              >
                Cookie Policy
              </Link>
              <Link 
                href="/accessibility" 
                className="text-gray-400 hover:text-green-400 transition-colors duration-200"
              >
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer