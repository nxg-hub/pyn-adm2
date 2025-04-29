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
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog"  // Assuming you have a dialog component

const disputes = [
  {
    id: "DSP-001",
    user: "Alice Morgan",
    subject: "Incorrect charge on account",
    status: "Open",
    priority: "High",
    createdAt: "2024-04-23 11:30 AM",
  },
  {
    id: "DSP-002",
    user: "Tom Richards",
    subject: "Unauthorized transaction",
    status: "In Progress",
    priority: "Critical",
    createdAt: "2024-04-22 01:15 PM",
    assignedTo: "Dispute Agent 1",
  },
  {
    id: "DSP-003",
    user: "Jane Smith",
    subject: "Payment reversal issue",
    status: "Resolved",
    priority: "Medium",
    createdAt: "2024-04-21 03:40 PM",
    assignedTo: "Dispute Agent 2",
  },
]

const DisputeResolutionPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const { hasPermission } = useAdmin()

  // State for dialog visibility and content
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogAction, setDialogAction] = useState("")  // 'respond', 'resolve', 'escalate'
  const [dialogMessage, setDialogMessage] = useState("")

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
      header: "DISPUTE ID",
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
    ...(hasPermission("assignDisputeAgents")
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
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleOpenDialog("respond", row.id)}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Respond
          </Button>
          {row.status !== "Resolved" && row.status !== "Closed" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleOpenDialog("resolve", row.id)}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Resolve
            </Button>
          )}
          {hasPermission("viewFullTransactionHistory") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleOpenDialog("escalate", row.id)}
            >
              <AlertCircle className="mr-2 h-4 w-4" />
              Escalate
            </Button>
          )}
        </div>
      ),
    },
  ]

  const handleOpenDialog = (action, disputeId) => {
    setDialogAction(action)
    setDialogMessage("")  // Clear previous message
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  const handleSubmitDialog = () => {
    // Handle the submit logic (send the response/resolve/escalate)
    console.log(`${dialogAction} submitted for dispute ID`)
    console.log("Message:", dialogMessage)
    handleCloseDialog()
  }

  return (
    <div className="flex flex-col">
      <AdminHeader title="Dispute Resolution" subtitle="Manage and resolve customer disputes" />

      <main className="flex-1 p-4 md:p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard title="Open Disputes" value="18" subtitle="+3 new today" />
          <StatCard title="In Progress" value="12" subtitle="By 4 agents" />
          <StatCard title="Resolved Today" value="9" subtitle="+12% from yesterday" trend="up" />
          <StatCard title="Avg. Resolution Time" value="4.2h" subtitle="-10min from last week" trend="down" />
        </div>

        <div className="flex items-center justify-between">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search disputes..."
              className="w-[300px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Dispute Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="open">Open</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="resolved">Resolved</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
                <DataTable columns={columns} data={disputes} />
              </TabsContent>
              <TabsContent value="open" className="mt-4">
                <DataTable columns={columns} data={disputes.filter((d) => d.status === "Open")} />
              </TabsContent>
              <TabsContent value="in-progress" className="mt-4">
                <DataTable columns={columns} data={disputes.filter((d) => d.status === "In Progress")} />
              </TabsContent>
              <TabsContent value="resolved" className="mt-4">
                <DataTable columns={columns} data={disputes.filter((d) => d.status === "Resolved")} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogAction === "respond" ? "Respond to Dispute" : dialogAction === "resolve" ? "Resolve Dispute" : "Escalate Dispute"}</DialogTitle>
          </DialogHeader>
          <Input
            type="text"
            placeholder={`Enter a message to ${dialogAction}`}
            value={dialogMessage}
            onChange={(e) => setDialogMessage(e.target.value)}
            className="mt-4"
          />
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmitDialog}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default DisputeResolutionPage
