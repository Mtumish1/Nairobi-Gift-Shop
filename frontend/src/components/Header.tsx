import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X, Gift, MapPin, HelpCircle, Truck } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onSearchChange: (query: string) => void;
  searchQuery: string;
  onViewChange: (view: 'home' | 'products' | 'quiz' | 'tracker') => void;
  currentView: string;
}

export function Header({ 
  cartItemCount, 
  onCartClick, 
  onSearchChange, 
  searchQuery,
  onViewChange,
  currentView 
}: HeaderProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = [
    'custom mug', 'photo mug', 'magic mug', 'birthday gifts', 
    'valentine gifts', 'graduation gifts', 'corporate gifts',
    'flowers', 'chocolates', 'wine', 'hampers', 'personalized'
  ];

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(searchQuery.toLowerCase()) && searchQuery.length > 0
  );

  const handleSearchSelect = (suggestion: string) => {
    onSearchChange(suggestion);
    setShowSuggestions(false);
    onViewChange('products');
  };

  return (
    <header className="sticky top-0 bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onViewChange('home')}
          >
            <div className="bg-gradient-to-r from-coral to-teal p-2 rounded-lg">
              <Gift className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">GiftHub</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Nairobi</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onViewChange('home')}
              className={`text-sm font-medium transition-colors ${
                currentView === 'home' ? 'text-coral' : 'text-gray-700 hover:text-coral'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onViewChange('products')}
              className={`text-sm font-medium transition-colors ${
                currentView === 'products' ? 'text-coral' : 'text-gray-700 hover:text-coral'
              }`}
            >
              Shop
            </button>
            <button
              onClick={() => onViewChange('quiz')}
              className={`text-sm font-medium transition-colors ${
                currentView === 'quiz' ? 'text-coral' : 'text-gray-700 hover:text-coral'
              }`}
            >
              Gift Quiz
            </button>
            <button
              onClick={() => onViewChange('tracker')}
              className={`text-sm font-medium transition-colors ${
                currentView === 'tracker' ? 'text-coral' : 'text-gray-700 hover:text-coral'
              }`}
            >
              Track Order
            </button>
          </nav>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  setShowSuggestions(e.target.value.length > 0);
                }}
                onFocus={() => setShowSuggestions(searchQuery.length > 0)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder="Search gifts..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-coral focus:border-coral"
              />
            </div>
            
            {/* Search Suggestions */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 shadow-lg z-50">
                {filteredSuggestions.slice(0, 5).map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearchSelect(suggestion)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700"
                  >
                    <Search className="inline h-3 w-3 mr-2 text-gray-400" />
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Location Badge */}
            <div className="hidden sm:flex items-center space-x-1 text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              <MapPin className="h-3 w-3" />
              <span>Nairobi CBD</span>
            </div>

            {/* Cart Button */}
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-700 hover:text-coral transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-coral text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-gray-700"
            >
              {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              <button
                onClick={() => {
                  onViewChange('home');
                  setShowMobileMenu(false);
                }}
                className="flex items-center space-x-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <Gift className="h-4 w-4" />
                <span>Home</span>
              </button>
              <button
                onClick={() => {
                  onViewChange('products');
                  setShowMobileMenu(false);
                }}
                className="flex items-center space-x-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Shop</span>
              </button>
              <button
                onClick={() => {
                  onViewChange('quiz');
                  setShowMobileMenu(false);
                }}
                className="flex items-center space-x-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <HelpCircle className="h-4 w-4" />
                <span>Gift Quiz</span>
              </button>
              <button
                onClick={() => {
                  onViewChange('tracker');
                  setShowMobileMenu(false);
                }}
                className="flex items-center space-x-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <Truck className="h-4 w-4" />
                <span>Track Order</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}