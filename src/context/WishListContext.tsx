import { createContext, useContext, useEffect, useState} from "react";

type WishlistCtx = {
    ids: string[];
    toggle: (id: string) => void;
    has: (id: string) => boolean;
};

const Ctx = createContext<WishlistCtx>({ ids: [], toggle: () => {}, has: () => false });

export function WishlistProvider({ children }: {children: React.ReactNode}) {
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

    return <Ctx.Provider value={{ids, toggle, has}}>
        {children}
    </Ctx.Provider>
    
}

export const useWishlist = () => useContext(Ctx);

