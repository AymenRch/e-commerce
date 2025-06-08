import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, Phone, Home } from 'lucide-react';

const OrderConfirmation = () => {
  const { orderId } = useParams();

  // In a real app, you'd fetch the order details from your backend
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const order = orders.find((o) => o.id === Number(orderId));

  if (!order) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Order not found</h2>
          <Link to="/" className="text-charcoal-900 hover:text-charcoal-800">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={40} className="text-green-600" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-charcoal-900 mb-2">
              Order Confirmed!
            </h1>
            <p className="text-gray-600">
              Thank you for your order. We'll prepare your fragrance with care.
            </p>
          </div>

          {/* Order Details */}
          <div className="border border-cream-200 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-charcoal-900">
                Order #{order.id}
              </h2>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
                {order.status}
              </span>
            </div>

            <div className="space-y-4">
              {order.items.map((item, index) => {
                const itemPrice = item.product.sizes.find((s) => s.size === item.selectedSize)?.price || item.product.price;
                return (
                  <div key={index} className="flex items-center space-x-4 py-3 border-b border-cream-100 last:border-b-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-charcoal-900">{item.product.name}</p>
                      <p className="text-sm text-gray-600">{item.product.brand}</p>
                      <p className="text-sm text-gray-600">Size: {item.selectedSize} • Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-charcoal-900">
                      ${(itemPrice * item.quantity).toFixed(2)}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-cream-200">
              <div className="flex justify-between text-lg font-semibold text-charcoal-900">
                <span>Total:</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Payment: Cash on Delivery</p>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="border border-cream-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-charcoal-900 mb-4">Shipping Information</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Name:</strong> {order.shippingAddress.fullName}</p>
              <p><strong>Phone:</strong> {order.shippingAddress.phone}</p>
              {order.shippingAddress.email && (
                <p><strong>Email:</strong> {order.shippingAddress.email}</p>
              )}
              <p><strong>City:</strong> {order.shippingAddress.city}</p>
              <p><strong>Address:</strong> {order.shippingAddress.address}</p>
              {order.shippingAddress.zipCode && (
                <p><strong>ZIP:</strong> {order.shippingAddress.zipCode}</p>
              )}
              {order.shippingAddress.notes && (
                <p><strong>Notes:</strong> {order.shippingAddress.notes}</p>
              )}
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-cream-50 border border-cream-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-charcoal-900 mb-4">What happens next?</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Package size={20} className="text-charcoal-800 mt-0.5" />
                <div>
                  <p className="font-medium text-charcoal-900">Order Processing</p>
                  <p className="text-sm text-gray-600">We'll carefully prepare and package your order within 24 hours.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Truck size={20} className="text-charcoal-800 mt-0.5" />
                <div>
                  <p className="font-medium text-charcoal-900">Delivery</p>
                  <p className="text-sm text-gray-600">Your order will be delivered within 2-5 business days across Algeria.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone size={20} className="text-charcoal-800 mt-0.5" />
                <div>
                  <p className="font-medium text-charcoal-900">Contact</p>
                  <p className="text-sm text-gray-600">Our delivery partner will call you before delivery to confirm your availability.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/shop"
              className="flex-1 bg-charcoal-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-charcoal-800 transition-colors text-center"
            >
              Continue Shopping
            </Link>
            <Link
              to="/"
              className="flex-1 border border-charcoal-900 text-charcoal-900 py-3 px-6 rounded-lg font-medium hover:bg-charcoal-900 hover:text-white transition-colors text-center flex items-center justify-center space-x-2"
            >
              <Home size={18} />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Contact Info */}
          <div className="mt-8 p-4 bg-sage-100 border border-sage-200 rounded-lg text-center">
            <p className="text-sm text-gray-700">
              Questions about your order? Contact us at{' '}
              <a href="tel:+213555123456" className="font-medium text-charcoal-900 hover:text-charcoal-800">
                +213 555 123 456
              </a>
              {' '}or{' '}
              <a href="mailto:info@scentspace.dz" className="font-medium text-charcoal-900 hover:text-charcoal-800">
                info@scentspace.dz
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation; 