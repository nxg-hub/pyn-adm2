"use client"

import { useState, useEffect} from "react"
import { Download, FileText, Printer, Search } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Label } from "../../components/ui/label"
import { AdminHeader } from "../../components/layout/AdminHeader"
import { useAdmin } from "../../contexts/AdminContext"
import { Breadcrumb } from "../../components/common/Breadcrumb"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../components/ui/dropdown-menu"
import Pagination from "../../components/ui/pagination"

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

function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [dateRange, setDateRange] = useState("last30days")
  const [customStartDate, setCustomStartDate] = useState("")
  const [customEndDate, setCustomEndDate] = useState("")
  const { hasPermission } = useAdmin()
  const breadcrumbItems = [{ label: "Reports", href: "/reports" }]
  const [currentTab, setCurrentTab] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setCurrentPage(1)
  }, [currentTab, searchQuery])

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

  const filterReports = (type) => {
    return reports.filter((report) => {
      const matchesStatus = type === "all" || report.type === type
      const matchesSearch =
        searchQuery.trim() === "" ||
        Object.values(report)
          .join(" ")
          .toLowerCase()
          .includes(searchQuery.toLowerCase())

      const matchesDateRange = true

      return matchesStatus && matchesSearch && matchesDateRange
    })
  }

  const getDateRangeText = () => {
    if (dateRange === "custom" && customStartDate && customEndDate) {
      const startDate = new Date(customStartDate).toLocaleDateString()
      const endDate = new Date(customEndDate).toLocaleDateString()
      return `Custom: ${startDate} - ${endDate}`
    }
    return null
  }

  const isCustomDateRangeValid = () => {
    if (dateRange !== "custom") return true
    if (!customStartDate || !customEndDate) return false
    return new Date(customStartDate) <= new Date(customEndDate)
  }

  function handleExport(type) {
    const dataToExport = type === "all" ? reports : filterReports(currentTab)
    const csv = convertToCSV(dataToExport)
    downloadCSV(csv, `reports-${type}-${new Date().toISOString()}.csv`)
  }

  function convertToCSV(data) {
    if (!data.length) return ""

    const headers = Object.keys(data[0]).join(",")
    const rows = data.map(row =>
      Object.values(row).map(val => `"${val}"`).join(",")
    )
    return [headers, ...rows].join("\n")
  }

  function downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.setAttribute("download", filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const ITEMS_PER_PAGE = 5;

  const renderTable = (type, title) => {
    const filtered = filterReports(type)
    
    const paginatedReports = filtered.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    )

    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Report Name</th>
                    {type === "all" && (
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Type</th>
                    )}
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Last Generated</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Format</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedReports.map((report) => (
                    <tr key={report.id} className="border-b">
                      <td className="px-4 py-3 text-sm">
                        <div>
                          <div className="font-medium">{report.name}</div>
                          <div className="text-xs text-gray-500">{report.description}</div>
                        </div>
                      </td>
                      {type === "all" && <td className="px-4 py-3 text-sm">{report.type}</td>}
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
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={type === "all" ? 5 : 4} className="text-center py-6 text-sm text-muted-foreground">
                        No reports found.
                    </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        {filtered.length > 0 && (
          <div className="flex justify-end">
            <Pagination
              currentPage={currentPage}
              totalItems={filtered.length}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        )}
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

            {dateRange === "custom" && (
              <div className="flex flex-col md:flex-row gap-2">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                    className="w-full md:w-auto"
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                    min={customStartDate}
                    className="w-full md:w-auto"
                  />
                </div>
              </div>
            )}

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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                  Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleExport("all")}>
                Export All Reports
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("filtered")}>
                Export Filtered Reports
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <TabsList>
              <TabsTrigger value="all">All Reports</TabsTrigger>
              <TabsTrigger value="Financial">Financial</TabsTrigger>
              <TabsTrigger value="Analytics">Analytics</TabsTrigger>
              <TabsTrigger value="Compliance">Compliance</TabsTrigger>
              <TabsTrigger value="System">System</TabsTrigger>
            </TabsList>
            
            {getDateRangeText() && (
              <div className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-md">
                {getDateRangeText()}
              </div>
            )}
          </div>

          {dateRange === "custom" && !isCustomDateRangeValid() && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-md">
              {!customStartDate || !customEndDate 
                ? "Please select both start and end dates for custom range" 
                : "End date must be after start date"}
            </div>
          )}

          <TabsContent value="all">{renderTable("all", "All Reports")}</TabsContent>
          <TabsContent value="Financial">{renderTable("Financial", "Financial Reports")}</TabsContent>
          <TabsContent value="Analytics">{renderTable("Analytics", "Analytics Reports")}</TabsContent>
          <TabsContent value="Compliance">{renderTable("Compliance", "Compliance Reports")}</TabsContent>
          <TabsContent value="System">{renderTable("System", "System Reports")}</TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default ReportsPage