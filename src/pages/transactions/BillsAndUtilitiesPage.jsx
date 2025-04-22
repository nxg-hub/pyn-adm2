"use client"

import { useState } from "react"
import { Eye, FileText, AlertTriangle, CheckCircle, XCircle, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Button } from "../../components/ui/button"
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,} from "../../components/ui/dialog"
import { useAdmin } from "../../contexts/AdminContext"
import ActionMenu from "../../components/common/ActionMenu"
import StatusBadge from "../../components/common/StatusBadge"
import Pagination from "../../components/common/Pagination"
import { Textarea } from "../../components/ui/textarea"

const bills = [
    {
      id: "BILL-001",
      name: "Electricity - April",
      provider: "PowerCo",
      amount: "$120.50",
      date: "2024-04-05",
      status: "paid",
    },
    {
      id: "BILL-002",
      name: "Water - April",
      provider: "AquaCity",
      amount: "$45.00",
      date: "2024-04-04",
      status: "unpaid",
    },
    {
      id: "BILL-003",
      name: "Internet - April",
      provider: "FiberMax",
      amount: "$75.00",
      date: "2024-04-03",
      status: "overdue",
    },
  ]
  
  export default function BillsAndUtilitiesPage() {
    const { hasPermission } = useAdmin()
    const [currentPage, setCurrentPage] = useState(1)
    const [openMenuId, setOpenMenuId] = useState(null)
    const [selectedBill, setSelectedBill] = useState(null)
    const [isFlagDialogOpen, setIsFlagDialogOpen] = useState(false)
    const [flagReason, setFlagReason] = useState("")
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  
    const handleViewDetails = (bill) => {
      setSelectedBill(bill)
      setIsDetailsOpen(true)
    }
  
    const handleDownloadReceipt = (billId) => {
      console.log("Downloading receipt for:", billId)
    }
  
    const handleFlagSubmit = () => {
      if (!flagReason.trim()) return
      console.log(`Flagged bill ${selectedBill?.id} for: ${flagReason}`)
      setIsFlagDialogOpen(false)
      setFlagReason("")
      setSelectedBill(null)
    }
  
    const getActionItems = (bill) => {
      const actions = [
        {
          label: "View Details",
          icon: Eye,
          onClick: () => handleViewDetails(bill),
        },
      ]
  
      if (bill.status === "paid" && hasPermission("viewFinancialReports")) {
        actions.push({
          label: "Download Receipt",
          icon: FileText,
          onClick: () => handleDownloadReceipt(bill.id),
        })
      }
  
      if (hasPermission("monitorHighRiskTransactions")) {
        actions.push({
          label: "Flag as Suspicious",
          icon: AlertTriangle,
          onClick: () => {
            setSelectedBill(bill)
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
            <CardTitle>Bills & Utilities</CardTitle>
            <CardDescription>Manage bill payments and receipts.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bill ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bills.map((bill) => (
                  <TableRow key={bill.id}>
                    <TableCell>{bill.id}</TableCell>
                    <TableCell>{bill.name}</TableCell>
                    <TableCell>{bill.provider}</TableCell>
                    <TableCell>{bill.amount}</TableCell>
                    <TableCell>
                      <StatusBadge status={bill.status} />
                    </TableCell>
                    <TableCell>{bill.date}</TableCell>
                    <TableCell className="text-right">
                      <ActionMenu actions={getActionItems(bill)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4">
              <Pagination currentPage={currentPage} totalPages={3} onPageChange={setCurrentPage} />
            </div>
          </CardContent>
        </Card>
  
        {/* Flag Dialog */}
        <Dialog open={isFlagDialogOpen} onOpenChange={setIsFlagDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Flag Bill as Suspicious</DialogTitle>
              <DialogDescription>
                Provide a reason for flagging bill <strong>{selectedBill?.id}</strong>:
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
              <DialogTitle>Bill Transaction Details</DialogTitle>
              <DialogDescription>
                Complete information for bill <strong>{selectedBill?.id}</strong>.
              </DialogDescription>
            </DialogHeader>
            {selectedBill && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-sm">Bill ID</h3>
                    <p>{selectedBill.id}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Status</h3>
                    <StatusBadge status={selectedBill.status} />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Name</h3>
                    <p>{selectedBill.name}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Provider</h3>
                    <p>{selectedBill.provider}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Amount</h3>
                    <p>{selectedBill.amount}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Payment Method</h3>
                    <p>{selectedBill.method}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Date</h3>
                    <p>{selectedBill.date}</p>
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