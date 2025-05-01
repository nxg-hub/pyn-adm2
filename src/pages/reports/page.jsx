import { Routes, Route } from "react-router-dom";
import ReportsPage from "./ReportsPage";
import DailyReportsPage from "./DailyReportPage";

function Report() {
  return (
    <Routes>
      <Route index element={<ReportsPage />} />
      <Route path="daily" element={<DailyReportsPage />} />
    </Routes>
  );
}

export default Report;
