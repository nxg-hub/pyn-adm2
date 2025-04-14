import { SupportDashboard } from "../../../components/support-dashboard"
import { Breadcrumb } from "../../../components/common/Breadcrumb"

export default function SupportPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Dashboard", path: "/" },
          { label: "Support", path: "/dashboard/support" },
        ]}
      />
      <SupportDashboard />
    </>
  )
}
