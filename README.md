# WasteLight Africa 🌍♻️⚡

**Fueling Communities from What We Throw Away**

WasteLight Africa is a comprehensive waste-to-energy innovation platform that connects communities, innovators, and partners across Africa to build sustainable energy solutions from waste materials.

## 🌟 Features

### Core Platform
- **Climate News Hub** - Local climate impact reports and citizen journalism
- **Innovation Lab** - Showcase prototypes, hackathon winners, and breakthrough technologies
- **Impact Map** - Interactive map with real-time bio-kit installations and energy data
- **Smart Donations** - Fund bio-kits with transparent impact tracking
- **Eco-Education** - Learning resources and classroom materials
- **Marketplace** - Buy and sell upcycled products from local entrepreneurs
- **Partner Network** - Collaboration portal for NGOs, governments, and businesses
- **Monthly Challenges** - Community competitions and leaderboards

### Technology Stack

#### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Leaflet** - Interactive maps
- **Chart.js** - Data visualization
- **Stripe** - Payment processing

#### Backend
- **Node.js & Express** - Server runtime and framework
- **PostgreSQL** - Primary database
- **TypeScript** - Type-safe backend development
- **JWT** - Authentication
- **Cloudinary** - Image and file storage
- **Nodemailer** - Email notifications

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL 12+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/wastelight-africa.git
   cd wastelight-africa
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Setup environment variables**
   ```bash
   # Copy environment files
   cp server/.env.example server/.env
   cp client/.env.local.example client/.env.local
   
   # Update with your actual values
   nano server/.env
   nano client/.env.local
   ```

4. **Setup database**
   ```bash
   # Create PostgreSQL database
   createdb wastelight_db
   
   # Run database setup
   npm run setup:db
   ```

5. **Start development servers**
   ```bash
   npm run dev
   ```

   This starts both:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📊 Database Schema

### Core Tables
- `users` - User accounts and profiles
- `blog_posts` - Climate news and articles
- `donations` - Donation tracking and impact
- `innovations` - Submitted innovations and prototypes
- `biokit_installations` - Bio-kit locations and metrics
- `marketplace_products` - Marketplace items
- `partners` - Partner organizations
- `education_resources` - Learning materials
- `monthly_challenges` - Community challenges
- `impact_metrics` - Aggregated impact data

## 🌍 Impact Tracking

The platform tracks real-time impact metrics:
- **Waste Processed** - Total kilograms of waste converted
- **Energy Generated** - Total kWh of clean energy produced
- **CO₂ Saved** - Emissions prevented through waste diversion
- **Communities Served** - Number of communities with active bio-kits
- **Bio-kits Deployed** - Active waste-to-energy installations

## 🔗 API Endpoints

### Blog Posts
- `GET /api/blog` - Get blog posts with filtering
- `GET /api/blog/:slug` - Get single post by slug
- `POST /api/blog/:id/like` - Like a blog post

### Impact Data
- `GET /api/impact/installations` - Get bio-kit installations
- `GET /api/impact/metrics` - Get impact dashboard data
- `PATCH /api/impact/installations/:id/metrics` - Update metrics

### Innovations
- `GET /api/innovations` - Get innovations with filtering
- `POST /api/innovations` - Submit new innovation
- `POST /api/innovations/:id/vote` - Vote for innovation

## 🎨 Design System

### Colors
- **Primary Blue**: `#0ea5e9` - Technology and progress
- **Earth Tones**: `#bfa094` - Natural and grounded
- **Green**: `#22c55e` - Sustainability and growth
- **Accent Orange**: `#ff6b35` - Energy and action

### Typography
- **Display Font**: Poppins - Headers and brand elements
- **Body Font**: Inter - Content and UI text

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd client
npm run build
vercel --prod
```

### Backend (Railway/Heroku)
```bash
cd server
npm run build
# Deploy to your preferred platform
```

### Database (PostgreSQL)
- Set up managed PostgreSQL (Railway, Supabase, etc.)
- Run migrations: `npm run migrate`

## 🤝 Contributing

We welcome contributions from developers, designers, and sustainability advocates!

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- TypeScript for type safety
- ESLint + Prettier for code formatting
- Conventional commits for clear history
- Component documentation with Storybook

## 📱 Mobile App

A React Native mobile app is planned for:
- Real-time bio-kit monitoring
- Community challenge participation
- Offline education content
- Push notifications for impact updates

## 🌐 Localization

Planned language support:
- English (primary)
- Swahili
- French
- Arabic
- Amharic

## 📈 Roadmap

### Phase 1 (Q1 2024) ✅
- Core platform launch
- Bio-kit tracking system
- Community features
- Payment integration

### Phase 2 (Q2 2024)
- Mobile application
- Advanced analytics dashboard
- Blockchain carbon credits
- AI-powered matching

### Phase 3 (Q3 2024)
- Multi-country expansion
- Government partnerships
- Educational curriculum
- Research collaboration

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- African Development Bank - Funding and support
- Kenya Climate Innovation Center - Technical mentorship
- Local communities across Africa - Real-world testing and feedback
- Open source contributors - Building together

## 📞 Contact

- **Website**: https://wastelight.africa
- **Email**: hello@wastelight.africa
- **Twitter**: @wastelightafrica
- **LinkedIn**: WasteLight Africa

---

**Built with ❤️ for sustainable communities across Africa**
