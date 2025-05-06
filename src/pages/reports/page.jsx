import { Routes, Route } from "react-router-dom";
import ReportsPage from "./ReportsPage";
import DailyReportsPage from "./DailyReportPage";
import WeeklyReportsPage from "./WeeklyReportsPage";
import MonthlyReportsPage from "./MonthlyReportsPage";
import CustomReportsPage from "./CustomReportsPage"
import ReconciliationPage from "./ReconciliatioPage"
import AdminReportsPage from "./AdminReportsPage";

function Report() {
  return (
    <Routes>
      <Route index element={<ReportsPage />} />
      <Route path="daily" element={<DailyReportsPage />} />
      <Route path="weekly" element={<WeeklyReportsPage />} />
      <Route path="monthly" element={<MonthlyReportsPage />} />
      <Route path="custom" element={<CustomReportsPage />} />
      <Route path="reconciliation" element={<ReconciliationPage />} />
      <Route path="admin" element={<AdminReportsPage />} />
    </Routes>
  );
}

export default Report;
