import {
    collection, 
    addDoc,
    onSnapshot,
    query,
    where, 
    orderBy,
    serverTimestamp,
    Timestamp
} from "firebase/firestore";

import { db } from "../firebase";

// Type for data that we send to Firestore when creating a review

export type ReviewDocWrite = {
    productId: string;
    author: string;
    rating: number;
    text: string;
    userId?: string | null;
};

export type ReviewDoc = ReviewDocWrite & {
    createdAt: Timestamp | null;
};


export type Review = ReviewDoc & { id: string };

export function listenReviews(productId: string, cb: (items: Review[]) => void) {
    const q = query (
        collection(db, "reviews"),
        where("productId", "==", productId),
        orderBy("createdAt", "desc")        
    );

    return onSnapshot(q, (snap) => {
        const arr: Review[] = snap.docs.map((d) => ({
            id: d.id,
            ...(d.data() as ReviewDoc),
        }));
        cb(arr);
    });
}

export async function addReview(data: ReviewDocWrite) {
    const payload: ReviewDoc = {
        ...data,
        createdAt: serverTimestamp() as unknown as Timestamp,
    };
    await addDoc(collection(db, "reviews"), payload);
}