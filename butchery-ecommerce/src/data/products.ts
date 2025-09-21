import { Product, Category } from '@/types/product';

export const categories: Category[] = [
  {
    id: 'beef',
    name: 'Premium Beef',
    description: 'Grass-fed, locally sourced beef cuts',
    image: '/images/categories/beef.jpg',
    subcategories: ['Steaks', 'Roasts', 'Ground Beef', 'Ribs', 'Specialty Cuts']
  },
  {
    id: 'pork',
    name: 'Fresh Pork',
    description: 'Farm-fresh pork from heritage breeds',
    image: '/images/categories/pork.jpg',
    subcategories: ['Chops', 'Roasts', 'Bacon', 'Ham', 'Sausages']
  },
  {
    id: 'lamb',
    name: 'Lamb & Mutton',
    description: 'Tender lamb from local farms',
    image: '/images/categories/lamb.jpg',
    subcategories: ['Chops', 'Leg', 'Shoulder', 'Rack', 'Ground Lamb']
  },
  {
    id: 'chicken',
    name: 'Free-Range Chicken',
    description: 'Organic, free-range poultry',
    image: '/images/categories/chicken.jpg',
    subcategories: ['Whole Chicken', 'Breasts', 'Thighs', 'Wings', 'Ground Chicken']
  },
  {
    id: 'seafood',
    name: 'Fresh Seafood',
    description: 'Daily fresh catch and premium seafood',
    image: '/images/categories/seafood.jpg',
    subcategories: ['Fish', 'Shellfish', 'Salmon', 'Tuna', 'Seasonal']
  },
  {
    id: 'sausages',
    name: 'Artisan Sausages',
    description: 'House-made sausages and cured meats',
    image: '/images/categories/sausages.jpg',
    subcategories: ['Fresh Sausages', 'Smoked', 'Cured Meats', 'Bratwurst', 'Specialty']
  }
];

