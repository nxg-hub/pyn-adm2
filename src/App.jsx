// import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import { AuthProvider } from "./contexts/AuthContext";
// import { AdminProvider } from "./contexts/AdminContext";
// import AdminLayout from "./components/layout/AdminLayout";
// import Dashboard from "./pages/Dashboard";
// import UsersPage from "./pages/users/UsersPage";
// import TransactionsPage from "./pages/dashboard/transactions/page";
// import MoneyTransfersPage from "./pages/transactions/MoneyTransfersPage";
// import WalletsPage from "./pages/wallets/WalletsPage";
// import AnalyticsPage from "./pages/analytics/AnalyticsPage";
// import SupportPage from "./pages/support/SupportPage";
// import NotificationsPage from "./pages/notifications/NotificationsPage";
// import CompliancePage from "./pages/compliance/CompliancePage";
// import SettingsPage from "./pages/settings/SettingsPage";
// import ReportsPage from "./pages/reports/ReportsPage";
// import {LoginPage} from "./pages/auth/LoginPage";
// import {ForgotPasswordPage} from "./pages/auth/ForgotPasswordPage";
// import TwoFactorPage from "./pages/auth/TwoFactorPage";
// import InviteAdminPage from "./pages/auth/InviteAdminPage";
// import CompleteRegistrationPage from "./pages/auth/CompleteRegistrationPage";
//
// function App() {
//     return (
//         <BrowserRouter>
//             <AuthProvider>
//                 <AdminProvider>
//                     <Routes>
//                         {/* Authentication routes */}
//                         <Route path="/auth/login" element={<LoginPage />} />
//                         <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
//                         <Route path="/auth/2fa" element={<TwoFactorPage />} />
//                         <Route path="/auth/invite" element={<InviteAdminPage />} />
//                         <Route path="/auth/complete-registration/:token" element={<CompleteRegistrationPage />} />
//
//                         {/* Admin routes */}
//                         <Route path="/" element={<Navigate to="/dashboard" replace />} />
//                         <Route element={<AdminLayout />}>
//                             <Route path="dashboard" element={<Dashboard />} />
//                             <Route path="dashboard/users" element={<UsersPage />} />
//                             <Route path="dashboard/transactions" element={<TransactionsPage />} />
//                             <Route path="dashboard/transactions/money-transfers" element={<MoneyTransfersPage />} />
//                             <Route path="dashboard/wallets" element={<WalletsPage />} />
//                             <Route path="dashboard/analytics" element={<AnalyticsPage />} />
//                             <Route path="dashboard/support" element={<SupportPage />} />
//                             <Route path="dashboard/compliance" element={<CompliancePage />} />
//                             <Route path="dashboard/notifications" element={<NotificationsPage />} />
//                             <Route path="dashboard/settings" element={<SettingsPage />} />
//                             <Route path="dashboard/reports" element={<ReportsPage />} />
//                         </Route>
//                     </Routes>
//                 </AdminProvider>
//             </AuthProvider>
//         </BrowserRouter>
//     );
// }
//
// export default App;


import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
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
import {LoginPage} from "./pages/auth/LoginPage";
import {ForgotPasswordPage} from "./pages/auth/ForgotPasswordPage";
import TwoFactorPage from "./pages/auth/TwoFactorPage";
import InviteAdminPage from "./pages/auth/InviteAdminPage";
import CompleteRegistrationPage from "./pages/auth/CompleteRegistrationPage";
import {SidebarProvider} from "./components/ui/sidebar.jsx";
import GeneralSettingsPage from "./pages/settings/GeneralSettingsPage.jsx";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AdminProvider>
                    <SidebarProvider>
                        <Routes>
                        {/* Authentication routes */}
                        <Route path="/auth/login" element={<LoginPage />} />
                        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
                        <Route path="/auth/2fa" element={<TwoFactorPage />} />
                        <Route path="/auth/invite" element={<InviteAdminPage />} />
                        <Route path="/auth/complete-registration/:token" element={<CompleteRegistrationPage />} />

                        {/* Admin routes */}
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        <Route element={<AdminLayout />}>
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="dashboard/users" element={<UsersPage />} />
                            <Route path="dashboard/transactions" element={<TransactionsPage />} />
                            <Route path="dashboard/transactions/money-transfers" element={<MoneyTransfersPage />} />
                            <Route path="dashboard/wallets" element={<WalletsPage />} />
                            <Route path="dashboard/analytics" element={<AnalyticsPage />} />
                            <Route path="dashboard/support" element={<SupportPage />} />
                            <Route path="dashboard/general-settings" element={<GeneralSettingsPage />} />
                            <Route path="dashboard/compliance" element={<CompliancePage />} />
                            <Route path="dashboard/notifications" element={<NotificationsPage />} />
                            <Route path="dashboard/settings" element={<SettingsPage />} />
                            <Route path="dashboard/reports" element={<ReportsPage />} />
                        </Route>
                        </Routes>
                    </SidebarProvider>
                </AdminProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;