'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import dynamic from 'next/dynamic'
import { 
  FaMapMarkerAlt, 
  FaBolt, 
  FaRecycle, 
  FaLeaf,
  FaFilter,
  FaExpand
} from 'react-icons/fa'

// Dynamically import the map to avoid SSR issues
const InteractiveMap = dynamic(
  () => import('@/components/shared/InteractiveMap'),
  { 
    ssr: false,
    loading: () => <div className="h-96 bg-gray-200 animate-pulse rounded-xl" />
  }
)

interface Installation {
  id: string
  name: string
  location_lat: number
  location_lng: number
  country: string
  region: string
  community: string
  kit_type: string
  capacity_kwh: number
  waste_processed_kg: number
  energy_generated_kwh: number
  co2_saved_tons: number
  status: string
}

const ImpactMapSection = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [installations, setInstallations] = useState<Installation[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [selectedType, setSelectedType] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const countries = ['All Countries', 'Kenya', 'Uganda', 'Tanzania', 'Rwanda']
  const kitTypes = ['All Types', 'Bio-Gas Digester', 'Pyrolysis Unit', 'Solar Hybrid', 'Gasifier']

  useEffect(() => {
    fetchInstallations()
  }, [selectedCountry, selectedType])

  const fetchInstallations = async () => {
    try {
      setIsLoading(true)
      const params = new URLSearchParams()
      if (selectedCountry && selectedCountry !== 'All Countries') {
        params.append('country', selectedCountry)
      }
      if (selectedType && selectedType !== 'All Types') {
        params.append('kit_type', selectedType)
      }

      // In real app, this would be an API call
      // const response = await fetch(`/api/impact/installations?${params}`)
      // const data = await response.json()
      
      // Mock data for demo
      const mockInstallations: Installation[] = [
        {
          id: '1',
          name: 'Kibera Community Center',
          location_lat: -1.3133,
          location_lng: 36.7831,
          country: 'Kenya',
          region: 'Nairobi',
          community: 'Kibera',
          kit_type: 'Bio-Gas Digester',
          capacity_kwh: 25.5,
          waste_processed_kg: 1240,
          energy_generated_kwh: 2180,
          co2_saved_tons: 4.2,
          status: 'active'
        },
        {
          id: '2',
          name: 'Kisumu Waste-to-Energy Hub',
          location_lat: -0.0917,
          location_lng: 34.7680,
          country: 'Kenya',
          region: 'Kisumu',
          community: 'Kisumu Central',
          kit_type: 'Pyrolysis Unit',
          capacity_kwh: 50.0,
          waste_processed_kg: 2850,
          energy_generated_kwh: 4720,
          co2_saved_tons: 8.1,
          status: 'active'
        },
        {
          id: '3',
          name: 'Mombasa Solar-Waste Hybrid',
          location_lat: -4.0435,
          location_lng: 39.6682,
          country: 'Kenya',
          region: 'Mombasa',
          community: 'Old Town',
          kit_type: 'Solar Hybrid',
          capacity_kwh: 35.0,
          waste_processed_kg: 1680,
          energy_generated_kwh: 3240,
          co2_saved_tons: 6.3,
          status: 'active'
        }
      ]

      setInstallations(mockInstallations)
    } catch (error) {
      console.error('Error fetching installations:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const totalStats = installations.reduce(
    (acc, installation) => ({
      waste: acc.waste + installation.waste_processed_kg,
      energy: acc.energy + installation.energy_generated_kwh,
      co2: acc.co2 + installation.co2_saved_tons,
      count: acc.count + 1
    }),
    { waste: 0, energy: 0, co2: 0, count: 0 }
  )

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230ea5e9' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
            Real-Time <span className="gradient-text">Impact Map</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Track bio-kit installations across Africa and see live data from waste-to-energy operations 
            in communities we serve.
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {[
            {
              icon: FaMapMarkerAlt,
              value: totalStats.count,
              label: 'Active Installations',
              color: 'text-blue-500'
            },
            {
              icon: FaRecycle,
              value: `${(totalStats.waste / 1000).toFixed(1)}T`,
              label: 'Waste Processed',
              color: 'text-green-500'
            },
            {
              icon: FaBolt,
              value: `${(totalStats.energy / 1000).toFixed(1)}MWh`,
              label: 'Energy Generated',
              color: 'text-yellow-500'
            },
            {
              icon: FaLeaf,
              value: `${totalStats.co2.toFixed(1)}T`,
              label: 'CO₂ Saved',
              color: 'text-emerald-500'
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
            >
              <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-3 group-hover:scale-110 transition-transform duration-200`} />
              <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 bg-white rounded-xl shadow-lg"
        >
          <div className="flex items-center space-x-4">
            <FaFilter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {kitTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200"
          >
            <FaExpand className="h-4 w-4" />
            <span>Fullscreen</span>
          </button>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className={`relative bg-white rounded-2xl shadow-2xl overflow-hidden ${
            isFullscreen ? 'fixed inset-4 z-50' : 'h-96 lg:h-[500px]'
          }`}
        >
          {isFullscreen && (
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors duration-200"
            >
              <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="loading-dots">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          ) : (
            <InteractiveMap installations={installations} />
          )}
        </motion.div>

        {/* Installation List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {installations.slice(0, 6).map((installation, index) => (
            <motion.div
              key={installation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{installation.name}</h3>
                  <p className="text-sm text-gray-600">{installation.community}, {installation.region}</p>
                </div>
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                  {installation.status}
                </span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">{installation.kit_type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Capacity:</span>
                  <span className="font-medium">{installation.capacity_kwh} kWh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Energy Generated:</span>
                  <span className="font-medium text-green-600">{installation.energy_generated_kwh} kWh</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ImpactMapSection