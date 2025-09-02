import { useEffect, useState }  from "react";
import { getUserRole }  from "../../data/usersApi";
import type { User } from "firebase/auth";

export function useUserRole(user: User | null) {
    const [role, setRole] = useState<"admin" | "user">("user");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        async function run() {
            if (!user) {
                setRole("user");
                setLoading(false);
                return;
            }
            const r = await getUserRole(user.uid);
            if (!cancelled) {
                setRole(r);
                setLoading(false);
            }
        }
        run();
            return () => {
                cancelled = true;
            }
    }, [user]);

    return { role, loading };
}