import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    limit,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
    where,
    type DocumentData,
} from "firebase/firestore";
import type { Timestamp } from "firebase/firestore";
import { db } from "../firebase";

export type PostWrite = {
    title: string;
    slug: string;
    excerpt: string;
    coverImage: string; 
    content: string;    //markdown
    tags: string[]; // ["react", "ui"];
};

export type PostDoc = PostWrite & {
    createdAt?: Timestamp | null;
    updatedAt?: Timestamp | null;
};

export type Post = PostWrite & {
    id: string;
    createdAt?: Timestamp | null;
    updatedAt?: Timestamp | null;
};

const COL = "posts";


// live listing
export function listenPosts(cb: (items: Post[]) => void) {
    const q = query(collection(db, COL), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snap) => {
        const arr: Post[] = snap.docs.map((d) => ({
            id: d.id,
            ...(d.data() as PostDoc),
        }));
        cb(arr);
    });
};


export function listenPostBySlug(slug: string, cb: (item: Post | null) => void) {
    const q = query(collection(db, COL), where("slug", "==", slug), limit(1));
    return onSnapshot(q, (snap) => {
        if (snap.empty) return cb(null);
        const d = snap.docs[0];
        cb({ id: d.id, ...(d.data() as PostDoc) });
    });
}


async function ensureUniqueSlug(slug: string, exceptId?: string) {
    const q = query(collection(db, COL), where("slug", "==", slug), limit(1));
    const r = await getDocs(q);
    if (!r.empty && r.docs[0].id !== exceptId) {
        throw new Error("Slug must be unique");
    }
}

export async function addPost(data: PostWrite) {
    await ensureUniqueSlug(data.slug);
    await addDoc(collection(db, COL), {
        ...data, 
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    } as DocumentData);
}

export async function updatePost(id: string, data: Partial<PostWrite>) {
    if (data.slug) await ensureUniqueSlug(data.slug, id);
    await updateDoc(doc(db, COL, id), {
        ...data,
        updatedAt: serverTimestamp(),
    });
}

export async function deletePost(id: string) {
    await deleteDoc(doc(db, COL, id));
}