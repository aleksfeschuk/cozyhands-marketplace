
import { useEffect, useState, type ReactNode} from "react";
import { WishlistContext } from "./WishListContext";

export function WishlistProvider({ children }: {children: ReactNode}) {
    const [ids, setIds] = useState<string[]>(() => {
        try {
            return JSON.parse(localStorage.getItem("wishlist") || "[]");
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(ids));
    }, [ids]);

    const toggle = (id: string) => 
        setIds((prev) => prev.includes(id) ? prev.filter(x => x !== id ) : [...prev, id]);

    const has = (id: string) => ids.includes(id);

    return (
        <WishlistContext.Provider value={{ ids, toggle, has}}>
            {children}
        </WishlistContext.Provider>
    )
}