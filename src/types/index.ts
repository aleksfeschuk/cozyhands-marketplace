export * from "./Blog";

// interfaces for e-commerce application types
export interface Product {
    id: string;
    title: string;
    price: number;
    category: string;
    description: string;
    imageUrl: string;
    imagePath?: string;
    discount?: number;
    featured?: boolean;
    ratingAvg?: number;
    ratingCount?: number;
    createdAt?: string;
}

export interface Review {
    id: string;
    productId: string;
    author: string;
    rating: number;
    text: string;
    date: string;
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

