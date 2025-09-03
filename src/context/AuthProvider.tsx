import React, { useEffect, useState } from "react";
import { auth, googleProvider, db } from "../firebase";
import { onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
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
        const ADMIN_EMAILS = ["aleksfeschuk@gmail.com"];

        const cred = await signInWithPopup(auth, googleProvider);
        const ref = doc(db, "users", cred.user.uid);

        
        const role = ADMIN_EMAILS.includes(cred.user.email ?? "") ? "admin" : "user";

            await setDoc(
                ref, 
                {
                    uid: cred.user.uid,
                    email: cred.user.email ?? "",
                    role,
                    createdAt: serverTimestamp(),
                },
            {merge: true});
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



