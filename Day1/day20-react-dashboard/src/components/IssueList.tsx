import type { Issue } from "../types";
import IssueCard from "./IssueCard";
import EmptyState from "./EmptyState";

type IssueListProps = {
    issues: Issue[]
}

function IssueList({ issues }: IssueListProps) {
    if (issues.length === 0) {
        return (

            <section className="issue-section">
                <h2>Issues</h2>

                <EmptyState
                    title="No issues found"
                    message="There are currently no issues"
                />
            </section>
        )
    }

    return (
        <section className="issue-section">
            <h2>Issues</h2>

            <div className="issue-list">
                {issues.map((issue) => (
                    <IssueCard
                        key={issue.id}
                        issue={issue}
                    />
                ))}
            </div>
        </section>
    )
}

export default IssueList
