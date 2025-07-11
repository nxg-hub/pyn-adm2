"use client"

import { useState, useEffect  } from "react"
import { Search, MoreHorizontal, CheckCircle, AlertCircle, Pencil, Download, QrCode, Camera, Upload } from "lucide-react"
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


// const scanToPayTransactions = [
//   { id: "STP-001", payer: "John Doe", amount: 150, date: "2024-04-01", time: "8:42am", status: "Completed",},
//   { id: "STP-002", payer: "Jane Smith", amount: 200, date: "2024-04-05", time: "8:42am", status: "Pending",},
//   { id: "STP-003", payer: "Sam Brown", amount: 300, date: "2024-04-10", time: "8:42am", status: "Failed",},
//   { id: "STP-004", payer: "John Doe", amount: 150, date: "2024-04-01", time: "8:42am", status: "Completed",},
//   { id: "STP-005", payer: "Jane Smith", amount: 200, date: "2024-04-05", time: "8:42am", status: "Pending",},
//   { id: "STP-006", payer: "Sam Brown", amount: 300, date: "2024-04-10", time: "8:42am", status: "Failed",},
// ]

function ScanToPayPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { hasPermission } = useAdmin()
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [showMarkSuccessDialog, setShowMarkSuccessDialog] = useState(false)
  const [showFlagDialog, setShowFlagDialog] = useState(false)
  const [showAdjustDialog, setShowAdjustDialog] = useState(false)
  const [showQRScanDialog, setShowQRScanDialog] = useState(false)
  const [flagReason, setFlagReason] = useState("")
  const [adjustAmount, setAdjustAmount] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isScanning, setIsScanning] = useState(false)
  const [scannedCode, setScannedCode] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([])


  const handleFetchTransactions = async () => {
    setIsLoading(true);
    try {
      const transactions = await apiService.fetchScanToPayTransactions();

      console.log ('Scan to pay Transactions:', transactions)
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
  }

  const handleFlagTransaction = () => {
    setShowFlagDialog(false)
    setFlagReason("")
  }

  const handleAdjustAmount = () => {
    setShowAdjustDialog(false)
    setAdjustAmount("")
  }

  const handleDownloadReceipt = (id) => {
    console.log(`Download receipt for transaction: ${id}`)
  }

  const handleStartScanning = () => {
    setIsScanning(true)
    setShowQRScanDialog(true)
    console.log("Starting QR code scanning...")
  }

  const handleStopScanning = () => {
    setIsScanning(false)
    setShowQRScanDialog(false)
    setScannedCode("")
  }

  const handleQRCodeDetected = (code) => {
    setScannedCode(code)
    setIsScanning(false)
    console.log("QR Code detected:", code)
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      console.log("Processing uploaded QR code image:", file.name)
    }
  }

  const filteredTransactions = (transactions).filter((transaction) =>
    transaction.payer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const ITEMS_PER_PAGE = 5;
  
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="flex flex-col">
      <header className="border-b">
        <div className="flex h-16 items-center px-4 gap-4">
          <h1 className="text-xl font-semibold">Scan to Pay Transactions</h1>
          <span className="text-sm text-muted-foreground">Manage scan to pay transactions</span>
          <div className="ml-auto flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by payer..."
                className="w-[250px] pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button onClick={handleStartScanning}  variant="outline" className="bg-black text-white hover:bg-gray-800">
              <QrCode className="mr-2 h-4 w-4" />
              Scan QR Code
            </Button>
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

      {/* QR Code Scanning Section */}
      <div className="p-6 border-b bg-gradient-to-r from-black to-black">
        <Card className="border-2 border-dashed border-gray-400 bg-black">
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                <QrCode className="h-8 w-8 text-black" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Scan QR Code to Process Payment</h2>
                <p className="text-white mt-2">Use your camera to scan a QR code or upload an image containing a QR code</p>
              </div>
              <div className="flex justify-center gap-4">
                <Button onClick={handleStartScanning} size="lg" variant="outline" className="bg-black hover:bg-gray-800 text-white">
                  <Camera className="mr-2 h-5 w-5" />
                  Start Camera Scan
                </Button>
                <Button variant="outline" className="text-white bg-black hover:bg-gray-800" size="lg" onClick={() => document.getElementById('qr-upload').click()}>
                  <Upload className="mr-2 h-5 w-5" />
                  Upload QR Image
                </Button>
                <input
                  id="qr-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>
              {scannedCode && (
                <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg">
                  <p className= "text-black font-medium">QR Code Detected!</p>
                  <p className="text-gray-700 text-sm mt-1">Code: {scannedCode}</p>
                  <Button size="sm" className="mt-2 bg-black hover:bg-gray-800 text-white">
                    Process Payment
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

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
            <div className="text-2xl font-bold">$1,080,000</div>
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

      <main className="grid gap-6 md:grid-cols-7 px-6 pb-6">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Recent Scan to Pay Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Payer</TableHead>
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
                    <TableCell>{transaction.payer}</TableCell>
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
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="right-0 mt-2 min-w-[150px] bg-black border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden " >
                          <DropdownMenuItem  className="hover:bg-[#3A859E]" onClick={() => handleViewDetails(transaction)}>
                            <CheckCircle className="mr-2 h-4 w-4" /> View Details
                          </DropdownMenuItem>

                          {transaction.status === "Completed" && (
                            <DropdownMenuItem   className="hover:bg-[#3A859E]" onClick={() => handleDownloadReceipt(transaction.id)}>
                              <Download className="mr-2 h-4 w-4 text-blue-600" /> Download Receipt
                            </DropdownMenuItem>
                          )}

                          {hasPermission("manageScanToPayTransactions") && transaction.status === "Pending" && (
                            <DropdownMenuItem  className="hover:bg-[#3A859E]" 
                              onClick={() => {
                                setSelectedTransaction(transaction)
                                setShowMarkSuccessDialog(true)
                              }}
                            >
                              <CheckCircle className="mr-2 h-4 w-4 text-green-600" /> Mark as Completed
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
                          

                            <DropdownMenuItem  className="hover:bg-[#3A859E]" 
                              onClick={() => {
                                setSelectedTransaction(transaction)
                                setAdjustAmount(transaction.amount.toString())
                                setShowAdjustDialog(true)
                              }}
                            >
                              <Pencil className="mr-2 h-4 w-4 text-blue-600" /> Adjust Amount
                            </DropdownMenuItem>
                          

                          <DropdownMenuSeparator />
                          <DropdownMenuItem  className="hover:bg-[#3A859E]" >
                            <AlertCircle className="mr-2 h-4 w-4" /> Contact Payer
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
                totalItems={filteredTransactions.length}
                itemsPerPage={ITEMS_PER_PAGE}
                itemLabel="Scan to pay transactions"
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
                              <p>Money Transfer</p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground">TRANSACTION ID</h3>
                              <p>{selectedTransaction.id}</p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground">PAYER</h3>
                              <p>{selectedTransaction.payer}</p>
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

      {/* QR Scanner Modal */}
      <Dialog open={showQRScanDialog} onOpenChange={setShowQRScanDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Scan QR Code</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed">
              {isScanning ? (
                <div className="text-center space-y-2">
                  <Camera className="h-12 w-12 mx-auto text-blue-600 animate-pulse" />
                  <p className="text-sm text-gray-600">Camera is active</p>
                  <p className="text-xs text-gray-500">Position QR code within the frame</p>
                </div>
              ) : (
                <div className="text-center space-y-2">
                  <QrCode className="h-12 w-12 mx-auto text-gray-400" />
                  <p className="text-sm text-gray-600">Camera preview will appear here</p>
                </div>
              )}
            </div>
            <div className="text-center space-y-2">
              <p className="text-sm text-white">Make sure the QR code is clearly visible and well-lit</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={handleStopScanning}>
              Cancel
            </Button>
            {!isScanning ? (
              <Button onClick={handleStartScanning}>
                <Camera className="mr-2 h-4 w-4" />
                Start Scanning
              </Button>
            ) : (
              <Button variant="outline" onClick={handleStopScanning}>
                Stop Scanning
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Mark Completed Modal */}
      <Dialog open={showMarkSuccessDialog} onOpenChange={setShowMarkSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mark Transaction as Completed?</DialogTitle>
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
            <Button onClick={handleFlagTransaction}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Adjust Amount Modal */}
      <Dialog open={showAdjustDialog} onOpenChange={setShowAdjustDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adjust Amount</DialogTitle>
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

export default ScanToPayPage