"use client"

import { createContext, useContext, useState, useEffect } from "react"

export const AdminRoles = [
  "SUPER_ADMIN",
  "GENERAL_MANAGER",
  "OPERATIONS_MANAGER",
  "FINANCE_MANAGER",
  "CUSTOMER_CARE_REP",
]

const rolePermissions = {
  "SUPER_ADMIN": {
    manageAdmins: true,
    approveRejectTransactions: true,
    approveWithdrawals: true,
    monitorTransactionFlow: true,
    manageUserAccounts: true,
    handleDisputesSupport: true,
    setTransactionLimits: true,
    viewFinancialReports: true,
    sendPushNotifications: true,
    adjustWalletBalances: true,
    viewFullTransactionHistory: true,
    enableDisable2FA: true,
    viewAdminActivityLogs: true,
    kycVerification: true,
    suspendUnsuspendAccounts: true,
    resetUserPasswords: true,
    reconcileFinancialDiscrepancies: true,
    monitorHighRiskTransactions: true,
    assignSupportTickets: true,
    monitorSuspiciousVirtualCardTransactions: true
  },
  "GENERAL_MANAGER": {
    manageAdmins: true,
    approveRejectTransactions: true,
    approveWithdrawals: true,
    monitorTransactionFlow: true,
    manageUserAccounts: true,
    handleDisputesSupport: true,
    setTransactionLimits: true,
    viewFinancialReports: true,
    sendPushNotifications: true,
    adjustWalletBalances: false,
    viewFullTransactionHistory: true,
    enableDisable2FA: false,
    viewAdminActivityLogs: true,
    kycVerification: true,
    suspendUnsuspendAccounts: true,
    resetUserPasswords: true,
    reconcileFinancialDiscrepancies: false,
    monitorHighRiskTransactions: true,
    assignSupportTickets: true,
  },
  "OPERATIONS_MANAGER": {
    manageAdmins: false,
    approveRejectTransactions: true,
    approveWithdrawals: true,
    monitorTransactionFlow: true,
    manageUserAccounts: true,
    handleDisputesSupport: true,
    setTransactionLimits: true,
    viewFinancialReports: true,
    sendPushNotifications: true,
    adjustWalletBalances: false,
    viewFullTransactionHistory: false,
    enableDisable2FA: false,
    viewAdminActivityLogs: false,
    kycVerification: true,
    suspendUnsuspendAccounts: true,
    resetUserPasswords: true,
    reconcileFinancialDiscrepancies: false,
    monitorHighRiskTransactions: true,
    assignSupportTickets: false,
  },
  "FINANCE_MANAGER": {
    manageAdmins: false,
    approveRejectTransactions: true,
    approveWithdrawals: true,
    monitorTransactionFlow: true,
    manageUserAccounts: false,
    handleDisputesSupport: false,
    setTransactionLimits: true,
    viewFinancialReports: true,
    sendPushNotifications: false,
    adjustWalletBalances: false,
    viewFullTransactionHistory: false,
    enableDisable2FA: false,
    viewAdminActivityLogs: false,
    kycVerification: false,
    suspendUnsuspendAccounts: false,
    resetUserPasswords: false,
    reconcileFinancialDiscrepancies: true,
    monitorHighRiskTransactions: false,
    assignSupportTickets: false,
  },
  "CUSTOMER_CARE_REP": {
    manageAdmins: false,
    approveRejectTransactions: false,
    approveWithdrawals: false,
    monitorTransactionFlow: true,
    manageUserAccounts: true,
    handleDisputesSupport: true,
    setTransactionLimits: false,
    viewFinancialReports: false,
    sendPushNotifications: false,
    adjustWalletBalances: false,
    viewFullTransactionHistory: false,
    enableDisable2FA: false,
    viewAdminActivityLogs: false,
    kycVerification: true,
    suspendUnsuspendAccounts: false,
    resetUserPasswords: true,
    reconcileFinancialDiscrepancies: false,
    monitorHighRiskTransactions: false,
    assignSupportTickets: true,
  },
}

const AdminContext = createContext(undefined)

export function AdminProvider({ children }) {
  const [currentRole, setCurrentRole] = useState(() => {
    // Try to get the saved role from localStorage
    const savedRole = localStorage.getItem("adminRole")
    return savedRole && AdminRoles.includes(savedRole) ? savedRole : "SUPER_ADMIN"
  })

  const allRoles = AdminRoles

  // Save the role to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("adminRole", currentRole)
  }, [currentRole])

  const hasPermission = (permission) => {
    return rolePermissions[currentRole][permission]
  }

  return (
    <AdminContext.Provider value={{ currentRole, setCurrentRole, hasPermission, allRoles }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider")
  }
  return context
}
