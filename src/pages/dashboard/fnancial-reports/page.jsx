import { ReportTable } from "../../../components/reportDasboard/report-dashboard"
import { Breadcrumb } from "../../../components/common/Breadcrumb"

export default function ReportPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Dashboard", path: "/" },
          { label: "Reports", path: "/dashboard/reports" },
        ]}
      />
      <ReportTable />
    </>
  )
}
