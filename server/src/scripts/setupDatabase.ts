import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'wastelight_db',
  password: process.env.DB_PASSWORD || 'password',
  port: parseInt(process.env.DB_PORT || '5432'),
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
})

const createTables = async () => {
  const client = await pool.connect()
  
  try {
    console.log('🗄️  Creating database tables...')

    // Enable UUID extension
    await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`)

    // Users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        country VARCHAR(100),
        region VARCHAR(100),
        role VARCHAR(50) DEFAULT 'user',
        profile_image TEXT,
        bio TEXT,
        is_verified BOOLEAN DEFAULT false,
        total_donations DECIMAL(10,2) DEFAULT 0,
        total_impact_points INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)

    // Blog posts table
    await client.query(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        content TEXT NOT NULL,
        excerpt TEXT,
        featured_image TEXT,
        author_id UUID REFERENCES users(id) ON DELETE CASCADE,
        category VARCHAR(100),
        tags TEXT[],
        status VARCHAR(20) DEFAULT 'draft',
        is_featured BOOLEAN DEFAULT false,
        views_count INTEGER DEFAULT 0,
        likes_count INTEGER DEFAULT 0,
        country VARCHAR(100),
        region VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)

    // Donations table
    await client.query(`
      CREATE TABLE IF NOT EXISTS donations (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID REFERENCES users(id) ON DELETE SET NULL,
        amount DECIMAL(10,2) NOT NULL,
        currency VARCHAR(10) DEFAULT 'USD',
        purpose VARCHAR(255),
        target_community VARCHAR(255),
        stripe_payment_intent_id VARCHAR(255),
        status VARCHAR(50) DEFAULT 'pending',
        donor_name VARCHAR(255),
        donor_email VARCHAR(255),
        is_anonymous BOOLEAN DEFAULT false,
        bio_kits_funded INTEGER DEFAULT 0,
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)

    // Innovations table
    await client.query(`
      CREATE TABLE IF NOT EXISTS innovations (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        inventor_name VARCHAR(255) NOT NULL,
        inventor_email VARCHAR(255),
        category VARCHAR(100),
        waste_type VARCHAR(100),
        energy_output_kwh DECIMAL(10,2),
        efficiency_percentage DECIMAL(5,2),
        cost_estimate DECIMAL(10,2),
        development_stage VARCHAR(100),
        images TEXT[],
        video_url TEXT,
        location_country VARCHAR(100),
        location_region VARCHAR(100),
        status VARCHAR(50) DEFAULT 'submitted',
        is_featured BOOLEAN DEFAULT false,
        votes_count INTEGER DEFAULT 0,
        views_count INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)

    // Bio-kit installations table
    await client.query(`
      CREATE TABLE IF NOT EXISTS biokit_installations (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        location_lat DECIMAL(10, 8),
        location_lng DECIMAL(11, 8),
        country VARCHAR(100),
        region VARCHAR(100),
        community VARCHAR(255),
        installation_date DATE,
        kit_type VARCHAR(100),
        capacity_kwh DECIMAL(10,2),
        waste_processed_kg DECIMAL(10,2) DEFAULT 0,
        energy_generated_kwh DECIMAL(10,2) DEFAULT 0,
        co2_saved_tons DECIMAL(10,2) DEFAULT 0,
        status VARCHAR(50) DEFAULT 'active',
        operator_contact VARCHAR(255),
        images TEXT[],
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)

    // Marketplace products table
    await client.query(`
      CREATE TABLE IF NOT EXISTS marketplace_products (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        seller_id UUID REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        currency VARCHAR(10) DEFAULT 'USD',
        category VARCHAR(100),
        materials_used TEXT[],
        images TEXT[],
        stock_quantity INTEGER DEFAULT 0,
        is_featured BOOLEAN DEFAULT false,
        sustainability_score INTEGER,
        location_country VARCHAR(100),
        location_region VARCHAR(100),
        status VARCHAR(50) DEFAULT 'active',
        views_count INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)

    // Partners table
    await client.query(`
      CREATE TABLE IF NOT EXISTS partners (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        type VARCHAR(100),
        description TEXT,
        website_url TEXT,
        logo_url TEXT,
        contact_email VARCHAR(255),
        contact_person VARCHAR(255),
        country VARCHAR(100),
        region VARCHAR(100),
        collaboration_areas TEXT[],
        funding_provided DECIMAL(12,2) DEFAULT 0,
        projects_supported INTEGER DEFAULT 0,
        is_featured BOOLEAN DEFAULT false,
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)

    // Education resources table
    await client.query(`
      CREATE TABLE IF NOT EXISTS education_resources (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        title VARCHAR(255) NOT NULL,
        description TEXT,
        content TEXT,
        type VARCHAR(100),
        category VARCHAR(100),
        age_group VARCHAR(100),
        difficulty_level VARCHAR(50),
        duration_minutes INTEGER,
        file_url TEXT,
        video_url TEXT,
        images TEXT[],
        downloads_count INTEGER DEFAULT 0,
        likes_count INTEGER DEFAULT 0,
        created_by UUID REFERENCES users(id) ON DELETE SET NULL,
        is_featured BOOLEAN DEFAULT false,
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)

    // Monthly challenges table
    await client.query(`
      CREATE TABLE IF NOT EXISTS monthly_challenges (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        goal_description TEXT,
        target_metric VARCHAR(100),
        target_value DECIMAL(10,2),
        unit VARCHAR(50),
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        prize_description TEXT,
        images TEXT[],
        status VARCHAR(50) DEFAULT 'upcoming',
        participants_count INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)

    // Challenge participations table
    await client.query(`
      CREATE TABLE IF NOT EXISTS challenge_participations (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        challenge_id UUID REFERENCES monthly_challenges(id) ON DELETE CASCADE,
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        progress_value DECIMAL(10,2) DEFAULT 0,
        evidence_images TEXT[],
        evidence_description TEXT,
        submitted_at TIMESTAMP,
        verified BOOLEAN DEFAULT false,
        rank_position INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(challenge_id, user_id)
      );
    `)

    // Impact tracking table
    await client.query(`
      CREATE TABLE IF NOT EXISTS impact_metrics (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        date DATE NOT NULL,
        total_waste_processed_kg DECIMAL(12,2) DEFAULT 0,
        total_energy_generated_kwh DECIMAL(12,2) DEFAULT 0,
        total_co2_saved_tons DECIMAL(10,2) DEFAULT 0,
        active_biokits INTEGER DEFAULT 0,
        communities_served INTEGER DEFAULT 0,
        total_donations DECIMAL(12,2) DEFAULT 0,
        registered_users INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(date)
      );
    `)

    // Create indexes for better performance
    await client.query(`CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);`)
    await client.query(`CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);`)
    await client.query(`CREATE INDEX IF NOT EXISTS idx_blog_posts_country ON blog_posts(country);`)
    await client.query(`CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(status);`)
    await client.query(`CREATE INDEX IF NOT EXISTS idx_innovations_status ON innovations(status);`)
    await client.query(`CREATE INDEX IF NOT EXISTS idx_biokit_installations_status ON biokit_installations(status);`)
    await client.query(`CREATE INDEX IF NOT EXISTS idx_marketplace_products_status ON marketplace_products(status);`)
    await client.query(`CREATE INDEX IF NOT EXISTS idx_impact_metrics_date ON impact_metrics(date);`)

    console.log('✅ All tables created successfully!')

    // Insert sample data
    await insertSampleData(client)

  } catch (error) {
    console.error('❌ Error creating tables:', error)
    throw error
  } finally {
    client.release()
  }
}

const insertSampleData = async (client: any) => {
  console.log('📊 Inserting sample data...')

  try {
    // Insert sample user
    await client.query(`
      INSERT INTO users (email, password_hash, first_name, last_name, country, region, role)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (email) DO NOTHING
    `, [
      'admin@wastelight.africa',
      '$2b$10$example_hash_here', // In real app, properly hash password
      'System',
      'Administrator',
      'Kenya',
      'Nairobi',
      'admin'
    ])

    // Insert sample blog posts
    const blogPosts = [
      {
        title: 'Transforming Banana Peels into Clean Energy in Rural Kenya',
        slug: 'banana-peels-clean-energy-rural-kenya',
        content: 'A comprehensive look at how rural communities are using organic waste to generate electricity...',
        excerpt: 'Rural communities are transforming agricultural waste into sustainable energy solutions.',
        category: 'Success Stories',
        tags: ['kenya', 'biogas', 'rural-energy'],
        country: 'Kenya',
        region: 'Central Kenya'
      },
      {
        title: 'Youth Innovation: Solar-Powered Waste Digesters',
        slug: 'youth-innovation-solar-waste-digesters',
        content: 'Young innovators in Nairobi are combining solar energy with waste processing...',
        excerpt: 'Students are developing innovative solutions combining solar power with waste management.',
        category: 'Innovation',
        tags: ['youth', 'solar', 'innovation'],
        country: 'Kenya',
        region: 'Nairobi'
      }
    ]

    for (const post of blogPosts) {
      await client.query(`
        INSERT INTO blog_posts (title, slug, content, excerpt, category, tags, country, region, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (slug) DO NOTHING
      `, [
        post.title, post.slug, post.content, post.excerpt,
        post.category, post.tags, post.country, post.region, 'published'
      ])
    }

    // Insert sample bio-kit installations
    const installations = [
      {
        name: 'Kibera Community Center',
        lat: -1.3133,
        lng: 36.7831,
        country: 'Kenya',
        region: 'Nairobi',
        community: 'Kibera',
        kit_type: 'Bio-Gas Digester',
        capacity: 25.5
      },
      {
        name: 'Kisumu Waste-to-Energy Hub',
        lat: -0.0917,
        lng: 34.7680,
        country: 'Kenya',
        region: 'Kisumu',
        community: 'Kisumu Central',
        kit_type: 'Pyrolysis Unit',
        capacity: 50.0
      }
    ]

    for (const installation of installations) {
      await client.query(`
        INSERT INTO biokit_installations (name, location_lat, location_lng, country, region, community, kit_type, capacity_kwh, installation_date, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `, [
        installation.name, installation.lat, installation.lng,
        installation.country, installation.region, installation.community,
        installation.kit_type, installation.capacity, new Date(), 'active'
      ])
    }

    // Insert sample impact metrics
    await client.query(`
      INSERT INTO impact_metrics (date, total_waste_processed_kg, total_energy_generated_kwh, total_co2_saved_tons, active_biokits, communities_served)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (date) DO NOTHING
    `, [
      new Date().toISOString().split('T')[0],
      15420.50,
      28750.75,
      847.25,
      89,
      63
    ])

    console.log('✅ Sample data inserted successfully!')

  } catch (error) {
    console.error('❌ Error inserting sample data:', error)
  }
}

const main = async () => {
  try {
    await createTables()
    console.log('🎉 Database setup completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Database setup failed:', error)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  main()
}

export { createTables }