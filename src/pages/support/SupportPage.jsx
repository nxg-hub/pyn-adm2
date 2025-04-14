"use client"

import { useState } from "react"
import { AlertCircle, CheckCircle, Clock, MessageSquare, Search, User } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { AdminHeader } from "../../components/layout/AdminHeader"
import { useAdmin } from "../../contexts/AdminContext"
import { Badge } from "../../components/ui/badge"
import DataTable from "../../components/common/DataTable"
import StatCard from "../../components/common/StatCard"

const tickets = [
  {
    id: "TKT-001",
    user: "John Doe",
    subject: "Unable to complete transaction",
    status: "Open",
    priority: "High",
    createdAt: "2024-04-23 10:45 AM",
  },
  {
    id: "TKT-002",
    user: "Sarah Miller",
    subject: "Account verification issue",
    status: "In Progress",
    priority: "Medium",
    createdAt: "2024-04-22 09:30 AM",
    assignedTo: "Support Agent 1",
  },
  {
    id: "TKT-003",
    user: "Robert Johnson",
    subject: "Withdrawal not received",
    status: "Open",
    priority: "Critical",
    createdAt: "2024-04-23 08:15 AM",
  },
  {
    id: "TKT-004",
    user: "Emily Davis",
    subject: "Virtual card not working",
    status: "Resolved",
    priority: "Medium",
    createdAt: "2024-04-21 14:20 PM",
    assignedTo: "Support Agent 2",
  },
  {
    id: "TKT-005",
    user: "Michael Wilson",
    subject: "App crashing during payment",
    status: "In Progress",
    priority: "High",
    createdAt: "2024-04-22 11:45 AM",
    assignedTo: "Support Agent 3",
  },
]

const SupportPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const { hasPermission } = useAdmin()

  const getPriorityBadge = (priority) => {
    const classes = {
      Low: "border-green-200 bg-green-50 text-green-700",
      Medium: "border-blue-200 bg-blue-50 text-blue-700",
      High: "border-orange-200 bg-orange-50 text-orange-700",
      Critical: "border-red-200 bg-red-50 text-red-700",
    }

    return (
      <Badge variant="outline" className={classes[priority]}>
        {priority}
      </Badge>
    )
  }

  const getStatusBadge = (status) => {
    const classes = {
      Open: "border-blue-200 bg-blue-50 text-blue-700",
      "In Progress": "border-yellow-200 bg-yellow-50 text-yellow-700",
      Resolved: "border-green-200 bg-green-50 text-green-700",
      Closed: "border-gray-200 bg-gray-50 text-gray-700",
    }

    return (
      <Badge variant="outline" className={classes[status]}>
        {status}
      </Badge>
    )
  }

  const columns = [
    {
      key: "id",
      header: "TICKET ID",
      render: (row) => <span className="font-medium">{row.id}</span>,
    },
    {
      key: "user",
      header: "USER",
      render: (row) => (
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" />
          {row.user}
        </div>
      ),
    },
    {
      key: "subject",
      header: "SUBJECT",
    },
    {
      key: "status",
      header: "STATUS",
      render: (row) => getStatusBadge(row.status),
    },
    {
      key: "priority",
      header: "PRIORITY",
      render: (row) => getPriorityBadge(row.priority),
    },
    ...(hasPermission("assignSupportTickets")
      ? [
          {
            key: "assignedTo",
            header: "ASSIGNED TO",
            render: (row) =>
              row.assignedTo || (
                <Button variant="outline" size="sm">
                  Assign
                </Button>
              ),
          },
        ]
      : []),
    {
      key: "createdAt",
      header: "CREATED",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          {row.createdAt}
        </div>
      ),
    },
    {
      key: "actions",
      header: "ACTIONS",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <MessageSquare className="mr-2 h-4 w-4" />
            Reply
          </Button>
          {row.status !== "Resolved" && row.status !== "Closed" && (
            <Button variant="ghost" size="sm">
              <CheckCircle className="mr-2 h-4 w-4" />
              Resolve
            </Button>
          )}
          {hasPermission("viewFullTransactionHistory") && (
            <Button variant="ghost" size="sm">
              <AlertCircle className="mr-2 h-4 w-4" />
              Escalate
            </Button>
          )}
        </div>
      ),
    },
  ]

  return (
    <div className="flex flex-col">
      <AdminHeader title="Support Dashboard" subtitle="Manage customer support tickets and inquiries" />

      <main className="flex-1 p-4 md:p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard title="Open Tickets" value="42" subtitle="+5 new today" />
          <StatCard title="In Progress" value="28" subtitle="By 5 agents" />
          <StatCard title="Resolved Today" value="17" subtitle="+23% from yesterday" trend="up" />
          <StatCard title="Avg. Response Time" value="2.5h" subtitle="-15min from last week" trend="down" />
        </div>

        <div className="flex items-center justify-between">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tickets..."
              className="w-[300px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {hasPermission("assignSupportTickets") && <Button>Create New Ticket</Button>}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Support Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All Tickets</TabsTrigger>
                <TabsTrigger value="open">Open</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="resolved">Resolved</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
                <DataTable columns={columns} data={tickets} />
              </TabsContent>
              <TabsContent value="open" className="mt-4">
                <DataTable columns={columns} data={tickets.filter((ticket) => ticket.status === "Open")} />
              </TabsContent>
              <TabsContent value="in-progress" className="mt-4">
                <DataTable columns={columns} data={tickets.filter((ticket) => ticket.status === "In Progress")} />
              </TabsContent>
              <TabsContent value="resolved" className="mt-4">
                <DataTable columns={columns} data={tickets.filter((ticket) => ticket.status === "Resolved")} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default SupportPage
