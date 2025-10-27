'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { 
  FaRecycle, 
  FaBolt, 
  FaUsers, 
  FaLeaf, 
  FaPlay,
  FaArrowRight 
} from 'react-icons/fa'
import Link from 'next/link'

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true })

  const stories = [
    {
      title: "Powering Rural Kenya",
      subtitle: "From Waste to Wonder",
      description: "Maria's village now has electricity from banana peels and maize husks",
      image: "https://images.unsplash.com/photo-1551503766-ac63dfa6fe73?w=800&auto=format&fit=crop",
      stats: { waste: 2400, energy: 12800, communities: 47 }
    },
    {
      title: "Youth Innovation Hub",
      subtitle: "Tomorrow's Solutions Today",
      description: "Students in Nairobi are building bio-digesters for their neighborhoods",
      image: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=800&auto=format&fit=crop",
      stats: { waste: 3200, energy: 18600, communities: 63 }
    },
    {
      title: "Community Champions",
      subtitle: "Leading the Change",
      description: "Local leaders transforming plastic waste into sustainable energy",
      image: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=800&auto=format&fit=crop",
      stats: { waste: 4800, energy: 24200, communities: 89 }
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % stories.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [stories.length])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-1000"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${stories[currentSlide].image})`
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-transparent to-green-900/20" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-green-400/30 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 pt-20 lg:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-center space-y-8"
          >
            {/* Main Heading */}
            <motion.div variants={itemVariants} className="space-y-4">
              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-white leading-tight"
                variants={itemVariants}
              >
                Fueling Communities
                <br />
                <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400">
                  from Waste
                </span>
              </motion.h1>
              <motion.p 
                className="text-xl sm:text-2xl lg:text-3xl text-gray-200 max-w-4xl mx-auto font-light"
                variants={itemVariants}
              >
                {stories[currentSlide].description}
              </motion.p>
            </motion.div>

            {/* Story Navigation */}
            <motion.div variants={itemVariants} className="flex justify-center space-x-2">
              {stories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-green-400 w-8' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                href="/innovation"
                className="group bg-gradient-to-r from-green-500 to-primary-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-green-600 hover:to-primary-600 transform hover:scale-105 transition-all duration-200 shadow-2xl hover:shadow-green-500/25 flex items-center space-x-2"
              >
                <span>Explore Innovation</span>
                <FaArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              
              <button className="group bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/30 transition-all duration-200 border border-white/30 flex items-center space-x-2">
                <FaPlay className="h-4 w-4" />
                <span>Watch Our Story</span>
              </button>
            </motion.div>

            {/* Impact Statistics */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-16 max-w-5xl mx-auto"
            >
              {[
                {
                  icon: FaRecycle,
                  value: stories[currentSlide].stats.waste,
                  suffix: 'kg',
                  label: 'Waste Converted',
                  color: 'text-green-400'
                },
                {
                  icon: FaBolt,
                  value: stories[currentSlide].stats.energy,
                  suffix: 'kWh',
                  label: 'Energy Generated',
                  color: 'text-yellow-400'
                },
                {
                  icon: FaUsers,
                  value: stories[currentSlide].stats.communities,
                  suffix: '',
                  label: 'Communities Served',
                  color: 'text-blue-400'
                },
                {
                  icon: FaLeaf,
                  value: 847,
                  suffix: 'tCO₂',
                  label: 'Emissions Saved',
                  color: 'text-green-300'
                }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="glass rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 group"
                  whileHover={{ scale: 1.05 }}
                >
                  <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-3 group-hover:scale-110 transition-transform duration-200`} />
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
                    {inView && (
                      <CountUp
                        end={stat.value}
                        duration={2.5}
                        separator=","
                        suffix={stat.suffix}
                      />
                    )}
                  </div>
                  <div className="text-gray-300 text-sm font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection