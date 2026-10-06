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
}

export type Project = {
    id: number
    name: string
    description: string
    status: Status
    issueCount: number
}
