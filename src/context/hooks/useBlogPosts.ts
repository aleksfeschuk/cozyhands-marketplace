import { useEffect, useState } from "react";
import { listenPosts, type Post} from "../../data/postApi";

export function useBlogPosts() {
    const [items, setItems] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const unsub = listenPosts((arr) => {
            setItems(arr);
            setLoading(false);
        });
        return () => unsub();
    }, []);

    return {items, loading};
}