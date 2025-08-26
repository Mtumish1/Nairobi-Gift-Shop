import React, { useState } from 'react';
import { X, MapPin, Phone, CreditCard, Smartphone, Truck, Clock } from 'lucide-react';
import type { CartItem } from '../App';

interface CheckoutModalProps {
  items: CartItem[];
  totalPrice: number;
  onClose: () => void;
  onOrderComplete: () => void;
}

export function CheckoutModal({ items, totalPrice, onClose, onOrderComplete }: CheckoutModalProps) {
  const [step, setStep] = useState(1);
  const [deliveryInfo, setDeliveryInfo] = useState({
    recipientName: '',
    recipientPhone: '',
    address: '',
    area: 'CBD',
    specialInstructions: '',
    deliveryTime: 'same-day'
  });
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'cod'>('mpesa');
  const [mpesaPhone, setMpesaPhone] = useState('');

  const areas = [
    { name: 'CBD', fee: 200, time: '2-4 hours' },
    { name: 'Westlands', fee: 250, time: '3-5 hours' },
    { name: 'Kileleshwa', fee: 300, time: '4-6 hours' },
    { name: 'Karen', fee: 400, time: '5-7 hours' },
    { name: 'Kilimani', fee: 250, time: '3-5 hours' },
    { name: 'Lavington', fee: 300, time: '4-6 hours' },
  ];

  const selectedArea = areas.find(area => area.name === deliveryInfo.area) || areas[0];
  const deliveryFee = totalPrice > 5000 ? 0 : selectedArea.fee;
  const finalTotal = totalPrice + deliveryFee;

  const handleContinue = () => {
    if (step === 1 && deliveryInfo.recipientName && deliveryInfo.recipientPhone && deliveryInfo.address) {
      setStep(2);
    } else if (step === 2) {
      handlePlaceOrder();
    }
  };

  const handlePlaceOrder = () => {
    // Simulate M-Pesa STK push or order processing
    setTimeout(() => {
      onOrderComplete();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
            <div className="flex items-center space-x-4 mt-2">
              <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-coral' : 'text-gray-400'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-coral text-white' : 'bg-gray-200'}`}>1</div>
                <span className="text-sm">Delivery</span>
              </div>
              <div className={`w-8 h-px ${step >= 2 ? 'bg-coral' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-coral' : 'text-gray-400'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-coral text-white' : 'bg-gray-200'}`}>2</div>
                <span className="text-sm">Payment</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-coral" />
                  Delivery Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Recipient Name *
                    </label>
                    <input
                      type="text"
                      value={deliveryInfo.recipientName}
                      onChange={(e) => setDeliveryInfo({...deliveryInfo, recipientName: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-coral focus:border-coral"
                      placeholder="Who is receiving this gift?"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={deliveryInfo.recipientPhone}
                      onChange={(e) => setDeliveryInfo({...deliveryInfo, recipientPhone: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-coral focus:border-coral"
                      placeholder="07xxxxxxxx"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Address *
                  </label>
                  <textarea
                    value={deliveryInfo.address}
                    onChange={(e) => setDeliveryInfo({...deliveryInfo, address: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-coral focus:border-coral"
                    rows={3}
                    placeholder="Building name, floor, apartment number, landmarks..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Area
                    </label>
                    <select
                      value={deliveryInfo.area}
                      onChange={(e) => setDeliveryInfo({...deliveryInfo, area: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-coral focus:border-coral"
                    >
                      {areas.map(area => (
                        <option key={area.name} value={area.name}>
                          {area.name} - KSh {area.fee} ({area.time})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery Time
                    </label>
                    <select
                      value={deliveryInfo.deliveryTime}
                      onChange={(e) => setDeliveryInfo({...deliveryInfo, deliveryTime: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-coral focus:border-coral"
                    >
                      <option value="same-day">Same Day ({selectedArea.time})</option>
                      <option value="next-day">Next Day (Morning)</option>
                      <option value="scheduled">Schedule for Later</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Instructions (Optional)
                  </label>
                  <textarea
                    value={deliveryInfo.specialInstructions}
                    onChange={(e) => setDeliveryInfo({...deliveryInfo, specialInstructions: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-coral focus:border-coral"
                    rows={2}
                    placeholder="Any special delivery instructions..."
                  />
                </div>
              </div>

              {/* Delivery Summary */}
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Truck className="h-5 w-5 text-teal-600" />
                  <span className="font-medium text-teal-800">Delivery Summary</span>
                </div>
                <div className="text-sm text-teal-700 space-y-1">
                  <p>📍 {deliveryInfo.area} Area</p>
                  <p>⏰ {selectedArea.time} delivery time</p>
                  <p>💰 Delivery fee: {deliveryFee === 0 ? 'FREE' : `KSh ${deliveryFee}`}</p>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-coral" />
                  Payment Method
                </h3>

                <div className="space-y-4">
                  <div
                    onClick={() => setPaymentMethod('mpesa')}
                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                      paymentMethod === 'mpesa' ? 'border-coral bg-coral-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-600 p-2 rounded-lg">
                        <Smartphone className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">M-Pesa Express</h4>
                        <p className="text-sm text-gray-600">Pay instantly with STK push</p>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        paymentMethod === 'mpesa' ? 'border-coral bg-coral' : 'border-gray-300'
                      }`}></div>
                    </div>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                      paymentMethod === 'cod' ? 'border-coral bg-coral-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-600 p-2 rounded-lg">
                        <Truck className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">Pay on Delivery</h4>
                        <p className="text-sm text-gray-600">Pay with cash when you receive</p>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        paymentMethod === 'cod' ? 'border-coral bg-coral' : 'border-gray-300'
                      }`}></div>
                    </div>
                  </div>
                </div>

                {paymentMethod === 'mpesa' && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      M-Pesa Phone Number
                    </label>
                    <input
                      type="tel"
                      value={mpesaPhone}
                      onChange={(e) => setMpesaPhone(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-coral focus:border-coral"
                      placeholder="07xxxxxxxx or 01xxxxxxxx"
                    />
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold mb-3">Order Summary</h4>
                <div className="space-y-2 text-sm">
                  {items.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="flex justify-between">
                      <span>{item.name} × {item.quantity}</span>
                      <span>KSh {((item.price + (item.personalization?.additionalCost || 0)) * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>KSh {totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery ({deliveryInfo.area})</span>
                      <span>{deliveryFee === 0 ? 'FREE' : `KSh ${deliveryFee}`}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg mt-2 pt-2 border-t">
                      <span>Total</span>
                      <span>KSh {finalTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            {step === 2 && (
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            )}
            
            <button
              onClick={handleContinue}
              disabled={
                (step === 1 && (!deliveryInfo.recipientName || !deliveryInfo.recipientPhone || !deliveryInfo.address)) ||
                (step === 2 && paymentMethod === 'mpesa' && !mpesaPhone)
              }
              className={`px-8 py-3 rounded-lg font-semibold transition-colors ml-auto ${
                (step === 1 && (!deliveryInfo.recipientName || !deliveryInfo.recipientPhone || !deliveryInfo.address)) ||
                (step === 2 && paymentMethod === 'mpesa' && !mpesaPhone)
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-coral text-white hover:bg-coral-dark transform hover:scale-105'
              }`}
            >
              {step === 1 ? 'Continue to Payment' : `Place Order - KSh ${finalTotal.toLocaleString()}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}