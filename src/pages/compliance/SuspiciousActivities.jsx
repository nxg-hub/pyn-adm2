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


const SuspiciousActivities = () => {
    const [searchQuery, setSearchQuery] = useState("")
  const { hasPermission } = useAdmin()


const suspiciousActivities = [
    {
      id: "AML-001",
      user: "John Doe",
      activityType: "Multiple large transactions",
      riskLevel: "High",
      detectedAt: "2024-04-23 10:45 AM",
    },
    {
      id: "AML-002",
      user: "Sarah Miller",
      activityType: "Unusual login pattern",
      riskLevel: "Medium",
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
          <h1 className="text-xl font-semibold">Suspicious Activities</h1>
          <span className="text-sm text-muted-foreground">Monitor Suspicious Activities</span>
          <div className="ml-auto flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search verifications..."
                className="w-[250px] pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
          </div>
        </div>
      </header>
      <div className="flex items-center justify-between">
      <Button>Export Report</Button>
    </div>
    {hasPermission("monitorHighRiskTransactions") && (
          <Card>
            <CardHeader>
              <CardTitle>Suspicious Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={suspiciousColumns} data={suspiciousActivities} />
            </CardContent>
          </Card>
        )}
    </div>
  )
};

export default SuspiciousActivities;