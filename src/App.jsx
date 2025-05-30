import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AdminProvider } from "./contexts/AdminContext";
import RouteWrapper from "./components/RouteWrapper";
import AdminLayout from "./components/layout/AdminLayout";
import ProtectedRoute from "./utilities/ProtectedRoutes.jsx";
import UnauthorizedPage from "./pages/UnauthorizedPage.jsx";

// Auth
import LoginForm from "./pages/Login/login";

// Dashboard
import Dashboard from "./pages/Dashboard";

// Users
import UsersPage from "./pages/users/UsersPage";
import AdminsPage from "./pages/users/AdminUsers";
import SuspendedAccounts from "./pages/users/SuspendedAccounts";
import UnsuspendedAccounts from "./pages/users/UnsuspendedAccounts.jsx";
import RecentlyActive from "./pages/users/RecentlyActive";
import PendingVerification from "./pages/users/PendingVerification";
import UserProfile from "./pages/users/ActionPages/ViewProfile";
import EditUser from "./pages/users/ActionPages/EditUser";
import ViewTransactions from "./pages/users/ActionPages/ViewTransactions";
import AdminProfile from "./pages/users/AdminActionPages/ViewProfile";
import EditAdmin from "./pages/users/AdminActionPages/EditAdmin";
import ActivityLogs from "./pages/users/AdminActionPages/ViewActivities.jsx";
import ViewSuspension from "./pages/users/ActionPages/ViewSuspensionDetails.jsx";
import FlaggedAccounts from "./pages/users/FlaggedUsers.jsx";
import ViewFlagDetails from "./pages/users/ActionPages/ViewFlaggedDetails.jsx";

// Transactions
import Transactions from "./pages/transactions/page";

// Wallets
import WalletsPage from "./pages/wallets/WalletsPage";
import VirtualCardsPage from "./pages/wallets/virtual-cards.jsx";
import FundingWithdrawalsPage from "./pages/wallets/withdrawals.jsx";
import PaymentGatewaysPage from "./pages/wallets/gateways.jsx";
import CorporateAccountsPage from "./pages/wallets/corporate.jsx";
import SystemBalancePage from "./pages/wallets/system.jsx";

// Analytics
import AnalyticsPage from "./pages/analytics/AnalyticsPage";
import UserAnalytics from "./pages/analytics/UserAnalytics.jsx";
import PerformanceReports from "./pages/analytics/PerformanceReports.jsx";
import FunnelCharts from "./pages/analytics/FunnelCharts.jsx";
import ExportReports from "./pages/analytics/ExportReports.jsx";
import TransactionAanlytics from "./pages/analytics/TransactionAanlytics.jsx";

// Compliance
import CompliancePage from "./pages/compliance/CompliancePage";
import KycVerifications from "./pages/compliance/KycVerification";
import SuspiciousActivities from "./pages/compliance/SuspiciousActivities";
import AmlMonitoring from "./pages/compliance/AmlMonitoring";
import AuditLogs from "./pages/compliance/AuditLogs";

// Notifications
import NotificationsPage from "./pages/notifications/NotificationsPage";
import SmsAlerts from "./pages/notifications/SmsAlerts";
import EmailCampaigns from "./pages/notifications/EmailCampaigns";
import Scheduled from "./pages/notifications/Scheduled";
import DeliveryLogs from "./pages/notifications/DeliveryLogs";

// Settings
import SettingsPage from "./pages/dashboard/settings/page.jsx";
import TransactionLimits from "./pages/settings/TransactionLimit.jsx";
import ServiceFees from "./pages/settings/ServiceFees.jsx";
import Security from "./pages/settings/Security.jsx";
import ApiKeysSettings from "./pages/settings/API-Keys.jsx";
import SystemAdminSettings from "./pages/settings/SystemAdministrators.jsx";
import TwoFactorSettings from "./pages/settings/2FAManagement.jsx";
import CompleteRegForm from "./pages/users/InviteAdmin/complete-reg.jsx";
import { AnalyticsDashboard } from "./components/analytics-dashboard.jsx";
// Support & Reports
import Support from "./pages/support/page";
import Report from "./pages/reports/page";

