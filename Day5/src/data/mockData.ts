import type { Issue, Project } from "../types";

export const projects: Project[] = [
  {
    id: 1,
    name: 'Support Ticket Dashboard',
    description: 'Track and manage customer support issues.',
    status: 'Active',
    issueCount: 5
  },

  {
    id: 2,
    name: 'Customer Portal',
    description: 'Customer facing support and account portal.',
    status: 'Active',
    issueCount: 5
  },

  {
    id: 3,
    name: 'Internal Tools',
    description: 'Tools for internal support and account portal.',
    status: 'Active',
    issueCount: 5
  },
]

export const issues: Issue[] = [
  {
    id: 1,
    title: 'Fix login validation',
    status: 'Open',
    priority: 'High',
    assigneeName: 'Adams',
    assigneeImageUrl: 'https://i.pravatar.cc/40?img=12',
    dueDate: '2026-10-26'
  },

  {
    id: 2,
    title: 'Update dashboard layout',
    status: 'In Progress',
    priority: 'Medium',
    assigneeName: 'Alex',
    assigneeImageUrl: 'https://i.pravatar.cc/40?img=5',
    dueDate: '2026-10-19',
  },

  {
    id: 3,
    title: 'Fix mobile navigation',
    status: 'Open',
    priority: 'Urgent',
    assigneeName: 'Joel',
    assigneeImageUrl: 'https://i.pravatar.cc/40?img=8',
    dueDate: '2026-10-10'
  },

  {
    id: 4,
    title: 'Update POST usage example in API documentation',
    status: 'Resolved',
    priority: 'Low',
    assigneeName: 'Kavitha',
    assigneeImageUrl: 'https://i.pravatar.cc/40?img=31',
    dueDate: '2026-10-02'
  },
  {
    id: 5,
    title: 'Review error handling',
    status: 'Closed',
    priority: 'High',
    assigneeName: 'Akshay',
    assigneeImageUrl: 'https://i.pravatar.cc/40?img=11',
    dueDate: '2026-09-30'
  }
]