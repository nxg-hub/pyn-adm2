  "use client"

  import { useState } from "react"
  import { AlertCircle, CheckCircle, Download, Eye, Filter, MoreHorizontal, Search, XCircle } from "lucide-react"
  import { Button } from "../../components/ui/button"
  import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
  import { Input } from "../../components/ui/input"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
  } from "../../components/ui/dropdown-menu"
  import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
  import { useAdmin } from "../../contexts/AdminContext"
  import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert"
  import { ConfirmModal, FormModal } from "../../components/ui/modal"

  const transactions = [
    {
      id: "TRX-20240423-001",
      sender: "John Doe",
      recipient: "Robert Johnson",
      amount: 2500.0,
      status: "Success",
      date: "2024-04-23 10:45 AM",
      riskLevel: "Low",
    },
    {
      id: "TRX-20240423-002",
      sender: "Jane Smith",
      recipient: "Michael Williams",
      amount: 1200.0,
      status: "Pending",
      date: "2024-04-23 11:30 AM",
      riskLevel: "Medium",
    },
    {
      id: "TRX-20240422-003",
      sender: "Robert Johnson",
      recipient: "Sarah Miller",
      amount: 3500.0,
      status: "Failed",
      date: "2024-04-22 03:15 PM",
      riskLevel: "High",
    },
    {
      id: "TRX-20240422-004",
      sender: "Emily Davis",
      recipient: "William Brown",
      amount: 5000.0,
      status: "Pending",
      date: "2024-04-22 09:20 AM",
      riskLevel: "High",
    },
    {
      id: "TRX-20240421-005",
      sender: "Michael Wilson",
      recipient: "Jennifer Taylor",
      amount: 1800.0,
      status: "Success",
      date: "2024-04-21 02:10 PM",
      riskLevel: "Low",
    },
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

    const handleViewDetails = (transaction) => {
      setSelectedTransaction(transaction)
    }

    const handleReverseTransaction = () => {
      setShowReverseDialog(false)
      setAlertMessage(`Transaction ${selectedTransaction?.id} has been reversed successfully.`)
      setShowSuccessAlert(true)
      setTimeout(() => setShowSuccessAlert(false), 3000)
    }

    const handleFlagTransaction = () => {
      setShowFlagDialog(false)
      setAlertMessage(`Transaction ${selectedTransaction?.id} has been flagged for review.`)
      setShowSuccessAlert(true)
      setTimeout(() => setShowSuccessAlert(false), 3000)
    }

    const handleAdjustAmount = () => {
      setShowAdjustDialog(false)
      setAlertMessage(`Transaction amount for ${selectedTransaction?.id} has been adjusted to ${adjustAmount}.`)
      setShowSuccessAlert(true)
      setTimeout(() => setShowSuccessAlert(false), 3000)
    }

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

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Transfers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,245</div>
                <p className="text-xs text-muted-foreground">+5.2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Transfer Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1,245,678</div>
                <p className="text-xs text-muted-foreground">+3.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Failed Transfers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-red-500">1.8% failure rate</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-7">
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Money Transfers</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>TRANSACTION ID</TableHead>
                      <TableHead>AMOUNT</TableHead>
                      <TableHead>STATUS</TableHead>
                      {hasPermission("monitorHighRiskTransactions") && <TableHead>RISK</TableHead>}
                      <TableHead>ACTIONS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">{transaction.id}</TableCell>
                        <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              transaction.status === "Success"
                                ? "bg-green-100 text-green-800"
                                : transaction.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {transaction.status}
                          </span>
                        </TableCell>
                        {hasPermission("monitorHighRiskTransactions") && (
                          <TableCell>
                            {transaction.riskLevel && (
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                  transaction.riskLevel === "Low"
                                    ? "bg-green-100 text-green-800"
                                    : transaction.riskLevel === "Medium"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                }`}
                              >
                                {transaction.riskLevel}
                              </span>
                            )}
                          </TableCell>
                        )}
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewDetails(transaction)}>
                                <Eye className="mr-2 h-4 w-4" /> View Details
                              </DropdownMenuItem>

                              {hasPermission("approveRejectTransactions") && transaction.status === "Pending" && (
                                <>
                                  <DropdownMenuItem>
                                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" /> Approve
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <XCircle className="mr-2 h-4 w-4 text-red-600" /> Decline
                                  </DropdownMenuItem>
                                </>
                              )}

                              {hasPermission("approveRejectTransactions") && transaction.status === "Success" && (
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedTransaction(transaction)
                                    setShowReverseDialog(true)
                                  }}
                                >
                                  <AlertCircle className="mr-2 h-4 w-4 text-amber-600" /> Reverse Transaction
                                </DropdownMenuItem>
                              )}

                              {hasPermission("monitorHighRiskTransactions") && (
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedTransaction(transaction)
                                    setShowFlagDialog(true)
                                  }}
                                >
                                  <AlertCircle className="mr-2 h-4 w-4 text-red-600" /> Flag as Suspicious
                                </DropdownMenuItem>
                              )}

                              {hasPermission("adjustWalletBalances") && (
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedTransaction(transaction)
                                    setAdjustAmount(transaction.amount.toString())
                                    setShowAdjustDialog(true)
                                  }}
                                >
                                  <AlertCircle className="mr-2 h-4 w-4 text-blue-600" /> Adjust Amount
                                </DropdownMenuItem>
                              )}

                              <DropdownMenuSeparator />

                              <DropdownMenuItem>
                                <AlertCircle className="mr-2 h-4 w-4" /> Contact User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            

            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Transaction Details</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedTransaction ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">TRANSACTION TYPE</h3>
                      <p>Money Transfer</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">TRANSACTION ID</h3>
                      <p>{selectedTransaction.id}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">SENDER</h3>
                      <p>{selectedTransaction.sender}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">RECIPIENT</h3>
                      <p>{selectedTransaction.recipient}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">AMOUNT</h3>
                      <p className="text-xl font-bold">${selectedTransaction.amount.toFixed(2)}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">STATUS</h3>
                      <p>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            selectedTransaction.status === "Success"
                              ? "bg-green-100 text-green-800"
                              : selectedTransaction.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {selectedTransaction.status}
                        </span>
                      </p>
                    </div>
                    {hasPermission("monitorHighRiskTransactions") && selectedTransaction.riskLevel && (
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">RISK LEVEL</h3>
                        <p>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              selectedTransaction.riskLevel === "Low"
                                ? "bg-green-100 text-green-800"
                                : selectedTransaction.riskLevel === "Medium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {selectedTransaction.riskLevel}
                          </span>
                        </p>
                      </div>
                    )}
                    {selectedTransaction.status === "Failed" && (
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">FAILURE REASON</h3>
                        <p className="text-red-500">Insufficient funds in sender's wallet</p>
                      </div>
                    )}
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">DATE & TIME</h3>
                      <p>{selectedTransaction.date}</p>
                    </div>
                    <div className="flex gap-2">
                      {hasPermission("approveRejectTransactions") && selectedTransaction.status === "Pending" && (
                        <>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Approve
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                            Decline
                          </Button>
                        </>
                      )}
                      {hasPermission("approveRejectTransactions") && selectedTransaction.status === "Success" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-amber-600 border-amber-200 hover:bg-amber-50"
                          onClick={() => setShowReverseDialog(true)}
                        >
                          Reverse Transaction
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        Contact User
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-[300px] items-center justify-center text-center">
                    <div>
                      <p className="text-muted-foreground">Select a transaction to view details</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>

        {/* Dialogs would be implemented here */}
        <ConfirmModal
          isOpen={showReverseDialog}
          onClose={() => setShowReverseDialog(false)}
          onConfirm={handleReverseTransaction}
          title="Reverse Transaction"
          description={`Are you sure you want to reverse transaction ${selectedTransaction?.id}? This action cannot be undone.`}
          confirmText="Reverse"
          variant="destructive"
        />

        <FormModal
          isOpen={showFlagDialog}
          onClose={() => setShowFlagDialog(false)}
          title="Flag Transaction"
          description="Provide a reason for flagging this transaction."
          footer={
            <Button onClick={handleFlagTransaction} disabled={!flagReason}>
              Flag Transaction
            </Button>
          }
        >
          <div className="space-y-2">
            <Input
              placeholder="Enter reason for flagging"
              value={flagReason}
              onChange={(e) => setFlagReason(e.target.value)}
            />
          </div>
        </FormModal>

        <FormModal
          isOpen={showAdjustDialog}
          onClose={() => setShowAdjustDialog(false)}
          title="Adjust Transaction Amount"
          description="Enter the new amount for this transaction."
          footer={
            <Button onClick={handleAdjustAmount} disabled={!adjustAmount}>
              Adjust Amount
            </Button>
          }
        >
          <div className="space-y-2">
            <Input
              placeholder="Enter new amount"
              type="number"
              value={adjustAmount}
              onChange={(e) => setAdjustAmount(e.target.value)}
            />
          </div>
        </FormModal>
      </div>
    )
  }

  export default MoneyTransfersPage

  // import React from "react";

  // const MoneyTransfersPage = () => {
  //   return(
  //     <div>hey welcome</div>
  //   );
  // };

  // export default MoneyTransfersPage;
