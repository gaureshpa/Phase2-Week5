import type { Issue } from "../types";
import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";

type IssueRowProps = {
    issue: Issue
}

function IssueRow({ issue }: IssueRowProps) {

    return (
        <article className="issue-row">
            <div className="issue-detail">
                <h3>{issue.title}</h3>
                <p className="issue-assignee">{issue.assigneeName}</p>
            </div>

            <div>
                <StatusBadge status={issue.status} />
                <PriorityBadge priority={issue.priority} />
                <span>{issue.dueDate}</span>

            </div>
        </article>
    )
}

export default IssueRow
