import express from 'express'
import { pool } from '../index'

const router = express.Router()

// Get all bio-kit installations for map
router.get('/installations', async (req, res) => {
  try {
    const { country, region, status = 'active' } = req.query

    let query = `
      SELECT 
        id,
        name,
        location_lat,
        location_lng,
        country,
        region,
        community,
        kit_type,
        capacity_kwh,
        waste_processed_kg,
        energy_generated_kwh,
        co2_saved_tons,
        status,
        installation_date,
        operator_contact,
        images
      FROM biokit_installations 
      WHERE status = $1
    `
    
    const params = [status]
    let paramCount = 1

    if (country) {
      paramCount++
      query += ` AND country = $${paramCount}`
      params.push(country as string)
    }

    if (region) {
      paramCount++
      query += ` AND region = $${paramCount}`
      params.push(region as string)
    }

    query += ` ORDER BY installation_date DESC`

    const result = await pool.query(query, params)

    res.json({
      success: true,
      data: result.rows,
      total: result.rows.length
    })

  } catch (error) {
    console.error('Error fetching installations:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bio-kit installations'
    })
  }
})

// Get impact metrics dashboard data
router.get('/metrics', async (req, res) => {
  try {
    const { period = '30' } = req.query
    const days = parseInt(period as string)

    // Get overall totals
    const totalsQuery = `
      SELECT 
        SUM(waste_processed_kg) as total_waste_processed,
        SUM(energy_generated_kwh) as total_energy_generated,
        SUM(co2_saved_tons) as total_co2_saved,
        COUNT(*) as total_installations
      FROM biokit_installations 
      WHERE status = 'active'
    `
    
    const totalsResult = await pool.query(totalsQuery)
    const totals = totalsResult.rows[0]

    // Get time series data for the chart
    const timeSeriesQuery = `
      SELECT 
        date,
        total_waste_processed_kg,
        total_energy_generated_kwh,
        total_co2_saved_tons,
        active_biokits,
        communities_served
      FROM impact_metrics 
      WHERE date >= CURRENT_DATE - INTERVAL '${days} days'
      ORDER BY date ASC
    `
    
    const timeSeriesResult = await pool.query(timeSeriesQuery)

    // Get latest metrics
    const latestQuery = `
      SELECT * FROM impact_metrics 
      ORDER BY date DESC 
      LIMIT 1
    `
    
    const latestResult = await pool.query(latestQuery)
    const latest = latestResult.rows[0] || {}

    // Get installations by region
    const regionQuery = `
      SELECT 
        region,
        COUNT(*) as count,
        SUM(waste_processed_kg) as waste_processed,
        SUM(energy_generated_kwh) as energy_generated
      FROM biokit_installations 
      WHERE status = 'active'
      GROUP BY region
      ORDER BY count DESC
    `
    
    const regionResult = await pool.query(regionQuery)

    // Get installations by type
    const typeQuery = `
      SELECT 
        kit_type,
        COUNT(*) as count,
        AVG(capacity_kwh) as avg_capacity,
        SUM(energy_generated_kwh) as total_energy
      FROM biokit_installations 
      WHERE status = 'active'
      GROUP BY kit_type
      ORDER BY count DESC
    `
    
    const typeResult = await pool.query(typeQuery)

    res.json({
      success: true,
      data: {
        overview: {
          total_waste_processed: parseFloat(totals.total_waste_processed) || 0,
          total_energy_generated: parseFloat(totals.total_energy_generated) || 0,
          total_co2_saved: parseFloat(totals.total_co2_saved) || 0,
          total_installations: parseInt(totals.total_installations) || 0,
          active_biokits: latest.active_biokits || 0,
          communities_served: latest.communities_served || 0
        },
        timeSeries: timeSeriesResult.rows,
        byRegion: regionResult.rows,
        byType: typeResult.rows
      }
    })

  } catch (error) {
    console.error('Error fetching impact metrics:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch impact metrics'
    })
  }
})

// Get installation details by ID
router.get('/installations/:id', async (req, res) => {
  try {
    const { id } = req.params

    const query = `
      SELECT 
        *
      FROM biokit_installations 
      WHERE id = $1
    `
    
    const result = await pool.query(query, [id])

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Bio-kit installation not found'
      })
    }

    res.json({
      success: true,
      data: result.rows[0]
    })

  } catch (error) {
    console.error('Error fetching installation details:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch installation details'
    })
  }
})

// Update installation metrics (for operators)
router.patch('/installations/:id/metrics', async (req, res) => {
  try {
    const { id } = req.params
    const { waste_processed_kg, energy_generated_kwh, co2_saved_tons } = req.body

    const query = `
      UPDATE biokit_installations 
      SET 
        waste_processed_kg = COALESCE($1, waste_processed_kg),
        energy_generated_kwh = COALESCE($2, energy_generated_kwh),
        co2_saved_tons = COALESCE($3, co2_saved_tons),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $4
      RETURNING *
    `
    
    const result = await pool.query(query, [
      waste_processed_kg,
      energy_generated_kwh,
      co2_saved_tons,
      id
    ])

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Bio-kit installation not found'
      })
    }

    res.json({
      success: true,
      message: 'Installation metrics updated successfully',
      data: result.rows[0]
    })

  } catch (error) {
    console.error('Error updating installation metrics:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update installation metrics'
    })
  }
})

// Get countries with installations
router.get('/countries', async (req, res) => {
  try {
    const query = `
      SELECT 
        country,
        COUNT(*) as installations_count,
        SUM(waste_processed_kg) as total_waste_processed,
        SUM(energy_generated_kwh) as total_energy_generated
      FROM biokit_installations 
      WHERE status = 'active'
      GROUP BY country
      ORDER BY installations_count DESC
    `
    
    const result = await pool.query(query)

    res.json({
      success: true,
      data: result.rows
    })

  } catch (error) {
    console.error('Error fetching countries:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch countries data'
    })
  }
})

export default router