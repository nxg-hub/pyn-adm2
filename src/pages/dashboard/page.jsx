import { DashboardOverview } from "../../components/dashboard-overview"
import { Breadcrumb } from "../../components/common/Breadcrumb"

export default function DashboardPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Dashboard", path: "/" }]} />
      <DashboardOverview />
    </>
  )
}
