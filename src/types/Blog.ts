import type { Timestamp } from "firebase/firestore";

export type PostBase = {
    title: string;
    slug: string;
    coverImage?: string;
    excerpt: string;
    content: string;
    tags?: string[];
    createdAt: Timestamp | Date;
};

export type Post = PostBase & { id: string };