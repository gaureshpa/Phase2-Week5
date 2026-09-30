import type { Issue, Project } from "../types";

export const issues: Issue[] = [
    {
        id: 1,
        title: 'Fix login validation',
        status: 'Open',
        assigneeName: 'Gauresh',
        assigneeImageUrl: 'https://i.pravatar.cc/40?img=12'
    },

    {
        id: 2,
        title: 'Update dashboard layout',
        status: 'In Progress',
        assigneeName: 'Agnelo',
        assigneeImageUrl: 'https://i.pravatar.cc/40?img=14'
    },

    {
        id: 3,
        title: 'Fix mobile navigation',
        status: 'Open',
        assigneeName: 'Melwin',
        assigneeImageUrl: 'https://i.pravatar.cc/40?img=16'
    }
]

export const projects: Project[] = [
  {
    id: 1,
    name: 'Support Ticket Dashboard',
    description: 'Track and manage customer support issues.',
    status: 'Active',
    issueCount: 3,
  },
  {
    id: 2,
    name: 'Customer Portal',
    description: 'Customer-facing support and account portal.',
    status: 'Active',
    issueCount: 5,
  },
  {
    id: 3,
    name: 'Internal Tools',
    description: 'Tools for internal support team workflows.',
    status: 'Planning',
    issueCount: 0,
  },
]