import express from 'express'
import { pool } from '../index'

const router = express.Router()

// Get marketplace products
router.get('/', async (req, res) => {
  try {
    const { category, country, page = 1, limit = 12 } = req.query
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string)
    
    let query = `
      SELECT 
        id, title, description, price, currency, category,
        materials_used, images, stock_quantity, sustainability_score,
        location_country, views_count, created_at
      FROM marketplace_products 
      WHERE status = 'active' AND stock_quantity > 0
    `
    
    const params: any[] = []
    let paramCount = 0

    if (category) {
      paramCount++
      query += ` AND category = $${paramCount}`
      params.push(category)
    }

    if (country) {
      paramCount++
      query += ` AND location_country = $${paramCount}`
      params.push(country)
    }

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
      data: result.rows
    })

  } catch (error) {
    console.error('Error fetching marketplace products:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch marketplace products'
    })
  }
})

export default router