'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { 
  FaArrowRight, 
  FaHeart, 
  FaLightbulb,
  FaDonate,
  FaUsers,
  FaPlay
} from 'react-icons/fa'

const CallToActionSection = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  const actions = [
    {
      icon: FaDonate,
      title: 'Fund Bio-Kits',
      description: 'Support communities with direct funding for waste-to-energy installations',
      amount: 'From $50',
      link: '/donate',
      color: 'bg-green-500 hover:bg-green-600',
      textColor: 'text-green-600'
    },
    {
      icon: FaLightbulb,
      title: 'Share Innovation',
      description: 'Submit your waste-to-energy invention and get support from our network',
      amount: 'Free Submission',
      link: '/innovation/submit',
      color: 'bg-yellow-500 hover:bg-yellow-600',
      textColor: 'text-yellow-600'
    },
    {
      icon: FaUsers,
      title: 'Join Community',
      description: 'Connect with local changemakers and participate in monthly challenges',
      amount: 'Join Today',
      link: '/community/join',
      color: 'bg-blue-500 hover:bg-blue-600',
      textColor: 'text-blue-600'
    }
  ]

  const manifesto = [
    "We believe waste is not the end, but the beginning.",
    "Of energy. Of empowerment. Of community transformation.",
    "We are building tools for every village, every maker, every visionary.",
    "The power to light a home, clean a street, or fund a dream — from trash.",
    "This is the future we deserve. This is the future we will build."
  ]

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-900 via-primary-900 to-green-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Animated Particles */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Manifesto Section */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-display font-bold text-white mb-8">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                Manifesto
              </span>
            </h2>
            
            <div className="space-y-6">
              {manifesto.map((line, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`text-lg lg:text-xl text-white/90 leading-relaxed ${
                    index === 0 || index === 1 || index === 3 || index === 4
                      ? 'font-semibold text-white' 
                      : ''
                  }`}
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Action Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {actions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 * index }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <Link href={action.link}>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 h-full">
                  <div className={`w-14 h-14 ${action.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200`}>
                    <action.icon className="h-7 w-7 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-display font-semibold text-white mb-3 group-hover:text-green-300 transition-colors duration-200">
                    {action.title}
                  </h3>
                  
                  <p className="text-white/80 leading-relaxed mb-6">
                    {action.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-lg font-semibold ${action.textColor}`}>
                      {action.amount}
                    </span>
                    <FaArrowRight className="h-5 w-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl p-8 lg:p-12 border border-white/20 mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-display font-bold text-white mb-4">
              Together We've Achieved
            </h3>
            <p className="text-white/80 text-lg">
              Real impact from real communities
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '15,420', unit: 'kg', label: 'Waste Converted' },
              { value: '28,750', unit: 'kWh', label: 'Energy Generated' },
              { value: '847', unit: 'tCO₂', label: 'Emissions Saved' },
              { value: '63', unit: '', label: 'Communities Served' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="text-center group"
              >
                <div className="text-3xl lg:text-4xl font-bold text-white mb-1 group-hover:text-green-300 transition-colors duration-200">
                  {stat.value}
                  <span className="text-xl text-white/60">{stat.unit}</span>
                </div>
                <div className="text-white/80 text-sm font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <h3 className="text-3xl lg:text-4xl font-display font-bold text-white mb-8">
            Ready to Light Up Africa?
          </h3>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              href="/get-started"
              className="group bg-gradient-to-r from-green-500 to-blue-500 text-white px-10 py-5 rounded-full font-semibold text-xl hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-2xl hover:shadow-green-500/25 flex items-center space-x-3"
            >
              <span>Get Started Today</span>
              <FaArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            
            <button className="group bg-white/20 backdrop-blur-md text-white px-10 py-5 rounded-full font-semibold text-xl hover:bg-white/30 transition-all duration-200 border border-white/30 flex items-center space-x-3">
              <FaPlay className="h-5 w-5" />
              <span>Watch Documentary</span>
            </button>
          </div>
          
          <p className="text-white/60 mt-6 text-lg">
            Join 12,500+ changemakers already making a difference
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default CallToActionSection