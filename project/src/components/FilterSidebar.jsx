import React from 'react';
import { X } from 'lucide-react';
import { fragranceFamilies } from '../data/products';

const FilterSidebar = ({
  isOpen,
  onClose,
  filters,
  onFilterChange
}) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:sticky top-0 left-0 h-screen lg:h-auto w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } overflow-y-auto`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-md"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-6">
            {/* Sort By */}
            <div>
              <h3 className="font-medium text-charcoal-900 mb-3">Sort By</h3>
              <select
                value={filters.sortBy}
                onChange={(e) => onFilterChange('sortBy', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-charcoal-800"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <h3 className="font-medium text-charcoal-900 mb-3">Category</h3>
              <div className="space-y-2">
                {['all', 'men', 'women', 'unisex'].map((category) => (
                  <label key={category} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={filters.category === category}
                      onChange={(e) => onFilterChange('category', e.target.value)}
                      className="w-4 h-4 text-charcoal-900 focus:ring-charcoal-800"
                    />
                    <span className="ml-2 text-sm capitalize">
                      {category === 'all' ? 'All Categories' : category}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Fragrance Family */}
            <div>
              <h3 className="font-medium text-charcoal-900 mb-3">Fragrance Family</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="fragranceFamily"
                    value=""
                    checked={filters.fragranceFamily === ''}
                    onChange={(e) => onFilterChange('fragranceFamily', e.target.value)}
                    className="w-4 h-4 text-charcoal-900 focus:ring-charcoal-800"
                  />
                  <span className="ml-2 text-sm">All Families</span>
                </label>
                {fragranceFamilies.map((family) => (
                  <label key={family} className="flex items-center">
                    <input
                      type="radio"
                      name="fragranceFamily"
                      value={family}
                      checked={filters.fragranceFamily === family}
                      onChange={(e) => onFilterChange('fragranceFamily', e.target.value)}
                      className="w-4 h-4 text-charcoal-900 focus:ring-charcoal-800"
                    />
                    <span className="ml-2 text-sm">{family}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-medium text-charcoal-900 mb-3">Price Range</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.priceRange[0] || ''}
                    onChange={(e) =>
                      onFilterChange('priceRange', [
                        Number(e.target.value) || 0,
                        filters.priceRange[1]
                      ])
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-charcoal-800 text-sm"
                  />
                  <span className="text-gray-400">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.priceRange[1] || ''}
                    onChange={(e) =>
                      onFilterChange('priceRange', [
                        filters.priceRange[0],
                        Number(e.target.value) || 1000
                      ])
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-charcoal-800 text-sm"
                  />
                </div>
                <div className="text-xs text-gray-500">
                  Current: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                onFilterChange('category', 'all');
                onFilterChange('fragranceFamily', '');
                onFilterChange('priceRange', [0, 1000]);
                onFilterChange('sortBy', 'featured');
              }}
              className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar; 