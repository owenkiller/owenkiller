'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'
import { 
  FaClock, 
  FaEye, 
  FaThumbsUp,
  FaArrowRight,
  FaGlobe,
  FaUser,
  FaTags
} from 'react-icons/fa'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  featured_image: string
  author_name: string
  category: string
  tags: string[]
  views_count: number
  likes_count: number
  country: string
  region: string
  created_at: string
  is_featured: boolean
}

const NewsSection = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [isLoading, setIsLoading] = useState(true)

  const categories = ['All', 'Success Stories', 'Innovation', 'Policy', 'Research', 'Community']

  useEffect(() => {
    fetchBlogPosts()
  }, [selectedCategory])

  const fetchBlogPosts = async () => {
    try {
      setIsLoading(true)
      // In real app, this would be an API call
      // const response = await fetch(`/api/blog?category=${selectedCategory}`)
      // const data = await response.json()
      
      // Mock data for demo
      const mockPosts: BlogPost[] = [
        {
          id: '1',
          title: 'How Banana Peels Are Lighting Up Rural Kenya',
          slug: 'banana-peels-lighting-rural-kenya',
          excerpt: 'A revolutionary bio-gas project in Central Kenya is transforming agricultural waste into sustainable electricity, providing power to over 200 households.',
          featured_image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format&fit=crop',
          author_name: 'Sarah Wanjiru',
          category: 'Success Stories',
          tags: ['biogas', 'rural-energy', 'kenya'],
          views_count: 2840,
          likes_count: 156,
          country: 'Kenya',
          region: 'Central Kenya',
          created_at: '2024-01-15T10:30:00Z',
          is_featured: true
        },
        {
          id: '2',
          title: 'Youth-Led Innovation: Smart Waste Digesters Take Off',
          slug: 'youth-led-innovation-smart-waste-digesters',
          excerpt: 'Students from the University of Nairobi have developed IoT-enabled waste digesters that optimize gas production and provide real-time monitoring.',
          featured_image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&auto=format&fit=crop',
          author_name: 'James Kiprotich',
          category: 'Innovation',
          tags: ['youth', 'IoT', 'smart-technology'],
          views_count: 1920,
          likes_count: 89,
          country: 'Kenya',
          region: 'Nairobi',
          created_at: '2024-01-12T14:20:00Z',
          is_featured: false
        },
        {
          id: '3',
          title: 'Policy Update: New Renewable Energy Incentives for Africa',
          slug: 'policy-update-renewable-energy-incentives-africa',
          excerpt: 'African governments are introducing new tax incentives and grants for community-led renewable energy projects, boosting waste-to-energy initiatives.',
          featured_image: 'https://images.unsplash.com/photo-1551818255-e6e10975cd17?w=600&auto=format&fit=crop',
          author_name: 'Dr. Mary Odhiambo',
          category: 'Policy',
          tags: ['policy', 'government', 'incentives'],
          views_count: 1450,
          likes_count: 67,
          country: 'Multi-Country',
          region: 'Africa',
          created_at: '2024-01-10T09:15:00Z',
          is_featured: false
        },
        {
          id: '4',
          title: 'Research Breakthrough: 40% More Efficient Bio-Digesters',
          slug: 'research-breakthrough-efficient-bio-digesters',
          excerpt: 'New research from Makerere University shows how optimized bacterial cultures can increase biogas production efficiency by up to 40%.',
          featured_image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&auto=format&fit=crop',
          author_name: 'Prof. Robert Mukasa',
          category: 'Research',
          tags: ['research', 'efficiency', 'biogas'],
          views_count: 1180,
          likes_count: 45,
          country: 'Uganda',
          region: 'Kampala',
          created_at: '2024-01-08T16:45:00Z',
          is_featured: true
        }
      ]

      setBlogPosts(mockPosts)
    } catch (error) {
      console.error('Error fetching blog posts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
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
    <section className="py-20 lg:py-32 bg-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230ea5e9' fill-opacity='0.4'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0 5.5 4.5 10 10 10s10-4.5 10-10-4.5-10-10-10-10 4.5-10 10z'/%3E%3C/g%3E%3C/svg%3E")`,
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
            Climate <span className="gradient-text">News Hub</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stay informed with the latest updates on waste-to-energy innovations, 
            community success stories, and climate action across Africa.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:text-primary-600 hover:bg-primary-50 shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Blog Posts Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-gray-200 rounded-2xl h-80 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Featured Post */}
            {blogPosts.filter(post => post.is_featured).slice(0, 1).map((post) => (
              <motion.div
                key={post.id}
                variants={itemVariants}
                className="lg:col-span-2"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    <div className="relative h-64 lg:h-80">
                      <Image
                        src={post.featured_image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      
                      {/* Featured Badge */}
                      <div className="absolute top-6 left-6">
                        <span className="px-3 py-1 text-sm font-semibold bg-yellow-500 text-white rounded-full">
                          Featured
                        </span>
                      </div>

                      {/* Content Overlay */}
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center space-x-4 mb-3">
                          <span className="px-2 py-1 text-xs bg-white/20 backdrop-blur-sm text-white rounded-full">
                            {post.category}
                          </span>
                          <div className="flex items-center text-white/80 text-sm">
                            <FaGlobe className="h-3 w-3 mr-1" />
                            <span>{post.region}</span>
                          </div>
                        </div>
                        
                        <h3 className="text-2xl lg:text-3xl font-display font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors duration-200">
                          {post.title}
                        </h3>
                        
                        <p className="text-white/90 text-sm lg:text-base mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-white/80 text-sm">
                            <div className="flex items-center space-x-1">
                              <FaUser className="h-3 w-3" />
                              <span>{post.author_name}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <FaClock className="h-3 w-3" />
                              <span>{formatDate(post.created_at)}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-white/80 text-sm">
                            <div className="flex items-center space-x-1">
                              <FaEye className="h-3 w-3" />
                              <span>{post.views_count.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <FaThumbsUp className="h-3 w-3" />
                              <span>{post.likes_count}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* Regular Posts */}
            {blogPosts.filter(post => !post.is_featured).slice(0, 4).map((post) => (
              <motion.div
                key={post.id}
                variants={itemVariants}
                className="group"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                    <div className="relative h-48">
                      <Image
                        src={post.featured_image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-2 py-1 text-xs font-semibold bg-primary-500 text-white rounded-full">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center space-x-4 mb-3 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <FaUser className="h-3 w-3" />
                          <span>{post.author_name}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FaClock className="h-3 w-3" />
                          <span>{formatDate(post.created_at)}</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-display font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-gray-500 text-sm">
                          <div className="flex items-center space-x-1">
                            <FaEye className="h-3 w-3" />
                            <span>{post.views_count.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FaThumbsUp className="h-3 w-3" />
                            <span>{post.likes_count}</span>
                          </div>
                        </div>

                        <div className="flex items-center text-primary-600 font-medium text-sm group">
                          <span>Read More</span>
                          <FaArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
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
            href="/blog"
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary-500 to-green-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-primary-600 hover:to-green-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <span>Explore All News</span>
            <FaArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default NewsSection