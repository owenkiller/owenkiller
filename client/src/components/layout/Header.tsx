'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaLeaf, 
  FaBars, 
  FaTimes, 
  FaHome, 
  FaBlog, 
  FaLightbulb, 
  FaDonate, 
  FaStore, 
  FaGraduationCap, 
  FaHandshake, 
  FaChartLine,
  FaInfoCircle 
} from 'react-icons/fa'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    { name: 'Home', href: '/', icon: FaHome },
    { name: 'Blog', href: '/blog', icon: FaBlog },
    { name: 'Innovation Lab', href: '/innovation', icon: FaLightbulb },
    { name: 'Donate', href: '/donate', icon: FaDonate },
    { name: 'Marketplace', href: '/marketplace', icon: FaStore },
    { name: 'Education', href: '/education', icon: FaGraduationCap },
    { name: 'Partners', href: '/partners', icon: FaHandshake },
    { name: 'Impact', href: '/impact', icon: FaChartLine },
    { name: 'About', href: '/about', icon: FaInfoCircle },
  ]

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <FaLeaf className="h-8 w-8 lg:h-10 lg:w-10 text-green-500 group-hover:text-green-600 transition-colors duration-300" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-primary-500 rounded-full animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl lg:text-2xl font-display font-bold gradient-text">
                WasteLight
              </h1>
              <p className="text-xs lg:text-sm text-gray-600 -mt-1">
                Africa
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors duration-200 group"
              >
                <span className="flex items-center space-x-1">
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </span>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/donate"
              className="bg-gradient-to-r from-primary-500 to-green-500 text-white px-6 py-2 rounded-full font-semibold hover:from-primary-600 hover:to-green-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Join the Movement
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200"
          >
            <div className="px-4 py-6 space-y-1">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: menuItems.length * 0.1 }}
                className="pt-4 border-t border-gray-200"
              >
                <Link
                  href="/donate"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full bg-gradient-to-r from-primary-500 to-green-500 text-white text-center px-6 py-3 rounded-full font-semibold hover:from-primary-600 hover:to-green-600 transition-all duration-200"
                >
                  Join the Movement
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header