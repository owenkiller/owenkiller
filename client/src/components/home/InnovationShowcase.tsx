'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'
import { 
  FaLightbulb, 
  FaVote, 
  FaEye, 
  FaHeart,
  FaArrowRight,
  FaTrophy,
  FaStar
} from 'react-icons/fa'

interface Innovation {
  id: string
  title: string
  description: string
  inventor_name: string
  category: string
  waste_type: string
  energy_output_kwh: number
  efficiency_percentage: number
  development_stage: string
  images: string[]
  location_country: string
  is_featured: boolean
  votes_count: number
  views_count: number
}

const InnovationShowcase = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [innovations, setInnovations] = useState<Innovation[]>([])
  const [activeTab, setActiveTab] = useState('featured')
  const [isLoading, setIsLoading] = useState(true)

  const tabs = [
    { id: 'featured', label: 'Featured', icon: FaStar },
    { id: 'recent', label: 'Recent', icon: FaLightbulb },
    { id: 'popular', label: 'Popular', icon: FaTrophy },
  ]

  useEffect(() => {
    fetchInnovations()
  }, [activeTab])

  const fetchInnovations = async () => {
    try {
      setIsLoading(true)
      // In real app, this would be an API call
      // const response = await fetch(`/api/innovations?filter=${activeTab}`)
      // const data = await response.json()
      
      // Mock data for demo
      const mockInnovations: Innovation[] = [
        {
          id: '1',
          title: 'Solar-Powered Bio-Gasifier',
          description: 'A hybrid system combining solar panels with organic waste gasification to produce clean energy for rural communities.',
          inventor_name: 'David Kimani',
          category: 'Energy Generation',
          waste_type: 'Organic Waste',
          energy_output_kwh: 45.5,
          efficiency_percentage: 78.5,
          development_stage: 'Prototype',
          images: ['https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&auto=format&fit=crop'],
          location_country: 'Kenya',
          is_featured: true,
          votes_count: 127,
          views_count: 2340
        },
        {
          id: '2',
          title: 'Plastic-to-Fuel Converter',
          description: 'Mobile unit that converts plastic waste into liquid fuel through advanced pyrolysis technology.',
          inventor_name: 'Sarah Ochieng',
          category: 'Waste Processing',
          waste_type: 'Plastic Waste',
          energy_output_kwh: 32.0,
          efficiency_percentage: 65.2,
          development_stage: 'Testing',
          images: ['https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&auto=format&fit=crop'],
          location_country: 'Kenya',
          is_featured: true,
          votes_count: 89,
          views_count: 1875
        },
        {
          id: '3',
          title: 'Smart Waste Digester',
          description: 'IoT-enabled bio-digester with real-time monitoring and automated gas collection for urban households.',
          inventor_name: 'James Mwangi',
          category: 'Smart Technology',
          waste_type: 'Food Waste',
          energy_output_kwh: 18.5,
          efficiency_percentage: 82.1,
          development_stage: 'Pilot',
          images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop'],
          location_country: 'Kenya',
          is_featured: false,
          votes_count: 156,
          views_count: 3120
        }
      ]

      setInnovations(mockInnovations)
    } catch (error) {
      console.error('Error fetching innovations:', error)
    } finally {
      setIsLoading(false)
    }
  }

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
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full opacity-50 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-100 rounded-full opacity-50 animate-float" style={{ animationDelay: '2s' }}></div>
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
            Innovation <span className="gradient-text">Lab</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover breakthrough technologies and support the next generation of African 
            innovators transforming waste into valuable energy solutions.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white text-primary-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Innovations Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-gray-200 rounded-2xl h-80 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {innovations.slice(0, 6).map((innovation, index) => (
              <motion.div
                key={innovation.id}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={innovation.images[0]}
                    alt={innovation.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex space-x-2">
                    {innovation.is_featured && (
                      <span className="px-2 py-1 text-xs font-semibold bg-yellow-500 text-white rounded-full flex items-center space-x-1">
                        <FaStar className="h-3 w-3" />
                        <span>Featured</span>
                      </span>
                    )}
                    <span className="px-2 py-1 text-xs font-semibold bg-primary-500 text-white rounded-full">
                      {innovation.development_stage}
                    </span>
                  </div>

                  {/* Quick Stats */}
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs">
                      <FaEye className="h-3 w-3 text-gray-600" />
                      <span className="text-gray-800">{innovation.views_count}</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs">
                      <FaHeart className="h-3 w-3 text-red-500" />
                      <span className="text-gray-800">{innovation.votes_count}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-display font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors duration-200">
                        {innovation.title}
                      </h3>
                      <p className="text-sm text-gray-600">by {innovation.inventor_name}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {innovation.description}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-gray-500">Energy Output:</span>
                      <div className="font-semibold text-green-600">{innovation.energy_output_kwh} kWh</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Efficiency:</span>
                      <div className="font-semibold text-blue-600">{innovation.efficiency_percentage}%</div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                      {innovation.category}
                    </span>
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                      {innovation.waste_type}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/innovation/${innovation.id}`}
                      className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium text-sm group"
                    >
                      <span>Learn More</span>
                      <FaArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                    
                    <button className="flex items-center space-x-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors duration-200">
                      <FaVote className="h-3 w-3" />
                      <span>Vote</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Link
            href="/innovation"
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary-500 to-green-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-primary-600 hover:to-green-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <span>Explore All Innovations</span>
            <FaArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default InnovationShowcase