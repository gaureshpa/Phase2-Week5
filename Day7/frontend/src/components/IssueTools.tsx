import { useState, useEffect , useMemo} from 'react'
import { getProjects } from '../api'
import type { Project } from '../types'
import type {
  Status,
  Priority,
  Issue,
  IssueFormData,
  IssueFormErrors,
} from '../types'
import { validateIssueForm } from '../utils/validationIssueForm'
import useDebounce from '../hooks/useDebounce'

type IssueToolsProps = {
  issues: Issue[];
  onAddIssue: (newIssue: Issue) => void;
  onFilteredIssueChange: (filteredIssue: Issue[]) => void;
}


function IssueTools({issues, onAddIssue, onFilteredIssueChange}: IssueToolsProps) {
  const [search, setSearch] = useState('')
  const debouncedSearchTerm = useDebounce(search, 300)
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects()
        setProjects(data)
      } catch(error) {
        console.error('Failed to fetch projects', error)
      }
    }
    fetchProjects()
  }, [])

  const [formData, setFormData] = useState<IssueFormData>({
    title: '',
    description: '',
    projectId: '',
    assigneeName: 'Unassigned',
    priority: 'MEDIUM',
    status: 'OPEN',
    dueDate: '',
    labels: '',
  })

  const [formErrors, setFormErrors] = useState<IssueFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false)

  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      const matchesSearch = issue.title
        .toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase())

      const matchesStatus =
        statusFilter === '' || issue.status === statusFilter

      const matchesPriority =
        priorityFilter === '' || issue.priority === priorityFilter

      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [issues, debouncedSearchTerm, statusFilter, priorityFilter])

  const sortedIssues = useMemo(() => {
    return [...filteredIssues].sort((a, b) => {
      if (sortBy === 'title-asc') {
        return a.title.localeCompare(b.title)
      }

      if (sortBy === 'title-desc') {
        return b.title.localeCompare(a.title)
      }

      if (
        sortBy === 'due-date-asc' &&
        a.dueDate !== null && b.dueDate !== null
      ) {
        return a.dueDate.localeCompare(b.dueDate)
      }

      if (
        sortBy === 'due-date-desc' &&
        a.dueDate !== null && b.dueDate !== null
      ) {
        return b.dueDate.localeCompare(a.dueDate)
      }

      return 0
    })
  }, [filteredIssues, sortBy])

  useEffect(() => {
    onFilteredIssueChange(sortedIssues);
  }, [sortedIssues, onFilteredIssueChange]);

  function handleClearFilters() {
    setSearch('')
    setStatusFilter('')
    setPriorityFilter('')
    setSortBy('')
  }

  function handleFieldChange<K extends keyof IssueFormData>(
    field: K,
    value: IssueFormData[K],
  ) {
    setFormData((currentData) => ({
      ...currentData,
      [field]: value,
    }))

    setFormErrors((currentErrors) => {
      const updatedErrors = { ...currentErrors }
      delete updatedErrors[field]
      return updatedErrors
    })
  }

  function handleAddIssue() {
    const errors = validateIssueForm(formData)
    setFormErrors(errors)

    if (Object.keys(errors).length > 0) return

    setIsSubmitting(true)

    try {
      const newIssue: Issue = {
        id: Date.now(),
        title: formData.title.trim(),
        description: formData.description.trim(),
        projectId: Number(formData.projectId),
        labels: formData.labels
          .split(',')
          .map((label) => label.trim())
          .filter(Boolean),
        status: formData.status,
        priority: formData.priority,
        assigneeName: formData.assigneeName,
        assigneeImageUrl: 'https://i.pravatar.cc/40?img=1',
        dueDate: formData.dueDate,
        createdAt: String(Date.now()),
        updatedAt: String(Date.now())
      }

      onAddIssue(newIssue)

      setFormData({
        title: '',
        description: '',
        projectId: '',
        assigneeName: 'Unassigned',
        priority: 'MEDIUM',
        status: 'OPEN',
        dueDate: '',
        labels: '',
      })

      setFormErrors({})
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <section className="add-issue-section">
        <h2 id="add-issue-heading">Create Issue</h2>

        <form
          onSubmit={(event) => {
            event.preventDefault()
            handleAddIssue()
          }}
          noValidate
          aria-labelledby="add-issue-heading"
        >
          {Object.values(formErrors).some(Boolean) && (
            <div className="form-error-summary" role="alert">
              <h3>Please correct the following errors:</h3>
              <ul>
                {Object.entries(formErrors).map(([field, message]) => {
                  if (!message) return null

                  return (
                    <li key={field}>
                      <a href={`#issue-${field}`}>{message}</a>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          <div className="form-field">
            <label htmlFor="issue-title">Title</label>
            <input
              id="issue-title"
              value={formData.title}
              onChange={(event) =>
                handleFieldChange('title', event.target.value)
              }
              maxLength={100}
              required
              aria-invalid={Boolean(formErrors.title)}
              aria-describedby={
                formErrors.title ? 'issue-title-error' : undefined
              }
            />
            {formErrors.title && (
              <p id="issue-title-error" className="field-error">
                {formErrors.title}
              </p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="issue-description">Description</label>
            <textarea
              id="issue-description"
              value={formData.description}
              onChange={(event) =>
                handleFieldChange('description', event.target.value)
              }
              maxLength={1000}
              required
              aria-invalid={Boolean(formErrors.description)}
              aria-describedby={
                formErrors.description
                  ? 'issue-description-error'
                  : undefined
              }
            />
            {formErrors.description && (
              <p id="issue-description-error" className="field-error">
                {formErrors.description}
              </p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="issue-projectId">Project</label>
            <select
              id="issue-projectId"
              value={formData.projectId}
              onChange={(event) =>
                handleFieldChange('projectId', event.target.value)
              }
              required
              aria-invalid={Boolean(formErrors.projectId)}
            >
              <option value="">Select a project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
            {formErrors.projectId && (
              <p className="field-error">{formErrors.projectId}</p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="issue-assigneeName">Assignee</label>
            <select
              id="issue-assigneeName"
              value={formData.assigneeName}
              onChange={(event) =>
                handleFieldChange('assigneeName', event.target.value)
              }
              required
            >
              <option value="Unassigned">Unassigned</option>
              
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="issue-priority">Priority</label>
            <select
              id="issue-priority"
              value={formData.priority}
              onChange={(event) =>
                handleFieldChange(
                  'priority',
                  event.target.value as Priority,
                )
              }
            >
              {(['LOW', 'MEDIUM', 'HIGH', 'URGENT'] as Priority[]).map(
                (priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ),
              )}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="issue-status">Status</label>
            <select
              id="issue-status"
              value={formData.status}
              onChange={(event) =>
                handleFieldChange('status', event.target.value as Status)
              }
            >
              {(['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'] as Status[]).map(
                (status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ),
              )}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="issue-dueDate">Due date</label>
            <input
              id="issue-dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(event) =>
                handleFieldChange('dueDate', event.target.value)
              }
              required
              aria-invalid={Boolean(formErrors.dueDate)}
            />
            {formErrors.dueDate && (
              <p className="field-error">{formErrors.dueDate}</p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="issue-labels">Labels</label>
            <input
              id="issue-labels"
              value={formData.labels}
              onChange={(event) =>
                handleFieldChange('labels', event.target.value)
              }
              maxLength={200}
              placeholder="frontend, bug, urgent"
            />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating issue...' : 'Create issue'}
          </button>

          <button
            type="button"
            onClick={() => setShowCancelConfirmation(true)}
          >
            Cancel
          </button>

          {showCancelConfirmation && (
            <div role="alertdialog" aria-labelledby="cancel-heading">
              <p id="cancel-heading">
                Discard the current form and its changes?
              </p>

              <button
                type="button"
                onClick={() => {
                  setFormData({
                    title: '',
                    description: '',
                    projectId: '',
                    assigneeName: 'Unassigned',
                    priority: 'MEDIUM',
                    status: 'OPEN',
                    dueDate: '',
                    labels: '',
                  })
                  setFormErrors({})
                  setShowCancelConfirmation(false)
                }}
              >
                Discard changes
              </button>

              <button
                type="button"
                onClick={() => setShowCancelConfirmation(false)}
              >
                Keep editing
              </button>
            </div>
          )}
        </form>
      </section>

      <section className="issue-filters">
        <h2>Filter Issues</h2>

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
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="">All statuses</option>
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="priority-filter">Priority</label>
          <select
            id="priority-filter"
            value={priorityFilter}
            onChange={(event) => setPriorityFilter(event.target.value)}
          >
            <option value="">All priorities</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="URGENT">Urgent</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="sort-by">Sort by</label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="">Default order</option>
            <option value="title-asc">Title A-Z</option>
            <option value="title-desc">Title Z-A</option>
            <option value="due-date-asc">Due date: Earliest first</option>
            <option value="due-date-desc">Due date: Latest first</option>
          </select>
        </div>

        <button type="button" onClick={handleClearFilters}>
          Clear filters
        </button>

        <p>{sortedIssues.length} issue(s) match your filters.</p>
      </section>
    </>
  )
}

export default IssueTools