import { Link, useParams } from "react-router";
import { getIssues } from "../api";

async function IssueDetailsPage() {
    const { IssueID } = useParams()
    const issues = await getIssues()

    const issue = issues.find(
        (item) => item.id === Number(IssueID)
    )

    if (!IssueID || !/^\d+$/.test(IssueID) || !issue) {
        return (
            <section>
                <h1>Issue Not Found</h1>
                <p>The issue you're looking for doesn't exist</p>
                <Link to="/issues">Back to Issues</Link>
            </section>
        )
    }

    return (
        <section>
            <h1>{issue.title}</h1>

            {issue.description && (
                <p>Description: {issue.description}</p>
            )}

            <p>Status: {issue.status}</p>
            <p>Priority: {issue.priority}</p>
            <p>Assignee: {issue.assigneeName}</p>
            <p>Due Date: {issue.dueDate}</p>

            {issue.labels && issue.labels.length > 0 && (
                <p>Labels: {issue.labels.join(', ')} </p>
            )}

            <Link to="/issues">Back to Issues</Link>
        </section>
    )
}

export default IssueDetailsPage
