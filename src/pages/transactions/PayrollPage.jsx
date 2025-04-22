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

const payrollTransactions = [
  {
    id: "PAY-101",
    employeeName: "Alice Green",
    payrollId: "P-1001",
    amount: "$2000.00",
    status: "paid",
    paymentDate: "2024-04-10",
  },
  {
    id: "PAY-102",
    employeeName: "Bob Brown",
    payrollId: "P-1002",
    amount: "$1800.00",
    status: "pending",
    paymentDate: "2024-04-12",
  },
  {
    id: "PAY-103",
    employeeName: "Charlie White",
    payrollId: "P-1003",
    amount: "$2200.00",
    status: "failed",
    paymentDate: "2024-04-14",
  },
  {
    id: "PAY-104",
    employeeName: "James Black",
    payrollId: "P-1004",
    amount: "$2500.00",
    status: "successful",
    paymentDate: "2024-04-12",
  },
]

const normalizeStatus = (status) => {
  if (status === "successful") return "paid"
  return status
}

export default function PayrollPage() {
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

  const handleDownloadPayslip = (txnId) => {
    console.log("Downloading payslip for:", txnId)
  }

  const handleFlagSubmit = () => {
    if (!flagReason.trim()) return
    console.log(`Flagged payroll ${selectedTransaction?.id} for: ${flagReason}`)
    setIsFlagDialogOpen(false)
    setIsDetailsOpen(false)
    setFlagReason("")
    setSelectedTransaction(null)
  }

  const getActionItems = (txn) => {
    const actions = [
      {
        label: "View Details",
        icon: Eye,
        onClick: () => handleViewDetails(txn),
        ariaLabel: "View payroll details"
      },
    ]

    if (normalizeStatus(txn.status) === "paid" && hasPermission("viewPayrollReports")) {
      actions.push({
        label: "Download Payslip",
        icon: FileText,
        onClick: () => handleDownloadPayslip(txn.id),
        ariaLabel: "Download payroll payslip"
      })
    }

    if (hasPermission("monitorPayrollIssues")) {
      actions.push({
        label: "Flag as Suspicious",
        icon: AlertTriangle,
        onClick: () => {
          setSelectedTransaction(txn)
          setIsFlagDialogOpen(true)
        },
        className: "text-amber-600 hover:text-amber-700",
        ariaLabel: "Flag payroll as suspicious"
      })
    }

    return actions
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Payroll Transactions</CardTitle>
          <CardDescription>
            Review and manage payroll transactions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payroll ID</TableHead>
                <TableHead>Employee Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            {payrollTransactions.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={6} className="text-center py-6 text-muted-foreground">
                    No payroll transactions found.
                  </td>
                </tr>
              </tbody>
            ) : (
              <TableBody>
                {payrollTransactions.map((txn) => (
                  <TableRow key={txn.id}>
                    <TableCell>{txn.payrollId}</TableCell>
                    <TableCell>{txn.employeeName}</TableCell>
                    <TableCell>{txn.amount}</TableCell>
                    <TableCell><StatusBadge status={normalizeStatus(txn.status)} /></TableCell>
                    <TableCell>{txn.paymentDate}</TableCell>
                    <TableCell className="text-right">
                      <ActionMenu actions={getActionItems(txn)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
          <div className="mt-4">
            <Pagination currentPage={currentPage} totalPages={1} onPageChange={setCurrentPage} />
          </div>
        </CardContent>
      </Card>

      {/* Flag Dialog */}
      <Dialog open={isFlagDialogOpen} onOpenChange={(open) => {
        setIsFlagDialogOpen(open)
        if (!open) setSelectedTransaction(null)
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Flag Payroll as Suspicious</DialogTitle>
            <DialogDescription>
              Provide a reason for flagging <strong>{selectedTransaction?.payrollId}</strong>:
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
      <Dialog open={isDetailsOpen} onOpenChange={(open) => {
        setIsDetailsOpen(open)
        if (!open) setSelectedTransaction(null)
      }}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>
              Full details of payroll transaction <strong>{selectedTransaction?.payrollId}</strong>.
            </DialogDescription>
          </DialogHeader>
          {selectedTransaction && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div><h3 className="font-medium text-sm">Payroll ID</h3><p>{selectedTransaction.payrollId}</p></div>
                <div><h3 className="font-medium text-sm">Status</h3><StatusBadge status={normalizeStatus(selectedTransaction.status)} /></div>
                <div><h3 className="font-medium text-sm">Employee Name</h3><p>{selectedTransaction.employeeName}</p></div>
                <div><h3 className="font-medium text-sm">Amount</h3><p>{selectedTransaction.amount}</p></div>
                <div><h3 className="font-medium text-sm">Payment Date</h3><p>{selectedTransaction.paymentDate}</p></div>
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
