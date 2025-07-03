"use client"

import { useState } from "react"
import { Filter, MessageSquare, Search, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "/ui/tabs"
import { Input } from "/ui/input"
import { Button } from "/ui/button"
import { Badge } from "/ui/badge"
import { Avatar } from "/ui/avatar"
import { Textarea } from "/ui/textarea"
import DataTable from "../common/DataTable"
import Pagination from "../common/Pagination"
import StatCard from "../common/StatCard"
import { useAdmin } from "../admin-context"

export function SupportDashboard() {
  const { hasPermission } = useAdmin()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [replyText, setReplyText] = useState("")

  const supportTickets = [
    {
      id: "TICKET-1001",
      user: "John Doe",
      subject: "Cannot access my account",
      status: "open",
      priority: "high",
      category: "account",
      date: "2023-06-15",
      messages: [
        {
          sender: "John Doe",
          message: "I cannot log into my account. It says my password is incorrect but I am sure it is right.",
          date: "2023-06-15 10:30:00",
        },
      ],
    },
    {
      id: "TICKET-1002",
      user: "Jane Smith",
      subject: "Transaction not showing up",
      status: "in_progress",
      priority: "medium",
      category: "transaction",
      date: "2023-06-14",
      messages: [
        {
          sender: "Jane Smith",
          message: "I made a transfer yesterday but it is not showing up in my transaction history.",
          date: "2023-06-14 14:20:00",
        },
        {
          sender: "Support Agent",
          message: "Thank you for reaching out. Could you please provide the transaction ID?",
          date: "2023-06-14 15:45:00",
        },
        { sender: "Jane Smith", message: "The transaction ID is TRX123456.", date: "2023-06-14 16:10:00" },
      ],
    },
    {
      id: "TICKET-1003",
      user: "Bob Johnson",
      subject: "Need help with KYC verification",
      status: "open",
      priority: "low",
      category: "kyc",
      date: "2023-06-13",
      messages: [
        {
          sender: "Bob Johnson",
          message: "I am having trouble completing my KYC verification. The system keeps rejecting my ID.",
          date: "2023-06-13 09:15:00",
        },
      ],
    },
    {
      id: "TICKET-1004",
      user: "Alice Brown",
      subject: "Refund request",
      status: "closed",
      priority: "high",
      category: "billing",
      date: "2023-06-12",
      messages: [
        {
          sender: "Alice Brown",
          message: "I would like to request a refund for a transaction I made by mistake.",
          date: "2023-06-12 11:30:00",
        },
        {
          sender: "Support Agent",
          message:
            "We have processed your refund request. The funds should be back in your account within 3-5 business days.",
          date: "2023-06-12 13:45:00",
        },
        { sender: "Alice Brown", message: "Thank you for your help!", date: "2023-06-12 14:20:00" },
        {
          sender: "Support Agent",
          message: "You are welcome! Is there anything else we can help you with?",
          date: "2023-06-12 14:30:00",
        },
        { sender: "Alice Brown", message: "No, that is all. Thank you!", date: "2023-06-12 14:35:00" },
      ],
    },
    {
      id: "TICKET-1005",
      user: "Charlie Wilson",
      subject: "Feature request",
      status: "open",
      priority: "low",
      category: "feature",
      date: "2023-06-11",
      messages: [
        {
          sender: "Charlie Wilson",
          message: "I would like to suggest adding a feature to export transaction history to CSV.",
          date: "2023-06-11 16:45:00",
        },
      ],
    },
    {
      id: "TICKET-1006",
      user: "Eve Davis",
      subject: "Wallet not updating balance",
      status: "in_progress",
      priority: "medium",
      category: "wallet",
      date: "2023-06-10",
      messages: [
        {
          sender: "Eve Davis",
          message: "My wallet balance is not updating after receiving a transfer.",
          date: "2023-06-10 10:15:00",
        },
        {
          sender: "Support Agent",
          message: "We are looking into this issue. Could you please provide more details about the transfer?",
          date: "2023-06-10 11:30:00",
        },
      ],
    },
    {
      id: "TICKET-1007",
      user: "Frank Miller",
      subject: "Cannot add payment method",
      status: "open",
      priority: "high",
      category: "payment",
      date: "2023-06-09",
      messages: [
        {
          sender: "Frank Miller",
          message: "I am trying to add a new credit card but keep getting an error.",
          date: "2023-06-09 14:20:00",
        },
      ],
    },
  ]

  // Filter tickets based on search term
  const filteredTickets = supportTickets.filter(
    (ticket) =>
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Paginate tickets
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredTickets.slice(indexOfFirstItem, indexOfLastItem)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  // Handle ticket selection
  const handleTicketSelect = (ticket) => {
    setSelectedTicket(ticket)
    setReplyText("")
  }

  // Handle reply submission
  const handleReplySubmit = () => {
    if (!replyText.trim() || !selectedTicket) return

    // In a real app, this would send the reply to an API
    console.log(`Replying to ticket ${selectedTicket.id}: ${replyText}`)

    // Clear the reply text
    setReplyText("")
  }

  // Define columns
  const columns = [
    { header: "Ticket ID", accessorKey: "id" },
    { header: "User", accessorKey: "user" },
    { header: "Subject", accessorKey: "subject" },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.original.status
        let badgeVariant = "outline"
        const badgeText = status.replace("_", " ").charAt(0).toUpperCase() + status.replace("_", " ").slice(1)

        if (status === "open") {
          badgeVariant = "warning"
        } else if (status === "in_progress") {
          badgeVariant = "secondary"
        } else if (status === "closed") {
          badgeVariant = "success"
        }

        return <Badge variant={badgeVariant}>{badgeText}</Badge>
      },
    },
    {
      header: "Priority",
      accessorKey: "priority",
      cell: ({ row }) => {
        const priority = row.original.priority
        let badgeVariant = "outline"
        const badgeText = priority.charAt(0).toUpperCase() + priority.slice(1)

        if (priority === "high") {
          badgeVariant = "destructive"
        } else if (priority === "medium") {
          badgeVariant = "warning"
        } else if (priority === "low") {
          badgeVariant = "success"
        }

        return <Badge variant={badgeVariant}>{badgeText}</Badge>
      },
    },
    { header: "Date", accessorKey: "date" },
    {
      header: "Actions",
      cell: ({ row }) => {
        const canRespond = hasPermission("support", "respond")
        return (
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => handleTicketSelect(row.original)}>
              View
            </Button>
            <Button variant="outline" size="sm" disabled={!canRespond || row.original.status === "closed"}>
              {row.original.status === "open" ? "Respond" : "Follow Up"}
            </Button>
          </div>
        )
      },
    },
  ]

  // Count tickets by status
  const openTickets = supportTickets.filter((ticket) => ticket.status === "open").length
  const inProgressTickets = supportTickets.filter((ticket) => ticket.status === "in_progress").length
  const closedTickets = supportTickets.filter((ticket) => ticket.status === "closed").length

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row">
        <h1 className="text-3xl font-bold tracking-tight">Support Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Open Tickets"
          value={openTickets.toString()}
          description="Awaiting response"
          icon={<MessageSquare className="h-4 w-4" />}
          trend="neutral"
        />
        <StatCard
          title="In Progress"
          value={inProgressTickets.toString()}
          description="Being handled"
          icon={<MessageSquare className="h-4 w-4" />}
          trend="neutral"
        />
        <StatCard
          title="Closed Tickets"
          value={closedTickets.toString()}
          description="Resolved issues"
          icon={<MessageSquare className="h-4 w-4" />}
          trend="neutral"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Support Tickets</CardTitle>
            <CardDescription>View and manage customer support tickets</CardDescription>
            <div className="flex flex-col gap-4 pt-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tickets..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="open">Open</TabsTrigger>
                <TabsTrigger value="in_progress">In Progress</TabsTrigger>
                <TabsTrigger value="closed">Closed</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                <DataTable columns={columns} data={currentItems} />
                <Pagination
                  itemsPerPage={itemsPerPage}
                  totalItems={filteredTickets.length}
                  currentPage={currentPage}
                  paginate={paginate}
                />
              </TabsContent>

              <TabsContent value="open" className="space-y-4">
                <DataTable columns={columns} data={currentItems.filter((ticket) => ticket.status === "open")} />
              </TabsContent>

              <TabsContent value="in_progress" className="space-y-4">
                <DataTable columns={columns} data={currentItems.filter((ticket) => ticket.status === "in_progress")} />
              </TabsContent>

              <TabsContent value="closed" className="space-y-4">
                <DataTable columns={columns} data={currentItems.filter((ticket) => ticket.status === "closed")} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Ticket Details</CardTitle>
            <CardDescription>
              {selectedTicket
                ? `Viewing ticket ${selectedTicket.id} from ${selectedTicket.user}`
                : "Select a ticket to view details"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedTicket ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">{selectedTicket.subject}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedTicket.category.charAt(0).toUpperCase() + selectedTicket.category.slice(1)} •{" "}
                      {selectedTicket.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        selectedTicket.status === "open"
                          ? "warning"
                          : selectedTicket.status === "in_progress"
                            ? "secondary"
                            : "success"
                      }
                    >
                      {selectedTicket.status.replace("_", " ").charAt(0).toUpperCase() +
                        selectedTicket.status.replace("_", " ").slice(1)}
                    </Badge>
                    <Badge
                      variant={
                        selectedTicket.priority === "high"
                          ? "destructive"
                          : selectedTicket.priority === "medium"
                            ? "warning"
                            : "success"
                      }
                    >
                      {selectedTicket.priority.charAt(0).toUpperCase() + selectedTicket.priority.slice(1)}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4 max-h-[400px] overflow-y-auto p-2">
                  {selectedTicket.messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex gap-4 ${message.sender === "Support Agent" ? "justify-end" : ""}`}
                    >
                      {message.sender !== "Support Agent" && (
                        <Avatar>
                          <User className="h-4 w-4" />
                        </Avatar>
                      )}
                      <div
                        className={`rounded-lg p-3 max-w-[80%] ${
                          message.sender === "Support Agent" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <div className="flex justify-between gap-4">
                          <p className="text-sm font-medium">{message.sender}</p>
                          <p className="text-xs text-muted-foreground">{message.date.split(" ")[1]}</p>
                        </div>
                        <p className="mt-1">{message.message}</p>
                      </div>
                      {message.sender === "Support Agent" && (
                        <Avatar>
                          <User className="h-4 w-4" />
                        </Avatar>
                      )}
                    </div>
                  ))}
                </div>

                {selectedTicket.status !== "closed" && hasPermission("support", "respond") && (
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Type your reply here..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Attach File</Button>
                      <Button onClick={handleReplySubmit} disabled={!replyText.trim()}>
                        Send Reply
                      </Button>
                    </div>
                  </div>
                )}

                {selectedTicket.status !== "closed" && hasPermission("support", "resolve") && (
                  <div className="flex justify-between pt-4 border-t">
                    <Button variant="outline">Escalate</Button>
                    <Button variant="success">Mark as Resolved</Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No Ticket Selected</h3>
                <p className="text-sm text-muted-foreground">Select a ticket from the list to view its details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
