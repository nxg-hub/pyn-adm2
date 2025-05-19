"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { AdminHeader } from "../../components/layout/AdminHeader"
import { useAdmin } from "../../contexts/AdminContext"
import StatCard from "../../components/common/StatCard"
import DataTable from "../../components/common/DataTable"
import { Breadcrumb } from "../../components/common/Breadcrumb" // Assuming it exists

const AdminReportsPage = () => {
  const { hasPermission } = useAdmin()
  const [searchQuery, setSearchQuery] = useState("")

  const searchFilter = (data) =>
    data.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(searchQuery.toLowerCase())
    )

  // Dummy Data
  const adminActivities = [
    { id: "ACT-001", admin: "Admin A", action: "Suspended a user", date: "2025-05-01" },
    { id: "ACT-002", admin: "Admin B", action: "Flagged a transaction", date: "2025-04-30" },
  ]

  const generatedAccounts = [
    { id: "ACC-001", user: "User A", createdBy: "Admin A", date: "2025-05-01" },
    { id: "ACC-002", user: "User B", createdBy: "Admin B", date: "2025-04-28" },
  ]

  const flaggedAccounts = [
    { id: "FLG-001", user: "User C", reason: "Suspicious activity", flaggedBy: "Admin C", date: "2025-04-30" },
  ]

  const suspendedAccounts = [
    { id: "SUS-001", user: "User D", reason: "Policy violation", suspendedBy: "Admin D", date: "2025-04-29" },
  ]

  const reactivatedAccounts = [
    { id: "REA-001", user: "User E", reactivatedBy: "Admin E", date: "2025-04-27" },
  ]

  const adminActivityColumns = [
    { key: "id", header: "ACTIVITY ID" },
    { key: "admin", header: "ADMIN" },
    { key: "action", header: "ACTION" },
    { key: "date", header: "DATE" },
  ]

  const accountColumns = [
    { key: "id", header: "ID" },
    { key: "user", header: "USER" },
    { key: "createdBy", header: "CREATED BY" },
    { key: "date", header: "DATE" },
  ]

  const flaggedColumns = [
    { key: "id", header: "ID" },
    { key: "user", header: "USER" },
    { key: "reason", header: "REASON" },
    { key: "flaggedBy", header: "FLAGGED BY" },
    { key: "date", header: "DATE" },
  ]

  const suspendedColumns = [
    { key: "id", header: "ID" },
    { key: "user", header: "USER" },
    { key: "reason", header: "REASON" },
    { key: "suspendedBy", header: "SUSPENDED BY" },
    { key: "date", header: "DATE" },
  ]

  const reactivatedColumns = [
    { key: "id", header: "ID" },
    { key: "user", header: "USER" },
    { key: "reactivatedBy", header: "REACTIVATED BY" },
    { key: "date", header: "DATE" },
  ]

  const breadcrumbItems = [
    { label: "Dashboard", href: "/admin" },
    { label: "Reports", href: "/admin/reports" },
  ]

  // if (!hasPermission("reports", "view")) {
  //   return (
  //     <div className="flex flex-col">
  //       <AdminHeader title="Admin Reports" subtitle="Monitor admin activities and account status changes" />
  //       <main className="flex-1 p-4 md:p-6">
  //         <Breadcrumb items={breadcrumbItems} />
  //         <div className="mt-6 rounded-md bg-yellow-50 p-4 text-yellow-700">
  //           You don't have permission to access this page. Please contact a Super Admin for assistance.
  //         </div>
  //       </main>
  //     </div>
  //   )
  // }

  return (
    <div className="flex flex-col">
      <AdminHeader
        title="Admin Reports"
        subtitle="Monitor admin activities and account status changes"
      />

      <main className="flex-1 p-4 md:p-6 space-y-6">
        <Breadcrumb items={breadcrumbItems} />

        <div className="grid gap-4 md:grid-cols-5">
          <StatCard title="Activities" value="145" subtitle="This week" />
          <StatCard title="Generated Accounts" value="62" subtitle="This week" />
          <StatCard title="Flagged" value="13" subtitle="Needs review" />
          <StatCard title="Suspended" value="5" subtitle="This week" />
          <StatCard title="Reactivated" value="8" subtitle="This week" />
        </div>

        <div className="flex justify-between items-center">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search reports..."
              className="w-[300px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="activities">
              <TabsList>
                <TabsTrigger value="activities">Admin Activities</TabsTrigger>
                <TabsTrigger value="generated">Generated Accounts</TabsTrigger>
                <TabsTrigger value="flagged">Flagged Accounts</TabsTrigger>
                <TabsTrigger value="suspended">Suspended Accounts</TabsTrigger>
                <TabsTrigger value="reactivated">Reactivated Accounts</TabsTrigger>
              </TabsList>

              <TabsContent value="activities" className="mt-4">
                <DataTable columns={adminActivityColumns} data={searchFilter(adminActivities)} />
              </TabsContent>
              <TabsContent value="generated" className="mt-4">
                <DataTable columns={accountColumns} data={searchFilter(generatedAccounts)} />
              </TabsContent>
              <TabsContent value="flagged" className="mt-4">
                <DataTable columns={flaggedColumns} data={searchFilter(flaggedAccounts)} />
              </TabsContent>
              <TabsContent value="suspended" className="mt-4">
                <DataTable columns={suspendedColumns} data={searchFilter(suspendedAccounts)} />
              </TabsContent>
              <TabsContent value="reactivated" className="mt-4">
                <DataTable columns={reactivatedColumns} data={searchFilter(reactivatedAccounts)} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default AdminReportsPage
