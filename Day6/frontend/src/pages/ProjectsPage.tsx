import ProjectList from "../components/ProjectList"
import { useEffect, useState } from "react"
import { getProjects } from "../api"
import type { Project } from "../types"

function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    async function fetchProjects() {
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
    }

    useEffect(() => {
        fetchProjects()
    }, [])

    if(loading) {
        return <p>Loading projects...</p>
    }

    if (error) {
        return (
            <section>
                <p role="alert">Error: {error}</p>
                <button onClick={fetchProjects}>
                    Retry
                </button>
            </section>
        )
    }

    return <ProjectList projects={projects} />
}

export default ProjectsPage
