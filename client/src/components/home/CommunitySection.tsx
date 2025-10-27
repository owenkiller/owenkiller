'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { FaQuoteLeft, FaStar, FaMapMarkerAlt, FaUsers, FaHeart } from 'react-icons/fa'

interface Testimonial {
  id: string
  name: string
  role: string
  location: string
  country: string
  image: string
  quote: string
  rating: number
  impact: {
    energy_saved: number
    waste_reduced: number
    community_size: number
  }
}

const CommunitySection = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Maria Wanjiku',
      role: 'Community Leader',
      location: 'Kibera, Nairobi',
      country: 'Kenya',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      quote: 'Before WasteLight, our community struggled with waste management and expensive electricity. Now we generate our own clean energy from organic waste, and our children study by the light we create ourselves.',
      rating: 5,
      impact: {
        energy_saved: 2400,
        waste_reduced: 850,
        community_size: 120
      }
    },
    {
      id: '2',
      name: 'Joseph Mbugua',
      role: 'Youth Innovation Leader',
      location: 'Kisumu',
      country: 'Kenya',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      quote: 'WasteLight gave me the platform to showcase my bio-gasifier design. Today, it powers 30 households in my neighborhood. This is how we build the future of Africa - one innovation at a time.',
      rating: 5,
      impact: {
        energy_saved: 1800,
        waste_reduced: 640,
        community_size: 85
      }
    },
    {
      id: '3',
      name: 'Grace Achieng',
      role: 'School Principal',
      location: 'Mombasa',
      country: 'Kenya',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      quote: 'Our school now has reliable electricity from food waste generated in our kitchen. Students learn about renewable energy while seeing it work firsthand. It\'s education and sustainability combined.',
      rating: 5,
      impact: {
        energy_saved: 3200,
        waste_reduced: 1200,
        community_size: 350
      }
    }
  ]

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
    <section className="py-20 lg:py-32 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2322c55e' fill-opacity='0.4'%3E%3Cpath d='M30 15a15 15 0 1 1 0 30 15 15 0 0 1 0-30zm0 3a12 12 0 1 0 0 24 12 12 0 0 0 0-24z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
            Community <span className="gradient-text">Voices</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hear from the changemakers and community leaders who are transforming 
            their neighborhoods with sustainable waste-to-energy solutions.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Testimonial Cards */}
          <motion.div variants={itemVariants} className="space-y-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`cursor-pointer transition-all duration-300 ${
                  activeTestimonial === index
                    ? 'opacity-100'
                    : 'opacity-50 hover:opacity-75'
                }`}
                onClick={() => setActiveTestimonial(index)}
              >
                <div className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex-shrink-0">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`h-4 w-4 ${
                              i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{testimonial.role}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <FaMapMarkerAlt className="h-3 w-3 mr-1" />
                      <span>{testimonial.location}, {testimonial.country}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Active Testimonial Details */}
          <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="relative">
              <FaQuoteLeft className="absolute -top-2 -left-2 h-8 w-8 text-primary-200" />
              <blockquote className="text-lg leading-relaxed text-gray-800 mb-6 pl-6">
                "{testimonials[activeTestimonial].quote}"
              </blockquote>
            </div>

            {/* Impact Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {testimonials[activeTestimonial].impact.energy_saved.toLocaleString()}
                </div>
                <div className="text-xs text-gray-600">kWh Saved</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {testimonials[activeTestimonial].impact.waste_reduced.toLocaleString()}
                </div>
                <div className="text-xs text-gray-600">kg Waste Reduced</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {testimonials[activeTestimonial].impact.community_size}
                </div>
                <div className="text-xs text-gray-600">People Impacted</div>
              </div>
            </div>

            {/* Author Info */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-100">
              <div className="flex items-center space-x-4">
                <Image
                  src={testimonials[activeTestimonial].image}
                  alt={testimonials[activeTestimonial].name}
                  width={50}
                  height={50}
                  className="rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonials[activeTestimonial].name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonials[activeTestimonial].role}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-primary-600">
                <FaHeart className="h-4 w-4" />
                <span className="text-sm font-medium">Verified Impact</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Community Stats */}
        <motion.div
          variants={itemVariants}
          className="mt-20 bg-white rounded-3xl p-8 shadow-lg"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-display font-semibold text-gray-900 mb-2">
              Our Growing Community
            </h3>
            <p className="text-gray-600">
              Join thousands of changemakers across Africa making a difference
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: FaUsers, value: '12,500+', label: 'Community Members' },
              { icon: FaMapMarkerAlt, value: '89', label: 'Active Locations' },
              { icon: FaHeart, value: '45,000+', label: 'Lives Impacted' },
              { icon: FaStar, value: '4.9/5', label: 'Community Rating' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
                className="text-center group"
              >
                <div className="mb-4">
                  <stat.icon className="h-8 w-8 text-primary-500 mx-auto group-hover:scale-110 transition-transform duration-200" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CommunitySection