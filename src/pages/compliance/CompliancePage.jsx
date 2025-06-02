"use client"

import { useState, useEffect } from "react"
import { AlertCircle, CheckCircle, Clock, FileText, Search, Shield, User, XCircle } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { useAdmin } from "../../contexts/AdminContext"
import { Badge } from "../../components/ui/badge"
import DataTable from "../../components/common/DataTable"
import StatCard from "../../components/common/StatCard"
import apiService from "../../services/apiService";
import Pagination from "../../components/ui/pagination"


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

const CompliancePage = () => {
const [searchQuery, setSearchQuery] = useState("")
const { hasPermission } = useAdmin()
const [currentPage, setCurrentPage] = useState(1);
const [errorMessage, setErrorMessage] = useState('');

const [activities, setActivities] = useState([]);
const [isLoading, setIsLoading] = useState(false);


  const getStatusBadge = (status) => {
    const classes = {
      Pending: "border-yellow-200 bg-yellow-50 text-yellow-700",
      Approved: "border-green-200 bg-green-50 text-green-700",
      Rejected: "border-red-200 bg-red-50 text-red-700",
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
      header: "VERIFICATION ID",
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
      key: "documentType",
      header: "DOCUMENT TYPE",
      render: (row) => (
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          {row.documentType}
        </div>
      ),
    },
    {
      key: "status",
      header: "STATUS",
      render: (row) => getStatusBadge(row.status),
    },
    {
      key: "submittedAt",
      header: "SUBMITTED",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          {row.submittedAt}
        </div>
      ),
    },
    ...(hasPermission("viewAdminActivityLogs")
      ? [
          {
            key: "reviewedBy",
            header: "REVIEWED BY",
            render: (row) => row.reviewedBy || "-",
          },
        ]
      : []),
    {
      key: "actions",
      header: "ACTIONS",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Shield className="mr-2 h-4 w-4" />
            View Documents
          </Button>
          {row.status === "Pending" && (
            <>
              <Button variant="ghost" size="sm" className="text-green-600">
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve
              </Button>
              <Button variant="ghost" size="sm" className="text-red-600">
                <XCircle className="mr-2 h-4 w-4" />
                Reject
              </Button>
            </>
          )}
          {hasPermission("monitorHighRiskTransactions") && (
            <Button variant="ghost" size="sm">
              <AlertCircle className="mr-2 h-4 w-4" />
              Flag
            </Button>
          )}
        </div>
      ),
    },
  ]

const ITEMS_PER_PAGE = 3;

const itemsPerPage = ITEMS_PER_PAGE;

const handleFetchActivities = async () => {
  setIsLoading(true);
  setErrorMessage('');

  try {
    const content = await apiService.SuspiciousActivities(); 

    console.log('Activities content:', content);

    setActivities(content || []);
  } catch (error) {
    const message = error.message || 'Unexpected error';
    setErrorMessage(`Failed to load activities: ${message}`);
  } finally {
    setIsLoading(false);
  }
};

useEffect(() => {
    (handleFetchActivities());
  }, []);

const filteredData = (activities)?.filter((activity) => {
  const NameMatch = activity.customerName?.toLowerCase().includes(searchQuery.toLowerCase())
  // const emailMatch = user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  return NameMatch 
})

const totalActivities= activities.length

const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
const paginatedData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);


  const suspiciousColumns = [
    {
  key: "id",
  header: "REPORT ID",
},
    {
      key: "customerName",
      header: "USER",
    },
    {
      key: "reportType",
      header: "ACTIVITY TYPE",
    },
    {
      key: "severity",
      header: "RISK LEVEL",
      render: (row) => (
        <Badge
          variant="outline"
          className={
            row.severity === "High risk"
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-yellow-200 bg-yellow-50 text-yellow-700"
          }
        >
          {row.severity}
        </Badge>
      ),
    },
   {
  key: "createdAt",
  header: "DETECTED",
  render: (row) => new Date(row.createdAt).toLocaleString(),
},
    // {
    //   key: "actions",
    //   header: "ACTIONS",
    //   render: () => (
    //     <div className="flex items-center gap-2">
    //       <Button variant="ghost" size="sm">
    //         <Shield className="mr-2 h-4 w-4" />
    //         Investigate
    //       </Button>
    //       <Button variant="ghost" size="sm" className="text-red-600">
    //         <AlertCircle className="mr-2 h-4 w-4" />
    //         Escalate
    //       </Button>
    //     </div>
    //   ),
    // },
  ]

  return (
    <div className="flex flex-col">
 <header className="border-b">
        <div className="flex h-16 items-center px-4 gap-4">
          <h1 className="text-xl font-semibold">Compliance Dashboard</h1>
          <span className="text-sm text-muted-foreground">Monitor Compliance and Manage KYC Verification</span>
          <div className="ml-auto flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users..."
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
          <StatCard title="Pending KYC" value="32" subtitle="+8 new today" />
          <StatCard title="Approved KYC" value="1,245" subtitle="+15 today" />
          <StatCard title="Suspicious Activities" value={totalActivities} subtitle="Require attention" trend="neutral" />
          <StatCard title="Avg. Verification Time" value="4.2h" subtitle="-30min from last week" trend="down" />
        </div>

        <div className="flex items-center justify-between">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search verifications..."
              className="w-[300px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button>Export Report</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>KYC Verifications</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All Verifications</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
                <DataTable columns={columns} data={kycVerifications} />
              </TabsContent>
              <TabsContent value="pending" className="mt-4">
                <DataTable columns={columns} data={kycVerifications.filter((v) => v.status === "Pending")} />
              </TabsContent>
              <TabsContent value="approved" className="mt-4">
                <DataTable columns={columns} data={kycVerifications.filter((v) => v.status === "Approved")} />
              </TabsContent>
              <TabsContent value="rejected" className="mt-4">
                <DataTable columns={columns} data={kycVerifications.filter((v) => v.status === "Rejected")} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {hasPermission("monitorHighRiskTransactions") && (
          <Card>
            <CardHeader>
              <CardTitle>Suspicious Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={suspiciousColumns} data={paginatedData} />
            </CardContent>
          </Card>
        )}

         <Pagination
     currentPage={currentPage}
     totalPages={totalPages}
     onPageChange={(page) => setCurrentPage(page)}
      itemsPerPage={itemsPerPage}
      itemLabel="Suspicious Activities"
      totalItems={ totalActivities }
   />
      </main>
    </div>
  )
}

export default CompliancePage
