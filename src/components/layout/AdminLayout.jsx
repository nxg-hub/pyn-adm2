// import { Outlet } from "react-router-dom"
// import { AdminSidebar } from "./AdminSidebar"
// import { AdminHeader } from "./AdminHeader"
// import { Breadcrumb } from "../common/Breadcrumb"
// import { useLocation } from "react-router-dom"
//
// const AdminLayout = () => {
//   const location = useLocation()
//
//   // Generate breadcrumb items based on the current path
//   const generateBreadcrumbs = () => {
//     const paths = location.pathname.split("/").filter((path) => path)
//
//     // Create breadcrumb items
//     const breadcrumbs = paths.map((path, index) => {
//       // Create the URL for this breadcrumb
//       const url = `/${paths.slice(0, index + 1).join("/")}`
//
//       // Format the label (capitalize first letter, replace hyphens with spaces)
//       const label = path
//         .split("-")
//         .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//         .join(" ")
//
//       return { label, url }
//     })
//
//     // Add home as the first breadcrumb
//     return [{ label: "Home", url: "/dashboard" }, ...breadcrumbs]
//   }
//
//   const breadcrumbs = generateBreadcrumbs()
//
//   return (
//     <div className="flex min-h-screen">
//       <AdminSidebar />
//       <div className="flex-1 flex flex-col overflow-x-hidden">
//         <AdminHeader
//           title={breadcrumbs[breadcrumbs.length - 1]?.label || "Dashboard"}
//           subtitle="Welcome to the admin dashboard"
//         />
//         <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800">
//           <Breadcrumb items={breadcrumbs} />
//         </div>
//         <main className="flex-1 p-4">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   )
// }
//
// export default AdminLayout

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
      {/* Fixed Sidebar (desktop and mobile toggle) */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-black shadow-md transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:transform-none`}
      >
        <AdminSidebar />
      </div>

      {/* Background overlay when sidebar is open on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content area (shifted right on desktop) */}
      <div className="flex flex-col flex-1">
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 shadow-md md:hidden">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle Sidebar">
            <Menu className="h-6 w-6" />
          </button>
          <span className="font-bold text-lg">Admin Dashboard</span>
        </div>

        {/* Admin Header (desktop visible) */}
        <AdminHeader />

        {/* Scrollable content area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Breadcrumb />
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
