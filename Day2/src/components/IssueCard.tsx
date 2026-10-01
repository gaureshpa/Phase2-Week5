import Badge from "./Badge";
import Avatar from "./Avatar";
import type { Issue } from "../types";

type IssueCardProps = {
    issue: Issue
}

function IssueCard({ issue }: IssueCardProps) {
    return (
        <article className="issue-card">
            <h3>{issue.title}</h3>
            <Badge 
                label= {issue.status} 
                variant={issue.status }
            />
            <Avatar
                name={issue.assigneeName}
                imageUrl={issue.assigneeImageUrl} 
            />
        </article>
    )
}

export default IssueCard