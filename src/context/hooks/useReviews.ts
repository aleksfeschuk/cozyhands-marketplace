import { useEffect, useState } from "react";
import { listenReviews, type Review } from "../../data/reviewsApi";

export function useReviews(productId?: string) {
    const [items, setItems] = useState<Review[]>([]);
    const [loading, setLoading] = useState(!!productId);

    useEffect(() => {
        if (!productId) {
            setItems([]);
            setLoading(false);
            return;
        }

        const unsub = listenReviews(productId, (arr) => {
            setItems(arr);
            setLoading(false);
        });
        return () => unsub();
    }, [productId])

    return { items, loading };
}