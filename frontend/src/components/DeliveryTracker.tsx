import React, { useState } from 'react';
import { ArrowLeft, Package, Truck, CheckCircle, Search } from 'lucide-react';
import { trackOrder as apiTrackOrder } from '../services/api';

interface DeliveryTrackerProps {
  onClose: () => void;
}

interface OrderStatus {
  status: string;
  trackingNumber: string;
}

export function DeliveryTracker({ onClose }: DeliveryTrackerProps) {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber) return;

    setLoading(true);
    setError(null);
    setOrderStatus(null);

    try {
      const data = await apiTrackOrder(trackingNumber);
      setOrderStatus(data);
    } catch (err) {
      setError('Invalid tracking number or failed to fetch order status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={onClose}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Shop</span>
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Order</h1>
          <form onSubmit={handleTrackOrder} className="flex items-center space-x-2">
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Enter your tracking number"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <button type="submit" className="bg-coral text-white px-4 py-2 rounded-lg flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Track</span>
            </button>
          </form>
        </div>

        {loading && <div className="text-center">Loading...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}

        {orderStatus && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Order Status for #{orderStatus.trackingNumber}</h2>
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-green-500">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-green-600">{orderStatus.status}</h3>
                <p className="text-sm text-gray-600">Your order is currently {orderStatus.status.toLowerCase()}.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}