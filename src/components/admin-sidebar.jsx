import { Link, useLocation } from "react-router-dom"
import {
  BarChart3,
  Bell,
  CreditCard,
  FileText,
  HelpCircle,
  LayoutDashboard,
  LifeBuoy,
  PieChart,
  Settings,
  Shield,
  Users,
  Wallet,
  UserCog,
  ScrollText,
  AlertCircle,
  BadgeCheck,
  Lock,
  Key,
  UserPlus,
  MessageSquare,
  DollarSign,
  AlertTriangle,
  FileKey,
  Scale,
  Bell as BellIcon,
} from "lucide-react"
import { useAdmin } from "./admin-context"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar.jsx"

export function AdminSidebar() {
  const location = useLocation()
  const { hasPermission, userRole } = useAdmin()

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`)
  }

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center py-4">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Shield className="h-6 w-6 text-primary" />
          <span className="hidden md:inline-block">Admin Portal</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {/* Dashboard - Available to all */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/dashboard")}>
                  <Link to="/dashboard">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Super Admin and General Manager Section */}
        {(userRole === "super_admin" || userRole === "general_manager") && (
          <SidebarGroup>
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard/admin-roles")}>
                    <Link to="/dashboard/admin-roles">
                      <UserCog className="h-4 w-4 mr-2" />
                      Admin Roles
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard/system-policies")}>
                    <Link to="/dashboard/system-policies">
                      <Lock className="h-4 w-4 mr-2" />
                      System Policies
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* User Management Section */}
        <SidebarGroup>
          <SidebarGroupLabel>User Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/dashboard/users")}>
                  <Link to="/dashboard/users">
                    <Users className="h-4 w-4 mr-2" />
                    User Accounts
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {(userRole === "super_admin" || userRole === "operations_manager") && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard/account-suspensions")}>
                    <Link to="/dashboard/account-suspensions">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Account Actions
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
              {userRole === "customer_care" && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard/password-resets")}>
                    <Link to="/dashboard/password-resets">
                      <Key className="h-4 w-4 mr-2" />
                      Password Reset
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Financial Operations */}
        {(userRole === "super_admin" || userRole === "finance_manager") && (
          <SidebarGroup>
            <SidebarGroupLabel>Financial Operations</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard/transactions")}>
                    <Link to="/dashboard/transactions">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Transactions
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard/withdrawals")}>
                    <Link to="/dashboard/withdrawals">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Withdrawals
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard/transactions/bills")}>
                    <Link to="/dashboard/transactions/bills">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Bills & Utilities
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard/transactions/airtime")}>
                    <Link to="/dashboard/transactions/airtime">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Airtime & Data
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard/transactions/tv")}>
                    <Link to="/dashboard/transactions/tv">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Tv Subscriptions
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard/transactions/electricity")}>
                    <Link to="/dashboard/transactions/electricity">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Electricity
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard/transactions/transport")}>
                    <Link to="/dashboard/transactions/transport">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Electricity
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard/transactions/betting")}>
                    <Link to="/dashboard/transactions/betting">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Betting & Lottery 
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard/transactions/collections")}>
                    <Link to="/dashboard/transactions/collections">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Collections
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard/transactions/church")}>
                    <Link to="/dashboard/transactions/church">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Church Collections
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard/transactions/events")}>
                    <Link to="/dashboard/transactions/events">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Events & Lifestyle
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard/transactions/international-airtime")}>
                    <Link to="/dashboard/transactions/international-airtime">
                      <CreditCard className="h-4 w-4 mr-2" />
                      International Airtime
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard/transactions/virtusl-cards")}>
                    <Link to="/dashboard/transactions/virtusl-cards">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Virtual Cards
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard/transactions/payroll")}>
                    <Link to="/dashboard/transactions/payroll">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Payroll
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard/transactions/scan-to=pay")}>
                    <Link to="/dashboard/transactions/scan-to=pay">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Scan To Pay
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard/financial-reports")}>
                    <Link to="/dashboard/financial-reports">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Reports
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Compliance and Risk */}
        {(userRole === "super_admin" || userRole === "operations_manager") && (
          <SidebarGroup>
            <SidebarGroupLabel>Compliance & Risk</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard/fraud-alerts")}>
                    <Link to="/dashboard/fraud-alerts">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Fraud Alerts
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard/kyc-verification")}>
                    <Link to="/dashboard/kyc-verification">
                      <BadgeCheck className="h-4 w-4 mr-2" />
                      KYC Verification
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Customer Support */}
        {(userRole === "customer_care" || userRole === "operations_manager") && (
          <SidebarGroup>
            <SidebarGroupLabel>Customer Support</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard/support-tickets")}>
                    <Link to="/dashboard/support-tickets">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Support Tickets
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard/notifications")}>
                    <Link to="/dashboard/notifications">
                      <BellIcon className="h-4 w-4 mr-2" />
                      Notifications
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Settings - Available to Super Admin */}
        {userRole === "super_admin" && (
          <SidebarGroup>
            <SidebarGroupLabel>System</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard/settings")}>
                    <Link to="/dashboard/settings">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/dashboard/audit-logs")}>
                    <Link to="/dashboard/audit-logs">
                      <ScrollText className="h-4 w-4 mr-2" />
                      Audit Logs
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  )
}
