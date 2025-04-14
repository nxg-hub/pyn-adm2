"use client"

import { useState } from "react"
import { Calendar, Download } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const revenueData = [
  { name: "Transfers", value: 125000 },
  { name: "Airtime", value: 85000 },
  { name: "Bills", value: 175000 },
  { name: "TV", value: 95000 },
  { name: "Betting", value: 65000 },
  { name: "Events", value: 45000 },
  { name: "Others", value: 75000 },
]

const userSegmentData = [
  { name: "Regular", value: 60, color: "#3b82f6" },
  { name: "Business", value: 25, color: "#10b981" },
  { name: "Students", value: 10, color: "#f59e0b" },
  { name: "Others", value: 5, color: "#6366f1" },
]

function AnalyticsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="flex flex-col">
      <header className="border-b">
        <div className="flex h-16 items-center px-4 gap-4">
          <h1 className="text-xl font-semibold">Revenue Analytics</h1>
          <span className="text-sm text-muted-foreground">Performance overview of revenue streams</span>
          <div className="ml-auto flex items-center gap-4">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Last 30 Days
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$427,832.50</div>
              <p className="text-xs text-green-500">+12.5% from previous period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Transaction Fees</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$58,456.75</div>
              <p className="text-xs text-green-500">+8.3% from previous period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Subscription Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$32,543.25</div>
              <p className="text-xs text-red-500">-3.1% from previous period</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Revenue by Service Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Revenue by User Segment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <div className="w-[200px] h-[200px] relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={userSegmentData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {userSegmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="flex justify-center gap-4 mt-4">
                {userSegmentData.map((segment) => (
                  <div key={segment.name} className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: segment.color }}></div>
                    <span className="text-xs">
                      {segment.name} ({segment.value}%)
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Growth Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Month-over-Month Growth</span>
                  <span className="text-green-500">+12.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>User Acquisition Cost</span>
                  <span className="text-green-500">-5.3%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Avg. Revenue Per User</span>
                  <span className="text-green-500">+3.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Transaction Success Rate</span>
                  <span className="text-green-500">+1.8%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Customer Retention</span>
                  <span className="text-green-500">+4.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Active User Growth</span>
                  <span className="text-green-500">+7.2%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default AnalyticsPage
