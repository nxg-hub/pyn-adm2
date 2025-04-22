
"use client"

import { useState } from "react"
import { Eye, FileText, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle} from "../../components/ui/card"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../../components/ui/table"
import { Button } from "../../components/ui/button"
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "../../components/ui/dialog"
import { useAdmin } from "../../contexts/AdminContext"
import ActionMenu from "../../components/common/ActionMenu"
import StatusBadge from "../../components/common/StatusBadge"
import Pagination from "../../components/common/Pagination"
import { Textarea } from "../../components/ui/textarea"

const tvSubscriptionTransactions = [
  {
    id: "TV-001",
    name: "DStv Premium",
    provider: "DStv",
    amount: "$30.00",
    method: "Wallet",
    date: "2024-04-01",
    status: "paid",
  },
  {
    id: "TV-002",
    name: "GOtv Max",
    provider: "GOtv",
    amount: "$15.00",
    method: "Card",
    date: "2024-04-03",
    status: "unpaid",
  },
  {
    id: "TV-003",
    name: "Startimes Nova",
    provider: "Startimes",
    amount: "$5.00",
    method: "Wallet",
    date: "2024-04-05",
    status: "overdue",
  },
  {
    id: "TV-004",
    name: "DStv Compact",
    provider: "DStv",
    amount: "$20.00",
    method: "Card",
    date: "2024-04-06",
    status: "paid",
  },
]

export default function TVSubscriptionPage() {
  const { hasPermission } = useAdmin()
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [isFlagDialogOpen, setIsFlagDialogOpen] = useState(false)
  const [flagReason, setFlagReason] = useState("")
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const handleViewDetails = (txn) => {
    setSelectedTransaction(txn)
    setIsDetailsOpen(true)
  }

  const handleDownloadReceipt = (txnId) => {
    console.log("Downloading receipt for:", txnId)
  }

  const handleFlagSubmit = () => {
    if (!flagReason.trim()) return
    console.log(`Flagged transaction ${selectedTransaction?.id} for: ${flagReason}`)
    setIsFlagDialogOpen(false)
    setFlagReason("")
    setSelectedTransaction(null)
  }

  const getActionItems = (txn) => {
    const actions = [
      {
        label: "View Details",
        icon: Eye,
        onClick: () => handleViewDetails(txn),
      },
    ]

    if (txn.status === "paid" && hasPermission("viewFinancialReports")) {
      actions.push({
        label: "Download Receipt",
        icon: FileText,
        onClick: () => handleDownloadReceipt(txn.id),
      })
    }

    if (hasPermission("monitorHighRiskTransactions")) {
      actions.push({
        label: "Flag as Suspicious",
        icon: AlertTriangle,
        onClick: () => {
          setSelectedTransaction(txn)
          setIsFlagDialogOpen(true)
        },
        className: "text-amber-600 hover:text-amber-700",
      })
    }

    return actions
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>TV Subscriptions</CardTitle>
          <CardDescription>Manage subscriptions and receipts for TV services.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tvSubscriptionTransactions.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell>{txn.id}</TableCell>
                  <TableCell>{txn.name}</TableCell>
                  <TableCell>{txn.provider}</TableCell>
                  <TableCell>{txn.amount}</TableCell>
                  <TableCell><StatusBadge status={txn.status} /></TableCell>
                  <TableCell>{txn.date}</TableCell>
                  <TableCell className="text-right">
                    <ActionMenu actions={getActionItems(txn)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4">
            <Pagination currentPage={currentPage} totalPages={2} onPageChange={setCurrentPage} />
          </div>
        </CardContent>
      </Card>

      {/* Flag Dialog */}
      <Dialog open={isFlagDialogOpen} onOpenChange={setIsFlagDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Flag Transaction as Suspicious</DialogTitle>
            <DialogDescription>
              Provide a reason for flagging <strong>{selectedTransaction?.id}</strong>:
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Enter reason..."
            value={flagReason}
            onChange={(e) => setFlagReason(e.target.value)}
          />
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsFlagDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleFlagSubmit} disabled={!flagReason.trim()}>
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>
              Complete information for transaction <strong>{selectedTransaction?.id}</strong>.
            </DialogDescription>
          </DialogHeader>
          {selectedTransaction && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-sm">Transaction ID</h3>
                  <p>{selectedTransaction.id}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm">Status</h3>
                  <StatusBadge status={selectedTransaction.status} />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Name</h3>
                  <p>{selectedTransaction.name}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm">Provider</h3>
                  <p>{selectedTransaction.provider}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm">Amount</h3>
                  <p>{selectedTransaction.amount}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm">Payment Method</h3>
                  <p>{selectedTransaction.method}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm">Date</h3>
                  <p>{selectedTransaction.date}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsDetailsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
