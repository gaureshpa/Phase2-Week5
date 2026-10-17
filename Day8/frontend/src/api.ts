import type { Project, Issue } from "./types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

interface ApiResponse<T> {
  success: boolean
  data: T
}

export interface User {
  id: number
  name: string
  email: string
  role: "ADMIN" | "AGENT" | "CUSTOMER"
}

interface AuthResponse {
  message?: string
  user: User
}

async function authRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_URL}/api/auth${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  })

  const result = await response.json()

  if(!response.ok) {
    throw new Error(result.message || "Authentication request failed")
  }

  return result as T
}

export async function login(
  email: string,
  password: string
): Promise<User> {
  const result = await authRequest<AuthResponse>("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })

  return result.user
}

export async function getCurrentUser(): Promise<User> {
  const result = await authRequest<AuthResponse>("/me")
  return result.user
}

export async function logout(): Promise<void> {
  await authRequest<{message: string}>("/logout", {
    method: "POST"
  })
}

export async function getProjects(): Promise<Project[]> {
    const response = await fetch(`${API_URL}/api/projects`, {
        credentials: "include"
    })

    if(!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.status}`)
    }

    const result: ApiResponse<Project[]> = await response.json()
    return result.data
}

export async function getIssues(): Promise<Issue[]> {
    const response = await fetch(`${API_URL}/api/issues`, {
        credentials: "include"
    })

    if (!response.ok) {
        throw new Error(`Failed to fetch issues: ${response.status}`)
    }

    const result: ApiResponse<Issue[]> = await response.json()

    return result.data
}
