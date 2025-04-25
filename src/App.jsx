import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AdminProvider } from "./contexts/AdminContext"; // Adjust the import path as needed
import AdminLayout from "./components/layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import UsersPage from "./pages/users/UsersPage";
import Transactions from "./pages/transactions/page";
import Support from "./pages/support/page";
import WalletsPage from "./pages/wallets/WalletsPage";
import AnalyticsPage from "./pages/analytics/AnalyticsPage";
import NotificationsPage from "./pages/notifications/NotificationsPage";
import CompliancePage from "./pages/compliance/CompliancePage";
import SettingsPage from "./pages/settings/SettingsPage";
import ReportsPage from "./pages/reports/ReportsPage";


function App() {
    return (
        <BrowserRouter>
            <AdminProvider>
                <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route element={<AdminLayout />}>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="dashboard/users" element={<UsersPage />} />
                        <Route path="dashboard/transactions/*" element={<Transactions />} />
                        <Route path="dashboard/support/*" element={<Support />} />
                        <Route path="dashboard/wallets" element={<WalletsPage />} />
                        <Route path="dashboard/analytics" element={<AnalyticsPage />} />
                        <Route path="dashboard/compliance" element={<CompliancePage />} />
                        <Route path="dashboard/notifications" element={<NotificationsPage />} />
                        <Route path="dashboard/settings" element={<SettingsPage />} />
                        <Route path="dashboard/reports" element={<ReportsPage />} />    
                    </Route>
                </Routes>
            </AdminProvider>
        </BrowserRouter>
    );
}

export default App;