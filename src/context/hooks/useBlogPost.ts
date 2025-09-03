import { useEffect, useState } from "react";
import { listenPostBySlug, type Post } from "../../data/postApi";

export function useBlogPost(slug?: string) {
    const [item, setItem] = useState<Post | null>(null);
    const [loading, setLoading] = useState(!!slug);

    useEffect(() => {
        if (!slug) {
            setItem(null);
            setLoading(false);
            return;
        }

        const unsub = listenPostBySlug(slug, (p) => {
            setItem(p);
            setLoading(false);
        });
        return () => unsub();
    }, [slug]);

    return {item, loading};
}