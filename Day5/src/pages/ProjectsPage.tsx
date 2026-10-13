import ProjectList from "../components/ProjectList"
import { projects } from "../data/mockData"

function ProjectsPage() {
    return (
        <ProjectList projects={projects} />
    )
}

export default ProjectsPage
