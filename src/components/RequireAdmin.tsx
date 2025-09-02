import type{ ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/hooks/useAuth" 
import { useUserRole } from "../context/hooks/useUserRole";

type RequireAdminProps = {
    children: ReactNode;
}

export function RequireAdmin({children}: RequireAdminProps) {
    const { user, loading: authLoading } = useAuth();
    const { role, loading: roleLoading } = useUserRole();
    
    if (authLoading || roleLoading) return <div className="container">Checking access</div>
    if (!user) return <Navigate to="/" replace />;
    if (role !== "admin") return <Navigate to="/" replace />;

    return <>{children}</>;
}

export default RequireAdmin;

