import { createContext, useContext} from "react";
import type { CartItem } from "../types/index";

// // Define the context type for the cart 
export interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
};


// Create a context with an initial value of undefined
export const CartContext = createContext<CartContextType> ({
    cartItems: [],
    addToCart: () => {},
    removeFromCart: () => {},
    updateQuantity: () => {},
});


// Custom hook to use the CartContext for used in components

export const useCart = () =>  useContext(CartContext); 