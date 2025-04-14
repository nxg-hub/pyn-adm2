"use client"

import { useState } from "react"
import { Download, Filter, Search, User, UserPlus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "/ui/tabs"
import { Input } from "/ui/input"
import { Button } from "/ui/button"
import { Badge } from "/ui/badge"
import { Avatar } from "/ui/avatar"
import DataTable from "../../src/components/common/DataTable"
import Pagination from "../../src/components/common/Pagination"
import StatCard from "../../src/components/common/StatCard"
import ActionMenu from "../../src/components/common/ActionMenu"
import { useAdmin } from "./admin-context"

export function UsersManagement() {
  const { hasPermission } = useAdmin()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  // Sample data for users
  const users = [
    {
      id: "USR123456",
      name: "John Doe",
      email: "john.doe@example.com",
      status: "active",
      kycStatus: "verified",
      walletBalance: "$1,234.56",
      registrationDate: "2023-01-15",
      lastLogin: "2023-06-15",
    },
    {
      id: "USR123457",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      status: "active",
      kycStatus: "pending",
      walletBalance: "$567.89",
      registrationDate: "2023-02-20",
      lastLogin: "2023-06-14",
    },
    {
      id: "USR123458",
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      status: "inactive",
      kycStatus: "rejected",
      walletBalance: "$0.00",
      registrationDate: "2023-03-10",
      lastLogin: "2023-05-01",
    },
    {
      id: "USR123459",
      name: "Alice Brown",
      email: "alice.brown@example.com",
      status: "active",
      kycStatus: "verified",
      walletBalance: "$2,345.67",
      registrationDate: "2023-01-05",
      lastLogin: "2023-06-12",
    },
    {
      id: "USR123460",
      name: "Charlie Wilson",
      email: "charlie.wilson@example.com",
      status: "suspended",
      kycStatus: "verified",
      walletBalance: "$789.01",
      registrationDate: "2023-04-15",
      lastLogin: "2023-06-01",
    },
    {
      id: "USR123461",
      name: "Eve Davis",
      email: "eve.davis@example.com",
      status: "active",
      kycStatus: "pending",
      walletBalance: "$456.78",
      registrationDate: "2023-05-20",
      lastLogin: "2023-06-10",
    },
    {
      id: "USR123462",
      name: "Frank Miller",
      email: "frank.miller@example.com",
      status: "active",
      kycStatus: "verified",
      walletBalance: "$3,456.78",
      registrationDate: "2023-02-10",
      lastLogin: "2023-06-09",
    },
    {
      id: "USR123463",
      name: "Grace Taylor",
      email: "grace.taylor@example.com",
      status: "inactive",
      kycStatus: "not_submitted",
      walletBalance: "$0.00",
      registrationDate: "2023-03-25",
      lastLogin: "2023-04-15",
    },
    {
      id: "USR123464",
      name: "Henry Clark",
      email: "henry.clark@example.com",
      status: "active",
      kycStatus: "verified",
      walletBalance: "$1,234.56",
      registrationDate: "2023-01-30",
      lastLogin: "2023-06-07",
    },
    {
      id: "USR123465",
      name: "Ivy Martin",
      email: "ivy.martin@example.com",
      status: "active",
      kycStatus: "verified",
      walletBalance: "$2,345.67",
      registrationDate: "2023-04-05",
      lastLogin: "2023-06-06",
    },
    {
      id: "USR123466",
      name: "Jack Wilson",
      email: "jack.wilson@example.com",
      status: "suspended",
      kycStatus: "verified",
      walletBalance: "$567.89",
      registrationDate: "2023-02-15",
      lastLogin: "2023-05-20",
    },
    {
      id: "USR123467",
      name: "Karen Brown",
      email: "karen.brown@example.com",
      status: "active",
      kycStatus: "pending",
      walletBalance: "$890.12",
      registrationDate: "2023-05-10",
      lastLogin: "2023-06-04",
    },
  ]

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Paginate users
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  // Define columns
  const columns = [
    {
      header: "User",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Avatar>
            <User className="h-4 w-4" />
          </Avatar>
          <div>
            <p className="font-medium">{row.original.name}</p>
            <p className="text-sm text-muted-foreground">{row.original.email}</p>
          </div>
        </div>
      ),
    },
    { header: "User ID", accessorKey: "id" },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.original.status
        let badgeVariant = "outline"
        const badgeText = status.charAt(0).toUpperCase() + status.slice(1)

        if (status === "active") {
          badgeVariant = "success"
        } else if (status === "inactive") {
          badgeVariant = "secondary"
        } else if (status === "suspended") {
          badgeVariant = "destructive"
        }

        return <Badge variant={badgeVariant}>{badgeText}</Badge>
      },
    },
    {
      header: "KYC Status",
      accessorKey: "kycStatus",
      cell: ({ row }) => {
        const kycStatus = row.original.kycStatus
        let badgeVariant = "outline"
        const badgeText = kycStatus.replace("_", " ").charAt(0).toUpperCase() + kycStatus.replace("_", " ").slice(1)

        if (kycStatus === "verified") {
          badgeVariant = "success"
        } else if (kycStatus === "pending") {
          badgeVariant = "warning"
        } else if (kycStatus === "rejected") {
          badgeVariant = "destructive"
        } else if (kycStatus === "not_submitted") {
          badgeVariant = "secondary"
        }

        return <Badge variant={badgeVariant}>{badgeText}</Badge>
      },
    },
    { header: "Wallet Balance", accessorKey: "walletBalance" },
    { header: "Registration Date", accessorKey: "registrationDate" },
    { header: "Last Login", accessorKey: "lastLogin" },
    {
      header: "Actions",
      cell: ({ row }) => {
        const actions = [{ label: "View Profile", onClick: () => console.log("View", row.original.id) }]

        if (hasPermission("users", "edit")) {
          actions.push({ label: "Edit User", onClick: () => console.log("Edit", row.original.id) })
        }

        if (hasPermission("users", "delete")) {
          actions.push({ label: "Delete User", onClick: () => console.log("Delete", row.original.id) })
        }

        if (row.original.status === "active" && hasPermission("users", "edit")) {
          actions.push({ label: "Suspend User", onClick: () => console.log("Suspend", row.original.id) })
        } else if (row.original.status === "suspended" && hasPermission("users", "edit")) {
          actions.push({ label: "Activate User", onClick: () => console.log("Activate", row.original.id) })
        }

        if (row.original.kycStatus === "pending" && hasPermission("compliance", "approve")) {
          actions.push({ label: "Review KYC", onClick: () => console.log("Review KYC", row.original.id) })
        }

        return <ActionMenu actions={actions} />
      },
    },
  ]

  // Calculate user statistics
  const totalUsers = users.length
  const activeUsers = users.filter((u) => u.status === "active").length
  const kycVerifiedUsers = users.filter((u) => u.kycStatus === "verified").length
  const kycPendingUsers = users.filter((u) => u.kycStatus === "pending").length

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row">
        <h1 className="text-3xl font-bold tracking-tight">Users Management</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={totalUsers.toString()}
          description="All registered users"
          icon={<User className="h-4 w-4" />}
          trend="neutral"
        />
        <StatCard
          title="Active Users"
          value={activeUsers.toString()}
          description={`${Math.round((activeUsers / totalUsers) * 100)}% of total`}
          icon={<User className="h-4 w-4" />}
          trend="up"
        />
        <StatCard
          title="KYC Verified"
          value={kycVerifiedUsers.toString()}
          description={`${Math.round((kycVerifiedUsers / totalUsers) * 100)}% of total`}
          icon={<User className="h-4 w-4" />}
          trend="up"
        />
        <StatCard
          title="KYC Pending"
          value={kycPendingUsers.toString()}
          description={`${Math.round((kycPendingUsers / totalUsers) * 100)}% of total`}
          icon={<User className="h-4 w-4" />}
          trend="neutral"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>View and manage all users</CardDescription>
          <div className="flex flex-col gap-4 pt-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by ID, name, or email..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                Export
              </Button>
              {hasPermission("users", "create") && (
                <Button size="sm" className="gap-1">
                  <UserPlus className="h-4 w-4" />
                  Add User
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Users</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
              <TabsTrigger value="suspended">Suspended</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <DataTable columns={columns} data={currentItems} />
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={filteredUsers.length}
                currentPage={currentPage}
                paginate={paginate}
              />
            </TabsContent>

            <TabsContent value="active" className="space-y-4">
              <DataTable columns={columns} data={currentItems.filter((item) => item.status === "active")} />
            </TabsContent>

            <TabsContent value="inactive" className="space-y-4">
              <DataTable columns={columns} data={currentItems.filter((item) => item.status === "inactive")} />
            </TabsContent>

            <TabsContent value="suspended" className="space-y-4">
              <DataTable columns={columns} data={currentItems.filter((item) => item.status === "suspended")} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
