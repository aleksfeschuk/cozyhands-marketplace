import {
    addDoc,
    collection,
    serverTimestamp
} from "firebase/firestore";
import { db } from "../firebase";
import type { CartItem } from "../types";

export type OrderWrite = {
    cartItems: Array<Pick<CartItem, "id" | "title" | "price" | "quantity" | "imageUrl">>;
    applicantName: string;
    applicantEmail: string;
    total: number;
    source?: string;
};

export async function createOrder(data: OrderWrite) {
   
    const payload = {
        ...data,
        applicantName: data.applicantName.trim(),
        applicantEmail: data.applicantEmail.trim().toLowerCase(),
        createdAt: serverTimestamp(),
        status: "new",
    };

    const ref = await addDoc(collection(db, "orders"), payload);
    return ref.id;
}