import express from 'express'
import { pool } from '../index'

const router = express.Router()

// Get all innovations with filtering
router.get('/', async (req, res) => {
  try {
    const { 
      category, 
      country, 
      page = 1, 
      limit = 10,
      filter = 'all' // featured, recent, popular
    } = req.query

    const offset = (parseInt(page as string) - 1) * parseInt(limit as string)
    
    let query = `
      SELECT 
        id, title, description, inventor_name, category, waste_type,
        energy_output_kwh, efficiency_percentage, development_stage,
        images, location_country, is_featured, votes_count, views_count, created_at
      FROM innovations 
      WHERE status = 'approved'
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

    if (filter === 'featured') {
      query += ` AND is_featured = true`
    }

    // Add ordering based on filter
    if (filter === 'recent') {
      query += ` ORDER BY created_at DESC`
    } else if (filter === 'popular') {
      query += ` ORDER BY votes_count DESC`
    } else {
      query += ` ORDER BY created_at DESC`
    }
    
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
    console.error('Error fetching innovations:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch innovations'
    })
  }
})

// Submit new innovation
router.post('/', async (req, res) => {
  try {
    const {
      title,
      description,
      inventor_name,
      inventor_email,
      category,
      waste_type,
      energy_output_kwh,
      efficiency_percentage,
      development_stage,
      location_country
    } = req.body

    const result = await pool.query(`
      INSERT INTO innovations (
        title, description, inventor_name, inventor_email, category,
        waste_type, energy_output_kwh, efficiency_percentage, 
        development_stage, location_country, status
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING id
    `, [
      title, description, inventor_name, inventor_email, category,
      waste_type, energy_output_kwh, efficiency_percentage,
      development_stage, location_country, 'submitted'
    ])

    res.status(201).json({
      success: true,
      message: 'Innovation submitted successfully',
      data: { id: result.rows[0].id }
    })

  } catch (error) {
    console.error('Error submitting innovation:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to submit innovation'
    })
  }
})

export default router