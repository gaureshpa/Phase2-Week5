import { useCallback, useEffect, useState } from "react";
import { getProjects } from "../api";
import type { Project } from "../types";

function useProjects() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchProjects = useCallback(async () => {
        try{
            setLoading(true)
            setError(null)

            const data = await getProjects()
            setProjects(data)
        } catch(error) {
            setError(
                error instanceof Error ? error.message : "Failed to load projects"
            )
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchProjects()
    }, [fetchProjects])

    return {
        projects, loading, error, refetch: fetchProjects
    }
}

export default useProjects
