import ProjectList from "../components/ProjectList";
import useProjects from "../hooks/useProjects";
import useDocumentTitle from "../hooks/useDocumentTitle";

function ProjectsPage() {
    const {
        projects, loading, error, refetch
    } = useProjects()

    useDocumentTitle("Projects")

    if (loading) {
        return <p>Loading projects...</p>
    }

    if (error) {
        return (
            <section>
                <p role="alert">Error: {error}</p>
                <button onClick={refetch}>Retry</button>
            </section>
        )
    }

    return <ProjectList projects={projects} />

}
export default ProjectsPage