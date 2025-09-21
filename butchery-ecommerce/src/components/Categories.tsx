import Link from 'next/link';
import { categories } from '@/data/products';
import { ArrowRight } from 'lucide-react';

export default function Categories() {
  const categoryEmojis: Record<string, string> = {
    beef: '🥩',
    pork: '🥓',
    lamb: '🐑',
    chicken: '🍗',
    seafood: '🐟',
    sausages: '🌭',
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our wide selection of premium meats, from grass-fed beef to fresh seafood.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className="group relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 hover:from-red-50 hover:to-red-100 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Category Icon */}
              <div className="text-center mb-6">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {categoryEmojis[category.id]}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-red-800 transition-colors duration-300">
                  {category.name}
                </h3>
                <p className="text-gray-600 mt-2 group-hover:text-red-700 transition-colors duration-300">
                  {category.description}
                </p>
              </div>

              {/* Subcategories */}
              <div className="space-y-2 mb-6">
                {category.subcategories.slice(0, 4).map((subcategory) => (
                  <div
                    key={subcategory}
                    className="flex items-center justify-between text-sm text-gray-700 group-hover:text-red-800 transition-colors duration-300"
                  >
                    <span>{subcategory}</span>
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ))}
                {category.subcategories.length > 4 && (
                  <div className="text-sm text-gray-500 group-hover:text-red-600 transition-colors duration-300">
                    +{category.subcategories.length - 4} more
                  </div>
                )}
              </div>

              {/* Shop Now Button */}
              <div className="flex items-center justify-center">
                <span className="inline-flex items-center px-4 py-2 bg-white text-red-600 font-semibold rounded-lg group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shadow-md">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 to-red-800/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}