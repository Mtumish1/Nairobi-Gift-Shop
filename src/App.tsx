import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryGrid } from './components/CategoryGrid';
import { ProductGrid } from './components/ProductGrid';
import { PersonalizationModal } from './components/PersonalizationModal';
import { Cart } from './components/Cart';
import { CheckoutModal } from './components/CheckoutModal';
import { DeliveryTracker } from './components/DeliveryTracker';
import { GiftQuiz } from './components/GiftQuiz';
import { WhatsAppChat } from './components/WhatsAppChat';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  occasion: string[];
  personalizable: boolean;
  description: string;
  rating: number;
  reviews: number;
}

export interface CartItem extends Product {
  quantity: number;
  personalization?: {
    text?: string;
    image?: string;
    color?: string;
    additionalCost: number;
  };
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedOccasion, setSelectedOccasion] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showPersonalization, setShowPersonalization] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showTracker, setShowTracker] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'products' | 'quiz' | 'tracker'>('home');

  const products: Product[] = [
    {
      id: '1',
      name: 'Custom Photo Mug',
      price: 1200,
      originalPrice: 1500,
      image: 'https://images.pexels.com/photos/6347707/pexels-photo-6347707.jpeg?auto=compress&cs=tinysrgb&w=500',
      category: 'personalized',
      occasion: ['birthday', 'anniversary', 'corporate'],
      personalizable: true,
      description: 'High-quality ceramic mug with your custom photo',
      rating: 4.8,
      reviews: 124
    },
    {
      id: '2',
      name: 'Kenyan Coffee & Chocolate Box',
      price: 2500,
      image: 'https://images.pexels.com/photos/4040643/pexels-photo-4040643.jpeg?auto=compress&cs=tinysrgb&w=500',
      category: 'hampers',
      occasion: ['corporate', 'thank-you', 'housewarming'],
      personalizable: false,
      description: 'Premium Kenyan coffee beans with artisan chocolates',
      rating: 4.9,
      reviews: 89
    },
    {
      id: '3',
      name: 'Roses & Wine Bundle',
      price: 3500,
      originalPrice: 4200,
      image: 'https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg?auto=compress&cs=tinysrgb&w=500',
      category: 'flowers',
      occasion: ['valentine', 'anniversary', 'romantic'],
      personalizable: true,
      description: 'Fresh red roses with premium wine selection',
      rating: 4.7,
      reviews: 156
    },
    {
      id: '4',
      name: 'Personalized Wooden Frame',
      price: 1800,
      image: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=500',
      category: 'personalized',
      occasion: ['graduation', 'birthday', 'anniversary'],
      personalizable: true,
      description: 'Handcrafted wooden frame with custom engraving',
      rating: 4.6,
      reviews: 73
    },
    {
      id: '5',
      name: 'Executive Gift Set',
      price: 4500,
      image: 'https://images.pexels.com/photos/6194119/pexels-photo-6194119.jpeg?auto=compress&cs=tinysrgb&w=500',
      category: 'corporate',
      occasion: ['corporate', 'promotion', 'retirement'],
      personalizable: true,
      description: 'Premium pen set with leather notebook',
      rating: 4.8,
      reviews: 92
    },
    {
      id: '6',
      name: 'Graduation Success Hamper',
      price: 3200,
      image: 'https://images.pexels.com/photos/6334123/pexels-photo-6334123.jpeg?auto=compress&cs=tinysrgb&w=500',
      category: 'hampers',
      occasion: ['graduation', 'achievement'],
      personalizable: false,
      description: 'Celebration box with treats and congratulations card',
      rating: 4.9,
      reviews: 67
    }
  ];

  const addToCart = (product: Product, personalization?: CartItem['personalization']) => {
    const existingItem = cartItems.find(item => 
      item.id === product.id && 
      JSON.stringify(item.personalization) === JSON.stringify(personalization)
    );

    if (existingItem) {
      setCartItems(items =>
        items.map(item =>
          item.id === product.id && 
          JSON.stringify(item.personalization) === JSON.stringify(personalization)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems(items => [...items, { ...product, quantity: 1, personalization }]);
    }

    setShowPersonalization(false);
    setSelectedProduct(null);
  };

  const updateCartItemQuantity = (productId: string, personalization: CartItem['personalization'], quantity: number) => {
    if (quantity === 0) {
      setCartItems(items =>
        items.filter(item => 
          !(item.id === productId && JSON.stringify(item.personalization) === JSON.stringify(personalization))
        )
      );
    } else {
      setCartItems(items =>
        items.map(item =>
          item.id === productId && JSON.stringify(item.personalization) === JSON.stringify(personalization)
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => 
    sum + (item.price + (item.personalization?.additionalCost || 0)) * item.quantity, 0
  );

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    if (product.personalizable) {
      setShowPersonalization(true);
    } else {
      addToCart(product);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        cartItemCount={totalItems}
        onCartClick={() => setShowCart(true)}
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
        onViewChange={setCurrentView}
        currentView={currentView}
      />
      
      {currentView === 'home' && (
        <>
          <Hero onStartQuiz={() => setShowQuiz(true)} />
          <CategoryGrid
            selectedCategory={selectedCategory}
            selectedOccasion={selectedOccasion}
            onCategoryChange={(category) => {
              setSelectedCategory(category);
              setCurrentView('products');
            }}
            onOccasionChange={(occasion) => {
              setSelectedOccasion(occasion);
              setCurrentView('products');
            }}
          />
        </>
      )}

      {currentView === 'products' && (
        <ProductGrid
          products={products}
          selectedCategory={selectedCategory}
          selectedOccasion={selectedOccasion}
          searchQuery={searchQuery}
          onProductClick={handleProductClick}
          onCategoryChange={setSelectedCategory}
          onOccasionChange={setSelectedOccasion}
        />
      )}

      {currentView === 'quiz' && (
        <GiftQuiz 
          onClose={() => setCurrentView('home')}
          onRecommendation={(category, occasion) => {
            setSelectedCategory(category);
            setSelectedOccasion(occasion);
            setCurrentView('products');
          }}
        />
      )}

      {currentView === 'tracker' && (
        <DeliveryTracker onClose={() => setCurrentView('home')} />
      )}

      {showPersonalization && selectedProduct && (
        <PersonalizationModal
          product={selectedProduct}
          onClose={() => {
            setShowPersonalization(false);
            setSelectedProduct(null);
          }}
          onAddToCart={(personalization) => addToCart(selectedProduct, personalization)}
        />
      )}

      {showCart && (
        <Cart
          items={cartItems}
          onClose={() => setShowCart(false)}
          onUpdateQuantity={updateCartItemQuantity}
          onCheckout={() => {
            setShowCart(false);
            setShowCheckout(true);
          }}
          totalPrice={totalPrice}
        />
      )}

      {showCheckout && (
        <CheckoutModal
          items={cartItems}
          totalPrice={totalPrice}
          onClose={() => setShowCheckout(false)}
          onOrderComplete={() => {
            setShowCheckout(false);
            setCartItems([]);
            setShowTracker(true);
            setCurrentView('tracker');
          }}
        />
      )}

      {showQuiz && (
        <GiftQuiz 
          onClose={() => setShowQuiz(false)}
          onRecommendation={(category, occasion) => {
            setSelectedCategory(category);
            setSelectedOccasion(occasion);
            setShowQuiz(false);
            setCurrentView('products');
          }}
        />
      )}

      <WhatsAppChat />
    </div>
  );
}

export default App;