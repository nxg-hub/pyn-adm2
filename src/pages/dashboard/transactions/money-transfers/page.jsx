import { MoneyTransfersTable } from "../../../../components/money-transfers-table"
import { Breadcrumb } from "../../../../components/common/Breadcrumb"

export default function MoneyTransfersPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Dashboard", path: "/" },
          { label: "Transactions", path: "/dashboard/transactions" },
          { label: "Money Transfers", path: "/dashboard/transactions/money-transfers" },
        ]}
      />
      <MoneyTransfersTable />
    </>
  )
}
