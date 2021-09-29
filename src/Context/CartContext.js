import { createContext, useState, useContext } from "react";

export const CartContext = createContext([]);

export const CartProvider = ({ children }) => {
  const [ cartItems, setCartItems ] = useState([]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  )
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) console.log('CartContext not available here');
  return context;
};