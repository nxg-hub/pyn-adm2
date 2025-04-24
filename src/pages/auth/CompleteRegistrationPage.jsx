import { useState } from "react"
import { useParams } from "react-router-dom"
import { Shield, Lock, Eye, EyeOff } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Alert } from "../../components/ui/alert"
import { Card } from "../../components/ui/card"

export function CompleteRegistrationPage() {
    const { token } = useParams()
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    })
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const { error } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (formData.password !== formData.confirmPassword) {
            return // Add error handling for password mismatch
        }

        setIsLoading(true)
        // In production, send password and token to backend
        setTimeout(() => {
            setIsSuccess(true)
            setIsLoading(false)
        }, 1500)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="max-w-md w-full space-y-8 p-8">
                <div className="flex flex-col items-center justify-center">
                    <Shield className="h-12 w-12 text-primary" />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Complete Registration</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Set your password to activate your account
                    </p>
                </div>

                {isSuccess ? (
                    <div className="text-center">
                        <Alert className="mb-4">
                            Registration completed successfully. You can now log in.
                        </Alert>
                        <Button
                            onClick={() => navigate("/auth/login")}
                            className="mt-4"
                        >
                            Go to Login
                        </Button>
                    </div>
                ) : (
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <Alert variant="destructive" className="mb-4">
                                {error}
                            </Alert>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="relative mt-1">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        className="pl-10 pr-10"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={(e) =>
                                            setFormData((prev) => ({ ...prev, password: e.target.value }))
                                        }
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5 text-gray-400" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-gray-400" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                    Confirm Password
                                </label>
                                <div className="relative mt-1">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        className="pl-10 pr-10"
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={(e) =>
                                            setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            size="lg"
                            disabled={isLoading || !formData.password || !formData.confirmPassword}
                        >
                            {isLoading ? "Setting up..." : "Complete Registration"}
                        </Button>
                    </form>
                )}
            </Card>
        </div>
    )
}
export default CompleteRegistrationPage;