function App() {
  return (
    <BrowserRouter>
     
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginForm />} />
        <Route path="/complete-reg" element={<CompleteRegForm />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute><AdminProvider><AdminLayout /></AdminProvider></ProtectedRoute>}>
          {/* Dashboard */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* Users */}
          <Route path="dashboard/users" element={<UsersPage />} />
          <Route path="dashboard/users/admin-users" element={<AdminsPage />} />
          <Route path="dashboard/users/suspended" element={<SuspendedAccounts />} />
          <Route path="dashboard/users/unsuspended" element={<UnsuspendedAccounts />} />
          <Route path="dashboard/users/active" element={<RecentlyActive />} />
          <Route path="dashboard/users/flagged" element={<FlaggedAccounts />} />
          <Route path="dashboard/users/pending" element={<PendingVerification />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/edit-user" element={<EditUser />} />
          <Route path="/transactions" element={<ViewTransactions />} />
          <Route path="/admin-profile" element={<AdminProfile />} />
          <Route path="/edit-admin" element={<EditAdmin />} />
          <Route path="/view-activities" element={<ActivityLogs />} />
          <Route path="/view-details" element={<ViewSuspension />} />
          <Route path="/view-flag-details" element={<ViewFlagDetails/>} />

{/* Transactions */}
          <Route path="dashboard/transactions/*" element={<Transactions />} />


            {/* Wallets */}
            <Route path="dashboard/wallets" element={<WalletsPage />} />
            <Route path="dashboard/wallets/virtual-cards" element={<VirtualCardsPage />} />
            <Route path="dashboard/wallets/withdrawals" element={<FundingWithdrawalsPage />} />
            <Route path="dashboard/wallets/gateways" element={<PaymentGatewaysPage />} />
            <Route path="dashboard/wallets/corporate" element={<CorporateAccountsPage />} />
            <Route path="dashboard/wallets/system" element={<SystemBalancePage />} />


          {/* Analytics */}
          <Route path="dashboard/analytics" element={<AnalyticsPage />} />
          <Route path="/analytics" element={<AnalyticsDashboard/>} />
          <Route path="dashboard/analytics/users" element={<UserAnalytics />} />
          <Route path="dashboard/analytics/performance" element={<PerformanceReports />} />
          <Route path="dashboard/analytics/funnels" element={<FunnelCharts />} />
          <Route path="dashboard/analytics/export" element={<ExportReports />} />
          <Route path="dashboard/analytics/transactions" element={<TransactionAanlytics />} />

            {/* Compliance */}
            <Route path="dashboard/compliance" element={<CompliancePage />} />
            <Route path="dashboard/compliance/kyc" element={<KycVerifications />} />
            <Route path="dashboard/compliance/suspicious-activities" element={<SuspiciousActivities />} />
            <Route path="dashboard/compliance/aml" element={<AmlMonitoring />} />
            <Route path="dashboard/compliance/audit" element={<AuditLogs />} />

            {/* Notifications */}
            <Route path="dashboard/notifications" element={<NotificationsPage />} />
            <Route path="dashboard/notifications/sms" element={<SmsAlerts />} />
            <Route path="dashboard/notifications/email" element={<EmailCampaigns />} />
            <Route path="dashboard/notifications/scheduled" element={<Scheduled />} />
            <Route path="dashboard/notifications/logs" element={<DeliveryLogs />} />

            {/* Settings */}
            <Route path="dashboard/settings" element={<SettingsPage />} />
            <Route path="dashboard/settings/limits" element={<TransactionLimits />} />
            <Route path="dashboard/settings/fees" element={<ServiceFees />} />
            <Route path="dashboard/settings/security" element={<Security />} />
            <Route path="dashboard/settings/api-keys" element={<ApiKeysSettings />} />
            <Route path="dashboard/settings/admins" element={<SystemAdminSettings />} />
            <Route path="dashboard/settings/2fa" element={<TwoFactorSettings />} />

            {/* Support & Reports */}
            <Route path="dashboard/support/*" element={<Support />} />
            <Route path="dashboard/reports/*" element={<Report />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
