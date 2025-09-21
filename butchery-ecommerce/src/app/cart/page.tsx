'use client';

import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const { 
    items, 
    updateQuantity, 
    removeItem, 
    clearCart,
    getTotalPrice,
    getTotalItems 
  } = useCart();

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  const shippingCost = totalPrice >= 75 ? 0 : 9.99;
  const finalTotal = totalPrice + shippingCost;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center px-8 py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Start Shopping
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">{totalItems} items in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Table Header */}
              <div className="hidden sm:grid sm:grid-cols-12 gap-4 p-6 border-b border-gray-200 text-sm font-medium text-gray-500 uppercase tracking-wide">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Total</div>
              </div>

              {/* Cart Items */}
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div key={item.product.id} className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                      {/* Product Info */}
                      <div className="sm:col-span-6">
                        <div className="flex items-center space-x-4">
                          {/* Product Image */}
                          <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                            {item.product.category === 'beef' && '🥩'}
                            {item.product.category === 'pork' && '🥓'}
                            {item.product.category === 'chicken' && '🍗'}
                            {item.product.category === 'lamb' && '🐑'}
                            {item.product.category === 'seafood' && '🐟'}
                            {item.product.category === 'sausages' && '🌭'}
                          </div>

                          {/* Product Details */}
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">
                              <Link 
                                href={`/products/${item.product.id}`}
                                className="hover:text-red-600 transition-colors"
                              >
                                {item.product.name}
                              </Link>
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {item.product.weight} • {item.product.origin}
                            </p>
                            
                            {/* Product Badges */}
                            <div className="flex items-center space-x-2 mt-2">
                              {item.product.isOrganic && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Organic
                                </span>
                              )}
                              {item.product.isGrassFed && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  Grass Fed
                                </span>
                              )}
                            </div>

                            {/* Mobile Price */}
                            <div className="sm:hidden mt-2">
                              <p className="text-lg font-semibold text-gray-900">
                                ${item.product.price.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="hidden sm:block sm:col-span-2 text-center">
                        <p className="text-lg font-semibold text-gray-900">
                          ${item.product.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Quantity */}
                      <div className="sm:col-span-2">
                        <div className="flex items-center justify-center space-x-3">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="text-lg font-medium w-12 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stockQuantity}
                            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        
                        {/* Stock Warning */}
                        {item.quantity >= item.product.stockQuantity && (
                          <p className="text-xs text-orange-600 text-center mt-1">
                            Max stock reached
                          </p>
                        )}
                      </div>

                      {/* Total */}
                      <div className="sm:col-span-2 flex items-center justify-between sm:justify-center">
                        <span className="sm:hidden text-sm text-gray-600">Total:</span>
                        <p className="text-lg font-semibold text-gray-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                        
                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="ml-4 p-2 text-red-400 hover:text-red-600 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear Cart */}
              <div className="p-6 border-t border-gray-200">
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700 font-medium transition-colors"
                >
                  Clear entire cart
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shippingCost === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `$${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>

                {totalPrice < 75 && (
                  <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                    💡 Add ${(75 - totalPrice).toFixed(2)} more for free shipping!
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full bg-red-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors text-center block"
                >
                  Proceed to Checkout
                </Link>

                <Link
                  href="/products"
                  className="w-full bg-gray-100 text-gray-900 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors text-center block"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Security Badges */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <span className="text-green-500 mr-1">🔒</span>
                    Secure Checkout
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-500 mr-1">🚚</span>
                    Free Returns
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}