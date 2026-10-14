import { Link, useParams } from "react-router";
import { getProjects } from "../api";

async function ProjectDetailsPage() {
    const { ProjectID } = useParams()
    const projects = await getProjects()

    const project = projects.find(
        (item) => item.id === Number(ProjectID)
    )

    if (!ProjectID || !/^\d+$/.test(ProjectID) || !project) {
        return (
            <section>
                <h1>Project Not Found</h1>
                <p>The project you're looking for doesn't exist</p>
                <Link to="/projects">Back to Projects</Link>
            </section>
        )
    }

    return (
        <section>
            <h1>{project.name}</h1>
            <p>{project.description}</p>
            <p>Status: {project.status}</p>

            <Link to="/projects">Back to Projects</Link>
        </section>
    )
}

export default ProjectDetailsPage
