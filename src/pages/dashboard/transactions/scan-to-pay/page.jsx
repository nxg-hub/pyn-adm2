import { ScanToPayTable } from "../../../../components/scan-overview-table";
import { Breadcrumb } from "../../../../components/common/Breadcrumb"

export default function ScanToPayData() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Dashboard", path: "/" },
          { label: "Transactions", path: "/dashboard/transactions" },
          { label: "Money Transfers", path: "/dashboard/transactions/money-transfers" },
          { label: "Bills & Utilities", path: "/dashboard/transactions/bills" },
          { label: "Bills & Utilities", path: "/dashboard/transactions/airtime" },
          { label: "Tv Subscriptions", path: "/dashboard/transactions/tv" },
          { label: "Electricity", path: "/dashboard/transactions/electricity" },
          { label: "Transport & Toll", path: "/dashboard/transactions/transport" },
          { label: "Betting & Lottery", path: "/dashboard/transactions/betting" },
          { label: "Collections", path: "/dashboard/transactions/collections" },
          { label: "Church Collections", path: "/dashboard/transactions/church" },
          { label: "Events & Lifestyle", path: "/dashboard/transactions/events" },
          { label: "International Airtime", path: "/dashboard/transactions/international-airtime" },
          { label: "Virtual Card", path: "/dashboard/transactions/virtual-cards" },
          { label: "Payroll", path: "/dashboard/transactions/payroll" },
          { label: "Payroll", path: "/dashboard/transactions/scan-to-pay" },
        ]}
      />
      <ScanToPayTable />
    </>
  )
}