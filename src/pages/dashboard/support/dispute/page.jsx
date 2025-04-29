import { DisputeResolutionTable } from "../../../components/SupportDashboard/dispute-table"
import { Breadcrumb } from "../../../components/common/Breadcrumb"

export default function DisputePage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Support", path: "/dashboard/support/dispute" },
        ]}
      />
      <DisputeResolutionTable />
    </>
  )
}
