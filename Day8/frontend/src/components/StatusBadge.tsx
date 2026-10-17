import type { Status } from "../types";

type StatusBadgeProps = {
    status: Status
}

function StatusBadge({ status }: StatusBadgeProps) {
    const className = `status-badge status-${status
    .toLowerCase()
    .replace(' ', '-')}`

    return (
        <span className={className}>
            {status}
        </span>
    )
}

export default StatusBadge