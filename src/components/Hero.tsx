import React from 'react';
import { ArrowRight, Clock, MapPin, Shield, Sparkles } from 'lucide-react';

interface HeroProps {
  onStartQuiz: () => void;
}

export function Hero({ onStartQuiz }: HeroProps) {
  return (
    <div className="relative bg-gradient-to-r from-coral via-pink-500 to-teal overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Perfect Gifts for
            <span className="block text-gold animate-pulse">Nairobi Hearts</span>
          </h1>
          <p className="text-lg md:text-xl text-white opacity-90 mb-8 max-w-3xl mx-auto">
            Discover personalized gifts, same-day delivery, and unforgettable moments. 
            From custom mugs to premium hampers - we make gifting magical.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={onStartQuiz}
              className="bg-white text-coral px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <Sparkles className="h-5 w-5" />
              <span>Take Gift Quiz</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-coral transition-all duration-300">
              Browse Gifts
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 text-white">
              <Clock className="h-8 w-8 mx-auto mb-3 text-gold" />
              <h3 className="font-semibold mb-2">Same Day Delivery</h3>
              <p className="text-sm opacity-90">Order before 2pm for same-day delivery across Nairobi</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 text-white">
              <Shield className="h-8 w-8 mx-auto mb-3 text-gold" />
              <h3 className="font-semibold mb-2">M-Pesa & Pay on Delivery</h3>
              <p className="text-sm opacity-90">Secure payments with trusted local options</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 text-white">
              <MapPin className="h-8 w-8 mx-auto mb-3 text-gold" />
              <h3 className="font-semibold mb-2">All Nairobi Areas</h3>
              <p className="text-sm opacity-90">CBD, Westlands, Kileleshwa, Karen & beyond</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-10 left-10 animate-bounce">
        <div className="bg-gold rounded-full p-3">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
      </div>
      <div className="absolute bottom-10 right-10 animate-bounce delay-1000">
        <div className="bg-white rounded-full p-3">
          <Sparkles className="h-6 w-6 text-coral" />
        </div>
      </div>
    </div>
  );
}