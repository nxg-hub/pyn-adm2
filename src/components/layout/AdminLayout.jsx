import { Outlet } from "react-router-dom"
import AdminSidebar from "./AdminSidebar"
import { Bell, Search, Settings, User } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useAuth } from "../../contexts/AuthContext"

export default function AdminLayout() {
  const { user } = useAuth()

  return (
      <div className="flex h-screen bg-gray-900">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 flex items-center justify-between px-6 border-b border-gray-800 bg-gray-900">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative w-96">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                    placeholder="Search..."
                    className="pl-8 bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-400 focus:border-gray-600"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-100">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-100">
                <Settings className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2 text-gray-100">
                <span className="text-sm">{user?.name}</span>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-100">
                  <User className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto py-6 px-4 text-gray-100">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
  )
}