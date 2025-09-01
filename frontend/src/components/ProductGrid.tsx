import React, { useState, useEffect } from 'react';
import { Star, Filter, SortDesc, Heart, Eye } from 'lucide-react';
import type { Product } from '../App';
import { getProducts } from '../services/api';

interface ProductGridProps {
  selectedCategory: string;
  selectedOccasion: string;
  searchQuery: string;
  onProductClick: (product: Product) => void;
  onCategoryChange: (category: string) => void;
  onOccasionChange: (occasion: string) => void;
}

export function ProductGrid({ 
  selectedCategory, 
  selectedOccasion, 
  searchQuery, 
  onProductClick,
  onCategoryChange,
  onOccasionChange
}: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'rating' | 'popular'>('popular');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesOccasion = selectedOccasion === 'all' || product.occasion.includes(selectedOccasion);
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesOccasion && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return b.reviews - a.reviews;
    }
  });

  const toggleFavorite = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  if (loading) {
    return <div className="text-center py-12">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  return (
    <section className="py-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {searchQuery ? `Search: "${searchQuery}"` : 'Gift Collection'}
            </h1>
            <p className="text-gray-600">
              {sortedProducts.length} gifts found
              {selectedCategory !== 'all' && ` in ${selectedCategory}`}
              {selectedOccasion !== 'all' && ` for ${selectedOccasion}`}
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-coral focus:border-coral"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-coral focus:border-coral"
            >
              <option value="all">All Categories</option>
              <option value="personalized">Personalized</option>
              <option value="flowers">Flowers</option>
              <option value="corporate">Corporate</option>
              <option value="hampers">Hampers</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Occasion:</span>
            <select
              value={selectedOccasion}
              onChange={(e) => onOccasionChange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-coral focus:border-coral"
            >
              <option value="all">All Occasions</option>
              <option value="birthday">Birthday</option>
              <option value="valentine">Valentine</option>
              <option value="graduation">Graduation</option>
              <option value="anniversary">Anniversary</option>
              <option value="corporate">Corporate</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => onProductClick(product)}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group overflow-hidden"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col space-y-2">
                  {product.personalizable && (
                    <span className="bg-coral text-white text-xs px-2 py-1 rounded-full">
                      Personalizable
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      Sale
                    </span>
                  )}
                </div>

                {/* Heart Icon */}
                <button
                  onClick={(e) => toggleFavorite(product.id, e)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                >
                  <Heart
                    className={`h-4 w-4 ${
                      favorites.includes(product.id)
                        ? 'text-red-500 fill-current'
                        : 'text-gray-400'
                    }`}
                  />
                </button>

                {/* Quick View Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-white text-gray-900 px-4 py-2 rounded-full font-medium flex items-center space-x-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <Eye className="h-4 w-4" />
                    <span>Quick View</span>
                  </button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">
                      KSh {product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        KSh {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  
                  <button className="bg-coral text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-coral-dark transition-colors transform hover:scale-105">
                    {product.personalizable ? 'Customize' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Eye className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No gifts found</h3>
            <p className="text-gray-600">
              Try adjusting your filters or search terms
            </p>
            <button
              onClick={() => {
                onCategoryChange('all');
                onOccasionChange('all');
              }}
              className="mt-4 bg-coral text-white px-6 py-3 rounded-full font-medium hover:bg-coral-dark transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}