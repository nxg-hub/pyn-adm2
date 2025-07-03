"use client"

import { useState, useEffect } from "react"
import { Search, MoreHorizontal, CheckCircle, AlertCircle, Pencil, Download } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { useAdmin } from "../../contexts/AdminContext"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import Pagination from "../../components/ui/pagination"
import apiService from "../../services/apiService"

// const virtualCardTransactions = [
//   { id: "VC-001", cardHolder: "John Doe", amount: 100, date: "2024-04-12", time: "9:24am", status: "Successful",},
//   { id: "VC-002", cardHolder: "Jane Smith", amount: 50, date: "2024-04-15", time: "9:24am", status: "Pending",},
//   { id: "VC-003", cardHolder: "Robert Brown", amount: 200, date: "2024-04-18", time: "9:24am", status: "Failed",},
//   { id: "VC-004", cardHolder: "John Doe", amount: 100, date: "2024-04-12", time: "9:24am", status: "Successful",},
//   { id: "VC-005", cardHolder: "Jane Smith", amount: 50, date: "2024-04-15", time: "9:24am", status: "Pending",},
//   { id: "VC-006", cardHolder: "Robert Brown", amount: 200, date: "2024-04-18", time: "9:24am", status: "Failed",},
//   { id: "VC-007", cardHolder: "John Doe", amount: 100, date: "2024-04-12", time: "9:24am", status: "Successful",},
//   { id: "VC-008", cardHolder: "Jane Smith", amount: 50, date: "2024-04-15", time: "9:24am", status: "Pending",},
//   { id: "VC-009", cardHolder: "Robert Brown", amount: 200, date: "2024-04-18", time: "9:24am", status: "Failed",},
// ]

function VirtualCardsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { hasPermission } = useAdmin()
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [showMarkSuccessDialog, setShowMarkSuccessDialog] = useState(false)
  const [showFlagDialog, setShowFlagDialog] = useState(false)
  const [showAdjustDialog, setShowAdjustDialog] = useState(false)
  const [flagReason, setFlagReason] = useState("")
  const [adjustAmount, setAdjustAmount] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([])


  const handleFetchTransactions = async () => {
    setIsLoading(true);
    try {
      const transactions = await apiService.fetchVirtualCardsTransactions();

      console.log ('V.card Transactions:', transactions)
      setTransactions(transactions || []);
    } catch (error) {
      const message = error.message || "Unexpected error";
      console.error(`Failed to fetch: ${message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect (() => {
    (handleFetchTransactions())
  }, []);

  const handleViewDetails = (transaction) => {
    setSelectedTransaction(transaction)
  }

  const handleMarkSuccess = () => {
    setShowMarkSuccessDialog(false)
    // logic to mark as success
  }

  const handleFlagTransaction = () => {
    setShowFlagDialog(false)
    setFlagReason("")
    // logic to flag transaction
  }

  const handleAdjustAmount = () => {
    setShowAdjustDialog(false)
    setAdjustAmount("")
    // logic to adjust amount
  }

  const handleDownloadReceipt = (id) => {
    // This is where the actual download logic would go. For now, let's log the ID.
    console.log(`Download receipt for transaction: ${id}`)
    // You can replace the console log with actual logic like fetching a PDF or image.
  }

  const filteredTransactions = (transactions).filter((transaction) =>
    transaction.cardHolder.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const ITEMS_PER_PAGE = 5;

  const totalTransactions = transactions.length
  
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="flex flex-col">
      <header className="border-b">
        <div className="flex h-16 items-center px-4 gap-4">
          <h1 className="text-xl font-semibold">Virtual Cards Transactions</h1>
          <span className="text-sm text-muted-foreground">Manage virtual card transactions</span>
          <div className="ml-auto flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by cardholder..."
                className="w-[250px] pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                <DropdownMenuItem>Export as PDF</DropdownMenuItem>
                <DropdownMenuItem>Export as Excel</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-3 p-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">320</div>
            <p className="text-xs text-muted-foreground">+3.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$18,000</div>
            <p className="text-xs text-muted-foreground">+4.3% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Failed Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-red-500">4.7% failure rate</p>
          </CardContent>
        </Card>
      </div>

      <main className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Recent Virtual Card Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Cardholder</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.id}</TableCell>
                    <TableCell>{transaction.cardHolder}</TableCell>
                    <TableCell>${transaction.amount}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          transaction.status === "Successful"
                            ? "bg-green-100 text-green-800"
                            : transaction.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="right-0 mt-2 min-w-[150px] bg-black border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden " >
                          <DropdownMenuItem  className="hover:bg-[#3A859E]"  onClick={() => handleViewDetails(transaction)}>
                            <CheckCircle className="mr-2 h-4 w-4" /> View Details
                          </DropdownMenuItem>

                          {transaction.status === "Successful" && (
                            <DropdownMenuItem  className="hover:bg-[#3A859E]" onClick={() => handleDownloadReceipt(transaction.id)}>
                              <Download className="mr-2 h-4 w-4 text-blue-600" /> Download Receipt
                            </DropdownMenuItem>
                          )}

                          {hasPermission("manageVirtualCardTransactions") && transaction.status === "Pending" && (
                            <DropdownMenuItem  className="hover:bg-[#3A859E]" 
                              onClick={() => {
                                setSelectedTransaction(transaction)
                                setShowMarkSuccessDialog(true)
                              }}
                            >
                              <CheckCircle className="mr-2 h-4 w-4 text-green-600" /> Mark as Successful
                            </DropdownMenuItem>
                          )}

                            <DropdownMenuItem  className="hover:bg-[#3A859E]" 
                              onClick={() => {
                                setSelectedTransaction(transaction)
                                setShowFlagDialog(true)
                              }}
                            >
                              <AlertCircle className="mr-2 h-4 w-4 text-red-600" /> Flag as Suspicious
                            </DropdownMenuItem>
                        

                          {hasPermission("adjustVirtualCardAmounts") && (
                            <DropdownMenuItem  className="hover:bg-[#3A859E]" 
                              onClick={() => {
                                setSelectedTransaction(transaction)
                                setAdjustAmount(transaction.amount.toString())
                                setShowAdjustDialog(true)
                              }}
                            >
                              <Pencil className="mr-2 h-4 w-4 text-blue-600" /> Adjust Amount
                            </DropdownMenuItem>
                          )}

                          <DropdownMenuSeparator />
                          <DropdownMenuItem  className="hover:bg-[#3A859E]" >
                            <AlertCircle className="mr-2 h-4 w-4" /> Contact Cardholder
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-end mt-4">
              <Pagination
                currentPage={currentPage}
                totalItems={totalTransactions}
                itemsPerPage={ITEMS_PER_PAGE}
                itemLabel="Virtual Card Transactions"
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
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
                              <p>Card Payment</p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground">TRANSACTION ID</h3>
                              <p>{selectedTransaction.id}</p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground">CARD HOLDER</h3>
                              <p>{selectedTransaction.cardHolder}</p>
                            </div>
                            {/* <div>
                              <h3 className="text-sm font-medium text-muted-foreground">RECEIVER</h3>
                              <p>{selectedTransaction.service}</p>
                            </div> */}
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
                              <p>{selectedTransaction.date} {selectedTransaction.time}</p>
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
      </main>

      {/* Mark Successful Modal */}
      <Dialog open={showMarkSuccessDialog} onOpenChange={setShowMarkSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mark Transaction as Successful?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowMarkSuccessDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleMarkSuccess}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Flag Transaction Modal */}
      <Dialog open={showFlagDialog} onOpenChange={setShowFlagDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Flag Transaction as Suspicious</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Label>Reason</Label>
            <Textarea
              placeholder="Enter reason for flagging"
              value={flagReason}
              onChange={(e) => setFlagReason(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowFlagDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleFlagTransaction}>Flag Transaction</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Adjust Amount Modal */}
      <Dialog open={showAdjustDialog} onOpenChange={setShowAdjustDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adjust Transaction Amount</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Label>New Amount</Label>
            <Input
              type="number"
              value={adjustAmount}
              onChange={(e) => setAdjustAmount(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowAdjustDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAdjustAmount}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default VirtualCardsPage
