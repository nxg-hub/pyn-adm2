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


const AuditLogs = () => {
    const [searchQuery, setSearchQuery] = useState("")
  const { hasPermission } = useAdmin()


const suspiciousActivities = [
    {
      id: "01",
      timeStamp: "2024-04-23 10:45 AM",
      actor: "David Mill (Admin)",
      description: "Suspended User",
      status: "Success",
    },
    {
      id: "02",
      timeStamp: "2024-04-23 10:45 AM",
      actor: "Sarah Miller (User)",
      description: "Updated Profile",
      status: "Pending",
    },
  ]

  const suspiciousColumns = [
    {
      key: "id",
      header: "ID",
      render: (row) => <span className="font-medium">{row.id}</span>,
    },
    {
        key: "timeStamp",
        header: "TIME STAMP",
      },
    {
      key: "actor",
      header: "ACTOR",
    },
    {
      key: "description",
      header: "DESCRIPTION",
    },
    {
      key: "status",
      header: "STATUS",
      render: (row) => (
        <Badge
          variant="outline"
          className={
            row.status === "Success"
              ? "border-green-200 bg-green-50 text-green-700"
              : "border-yellow-200 bg-yellow-50 text-yellow-700"
          }
        >
          {row.status}
        </Badge>
      ),
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

export default AuditLogs;