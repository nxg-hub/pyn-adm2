"use client";

import { useEffect, useState } from "react";
import {
  Search,
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
  Pencil,
  Download,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { useAdmin } from "../../contexts/AdminContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import Pagination from "../../components/ui/pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoan, setSelectedLoan } from "../../redux/loanSlice";
import { useNavigate } from "react-router-dom";
import { TableLoader } from "../../components/ui/loader";

function LoanPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { hasPermission } = useAdmin();
  const [currentPage, setCurrentPage] = useState(1);
  const [showMarkSuccessDialog, setShowMarkSuccessDialog] = useState(false);
  const [showFlagDialog, setShowFlagDialog] = useState(false);
  const [showAdjustDialog, setShowAdjustDialog] = useState(false);
  const [flagReason, setFlagReason] = useState("");
  const [adjustAmount, setAdjustAmount] = useState("");
  const allLoans = useSelector((state) => state.loan.allLoan);
  const loading = useSelector((state) => state.loan.loading);
  // const success = useSelector((state) => state.loan.success);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    // if (success) {
    //   return;
    // }
    dispatch(fetchLoan());
  }, []);

  const handleViewDetails = (transaction) => {
    dispatch(setSelectedLoan(transaction));
    navigate("/dashboard/transactions/loan/details");
  };

  const handleMarkSuccess = () => {
    setShowMarkSuccessDialog(false);
    // logic to mark as success
  };

  const handleFlagTransaction = () => {
    setShowFlagDialog(false);
    setFlagReason("");
    // logic to flag transaction
  };

  const handleAdjustAmount = () => {
    setShowAdjustDialog(false);
    setAdjustAmount("");
    // logic to adjust amount
  };

  const handleDownloadReceipt = (id) => {
    // This is where the actual download logic would go. For now, let's log the ID.
    console.log(`Download receipt for transaction: ${id}`);
    // You can replace the console log with actual logic like fetching a PDF or image.
  };
  const filteredTransactions = allLoans.filter(
    (transaction) =>
      transaction.customer.firstName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      transaction.customer.lastName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      transaction.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ITEMS_PER_PAGE = 5;

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const approvedCount = allLoans?.filter(
    (loan) => loan.status === "APPROVED"
  ).length;

  const repaidCount = allLoans?.filter(
    (loan) => loan.status === "REPAID"
  ).length;

  const rejectCount = allLoans?.filter(
    (loan) => loan.status === "REJECTED"
  ).length;

  if (loading) {
    return <TableLoader />;
  }
  return (
    <div className="flex flex-col">
      <header className="border-b">
        <div className="flex h-16 items-center px-4 gap-4">
          <h1 className="text-xl font-semibold"> Loans Overview</h1>
          <span className="text-sm text-muted-foreground">Manage Loans</span>
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
            <CardTitle className="text-sm font-medium">Total Loans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allLoans.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Approved Loans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedCount}</div>
            {/* <p className="text-xs text-muted-foreground">
              +3.2% from last month
            </p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Rejected Loans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejectCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Repaid Loans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{repaidCount}</div>
          </CardContent>
        </Card>
      </div>

      <main className="grid gap-6 md:grid-cols-5">
        <Card className="md:col-span-5">
          <CardHeader>
            <CardTitle>Recent Loan Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Loan Amount</TableHead>
                  <TableHead>Monthly Repayment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.id}</TableCell>
                    <TableCell>{`${transaction.customer.firstName} ${transaction.customer.lastName}`}</TableCell>
                    <TableCell>
                      {transaction.loanDuration === 1
                        ? `${transaction.loanDuration} Month`
                        : `${transaction.loanDuration} Months`}
                    </TableCell>
                    <TableCell>
                      ₦{transaction?.loanAmount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      ₦{transaction.monthlyRepayment.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          transaction.status === "APPROVED"
                            ? "bg-green-100 text-green-800"
                            : transaction.status === "PENDING_ADMIN_APPROVAL" ||
                              transaction.status === "PENDING_USER_ACTION"
                            ? "bg-yellow-100 text-yellow-800"
                            : transaction.status === "REPAID"
                            ? "bg-blue-700 text-white"
                            : "bg-red-100 text-red-800"
                        }`}>
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
                        <DropdownMenuContent className="right-0 mt-2 min-w-[150px] bg-black border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden ">
                          <DropdownMenuItem
                            className="hover:bg-[#3A859E]"
                            onClick={() => handleViewDetails(transaction)}>
                            <CheckCircle className="mr-2 h-4 w-4" /> View
                            Details
                          </DropdownMenuItem>

                          {transaction.status === "Successful" && (
                            <DropdownMenuItem
                              className="hover:bg-[#3A859E]"
                              onClick={() =>
                                handleDownloadReceipt(transaction.id)
                              }>
                              <Download className="mr-2 h-4 w-4 text-blue-600" />{" "}
                              Download Receipt
                            </DropdownMenuItem>
                          )}

                          {hasPermission(
                            "manageBillsAndUtilitiesTransactions"
                          ) &&
                            transaction.status === "Pending" && (
                              <DropdownMenuItem
                                className="hover:bg-[#3A859E]"
                                onClick={() => {
                                  setSelectedTransaction(transaction);
                                  setShowMarkSuccessDialog(true);
                                }}>
                                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />{" "}
                                Mark as Successful
                              </DropdownMenuItem>
                            )}

                          {hasPermission("monitorHighRiskTransactions") && (
                            <DropdownMenuItem
                              className="hover:bg-[#3A859E]"
                              onClick={() => {
                                setSelectedTransaction(transaction);
                                setShowFlagDialog(true);
                              }}>
                              <AlertCircle className="mr-2 h-4 w-4 text-red-600" />{" "}
                              Flag as Suspicious
                            </DropdownMenuItem>
                          )}

                          {hasPermission("adjustTransactionAmounts") && (
                            <DropdownMenuItem
                              className="hover:bg-[#3A859E]"
                              onClick={() => {
                                setSelectedTransaction(transaction);
                                setAdjustAmount(transaction.amount.toString());
                                setShowAdjustDialog(true);
                              }}>
                              <Pencil className="mr-2 h-4 w-4 text-blue-600" />{" "}
                              Adjust Amount
                            </DropdownMenuItem>
                          )}

                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="hover:bg-[#3A859E]">
                            <AlertCircle className="mr-2 h-4 w-4" /> Contact
                            User
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
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Mark Successful Modal */}
      <Dialog
        open={showMarkSuccessDialog}
        onOpenChange={setShowMarkSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mark Transaction as Successful?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setShowMarkSuccessDialog(false)}>
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
            <Button
              onClick={handleFlagTransaction}
              disabled={!flagReason.trim()}>
              Flag Transaction
            </Button>
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
              value={adjustAmount}
              onChange={(e) => setAdjustAmount(e.target.value)}
              type="number"
            />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowAdjustDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAdjustAmount}
              disabled={!adjustAmount.trim()}>
              Adjust Amount
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default LoanPage;
