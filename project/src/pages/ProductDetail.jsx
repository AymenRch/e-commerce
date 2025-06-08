import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingBag, Heart, Share2 } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const product = products.find(p => p.id === Number(id));
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Product not found</h2>
          <button
            onClick={() => navigate('/shop')}
            className="text-charcoal-900 hover:text-charcoal-800"
          >
            Return to shop
          </button>
        </div>
      </div>
    );
  }

  const images = product.images || [product.image];
  const relatedProducts = products.filter(p => 
    p.id !== product.id && 
    (p.fragranceFamily === product.fragranceFamily || p.category === product.category)
  ).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    addItem(product, selectedSize);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  useEffect(() => {
    if (product.sizes.length > 0) {
      setSelectedSize(product.sizes[0].size);
    }
  }, [product]);

  const selectedPrice = selectedSize 
    ? product.sizes.find(s => s.size === selectedSize)?.price || product.price
    : product.price;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-charcoal-900 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-cream-100 rounded-lg overflow-hidden">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {images.length > 1 && (
              <div className="flex space-x-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-charcoal-900' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide font-medium mb-2">
                {product.brand}
              </p>
              <h1 className="font-serif text-3xl lg:text-4xl font-bold text-charcoal-900 mb-4">
                {product.name}
              </h1>
              
              {/* Rating */}
              {product.rating && (
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              )}

              <div className="flex items-center space-x-4 mb-6">
                <span className="font-serif text-3xl font-bold text-charcoal-900">
                  ${selectedPrice}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Category and Fragrance Family */}
            <div className="flex items-center space-x-4 text-sm">
              <span className="bg-cream-200 px-3 py-1 rounded-full capitalize">
                {product.category}
              </span>
              <span className="bg-sage-200 px-3 py-1 rounded-full">
                {product.fragranceFamily}
              </span>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-charcoal-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Fragrance Notes */}
            <div className="space-y-4">
              <h3 className="font-semibold text-charcoal-900">Fragrance Notes</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-2">Top Notes</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {product.topNotes.map((note, index) => (
                      <li key={index}>• {note}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-2">Middle Notes</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {product.middleNotes.map((note, index) => (
                      <li key={index}>• {note}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-2">Base Notes</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {product.baseNotes.map((note, index) => (
                      <li key={index}>• {note}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold text-charcoal-900 mb-3">Size</h3>
              <div className="grid grid-cols-2 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size.size}
                    onClick={() => setSelectedSize(size.size)}
                    className={`p-3 border rounded-lg text-center transition-colors ${
                      selectedSize === size.size
                        ? 'border-charcoal-900 bg-charcoal-900 text-white'
                        : 'border-gray-300 hover:border-charcoal-900'
                    }`}
                  >
                    <div className="font-medium">{size.size}</div>
                    <div className="text-sm opacity-75">${size.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`w-full flex items-center justify-center space-x-2 py-4 px-6 rounded-lg font-medium transition-colors ${
                  addedToCart
                    ? 'bg-green-600 text-white'
                    : 'bg-charcoal-900 text-white hover:bg-charcoal-800 disabled:bg-gray-300 disabled:cursor-not-allowed'
                }`}
              >
                <ShoppingBag size={20} />
                <span>
                  {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
                </span>
              </button>

              <div className="flex space-x-4">
                <button className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Heart size={18} />
                  <span>Save</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Share2 size={18} />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="font-serif text-2xl font-bold text-charcoal-900 mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail; 