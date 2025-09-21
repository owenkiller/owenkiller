'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function CartSidebar() {
  const { 
    items, 
    isOpen, 
    closeCart, 
    updateQuantity, 
    removeItem, 
    getTotalPrice,
    getTotalItems 
  } = useCart();

  if (!isOpen) return null;

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">
              Shopping Cart ({totalItems})
            </h2>
            <button
              onClick={closeCart}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-500 mb-6">
                  Add some delicious meats to get started!
                </p>
                <Link
                  href="/products"
                  onClick={closeCart}
                  className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    {/* Product Image */}
                    <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center text-2xl">
                      {item.product.category === 'beef' && '🥩'}
                      {item.product.category === 'pork' && '🥓'}
                      {item.product.category === 'chicken' && '🍗'}
                      {item.product.category === 'lamb' && '🐑'}
                      {item.product.category === 'seafood' && '🐟'}
                      {item.product.category === 'sausages' && '🌭'}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm leading-tight">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.product.weight}
                      </p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">
                        ${item.product.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-sm font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        disabled={item.quantity >= item.product.stockQuantity}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="p-1 text-red-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-6 space-y-4">
              {/* Subtotal */}
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Subtotal:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              {/* Shipping Info */}
              <p className="text-sm text-gray-600">
                {totalPrice >= 75 ? (
                  <span className="text-green-600 font-medium">🚚 Free shipping included!</span>
                ) : (
                  <span>
                    Add ${(75 - totalPrice).toFixed(2)} more for free shipping
                  </span>
                )}
              </p>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="block w-full py-3 px-4 bg-gray-100 text-gray-900 text-center font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                  View Cart
                </Link>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full py-3 px-4 bg-red-600 text-white text-center font-medium rounded-lg hover:bg-red-700 transition-colors"
                >
                  Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}