import type { IssueFormData, IssueFormErrors, Priority, Status } from "../types";

export function validateIssueForm(
    form: IssueFormData
): IssueFormErrors {
    const errors: IssueFormErrors = {}

    if(!form.title.trim() || form.title.trim().length > 100) {
        errors.title = 'Enter a title between 1 and 100 characters.'
    }

    if(!form.description.trim() || form.description.trim().length > 1000) {
        errors.description = 'Enter a description between 1 and 1000 characters'
    }

    if (!form.projectId) {
        errors.projectId = 'Select a project'
    }

    if (!form.assigneeName.trim()) {
        errors.assigneeName = 'Select an assignee or choose Unassigned.'
    }

    const validPriorities: Priority[] = ['LOW', 'MEDIUM', 'HIGH', 'URGENT']

    if(!validPriorities.includes(form.priority)) {
        errors.priority = 'Select a valid priority'
    }

    const validStatuses: Status[] = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED', 'ACTIVE', 'PLANNING']

    if(!validStatuses.includes(form.status)) {
        errors.status = 'Select a valid status'
    }

    const dueDate = new Date(form.dueDate) 

    if(!form.dueDate || Number.isNaN(dueDate.getTime())) {
        errors.dueDate = 'Select a valid due date.'
    }

    if(form.labels.length > 200) {
        errors.labels = 'Keep labels within 200 characters'
    }

    return errors;
}