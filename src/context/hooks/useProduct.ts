import { doc, onSnapshot} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import type { Product } from "../../types";

export function useProduct(id?: string) {
    const [item, setItem] = useState<Product | null>(null);
    const [loading, setLoading] = useState(!!id);


    useEffect(() => {
        if (!id) {
            setItem(null);
            setLoading(false);
            return;
        }

        const unsub = onSnapshot(doc(db, "products", id), (d) => {
            setItem({ id: d.id, ...(d.data() as Omit<Product, "id">)
            });
            setLoading(false);   
        });
        return () => unsub();
    }, [id]);

    return {item, loading};
}
