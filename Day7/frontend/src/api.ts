import type { Project, Issue } from "./types"

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

interface ApiResponse<T> {
    success: boolean
    data: T
}

export async function getProjects(): Promise<Project[]> {
    const response = await fetch(`${API_URL}/api/projects`)

    if(!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.status}`)
    }

    const result: ApiResponse<Project[]> = await response.json()

    return result.data
}

export async function getIssues(): Promise<Issue[]> {
    const response = await fetch(`${API_URL}/api/issues`)

    if(!response.ok) {
        throw new Error(`Failed to fetch issues: ${response.status}`)
    }

    const result: ApiResponse<Issue[]> = await response.json()

    return result.data
}
