import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext(undefined);

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, selectedSize } = action.payload;
      const existingItem = state.items.find(item => 
        item.product.id === product.id && item.selectedSize === selectedSize
      );

      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.product.id === product.id && item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          items: updatedItems,
          total: calculateTotal(updatedItems)
        };
      } else {
        const sizePrice = product.sizes.find(s => s.size === selectedSize)?.price || product.price;
        const newItem = {
          product: { ...product, price: sizePrice },
          quantity: 1,
          selectedSize
        };
        const updatedItems = [...state.items, newItem];
        return {
          items: updatedItems,
          total: calculateTotal(updatedItems)
        };
      }
    }
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.product.id !== action.payload);
      return {
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
    }
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        const updatedItems = state.items.filter(item => item.product.id !== id);
        return {
          items: updatedItems,
          total: calculateTotal(updatedItems)
        };
      }
      const updatedItems = state.items.map(item =>
        item.product.id === id ? { ...item, quantity } : item
      );
      return {
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
    }
    case 'CLEAR_CART':
      return { items: [], total: 0 };
    default:
      return state;
  }
};

const calculateTotal = (items) => {
  return items.reduce((total, item) => {
    const itemPrice = item.product.sizes.find(s => s.size === item.selectedSize)?.price || item.product.price;
    return total + (itemPrice * item.quantity);
  }, 0);
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  const addItem = (product, selectedSize) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, selectedSize } });
  };

  const removeItem = (productId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getItemCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      state,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getItemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 