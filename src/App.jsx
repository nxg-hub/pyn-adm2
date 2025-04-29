import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AdminProvider } from "./contexts/AdminContext";
import AdminLayout from "./components/layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import UsersPage from "./pages/users/UsersPage";
import TransactionsPage from "./pages/dashboard/transactions/page";
import MoneyTransfersPage from "./pages/transactions/MoneyTransfersPage";
import WalletsPage from "./pages/wallets/WalletsPage";
import AnalyticsPage from "./pages/analytics/AnalyticsPage";
import SupportPage from "./pages/support/SupportPage";
import NotificationsPage from "./pages/notifications/NotificationsPage";
import CompliancePage from "./pages/compliance/CompliancePage";
import SettingsPage from "./pages/settings/SettingsPage";
import ReportsPage from "./pages/reports/ReportsPage";
import AdminsPage from "./pages/users/AdminUsers";
import LoginForm from "./pages/Login/login";
import SuspendedAccounts from "./pages/users/SuspendedAccounts";
import RecentlyActive from "./pages/users/RecentlyActive";
import PendingVerification from "./pages/users/PendingVerification";
import UserProfile from "./pages/users/ActionPages/ViewProfile";
import EditUser from "./pages/users/ActionPages/EditUser";
import ChangePassword from "./pages/users/ActionPages/ChangePassword";
import SuspendAccount from "./pages/users/ActionPages/SuspendAccount";
import KycVerifications from "./pages/compliance/KycVerification";
import SuspiciousActivities from "./pages/compliance/SuspiciousActivities";
import AmlMonitoring from "./pages/compliance/AmlMonitoring";
import SmsAlerts from "./pages/notifications/SmsAlerts";
import EmailCampaigns from "./pages/notifications/EmailCampaigns";
import Scheduled from "./pages/notifications/Scheduled";
import DeliveryLogs from "./pages/notifications/DeliveryLogs";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
      </Routes>

      <AdminProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route element={<AdminLayout />}>
            {/* <Route path="/login" element={<LoginForm />} /> */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="dashboard/users" element={<UsersPage />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/edit-user" element={<EditUser />} />
            <Route path="/reset-password" element={<ChangePassword />} />
            <Route path="/suspend-account" element={<SuspendAccount />} />
            <Route
              path="dashboard/users/admin-users"
              element={<AdminsPage />}
            />
            <Route
              path="dashboard/users/suspended"
              element={<SuspendedAccounts />}
            />
            <Route path="dashboard/users/active" element={<RecentlyActive />} />
            <Route
              path="dashboard/users/pending"
              element={<PendingVerification />}
            />
            <Route
              path="dashboard/transactions"
              element={<TransactionsPage />}
            />
            <Route
              path="dashboard/transactions/money-transfers"
              element={<MoneyTransfersPage />}
            />
            <Route path="dashboard/wallets" element={<WalletsPage />} />
            <Route path="dashboard/analytics" element={<AnalyticsPage />} />
            <Route path="dashboard/support" element={<SupportPage />} />
            <Route path="dashboard/compliance" element={<CompliancePage />} />
            <Route
              path="dashboard/compliance/kyc"
              element={<KycVerifications />}
            />
            <Route
              path="dashboard/compliance/suspicious-activities"
              element={<SuspiciousActivities />}
            />
            <Route
              path="dashboard/compliance/aml"
              element={<AmlMonitoring />}
            />

            <Route
              path="dashboard/notifications"
              element={<NotificationsPage />}
            />
            <Route path="dashboard/notifications/sms" element={<SmsAlerts />} />
            <Route
              path="dashboard/notifications/email"
              element={<EmailCampaigns />}
            />
            <Route
              path="dashboard/notifications/scheduled"
              element={<Scheduled />}
            />
            <Route
              path="dashboard/notifications/logs"
              element={<DeliveryLogs />}
            />
            <Route path="dashboard/settings" element={<SettingsPage />} />
            <Route path="dashboard/reports" element={<ReportsPage />} />
          </Route>
        </Routes>
      </AdminProvider>
    </BrowserRouter>
  );
}

export default App;
