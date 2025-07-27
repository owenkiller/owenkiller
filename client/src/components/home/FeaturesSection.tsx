'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  FaBlog, 
  FaDonate, 
  FaLightbulb, 
  FaMapMarkerAlt, 
  FaGraduationCap, 
  FaStore,
  FaHandshake,
  FaTrophy,
  FaRecycle,
  FaChartLine,
  FaMobile,
  FaGlobe
} from 'react-icons/fa'
import Link from 'next/link'

const FeaturesSection = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  const features = [
    {
      icon: FaBlog,
      title: 'Climate News Hub',
      description: 'Local climate impact reports and citizen journalism from across Africa',
      link: '/blog',
      color: 'bg-blue-500',
      stats: '500+ Stories'
    },
    {
      icon: FaDonate,
      title: 'Smart Donations',
      description: 'Fund bio-kits, support communities, and track your impact in real-time',
      link: '/donate',
      color: 'bg-green-500',
      stats: '$45K+ Raised'
    },
    {
      icon: FaLightbulb,
      title: 'Innovation Lab',
      description: 'Showcase prototypes, hackathon winners, and breakthrough technologies',
      link: '/innovation',
      color: 'bg-yellow-500',
      stats: '120+ Innovations'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Impact Mapping',
      description: 'Interactive maps showing bio-kit installations and real-time energy data',
      link: '/impact',
      color: 'bg-purple-500',
      stats: '89 Locations'
    },
    {
      icon: FaGraduationCap,
      title: 'Eco-Education',
      description: 'Learning resources, classroom materials, and youth activity programs',
      link: '/education',
      color: 'bg-indigo-500',
      stats: '200+ Resources'
    },
    {
      icon: FaStore,
      title: 'Marketplace',
      description: 'Buy and sell upcycled products from local artisans and entrepreneurs',
      link: '/marketplace',
      color: 'bg-pink-500',
      stats: '350+ Products'
    },
    {
      icon: FaHandshake,
      title: 'Partner Network',
      description: 'Collaborate with NGOs, governments, and businesses on sustainability projects',
      link: '/partners',
      color: 'bg-orange-500',
      stats: '50+ Partners'
    },
    {
      icon: FaTrophy,
      title: 'Monthly Challenges',
      description: 'Community competitions and leaderboards for environmental action',
      link: '/challenges',
      color: 'bg-red-500',
      stats: 'New Challenge'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  return (
    <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2322c55e' fill-opacity='0.4'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6">
            Transforming Waste into
            <span className="gradient-text"> Opportunity</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our comprehensive platform connects communities, innovators, and partners 
            in the fight against waste while building sustainable energy solutions.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <Link href={feature.link}>
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full relative overflow-hidden">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  {/* Stats Badge */}
                  <div className="absolute top-4 right-4 bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded-full">
                    {feature.stats}
                  </div>
                  
                  {/* Icon */}
                  <div className={`${feature.color} w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-display font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-200">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Arrow */}
                  <div className="flex items-center mt-6 text-primary-500 font-medium group-hover:text-primary-600 transition-colors duration-200">
                    <span className="text-sm">Learn More</span>
                    <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
        >
          {[
            { icon: FaRecycle, stat: '15,000+', label: 'Kg Waste Processed' },
            { icon: FaChartLine, stat: '89%', label: 'Energy Efficiency' },
            { icon: FaMobile, stat: '10K+', label: 'App Downloads' },
            { icon: FaGlobe, stat: '12', label: 'Countries Reached' }
          ].map((item, index) => (
            <div key={item.label} className="group">
              <item.icon className="h-8 w-8 text-primary-500 mx-auto mb-3 group-hover:scale-110 transition-transform duration-200" />
              <div className="text-3xl font-bold text-gray-900 mb-1">{item.stat}</div>
              <div className="text-gray-600 text-sm">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturesSection