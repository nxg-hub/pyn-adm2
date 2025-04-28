import { ComplianceDashboard } from "../../../components/compliance-dashboard"
import { Breadcrumb } from "../../../components/common/Breadcrumb"

export default function CompliancePage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Dashboard", path: "/" },
          { label: "Compliance", path: "/dashboard/compliance" },
        ]}
      />
      <ComplianceDashboard />
    </>
  )
}
