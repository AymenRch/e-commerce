import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, RefreshCw } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import axios from 'axios'

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://ecom-back-ezn3.onrender.com/items/all'); // Adjust the endpoint as needed
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    
    fetchProducts();
  },[]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-cream-100 to-cream-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="font-serif text-4xl lg:text-6xl font-bold text-charcoal-900">
                  Discover Your
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-charcoal-800 to-gray-600">
                    Signature Scent
                  </span>
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed max-w-md">
                  Explore our curated collection of luxury perfumes. From timeless classics 
                  to modern masterpieces, find the fragrance that tells your story.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/shop"
                  className="bg-charcoal-900 text-white px-8 py-4 rounded-lg font-medium hover:bg-charcoal-800 transition-colors flex items-center justify-center space-x-2 group"
                >
                  <span>Shop Collection</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/about"
                  className="border-2 border-charcoal-900 text-charcoal-900 px-8 py-4 rounded-lg font-medium hover:bg-charcoal-900 hover:text-white transition-colors text-center"
                >
                  Learn More
                </Link>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="font-serif text-2xl font-bold text-charcoal-900">500+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="font-serif text-2xl font-bold text-charcoal-900">50+</div>
                  <div className="text-sm text-gray-600">Premium Brands</div>
                </div>
                <div className="text-center">
                  <div className="font-serif text-2xl font-bold text-charcoal-900">4.9</div>
                  <div className="text-sm text-gray-600 flex items-center">
                    <Star size={14} className="text-yellow-400 fill-current mr-1" />
                    Rating
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-sage-100 to-cream-300 rounded-3xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/965990/pexels-photo-965990.jpeg"
                  alt="Luxury Perfume Collection"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Free Delivery</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-2xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <Shield size={16} className="text-blue-500" />
                  <span className="text-sm font-medium">Authentic</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-cream-200 rounded-full flex items-center justify-center mx-auto">
                <Truck size={24} className="text-charcoal-800" />
              </div>
              <h3 className="font-serif text-xl font-semibold">Cash on Delivery</h3>
              <p className="text-gray-600">
                Pay when you receive your order. Safe, secure, and convenient.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-cream-200 rounded-full flex items-center justify-center mx-auto">
                <Shield size={24} className="text-charcoal-800" />
              </div>
              <h3 className="font-serif text-xl font-semibold">Authentic Products</h3>
              <p className="text-gray-600">
                100% genuine fragrances from authorized distributors only.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-cream-200 rounded-full flex items-center justify-center mx-auto">
                <RefreshCw size={24} className="text-charcoal-800" />
              </div>
              <h3 className="font-serif text-xl font-semibold">Easy Returns</h3>
              <p className="text-gray-600">
                30-day return policy for unopened products. Your satisfaction guaranteed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-charcoal-900 mb-4">
              Featured Collection
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Handpicked fragrances that represent the finest in luxury perfumery. 
              Each scent tells a unique story and creates lasting memories.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {products.slice(0,4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/shop"
              className="inline-flex items-center space-x-2 bg-charcoal-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-charcoal-800 transition-colors group"
            >
              <span>View All Products</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-charcoal-900 mb-4">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah M.",
                text: "Amazing selection and fast delivery! My new favorite perfume arrived perfectly packaged.",
                rating: 5
              },
              {
                name: "Ahmed K.",
                text: "Authentic products at great prices. Cash on delivery makes it so convenient.",
                rating: 5
              },
              {
                name: "Fatima L.",
                text: "The customer service is excellent. They helped me find the perfect gift.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-cream-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <p className="font-medium text-charcoal-900">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 