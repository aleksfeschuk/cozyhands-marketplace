// interfaces for e-commerce application types
export interface Product {
    id: string;
    title: string;
    price: number;
    category: string;
    description: string;
    imageUrl: string;
}

export interface CartItem {
    id: string;
    title: string;
    price: number;
    quantity: number;
    imageUrl: string;
}

export interface User {
    uid: string;
    email: string | null;
    role?: "admin" | "user";
}