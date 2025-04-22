"use client"

import { useState } from "react"
import { Eye, FileText, AlertTriangle } from "lucide-react"
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "../../components/ui/card"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "../../components/ui/table"
import { Button } from "../../components/ui/button"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle
} from "../../components/ui/dialog"
import { useAdmin } from "../../contexts/AdminContext"
import ActionMenu from "../../components/common/ActionMenu"
import StatusBadge from "../../components/common/StatusBadge"
import Pagination from "../../components/common/Pagination"
import { Textarea } from "../../components/ui/textarea"

const churchCollections = [
  {
    id: "CHURCH-101",
    source: "Sunday Tithes",
    collector: "Pastor Emmanuel",
    amount: "$1,500.00",
    method: "Cash",
    date: "2024-04-14",
    status: "successful",
  },
  {
    id: "CHURCH-102",
    source: "Midweek Service Offering",
    collector: "Deaconess Joy",
    amount: "$650.00",
    method: "Bank Transfer",
    date: "2024-04-17",
    status: "pending",
  },
  {
    id: "CHURCH-103",
    source: "Special Thanksgiving",
    collector: "Brother James",
    amount: "$1,200.00",
    method: "Card",
    date: "2024-04-20",
    status: "failed",
  },
]

export default function ChurchCollectionsPage() {
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

    if (txn.status === "successful" && hasPermission("viewFinancialReports")) {
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
          <CardTitle>Church Collections</CardTitle>
          <CardDescription>
            Manage tithes, offerings, and other church collection transactions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Collector</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {churchCollections.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell>{txn.id}</TableCell>
                  <TableCell>{txn.source}</TableCell>
                  <TableCell>{txn.collector}</TableCell>
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
            <Pagination currentPage={currentPage} totalPages={1} onPageChange={setCurrentPage} />
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
            <Button variant="outline" onClick={() => setIsFlagDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleFlagSubmit} disabled={!flagReason.trim()}>Submit</Button>
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
                <div><h3 className="font-medium text-sm">Transaction ID</h3><p>{selectedTransaction.id}</p></div>
                <div><h3 className="font-medium text-sm">Status</h3><StatusBadge status={selectedTransaction.status} /></div>
                <div><h3 className="font-medium text-sm">Source</h3><p>{selectedTransaction.source}</p></div>
                <div><h3 className="font-medium text-sm">Collector</h3><p>{selectedTransaction.collector}</p></div>
                <div><h3 className="font-medium text-sm">Amount</h3><p>{selectedTransaction.amount}</p></div>
                <div><h3 className="font-medium text-sm">Payment Method</h3><p>{selectedTransaction.method}</p></div>
                <div><h3 className="font-medium text-sm">Date</h3><p>{selectedTransaction.date}</p></div>
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
