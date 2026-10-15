export type Status =
    | 'OPEN'
    | 'IN_PROGRESS'
    | 'RESOLVED'
    | 'CLOSED'
    | 'ACTIVE'
    | 'PLANNING'
    | 'DONE'

export type Priority =
    | 'LOW'
    | 'MEDIUM'
    | 'HIGH'
    | 'URGENT'

export type Issue = {
    id: number
    title: string
    status: Status
    priority: Priority
    assigneeName: string | null
    assigneeImageUrl: string | null
    dueDate: string | null
    description?: string
    projectId?: number
    labels?: string[]
    createdAt: string
    updatedAt: string
}

export type Project = {
    id: number
    name: string
    description: string
    status: Status
    createdAt: string
    updatedAt: string
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