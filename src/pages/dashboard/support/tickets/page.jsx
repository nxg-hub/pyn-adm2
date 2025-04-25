import { SupportTicketsTable } from "../../../components/SupportDashboard/supportTickets"
import { Breadcrumb } from "../../../components/common/Breadcrumb"

export default function SupportTicketsPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Support", path: "/dashboard/support/tickets" },
        ]}
      />
      <SupportTicketsTable />
    </>
  )
}
