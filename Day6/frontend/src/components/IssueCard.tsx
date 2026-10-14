import Badge from "./Badge"
import Avatar from "./Avatar"
import type { Issue } from "../types"

type IssueCardProps = {
    issue: Issue
}

function IssueCard({ issue }: IssueCardProps) {
    const statusLabel = issue.status.replaceAll("_", " ")

    return (
        <article className="issue-card">
            <h3>{issue.title}</h3>
            <Badge 
                label= {statusLabel} 
                variant={issue.status }
            />
            <Avatar
                name={issue.assigneeName ?? "Unassigned"}
                imageUrl={issue.assigneeImageUrl ?? ""} 
            />
        </article>
    )
}

export default IssueCard