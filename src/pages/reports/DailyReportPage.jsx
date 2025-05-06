import { useState } from "react"
import { CalendarDays, Download, Printer, Search } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { AdminHeader } from "../../components/layout/AdminHeader"
import { Breadcrumb } from "../../components/common/Breadcrumb"
import { useAdmin } from "../../contexts/AdminContext"

const dailyReports = [
  {
    id: 1,
    name: "Daily Transaction Report",
    description: "Detailed list of all transactions processed today",
    lastGenerated: "2025-05-01 10:00 AM",
    format: "PDF",
  },
  {
    id: 2,
    name: "Login Activity Report",
    description: "User login sessions and IP logs",
    lastGenerated: "2025-05-01 09:45 AM",
    format: "Excel",
  },
  {
    id: 3,
    name: "Failed Transaction Summary",
    description: "Transactions that failed today with reasons",
    lastGenerated: "2025-05-01 09:30 AM",
    format: "PDF",
  },
]

const DailyReportsPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const { hasPermission } = useAdmin()

  const breadcrumbItems = [
    { label: "Reports", href: "/reports" },
    { label: "Daily Reports", href: "/reports/daily" },
  ]

  const filteredReports = dailyReports.filter((report) =>
    report.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (!hasPermission("reports", "view")) {
    return (
      <div className="flex flex-col">
        <AdminHeader title="Daily Reports" subtitle="View and manage daily report logs" />
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
      <AdminHeader title="Daily Reports" subtitle="View and manage daily report logs" />

      <main className="flex-1 p-4 md:p-6 space-y-6">
        <Breadcrumb items={breadcrumbItems} />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="relative w-full md:w-[250px]">
            <Label htmlFor="search">Search Reports</Label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                type="search"
                placeholder="Search by report name..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Button>
            <CalendarDays className="mr-2 h-4 w-4" />
            Generate Today’s Report
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Reports Generated Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Report Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">last Generated</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Format</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReports.map((report) => (
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
      </main>
    </div>
  )
}

export default DailyReportsPage



// import React from "react";

// const DailyReportsPage = () => {
//   return(
//     <div>hey there</div>
//   )
// }

// export default DailyReportsPage