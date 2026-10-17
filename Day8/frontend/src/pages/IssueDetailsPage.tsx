import { Link, useParams } from "react-router";
import useIssue from "../hooks/useIssue";
import useDocumentTitle from "../hooks/useDocumentTitle";

function IssueDetailsPage() {
    const { IssueID } = useParams()

    const validID = IssueID && /^\d+$/.test(IssueID)
        ? Number(IssueID)
        : null

    const {
        issue, loading, error, notFound, refetch
    } = useIssue(validID)

    useDocumentTitle(`Issue No. ${IssueID}`)
    if (loading) {
        return <p>Loading issue...</p>
    }

    if (error) {
        return (
            <section>
                <h1>Failed to Load Issue</h1>
                <p role="alert">{error}</p>
                <button onClick={refetch}>Retry</button>
                <p>
                    <Link to={"/issues"}>Back to Issues</Link>
                </p>
            </section>
        )
    }

    if (notFound || !issue) {
        return (
            <section>
                <h1>Issue Not Found</h1>
                <p>The issue you're looking for doesn't exist</p>
                <Link to="/issues">Back to issues</Link>
            </section>
        )
    }

    return (
        <section>
            <h1>{issue.title}</h1>

            {issue.description && (
                <p>Description: {issue.description}</p>
            )}

            <p>Status: {issue.status} </p>
            <p>Priority: {issue.priority} </p>
            <p>Assignee: {issue.assigneeName ?? "Unassigned"} </p>
            <p>Due Date: {issue.dueDate ?? "Not Set"} </p>

            {issue.labels && issue.labels.length > 0 && (
                <p>Labels: {issue.labels?.join(", ")}</p>
            )}

            <Link to="/issues">Back to issues</Link>
        </section>
    )
}

export default IssueDetailsPage
