import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/custom/data-table"
import { columns } from "./columns/live-chat-columns"
import { StatusFilterTabs } from "@/components/custom/status-filter-tabs"
import { useAdmin } from "@/hooks/use-admin"

const mockChats = [
  {
    id: "chat1",
    user: "John Doe",
    lastMessage: "Hey, I need help with my order.",
    timestamp: "2025-04-22 10:45 AM",
    status: "new",
  },
  {
    id: "chat2",
    user: "Sarah Smith",
    lastMessage: "Thanks for the update!",
    timestamp: "2025-04-22 10:30 AM",
    status: "active",
  },
  {
    id: "chat3",
    user: "Mike Johnson",
    lastMessage: "Problem solved. Goodbye!",
    timestamp: "2025-04-22 09:50 AM",
    status: "ended",
  },
]

const statuses = ["new", "active", "ended"]

export const LiveChatTable = () => {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const { hasPermission } = useAdmin()

  const filteredChats = selectedStatus
    ? mockChats.filter((chat) => chat.status === selectedStatus)
    : mockChats

  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
        <CardTitle className="text-lg">Live Chat Support</CardTitle>
        <StatusFilterTabs
          statuses={statuses}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
        />
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns({ hasPermission })}
          data={filteredChats}
          emptyMessage="No chats available."
        />
      </CardContent>
    </Card>
  )
}
