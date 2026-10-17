import { useState, type SubmitEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import useDocumentTitle from "../hooks/useDocumentTitle";

function LoginPage() {
    useDocumentTitle("Login")
    
    const { user, loading, login } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [submitting, setSubmitting] = useState(false)

    const from = location.state?.from?.pathname || '/projects'

    if (loading) {
        return <p>Checking your session...</p>
    }

    if (user) {
        return <Navigate to="/projects" replace />
    }

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault()

        setError("")
        setSubmitting(true)

        try {
            await login(email, password)
            navigate(from, {replace: true})
        } catch(error) {
            setError(
                error instanceof Error
                ? error.message
                : "Unable to sign in. Please try again"
            )
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <main className="login-page">
            <section className="login-container">
                <h1>Welcome Back</h1>
                <p>Sign in to your account to continue</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input 
                            type="email" 
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            autoComplete="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>

                    {error && (
                        <p role="alert" className="login-error">{error}</p>
                    )}

                    <button type="submit" disabled={submitting}>
                        {submitting ? "Signing in..." : "Sign In"}
                    </button>
                </form>
            </section>
        </main>
    )
}

export default LoginPage