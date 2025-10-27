import express from 'express'
import { pool } from '../index'

const router = express.Router()

// Get all blog posts with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const { 
      category, 
      country, 
      page = 1, 
      limit = 10, 
      featured = false,
      search = ''
    } = req.query

    const offset = (parseInt(page as string) - 1) * parseInt(limit as string)
    
    let query = `
      SELECT 
        id,
        title,
        slug,
        excerpt,
        featured_image,
        category,
        tags,
        country,
        region,
        views_count,
        likes_count,
        created_at,
        is_featured,
        (SELECT CONCAT(first_name, ' ', last_name) FROM users WHERE id = author_id) as author_name
      FROM blog_posts 
      WHERE status = 'published'
    `
    
    const params: any[] = []
    let paramCount = 0

    if (category && category !== 'All') {
      paramCount++
      query += ` AND category = $${paramCount}`
      params.push(category)
    }

    if (country) {
      paramCount++
      query += ` AND country = $${paramCount}`
      params.push(country)
    }

    if (featured === 'true') {
      query += ` AND is_featured = true`
    }

    if (search) {
      paramCount++
      query += ` AND (title ILIKE $${paramCount} OR content ILIKE $${paramCount})`
      params.push(`%${search}%`)
    }

    // Get total count for pagination
    const countQuery = query.replace('SELECT id,title,slug,excerpt,featured_image,category,tags,country,region,views_count,likes_count,created_at,is_featured,(SELECT CONCAT(first_name, \' \', last_name) FROM users WHERE id = author_id) as author_name', 'SELECT COUNT(*)')
    const countResult = await pool.query(countQuery, params)
    const totalPosts = parseInt(countResult.rows[0].count)

    // Add ordering and pagination
    query += ` ORDER BY created_at DESC`
    
    paramCount++
    query += ` LIMIT $${paramCount}`
    params.push(parseInt(limit as string))
    
    paramCount++
    query += ` OFFSET $${paramCount}`
    params.push(offset)

    const result = await pool.query(query, params)

    res.json({
      success: true,
      data: result.rows,
      pagination: {
        current_page: parseInt(page as string),
        total_pages: Math.ceil(totalPosts / parseInt(limit as string)),
        total_posts: totalPosts,
        per_page: parseInt(limit as string)
      }
    })

  } catch (error) {
    console.error('Error fetching blog posts:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog posts'
    })
  }
})

// Get single blog post by slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params

    // Update view count
    await pool.query(`
      UPDATE blog_posts 
      SET views_count = views_count + 1 
      WHERE slug = $1 AND status = 'published'
    `, [slug])

    // Get post with author details
    const query = `
      SELECT 
        bp.*,
        u.first_name || ' ' || u.last_name as author_name,
        u.profile_image as author_image,
        u.bio as author_bio
      FROM blog_posts bp
      LEFT JOIN users u ON bp.author_id = u.id
      WHERE bp.slug = $1 AND bp.status = 'published'
    `
    
    const result = await pool.query(query, [slug])

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      })
    }

    // Get related posts
    const relatedQuery = `
      SELECT id, title, slug, excerpt, featured_image, created_at
      FROM blog_posts 
      WHERE category = $1 AND slug != $2 AND status = 'published'
      ORDER BY created_at DESC 
      LIMIT 3
    `
    
    const relatedResult = await pool.query(relatedQuery, [
      result.rows[0].category,
      slug
    ])

    res.json({
      success: true,
      data: {
        post: result.rows[0],
        related_posts: relatedResult.rows
      }
    })

  } catch (error) {
    console.error('Error fetching blog post:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog post'
    })
  }
})

// Get blog categories
router.get('/meta/categories', async (req, res) => {
  try {
    const query = `
      SELECT 
        category,
        COUNT(*) as post_count
      FROM blog_posts 
      WHERE status = 'published'
      GROUP BY category
      ORDER BY post_count DESC
    `
    
    const result = await pool.query(query)

    res.json({
      success: true,
      data: result.rows
    })

  } catch (error) {
    console.error('Error fetching categories:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories'
    })
  }
})

// Get popular tags
router.get('/meta/tags', async (req, res) => {
  try {
    const query = `
      SELECT 
        UNNEST(tags) as tag,
        COUNT(*) as usage_count
      FROM blog_posts 
      WHERE status = 'published' AND tags IS NOT NULL
      GROUP BY tag
      ORDER BY usage_count DESC
      LIMIT 20
    `
    
    const result = await pool.query(query)

    res.json({
      success: true,
      data: result.rows
    })

  } catch (error) {
    console.error('Error fetching tags:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tags'
    })
  }
})

// Like a blog post
router.post('/:id/like', async (req, res) => {
  try {
    const { id } = req.params

    const query = `
      UPDATE blog_posts 
      SET likes_count = likes_count + 1 
      WHERE id = $1 AND status = 'published'
      RETURNING likes_count
    `
    
    const result = await pool.query(query, [id])

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      })
    }

    res.json({
      success: true,
      data: {
        likes_count: result.rows[0].likes_count
      }
    })

  } catch (error) {
    console.error('Error liking blog post:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to like blog post'
    })
  }
})

export default router