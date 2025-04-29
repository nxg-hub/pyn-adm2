import { AirtimeAndDataTable  } from "../../../../components/airtime-data-table"
import { Breadcrumb } from "../../../../components/common/Breadcrumb"

export default function AirtimeAndData() {
  return (
    <>
      <Breadcrumb
        items={[
          // { label: "Dashboard", path: "/" },
          // { label: "Transactions", path: "/dashboard/transactions" },
          // { label: "Money Transfers", path: "/dashboard/transactions/money-transfers" },
          // { label: "Bills & Utilities", path: "/dashboard/transactions/bills" },
          { label: "Bills & Utilities", path: "/dashboard/transactions/airtime" },
        ]}
      />
      <AirtimeAndDataTable />
    </>
  )
}