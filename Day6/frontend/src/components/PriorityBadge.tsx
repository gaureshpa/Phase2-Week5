import type { Priority } from "../types";

type PriorityBadgeProps = {
    priority: Priority
}

function PriorityBadge({ priority }: PriorityBadgeProps) {
    const className = `priority-badge priority-${priority.toLowerCase()}`

    return (
        <span className={className}>
            {priority}
        </span>
    )
}

export default PriorityBadge
