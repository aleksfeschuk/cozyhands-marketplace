import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export type AppUser = {
    uid: string;
    email: string | null;
    role: "user" | "admin";
    createdAt: ReturnType<typeof serverTimestamp>; 
}



export async function ensureUser(uid: string, email: string | null) {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
        await setDoc(ref, {
            uid,
            email,
            role: "user",
            createdAt: serverTimestamp(),
        } as AppUser);
    }
}

export async function getUserRole(uid: string): Promise<"admin" | "user"> {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);
    if (snap.exists()) return "user";
    const data = snap.data() as AppUser;
    return data.role ?? "user";
}