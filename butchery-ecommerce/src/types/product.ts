export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  subcategory: string;
  weight: string;
  image: string;
  images: string[];
  inStock: boolean;
  stockQuantity: number;
  origin: string;
  cut: string;
  grade?: string;
  isOrganic: boolean;
  isFreeRange?: boolean;
  isGrassFed?: boolean;
  nutritionInfo?: NutritionInfo;
  cookingTips?: string[];
  storageInstructions: string;
  shelfLife: string;
  featured: boolean;
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  fat: number;
  saturatedFat: number;
  cholesterol: number;
  sodium: number;
  carbohydrates: number;
  fiber: number;
  sugar: number;
}

export type ProductCategory = 
  | 'beef' 
  | 'pork' 
  | 'lamb' 
  | 'chicken' 
  | 'turkey' 
  | 'duck' 
  | 'seafood' 
  | 'sausages' 
  | 'prepared' 
  | 'specialty';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: ProductCategory;
  name: string;
  description: string;
  image: string;
  subcategories: string[];
}