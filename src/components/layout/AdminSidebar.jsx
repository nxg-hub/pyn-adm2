import { Link, useLocation } from "react-router-dom";
import {
  AlertTriangle,
  BarChart3,
  Bell,
  CreditCard,
  DollarSign,
  FileText,
  Home,
  Key,
  LifeBuoy,
  Lock,
  MessageSquare,
  Settings,
  Shield,
  ShieldAlert,
  Ticket,
  Users,
  Wallet,
  Zap,
  FileBarChart,
  UserCog,
  Send,
  Smartphone,
  Tv,
  Lightbulb,
  Car,
  Dice5,
  Building,
  Church,
  Calendar,
  Globe,
  QrCode,
  Briefcase,
  LogOut,
  Receipt,
  Ellipsis,
  ShieldCheck,
  MonitorX,
  ShieldPlus,
  Flag,
  FileSliders,
  BanknoteArrowDown,
  HandCoinsIcon,
  UserRound,
  MonitorCog,
  Save,
  ListChecks,
  Check,
  Monitor,
  ChartLine,
  ArrowLeftRight,
  ArrowUpFromLine,
  FunnelIcon,
  ChartNoAxesCombined,
  Notebook,
  Logs,
  Mail,
  FileBarChart2,
  RectangleHorizontalIcon,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import logo from '../../assets/logo.png'
import { useAdmin } from "../../contexts/AdminContext";
import { cn } from "../../lib/utils";
import { FunnelChart } from "recharts";

// Sidebar item component
const SidebarItem = ({
  icon: Icon,
  label,
  href,
  isActive,
  hasPermission = true,
  children,
  defaultExpanded = false, 
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const location = useLocation();

  useEffect(() => {
    if (children && location.pathname.startsWith(href)) {
      setIsExpanded(true);
    }
  }, [location.pathname, href, children]);

  if (!hasPermission) return null;

  const handleToggle = (e) => {
    if (children) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  
  return (
    <li className="px-3 py-2">
      <div className="flex items-center">
        <Link
          to={href}
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors flex-1",
            isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
          )}
        >
          <Icon className="h-4 w-4" />
          <span>{label}</span>
        </Link>
        {children && (
          <button
            onClick={handleToggle}
            className={cn(
              "p-1 rounded-md transition-colors ml-1",
              isActive ? "text-primary-foreground hover:bg-primary/80" : "hover:bg-muted"
            )}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
      {children && isExpanded && (
        <ul className="mt-2 space-y-1 pl-6 animate-in slide-in-from-top-1 duration-200">
          {children}
        </ul>
      )}
    </li>
  );
};


// Sidebar subitem component
const SidebarSubItem = ({
  label,
  href,
  isActive,
  hasPermission = true,
  icon: Icon,
}) => {
  if (!hasPermission) return null;

  return (
    <li>
      <Link
        to={href}
        className={cn(
          "flex items-center gap-2 rounded-md px-3 py-1 text-sm transition-colors",
          isActive
            ? "bg-muted font-medium text-blue-300"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}>
        {Icon && <Icon className="h-3 w-3" />}
        <span>{label}</span>
      </Link>
    </li>
  );
};

export function AdminSidebar() {
  const location = useLocation();
  const { hasPermission } = useAdmin();


  const isActive = (path) => {
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };
  
  return (
    <div className="w-64 border-r bg-card h-screen overflow-y-auto hide-scrollbar">
      <div className="flex h-16 items-center border-b px-4">
        <img src={logo} alt='logo'/>
      </div>
      <nav className="space-y-1 p-2">
        <ul className="space-y-1">
          <SidebarItem
            icon={Home}
            label="Dashboard"
            href="/dashboard"
            isActive={
              isActive("/dashboard") && location.pathname === "/dashboard"
            }
          />

          <SidebarItem
            icon={Users}
            label="Users"
            href="/dashboard/users"
            isActive={isActive("/dashboard/users")}
            hasPermission={hasPermission("manageUserAccounts")}>
            <SidebarSubItem
              label="All Users"
              href="/dashboard/users"
              isActive={location.pathname === "/dashboard/users"}
              icon={Users}
            />
            <SidebarSubItem
              label="Pending Verification"
              href="/dashboard/users/pending"
              isActive={location.pathname === "/dashboard/users/pending"}
              icon={Ellipsis}
            />
            <SidebarSubItem
              label="Recently Active"
              href="/dashboard/users/active"
              isActive={location.pathname === "/dashboard/users/active"}
              icon={ShieldCheck}
            />
            <SidebarSubItem
              label="Suspended Accounts"
              href="/dashboard/users/suspended"
              isActive={location.pathname === "/dashboard/users/suspended"}
              icon={MonitorX}
            />
            <SidebarSubItem
              label="Reactivated Accounts"
              href="/dashboard/users/unsuspended"
              isActive={location.pathname === "/dashboard/users/unsuspended"}
              icon={ShieldPlus}
            />
               <SidebarSubItem
              label="Flagged Accounts"
              href="/dashboard/users/flagged"
              isActive={location.pathname === "/dashboard/users/flagged"}
              icon={Flag}
            />
  <SidebarSubItem
    label="Admin Users"
    href="/dashboard/users/admin-users"
    isActive={location.pathname === "/dashboard/users/admin-users"}
    hasPermission={hasPermission("manageAdmins")}
    icon={FileSliders}
  />

</SidebarItem>

          <SidebarItem
            icon={DollarSign}
            label="Transactions"
            href="/dashboard/transactions"
            isActive={isActive("/dashboard/transactions")}
            hasPermission={hasPermission("monitorTransactionFlow")}
            defaultExpanded={true}>
            <SidebarSubItem
              label="All Transactions"
              href="/dashboard/transactions"
              isActive={location.pathname === "/dashboard/transactions"}
              icon={DollarSign}
            />
            <SidebarSubItem
              label="Money Transfers"
              href="/dashboard/transactions/money-transfers"
              isActive={
                location.pathname === "/dashboard/transactions/money-transfers"
              }
              icon={Send}
            />
            <SidebarSubItem
              label="Bills & Utilities"
              href="/dashboard/transactions/bills"
              isActive={location.pathname === "/dashboard/transactions/bills"}
              icon={Receipt}
            />
            <SidebarSubItem
              label="Airtime & Data"
              href="/dashboard/transactions/airtime"
              isActive={location.pathname === "/dashboard/transactions/airtime"}
              icon={Smartphone}
            />
            <SidebarSubItem
              label="TV Subscriptions"
              href="/dashboard/transactions/tv"
              isActive={location.pathname === "/dashboard/transactions/tv"}
              icon={Tv}
            />
            <SidebarSubItem
              label="Electricity"
              href="/dashboard/transactions/electricity"
              isActive={
                location.pathname === "/dashboard/transactions/electricity"
              }
              icon={Lightbulb}
            />
            <SidebarSubItem
              label="Transport & Toll"
              href="/dashboard/transactions/transport"
              isActive={
                location.pathname === "/dashboard/transactions/transport"
              }
              icon={Car}
            />
            <SidebarSubItem
              label="Betting & Lottery"
              href="/dashboard/transactions/betting"
              isActive={location.pathname === "/dashboard/transactions/betting"}
              icon={Dice5}
            />
            <SidebarSubItem
              label="Collections"
              href="/dashboard/transactions/collections"
              isActive={
                location.pathname === "/dashboard/transactions/collections"
              }
              icon={Building}
            />
            <SidebarSubItem
              label="Church Collections"
              href="/dashboard/transactions/church"
              isActive={location.pathname === "/dashboard/transactions/church"}
              icon={Church}
            />
            <SidebarSubItem
              label="Events & Lifestyle"
              href="/dashboard/transactions/events"
              isActive={location.pathname === "/dashboard/transactions/events"}
              icon={Calendar}
            />
            <SidebarSubItem
              label="International Airtime"
              href="/dashboard/transactions/international-airtime"
              isActive={
                location.pathname ===
                "/dashboard/transactions/international-airtime"
              }
              icon={Globe}
            />
            <SidebarSubItem
              label="Virtual Cards"
              href="/dashboard/transactions/virtual-cards"
              isActive={
                location.pathname === "/dashboard/transactions/virtual-cards"
              }
              icon={CreditCard}
            />
            <SidebarSubItem
              label="Payroll Transactions"
              href="/dashboard/transactions/payroll"
              isActive={location.pathname === "/dashboard/transactions/payroll"}
              icon={Briefcase}
            />
            <SidebarSubItem
              label="Scan to Pay"
              href="/dashboard/transactions/scan-to-pay"
              isActive={
                location.pathname === "/dashboard/transactions/scan-to-pay"
              }
              icon={QrCode}
            />
          </SidebarItem>

          <SidebarItem
            icon={Wallet}
            label="Wallets"
            href="/dashboard/wallets"
            isActive={isActive("/dashboard/wallets")}
            hasPermission={hasPermission("monitorTransactionFlow")}>
            <SidebarSubItem
              label="User Wallets"
              href="/dashboard/wallets"
              isActive={location.pathname === "/dashboard/wallets"}
            />
            <SidebarSubItem
              label="Virtual Cards"
              href="/dashboard/wallets/virtual-cards"
              isActive={
                location.pathname === "/dashboard/wallets/virtual-cards"
              }
              icon={Wallet}
            />
            <SidebarSubItem
              label="Funding Withdrawals"
              href="/dashboard/wallets/withdrawals"
              isActive={location.pathname === "/dashboard/wallets/withdrawals"}
              hasPermission={hasPermission("approveWithdrawals")}
              icon={BanknoteArrowDown}
            />
            <SidebarSubItem
              label="Payment Gateways"
              href="/dashboard/wallets/gateways"
              isActive={location.pathname === "/dashboard/wallets/gateways"}
              icon={HandCoinsIcon}
            />
            <SidebarSubItem
              label="Corporate Accounts"
              href="/dashboard/wallets/corporate"
              isActive={location.pathname === "/dashboard/wallets/corporate"}
              icon={UserRound}
            />
            <SidebarSubItem
              label="System Balance"
              href="/dashboard/wallets/system"
              isActive={location.pathname === "/dashboard/wallets/system"}
              hasPermission={hasPermission("viewFinancialReports")}
              icon={MonitorCog}
            />
          </SidebarItem>
          
          <SidebarItem
            icon={Wallet}
            label="Finances"
            href="/dashboard/finances"
            isActive={isActive("/dashboard/finances")}
            hasPermission={hasPermission("monitorTransactionFlow")}>
            <SidebarSubItem
              label="Loans"
              href="/dashboard/finances/loan"
              isActive={location.pathname === "/dashboard/finances/loan"}
              icon={HandCoinsIcon}
            />
             <SidebarSubItem
              label="Savings"
              href="/dashboard/finances/savings"
              isActive={location.pathname === "/dashboard/finances/savings"}
              icon={Save}
            />
          </SidebarItem>

          <SidebarItem
            icon={LifeBuoy}
            label="Support"
            href="/dashboard/support"
            isActive={isActive("/dashboard/support")}
            hasPermission={hasPermission("handleDisputesSupport")}>
            <SidebarSubItem
              label="Tickets"
              href="/dashboard/support/tickets"
              isActive={location.pathname === "/dashboard/support/tickets"}
              icon={Ticket}
            />
            <SidebarSubItem
              label="Live Chat"
              href="/dashboard/support/chat"
              isActive={location.pathname === "/dashboard/support/chat"}
              icon={MessageSquare}
            />
            <SidebarSubItem
              label="Dispute Resolution"
              href="/dashboard/support/disputes"
              isActive={location.pathname === "/dashboard/support/disputes"}
              icon={AlertTriangle}
            />
            <SidebarSubItem
              label="Knowledge Base"
              href="/dashboard/support/knowledge-base"
              isActive={
                location.pathname === "/dashboard/support/knowledge-base"
              }
              icon={FileText}
            />
          </SidebarItem>

          <SidebarItem
            icon={Shield}
            label="Compliance"
            href="/dashboard/compliance"
            isActive={isActive("/dashboard/compliance")}
            hasPermission={hasPermission("kycVerification")}>
            <SidebarSubItem
              label="KYC Verification"
              href="/dashboard/compliance/kyc"
              isActive={location.pathname === "/dashboard/compliance/kyc"}
              icon={Check}
            />
            <SidebarSubItem
              label="AML Monitoring"
              href="/dashboard/compliance/aml"
              isActive={location.pathname === "/dashboard/compliance/aml"}
              hasPermission={hasPermission("monitorHighRiskTransactions")}
              icon={Monitor}
            />
            <SidebarSubItem
              label="Suspicious Activities"
              href="/dashboard/compliance/suspicious-activities"
              isActive={
                location.pathname ===
                "/dashboard/compliance/suspicious-activities"
              }
              hasPermission={hasPermission("monitorHighRiskTransactions")}
              icon={MonitorX}
            />
            <SidebarSubItem
              label="Audit Logs"
              href="/dashboard/compliance/audit"
              isActive={location.pathname === "/dashboard/compliance/audit"}
              hasPermission={hasPermission("viewAdminActivityLogs")}
              icon={ListChecks}
            />
          </SidebarItem>

          <SidebarItem
            icon={BarChart3}
            label="Analytics"
            href="/dashboard/analytics"
            isActive={isActive("/dashboard/analytics")}
            hasPermission={hasPermission("viewFinancialReports")}>
            <SidebarSubItem
              label="Revenue Analytics"
              href="/dashboard/analytics"
              isActive={location.pathname === "/dashboard/analytics"}
              icon={ChartLine}
            />
            <SidebarSubItem
              label="User Analytics"
              href="/dashboard/analytics/users"
              isActive={location.pathname === "/dashboard/analytics/users"}
              icon={BarChart3}
            />
            <SidebarSubItem
              label="Transaction Analytics"
              href="/dashboard/analytics/transactions"
              isActive={
                location.pathname === "/dashboard/analytics/transactions"
              }
              icon={ArrowLeftRight}
            />
            <SidebarSubItem
              label="Funnel Charts"
              href="/dashboard/analytics/funnels"
              isActive={location.pathname === "/dashboard/analytics/funnels"}
              icon={ChartNoAxesCombined}
            />
            <SidebarSubItem
              label="Performance Reports"
              href="/dashboard/analytics/performance"
              isActive={
                location.pathname === "/dashboard/analytics/performance"
              }
              icon={Notebook}
            />
            <SidebarSubItem
              label="Export Reports"
              href="/dashboard/analytics/export"
              isActive={location.pathname === "/dashboard/analytics/export"}
              icon={ArrowUpFromLine}
            />
          </SidebarItem>

          <SidebarItem
            icon={Bell}
            label="Notifications"
            href="/dashboard/notifications"
            isActive={isActive("/dashboard/notifications")}
            hasPermission={hasPermission("sendPushNotifications")}>
            <SidebarSubItem
              label="Push Notifications"
              href="/dashboard/notifications"
              isActive={location.pathname === "/dashboard/notifications"}
            />
            <SidebarSubItem
              label="SMS Alerts"
              href="/dashboard/notifications/sms"
              isActive={location.pathname === "/dashboard/notifications/sms"}
              icon={Bell}
            />
            <SidebarSubItem
              label="Email Campaigns"
              href="/dashboard/notifications/email"
              isActive={location.pathname === "/dashboard/notifications/email"}
              icon={Mail}
            />
            <SidebarSubItem
              label="Scheduled Messages"
              href="/dashboard/notifications/scheduled"
              isActive={
                location.pathname === "/dashboard/notifications/scheduled"
              }
              icon={MessageSquare}
            />
            <SidebarSubItem
              label="Delivery Logs"
              href="/dashboard/notifications/logs"
              isActive={location.pathname === "/dashboard/notifications/logs"}
              icon={Logs}
            />
          </SidebarItem>

          <SidebarItem
            icon={Settings}
            label="Settings"
            href="/dashboard/settings"
            isActive={isActive("/dashboard/settings")}>
            <SidebarSubItem
              label="General Settings"
              href="/dashboard/settings"
              isActive={location.pathname === "/dashboard/settings"}
            />
            <SidebarSubItem
              label="Transaction Limits"
              href="/dashboard/settings/limits"
              isActive={location.pathname === "/dashboard/settings/limits"}
              hasPermission={hasPermission("setTransactionLimits")}
              icon={ArrowLeftRight}
            />
            <SidebarSubItem
              label="Service Fees"
              href="/dashboard/settings/fees"
              isActive={location.pathname === "/dashboard/settings/fees"}
              hasPermission={hasPermission("setTransactionLimits")}
              icon={CreditCard}
            />
            <SidebarSubItem
              label="Security Settings"
              href="/dashboard/settings/security"
              isActive={location.pathname === "/dashboard/settings/security"}
              icon={Lock}
            />
            <SidebarSubItem
              label="API Keys"
              href="/dashboard/settings/api-keys"
              isActive={location.pathname === "/dashboard/settings/api-keys"}
              icon={Key}
              hasPermission={hasPermission("manageAdmins")}
            />
            <SidebarSubItem
              label="System Administrators"
              href="/dashboard/settings/admins"
              isActive={location.pathname === "/dashboard/settings/admins"}
              icon={UserCog}
              hasPermission={hasPermission("manageAdmins")}
            />
            <SidebarSubItem
              label="2FA Management"
              href="/dashboard/settings/2fa"
              isActive={location.pathname === "/dashboard/settings/2fa"}
              icon={ShieldAlert}
              hasPermission={hasPermission("enableDisable2FA")}
            />
          </SidebarItem>

          <SidebarItem
            icon={FileBarChart}
            label="Reports"
            href="/dashboard/reports"
            isActive={isActive("/dashboard/reports")}
            hasPermission={hasPermission("viewFinancialReports")}>
            <SidebarSubItem
              label="Daily Reports"
              href="/dashboard/reports/daily"
              isActive={location.pathname === "/dashboard/reports/daily"}
              icon={FileBarChart2}
            />
            <SidebarSubItem
              label="Weekly Reports"
              href="/dashboard/reports/weekly"
              isActive={location.pathname === "/dashboard/reports/weekly"}
              icon={FileBarChart2}
            />
            <SidebarSubItem
              label="Monthly Reports"
              href="/dashboard/reports/monthly"
              isActive={location.pathname === "/dashboard/reports/monthly"}
              icon={FileBarChart2}
            />
            <SidebarSubItem
              label="Custom Reports"
              href="/dashboard/reports/custom"
              isActive={location.pathname === "/dashboard/reports/custom"}
              icon={FileBarChart2}
            />
            <SidebarSubItem
              label="Reconciliation"
              href="/dashboard/reports/reconciliation"
              isActive={
                location.pathname === "/dashboard/reports/reconciliation"
              }
              hasPermission={hasPermission("reconcileFinancialDiscrepancies")}
              icon={RectangleHorizontalIcon}
            />
            <SidebarSubItem
              label="Admin Reports"
              href="/dashboard/reports/admin"
              isActive={location.pathname === "/dashboard/reports/admin"}
              icon={FileBarChart2}
            />
          </SidebarItem>

          <SidebarItem
            icon={Zap}
            label="System Status"
            href="/dashboard/system"
            isActive={isActive("/dashboard/system")}
            hasPermission={hasPermission("manageAdmins")}
          />
          <SidebarItem
          icon = {LogOut}
          label= "Log Out"
          href= "/logout"          
          />
        </ul>
      </nav>
    </div>
  );
}