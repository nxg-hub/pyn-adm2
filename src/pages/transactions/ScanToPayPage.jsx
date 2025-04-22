"use client"

import { useState } from "react"
import { Eye, FileText, AlertTriangle } from "lucide-react"
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "../../components/ui/card"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../../components/ui/table"
import { Button } from "../../components/ui/button"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "../../components/ui/dialog"
import { useAdmin } from "../../contexts/AdminContext"
import ActionMenu from "../../components/common/ActionMenu"
import StatusBadge from "../../components/common/StatusBadge"
import Pagination from "../../components/common/Pagination"
import { Textarea } from "../../components/ui/textarea"

const scanToPayTransactions = [
  {
    id: "STP-001",
    merchantName: "Coffee Express",
    reference: "REF123456",
    amount: "$15.00",
    status: "successful",
    date: "2024-04-15",
  },
  {
    id: "STP-002",
    merchantName: "Green Grocery",
    reference: "REF123457",
    amount: "$42.50",
    status: "pending",
    date: "2024-04-16",
  },
  {
    id: "STP-003",
    merchantName: "TechWorld",
    reference: "REF123458",
    amount: "$199.99",
    status: "failed",
    date: "2024-04-17",
  },
]

const normalizeStatus = (status) => {
  if (status === "successful") return "paid"
  return status
}

export default function ScanToPayPage() {
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

    if (txn.status === "successful" && hasPermission("downloadScanToPayReceipt")) {
      actions.push({
        label: "Download Receipt",
        icon: FileText,
        onClick: () => handleDownloadReceipt(txn.id),
      })
    }

    if (hasPermission("flagScanToPaySuspicious")) {
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
          <CardTitle>Scan to Pay Transactions</CardTitle>
          <CardDescription>
            View and manage scan-to-pay transaction records.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reference</TableHead>
                <TableHead>Merchant</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scanToPayTransactions.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell>{txn.reference}</TableCell>
                  <TableCell>{txn.merchantName}</TableCell>
                  <TableCell>{txn.amount}</TableCell>
                  <TableCell><StatusBadge status={normalizeStatus(txn.status)} /></TableCell>
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
              Provide a reason for flagging <strong>{selectedTransaction?.reference}</strong>:
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
              Full details of scan-to-pay transaction <strong>{selectedTransaction?.reference}</strong>.
            </DialogDescription>
          </DialogHeader>
          {selectedTransaction && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div><h3 className="font-medium text-sm">Reference</h3><p>{selectedTransaction.reference}</p></div>
                <div><h3 className="font-medium text-sm">Status</h3><StatusBadge status={normalizeStatus(selectedTransaction.status)} /></div>
                <div><h3 className="font-medium text-sm">Merchant</h3><p>{selectedTransaction.merchantName}</p></div>
                <div><h3 className="font-medium text-sm">Amount</h3><p>{selectedTransaction.amount}</p></div>
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
