// import { createContext, useContext, useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom"
//
// const AuthContext = createContext(null)
//
// // Mock users with roles and permissions
// const MOCK_USERS = [
//   {
//     id: 1,
//     email: "super@admin.com",
//     password: "admin123",
//     name: "Super Admin",
//     role: "Super Admin",
//     permissions: [
//       "dashboard.view", "users.view", "transactions.view", "wallets.view",
//       "support.view", "compliance.view", "analytics.view", "notifications.manage",
//       "settings.manage", "reports.view", "system.view", "admin.manage",
//       "admin.finance", "transactions.approve", "withdrawals.approve",
//       "kyc.verify", "aml.monitor", "system.configure"
//     ]
//   },
//   {
//     id: 2,
//     email: "gm@admin.com",
//     password: "admin123",
//     name: "General Manager",
//     role: "General Manager",
//     permissions: [
//       "dashboard.view", "users.view", "transactions.view", "wallets.view",
//       "support.view", "compliance.view", "analytics.view", "notifications.manage",
//       "settings.manage", "reports.view", "system.view", "admin.manage",
//       "transactions.approve"
//     ]
//   },
//   {
//     id: 3,
//     email: "ops@admin.com",
//     password: "admin123",
//     name: "Operations Manager",
//     role: "Operations Manager",
//     permissions: [
//       "users.view", "transactions.view", "support.view", "compliance.view",
//       "transactions.approve"
//     ]
//   },
//   {
//     id: 4,
//     email: "finance@admin.com",
//     password: "admin123",
//     name: "Finance Manager",
//     role: "Finance Manager",
//     permissions: [
//       "transactions.view", "wallets.view", "reports.view", "admin.finance",
//       "withdrawals.approve"
//     ]
//   },
//   {
//     id: 5,
//     email: "care@admin.com",
//     password: "admin123",
//     name: "Customer Care",
//     role: "Customer Care Rep",
//     permissions: ["support.view", "users.view"]
//   }
// ]
//
// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null)
//   const [error, setError] = useState("")
//   const [loading, setLoading] = useState(true)
//   const navigate = useNavigate()
//
//   // Check for existing session on mount
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user")
//     if (storedUser) {
//       setUser(JSON.parse(storedUser))
//     }
//     setLoading(false)
//   }, [])
//
//   // Login function
//   const login = async (email, password) => {
//     setError("")
//     try {
//       // Simulate API call
//       const user = MOCK_USERS.find(
//           (u) => u.email === email && u.password === password
//       )
//
//       if (!user) {
//         throw new Error("Invalid email or password")
//       }
//
//       // In production, you would receive a JWT token here
//       const mockToken = "mock-jwt-token"
//
//       // Store user data and token
//       const userData = {
//         id: user.id,
//         email: user.email,
//         name: user.name,
//         role: user.role,
//         permissions: user.permissions,
//         token: mockToken
//       }
//
//       setUser(userData)
//       localStorage.setItem("user", JSON.stringify(userData))
//
//       // Redirect to 2FA page
//       navigate("/auth/2fa")
//     } catch (err) {
//       setError(err.message)
//       return false
//     }
//   }
//
//   // 2FA verification
//   const verify2FA = async (code) => {
//     setError("")
//     try {
//       // Simulate 2FA verification
//       if (code !== "123456") {
//         throw new Error("Invalid verification code")
//       }
//
//       // Mark 2FA as verified
//       const userData = { ...user, twoFactorVerified: true }
//       setUser(userData)
//       localStorage.setItem("user", JSON.stringify(userData))
//
//       // Redirect to dashboard
//       navigate("/dashboard")
//       return true
//     } catch (err) {
//       setError(err.message)
//       return false
//     }
//   }
//
//   // Logout function
//   const logout = () => {
//     setUser(null)
//     localStorage.removeItem("user")
//     navigate("/auth/login")
//   }
//
//   // Password reset request
//   const forgotPassword = async (email) => {
//     setError("")
//     try {
//       const user = MOCK_USERS.find((u) => u.email === email)
//       if (!user) {
//         throw new Error("Email not found")
//       }
//
//       // In production, send password reset email
//       console.log("Password reset email sent to:", email)
//       return true
//     } catch (err) {
//       setError(err.message)
//       return false
//     }
//   }
//
//   // Invite new admin
//   const inviteAdmin = async (email, role) => {
//     setError("")
//     try {
//       // In production, send invitation email
//       console.log("Invitation sent to:", email, "with role:", role)
//       return true
//     } catch (err) {
//       setError(err.message)
//       return false
//     }
//   }
//
//   // Check if user has a specific permission
//   const checkPermission = (permission) => {
//     if (!user) return false
//     return user.permissions.includes(permission)
//   }
//
//   // Check if user has access to a specific route
//   const checkRouteAccess = (path) => {
//     if (!user) return false
//
//     // Map routes to required permissions
//     const routePermissions = {
//       "/dashboard": "dashboard.view",
//       "/dashboard/users": "users.view",
//       "/dashboard/transactions": "transactions.view",
//       "/dashboard/wallets": "wallets.view",
//       "/dashboard/support": "support.view",
//       "/dashboard/compliance": "compliance.view",
//       "/dashboard/analytics": "analytics.view",
//       "/dashboard/notifications": "notifications.manage",
//       "/dashboard/settings": "settings.manage",
//       "/dashboard/reports": "reports.view",
//       "/dashboard/system": "system.view"
//     }
//
//     const requiredPermission = routePermissions[path]
//     if (!requiredPermission) return true // Public route
//     return checkPermission(requiredPermission)
//   }
//
//   const value = {
//     user,
//     error,
//     loading,
//     login,
//     logout,
//     verify2FA,
//     forgotPassword,
//     inviteAdmin,
//     checkPermission,
//     checkRouteAccess
//   }
//
//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
// }
//
// export function useAuth() {
//   const context = useContext(AuthContext)
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider")
//   }
//   return context
// }






