"use client"

import { Badge } from "/ui/badge"
import { Button } from "/ui/button"
import DataTable from "../common/DataTable"
import Pagination from "../common/Pagination"
import { useAdmin } from "../admin-context"

export default function SupportTicketsTable({
  tickets,
  currentPage,
  itemsPerPage,
  paginate,
  onTicketSelect,
}) {
  const { hasPermission } = useAdmin()

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = tickets.slice(indexOfFirstItem, indexOfLastItem)

  const columns = [
    { header: "Ticket ID", accessorKey: "id" },
    { header: "User", accessorKey: "user" },
    { header: "Subject", accessorKey: "subject" },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.original.status
        let badgeVariant = "outline"
        const badgeText = status.replace("_", " ").charAt(0).toUpperCase() + status.replace("_", " ").slice(1)

        if (status === "open") badgeVariant = "warning"
        else if (status === "in_progress") badgeVariant = "secondary"
        else if (status === "closed") badgeVariant = "success"

        return <Badge variant={badgeVariant}>{badgeText}</Badge>
      },
    },
    {
      header: "Priority",
      accessorKey: "priority",
      cell: ({ row }) => {
        const priority = row.original.priority
        let badgeVariant = "outline"
        const badgeText = priority.charAt(0).toUpperCase() + priority.slice(1)

        if (priority === "high") badgeVariant = "destructive"
        else if (priority === "medium") badgeVariant = "warning"
        else if (priority === "low") badgeVariant = "success"

        return <Badge variant={badgeVariant}>{badgeText}</Badge>
      },
    },
    { header: "Date", accessorKey: "date" },
    {
      header: "Actions",
      cell: ({ row }) => {
        const canRespond = hasPermission("support", "respond")
        return (
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => onTicketSelect(row.original)}>
              View
            </Button>
            <Button variant="outline" size="sm" disabled={!canRespond || row.original.status === "closed"}>
              {row.original.status === "open" ? "Respond" : "Follow Up"}
            </Button>
          </div>
        )
      },
    },
  ]

  return (
    <div className="space-y-4">
      <DataTable columns={columns} data={currentItems} />
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={tickets.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  )
}
