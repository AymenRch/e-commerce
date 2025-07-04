import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import axios from 'axios';

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    fragranceFamily: '',
    priceRange: [0, 1000],
    sortBy: 'featured'
  });
  const [products, setProducts] = useState([]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  useEffect(()=>{
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://ecom-back-ezn3.onrender.com/items/all'); // Adjust the endpoint as needed
        setProducts(response.data);
        setFilters(prev => ({ ...prev, category: 'all' }));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    
    fetchProducts();
  },[]);

  


  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.fragranceFamily.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = filters.category === 'all' || product.category === filters.category;
      
      const matchesFragranceFamily = !filters.fragranceFamily || 
                                   product.fragrance_family === filters.fragranceFamily;
      
      const matchesPrice = product.price >= filters.priceRange[0] && 
                          product.price <= filters.priceRange[1];

      return matchesSearch && matchesCategory && matchesFragranceFamily && matchesPrice;
    });

    // Sort products
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'popular':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
        break;
    }

    return filtered;
  }, [searchTerm, filters]);

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl lg:text-4xl font-bold text-charcoal-900 mb-4">
            Perfume Collection
          </h1>
          <p className="text-gray-600">
            Discover your perfect fragrance from our curated selection of luxury perfumes.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search perfumes, brands, or fragrance families..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-charcoal-800"
              />
            </div>

            {/* Filter Button (Mobile) */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <Filter size={20} />
              <span>Filters</span>
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}
          

          {/* Mobile Filter Sidebar */}
          <FilterSidebar
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            filters={filters}
            onFilterChange={handleFilterChange}
          />

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {filteredAndSortedProducts.length} of {products.length} products
              </p>
            </div>

            {/* Products */}
            {filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-cream-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={32} className="text-gray-400" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-charcoal-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or filter criteria.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilters({
                      category: 'all',
                      fragranceFamily: '',
                      priceRange: [0, 1000],
                      sortBy: 'featured'
                    });
                  }}
                  className="text-charcoal-900 hover:text-charcoal-800 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop; 