import { UsersManagement } from "../../../components/users-management"
import { Breadcrumb } from "../../../components/common/Breadcrumb"

export default function UsersPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Dashboard", path: "/" },
          { label: "Users", path: "/dashboard/users" },
        ]}
      />
      <UsersManagement />
    </>
  )
}
