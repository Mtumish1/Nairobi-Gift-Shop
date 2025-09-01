import React from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import type { CartItem } from '../App';

interface CartProps {
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, personalization: CartItem['personalization'], quantity: number) => void;
  onCheckout: () => void;
  totalPrice: number;
}

export function Cart({ items, onClose, onUpdateQuantity, onCheckout, totalPrice }: CartProps) {
  const deliveryFee = totalPrice > 5000 ? 0 : 300;
  const finalTotal = totalPrice + deliveryFee;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6 text-coral" />
            <h2 className="text-2xl font-bold text-gray-900">
              Your Cart ({items.reduce((sum, item) => sum + item.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-600">Add some gifts to get started</p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item, index) => (
                <div key={`${item.id}-${index}`} className="flex items-center space-x-4 bg-gray-50 rounded-xl p-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      KSh {(item.price + (item.personalization?.additionalCost || 0)).toLocaleString()} each
                    </p>
                    
                    {item.personalization && (
                      <div className="text-xs text-gray-500 space-y-1">
                        {item.personalization.text && (
                          <p>Text: "{item.personalization.text}"</p>
                        )}
                        {item.personalization.image && (
                          <p>✓ Custom photo added</p>
                        )}
                        <p>Color: <span className="inline-block w-3 h-3 rounded-full ml-1" style={{ backgroundColor: item.personalization.color }}></span></p>
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.personalization, item.quantity - 1)}
                          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="font-medium px-3 py-1 bg-white rounded-lg">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.personalization, item.quantity + 1)}
                          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          KSh {((item.price + (item.personalization?.additionalCost || 0)) * item.quantity).toLocaleString()}
                        </p>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.personalization, 0)}
                          className="text-red-500 hover:text-red-700 text-sm flex items-center space-x-1 mt-1"
                        >
                          <Trash2 className="h-3 w-3" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>KSh {totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span className={deliveryFee === 0 ? 'text-green-600 font-medium' : ''}>
                  {deliveryFee === 0 ? 'FREE!' : `KSh ${deliveryFee}`}
                </span>
              </div>
              {totalPrice < 5000 && deliveryFee > 0 && (
                <p className="text-sm text-orange-600">
                  Add KSh {(5000 - totalPrice).toLocaleString()} more for free delivery!
                </p>
              )}
              <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>KSh {finalTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              className="w-full bg-coral text-white py-4 rounded-xl font-semibold text-lg hover:bg-coral-dark transition-colors transform hover:scale-105"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}