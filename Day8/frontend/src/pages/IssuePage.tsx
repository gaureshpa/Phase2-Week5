import { useCallback, useState } from "react";
import IssueTools from "../components/IssueTools";
import IssueList from "../components/IssueList";
import type { Issue } from "../types";
import useIssues from "../hooks/useIssues";
import useDocumentTitle from "../hooks/useDocumentTitle";

function IssuePage() {
  const {
    issues, loading, error, refetch
  } = useIssues()

  const [filteredIssues, setFilteredIssues] = useState<Issue[]>([])

  const handleAddIssue = useCallback((newIssue: Issue) => {
    setFilteredIssues((currentIssues) => [...currentIssues, newIssue])
  }, [])

  const handleFilteredChange = useCallback((filtered: Issue[]) => {
    setFilteredIssues(filtered)
  }, [])

  useDocumentTitle("Issues")

  if (loading) {
    return <p>Loading issues...</p>
  }

  if (error) {
    return (
      <section>
        <p role="alert">Error: {error}</p>
        <button onClick={refetch}>Retry</button>
      </section>
    )
  }

  return (
    <section>
      <IssueTools
        issues={issues}
        onAddIssue={handleAddIssue}
        onFilteredIssueChange={handleFilteredChange}
      />

      <IssueList issues={filteredIssues}/>
    </section>
  )
}

export default IssuePage