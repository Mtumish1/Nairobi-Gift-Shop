import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X, Gift, MapPin, User, LogOut, Package } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onSearchChange: (query: string) => void;
  searchQuery: string;
  onViewChange: (view: 'home' | 'products' | 'quiz' | 'tracker' | 'orders') => void;
  currentView: string;
  isAuthenticated: boolean;
  userName: string | null;
  onLoginClick: () => void;
  onRegisterClick: () => void;
  onLogoutClick: () => void;
}

export function Header({ 
  cartItemCount, 
  onCartClick, 
  onSearchChange, 
  searchQuery,
  onViewChange,
  currentView,
  isAuthenticated,
  userName,
  onLoginClick,
  onRegisterClick,
  onLogoutClick
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
            {/* ... nav buttons ... */}
          </nav>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-md mx-4">
            {/* ... search input ... */}
          </div>

          {/* Auth, Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <User className="h-5 w-5" />
                  <span>{userName}</span>
                </button>
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button onClick={() => onViewChange('orders')} className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Package className="h-4 w-4" />
                    <span>My Orders</span>
                  </button>
                  <button onClick={onLogoutClick} className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <button onClick={onLoginClick} className="text-sm font-medium text-gray-700 hover:text-coral">Login</button>
                <button onClick={onRegisterClick} className="bg-coral text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-coral-dark">Register</button>
              </div>
            )}

            {/* ... cart and mobile menu buttons ... */}
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-200 py-4">
            {/* ... mobile nav links ... */}
          </div>
        )}
      </div>
    </header>
  );
}