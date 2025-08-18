import { useEffect, useState } from "react";
import type { ReactElement } from "react";
import type { CartItem } from "../types/index";
import  { CartContext } from "./CartContext";

interface CartProviderProps {
    children: ReactElement | ReactElement[];
}


// component to provide cart context to children components
// This component will manage the cart state and provide functions to manipulate it
export const CartProvider = ({ children }: CartProviderProps) => {
    
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const savedCard = localStorage.getItem("cartItems");
        return savedCard ? JSON.parse(savedCard) : [];
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]) 

    const addToCart = (item: CartItem) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((i) => i.id === item.id);
            if (existingItem) {
                return prevItems.map((i) => 
                    i.id === item.id ? {...i, quantity: i.quantity + item.quantity} : i
                );
            }
            return [...prevItems, item];
        });
    };

    const removeFromCart = (id: string) => {
        setCartItems((prevItems) => prevItems.filter((i) => i.id !== id));
    };

    const updateQuantity = (id: string, quantity: number) => {
        setCartItems((prevItems) => 
            prevItems.map((i) => 
                i.id === id ? {...i, quantity: Math.max(1, quantity)} : i))
    };

    return (
        <CartContext.Provider 
            value={{ cartItems, addToCart, removeFromCart, updateQuantity}}>
            {children}    
        </CartContext.Provider>
    );
};