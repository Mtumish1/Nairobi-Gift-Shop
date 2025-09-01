import React, { useState } from 'react';
import { X, MapPin, Phone, CreditCard, Smartphone, Truck, Clock } from 'lucide-react';
import type { CartItem } from '../App';
import { useUser } from '../contexts/UserContext';
import { checkout as apiCheckout } from '../services/api';

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
  const [error, setError] = useState<string | null>(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const { isAuthenticated } = useUser();

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

  const handlePlaceOrder = async () => {
    if (!isAuthenticated) {
      setError('You must be logged in to place an order.');
      return;
    }

    setIsPlacingOrder(true);
    setError(null);

    const checkoutData = {
      cart: items,
      deliveryAddress: deliveryInfo,
      totalAmount: finalTotal,
      paymentMethod,
      mpesaPhone: paymentMethod === 'mpesa' ? mpesaPhone : undefined,
    };

    try {
      await apiCheckout(checkoutData);
      onOrderComplete();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsPlacingOrder(false);
    }
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
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {step === 1 && (
            <div>
              {/* Delivery Info Form */}
            </div>
          )}

          {step === 2 && (
            <div>
              {/* Payment Info Form */}
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
              disabled={isPlacingOrder || (step === 1 && (!deliveryInfo.recipientName || !deliveryInfo.recipientPhone || !deliveryInfo.address)) || (step === 2 && paymentMethod === 'mpesa' && !mpesaPhone)}
              className={`px-8 py-3 rounded-lg font-semibold transition-colors ml-auto ${
                isPlacingOrder || (step === 1 && (!deliveryInfo.recipientName || !deliveryInfo.recipientPhone || !deliveryInfo.address)) || (step === 2 && paymentMethod === 'mpesa' && !mpesaPhone)
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-coral text-white hover:bg-coral-dark transform hover:scale-105'
              }`}
            >
              {isPlacingOrder ? 'Placing Order...' : (step === 1 ? 'Continue to Payment' : `Place Order - KSh ${finalTotal.toLocaleString()}`)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}