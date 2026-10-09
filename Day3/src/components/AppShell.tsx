import { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { issues as initialIssues, projects } from '../data/mockData'
import ProjectList from './ProjectList'
import IssueList from './IssueList'
import type { Status, Priority, Issue } from '../types'

function AppShell() {
  const [issues, setIssues] = useState(initialIssues)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [sortBy, setSortBy] = useState('')

  const [newIssueTitle, setNewIssueTitle] = useState('')
  const [newIssueStatus, setNewIssueStatus] = useState<Status>('Open')
  const [newIssuePriority, setNewIssuePriority] = useState<Priority>('Medium')
  const [newIssueDueDate, setNewIssueDueDate] = useState('')

  const filteredIssues = issues.filter((issue) => {
  const matchesSearch = issue.title.toLowerCase().includes(search.toLowerCase())
  const matchesStatus = statusFilter === '' || issue.status === statusFilter
  const matchesPriority = priorityFilter === '' || issue.priority === priorityFilter

  return matchesSearch && matchesStatus && matchesPriority
  })

  const sortedIssues = [...filteredIssues].sort((a, b) => {
    if (sortBy === 'title-asc') {
        return a.title.localeCompare(b.title)
    }

    if (sortBy === 'title-desc') {
        return b.title.localeCompare(a.title)
    }

    if (sortBy === 'due-date-asc') {
        return a.dueDate.localeCompare(b.dueDate)
    }

    if (sortBy === 'due-date-desc') {
        return b.dueDate.localeCompare(a.dueDate)
    }

    return 0
  })

  function handleClearFilters() {
    setSearch('')
    setStatusFilter('')
    setPriorityFilter('')
    setSortBy('')
  }

  function handleAddIssue() {
    if(!newIssueTitle.trim()) {
      alert('Please enter an issue title.')
      return
    }

    if (!newIssueDueDate) {
      alert('Please select a due date.')
      return
    }

    const newIssue: Issue = {
      id: Math.max(0, ...issues.map((issue) => issue.id)) + 1,
      title: newIssueTitle.trim(),
      status: newIssueStatus,
      priority: newIssuePriority,
      assigneeName: 'Unassigned',
      assigneeImageUrl: 'https://i.pravatar.cc/40?img=1',
      dueDate: newIssueDueDate,
    }

    setIssues((currentIssues) => [
      ...currentIssues, newIssue,
    ])

    setNewIssueTitle('')
    setNewIssueStatus('Open')
    setNewIssuePriority('Medium')
    setNewIssueDueDate('')
  }


  return (
    <>
      <Header />

      <div className="dashboard-layout">
        <Sidebar />

        <main className="dashboard-main">
          <ProjectList projects={projects} />

          <section className="add-issue-section">
            <h2>Add Issue</h2>

           <div className="form-field">
             <label htmlFor="new-issue-title">Title</label>
              <input
                  type="text"
                  id="new-issue-title"
                  value={newIssueTitle}
                  onChange={(event) => {
                      setNewIssueTitle(event.target.value)
                  }}
                  placeholder="Enter issue title"
              />
           </div>

            <div className="form-field">
              <label htmlFor="new-issue-status">Status</label>
              <select
                  id="new-issue-status"
                  value={newIssueStatus}
                  onChange={(event) => {
                      setNewIssueStatus(event.target.value as Status)
                  }}
              >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="new-issue-priority">Priority</label>
              <select
                  id="new-issue-priority"
                  value={newIssuePriority}
                  onChange={(event) => {
                      setNewIssuePriority(event.target.value as Priority)
                  }}
              >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="new-issue-due-date">Due Date</label>
              <input
                id="new-issue-due-date"
                type="date"
                value={newIssueDueDate}
                onChange={(event) => {
                  setNewIssueDueDate(event.target.value)
                }}
              />
            </div>

            <button
              type="button"
              onClick={handleAddIssue}
            >
              Add Issue
            </button>

          </section>

          <section>
            <h2>Search Issue</h2>

            <div className="form-field">
              <label htmlFor="issue-search">Search issues</label>
              <input
                id="issue-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search issues..."
              />
            </div>

            <div className="form-field">
              <label htmlFor="status-filter">Status</label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(event) => {
                  setStatusFilter(event.target.value)
                }}
              >
                <option value="">All statuses</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="priority-filter">Priority</label>
              <select
                id="priority-filter"
                value={priorityFilter}
                onChange={(event) => {
                    setPriorityFilter(event.target.value)
                }}
              >
                <option value="">All priorities</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
            
            <div className="form-field">
              <label htmlFor="sort-by">Sort by</label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(event) => {
                    setSortBy(event.target.value)
                }}
              >
                <option value="">Default order</option>
                <option value="title-asc">Title A-Z</option>
                <option value="title-desc">Title Z-A</option>
                <option value="due-date-asc">Due date: Earliest first</option>
                <option value="due-date-desc">Due date: Latest first</option>
              </select>
            </div>


            <button type="button" onClick={handleClearFilters}>Clear filters</button>
            
          </section>

          <IssueList issues={sortedIssues} />
        </main>
      </div>
    </>
  )
}

export default AppShell