import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AdminProvider } from "./contexts/AdminContext"; // Adjust the import path as needed
import AdminLayout from "./components/layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import UsersPage from "./pages/users/UsersPage";
import TransactionsPage from "./pages/transactions/TransactionsPage";
import MoneyTransfersPage from "./pages/transactions/MoneyTransfersPage";
import BillsAndUtilitiesPage from "./pages/transactions/BillsAndUtilitiesPage";
import WalletsPage from "./pages/wallets/WalletsPage";
import AnalyticsPage from "./pages/analytics/AnalyticsPage";
import SupportPage from "./pages/support/SupportPage";
import NotificationsPage from "./pages/notifications/NotificationsPage";
import CompliancePage from "./pages/compliance/CompliancePage";
import SettingsPage from "./pages/settings/SettingsPage";
import ReportsPage from "./pages/reports/ReportsPage";
import AirtimeAndDataPage from "./pages/transactions/AirtimeAndDataPage";
import TvSubPage from "./pages/transactions/TvSubPage";
import ElectrictyPage from "./pages/transactions/ElectricityPage";
import TransportAndTollPage from "./pages/transactions/TransportAndTollPage";
import BettingAndLotteryPage from "./pages/transactions/BettingAndLotteryPage";
import CollectionsPage from "./pages/transactions/CollectionsPage";
import ChurchCollectionsPage from "./pages/transactions/ChurchCollectionsPage"
import EventAndLifestylePage from "./pages/transactions/EventsAndLifestylePage"
import InternationalAirtimePage from "./pages/transactions/InternationalAirtimePage"
import VirtualCardsePage from "./pages/transactions/VirtualCardsPage"
import PayrollPage from "./pages/transactions/PayrollPage"
import ScanToPayPage from "./pages/transactions/ScanToPayPage"

function App() {
    return (
        <BrowserRouter>
            <AdminProvider>
                <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route element={<AdminLayout />}>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="dashboard/users" element={<UsersPage />} />
                        <Route path="dashboard/transactions" element={<TransactionsPage />} />
                        <Route path="dashboard/transactions/money-transfers" element={<MoneyTransfersPage />} />
                        <Route path="dashboard/transactions/bills" element={<BillsAndUtilitiesPage />} />
                        <Route path="dashboard/transactions/airtime" element={<AirtimeAndDataPage />} />
                        <Route path="dashboard/transactions/tv" element={<TvSubPage />} />
                        <Route path="dashboard/transactions/electricity" element={<ElectrictyPage />} />
                        <Route path="dashboard/transactions/transport" element={<TransportAndTollPage />} />
                        <Route path="dashboard/transactions/betting" element={<BettingAndLotteryPage />} />
                        <Route path="dashboard/transactions/collections" element={<CollectionsPage />} />
                        <Route path="dashboard/transactions/church" element={<ChurchCollectionsPage />} />
                        <Route path="dashboard/transactions/events" element={<EventAndLifestylePage />} />
                        <Route path="dashboard/transactions/international-airtime" element={<InternationalAirtimePage />} />
                        <Route path="dashboard/transactions/Virtual-cards" element={<VirtualCardsePage />} />
                        <Route path="dashboard/transactions/payroll" element={<PayrollPage />} />
                        <Route path="dashboard/transactions/scan-to-pay" element={<ScanToPayPage />} />
                        <Route path="dashboard/wallets" element={<WalletsPage />} />
                        <Route path="dashboard/analytics" element={<AnalyticsPage />} />
                        <Route path="dashboard/support" element={<SupportPage />} />
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