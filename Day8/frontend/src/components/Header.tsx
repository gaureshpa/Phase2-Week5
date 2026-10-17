import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

function Header() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const [loggingOut, setLoggingOut] = useState(false)
    const [error, setError] = useState("")

    async function handleLogout() {
        setLoggingOut(true)
        setError("")
    
        try {
            await logout()
            navigate("/login", {replace: true})
        } catch {
            setError("Logout failed. Please try again")
        } finally {
            setLoggingOut(false)
        }
    }

    return (
        <header className="app-header">

            <div className="header-actions">
                {user && <span>Welcome, {user.name}</span>}

                <button
                    type="button"
                    onClick={handleLogout}
                    disabled={loggingOut}
                >
                    {loggingOut ? "Logging out..." : "Logout"}
                </button>
            </div>

            {error && <p role="alert">{error}</p>}
        </header>
    )
}

export default Header
