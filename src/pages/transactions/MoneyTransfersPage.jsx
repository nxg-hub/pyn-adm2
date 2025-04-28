"use client"

import { useState } from "react"
import { 
  AlertCircle, CheckCircle, Download, Eye, Filter, MoreHorizontal, Search, XCircle 
} from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator
} from "../../components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { useAdmin } from "../../contexts/AdminContext"
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert"
import { ConfirmModal, FormModal } from "../../components/ui/modal"

const transactions = [
  { id: "TRX-20240423-001", sender: "John Doe", recipient: "Robert Johnson", amount: 2500.0, status: "Success", date: "2024-04-23 10:45 AM", riskLevel: "Low" },
  { id: "TRX-20240423-002", sender: "Jane Smith", recipient: "Michael Williams", amount: 1200.0, status: "Pending", date: "2024-04-23 11:30 AM", riskLevel: "Medium" },
  { id: "TRX-20240422-003", sender: "Robert Johnson", recipient: "Sarah Miller", amount: 3500.0, status: "Failed", date: "2024-04-22 03:15 PM", riskLevel: "High" },
  { id: "TRX-20240422-004", sender: "Emily Davis", recipient: "William Brown", amount: 5000.0, status: "Pending", date: "2024-04-22 09:20 AM", riskLevel: "High" },
  { id: "TRX-20240421-005", sender: "Michael Wilson", recipient: "Jennifer Taylor", amount: 1800.0, status: "Success", date: "2024-04-21 02:10 PM", riskLevel: "Low" },
]

function MoneyTransfersPage() {
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showReverseDialog, setShowReverseDialog] = useState(false)
  const [showFlagDialog, setShowFlagDialog] = useState(false)
  const [showAdjustDialog, setShowAdjustDialog] = useState(false)
  const [reverseReason, setReverseReason] = useState("")
  const [flagReason, setFlagReason] = useState("")
  const [adjustAmount, setAdjustAmount] = useState("")
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")

  const { hasPermission } = useAdmin()

  const handleViewDetails = (transaction) => setSelectedTransaction(transaction)

  const handleApprove = (transaction) => {
    setAlertMessage(`Transaction ${transaction.id} approved successfully.`)
    setShowSuccessAlert(true)
    setTimeout(() => setShowSuccessAlert(false), 3000)
  }

  const handleDecline = (transaction) => {
    setAlertMessage(`Transaction ${transaction.id} declined.`)
    setShowSuccessAlert(true)
    setTimeout(() => setShowSuccessAlert(false), 3000)
  }

  const handleDownloadReceipt = (transaction) => {
    const receiptContent = `Receipt for Transaction ID: ${transaction.id}\nAmount: $${transaction.amount}\nSender: ${transaction.sender}\nRecipient: ${transaction.recipient}\nDate: ${transaction.date}`
    const blob = new Blob([receiptContent], { type: "text/plain;charset=utf-8" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `${transaction.id}-receipt.txt`
    link.click()
  }

  const handleReverseTransaction = () => {
    setShowReverseDialog(false)
    setAlertMessage(`Transaction ${selectedTransaction?.id} reversed successfully.`)
    setShowSuccessAlert(true)
    setTimeout(() => setShowSuccessAlert(false), 3000)
  }

  const handleFlagTransaction = () => {
    setShowFlagDialog(false)
    setAlertMessage(`Transaction ${selectedTransaction?.id} flagged for review.`)
    setShowSuccessAlert(true)
    setTimeout(() => setShowSuccessAlert(false), 3000)
  }

  const handleAdjustAmount = () => {
    setShowAdjustDialog(false)
    setAlertMessage(`Transaction ${selectedTransaction?.id} amount adjusted to ${adjustAmount}.`)
    setShowSuccessAlert(true)
    setTimeout(() => setShowSuccessAlert(false), 3000)
  }

  const filteredTransactions = transactions.filter((t) =>
    t.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex flex-col">
      <main className="flex-1 p-4 md:p-6 space-y-6">
        {showSuccessAlert && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{alertMessage}</AlertDescription>
          </Alert>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search transactions..."
                className="w-[250px] pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Money Transfers</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  {hasPermission("monitorHighRiskTransactions") && <TableHead>Risk</TableHead>}
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.id}</TableCell>
                    <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        transaction.status === "Success" ? "bg-green-100 text-green-800" :
                        transaction.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {transaction.status}
                      </span>
                    </TableCell>
                    {hasPermission("monitorHighRiskTransactions") && (
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          transaction.riskLevel === "Low" ? "bg-green-100 text-green-800" :
                          transaction.riskLevel === "Medium" ? "bg-yellow-100 text-yellow-800" :
                          "bg-red-100 text-red-800"
                        }`}>
                          {transaction.riskLevel}
                        </span>
                      </TableCell>
                    )}
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDetails(transaction)}>
                            <Eye className="mr-2 h-4 w-4" /> View Details
                          </DropdownMenuItem>

                          {hasPermission("approveRejectTransactions") && transaction.status === "Pending" && (
                            <>
                              <DropdownMenuItem onClick={() => handleApprove(transaction)}>
                                <CheckCircle className="mr-2 h-4 w-4 text-green-600" /> Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDecline(transaction)}>
                                <XCircle className="mr-2 h-4 w-4 text-red-600" /> Decline
                              </DropdownMenuItem>
                            </>
                          )}

                          {hasPermission("approveRejectTransactions") && transaction.status === "Success" && (
                            <>
                              <DropdownMenuItem onClick={() => {
                                setSelectedTransaction(transaction)
                                setShowReverseDialog(true)
                              }}>
                                <AlertCircle className="mr-2 h-4 w-4 text-amber-600" /> Reverse Transaction
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDownloadReceipt(transaction)}>
                                <Download className="mr-2 h-4 w-4 text-blue-600" /> Download Receipt
                              </DropdownMenuItem>
                            </>
                          )}

                          {hasPermission("monitorHighRiskTransactions") && (
                            <DropdownMenuItem onClick={() => {
                              setSelectedTransaction(transaction)
                              setShowFlagDialog(true)
                            }}>
                              <AlertCircle className="mr-2 h-4 w-4 text-red-600" /> Flag as Suspicious
                            </DropdownMenuItem>
                          )}

                          {hasPermission("adjustWalletBalances") && (
                            <DropdownMenuItem onClick={() => {
                              setSelectedTransaction(transaction)
                              setAdjustAmount(transaction.amount.toString())
                              setShowAdjustDialog(true)
                            }}>
                              <AlertCircle className="mr-2 h-4 w-4 text-blue-600" /> Adjust Amount
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default MoneyTransfersPage
