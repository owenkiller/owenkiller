'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getProductById, getProductsByCategory } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Star, 
  Truck, 
  Shield, 
  Clock,
  ChevronLeft,
  Plus,
  Minus
} from 'lucide-react';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = getProductById(productId);
  const { addItem } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist or may have been removed.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = getProductsByCategory(product.category).filter(
    p => p.id !== product.id
  ).slice(0, 4);

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stockQuantity) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-red-600">Home</Link>
            <span className="text-gray-300">/</span>
            <Link href="/products" className="text-gray-500 hover:text-red-600">Products</Link>
            <span className="text-gray-300">/</span>
            <Link 
              href={`/products?category=${product.category}`} 
              className="text-gray-500 hover:text-red-600 capitalize"
            >
              {product.category}
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
              <div className="w-full h-full flex items-center justify-center text-8xl">
                {product.category === 'beef' && '🥩'}
                {product.category === 'pork' && '🥓'}
                {product.category === 'chicken' && '🍗'}
                {product.category === 'lamb' && '🐑'}
                {product.category === 'seafood' && '🐟'}
                {product.category === 'sausages' && '🌭'}
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isOrganic && (
                  <span className="bg-green-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                    Organic
                  </span>
                )}
                {product.isGrassFed && (
                  <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                    Grass Fed
                  </span>
                )}
                {product.isFreeRange && (
                  <span className="bg-purple-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                    Free Range
                  </span>
                )}
              </div>

              {/* Discount Badge */}
              {discountPercentage > 0 && (
                <div className="absolute top-4 right-4 bg-red-500 text-white text-lg px-3 py-2 rounded-full font-bold">
                  -{discountPercentage}%
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-red-500' : 'border-transparent'
                    }`}
                  >
                    <div className="w-full h-full flex items-center justify-center text-2xl">
                      {product.category === 'beef' && '🥩'}
                      {product.category === 'pork' && '🥓'}
                      {product.category === 'chicken' && '🍗'}
                      {product.category === 'lamb' && '🐑'}
                      {product.category === 'seafood' && '🐟'}
                      {product.category === 'sausages' && '🌭'}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-gray-600">(4.8) • 127 reviews</span>
                </div>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">{product.description}</p>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-gray-600">per {product.weight}</span>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-200">
              <div>
                <span className="text-sm text-gray-500">Origin</span>
                <p className="font-medium">{product.origin}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Cut</span>
                <p className="font-medium">{product.cut}</p>
              </div>
              {product.grade && (
                <div>
                  <span className="text-sm text-gray-500">Grade</span>
                  <p className="font-medium">{product.grade}</p>
                </div>
              )}
              <div>
                <span className="text-sm text-gray-500">Weight</span>
                <p className="font-medium">{product.weight}</p>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock ? `${product.stockQuantity} in stock` : 'Out of stock'}
              </span>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stockQuantity}
                    className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                    product.inStock
                      ? 'bg-red-600 text-white hover:bg-red-700 transform hover:scale-105'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                </button>
                
                <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Heart className="h-5 w-5" />
                </button>
                
                <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Truck className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Free Delivery</p>
                  <p className="text-xs text-gray-600">Orders over $75</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Shield className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Quality Guarantee</p>
                  <p className="text-xs text-gray-600">100% satisfaction</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Clock className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Fresh Daily</p>
                  <p className="text-xs text-gray-600">Cut to order</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button className="border-b-2 border-red-500 py-4 px-1 text-sm font-medium text-red-600">
                Description
              </button>
              <button className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700">
                Nutrition Facts
              </button>
              <button className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700">
                Cooking Tips
              </button>
              <button className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700">
                Storage
              </button>
            </nav>
          </div>

          <div className="py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
                <p className="text-gray-700 mb-6">{product.description}</p>
                
                {product.cookingTips && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Cooking Tips:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {product.cookingTips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Storage & Handling</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Storage Instructions:</h4>
                    <p className="text-gray-700">{product.storageInstructions}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Shelf Life:</h4>
                    <p className="text-gray-700">{product.shelfLife}</p>
                  </div>
                </div>

                {product.nutritionInfo && (
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 mb-2">Nutrition Facts (per 100g):</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>Calories: {product.nutritionInfo.calories}</div>
                        <div>Protein: {product.nutritionInfo.protein}g</div>
                        <div>Fat: {product.nutritionInfo.fat}g</div>
                        <div>Carbs: {product.nutritionInfo.carbohydrates}g</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}