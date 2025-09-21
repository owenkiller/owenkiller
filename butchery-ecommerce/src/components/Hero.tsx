import Link from 'next/link';
import { ArrowRight, Award, Truck, Shield } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-red-900 via-red-800 to-red-700 text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Premium Quality
                <span className="block text-yellow-400">Fresh Meats</span>
              </h1>
              <p className="mt-6 text-xl text-red-100 leading-relaxed">
                From farm to table, we deliver the finest cuts of meat with uncompromising quality. 
                Locally sourced, expertly butchered, and delivered fresh to your door.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 bg-yellow-500 text-red-900 font-semibold rounded-lg hover:bg-yellow-400 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-red-900 transition-all duration-200"
              >
                Our Story
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <Award className="h-6 w-6 text-red-900" />
                </div>
                <div>
                  <h3 className="font-semibold">Premium Quality</h3>
                  <p className="text-red-100 text-sm">USDA Prime & Choice grades</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <Truck className="h-6 w-6 text-red-900" />
                </div>
                <div>
                  <h3 className="font-semibold">Fresh Delivery</h3>
                  <p className="text-red-100 text-sm">Same day delivery available</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-red-900" />
                </div>
                <div>
                  <h3 className="font-semibold">Satisfaction Guarantee</h3>
                  <p className="text-red-100 text-sm">100% money back promise</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image placeholder - in a real app, this would be an actual image */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-2xl flex items-center justify-center">
              <div className="text-center text-red-900">
                <div className="text-6xl font-bold mb-4">🥩</div>
                <p className="text-xl font-semibold">Premium Cuts</p>
                <p className="text-sm">Fresh Daily</p>
              </div>
            </div>
            
            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg transform rotate-12">
              Organic
            </div>
            <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg transform -rotate-12">
              Farm Fresh
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}