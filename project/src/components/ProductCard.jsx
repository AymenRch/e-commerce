import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-cream-200">
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        
        {/* Discount Badge */}
        {product.originalPrice && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </div>
        )}
        
        {/* Wishlist Button */}
        <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-cream-100">
          <Heart size={16} className="text-gray-600" />
        </button>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
            {product.brand}
          </p>
          <Link to={`/product/${product.id}`}>
            <h3 className="font-serif text-lg font-medium text-charcoal-900 hover:text-charcoal-800 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="mb-2">
          <p className="text-sm text-gray-600 capitalize">
            {product.category} • {product.fragranceFamily}
          </p>
        </div>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={`${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-2">
              ({product.reviews})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-lg text-charcoal-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <Link
            to={`/product/${product.id}`}
            className="bg-charcoal-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-charcoal-800 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 