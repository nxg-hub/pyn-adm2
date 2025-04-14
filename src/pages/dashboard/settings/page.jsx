import { SettingsDashboard } from "../../../components/settings-dashboard"
import { Breadcrumb } from "../../../components/common/Breadcrumb"

export default function SettingsPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Dashboard", path: "/" },
          { label: "Settings", path: "/dashboard/settings" },
        ]}
      />
      <SettingsDashboard />
    </>
  )
}
