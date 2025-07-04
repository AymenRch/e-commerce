import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import CartItem from '../components/CartItem';
import axios from 'axios';

const Cart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  

  const increaseQuantity = (id) => {
    const token = localStorage.getItem('token');
    axios.put(`http://localhost:5000/auth/update-cart`, { id, action: 'increase' })
      .then(response => {
        // Refetch cart from backend
        fetchCart();
      })
      .catch(error => {
        console.error('Error updating cart:', error);
      });
  };

  const decreaseQuantity = (id) => {
    const token = localStorage.getItem('token');

    axios.put(`http://localhost:5000/auth/update-cart`, { id, action: 'decrease' })
      .then(response => {
        // Refetch cart from backend
        fetchCart();
      })
      .catch(error => {
        console.error('Error updating cart:', error);
      });
  };

  const removeItem = (id) => {
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:5000/auth/remove-cart-item`, { data: { id } })
      .then(response => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
      })
      .catch(error => {
        console.error('Error removing cart item:', error);
      });
  };

  const clearCart = () => {
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:5000/auth/clear-cart`, { data: { token } })
      .then(response => {
        setCartItems([]);
      })
      .catch(error => {
        console.error('Error clearing cart:', error);
      });
  };

  const fetchCart = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:5000/auth/cart/${token}`);
      setCartItems(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  let total = 0;
  for (const item of cartItems) {
    total += item.sizes.price * item.quantity;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-cream-200 rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag size={32} className="text-gray-400" />
          </div>
          <h2 className="font-serif text-2xl font-semibold text-charcoal-900 mb-2">
            Loading your cart...
          </h2>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-cream-200 rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag size={32} className="text-gray-400" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-semibold text-charcoal-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Discover our beautiful collection of luxury perfumes.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center space-x-2 bg-charcoal-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-charcoal-800 transition-colors"
            >
              <span>Start Shopping</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Header */}
          <div className="px-6 py-4 border-b border-cream-200">
            <h1 className="font-serif text-2xl font-semibold text-charcoal-900">
              Shopping Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
            </h1>
          </div>

          {/* Cart Items */}
          <div className="px-6">
            {cartItems.map((item) => (
              <CartItem
                key={`${item.id}-${item.size}`}
                item={item}
                onIncrease={() => increaseQuantity(item.id)}
                onDecrease={() => decreaseQuantity(item.id)}
                onRemove={() => removeItem(item.id)}
              />
            ))}
          </div>

          {/* Cart Summary */}
          <div className="px-6 py-6 border-t border-cream-200">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={clearCart}
                className="text-sm text-red-600 hover:text-red-700 transition-colors"
              >
                Clear Cart
              </button>
              <Link
                to="/shop"
                className="text-sm text-charcoal-900 hover:text-charcoal-800 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping:</span>
                <span className="text-green-600">FREE</span>
              </div>
              <div className="flex justify-between text-lg font-semibold text-charcoal-900 pt-2 border-t border-cream-200">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="w-full bg-charcoal-900 text-white py-4 px-6 rounded-lg font-medium hover:bg-charcoal-800 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={20} />
            </Link>

            <p className="text-xs text-gray-500 text-center mt-4">
              * Cash on Delivery available • Free shipping across Algeria
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 