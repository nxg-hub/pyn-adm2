import { useState } from "react"
import { Shield, Mail, Users } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Alert } from "../../components/ui/alert"
import { Card } from "../../components/ui/card"
import { Select } from "../../components/ui/select"

export function InviteAdminPage() {
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const { inviteAdmin, error } = useAuth()

    const roles = [
        { value: "general_manager", label: "General Manager" },
        { value: "operations_manager", label: "Operations Manager" },
        { value: "finance_manager", label: "Finance Manager" },
        { value: "customer_care", label: "Customer Care Representative" },
    ]

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const success = await inviteAdmin(email, role)
        if (success) {
            setIsSuccess(true)
            setEmail("")
            setRole("")
        }
        setIsLoading(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="max-w-md w-full space-y-8 p-8">
                <div className="flex flex-col items-center justify-center">
                    <Shield className="h-12 w-12 text-primary" />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Invite Admin</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Send an invitation to a new admin user
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <Alert variant="destructive" className="mb-4">
                            {error}
                        </Alert>
                    )}

                    {isSuccess && (
                        <Alert className="mb-4">
                            Invitation sent successfully
                        </Alert>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <div className="relative mt-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="pl-10"
                                    placeholder="admin@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                Role
                            </label>
                            <div className="relative mt-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Users className="h-5 w-5 text-gray-400" />
                                </div>
                                <Select
                                    id="role"
                                    name="role"
                                    required
                                    className="pl-10"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="">Select a role</option>
                                    {roles.map((role) => (
                                        <option key={role.value} value={role.value}>
                                            {role.label}
                                        </option>
                                    ))}
                                </Select>
                            </div>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        disabled={isLoading || !email || !role}
                    >
                        {isLoading ? "Sending Invitation..." : "Send Invitation"}
                    </Button>
                </form>
            </Card>
        </div>
    )
}
export default InviteAdminPage;