import { createContext } from "react";

type WishlistCtx = {
    ids: string[];
    toggle: (id: string) => void;
    has: (id: string) => boolean;
};

export const WishlistContext = createContext<WishlistCtx>({
    ids: [],
    toggle: () => {},
    has: () => false,
})






