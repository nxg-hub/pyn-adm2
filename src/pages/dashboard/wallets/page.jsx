import { WalletsManagement } from "../../../components/wallets-management"
import { Breadcrumb } from "../../../components/common/Breadcrumb"

export default function WalletsPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Dashboard", path: "/" },
          { label: "Wallets", path: "/dashboard/wallets" },
        ]}
      />
      <WalletsManagement />
    </>
  )
}
