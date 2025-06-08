import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, MapPin, Phone, Mail, User, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { cities } from '../data/products';

const Checkout = () => {
  const { state, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    zipCode: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!shippingAddress.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!shippingAddress.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[+]?[0-9\s-()]+$/.test(shippingAddress.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (shippingAddress.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingAddress.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!shippingAddress.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!shippingAddress.address.trim()) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setShippingAddress(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create order
      const order = {
        id: Date.now(),
        items: state.items,
        total: state.total,
        shippingAddress,
        status: 'pending',
        createdAt: new Date()
      };

      // Store order in localStorage for demo
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      localStorage.setItem('orders', JSON.stringify([...existingOrders, order]));

      clearCart();
      navigate(`/order-confirmation/${order.id}`);
    } catch (error) {
      console.error('Order submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (state.items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-serif text-3xl font-bold text-charcoal-900 mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <MapPin size={20} className="text-charcoal-800" />
                  <h2 className="text-xl font-semibold text-charcoal-900">
                    Shipping Information
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={shippingAddress.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-charcoal-800 ${
                          errors.fullName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your full name"
                      />
                    </div>
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        value={shippingAddress.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-charcoal-800 ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="+213 555 123 456"
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email (Optional)
                    </label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        value={shippingAddress.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-charcoal-800 ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="your@email.com"
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City / Wilaya *
                    </label>
                    <select
                      value={shippingAddress.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-charcoal-800 ${
                        errors.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select your city</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address *
                    </label>
                    <textarea
                      value={shippingAddress.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      rows={3}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-charcoal-800 ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your full address including street, building number, etc."
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code (Optional)
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-charcoal-800"
                      placeholder="16000"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery Notes (Optional)
                    </label>
                    <textarea
                      value={shippingAddress.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-charcoal-800"
                      placeholder="Any special instructions for delivery..."
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <CreditCard size={20} className="text-charcoal-800" />
                  <h2 className="text-xl font-semibold text-charcoal-900">
                    Payment Method
                  </h2>
                </div>

                <div className="bg-cream-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-charcoal-900 rounded-full flex items-center justify-center">
                      <Truck size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-charcoal-900">Cash on Delivery</h3>
                      <p className="text-sm text-gray-600">Pay when you receive your order</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-charcoal-900 text-white py-4 px-6 rounded-lg font-medium hover:bg-charcoal-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-serif text-xl font-semibold text-charcoal-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {state.items.map((item) => (
                  <div key={`${item.product.id}-${item.selectedSize}`} className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-cream-100 rounded-lg overflow-hidden">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-charcoal-900">{item.product.name}</h3>
                      <p className="text-sm text-gray-600">
                        {item.selectedSize}ml × {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-charcoal-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-4 border-t border-cream-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span>${state.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping:</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-charcoal-900 pt-2 border-t border-cream-200">
                  <span>Total:</span>
                  <span>${state.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 