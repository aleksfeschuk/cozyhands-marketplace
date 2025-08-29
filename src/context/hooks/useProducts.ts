import { useEffect, useState } from "react";
import { listenProducts } from "../../data/productsApi";
import type { Product } from "../../types";

export function useProducts() {
    const [items, setItems] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = listenProducts((arr) => {
            setItems(arr);
            setLoading(false);
        });
        return () => unsub();
    }, []);

    return { items, loading };
}