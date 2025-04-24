"use client"

import { useState } from "react"
import { AlertCircle, CheckCircle, Clock, FileText, Search, Shield, User, XCircle } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { useAdmin } from "../../contexts/AdminContext"
import { Badge } from "../../components/ui/badge"
import DataTable from "../../components/common/DataTable"
import StatCard from "../../components/common/StatCard"

const kycVerifications = [
  {
    id: "KYC-001",
    user: "John Doe",
    documentType: "Passport",
    status: "Pending",
    submittedAt: "2024-04-23 10:45 AM",
  },
  {
    id: "KYC-002",
    user: "Sarah Miller",
    documentType: "ID Card",
    status: "Approved",
    submittedAt: "2024-04-22 09:30 AM",
    reviewedBy: "Admin User 1",
  },
  {
    id: "KYC-003",
    user: "Robert Johnson",
    documentType: "Driver's License",
    status: "Rejected",
    submittedAt: "2024-04-23 08:15 AM",
    reviewedBy: "Admin User 2",
  },
  {
    id: "KYC-004",
    user: "Emily Davis",
    documentType: "Utility Bill",
    status: "Pending",
    submittedAt: "2024-04-21 14:20 PM",
  },
  {
    id: "KYC-005",
    user: "Michael Wilson",
    documentType: "Passport",
    status: "Pending",
    submittedAt: "2024-04-22 11:45 AM",
  },
]

const AmlMonitoring = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const { hasPermission } = useAdmin()

  



  const suspiciousActivities = [
    {
      id: "AML-001",
      user: "John Doe",
      activityType: "Multiple large transactions",
      riskLevel: "High",
      status: "Cleared",
      detectedAt: "2024-04-23 10:45 AM",
    },
    {
      id: "AML-002",
      user: "Sarah Miller",
      activityType: "Unusual login pattern",
      riskLevel: "High",
      status: "Cleared",

      detectedAt: "2024-04-22 09:30 AM",
    },
    {
        id: "AML-002",
        user: "James Smith",
        activityType: "Multiple Login attempts",
        riskLevel: "High",
        status: "UnderReview",

        detectedAt: "2024-04-22 09:30 AM",
      },
      {
        id: "AML-002",
        user: "Sarah Miller",
        activityType: "Unusual login pattern",
        riskLevel: "High",
        status: "Cleared",

        detectedAt: "2024-04-22 09:30 AM",
      },
      {
        id: "AML-002",
        user: "Sarah Miller",
        activityType: "Unusual login pattern",
        riskLevel: "High",
        status: "Under review",

        detectedAt: "2024-04-22 09:30 AM",
      },
      {
        id: "AML-002",
        user: "Sarah Miller",
        activityType: "Unusual login pattern",
        riskLevel: "High",
        status: "Under review",

        detectedAt: "2024-04-22 09:30 AM",
      },
  ]

  const suspiciousColumns = [
    {
      key: "id",
      header: "ALERT ID",
      render: (row) => <span className="font-medium">{row.id}</span>,
    },
    {
      key: "user",
      header: "USER",
    },
    {
      key: "activityType",
      header: "ACTIVITY TYPE",
    },
    {
      key: "riskLevel",
      header: "RISK LEVEL",
      render: (row) => (
        <Badge
          variant="outline"
          className={
            row.riskLevel === "High"
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-yellow-200 bg-yellow-50 text-yellow-700"
          }
        >
          {row.riskLevel}
        </Badge>
      ),
    },
    {
        key: "status",
        header: "STATUS",
        render: (row) => (
          <Badge
            variant="outline"
            className={
              row.status === "Cleared"
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-yellow-200 bg-yellow-50 text-yellow-700"
            }
          >
            {row.status}
          </Badge>
        ),
      },
    {
      key: "detectedAt",
      header: "DETECTED",
    },
    {
      key: "actions",
      header: "ACTIONS",
      render: () => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Shield className="mr-2 h-4 w-4" />
            Investigate
          </Button>
          <Button variant="ghost" size="sm" className="text-red-600">
            <AlertCircle className="mr-2 h-4 w-4" />
            Escalate
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="flex flex-col">
 <header className="border-b">
        <div className="flex h-16 items-center px-4 gap-4">
          <h1 className="text-xl font-semibold">AML Dashboard</h1>
          <span className="text-sm text-muted-foreground">Monitor AML</span>
          <div className="ml-auto flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-[250px] pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard title="Total Flagged Transactions" value="32" subtitle="+8 new today" />
          <StatCard title="Users Under Review" value="10" subtitle="+5 today" />
          <StatCard title="High-risk users" value="7" subtitle="Require attention" trend="neutral" />
          <StatCard title="Pending SARs (Suspicious Activity Reports)" value="40" subtitle="10 from last week" trend="down" />
        </div>

        <div className="flex items-center justify-between">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-[300px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button>Export Report</Button>
        </div>

      

        {hasPermission("monitorHighRiskTransactions") && (
          <Card>
            <CardHeader>
              <CardTitle>High-risk Users</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={suspiciousColumns} data={suspiciousActivities} />
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}

export default AmlMonitoring;