import { createContext, useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext(null)

// Mock users with roles and permissions
const MOCK_USERS = [
  {
    id: 1,
    email: "super@admin.com",
    password: "admin123",
    name: "Super Admin",
    role: "Super Admin",
    permissions: [
      "dashboard.view", "users.view", "transactions.view", "wallets.view",
      "support.view", "compliance.view", "analytics.view", "notifications.manage",
      "settings.manage", "reports.view", "system.view", "admin.manage",
      "admin.finance", "transactions.approve", "withdrawals.approve",
      "kyc.verify", "aml.monitor", "system.configure"
    ]
  },
  {
    id: 2,
    email: "gm@admin.com",
    password: "admin123",
    name: "General Manager",
    role: "General Manager",
    permissions: [
      "dashboard.view", "users.view", "transactions.view", "wallets.view",
      "support.view", "compliance.view", "analytics.view", "notifications.manage",
      "settings.manage", "reports.view", "system.view", "admin.manage",
      "transactions.approve"
    ]
  },
  {
    id: 3,
    email: "ops@admin.com",
    password: "admin123",
    name: "Operations Manager",
    role: "Operations Manager",
    permissions: [
      "users.view", "transactions.view", "support.view", "compliance.view",
      "transactions.approve"
    ]
  },
  {
    id: 4,
    email: "finance@admin.com",
    password: "admin123",
    name: "Finance Manager",
    role: "Finance Manager",
    permissions: [
      "transactions.view", "wallets.view", "reports.view", "admin.finance",
      "withdrawals.approve"
    ]
  },
  {
    id: 5,
    email: "care@admin.com",
    password: "admin123",
    name: "Customer Care",
    role: "Customer Care Rep",
    permissions: ["support.view", "users.view"]
  }
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  // Login function
  const login = async (email, password) => {
    setError("")
    try {
      // Simulate API call
      const user = MOCK_USERS.find(
          (u) => u.email === email && u.password === password
      )

      if (!user) {
        throw new Error("Invalid email or password")
      }

      // In production, you would receive a JWT token here
      const mockToken = "mock-jwt-token"

      // Store user data and token
      const userData = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        permissions: user.permissions,
        token: mockToken
      }

      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))

      // Redirect to 2FA page
      navigate("/auth/2fa")
    } catch (err) {
      setError(err.message)
      return false
    }
  }

  // 2FA verification
  const verify2FA = async (code) => {
    setError("")
    try {
      // Simulate 2FA verification
      if (code !== "123456") {
        throw new Error("Invalid verification code")
      }

      // Mark 2FA as verified
      const userData = { ...user, twoFactorVerified: true }
      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))

      // Redirect to dashboard
      navigate("/dashboard")
      return true
    } catch (err) {
      setError(err.message)
      return false
    }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    navigate("/auth/login")
  }

  // Password reset request
  const forgotPassword = async (email) => {
    setError("")
    try {
      const user = MOCK_USERS.find((u) => u.email === email)
      if (!user) {
        throw new Error("Email not found")
      }

      // In production, send password reset email
      console.log("Password reset email sent to:", email)
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
      // In production, send invitation email
      console.log("Invitation sent to:", email, "with role:", role)
      return true
    } catch (err) {
      setError(err.message)
      return false
    }
  }

  // Check if user has a specific permission
  const checkPermission = (permission) => {
    if (!user) return false
    return user.permissions.includes(permission)
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
      "/dashboard/system": "system.view"
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
    inviteAdmin,
    checkPermission,
    checkRouteAccess
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