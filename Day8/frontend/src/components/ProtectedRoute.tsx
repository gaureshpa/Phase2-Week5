import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";

type Role = "ADMIN" | "AGENT" | "CUSTOMER";

interface ProtectedRouteProps {
    allowedRoles?: Role[];
}

export default function ProtectedRoute({
    allowedRoles
}: ProtectedRouteProps) {
    const { user, loading } = useAuth()
    const location = useLocation()

    if(loading) {
        return <p>Checking your session...</p>
    }

    if(!user) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        )
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace/>
    }

    return <Outlet />
}