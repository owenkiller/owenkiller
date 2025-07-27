import express from 'express'
import { pool } from '../index'

const router = express.Router()

// Get monthly challenges
router.get('/', async (req, res) => {
  try {
    const { status = 'active' } = req.query
    
    let query = `
      SELECT 
        id, title, description, goal_description, target_metric,
        target_value, unit, start_date, end_date, prize_description,
        participants_count, status, created_at
      FROM monthly_challenges 
    `
    
    if (status !== 'all') {
      query += ` WHERE status = $1`
    }

    query += ` ORDER BY start_date DESC`

    const params = status !== 'all' ? [status] : []
    const result = await pool.query(query, params)

    res.json({
      success: true,
      data: result.rows
    })

  } catch (error) {
    console.error('Error fetching challenges:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch challenges'
    })
  }
})

export default router