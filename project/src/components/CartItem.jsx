import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const itemPrice = item.product.sizes.find(s => s.size === item.selectedSize)?.price || item.product.price;
  const totalPrice = itemPrice * item.quantity;

  return (
    <div className="flex items-center space-x-4 py-6 border-b border-cream-200">
      <img
        src={item.product.image}
        alt={item.product.name}
        className="w-20 h-20 object-cover rounded-lg"
      />
      
      <div className="flex-1">
        <h3 className="font-medium text-charcoal-900">{item.product.name}</h3>
        <p className="text-sm text-gray-600">{item.product.brand}</p>
        <p className="text-sm text-gray-600">Size: {item.selectedSize}</p>
        <p className="text-sm font-medium text-charcoal-900">${itemPrice}</p>
      </div>

      <div className="flex items-center space-x-3">
        <div className="flex items-center border border-gray-300 rounded-md">
          <button
            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
            className="p-2 hover:bg-gray-100 transition-colors"
            disabled={item.quantity <= 1}
          >
            <Minus size={16} />
          </button>
          <span className="px-3 py-2 text-sm font-medium min-w-[3rem] text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
            className="p-2 hover:bg-gray-100 transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>

        <div className="text-right">
          <p className="font-semibold text-charcoal-900">${totalPrice.toFixed(2)}</p>
        </div>

        <button
          onClick={() => onRemove(item.product.id)}
          className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default CartItem; 