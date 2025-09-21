# Prime Cuts Butchery - E-Commerce Website

A modern, full-featured e-commerce website for a premium butchery, built with Next.js 14, TypeScript, and Tailwind CSS.

## 🥩 Features

### Core Functionality
- **Product Catalog**: Browse and filter premium meat products by category, price, and attributes
- **Product Details**: Detailed product pages with nutrition info, cooking tips, and storage instructions
- **Shopping Cart**: Add/remove items, adjust quantities, and view cart summary
- **Checkout Process**: Multi-step checkout with shipping and payment forms
- **Search**: Real-time product search functionality
- **Responsive Design**: Mobile-first design that works on all devices

### Product Categories
- Premium Beef (Grass-fed, Organic options)
- Fresh Pork (Heritage breeds)
- Free-Range Chicken
- Lamb & Mutton
- Fresh Seafood
- Artisan Sausages

### User Experience
- **Modern UI**: Clean, professional design with smooth animations
- **Product Filtering**: Filter by category, price range, organic, grass-fed, etc.
- **Cart Management**: Persistent cart with real-time updates
- **Mobile Responsive**: Optimized for mobile, tablet, and desktop
- **Loading States**: Smooth loading animations and transitions

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context API
- **Form Handling**: Custom validation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd butchery-ecommerce
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── products/          # Product pages
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Checkout process
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   ├── Hero.tsx           # Homepage hero section
│   ├── ProductCard.tsx    # Product display card
│   ├── Categories.tsx     # Category showcase
│   ├── FeaturedProducts.tsx
│   └── CartSidebar.tsx    # Shopping cart sidebar
├── contexts/              # React Context providers
│   └── CartContext.tsx    # Shopping cart state
├── data/                  # Mock data
│   └── products.ts        # Product catalog data
├── types/                 # TypeScript definitions
│   └── product.ts         # Product interfaces
└── app/globals.css        # Global styles
```

## 🎨 Design Features

### Color Scheme
- **Primary**: Red (#DC2626) - Represents premium meat quality
- **Secondary**: Yellow (#EAB308) - Accent color for highlights
- **Neutral**: Grays for text and backgrounds

### Typography
- **Font**: Inter - Clean, modern sans-serif
- **Hierarchy**: Clear heading levels with proper contrast

### Components
- **Cards**: Hover effects with subtle shadows
- **Buttons**: Smooth transitions with hover states
- **Forms**: Clean inputs with validation feedback
- **Navigation**: Sticky header with cart indicator

## 🛒 E-Commerce Features

### Product Management
- **Categories**: Organized product taxonomy
- **Filtering**: Multi-criteria filtering system
- **Search**: Real-time product search
- **Sorting**: Price, name, and featured sorting options

### Shopping Experience
- **Cart**: Persistent cart with quantity controls
- **Checkout**: Multi-step process with validation
- **Pricing**: Support for sale prices and discounts
- **Stock**: Real-time stock quantity tracking

### Business Features
- **Free Shipping**: Threshold-based free shipping ($75+)
- **Delivery Options**: Standard, express, and pickup
- **Product Badges**: Organic, grass-fed, free-range labels
- **Nutritional Info**: Detailed nutrition facts

## 📱 Responsive Design

The website is fully responsive with breakpoints for:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

Key responsive features:
- Collapsible mobile navigation
- Responsive product grids
- Mobile-optimized cart sidebar
- Touch-friendly interface elements

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Code Quality
- **TypeScript**: Full type safety
- **ESLint**: Code linting with Next.js rules
- **Tailwind**: Utility-first CSS framework
- **Component Architecture**: Modular, reusable components

## 🚀 Deployment

The project is ready for deployment on platforms like:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Docker** containers

### Build Command
```bash
npm run build
```

## 🎯 Future Enhancements

Potential features for future development:
- User authentication and accounts
- Order history and tracking
- Product reviews and ratings
- Wishlist functionality
- Email notifications
- Payment gateway integration
- Inventory management system
- Admin dashboard
- Multi-language support
- Advanced analytics

## 📄 License

This project is for demonstration purposes. Please ensure you have appropriate licenses for any production use.

## 🤝 Contributing

This is a demonstration project. For production use, consider:
- Adding comprehensive testing
- Implementing real payment processing
- Adding database integration
- Setting up proper error handling
- Implementing security best practices

---

**Prime Cuts Butchery** - Premium Quality Fresh Meats 🥩