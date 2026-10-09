import type { Project } from "../types";
import ProjectCard from "./ProjectCard";
import EmptyState from "./EmptyState";

type ProjectListProps = {
    projects: Project[]
}

function ProjectList({ projects }: ProjectListProps) {
    if (projects.length === 0) {
        return (
            <EmptyState
                title="No projects found"
                message="There are currently no projects"
            />
        )
    }

    return (
        <section className="project-section">
            <h2>Projects</h2>

            <div className="project-grid">
                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                    />
                ))}
            </div>
        </section>
    )
}

export default ProjectList