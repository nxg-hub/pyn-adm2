"use client"

import { useState } from "react"
import { Eye, FileText, AlertTriangle, CheckCircle, XCircle, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card.jsx"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table.jsx"
import { Button } from "../components/ui/button.jsx"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs.jsx"
import { useAdmin } from "../contexts/AdminContext.jsx"
import ActionMenu from "../components/common/ActionMenu.jsx"
import StatusBadge from "../components/common/StatusBadge.jsx"
import Pagination from "../components/common/Pagination.jsx"

// Sample data
const transfers = [
  {
    id: "TRX-123456",
    sender: "John Doe",
    recipient: "Jane Smith",
    amount: "$1,200.00",
    status: "completed",
    date: "2023-05-15",
    method: "Bank Transfer",
  },
  {
    id: "TRX-123457",
    sender: "Alice Johnson",
    recipient: "Bob Brown",
    amount: "$450.00",
    status: "pending",
    date: "2023-05-15",
    method: "Mobile Money",
  },
  {
    id: "TRX-123458",
    sender: "Emma Wilson",
    recipient: "Michael Clark",
    amount: "$2,500.00",
    status: "failed",
    date: "2023-05-14",
    method: "Bank Transfer",
  },
  {
    id: "TRX-123459",
    sender: "David Lee",
    recipient: "Sarah Wang",
    amount: "$800.00",
    status: "flagged",
    date: "2023-05-14",
    method: "Mobile Money",
  },
  {
    id: "TRX-123460",
    sender: "James Miller",
    recipient: "Olivia Davis",
    amount: "$1,750.00",
    status: "processing",
    date: "2023-05-13",
    method: "Bank Transfer",
  },
]

export function MoneyTransfersTable() {
  const [selectedTransfer, setSelectedTransfer] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState("all")
  const { hasPermission, currentRole } = useAdmin()

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return CheckCircle
      case "pending":
        return Clock
      case "failed":
        return XCircle
      case "flagged":
        return AlertTriangle
      case "processing":
        return Clock
      default:
        return Clock
    }
  }

  const handleViewDetails = (transfer) => {
    setSelectedTransfer(transfer)
    setIsDetailsOpen(true)
  }

  const handleApprove = (transferId) => {
    console.log(`Approving transfer ${transferId}`)
    // Implement approval logic
  }

  const handleReject = (transferId) => {
    console.log(`Rejecting transfer ${transferId}`)
    // Implement rejection logic
  }

  const handleFlag = (transferId) => {
    console.log(`Flagging transfer ${transferId}`)
    // Implement flagging logic
  }

  const getActionItems = (transfer) => {
    const StatusIcon = getStatusIcon(transfer.status)

    const actions = [
      {
        label: "View Details",
        icon: Eye,
        onClick: () => handleViewDetails(transfer),
      },
      {
        label: "View Receipt",
        icon: FileText,
        onClick: () => console.log(`View receipt for ${transfer.id}`),
        requiredPermission: "viewFinancialReports",
      },
    ]

    // Add conditional actions based on status and permissions
    if (transfer.status === "pending") {
      if (hasPermission("approveRejectTransactions")) {
        actions.push({
          label: "Approve",
          icon: CheckCircle,
          onClick: () => handleApprove(transfer.id),
          className: "text-green-600 hover:text-green-700",
        })
        actions.push({
          label: "Reject",
          icon: XCircle,
          onClick: () => handleReject(transfer.id),
          className: "text-red-600 hover:text-red-700",
        })
      }
    }

    // Super Admin specific actions
    if (currentRole === "Super Admin") {
      actions.push({
        label: "Flag as Suspicious",
        icon: AlertTriangle,
        onClick: () => handleFlag(transfer.id),
        className: "text-amber-600 hover:text-amber-700",
        requiredPermission: "monitorHighRiskTransactions",
      })

      // Add more Super Admin actions
      if (transfer.status === "completed" || transfer.status === "failed") {
        actions.push({
          label: "Reverse Transaction",
          icon: Clock,
          onClick: () => console.log(`Reverse transaction ${transfer.id}`),
          requiredPermission: "adjustWalletBalances",
        })
      }
    }

    return actions
  }

  return (
      <>
        <Card>
          <CardHeader>
            <CardTitle>Money Transfers</CardTitle>
            <CardDescription>Manage and monitor all money transfer transactions.</CardDescription>
            <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="failed">Failed</TabsTrigger>
                <TabsTrigger value="flagged">Flagged</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Sender</TableHead>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transfers.map((transfer) => (
                    <TableRow key={transfer.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-medium">{transfer.id}</TableCell>
                      <TableCell>{transfer.sender}</TableCell>
                      <TableCell>{transfer.recipient}</TableCell>
                      <TableCell>{transfer.amount}</TableCell>
                      <TableCell>{transfer.method}</TableCell>
                      <TableCell>
                        <StatusBadge status={transfer.status} />
                      </TableCell>
                      <TableCell>{transfer.date}</TableCell>
                      <TableCell className="text-right">
                        <ActionMenu actions={getActionItems(transfer)} />
                      </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4">
              <Pagination currentPage={currentPage} totalPages={5} onPageChange={setCurrentPage} />
            </div>
          </CardContent>
        </Card>

        {selectedTransfer && (
            <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Transaction Details</DialogTitle>
                  <DialogDescription>Complete information about transaction {selectedTransfer.id}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium text-sm">Transaction ID</h3>
                      <p>{selectedTransfer.id}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">Status</h3>
                      <StatusBadge status={selectedTransfer.status} />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">Sender</h3>
                      <p>{selectedTransfer.sender}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">Recipient</h3>
                      <p>{selectedTransfer.recipient}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">Amount</h3>
                      <p>{selectedTransfer.amount}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">Method</h3>
                      <p>{selectedTransfer.method}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">Date</h3>
                      <p>{selectedTransfer.date}</p>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  {selectedTransfer.status === "pending" && hasPermission("approveRejectTransactions") && (
                      <>
                        <Button variant="outline" onClick={() => handleReject(selectedTransfer.id)}>
                          Reject
                        </Button>
                        <Button onClick={() => handleApprove(selectedTransfer.id)}>Approve</Button>
                      </>
                  )}
                  {selectedTransfer.status !== "pending" && <Button onClick={() => setIsDetailsOpen(false)}>Close</Button>}
                </DialogFooter>
              </DialogContent>
            </Dialog>
        )}
      </>
  )
}
