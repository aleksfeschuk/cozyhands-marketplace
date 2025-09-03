import { useEffect, useMemo, useState } from "react";
import {
  doc,
  onSnapshot,
  updateDoc,
  setDoc,
  arrayUnion,
  arrayRemove,
  getDoc
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "./hooks/useAuth";
import { WishlistContext } from "./WishlistContext";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [ids, setIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("wishlist") || "[]");
    } catch {
      return [];
    }
  });

  // Локальне збереження для гостей
  useEffect(() => {
    if (!user) {
      localStorage.setItem("wishlist", JSON.stringify(ids));
    }
  }, [ids, user]);

  // Для авторизованих синхронізація з Firestore
  useEffect(() => {
    if (!user) return;

    const ref = doc(db, "users", user.uid);

    (async () => {
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        await setDoc(ref, { wishlist: ids, role: "user" }, { merge: true });
      } else {
        const remote = Array.isArray(snap.data()?.wishlist)
          ? (snap.data()!.wishlist as string[])
          : [];
        const merged = Array.from(new Set([...remote, ...ids]));
        if (merged.length !== remote.length) {
          await updateDoc(ref, { wishlist: merged });
        }
      }

      localStorage.removeItem("wishlist");
    })();

    const unsub = onSnapshot(ref, (d) => {
      const remote = Array.isArray(d.data()?.wishlist)
        ? (d.data()!.wishlist as string[])
        : [];
      setIds(remote);
    });

    return () => unsub();
  }, [user?.uid]);

  const has = (id: string) => ids.includes(id);

  const toggle = async (id: string) => {
    if (!user) {
      setIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
      return;
    }

    const ref = doc(db, "users", user.uid);
    await updateDoc(ref, {
      wishlist: has(id) ? arrayRemove(id) : arrayUnion(id),
    });
  };

  const value = useMemo(() => ({ ids, has, toggle }), [ids]);

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}
