import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { pool } from '../index'

const router = express.Router()

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { email, password, first_name, last_name, country, region } = req.body

    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    )

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      })
    }

    // Hash password
    const saltRounds = 10
    const password_hash = await bcrypt.hash(password, saltRounds)

    // Create user
    const result = await pool.query(`
      INSERT INTO users (email, password_hash, first_name, last_name, country, region)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, email, first_name, last_name, country, region, created_at
    `, [email, password_hash, first_name, last_name, country, region])

    const user = result.rows[0]

    // Generate JWT token
    const token = jwt.sign(
      { user_id: user.id, email: user.email },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    )

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user,
        token
      }
    })

  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to register user'
    })
  }
})

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user
    const result = await pool.query(`
      SELECT id, email, password_hash, first_name, last_name, country, region, role, is_verified
      FROM users 
      WHERE email = $1
    `, [email])

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    const user = result.rows[0]

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password_hash)
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    // Generate JWT token
    const token = jwt.sign(
      { user_id: user.id, email: user.email },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    )

    // Remove password from response
    delete user.password_hash

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user,
        token
      }
    })

  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to login'
    })
  }
})

// Get current user profile
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret') as any
    
    const result = await pool.query(`
      SELECT id, email, first_name, last_name, country, region, role, profile_image, bio, 
             total_donations, total_impact_points, is_verified, created_at
      FROM users 
      WHERE id = $1
    `, [decoded.user_id])

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    res.json({
      success: true,
      data: result.rows[0]
    })

  } catch (error) {
    console.error('Get profile error:', error)
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    })
  }
})

export default router