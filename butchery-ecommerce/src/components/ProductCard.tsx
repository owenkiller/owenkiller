import Link from 'next/link';
import { Product } from '@/types/product';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem(product, 1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      {/* Product Image */}
      <div className="relative aspect-square bg-gray-100">
        {/* Image placeholder - in a real app, this would be the actual product image */}
        <div className="w-full h-full flex items-center justify-center text-6xl">
          {product.category === 'beef' && '🥩'}
          {product.category === 'pork' && '🥓'}
          {product.category === 'chicken' && '🍗'}
          {product.category === 'lamb' && '🐑'}
          {product.category === 'seafood' && '🐟'}
          {product.category === 'sausages' && '🌭'}
        </div>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isOrganic && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              Organic
            </span>
          )}
          {product.isGrassFed && (
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              Grass Fed
            </span>
          )}
          {product.isFreeRange && (
            <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              Free Range
            </span>
          )}
        </div>

        {/* Discount badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-sm px-2 py-1 rounded-full font-bold">
            -{discountPercentage}%
          </div>
        )}

        {/* Stock status */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-gray-900 text-lg leading-tight hover:text-red-800 transition-colors">
            <Link href={`/products/${product.id}`}>
              {product.name}
            </Link>
          </h3>
          <p className="text-sm text-gray-600 mt-1">{product.weight}</p>
        </div>

        <p className="text-gray-700 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Rating placeholder */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">(4.8)</span>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
              product.inStock
                ? 'bg-red-600 text-white hover:bg-red-700 transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>

        {/* Additional info */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{product.origin}</span>
            <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
              {product.inStock ? `${product.stockQuantity} in stock` : 'Out of stock'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}