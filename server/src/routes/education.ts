import express from 'express'
import { pool } from '../index'

const router = express.Router()

// Get education resources
router.get('/', async (req, res) => {
  try {
    const { type, category, age_group, page = 1, limit = 10 } = req.query
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string)
    
    let query = `
      SELECT 
        id, title, description, type, category, age_group,
        difficulty_level, duration_minutes, file_url, video_url,
        downloads_count, likes_count, is_featured, created_at
      FROM education_resources 
      WHERE status = 'active'
    `
    
    const params: any[] = []
    let paramCount = 0

    if (type) {
      paramCount++
      query += ` AND type = $${paramCount}`
      params.push(type)
    }

    if (category) {
      paramCount++
      query += ` AND category = $${paramCount}`
      params.push(category)
    }

    if (age_group) {
      paramCount++
      query += ` AND age_group = $${paramCount}`
      params.push(age_group)
    }

    query += ` ORDER BY is_featured DESC, created_at DESC`
    
    paramCount++
    query += ` LIMIT $${paramCount}`
    params.push(parseInt(limit as string))
    
    paramCount++
    query += ` OFFSET $${paramCount}`
    params.push(offset)

    const result = await pool.query(query, params)

    res.json({
      success: true,
      data: result.rows
    })

  } catch (error) {
    console.error('Error fetching education resources:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch education resources'
    })
  }
})

export default router