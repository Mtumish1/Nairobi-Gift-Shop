import React, { useState, useEffect } from 'react';
import { ArrowLeft, Package, Truck, CheckCircle, Clock, MapPin, Phone, MessageCircle } from 'lucide-react';

interface DeliveryTrackerProps {
  onClose: () => void;
}

export function DeliveryTracker({ onClose }: DeliveryTrackerProps) {
  const [orderNumber] = useState('GH2025001');
  const [currentStatus, setCurrentStatus] = useState(1);
  
  const statuses = [
    { id: 1, name: 'Order Confirmed', description: 'Your order has been received and confirmed', icon: CheckCircle, time: '2:15 PM' },
    { id: 2, name: 'Preparing', description: 'Your gift is being prepared and personalized', icon: Package, time: '2:45 PM' },
    { id: 3, name: 'Out for Delivery', description: 'Your gift is on the way to the recipient', icon: Truck, time: '4:20 PM' },
    { id: 4, name: 'Delivered', description: 'Gift successfully delivered', icon: CheckCircle, time: 'Expected by 6:00 PM' },
  ];

  // Simulate progress
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatus(prev => {
        if (prev < 4) return prev + 1;
        return prev;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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
          <p className="text-gray-600">Order #{orderNumber}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Progress */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Order Status</h2>
              
              <div className="space-y-6">
                {statuses.map((status, index) => {
                  const IconComponent = status.icon;
                  const isCompleted = currentStatus > status.id;
                  const isCurrent = currentStatus === status.id;
                  const isPending = currentStatus < status.id;
                  
                  return (
                    <div key={status.id} className="relative flex items-start space-x-4">
                      {/* Connecting Line */}
                      {index < statuses.length - 1 && (
                        <div className={`absolute left-6 top-12 w-0.5 h-16 ${
                          isCompleted ? 'bg-green-500' : isCurrent ? 'bg-coral' : 'bg-gray-200'
                        }`}></div>
                      )}
                      
                      {/* Status Icon */}
                      <div className={`relative z-10 p-3 rounded-full ${
                        isCompleted ? 'bg-green-500' : isCurrent ? 'bg-coral animate-pulse' : 'bg-gray-200'
                      }`}>
                        <IconComponent className={`h-6 w-6 ${
                          isCompleted || isCurrent ? 'text-white' : 'text-gray-400'
                        }`} />
                      </div>
                      
                      {/* Status Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h3 className={`font-semibold ${
                            isCompleted ? 'text-green-600' : isCurrent ? 'text-coral' : 'text-gray-400'
                          }`}>
                            {status.name}
                          </h3>
                          <span className={`text-sm ${
                            isCompleted ? 'text-green-600' : isCurrent ? 'text-coral' : 'text-gray-400'
                          }`}>
                            {status.time}
                          </span>
                        </div>
                        <p className={`text-sm mt-1 ${
                          isPending ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {status.description}
                        </p>
                        
                        {isCurrent && (
                          <div className="mt-2 text-sm text-coral font-medium animate-pulse">
                            Currently in progress...
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Live Updates */}
            {currentStatus >= 3 && (
              <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Truck className="h-5 w-5 mr-2 text-coral" />
                  Live Delivery Updates
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 text-sm">
                    <Clock className="h-4 w-4 text-gray-400 mt-0.5" />
                    <div>
                      <span className="font-medium">4:45 PM</span>
                      <span className="text-gray-600 ml-2">Driver has picked up your order from our Westlands store</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 text-sm">
                    <MapPin className="h-4 w-4 text-coral mt-0.5" />
                    <div>
                      <span className="font-medium">5:12 PM</span>
                      <span className="text-gray-600 ml-2">Currently 2.5km away from delivery address</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Details Sidebar */}
          <div className="space-y-6">
            {/* Delivery Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Delivery Details</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium">Delivery Address</p>
                    <p className="text-sm text-gray-600">
                      Sarit Centre, Westlands<br />
                      Building B, 5th Floor<br />
                      Nairobi, Kenya
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium">Recipient</p>
                    <p className="text-sm text-gray-600">Jane Wanjiku<br />+254 712 345 678</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Custom Photo Mug × 1</span>
                  <span>KSh 1,300</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Personalization</span>
                  <span>KSh 300</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Delivery (Westlands)</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>KSh 1,600</span>
                </div>
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-gradient-to-r from-coral to-pink-500 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-3">Need Help?</h3>
              <p className="text-sm mb-4 opacity-90">
                Our support team is here to help with your order
              </p>
              <div className="space-y-2">
                <button className="w-full bg-white text-coral py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>Chat on WhatsApp</span>
                </button>
                <button className="w-full bg-transparent border border-white text-white py-2 rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition-colors flex items-center justify-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>Call Support</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}