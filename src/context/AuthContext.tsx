import { createContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase";
import { onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth";
import type { User } from "firebase/auth";

type AuthCtx = {
    user: User | null;
    loading: boolean;
    signInGoogle: () => Promise<void>;
    signOutApp: () => Promise<void>;
};

const AuthContext = createContext<AuthCtx>({
    user: null,
    loading: true,
    signInGoogle: async () => {},
    signOutApp: async () => {},
});

export function AuthProvider({ children }: {children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, u => {
            setUser(u ?? null);
            setLoading(false);
        })
        return () => unsub();
    }, []);

    const signInGoogle = async () => {
        await signInWithPopup(auth, googleProvider);
    };

    const signOutApp = async () => {
        await signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ user, loading, signInGoogle, signOutApp }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;