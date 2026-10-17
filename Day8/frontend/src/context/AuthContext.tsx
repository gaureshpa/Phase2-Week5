import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { login as loginApi, getCurrentUser, logout as logoutApi, type User } from "../api";

interface AuthContextType {
    user: User | null
    loading: boolean
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
    children: ReactNode
}

export function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function restoreSession() {
            try {
                const currentUser = await getCurrentUser()
                setUser(currentUser)
            } catch{
                setUser (null)
            } finally {
                setLoading(false)
            }
        }

        restoreSession()
    }, [])

    async function login(email: string, password: string): Promise<void> {
        const authenticatedUser = await loginApi(email, password)
        setUser(authenticatedUser)
    }

    async function logout(): Promise<void> {
        await logoutApi()
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}

    export function useAuth(): AuthContextType {
        const context = useContext(AuthContext)

        if(context === undefined) {
            throw new Error("useAuth must be used within an AuthProvider")
        }

        return context
}