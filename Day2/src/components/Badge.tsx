import type { Status } from '../types'

type BadgeProps = {
  label: string
  variant: Status
}

function Badge({ label, variant }: BadgeProps) {
  return (
    <span className={`badge badge-${variant.toLowerCase().replace(' ', '-')}`}>
      {label}
    </span>
  )
}

export default Badge