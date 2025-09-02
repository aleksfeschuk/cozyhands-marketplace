import { useEffect, useState }  from "react";
import { db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";

export function useUserRole() {
  const { user } = useAuth();
  const [role, setRole] = useState<"admin" | "user" | null>(null);
  const [loading, setLoading] = useState(!!user);

  useEffect(() => {
    if (!user) { setRole(null); setLoading(false); return; }
    const unsub = onSnapshot(doc(db, "users", user.uid), (d) => {
      setRole((d.data()?.role ?? "user") as "admin" | "user");
      setLoading(false);
    });
    return () => unsub();
  }, [user]);

  return { role, loading };
}