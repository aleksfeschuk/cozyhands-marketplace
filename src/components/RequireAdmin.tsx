import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/hooks/useAuth"; 
import { useUserRole } from "../context/hooks/useUserRole";

const RequireAdmin: React.FC<{ children: React.ReactElement }> = ({ children}) => {
    const { user, loading } = useAuth();
    const { role, loading: roleLoading } = useUserRole(user);
    const loc = useLocation();
    
    if (loading || roleLoading) return <div className="container">Loading...</div>
    if (!user) return <Navigate to="/" state={{ from: loc }} replace />;
    if (role !== "admin") return <Navigate to="/" replace />;

    return children;
}

export default RequireAdmin;