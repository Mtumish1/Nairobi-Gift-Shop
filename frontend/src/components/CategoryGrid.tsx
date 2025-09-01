import React, { useState, useEffect } from 'react';
import { Heart, Briefcase, Gift, Flower, Users, Sparkles } from 'lucide-react';
import { getCategories } from '../services/api';

interface Category {
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
}

interface CategoryGridProps {
  selectedCategory: string;
  selectedOccasion: string;
  onCategoryChange: (category: string) => void;
  onOccasionChange: (occasion: string) => void;
}

const categoryAppearance: { [key: string]: { icon: React.ElementType, color: string } } = {
  default: { icon: Gift, color: 'from-gray-500 to-gray-600' },
  flowers: { icon: Flower, color: 'from-pink-500 to-red-500' },
  chocolates: { icon: Heart, color: 'from-yellow-800 to-yellow-600' },
  'gift baskets': { icon: Gift, color: 'from-green-500 to-teal-500' },
  personalized: { icon: Sparkles, color: 'from-purple-500 to-pink-500' },
  corporate: { icon: Briefcase, color: 'from-blue-500 to-indigo-500' },
};

export function CategoryGrid({ 
  onCategoryChange, 
  onOccasionChange 
}: CategoryGridProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        setError('Failed to fetch categories.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const occasions = [
    { id: 'birthday', name: 'Birthday', emoji: '🎂' },
    { id: 'valentine', name: 'Valentine', emoji: '💝' },
    { id: 'graduation', name: 'Graduation', emoji: '🎓' },
    { id: 'anniversary', name: 'Anniversary', emoji: '💕' },
    { id: 'corporate', name: 'Corporate', emoji: '💼' },
    { id: 'thank-you', name: 'Thank You', emoji: '🙏' },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Categories */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-gray-600">Find the perfect gift for every occasion</p>
        </div>

        {loading && <div className="text-center">Loading categories...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}
        {!loading && !error && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {categories.map((category) => {
              const appearance = categoryAppearance[category.name.toLowerCase()] || categoryAppearance.default;
              const IconComponent = appearance.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => onCategoryChange(category.name.toLowerCase())}
                  className="group relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${appearance.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  <div className="relative">
                    <div className={`bg-gradient-to-br ${appearance.color} p-4 rounded-xl mb-4 mx-auto w-fit`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-center">{category.name}</h3>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Occasions */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Occasion</h2>
          <p className="text-gray-600">Special moments deserve special gifts</p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {occasions.map((occasion) => (
            <button
              key={occasion.id}
              onClick={() => onOccasionChange(occasion.id)}
              className="bg-white border-2 border-gray-200 rounded-xl p-4 text-center hover:border-coral hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-3xl mb-2">{occasion.emoji}</div>
              <p className="text-sm font-medium text-gray-900">{occasion.name}</p>
            </button>
          ))}
        </div>

        {/* Featured Banner */}
        <div className="mt-16 bg-gradient-to-r from-gold via-yellow-400 to-orange-400 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">🎓 Graduation Season 2025</h3>
          <p className="text-white opacity-90 mb-6">Celebrate achievements with our curated graduation collection</p>
          <button
            onClick={() => onOccasionChange('graduation')}
            className="bg-white text-orange-500 px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Shop Graduation Gifts
          </button>
        </div>
      </div>
    </section>
  );
}