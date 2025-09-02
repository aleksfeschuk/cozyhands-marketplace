import { createContext } from "react";
import type { User } from "firebase/auth";


type AuthCtx = {
    user: User | null;
    loading: boolean;
    signInGoogle: () => Promise<void>;
    signOutApp: () => Promise<void>;
};

export const  AuthContext = createContext<AuthCtx>({
    user: null,
    loading: true,
    signInGoogle: async () => {},
    signOutApp: async () => {},
});

