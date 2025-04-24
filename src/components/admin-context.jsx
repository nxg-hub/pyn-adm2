"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Admin roles
const ADMIN_ROLES = {
  SUPER_ADMIN: "super_admin",
  COMPLIANCE_ADMIN: "compliance_admin",
  SUPPORT_ADMIN: "support_admin",
  FINANCE_ADMIN: "finance_admin",
  READONLY_ADMIN: "readonly_admin",
}

// Initial admin state
const initialAdminState = {
  currentRole: ADMIN_ROLES.SUPER_ADMIN,
  roles: [
    { id: ADMIN_ROLES.SUPER_ADMIN, name: "Super Admin", color: "purple" },
    { id: ADMIN_ROLES.COMPLIANCE_ADMIN, name: "Compliance Admin", color: "blue" },
    { id: ADMIN_ROLES.SUPPORT_ADMIN, name: "Support Admin", color: "green" },
    { id: ADMIN_ROLES.FINANCE_ADMIN, name: "Finance Admin", color: "amber" },
    { id: ADMIN_ROLES.READONLY_ADMIN, name: "Read-Only Admin", color: "gray" },
  ],
  permissions: {
    [ADMIN_ROLES.SUPER_ADMIN]: {
      users: ["view", "create", "edit", "delete", "approve"],
      transactions: ["view", "approve", "reject", "flag", "edit"],
      wallets: ["view", "create", "edit", "freeze", "unfreeze"],
      settings: ["view", "edit"],
      analytics: ["view"],
      compliance: ["view", "edit", "approve"],
      support: ["view", "respond", "escalate", "resolve"],
      reports: ["view", "create", "export"],
      admins: ["view", "create", "edit", "delete"],
    },
    [ADMIN_ROLES.COMPLIANCE_ADMIN]: {
      users: ["view", "flag"],
      transactions: ["view", "flag", "approve", "reject"],
      wallets: ["view", "freeze"],
      compliance: ["view", "edit", "approve"],
      reports: ["view", "create", "export"],
    },
    [ADMIN_ROLES.SUPPORT_ADMIN]: {
      users: ["view"],
      transactions: ["view"],
      wallets: ["view"],
      support: ["view", "respond", "escalate", "resolve"],
    },
    [ADMIN_ROLES.FINANCE_ADMIN]: {
      transactions: ["view", "approve", "reject"],
      wallets: ["view"],
      analytics: ["view"],
      reports: ["view", "create", "export"],
    },
    [ADMIN_ROLES.READONLY_ADMIN]: {
      users: ["view"],
      transactions: ["view"],
      wallets: ["view"],
      analytics: ["view"],
      compliance: ["view"],
      support: ["view"],
      reports: ["view"],
    },
  },
}

// Create context
const AdminContext = createContext(null)

// Provider component
export function AdminProvider({ children }) {
  const [adminState, setAdminState] = useState(() => {
    // Try to get saved role from localStorage
    const savedRole = localStorage.getItem("adminRole")
    if (savedRole && Object.values(ADMIN_ROLES).includes(savedRole)) {
      return {
        ...initialAdminState,
        currentRole: savedRole,
      }
    }
    return initialAdminState
  })

  useEffect(() => {
    localStorage.getItem("adminRole")
  },
)

  // Change admin role
  const changeRole = (roleId) => {
    if (Object.values(ADMIN_ROLES).includes(roleId)) {
      setAdminState((prev) => ({
        ...prev,
        currentRole: roleId,
      }))
    }
  }

  // Check if admin has permission
  const hasPermission = (section, action) => {
    const rolePermissions = adminState.permissions[adminState.currentRole]
    return rolePermissions && rolePermissions[section] && rolePermissions[section].includes(action)
  }

  // Get current role object
  const getCurrentRoleObject = () => {
    return adminState.roles.find((role) => role.id === adminState.currentRole)
  }

  // Context value
  const value = {
    currentRole: adminState.currentRole,
    roles: adminState.roles,
    permissions: adminState.permissions,
    changeRole,
    hasPermission,
    getCurrentRoleObject,
    ADMIN_ROLES,
  }

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}

// Custom hook to use the admin context
export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider")
  }
  return context
}
