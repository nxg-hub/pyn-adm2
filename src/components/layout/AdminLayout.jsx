import { Outlet } from "react-router-dom"
import { AdminHeader } from "./AdminHeader"
import { AdminSidebar } from "./AdminSidebar"
import { Breadcrumb } from "../common/Breadcrumb"
import { useAdmin } from "../../contexts/AdminContext.jsx"
import { Menu } from "lucide-react"
import { useState } from "react"

function AdminLayout() {
  const { adminRole } = useAdmin()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen">
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-black shadow-md transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:transform-none`}
      >
        <AdminSidebar />
      </div>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between p-4 shadow-md md:hidden">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle Sidebar">
            <Menu className="h-6 w-6" />
          </button>
          <span className="font-bold text-lg">Admin Dashboard</span>
        </div>

        <AdminHeader />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Breadcrumb />
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
