"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

// import { useAdmin } from "./admin-context";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { ChevronLeft } from "lucide-react";

import { Building2, CheckCircle, XCircle } from "lucide-react";
import {
  approveLoan,
  approveLowerAmount,
  fetchLoanApprovalSummary,
  rejectLoan,
  setRejectState,
} from "../../redux/LoanApprovalSummarySlice";
import { DetailsModal } from "../../components/ui/modal";
import { ButtonLoader } from "../../components/ui/loader";
import { fetchLoan, fetchLoanSchedule } from "../../redux/loanSlice";
import { useNavigate } from "react-router-dom";

const LoanDetails = ({}) => {
  const selectedLoan = useSelector((state) => state.loan.selectedDetails);
  const loanSchedule = useSelector((state) => state.loan.loanSchedule);
  const scheduleLoading = useSelector((state) => state.loan.scheduleLoading);
  const scheduleError = useSelector((state) => state.loan.scheduleError);
  const navigate = useNavigate();
  const summary = useSelector(
    (state) => state.loanApprovalSummary.allLoanSummary
  );
  const summaryLoading = useSelector(
    (state) => state.loanApprovalSummary.loading
  );
  const summaryerror = useSelector((state) => state.loanApprovalSummary.error);

  const approveRes = useSelector(
    (state) => state.loanApprovalSummary.approveRes
  );
  const approveLoading = useSelector(
    (state) => state.loanApprovalSummary.approveLoading
  );

  const approveSuccess = useSelector(
    (state) => state.loanApprovalSummary.approveSuccess
  );

  const approveError = useSelector(
    (state) => state.loanApprovalSummary.approveError
  );

  const rejectRes = useSelector((state) => state.loanApprovalSummary.rejectRes);

  const rejectLoading = useSelector(
    (state) => state.loanApprovalSummary.rejectLoading
  );

  const rejectError = useSelector(
    (state) => state.loanApprovalSummary.rejectError
  );
  const dispatch = useDispatch();
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [summaryDialog, setSummaryDialog] = useState(false);
  const [formData, setFormData] = useState({ rejectionReason: "" });
  const [approvedAmount, setApprovedAmount] = useState("");
  // console.log(summary, summaryerror, selectedLoan);
  //   const { hasPermission } = useAdmin();
  const isCooperate = selectedLoan.customer?.userType === "CORPORATE";

  const handleViewSummary = () => {
    setSummaryDialog(true);
  };

  const handleApproveModal = () => {
    setShowApproveModal(true);
  };
  const handleApprove = () => {
    if (Number(approvedAmount) > selectedLoan.loanAmount) {
      return;
    }
    if (approvedAmount === "") {
      return;
    }
    if (Number(approvedAmount) === selectedLoan.loanAmount) {
      dispatch(
        approveLoan({ id: selectedLoan.id, requestBody: approvedAmount })
      );
    } else {
      dispatch(
        approveLowerAmount({ id: selectedLoan.id, amount: approvedAmount })
      );
    }
  };

  const handleReject = () => {
    if (formData.rejectionReason === "") {
      return;
    }
    dispatch(rejectLoan({ id: selectedLoan.id, reason: formData }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-NG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    if (rejectRes?.ok) {
      dispatch(fetchLoan());
    }
  }, [rejectRes]);

  useEffect(() => {
    dispatch(fetchLoanSchedule(selectedLoan.id));
    dispatch(fetchLoanApprovalSummary(selectedLoan.id));
    dispatch(setRejectState());
  }, []);
  return (
    <div className="max-w-8xl text-lg mx-auto p-6">
      <button
        onClick={handleBack}
        className="mb-9 text-white text-xl font-medium flex items-center gap-5 hover:underline hover:text-[#006181] group-hover:decoration-[#006181]">
        <ChevronLeft className="h-8 w-8" />
        Back
      </button>
      <div
        className={`grid grid-cols-1 ${
          isCooperate ? "sm:grid-cols-2" : "sm:grid-cols-1"
        } gap-4`}>
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedLoan.customer?.firstName}
              {selectedLoan.customer?.lastName} 's Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="text-lg font-medium">
                  {selectedLoan.customer?.firstName}
                  {selectedLoan.customer?.lastName}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Username</p>
                <p className="text-lg font-medium">
                  {selectedLoan.customer?.payinaUserName}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-lg font-medium">
                  {selectedLoan.customer?.email}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Phone Number</p>
                <p className="text-lg font-medium">
                  {selectedLoan.customer?.phoneNumber}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Account Type</p>
                <p className="text-lg font-medium">
                  {selectedLoan.customer?.userType}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Account Number</p>
                <p className="text-lg font-medium">
                  {selectedLoan.customer?.accountNumber}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tier Level</p>
                <p className="text-lg font-medium">
                  {selectedLoan.customer?.tierLevel}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p
                  className={`text-lg font-medium ${
                    selectedLoan.customer?.enabled
                      ? "text-green-600"
                      : selectedLoan.customer?.enabled
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}>
                  {selectedLoan.customer?.enabled ? "Active" : "Inactive"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        {selectedLoan.customer?.userType === "CORPORATE" && (
          <Card className="mt-5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Business Details</CardTitle>
            </CardHeader>
            <CardContent className="mt-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Business Name</p>
                  <p className="text-lg font-medium">
                    {selectedLoan.customer?.corporateCustomer.businessName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="text-lg font-medium">
                    {selectedLoan.customer?.corporateCustomer.businessCategory}{" "}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Business Type</p>
                  <p className="text-lg font-medium">
                    {selectedLoan.customer?.corporateCustomer.businessType}{" "}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Business Description
                  </p>
                  <p className="text-lg font-medium">
                    {
                      selectedLoan.customer?.corporateCustomer
                        .businessDescription
                    }
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Business Adress
                  </p>
                  <p className="text-lg font-medium">
                    {
                      selectedLoan.customer?.corporateCustomer
                        .businessHouseNumber
                    }
                    ,
                    {
                      selectedLoan.customer?.corporateCustomer
                        .businessStreetName
                    }
                    ,{selectedLoan.customer?.corporateCustomer.businessLGA}
                    {selectedLoan.customer?.corporateCustomer.businessState}
                    State
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Staff Number</p>
                  <p className="text-lg font-medium">
                    {selectedLoan.customer?.corporateCustomer.staffNumber}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Annual Income</p>
                  <p className="text-lg font-medium">
                    {selectedLoan.customer?.corporateCustomer.annualIncome}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      {/* Employment Information */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 mt-5">
        <Card>
          <CardContent>
            {selectedLoan?.employmentStatus && (
              <div className=" rounded-lg shadow-sm">
                <div className="px-6 py-4 ">
                  <h2 className="text-lg font-semibold  flex items-center">
                    <Building2 className="w-5 h-5 mr-2" />
                    Employment Information
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm  mb-1">Company Name</p>
                      <p className="text-lg font-medium">
                        {selectedLoan.companyName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm  mb-1">Employment Status</p>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 capitalize">
                        {selectedLoan.employmentStatus}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm  mb-1">Start Date</p>
                      <p className="text-sm font-medium ">
                        {formatDate(selectedLoan.employmentStartDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm  mb-1">Monthly Salary</p>
                      <p className="text-lg font-semibold ">
                        {formatCurrency(selectedLoan.monthlySalary)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        {/* Loan Details */}
        <Card>
          <CardContent>
            <div className="rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-semibold  flex items-center">
                  Loan Details
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm ">Loan Amount</span>
                  <span className="text-lg font-bold ">
                    {formatCurrency(selectedLoan.loanAmount)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm ">Duration</span>
                  <span className="text-sm font-medium">
                    {selectedLoan.loanDuration} month(s)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm ">Purpose</span>
                  <span className="text-sm font-medium">
                    {selectedLoan.loanPurpose}
                  </span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between items-center">
                  <span className="text-sm ">Interest Rate</span>
                  <span className="text-sm font-medium">
                    {selectedLoan.interestRate}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm ">Interest Amount</span>
                  <span className="text-sm font-medium">
                    {formatCurrency(selectedLoan.interestAmount)}
                  </span>
                </div>
                <div className="flex justify-between items-center font-semibold text-lg">
                  <span className="">Total Repayable</span>
                  <span className="">
                    {formatCurrency(selectedLoan.totalRepayable)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm ">Monthly Payment</span>
                  <span className="text-sm font-semibold ">
                    {formatCurrency(selectedLoan.monthlyRepayment)}
                  </span>
                </div>
                <div>
                  {selectedLoan?.guarantors?.length > 0 &&
                    selectedLoan?.guarantors.map((guarantor, index) => (
                      <div key={index} className="mb-2">
                        Guarantors
                        <p>
                          <strong>Name:</strong> {guarantor.name}
                        </p>
                        <p>
                          <strong>Phone:</strong> {guarantor.phoneNumber}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            {/* Action Buttons */}
            {(selectedLoan.status === "PENDING_ADMIN_APPROVAL" ||
              selectedLoan.status === "PENDING_USER_ACTION" ||
              selectedLoan.status === "USER_APPROVED_OFFER") && (
              <div className=" rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold  mb-4">Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={handleApproveModal}
                    disabled={approveLoading}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center">
                    {approveLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Approve Loan
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setShowRejectModal(true)}
                    disabled={rejectLoading}
                    className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center">
                    <XCircle className="w-5 h-5 mr-2" />
                    {rejectLoading ? " Processing..." : "Reject Loan"}
                  </button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            {/* Action Buttons */}
            {(selectedLoan.status === "PENDING_ADMIN_APPROVAL" ||
              selectedLoan.status === "PENDING_USER_ACTION" ||
              selectedLoan.status === "USER_APPROVED_OFFER") && (
              <div className=" rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold  mb-4">
                  Approval Summary.
                </h3>
                <p>View customer's approval summary before loan approval.</p>
                <div className="space-y-3">
                  <button
                    onClick={handleViewSummary}
                    // disabled={isProcessing}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center">
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      View Transaction Summary
                    </>
                  </button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {(selectedLoan.status === "REPAID" ||
        selectedLoan.status === "APPROVED") &&
        (scheduleLoading ? (
          (selectedLoan.status === "REPAID" ||
            selectedLoan.status === "APPROVED") && (
            <p className="text-sm text-center mt-3">Loading...</p>
          )
        ) : (selectedLoan.status === "REPAID" ||
            selectedLoan.status === "APPROVED") &&
          !scheduleLoading &&
          scheduleError ? (
          <p className="text-center text-sm text-red-500 mt-3">
            Error fetching loan schedule
          </p>
        ) : (
          (selectedLoan.status === "REPAID" ||
            selectedLoan.status === "APPROVED") && (
            <Card className="mt-4">
              <CardContent>
                <div className="overflow-x-auto mt-6">
                  <p className="text-center md:text-lg font-bold">
                    Repayment Schedule
                  </p>
                  <table className="min-w-full border border-gray-200 text-sm text-left">
                    <thead className="bg-gray-100 text-gray-900">
                      <tr>
                        <th className="px-4 py-2 border">#</th>
                        <th className="px-4 py-2 border">Due Date</th>
                        <th className="px-4 py-2 border">Amount Due (₦)</th>
                        <th className="px-4 py-2 border">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loanSchedule?.map((item) => (
                        <tr
                          key={item.installmentNumber}
                          className="hover:bg-stone-700">
                          <td className="px-4 py-2 border">
                            {item.installmentNumber}
                          </td>
                          <td className="px-4 py-2 border">{item.dueDate}</td>
                          <td className="px-4 py-2 border">
                            ₦{item.amountDue.toFixed(2)}
                          </td>
                          <td className="px-4 py-2 border">
                            {item.paid ? (
                              <span className="text-green-600 font-semibold">
                                Paid
                              </span>
                            ) : (
                              <span className="text-red-500 font-semibold">
                                Unpaid
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )
        ))}

      {/* loan summary modal */}
      <DetailsModal
        isOpen={summaryDialog}
        onClose={() => setSummaryDialog(false)}
        title={"Approval Summary."}>
        <Card>
          <CardContent>
            {summaryLoading ? (
              <p className="text-center">Loading...</p>
            ) : !summaryLoading && summaryerror === "Rejected" ? (
              <p className="text-red-600 text-center">
                Failed to load transaction summary
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                <div className="">
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="text-lg font-medium">{summary?.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Eligible by employment. (Spent at least 6 months at current
                    place of work)
                  </p>
                  <p className="text-lg font-medium text-white">
                    {summary?.eligibleByEmployment ? "True" : "False"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Eligible by salary. (Loan amount should be at least 30% of
                    monthly earnings)
                  </p>
                  <p className="text-lg font-medium">
                    {summary?.eligibleBySalary ? "True" : "False"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Monthly Earnings
                  </p>
                  <p className="text-lg font-medium">
                    ₦{summary?.monthlySalary?.toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Monthly Repayment
                  </p>
                  <p className="text-lg font-medium">
                    ₦{summary?.monthlyRepayment?.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Loan Amount</p>
                  <p className="text-lg font-medium">{summary?.loanAmount}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Loan Duration</p>
                  <p className="text-lg font-medium">
                    {summary?.loanDuration} Month(s)
                  </p>
                </div>
                <div className="">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p
                    className={`text-lg font-medium ${
                      summary?.activeUser
                        ? "text-green-200"
                        : summary?.activeUser
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}>
                    {summary?.activeUser ? "Active" : "Inactive"}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </DetailsModal>

      {/* Reject loan modal */}
      <DetailsModal
        isOpen={showRejectModal}
        onClose={() => {
          setShowRejectModal(false);
        }}
        title={"Reject Loan."}>
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Textarea
                  id="rejectionReason"
                  name="rejectionReason"
                  placeholder="Enter rejection reason"
                  rows={4}
                  value={formData.rejectionReason}
                  onChange={(e) => {
                    setFormData(e.target.value);
                  }}
                  required
                />
              </div>

              <div className="pt-4 flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowRejectModal(false);
                    dispatch(setRejectState());
                  }}>
                  Cancel
                </Button>
                <Button
                  onClick={handleReject}
                  type="submit"
                  disabled={rejectLoading}>
                  {rejectLoading && <ButtonLoader />}
                  Submit
                </Button>
              </div>
              {rejectRes?.ok && (
                <p className="text-green-300">Loan rejected successfully.</p>
              )}

              {rejectError && (
                <p className="text-red-400"> Something went wrong.</p>
              )}
            </form>
          </CardContent>
        </Card>
      </DetailsModal>
      {/* Approve modal */}
      <DetailsModal
        isOpen={showApproveModal}
        onClose={() => {
          setShowApproveModal(false);
        }}
        title={"Approve Loan."}>
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <input
                  className="w-[300px] h-[50px] m-auto px-4"
                  id="approveAmount"
                  name="approveAmount"
                  placeholder="Enter Approved Amount"
                  rows={4}
                  value={approvedAmount}
                  onChange={(e) => {
                    setApprovedAmount(e.target.value);
                  }}
                  required
                />
              </div>

              <div className="pt-4 flex justify-center space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowApproveModal(false);
                    dispatch(setRejectState());
                  }}>
                  Cancel
                </Button>
                <Button
                  onClick={handleApprove}
                  disabled={approveLoading}
                  className="">
                  {approveLoading ? (
                    <div className="flex items-center justify-end">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Approve Loan
                    </>
                  )}
                </Button>
              </div>
              {approveSuccess && (
                <p className="text-green-600 ">{approveRes}</p>
              )}
              {approveError && (
                <p className="text-red-600 ">Something went wrong.</p>
              )}
            </form>
          </CardContent>
        </Card>
      </DetailsModal>
    </div>
  );
};

export default LoanDetails;
