import { createContext } from "react";

export type WishlistCtx = {
  ids: string[];
  has: (id: string) => boolean;
  toggle: (id: string) => void;
};

export const WishlistContext = createContext<WishlistCtx>({
  ids: [],
  has: () => false,
  toggle: () => {},
});
