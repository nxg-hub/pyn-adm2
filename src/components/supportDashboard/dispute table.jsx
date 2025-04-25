import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/data-table"
import { StatCard } from "@/components/stat-card"
import { Pagination } from "@/components/pagination"
import { Button } from "@/components/ui/button"
import { useAdmin } from "@/hooks/use-admin"
import { DisputeDetailDialog } from "@/components/dispute-detail-dialog"
import { ReplyDialog } from "@/components/reply-dialog"

const statusOptions = ["open", "in_progress", "resolved", "escalated", "closed"]

export const DisputeResolutionTable = ({ data }) => {
  const { can } = useAdmin()
  const [selectedStatus, setSelectedStatus] = useState("open")
  const [selectedDispute, setSelectedDispute] = useState(null)
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [showReplyDialog, setShowReplyDialog] = useState(false)

  const filteredData = data.filter(d => d.status === selectedStatus)

  const handleViewDetails = (dispute) => {
    setSelectedDispute(dispute)
    setShowDetailDialog(true)
  }

  const handleReply = (dispute) => {
    setSelectedDispute(dispute)
    setShowReplyDialog(true)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {statusOptions.map(status => (
          <StatCard
            key={status}
            label={status.replace("_", " ").toUpperCase()}
            value={data.filter(d => d.status === status).length}
            active={selectedStatus === status}
            onClick={() => setSelectedStatus(status)}
          />
        ))}
      </div>

      <DataTable
        columns={[
          {
            accessorKey: "ticketId",
            header: "Ticket ID"
          },
          {
            accessorKey: "customer",
            header: "Customer"
          },
          {
            accessorKey: "issue",
            header: "Issue"
          },
          {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => <Badge variant="outline">{row.original.status}</Badge>
          },
          {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
              <div className="flex gap-2">
                {can("disputes.view") && (
                  <Button size="sm" variant="outline" onClick={() => handleViewDetails(row.original)}>
                    View
                  </Button>
                )}
                {can("disputes.respond") && (
                  <Button size="sm" onClick={() => handleReply(row.original)}>
                    Reply
                  </Button>
                )}
              </div>
            )
          }
        ]}
        data={filteredData}
      />

      <Pagination totalItems={filteredData.length} />

      {selectedDispute && showDetailDialog && (
        <DisputeDetailDialog
          dispute={selectedDispute}
          open={showDetailDialog}
          onOpenChange={setShowDetailDialog}
        />
      )}

      {selectedDispute && showReplyDialog && (
        <ReplyDialog
          ticket={selectedDispute}
          open={showReplyDialog}
          onOpenChange={setShowReplyDialog}
        />
      )}
    </div>
  )
}
