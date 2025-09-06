import {
    collection,
    doc,
    serverTimestamp,
    setDoc
} from "firebase/firestore";
import { db } from "../firebase";

const emailToId = (email: string) => 
    email.trim().toLowerCase().replace(/[^a-z0-9._-]/g, "_");


export async function subscribeEmail(email: string, source = "home__newsletter") {
    const id = emailToId(email);

    await setDoc(
        doc(collection(db, "subscribers"), id),
        {
            email: email.trim().toLowerCase(),
            source,
            updatedAt: serverTimestamp(),
            createdAt: serverTimestamp(),
        },
        { merge: true}
    );
}

