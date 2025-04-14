import { TransactionsOverview } from "../../../components/transactions-overview"
import { Breadcrumb } from "../../../components/common/Breadcrumb"

export default function TransactionsPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Dashboard", path: "/" },
          { label: "Transactions", path: "/dashboard/transactions" },
        ]}
      />
      <TransactionsOverview />
    </>
  )
}
