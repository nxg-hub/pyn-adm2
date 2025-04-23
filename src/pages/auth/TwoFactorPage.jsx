import { useState } from "react"
import { Link } from "react-router-dom"
import { Shield, KeyRound } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Alert } from "../../components/ui/alert"
import { Card } from "../../components/ui/card"

export function TwoFactorPage() {
    const [code, setCode] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { verify2FA, error } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        await verify2FA(code)
        setIsLoading(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="max-w-md w-full space-y-8 p-8">
                <div className="flex flex-col items-center justify-center">
                    <Shield className="h-12 w-12 text-primary" />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Two-Factor Authentication</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Enter the 6-digit code from your authenticator app
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <Alert variant="destructive" className="mb-4">
                            {error}
                        </Alert>
                    )}

                    <div>
                        <label htmlFor="code" className="sr-only">
                            Authentication Code
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <KeyRound className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                                id="code"
                                name="code"
                                type="text"
                                required
                                className="pl-10 text-center tracking-widest font-mono text-lg"
                                placeholder="000000"
                                maxLength={6}
                                value={code}
                                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        disabled={isLoading || code.length !== 6}
                    >
                        {isLoading ? "Verifying..." : "Verify"}
                    </Button>

                    <div className="text-center">
                        <Link
                            to="/auth/login"
                            className="text-sm font-medium text-primary hover:text-primary/80"
                        >
                            Back to login
                        </Link>
                    </div>
                </form>
            </Card>
        </div>
    )
}
export default TwoFactorPage;