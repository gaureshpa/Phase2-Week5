import type { Project } from "../types"

type ProjectCardProps = {
    project: Project
}

function ProjectCard({project}: ProjectCardProps) {
    return (
        <article className="project-card">
            
            <h2> {project.name} </h2>
            <p> {project.description} </p>

            <div className="project-card-footer">
                <p>Status: {project.status} </p>
                <p>Issues: {project.issueCount} </p>
            </div>

        </article>
    )
}

export default ProjectCard
