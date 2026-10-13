import type { Project } from "../types"

type ProjectCardProps = {
    project: Project
}

function ProjectCard({project}: ProjectCardProps) {
    return (
        <article className="project-card">
            
            <h3> {project.name} </h3>
            <p> {project.description} </p>

            <div className="project-card-footer">
                <p>Status: {project.status} </p>
                <p>Issues: {project.issueCount} </p>
            </div>

        </article>
    )
}

export default ProjectCard
