import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

// cart context provider
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // function to add cart item
  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  // function to remove cart item
  const removeFromCart = (itemToRemove) => {
    const updatedCart = cart.filter((item) => item !== itemToRemove);
    setCart(updatedCart);
  };

  // calculate total number of items selected
  const totalItemsInCart = cart.reduce((total, item) => total + 1, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalItemsInCart }}>
      {children}
    </CartContext.Provider>
  );
};