export const products: Product[] = [
  // Beef Products
  {
    id: '1',
    name: 'Prime Ribeye Steak',
    description: 'Premium grass-fed ribeye steak with exceptional marbling. Perfect for grilling or pan-searing.',
    price: 32.99,
    originalPrice: 36.99,
    category: 'beef',
    subcategory: 'Steaks',
    weight: '12 oz',
    image: '/images/products/ribeye-steak.jpg',
    images: ['/images/products/ribeye-steak.jpg', '/images/products/ribeye-steak-2.jpg'],
    inStock: true,
    stockQuantity: 15,
    origin: 'Local Ranch, Colorado',
    cut: 'Ribeye',
    grade: 'Prime',
    isOrganic: true,
    isGrassFed: true,
    nutritionInfo: {
      calories: 291,
      protein: 25.6,
      fat: 20.2,
      saturatedFat: 8.2,
      cholesterol: 89,
      sodium: 65,
      carbohydrates: 0,
      fiber: 0,
      sugar: 0
    },
    cookingTips: [
      'Let steak come to room temperature before cooking',
      'Season generously with salt and pepper',
      'Cook on high heat for 3-4 minutes per side for medium-rare',
      'Let rest for 5 minutes before serving'
    ],
    storageInstructions: 'Keep refrigerated at 32-40°F. Use within 3-5 days.',
    shelfLife: '5 days refrigerated',
    featured: true
  },
  {
    id: '2',
    name: 'Grass-Fed Ground Beef',
    description: '85/15 lean grass-fed ground beef. Perfect for burgers, meatballs, and everyday cooking.',
    price: 8.99,
    category: 'beef',
    subcategory: 'Ground Beef',
    weight: '1 lb',
    image: '/images/products/ground-beef.jpg',
    images: ['/images/products/ground-beef.jpg'],
    inStock: true,
    stockQuantity: 25,
    origin: 'Local Ranch, Colorado',
    cut: 'Ground Beef',
    isOrganic: true,
    isGrassFed: true,
    nutritionInfo: {
      calories: 250,
      protein: 25.8,
      fat: 15.0,
      saturatedFat: 6.2,
      cholesterol: 77,
      sodium: 75,
      carbohydrates: 0,
      fiber: 0,
      sugar: 0
    },
    storageInstructions: 'Keep refrigerated at 32-40°F. Use within 1-2 days.',
    shelfLife: '2 days refrigerated',
    featured: false
  },
  {
    id: '3',
    name: 'Beef Tenderloin Filet',
    description: 'The most tender cut of beef. Melt-in-your-mouth texture with mild, buttery flavor.',
    price: 45.99,
    category: 'beef',
    subcategory: 'Steaks',
    weight: '8 oz',
    image: '/images/products/beef-tenderloin.jpg',
    images: ['/images/products/beef-tenderloin.jpg', '/images/products/beef-tenderloin-2.jpg'],
    inStock: true,
    stockQuantity: 8,
    origin: 'Premium Ranch, Nebraska',
    cut: 'Tenderloin',
    grade: 'Prime',
    isOrganic: false,
    isGrassFed: true,
    cookingTips: [
      'Season simply with salt and pepper',
      'Sear in hot pan with butter and herbs',
      'Cook to medium-rare for best texture',
      'Don\'t overcook - it will become tough'
    ],
    storageInstructions: 'Keep refrigerated at 32-40°F. Use within 3-5 days.',
    shelfLife: '5 days refrigerated',
    featured: true
  },

  // Pork Products
  {
    id: '4',
    name: 'Heritage Pork Chops',
    description: 'Thick-cut pork chops from heritage Mangalitsa pigs. Incredibly flavorful and juicy.',
    price: 16.99,
    category: 'pork',
    subcategory: 'Chops',
    weight: '2 chops, 1.5 lbs',
    image: '/images/products/pork-chops.jpg',
    images: ['/images/products/pork-chops.jpg'],
    inStock: true,
    stockQuantity: 12,
    origin: 'Heritage Farm, Iowa',
    cut: 'Center Cut Chops',
    isOrganic: true,
    isFreeRange: true,
    nutritionInfo: {
      calories: 231,
      protein: 25.7,
      fat: 13.4,
      saturatedFat: 4.9,
      cholesterol: 78,
      sodium: 62,
      carbohydrates: 0,
      fiber: 0,
      sugar: 0
    },
    cookingTips: [
      'Brine for 2-4 hours for extra juiciness',
      'Cook to internal temperature of 145°F',
      'Let rest for 3 minutes after cooking',
      'Great with apple or cherry glaze'
    ],
    storageInstructions: 'Keep refrigerated at 32-40°F. Use within 3-5 days.',
    shelfLife: '5 days refrigerated',
    featured: false
  },
  {
    id: '5',
    name: 'Applewood Smoked Bacon',
    description: 'Thick-cut bacon smoked over applewood. No nitrates or artificial preservatives.',
    price: 12.99,
    category: 'pork',
    subcategory: 'Bacon',
    weight: '1 lb',
    image: '/images/products/bacon.jpg',
    images: ['/images/products/bacon.jpg'],
    inStock: true,
    stockQuantity: 20,
    origin: 'Artisan Smokehouse, Vermont',
    cut: 'Belly',
    isOrganic: true,
    storageInstructions: 'Keep refrigerated at 32-40°F. Use within 7 days of opening.',
    shelfLife: '2 weeks refrigerated, unopened',
    featured: true
  },

  // Chicken Products
  {
    id: '6',
    name: 'Organic Whole Chicken',
    description: 'Free-range organic chicken, air-chilled for superior flavor and texture.',
    price: 18.99,
    category: 'chicken',
    subcategory: 'Whole Chicken',
    weight: '3-4 lbs',
    image: '/images/products/whole-chicken.jpg',
    images: ['/images/products/whole-chicken.jpg'],
    inStock: true,
    stockQuantity: 10,
    origin: 'Organic Farm, California',
    cut: 'Whole Bird',
    isOrganic: true,
    isFreeRange: true,
    nutritionInfo: {
      calories: 165,
      protein: 31.0,
      fat: 3.6,
      saturatedFat: 1.0,
      cholesterol: 85,
      sodium: 74,
      carbohydrates: 0,
      fiber: 0,
      sugar: 0
    },
    cookingTips: [
      'Roast at 425°F for crispy skin',
      'Cook to internal temperature of 165°F',
      'Brine overnight for extra flavor',
      'Let rest 10 minutes before carving'
    ],
    storageInstructions: 'Keep refrigerated at 32-40°F. Use within 2-3 days.',
    shelfLife: '3 days refrigerated',
    featured: false
  },
  {
    id: '7',
    name: 'Free-Range Chicken Breasts',
    description: 'Boneless, skinless chicken breasts from pasture-raised birds. Lean and versatile.',
    price: 14.99,
    category: 'chicken',
    subcategory: 'Breasts',
    weight: '1.5 lbs',
    image: '/images/products/chicken-breasts.jpg',
    images: ['/images/products/chicken-breasts.jpg'],
    inStock: true,
    stockQuantity: 18,
    origin: 'Free-Range Farm, Oregon',
    cut: 'Breast',
    isOrganic: true,
    isFreeRange: true,
    storageInstructions: 'Keep refrigerated at 32-40°F. Use within 2-3 days.',
    shelfLife: '3 days refrigerated',
    featured: false
  },

  // Lamb Products
  {
    id: '8',
    name: 'Rack of Lamb',
    description: 'French-trimmed rack of lamb, perfect for special occasions. Tender and flavorful.',
    price: 39.99,
    category: 'lamb',
    subcategory: 'Rack',
    weight: '1.5-2 lbs',
    image: '/images/products/rack-of-lamb.jpg',
    images: ['/images/products/rack-of-lamb.jpg', '/images/products/rack-of-lamb-2.jpg'],
    inStock: true,
    stockQuantity: 6,
    origin: 'Mountain Meadow Farm, Montana',
    cut: 'Rack',
    isOrganic: true,
    isGrassFed: true,
    cookingTips: [
      'Sear all sides before roasting',
      'Cook to 130°F for medium-rare',
      'Coat with herb crust for extra flavor',
      'Rest for 10 minutes before slicing'
    ],
    storageInstructions: 'Keep refrigerated at 32-40°F. Use within 3-5 days.',
    shelfLife: '5 days refrigerated',
    featured: true
  },

  // Seafood Products
  {
    id: '9',
    name: 'Wild Alaskan Salmon',
    description: 'Fresh wild-caught Alaskan salmon. Rich in omega-3 fatty acids and full of flavor.',
    price: 28.99,
    category: 'seafood',
    subcategory: 'Salmon',
    weight: '1.5 lb fillet',
    image: '/images/products/salmon.jpg',
    images: ['/images/products/salmon.jpg'],
    inStock: true,
    stockQuantity: 8,
    origin: 'Alaska',
    cut: 'Fillet',
    nutritionInfo: {
      calories: 208,
      protein: 25.4,
      fat: 12.4,
      saturatedFat: 3.1,
      cholesterol: 59,
      sodium: 59,
      carbohydrates: 0,
      fiber: 0,
      sugar: 0
    },
    cookingTips: [
      'Cook skin-side down first',
      'Don\'t flip until skin is crispy',
      'Cook to internal temperature of 145°F',
      'Great with lemon and dill'
    ],
    storageInstructions: 'Keep refrigerated at 32-40°F. Use within 1-2 days.',
    shelfLife: '2 days refrigerated',
    featured: true
  },

  // Sausages
  {
    id: '10',
    name: 'Italian Sweet Sausage',
    description: 'House-made Italian sausage with fennel and herbs. Perfect for pasta or grilling.',
    price: 9.99,
    category: 'sausages',
    subcategory: 'Fresh Sausages',
    weight: '1 lb (4 links)',
    image: '/images/products/italian-sausage.jpg',
    images: ['/images/products/italian-sausage.jpg'],
    inStock: true,
    stockQuantity: 15,
    origin: 'Made In-House',
    cut: 'Sausage',
    isOrganic: false,
    cookingTips: [
      'Grill over medium heat',
      'Turn frequently for even cooking',
      'Cook to internal temperature of 160°F',
      'Great with peppers and onions'
    ],
    storageInstructions: 'Keep refrigerated at 32-40°F. Use within 3-4 days.',
    shelfLife: '4 days refrigerated',
    featured: false
  }
];

// Helper functions
export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery) ||
    product.subcategory.toLowerCase().includes(lowercaseQuery)
  );
};