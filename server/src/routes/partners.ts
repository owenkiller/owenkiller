import express from 'express'
import { pool } from '../index'

const router = express.Router()

// Get all partners
router.get('/', async (req, res) => {
  try {
    const { type, country, featured } = req.query
    
    let query = `
      SELECT 
        id, name, type, description, website_url, logo_url,
        country, collaboration_areas, funding_provided,
        projects_supported, is_featured, created_at
      FROM partners 
      WHERE status = 'active'
    `
    
    const params: any[] = []
    let paramCount = 0

    if (type) {
      paramCount++
      query += ` AND type = $${paramCount}`
      params.push(type)
    }

    if (country) {
      paramCount++
      query += ` AND country = $${paramCount}`
      params.push(country)
    }

    if (featured === 'true') {
      query += ` AND is_featured = true`
    }

    query += ` ORDER BY is_featured DESC, created_at DESC`

    const result = await pool.query(query, params)

    res.json({
      success: true,
      data: result.rows
    })

  } catch (error) {
    console.error('Error fetching partners:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch partners'
    })
  }
})

export default router