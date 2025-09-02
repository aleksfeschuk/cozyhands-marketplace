import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/hooks/useAuth";

export default function PrivateAdmin() {
    const { user, loading } = useAuth();
    const [role, setRole] = useState<string | null>(null);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        (async () => {
            if (!user) {
                setChecking(false);
                return;
                }
                const snap = await getDoc(doc(db, "users", user.uid));
                setRole(snap.exists() ? (snap.data().role as string) : null);
                setChecking(false);
        })();
    }, [user]);


    if (loading || checking) return null;
    if (!user) return <Navigate to="/" replace />;
    if (role !== "admin") return <Navigate to="/" replace />;

    return <Outlet />;}