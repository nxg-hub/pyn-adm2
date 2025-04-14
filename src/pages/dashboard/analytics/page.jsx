import { AnalyticsDashboard } from "../../../components/analytics-dashboard"
import { Breadcrumb } from "../../../components/common/Breadcrumb"

export default function AnalyticsPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Dashboard", path: "/" },
          { label: "Analytics", path: "/dashboard/analytics" },
        ]}
      />
      <AnalyticsDashboard />
    </>
  )
}
