import { SidebarProvider } from "../../components/ui/sidebar"
import { AdminSidebar } from "../../components/admin-sidebar"
import { AdminHeader } from "../../components/admin-header"

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <AdminHeader />
        <div className="flex flex-1">
          <AdminSidebar />
          <main className="flex-1 overflow-x-hidden p-4 md:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
