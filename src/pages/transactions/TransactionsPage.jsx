"use client"

import React, { useState, useEffect, useMemo } from 'react';
import { Search } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { AlertCircle, CheckCircle, Download, Eye, Filter, MoreHorizontal, XCircle } from "lucide-react"
import { useAdmin } from "../../contexts/AdminContext"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../../components/ui/dropdown-menu"
import { ConfirmModal, FormModal } from "../../components/ui/modal" 

const sampleTransactions = [
  {id: "TXN-001", user: "John Doe", amount: 100, date: "2024-01-01", status: "Completed",},
  {id: "TXN-002", user: "Jane Smith", amount: 50, date: "2024-01-02", status: "Pending",},
  {id: "TXN-003", user: "Peter Jones", amount: 75,date: "2024-01-03", status: "Failed",},
  {id: "TXN-004", user: "John Doe", amount: 150, date: "2024-01-01", status: "Completed",},
  {id: "TXN-005", user: "Jane Smith", amount: 50, date: "2024-01-02", status: "Pending",},
  {id: "TXN-006", user: "Peter Jones", amount: 75, date: "2024-01-03", status: "Failed",},
  {id: "TXN-007", user: "John Doe", amount: 10, date: "2024-01-04", status: "Failed",},
  {id: "TXN-008", user: "Jane Smith", amount: 50, date: "2024-01-02", status: "Pending",},
  {id: "TXN-009", user: "Peter Jones", amount: 75, date: "2024-01-03", status: "Failed",},
]


function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { hasPermission } = useAdmin()
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [showReverseDialog, setShowReverseDialog] = useState(false)
  const [showFlagDialog, setShowFlagDialog] = useState(false)
  const [showAdjustDialog, setShowAdjustDialog] = useState(false)
  const [adjustAmount, setAdjustAmount] = useState("")
  const [flagReason, setFlagReason] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [transactionsData, setTransactionsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // const [alertMessage, setAlertMessage] = useState("")
  // const [showSuccessAlert, setShowSuccessAlert] = useState(false)


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

  const filteredTransactions = useMemo(() => {
    return (transactionsData.length ? transactionsData : sampleTransactions).filter(t =>
      t.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, transactionsData]);
  

  

  const ITEMS_PER_PAGE = 5;
  
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  
  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  
  

  const fetchTransactions = async () => {
    setLoading(true); // Set loading state
    try {
      const response = await fetch(import.meta.env.VITE_GET_TRANSACTION_HISTORY, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include any necessary authentication headers
        },
        body: JSON.stringify({
          page: 1,
          perPage: 50, // Adjust page size if needed
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }
  
      const data = await response.json();
      setTransactionsData(data.transactions || []); // Set the fetched transactions in state
    } catch (error) {
      console.error(error.message);
      setError(error.message || "Unexpected error occurred");
    } finally {
      setLoading(false); // Disable loading state
    }
  };
  useEffect(() => {
    fetchTransactions();
    console.log("i'm here")
  }, []);
  


  return (
    <div className="flex flex-col">
      <header className="border-b">
        <div className="flex h-16 items-center px-4 gap-4">
          <h1 className="text-xl font-semibold">Transactions Overview</h1>
          <span className="text-sm text-muted-foreground">View and manage all transactions</span>
          <div className="ml-auto flex items-center gap-4">
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
            <Button>Export</Button>
          </div>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-3 p-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">957</div>
                <p className="text-xs text-muted-foreground">+4.3% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Transaction Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1,445,021</div>
                <p className="text-xs text-muted-foreground">+3.18% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Failed Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">33</div>
                <p className="text-xs text-red-500">1.8% failure rate</p>
              </CardContent>
            </Card>
      </div>

      <main  className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>USER</TableHead>
                  <TableHead>AMOUNT</TableHead>
                  <TableHead>DATE</TableHead>
                  <TableHead>STATUS</TableHead>
                  <TableHead>ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTransactions.map((transaction, index) => (
                  <TableRow key={`${transaction.id}-${index}`}>
                    <TableCell>{transaction.id}</TableCell>
                    <TableCell>{transaction.user}</TableCell>
                    <TableCell>${transaction.amount}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          transaction.status === "Completed"
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

                              {hasPermission("approveRejectTransactions") && transaction.status === "Completed" && (
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
            <div className="flex justify-end items-center mt-4 space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <div className="flex gap-1 flex-wrap">
                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i + 1}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
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
      </main>
    </div>
  )
}

export default TransactionsPage
