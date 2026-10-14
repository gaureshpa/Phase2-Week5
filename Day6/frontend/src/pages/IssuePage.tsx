import { useEffect, useState, useCallback } from 'react'
import IssueTools from '../components/IssueTools'
import type { Issue } from '../types'
import { getIssues } from '../api'
import IssueList from '../components/IssueList'

function IssuePage() {
  const [issues, setIssues] = useState<Issue[]>([])
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchIssues() {
      try {
        setLoading(true)
        setError(null)

        const data = await getIssues()

        setIssues(data)
        setFilteredIssues(data)
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'Failed to load issues'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchIssues()
  }, [])

  const handleAddIssue = useCallback((newIssue: Issue) => {
    setIssues((currentIssues) => [...currentIssues, newIssue])
    setFilteredIssues((currentIssues) => [...currentIssues, newIssue])
  }, [])

  const handleFilteredIssueChange = useCallback((filtered: Issue[]) => {
    setFilteredIssues(filtered)
  }, [])

  if (loading) {
    return <p>Loading issues...</p>
  }

  if (error) {
    return (
      <section>
        <p role="alert">Error: {error}</p>
        <button onClick={() => window.location.reload()}>
          Retry
        </button>
      </section>
    )
  }

  return (
    <section>
      <IssueTools
        issues={issues}
        onAddIssue={handleAddIssue}
        onFilteredIssueChange={handleFilteredIssueChange}
      />

      <IssueList issues={filteredIssues} />
    </section>
  )
}

export default IssuePage