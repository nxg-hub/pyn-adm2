import { LiveChatTable } from "../../../components/SupportDashboard/live-chat-table"
import { Breadcrumb } from "../../../components/common/Breadcrumb"

export default function LiveChatPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Support", path: "/dashboard/support/live-chat" },
        ]}
      />
      <LiveChatTable />
    </>
  )
}
