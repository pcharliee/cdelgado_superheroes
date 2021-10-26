import { createContext, useState, useContext, useEffect } from "react";

export const CartContext = createContext([]);

export const CartProvider = ({ children }) => {
  const [ cartItems, setCartItems ] = useState([]);
  const [ price, setPrice ] = useState(() => {
    if(!cartItems.length) return 0;
    let currentPrice = 0;
    cartItems?.map(item => {
      return currentPrice += item.price;
    });
    return currentPrice;
  });

  useEffect(() => {
    let currentPrice = 0;
    cartItems?.map(item => {
      return currentPrice += (item.price * item.quantity);
    });
    setPrice(currentPrice);
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, price, setPrice }}>
      {children}
    </CartContext.Provider>
  )
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) console.log('CartContext not available here');
  return context;
};