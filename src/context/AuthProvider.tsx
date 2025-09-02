import React, { useEffect, useState } from "react";
import { auth, googleProvider, db } from "../firebase";
import { onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import type { User } from "firebase/auth";
import { AuthContext } from "./AuthContext";

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
        const cred = await signInWithPopup(auth, googleProvider);
        const ref = doc(db, "users", cred.user.uid);
        const snap = await getDoc(ref);
        if (!snap.exists()) {
            await setDoc(ref, {
                uid: cred.user.uid,
                email: cred.user.email ?? "",
                role: "user",
                createdAt: serverTimestamp(),
            });
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



