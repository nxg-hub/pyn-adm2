"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
// import authService from "../services/auth-service"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Check for existing session on mount
  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
    setLoading(false)
  }, [])

  // Login function
  const login = async (email, password) => {
    setError("")
    try {
      const result = await authService.login(email, password)

      if (!result.success) {
        throw new Error(result.message || "Invalid email or password")
      }

      // Update user state with the returned data
      setUser(result.userData)

      // If 2FA is required, navigate to 2FA page
      // otherwise go directly to dashboard
      if (result.data.requiresVerification) {
        navigate("/auth/2fa")
      } else {
        navigate("/dashboard")
      }

      return true
    } catch (err) {
      setError(err.message)
      return false
    }
  }

  // 2FA verification
  const verify2FA = async (code) => {
    setError("")
    try {
      const result = await authService.verify2FA(code)

      if (!result.success) {
        throw new Error(result.message || "Invalid verification code")
      }

      // Mark 2FA as verified
      const userData = { ...user, twoFactorVerified: true }
      setUser(userData)

      // Redirect to dashboard
      navigate("/dashboard")
      return true
    } catch (err) {
      setError(err.message)
      return false
    }
  }

  // Logout function
  const logout = async () => {
    await authService.logout()
    setUser(null)
    navigate("/auth/login")
  }

  // Password reset request
  const forgotPassword = async (email) => {
    setError("")
    try {
      const result = await authService.requestPasswordReset(email)

      if (!result.success) {
        throw new Error(result.message || "Failed to send reset email")
      }

      return true
    } catch (err) {
      setError(err.message)
      return false
    }
  }

  // Reset password
  const resetPassword = async (token, password, confirmPassword) => {
    setError("")
    try {
      const result = await authService.resetPassword(token, password, confirmPassword)

      if (!result.success) {
        throw new Error(result.message || "Failed to reset password")
      }

      return true
    } catch (err) {
      setError(err.message)
      return false
    }
  }

  // Invite new admin
  const inviteAdmin = async (email, role) => {
    setError("")
    try {
      const result = await authService.inviteAdmin(email, role)

      if (!result.success) {
        throw new Error(result.message || "Failed to send invitation")
      }

      return true
    } catch (err) {
      setError(err.message)
      return false
    }
  }

  // Complete registration
  const completeRegistration = async (token, userData) => {
    setError("")
    try {
      const result = await authService.completeRegistration(token, userData)

      if (!result.success) {
        throw new Error(result.message || "Failed to complete registration")
      }

      return true
    } catch (err) {
      setError(err.message)
      return false
    }
  }

  // Check if user has a specific permission
  const checkPermission = (permission) => {
    if (!user) return false
    return user.permissions && user.permissions.includes(permission)
  }

  // Check if user has access to a specific route
  const checkRouteAccess = (path) => {
    if (!user) return false

    // Map routes to required permissions
    const routePermissions = {
      "/dashboard": "dashboard.view",
      "/dashboard/users": "users.view",
      "/dashboard/transactions": "transactions.view",
      "/dashboard/wallets": "wallets.view",
      "/dashboard/support": "support.view",
      "/dashboard/compliance": "compliance.view",
      "/dashboard/analytics": "analytics.view",
      "/dashboard/notifications": "notifications.manage",
      "/dashboard/settings": "settings.manage",
      "/dashboard/reports": "reports.view",
      "/dashboard/system": "system.view",
    }

    const requiredPermission = routePermissions[path]
    if (!requiredPermission) return true // Public route
    return checkPermission(requiredPermission)
  }

  const value = {
    user,
    error,
    loading,
    login,
    logout,
    verify2FA,
    forgotPassword,
    resetPassword,
    inviteAdmin,
    completeRegistration,
    checkPermission,
    checkRouteAccess,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}