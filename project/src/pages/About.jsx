import React from 'react';
import { Heart, Award, Truck, Shield, Users, Star } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-cream-100 to-cream-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-serif text-4xl lg:text-6xl font-bold text-charcoal-900 mb-6">
              About ScentSpace
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're passionate about helping you discover your signature scent. Since our founding, 
              we've been dedicated to bringing you the finest collection of authentic luxury perfumes 
              from around the world.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-charcoal-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in the heart of Algeria, ScentSpace began as a dream to make luxury 
                  fragrances accessible to everyone. We believe that the right perfume is more 
                  than just a scent – it's an expression of your personality, a confidence booster, 
                  and a way to create lasting memories.
                </p>
                <p>
                  Our journey started with a simple mission: to curate the world's most beautiful 
                  fragrances and deliver them directly to your doorstep. Today, we're proud to 
                  serve customers across Algeria with our carefully selected collection of 
                  authentic perfumes from renowned international brands.
                </p>
                <p>
                  Every fragrance in our collection is personally tested and approved by our 
                  expert team. We work directly with authorized distributors to ensure that 
                  every bottle you receive is 100% authentic and of the highest quality.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-sage-100 to-cream-300 rounded-3xl overflow-hidden">
                <img
                  src="https://media.glamourmagazine.co.uk/photos/639362467b473e3dc755fb1e/16:9/w_2580,c_limit/BEST%20PERFUME%20FOR%20WOMEN%2091222_SF.jpg?mbid=social_retweet"
                  alt="Perfume Collection"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-charcoal-900 mb-4">
              Our Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do, from selecting our products 
              to serving our customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-cream-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield size={24} className="text-charcoal-800" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-charcoal-900 mb-3">
                Authenticity
              </h3>
              <p className="text-gray-600">
                Every product is sourced directly from authorized distributors. 
                We guarantee 100% authentic fragrances, no exceptions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-cream-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart size={24} className="text-charcoal-800" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-charcoal-900 mb-3">
                Passion
              </h3>
              <p className="text-gray-600">
                We're fragrance enthusiasts who understand the emotional connection 
                between people and their favorite scents.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-cream-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={24} className="text-charcoal-800" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-charcoal-900 mb-3">
                Quality
              </h3>
              <p className="text-gray-600">
                From our product selection to our packaging and delivery, 
                we maintain the highest standards in everything we do.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-cream-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={24} className="text-charcoal-800" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-charcoal-900 mb-3">
                Customer First
              </h3>
              <p className="text-gray-600">
                Your satisfaction is our priority. We're here to help you find 
                the perfect fragrance and ensure a smooth shopping experience.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-cream-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck size={24} className="text-charcoal-800" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-charcoal-900 mb-3">
                Convenience
              </h3>
              <p className="text-gray-600">
                With cash on delivery and free shipping across Algeria, 
                we make luxury fragrances accessible and convenient.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-cream-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star size={24} className="text-charcoal-800" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-charcoal-900 mb-3">
                Excellence
              </h3>
              <p className="text-gray-600">
                We continuously strive to exceed expectations and set new 
                standards in the fragrance retail industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-charcoal-900 mb-4">
              Why Choose ScentSpace?
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-cream-100 to-sage-200 rounded-3xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/965990/pexels-photo-965990.jpeg"
                  alt="Luxury Perfumes"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-charcoal-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal-900 mb-2">Curated Selection</h3>
                  <p className="text-gray-600">
                    Our expert team carefully selects each fragrance, ensuring you have access 
                    to only the finest and most sought-after scents from top international brands.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-charcoal-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal-900 mb-2">Local Expertise</h3>
                  <p className="text-gray-600">
                    As an Algerian company, we understand local preferences and climate considerations, 
                    helping you choose fragrances that work perfectly in our environment.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-charcoal-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal-900 mb-2">Secure Shopping</h3>
                  <p className="text-gray-600">
                    With our cash on delivery option, you can shop with confidence. 
                    No need to worry about online payments – pay when you receive your order.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-charcoal-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal-900 mb-2">Fast Delivery</h3>
                  <p className="text-gray-600">
                    We deliver across all 48 wilayas of Algeria within 2-5 business days, 
                    with careful packaging to ensure your fragrances arrive in perfect condition.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-charcoal-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="font-serif text-4xl lg:text-5xl font-bold mb-2">500+</div>
              <div className="text-gray-300">Happy Customers</div>
            </div>
            <div>
              <div className="font-serif text-4xl lg:text-5xl font-bold mb-2">50+</div>
              <div className="text-gray-300">Premium Brands</div>
            </div>
            <div>
              <div className="font-serif text-4xl lg:text-5xl font-bold mb-2">48</div>
              <div className="text-gray-300">Wilayas Covered</div>
            </div>
            <div>
              <div className="font-serif text-4xl lg:text-5xl font-bold mb-2">100%</div>
              <div className="text-gray-300">Authentic Products</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 