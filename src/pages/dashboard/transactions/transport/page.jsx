import { TransportTollTransactionsTable } from "../../../../components/transport-table"
import { Breadcrumb } from "../../../../components/common/Breadcrumb"

export default function transportAndTollData() {
  return (
    <>
      <Breadcrumb
        items={[
          // { label: "Dashboard", path: "/" },
          // { label: "Transactions", path: "/dashboard/transactions" },
          // { label: "Money Transfers", path: "/dashboard/transactions/money-transfers" },
          // { label: "Bills & Utilities", path: "/dashboard/transactions/bills" },
          // { label: "Bills & Utilities", path: "/dashboard/transactions/airtime" },
          // { label: "Tv Subscriptions", path: "/dashboard/transactions/tv" },
          // { label: "Electricity", path: "/dashboard/transactions/electricity" },
          { label: "Transport & Toll", path: "/dashboard/transactions/transport" },
        ]}
      />
      <TransportTollTransactionsTable />
    </>
  )
}