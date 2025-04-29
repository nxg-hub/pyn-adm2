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
import Transactions from "./pages/transactions/page";
import Support from "./pages/support/page";
import EditUser from "./pages/users/ActionPages/EditUser";
import ViewTransactions from "./pages/users/ActionPages/ViewTransactions";
import KycVerifications from "./pages/compliance/KycVerification";
import SuspiciousActivities from "./pages/compliance/SuspiciousActivities";
import AmlMonitoring from "./pages/compliance/AmlMonitoring";
import AuditLogs from "./pages/compliance/AuditLogs";
import AdminProfile from "./pages/users/AdminActionPages/ViewProfile";
import EditAdmin from "./pages/users/AdminActionPages/EditAdmin";
import VirtualCardsPage from "./pages/wallets/virtual-cards.jsx";
// import FundingWithdrawalsPage from "./pages/wallets/withdrawals.jsx";
// import PaymentGatewaysPage from "./pages/wallets/gateways.jsx";
// import CorporateAccountsPage from "./pages/wallets/corporate.jsx";
// import SystemBalancePage from "./pages/wallets/system.jsx";



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
                        <Route path="/user-profile" element={<UserProfile />} />
                        <Route path="/edit-user" element={<EditUser />} />
                        <Route path="/transactions" element={<ViewTransactions />} />
                        <Route path="/admin-profile" element={<AdminProfile/>} />
                        <Route path="/edit-admin" element={<EditAdmin/>} />
                        <Route path="dashboard/users/admin-users" element={<AdminsPage />} />
                        <Route path="dashboard/users/suspended" element={<SuspendedAccounts />} />
                        <Route path="dashboard/users/active" element={<RecentlyActive />} />
                        <Route path="dashboard/users/pending" element={<PendingVerification />} />
                        <Route path="dashboard/transactions" element={<TransactionsPage />} />
                        <Route path="dashboard/transactions/money-transfers" element={<MoneyTransfersPage />} />
                        <Route path="dashboard/wallets" element={<WalletsPage />} />
                        <Route path="dashboard/analytics" element={<AnalyticsPage />} />
                        <Route path="dashboard/support" element={<SupportPage />} />
                        <Route path="dashboard/compliance" element={<CompliancePage />} />
                        <Route path="dashboard/compliance/kyc" element={<KycVerifications />} />
                        <Route path="dashboard/compliance/suspicious-activities" element={<SuspiciousActivities />} />
                        <Route path="dashboard/compliance/aml" element={<AmlMonitoring />} />
                        <Route path="dashboard/transactions/*" element={<Transactions />} />
                        <Route path="dashboard/support/*" element={<Support />} />                        <Route path="dashboard/compliance/audit" element={<AuditLogs />} />
                        <Route path="dashboard/notifications" element={<NotificationsPage />} />
                        <Route path="dashboard/settings" element={<SettingsPage />} />
                        <Route path="dashboard/reports" element={<ReportsPage />} />
                        <Route path="dashboard/wallets/virtual-cards" element={<VirtualCardsPage />} />
                        {/* <Route path="dashboard/wallets/withdrawals" element={<FundingWithdrawalsPage />} />
                        <Route path="dashboard/wallets/gateways" element={<PaymentGatewaysPage />} />
                        <Route path="dashboard/wallets/corporate" element={<CorporateAccountsPage />} />
                        <Route path="dashboard/wallets/system" element={<SystemBalancePage />} /> */}
                    </Route>
                </Routes>
            </AdminProvider>
        </BrowserRouter>
    );
}

export default App;