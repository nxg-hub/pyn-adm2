"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { ButtonLoader } from "../../components/ui/loader"
import { useAdmin } from "../../contexts/AdminContext"

const LoginPage = () => {
  const navigate = useNavigate()
  const { setCurrentRole } = useAdmin()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Demo users for different admin roles
    const demoUsers = [
      { email: "super@payina.com", password: "password", role: "Super Admin" },
      { email: "gm@payina.com", password: "password", role: "General Manager" },
      { email: "ops@payina.com", password: "password", role: "Operations Manager" },
      { email: "finance@payina.com", password: "password", role: "Finance Manager" },
      { email: "care@payina.com", password: "password", role: "Customer Care Rep" },
    ]

    // Simulate API call
    setTimeout(() => {
      const user = demoUsers.find((user) => user.email === formData.email && user.password === formData.password)

      if (user) {
        // Set the user role in context
        setCurrentRole(user.role)

        // Store in localStorage for persistence
        localStorage.setItem("currentRole", user.role)
        localStorage.setItem("isAuthenticated", "true")

        // Redirect to dashboard
        navigate("/")
      } else {
        setError("Invalid email or password. Try one of the demo accounts.")
      }

      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="rounded-lg border bg-white p-8 shadow-sm">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-blue-600">Payina Admin</h1>
            <p className="mt-2 text-sm text-gray-600">Sign in to your admin account</p>
          </div>

          {error && <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@example.com"
                  className="pl-10"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/auth/forgot-password" className="text-xs text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <ButtonLoader />}
              Sign In
            </Button>
          </form>

          <div className="mt-6 space-y-4">
            <div className="text-center text-sm text-gray-600">
              <p>Demo accounts:</p>
              <div className="mt-2 grid grid-cols-1 gap-1 text-xs">
                <div>Super Admin: super@payina.com / password</div>
                <div>General Manager: gm@payina.com / password</div>
                <div>Operations Manager: ops@payina.com / password</div>
                <div>Finance Manager: finance@payina.com / password</div>
                <div>Customer Care: care@payina.com / password</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
