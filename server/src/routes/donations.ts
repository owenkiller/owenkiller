import express from 'express'
import { pool } from '../index'

const router = express.Router()

// Get all donations with filtering
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      purpose,
      target_community 
    } = req.query

    const offset = (parseInt(page as string) - 1) * parseInt(limit as string)
    
    let query = `
      SELECT 
        id,
        amount,
        currency,
        purpose,
        target_community,
        donor_name,
        donor_email,
        is_anonymous,
        bio_kits_funded,
        message,
        status,
        created_at
      FROM donations 
      WHERE status = 'completed'
    `
    
    const params: any[] = []
    let paramCount = 0

    if (purpose) {
      paramCount++
      query += ` AND purpose = $${paramCount}`
      params.push(purpose)
    }

    if (target_community) {
      paramCount++
      query += ` AND target_community = $${paramCount}`
      params.push(target_community)
    }

    // Get total count
    const countQuery = query.replace('SELECT id,amount,currency,purpose,target_community,donor_name,donor_email,is_anonymous,bio_kits_funded,message,status,created_at', 'SELECT COUNT(*)')
    const countResult = await pool.query(countQuery, params)
    const totalDonations = parseInt(countResult.rows[0].count)

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
        total_pages: Math.ceil(totalDonations / parseInt(limit as string)),
        total_donations: totalDonations,
        per_page: parseInt(limit as string)
      }
    })

  } catch (error) {
    console.error('Error fetching donations:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch donations'
    })
  }
})

// Get donation statistics
router.get('/stats', async (req, res) => {
  try {
    const query = `
      SELECT 
        COUNT(*) as total_donations,
        SUM(amount) as total_amount,
        AVG(amount) as average_amount,
        SUM(bio_kits_funded) as total_bio_kits_funded
      FROM donations 
      WHERE status = 'completed'
    `
    
    const result = await pool.query(query)
    const stats = result.rows[0]

    // Get donations by month for the last 12 months
    const monthlyQuery = `
      SELECT 
        DATE_TRUNC('month', created_at) as month,
        COUNT(*) as donation_count,
        SUM(amount) as total_amount
      FROM donations 
      WHERE status = 'completed' 
        AND created_at >= CURRENT_DATE - INTERVAL '12 months'
      GROUP BY month
      ORDER BY month DESC
    `
    
    const monthlyResult = await pool.query(monthlyQuery)

    res.json({
      success: true,
      data: {
        overview: {
          total_donations: parseInt(stats.total_donations) || 0,
          total_amount: parseFloat(stats.total_amount) || 0,
          average_amount: parseFloat(stats.average_amount) || 0,
          total_bio_kits_funded: parseInt(stats.total_bio_kits_funded) || 0
        },
        monthly_trends: monthlyResult.rows
      }
    })

  } catch (error) {
    console.error('Error fetching donation stats:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch donation statistics'
    })
  }
})

// Create donation intent
router.post('/create-intent', async (req, res) => {
  try {
    const {
      amount,
      currency = 'USD',
      purpose,
      target_community,
      donor_name,
      donor_email,
      is_anonymous = false,
      message
    } = req.body

    // Calculate bio-kits that can be funded (assuming $100 per kit)
    const bio_kits_funded = Math.floor(amount / 100)

    // Create donation record
    const result = await pool.query(`
      INSERT INTO donations (
        amount, currency, purpose, target_community, donor_name, 
        donor_email, is_anonymous, bio_kits_funded, message, status
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id
    `, [
      amount, currency, purpose, target_community, donor_name,
      donor_email, is_anonymous, bio_kits_funded, message, 'pending'
    ])

    const donationId = result.rows[0].id

    // In a real implementation, create Stripe payment intent here
    const mockPaymentIntent = {
      id: `pi_mock_${donationId}`,
      client_secret: `pi_mock_${donationId}_secret`,
      amount: amount * 100, // Stripe expects cents
      currency: currency.toLowerCase()
    }

    res.status(201).json({
      success: true,
      data: {
        donation_id: donationId,
        payment_intent: mockPaymentIntent,
        bio_kits_funded
      }
    })

  } catch (error) {
    console.error('Error creating donation intent:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create donation intent'
    })
  }
})

// Confirm donation payment
router.post('/:id/confirm', async (req, res) => {
  try {
    const { id } = req.params
    const { payment_intent_id } = req.body

    // Update donation status
    const result = await pool.query(`
      UPDATE donations 
      SET 
        status = 'completed',
        stripe_payment_intent_id = $1
      WHERE id = $2
      RETURNING *
    `, [payment_intent_id, id])

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found'
      })
    }

    const donation = result.rows[0]

    // In a real implementation, you might:
    // - Send confirmation email
    // - Update user's total donation amount
    // - Trigger bio-kit deployment process

    res.json({
      success: true,
      message: 'Donation confirmed successfully',
      data: donation
    })

  } catch (error) {
    console.error('Error confirming donation:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to confirm donation'
    })
  }
})

export default router