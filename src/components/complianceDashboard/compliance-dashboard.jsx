"use client"

import { useState } from "react"
import { AlertTriangle, CheckCircle, Filter, Search, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "/ui/tabs"
import { Input } from "/ui/input"
import { Button } from "/ui/button"
import { Badge } from "/ui/badge"
import StatCard from "../common/StatCard"
import DataTable from "../common/DataTable"
import { useAdmin } from "../admin-context"
import ConfirmActionDialog from "../common/ConfirmActionDialog"

export function ComplianceDashboard() {
  const { hasPermission, currentRole } = useAdmin()
  const [searchTerm, setSearchTerm] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogConfig, setDialogConfig] = useState({
    title: "",
    description: "",
    confirmText: "",
    onConfirm: () => {},
  })

  // Sample data for KYC verifications
  const kycVerifications = [
    { id: 1, user: "John Doe", status: "pending", date: "2023-06-15", risk: "medium" },
    { id: 2, user: "Jane Smith", status: "approved", date: "2023-06-14", risk: "low" },
    { id: 3, user: "Bob Johnson", status: "rejected", date: "2023-06-13", risk: "high" },
    { id: 4, user: "Alice Brown", status: "pending", date: "2023-06-12", risk: "medium" },
    { id: 5, user: "Charlie Wilson", status: "approved", date: "2023-06-11", risk: "low" },
  ]

  // Sample data for suspicious activities
  const suspiciousActivities = [
    { id: 1, user: "Eve Davis", activity: "Multiple large transactions", date: "2023-06-15", risk: "high" },
    { id: 2, user: "Frank Miller", activity: "Unusual login location", date: "2023-06-14", risk: "medium" },
    { id: 3, user: "Grace Taylor", activity: "Rapid account changes", date: "2023-06-13", risk: "medium" },
    { id: 4, user: "Henry Clark", activity: "Multiple failed transactions", date: "2023-06-12", risk: "high" },
    { id: 5, user: "Ivy Martin", activity: "Suspicious transfer pattern", date: "2023-06-11", risk: "high" },
  ]

  // Sample data for compliance reports
  const complianceReports = [
    { id: 1, title: "Monthly AML Report", date: "2023-06-01", status: "completed" },
    { id: 2, title: "Quarterly Compliance Review", date: "2023-04-01", status: "completed" },
    { id: 3, title: "Annual Regulatory Assessment", date: "2023-01-01", status: "completed" },
    { id: 4, title: "KYC Process Audit", date: "2023-05-15", status: "in_progress" },
    { id: 5, title: "Fraud Detection System Review", date: "2023-06-10", status: "in_progress" },
  ]

  // KYC verifications columns
  const kycColumns = [
    { header: "User", accessorKey: "user" },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.original.status
        let badgeVariant = "outline"
        const badgeText = status.charAt(0).toUpperCase() + status.slice(1)

        if (status === "approved") {
          badgeVariant = "success"
        } else if (status === "rejected") {
          badgeVariant = "destructive"
        } else if (status === "pending") {
          badgeVariant = "warning"
        }

        return <Badge variant={badgeVariant}>{badgeText}</Badge>
      },
    },
    { header: "Date", accessorKey: "date" },
    {
      header: "Risk Level",
      accessorKey: "risk",
      cell: ({ row }) => {
        const risk = row.original.risk
        let badgeVariant = "outline"
        const badgeText = risk.charAt(0).toUpperCase() + risk.slice(1)

        if (risk === "low") {
          badgeVariant = "success"
        } else if (risk === "medium") {
          badgeVariant = "warning"
        } else if (risk === "high") {
          badgeVariant = "destructive"
        }

        return <Badge variant={badgeVariant}>{badgeText}</Badge>
      },
    },
    {
      header: "Actions",
      cell: ({ row }) => {
        const canApprove = hasPermission("compliance", "approve")
        return (
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled={!canApprove || row.original.status !== "pending"}>
              Approve
            </Button>
            <Button variant="outline" size="sm" disabled={!canApprove || row.original.status !== "pending"}>
              Reject
            </Button>
          </div>
        )
      },
    },
  ]

  // Suspicious activities columns
  const activitiesColumns = [
    { header: "User", accessorKey: "user" },
    { header: "Suspicious Activity", accessorKey: "activity" },
    { header: "Date", accessorKey: "date" },
    {
      header: "Risk Level",
      accessorKey: "risk",
      cell: ({ row }) => {
        const risk = row.original.risk
        let badgeVariant = "outline"
        const badgeText = risk.charAt(0).toUpperCase() + risk.slice(1)

        if (risk === "low") {
          badgeVariant = "success"
        } else if (risk === "medium") {
          badgeVariant = "warning"
        } else if (risk === "high") {
          badgeVariant = "destructive"
        }

        return <Badge variant={badgeVariant}>{badgeText}</Badge>
      },
    },
    {
      header: "Actions",
      cell: ({ row }) => {
        const canFlag = hasPermission("transactions", "flag")
        return (
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled={!canFlag}>
              Investigate
            </Button>
            <Button variant="outline" size="sm" disabled={!canFlag}>
              Flag
            </Button>
          </div>
        )
      },
    },
  ]

  // Compliance reports columns
  const reportsColumns = [
    { header: "Report Title", accessorKey: "title" },
    { header: "Date", accessorKey: "date" },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.original.status
        let badgeVariant = "outline"
        const badgeText = status === "completed" ? "Completed" : "In Progress"

        if (status === "completed") {
          badgeVariant = "success"
        } else if (status === "in_progress") {
          badgeVariant = "warning"
        }

        return <Badge variant={badgeVariant}>{badgeText}</Badge>
      },
    },
    {
      header: "Actions",
      cell: ({ row }) => {
        const canView = hasPermission("reports", "view")
        return (
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled={!canView}>
              View
            </Button>
            <Button variant="outline" size="sm" disabled={!canView || row.original.status !== "completed"}>
              Download
            </Button>
          </div>
        )
      },
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row">
        <h1 className="text-3xl font-bold tracking-tight">Compliance Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Pending KYC Verifications"
          value="24"
          description="+2 from yesterday"
          icon={<Shield className="h-4 w-4" />}
          trend="up"
        />
        <StatCard
          title="Suspicious Activities"
          value="12"
          description="-3 from yesterday"
          icon={<AlertTriangle className="h-4 w-4" />}
          trend="down"
        />
        <StatCard
          title="Compliance Rate"
          value="98.5%"
          description="+0.5% from last month"
          icon={<CheckCircle className="h-4 w-4" />}
          trend="up"
        />
      </div>

      <Tabs defaultValue="kyc" className="space-y-4">
        <TabsList>
          <TabsTrigger value="kyc">KYC Verifications</TabsTrigger>
          <TabsTrigger value="suspicious">Suspicious Activities</TabsTrigger>
          <TabsTrigger value="reports">Compliance Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="kyc" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>KYC Verifications</CardTitle>
              <CardDescription>Review and approve user KYC submissions</CardDescription>
              <div className="flex flex-col gap-4 pt-4 md:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
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
              <DataTable
                columns={kycColumns}
                data={kycVerifications.filter((item) => item.user.toLowerCase().includes(searchTerm.toLowerCase()))}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suspicious" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Suspicious Activities</CardTitle>
              <CardDescription>Review flagged suspicious user activities</CardDescription>
              <div className="flex flex-col gap-4 pt-4 md:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search activities..."
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
              <DataTable
                columns={activitiesColumns}
                data={suspiciousActivities.filter(
                  (item) =>
                    item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.activity.toLowerCase().includes(searchTerm.toLowerCase()),
                )}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Reports</CardTitle>
              <CardDescription>View and download compliance reports</CardDescription>
              <div className="flex flex-col gap-4 pt-4 md:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search reports..."
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
              <DataTable
                columns={reportsColumns}
                data={complianceReports.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
