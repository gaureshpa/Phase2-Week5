import { useState } from 'react'
import { issues as initialIssues } from '../data/mockData'
import IssueList from '../components/IssueList'
import IssueTools from '../components/IssueTools'
import type { Issue } from '../types'

function IssuePage() {
  const [issues, setIssues] = useState(initialIssues)
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>(initialIssues)

  const handleAddIssue = (newIssue: Issue) => {
    setIssues((currentIssues) => [...currentIssues, newIssue])
  }

  return (
    <section>
      <IssueTools
        issues={issues}
        onAddIssue={handleAddIssue}
        onFilteredIssueChange={setFilteredIssues}
      />
      <IssueList issues={filteredIssues} />
    </section>
  )
}

export default IssuePage
