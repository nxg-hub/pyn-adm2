import { getStatusColor } from "../../lib/utils"

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(status)}`}
    >
      {status}
    </span>
  )
}

export default StatusBadge
