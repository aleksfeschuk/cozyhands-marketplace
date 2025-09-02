import { createContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase";
import { onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth";
import type { User } from "firebase/auth";
import { ensureUser } from "../data/usersApi";

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
        try {
            const cred = await signInWithPopup(auth, googleProvider);
            await ensureUser(cred.user.uid, cred.user.email);
        } catch (e) {
            console.error("Login error", e);
        }
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