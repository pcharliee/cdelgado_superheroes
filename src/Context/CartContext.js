import { createContext } from "react";

export const CartContext = createContext([]);

//refactor para que devuelta CartContext.Provider y reciba como props {children}