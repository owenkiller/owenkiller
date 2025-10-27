'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'
import { 
  FaHandshake, 
  FaGlobe, 
  FaDollarSign,
  FaUsers,
  FaArrowRight,
  FaBullseye
} from 'react-icons/fa'

interface Partner {
  id: string
  name: string
  type: string
  logo_url: string
  description: string
  website_url: string
  country: string
  collaboration_areas: string[]
  funding_provided: number
  projects_supported: number
  is_featured: boolean
}

const PartnersSection = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  const partners: Partner[] = [
    {
      id: '1',
      name: 'African Development Bank',
      type: 'Development Bank',
      logo_url: 'https://via.placeholder.com/120x80/0ea5e9/white?text=ADB',
      description: 'Supporting large-scale renewable energy infrastructure across Africa',
      website_url: 'https://afdb.org',
      country: 'Multi-Country',
      collaboration_areas: ['Funding', 'Infrastructure', 'Policy'],
      funding_provided: 2500000,
      projects_supported: 15,
      is_featured: true
    },
    {
      id: '2',
      name: 'Kenya Climate Innovation Center',
      type: 'Innovation Hub',
      logo_url: 'https://via.placeholder.com/120x80/22c55e/white?text=KCIC',
      description: 'Accelerating clean technology innovations and entrepreneurship',
      website_url: 'https://kenyacic.org',
      country: 'Kenya',
      collaboration_areas: ['Innovation', 'Mentorship', 'Incubation'],
      funding_provided: 450000,
      projects_supported: 8,
      is_featured: true
    },
    {
      id: '3',
      name: 'UN Environment Programme',
      type: 'International Organization',
      logo_url: 'https://via.placeholder.com/120x80/3b82f6/white?text=UNEP',
      description: 'Global environmental leadership and sustainable development partnerships',
      website_url: 'https://unep.org',
      country: 'Global',
      collaboration_areas: ['Policy', 'Research', 'Advocacy'],
      funding_provided: 750000,
      projects_supported: 12,
      is_featured: true
    },
    {
      id: '4',
      name: 'Mastercard Foundation',
      type: 'Foundation',
      logo_url: 'https://via.placeholder.com/120x80/f59e0b/white?text=MCF',
      description: 'Empowering young people to lead change in their communities',
      website_url: 'https://mastercardfdn.org',
      country: 'Multi-Country',
      collaboration_areas: ['Youth Development', 'Funding', 'Skills Training'],
      funding_provided: 1200000,
      projects_supported: 20,
      is_featured: false
    },
    {
      id: '5',
      name: 'GIZ Germany',
      type: 'Development Agency',
      logo_url: 'https://via.placeholder.com/120x80/8b5cf6/white?text=GIZ',
      description: 'International cooperation for sustainable development',
      website_url: 'https://giz.de',
      country: 'Germany',
      collaboration_areas: ['Technical Assistance', 'Capacity Building'],
      funding_provided: 980000,
      projects_supported: 18,
      is_featured: false
    },
    {
      id: '6',
      name: 'Safaricom Foundation',
      type: 'Corporate Foundation',
      logo_url: 'https://via.placeholder.com/120x80/dc2626/white?text=SF',
      description: 'Transforming lives through sustainable community programs',
      website_url: 'https://safaricomfoundation.org',
      country: 'Kenya',
      collaboration_areas: ['Technology', 'Community Development'],
      funding_provided: 320000,
      projects_supported: 6,
      is_featured: false
    }
  ]

  const partnerTypes = [
    { type: 'Development Bank', count: 3, icon: FaBullseye },
    { type: 'Innovation Hub', count: 8, icon: FaUsers },
    { type: 'Foundation', count: 12, icon: FaHandshake },
    { type: 'Government Agency', count: 15, icon: FaGlobe }
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
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f59e0b' fill-opacity='0.4'%3E%3Cpath d='M30 30m-15 0a15 15 0 1 1 30 0a15 15 0 1 1-30 0'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
            Our <span className="gradient-text">Partners</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Together with leading organizations, we're building a sustainable future 
            for Africa through innovative waste-to-energy solutions.
          </p>
        </motion.div>

        {/* Partner Type Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {partnerTypes.map((type, index) => (
            <motion.div
              key={type.type}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <type.icon className="h-8 w-8 text-primary-500 mx-auto mb-3 group-hover:scale-110 transition-transform duration-200" />
              <div className="text-2xl font-bold text-gray-900 mb-1">{type.count}</div>
              <div className="text-gray-600 text-sm font-medium">{type.type}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Partners */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
              Featured Partners
            </h3>
            <p className="text-gray-600">Leading the charge in sustainable development</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.filter(partner => partner.is_featured).map((partner) => (
              <motion.div
                key={partner.id}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="p-8">
                  {/* Logo */}
                  <div className="flex justify-center mb-6">
                    <div className="w-24 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                      <Image
                        src={partner.logo_url}
                        alt={partner.name}
                        width={96}
                        height={64}
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h4 className="text-xl font-display font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                      {partner.name}
                    </h4>
                    <p className="text-sm text-primary-600 font-medium mb-3">{partner.type}</p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {partner.description}
                    </p>
                  </div>

                  {/* Collaboration Areas */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {partner.collaboration_areas.slice(0, 3).map((area) => (
                        <span
                          key={area}
                          className="px-3 py-1 text-xs bg-primary-100 text-primary-700 rounded-full"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-xl font-bold text-green-600">
                        ${(partner.funding_provided / 1000000).toFixed(1)}M
                      </div>
                      <div className="text-xs text-gray-600">Funding Provided</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-blue-600">
                        {partner.projects_supported}
                      </div>
                      <div className="text-xs text-gray-600">Projects Supported</div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="text-center">
                    <Link
                      href={partner.website_url}
                      target="_blank"
                      className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium text-sm group"
                    >
                      <span>Learn More</span>
                      <FaArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* All Partners Logo Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
              Trusted by Leading Organizations
            </h3>
            <p className="text-gray-600">Join our growing network of partners</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {partners.map((partner) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: Math.random() * 0.3 }}
                className="group cursor-pointer"
              >
                <div className="w-20 h-14 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden group-hover:bg-gray-200 transition-colors duration-200">
                  <Image
                    src={partner.logo_url}
                    alt={partner.name}
                    width={80}
                    height={56}
                    className="object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-200"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Partnership CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-primary-500 to-green-500 rounded-3xl p-8 lg:p-12 text-center text-white"
        >
          <FaHandshake className="h-12 w-12 mx-auto mb-6 text-white/90" />
          <h3 className="text-3xl lg:text-4xl font-display font-bold mb-4">
            Become a Partner
          </h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join us in creating sustainable solutions for Africa's energy and waste challenges. 
            Together, we can amplify our impact and reach more communities.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              href="/partners/apply"
              className="bg-white text-primary-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Apply for Partnership
            </Link>
            <Link
              href="/partners"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-primary-600 transition-all duration-200"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default PartnersSection