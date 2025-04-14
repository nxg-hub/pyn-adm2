"use client"

import { useState } from "react"
import { Download, FileText, Printer, Search } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Label } from "../../components/ui/label"
import {AdminHeader} from "../../components/layout/AdminHeader"
import { useAdmin } from "../../contexts/AdminContext"
import {Breadcrumb} from "../../components/common/Breadcrumb"

const reports = [
  {
    id: 1,
    name: "Monthly Transaction Summary",
    description: "Summary of all transactions for the current month",
    type: "Financial",
    lastGenerated: "2024-04-28 10:30 AM",
    format: "PDF",
  },
  {
    id: 2,
    name: "User Growth Report",
    description: "Analysis of user growth and retention",
    type: "Analytics",
    lastGenerated: "2024-04-25 09:15 AM",
    format: "Excel",
  },
  {
    id: 3,
    name: "Revenue Breakdown",
    description: "Detailed breakdown of revenue sources",
    type: "Financial",
    lastGenerated: "2024-04-20 14:45 PM",
    format: "PDF",
  },
  {
    id: 4,
    name: "KYC Compliance Report",
    description: "Status of KYC verifications and compliance",
    type: "Compliance",
    lastGenerated: "2024-04-18 11:30 AM",
    format: "PDF",
  },
  {
    id: 5,
    name: "System Performance Metrics",
    description: "Performance metrics for the platform",
    type: "System",
    lastGenerated: "2024-04-15 16:20 PM",
    format: "Excel",
  },
]

const ReportsPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [dateRange, setDateRange] = useState("last30days")
  const { hasPermission } = useAdmin()

  const breadcrumbItems = [{ label: "Reports", href: "/reports" }]

  if (!hasPermission("viewFinancialReports")) {
    return (
      <div className="flex flex-col">
        <AdminHeader title="Reports" subtitle="Generate and view system reports" />
        <main className="flex-1 p-4 md:p-6">
          <Breadcrumb items={breadcrumbItems} />
          <div className="mt-6 rounded-md bg-yellow-50 p-4 text-yellow-700">
            You don't have permission to access this page. Please contact a Super Admin for assistance.
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <AdminHeader title="Reports" subtitle="Generate and view system reports" />

      <main className="flex-1 p-4 md:p-6 space-y-6">
        <Breadcrumb items={breadcrumbItems} />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-auto">
              <Label htmlFor="dateRange">Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger id="dateRange" className="w-full md:w-[180px]">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="last7days">Last 7 days</SelectItem>
                  <SelectItem value="last30days">Last 30 days</SelectItem>
                  <SelectItem value="thisMonth">This month</SelectItem>
                  <SelectItem value="lastMonth">Last month</SelectItem>
                  <SelectItem value="custom">Custom range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="relative">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  type="search"
                  placeholder="Search reports..."
                  className="pl-8 w-full md:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Generate New Report
          </Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Reports</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>All Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Report Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Type</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Last Generated</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Format</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.map((report) => (
                        <tr key={report.id} className="border-b">
                          <td className="px-4 py-3 text-sm">
                            <div>
                              <div className="font-medium">{report.name}</div>
                              <div className="text-xs text-gray-500">{report.description}</div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">{report.type}</td>
                          <td className="px-4 py-3 text-sm">{report.lastGenerated}</td>
                          <td className="px-4 py-3 text-sm">{report.format}</td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Printer className="mr-2 h-4 w-4" />
                                Print
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financial" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Financial Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Report Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Last Generated</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Format</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports
                        .filter((report) => report.type === "Financial")
                        .map((report) => (
                          <tr key={report.id} className="border-b">
                            <td className="px-4 py-3 text-sm">
                              <div>
                                <div className="font-medium">{report.name}</div>
                                <div className="text-xs text-gray-500">{report.description}</div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm">{report.lastGenerated}</td>
                            <td className="px-4 py-3 text-sm">{report.format}</td>
                            <td className="px-4 py-3 text-sm">
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm">
                                  <Download className="mr-2 h-4 w-4" />
                                  Download
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Printer className="mr-2 h-4 w-4" />
                                  Print
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Report Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Last Generated</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Format</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports
                        .filter((report) => report.type === "Analytics")
                        .map((report) => (
                          <tr key={report.id} className="border-b">
                            <td className="px-4 py-3 text-sm">
                              <div>
                                <div className="font-medium">{report.name}</div>
                                <div className="text-xs text-gray-500">{report.description}</div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm">{report.lastGenerated}</td>
                            <td className="px-4 py-3 text-sm">{report.format}</td>
                            <td className="px-4 py-3 text-sm">
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm">
                                  <Download className="mr-2 h-4 w-4" />
                                  Download
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Printer className="mr-2 h-4 w-4" />
                                  Print
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Report Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Last Generated</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Format</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports
                        .filter((report) => report.type === "Compliance")
                        .map((report) => (
                          <tr key={report.id} className="border-b">
                            <td className="px-4 py-3 text-sm">
                              <div>
                                <div className="font-medium">{report.name}</div>
                                <div className="text-xs text-gray-500">{report.description}</div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm">{report.lastGenerated}</td>
                            <td className="px-4 py-3 text-sm">{report.format}</td>
                            <td className="px-4 py-3 text-sm">
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm">
                                  <Download className="mr-2 h-4 w-4" />
                                  Download
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Printer className="mr-2 h-4 w-4" />
                                  Print
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>System Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Report Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Last Generated</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Format</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports
                        .filter((report) => report.type === "System")
                        .map((report) => (
                          <tr key={report.id} className="border-b">
                            <td className="px-4 py-3 text-sm">
                              <div>
                                <div className="font-medium">{report.name}</div>
                                <div className="text-xs text-gray-500">{report.description}</div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm">{report.lastGenerated}</td>
                            <td className="px-4 py-3 text-sm">{report.format}</td>
                            <td className="px-4 py-3 text-sm">
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm">
                                  <Download className="mr-2 h-4 w-4" />
                                  Download
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Printer className="mr-2 h-4 w-4" />
                                  Print
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Scheduled Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Report Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Frequency</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Next Run</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Recipients</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-3 text-sm">
                      <div className="font-medium">Monthly Transaction Summary</div>
                    </td>
                    <td className="px-4 py-3 text-sm">Monthly</td>
                    <td className="px-4 py-3 text-sm">2024-05-01 00:00 AM</td>
                    <td className="px-4 py-3 text-sm">finance@payina.com</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 text-sm">
                      <div className="font-medium">Weekly User Growth Report</div>
                    </td>
                    <td className="px-4 py-3 text-sm">Weekly</td>
                    <td className="px-4 py-3 text-sm">2024-04-29 08:00 AM</td>
                    <td className="px-4 py-3 text-sm">marketing@payina.com</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default ReportsPage
