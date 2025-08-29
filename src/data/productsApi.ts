import {
    collection,
    addDoc,
    doc,
    updateDoc,
    deleteDoc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp,
    type Unsubscribe,
} from "firebase/firestore";
import { db } from "../firebase";
import type { Product } from "../types";

export type ProductWrite = Omit<Product, "id" | "createdAt" | "updatedAt">;
 
const COL = "products";

export function listenProducts(cb: (items: Product[]) => void): Unsubscribe {
    const q = query(collection(db, COL), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snap) => {
        const arr: Product[] = snap.docs.map((d) => ({
            id: d.id,
            ...(d.data() as Omit<Product, "id">),
        }));
            cb(arr);
    });
}

export async function addProduct(data: ProductWrite): Promise<void> 
    {
        await addDoc(collection(db, COL), {
            ...data,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
    }

export async function updateProduct(
    id: string,
    data: Partial<Product>
): Promise<void> {
    {
        await updateDoc(doc(db, COL, id), {
            ...data, 
            updatedAt: serverTimestamp() 
        });
    }
}

export async function deleteProduct(id: string) {
    await deleteDoc(doc(db, COL, id));
}