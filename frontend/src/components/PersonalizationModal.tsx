import React, { useState } from 'react';
import { X, Upload, Palette, Type, Eye, Plus } from 'lucide-react';
import type { Product, CartItem } from '../App';

interface PersonalizationModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (personalization: CartItem['personalization']) => void;
}

export function PersonalizationModal({ product, onClose, onAddToCart }: PersonalizationModalProps) {
  const [text, setText] = useState('');
  const [selectedColor, setSelectedColor] = useState('#FF6B6B');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [additionalCost, setAdditionalCost] = useState(0);

  const colors = [
    { name: 'Coral', value: '#FF6B6B' },
    { name: 'Teal', value: '#4ECDC4' },
    { name: 'Gold', value: '#FFD93D' },
    { name: 'Purple', value: '#A8E6CF' },
    { name: 'Navy', value: '#2C3E50' },
    { name: 'Pink', value: '#FFB3BA' },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setAdditionalCost(prev => prev + 200); // Image upload costs extra
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTextChange = (newText: string) => {
    setText(newText);
    const textCost = newText.length > 0 ? 100 : 0;
    setAdditionalCost(prev => {
      const imageCost = uploadedImage ? 200 : 0;
      return textCost + imageCost;
    });
  };

  const handleAddToCart = () => {
    const personalization: CartItem['personalization'] = {
      text: text || undefined,
      image: uploadedImage || undefined,
      color: selectedColor,
      additionalCost
    };
    
    onAddToCart(personalization);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Customize Your Gift</h2>
            <p className="text-gray-600">{product.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          {/* Customization Options */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Type className="h-5 w-5 mr-2 text-coral" />
                Add Custom Text
              </h3>
              <textarea
                value={text}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder="Enter your message (optional)"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-coral focus:border-coral resize-none"
                rows={3}
                maxLength={100}
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>Add text for personal touch</span>
                <span>{text.length}/100</span>
              </div>
              {text && <span className="text-sm text-green-600">+KSh 100</span>}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Upload className="h-5 w-5 mr-2 text-coral" />
                Upload Photo
              </h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-coral transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  {uploadedImage ? (
                    <div className="space-y-2">
                      <img
                        src={uploadedImage}
                        alt="Uploaded"
                        className="w-20 h-20 object-cover rounded-lg mx-auto"
                      />
                      <p className="text-sm text-green-600">Photo uploaded successfully</p>
                      <p className="text-sm text-green-600">+KSh 200</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                      <p className="text-gray-600">Click to upload your photo</p>
                      <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Palette className="h-5 w-5 mr-2 text-coral" />
                Choose Color
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedColor === color.value
                        ? 'border-coral scale-105 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-full mx-auto mb-2"
                      style={{ backgroundColor: color.value }}
                    ></div>
                    <span className="text-sm font-medium">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
            >
              <Eye className="h-5 w-5" />
              <span>{previewMode ? 'Exit Preview' : 'Preview Design'}</span>
            </button>
          </div>

          {/* Preview */}
          <div className="space-y-6">
            <div className="relative">
              <h3 className="text-lg font-semibold mb-4">Preview</h3>
              <div className="bg-gray-50 rounded-2xl p-8 text-center relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className={`w-full max-w-xs mx-auto rounded-lg transition-all duration-500 ${
                    previewMode ? 'transform scale-110' : ''
                  }`}
                />
                
                {/* Overlay customizations */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white bg-opacity-90 rounded-lg p-4 max-w-xs">
                    {uploadedImage && (
                      <img
                        src={uploadedImage}
                        alt="Custom"
                        className="w-16 h-16 object-cover rounded-full mx-auto mb-2"
                      />
                    )}
                    {text && (
                      <p
                        className="font-semibold text-center"
                        style={{ color: selectedColor }}
                      >
                        {text}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold mb-3">Order Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>{product.name}</span>
                  <span>KSh {product.price.toLocaleString()}</span>
                </div>
                {text && (
                  <div className="flex justify-between text-green-600">
                    <span>Custom text</span>
                    <span>+KSh 100</span>
                  </div>
                )}
                {uploadedImage && (
                  <div className="flex justify-between text-green-600">
                    <span>Photo upload</span>
                    <span>+KSh 200</span>
                  </div>
                )}
                <div className="border-t pt-2 font-semibold flex justify-between">
                  <span>Total</span>
                  <span>KSh {(product.price + additionalCost).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-coral text-white py-4 rounded-lg font-semibold text-lg hover:bg-coral-dark transition-colors flex items-center justify-center space-x-2 transform hover:scale-105"
            >
              <Plus className="h-5 w-5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}