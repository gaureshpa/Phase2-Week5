export type Status =
    | 'Open'
    | 'In Progress'
    | 'Resolved'
    | 'Closed'
    | 'Active'
    | 'Planning'

export type Priority =
    | 'Low'
    | 'Medium'
    | 'High'
    | 'Urgent'

export type Issue = {
    id: number
    title: string
    status: Status
    priority: Priority
    assigneeName: string
    assigneeImageUrl: string
    dueDate: string
    description?: string
    projectId?: number
    labels?: string[]
}

export type Project = {
    id: number
    name: string
    description: string
    status: Status
    issueCount: number
}

export type IssueFormData = {
    title: string
    description: string
    projectId: string
    assigneeName: string
    priority: Priority
    status: Status
    dueDate: string
    labels: string
}

export type IssueFormErrors = Partial<
    Record <keyof IssueFormData, String>
>