export type Status =
    | 'Open'
    | 'In Progress'
    | 'Resolved'
    | 'Active'
    | 'Planning'

export type Issue = {
    id: number
    title: string
    status: Status
    assigneeName: string
    assigneeImageUrl: string
}

export type Project = {
    id: number
    name: string
    description: string
    status: Status
    issueCount: number
}
