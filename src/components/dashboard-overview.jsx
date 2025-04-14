import { ArrowUpRight, CreditCard, DollarSign, Users, Wallet } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "/ui/tabs"
import StatCard from "../../src/components/common/StatCard"
import ChartCard from "../../src/components/common/ChartCard"
import { useAdmin } from "./admin-context"

export function DashboardOverview() {
  const { hasPermission, currentRole } = useAdmin()

  // Sample data for charts
  const revenueData = [
    { name: "Jan", value: 4000 },
    { name: "Feb", value: 3000 },
    { name: "Mar", value: 5000 },
    { name: "Apr", value: 4500 },
    { name: "May", value: 6000 },
    { name: "Jun", value: 5500 },
  ]

  const userGrowthData = [
    { name: "Jan", value: 1000 },
    { name: "Feb", value: 1500 },
    { name: "Mar", value: 2000 },
    { name: "Apr", value: 3000 },
    { name: "May", value: 3500 },
    { name: "Jun", value: 4200 },
  ]

  const transactionVolumeData = [
    { name: "Jan", value: 2000 },
    { name: "Feb", value: 2200 },
    { name: "Mar", value: 2800 },
    { name: "Apr", value: 3200 },
    { name: "May", value: 3800 },
    { name: "Jun", value: 4100 },
  ]

  // Sample data for recent transactions
  const recentTransactions = [
    { id: 1, user: "John Doe", type: "Deposit", amount: "$500.00", status: "completed", date: "2023-06-15" },
    { id: 2, user: "Jane Smith", type: "Withdrawal", amount: "$200.00", status: "completed", date: "2023-06-14" },
    { id: 3, user: "Bob Johnson", type: "Transfer", amount: "$300.00", status: "pending", date: "2023-06-13" },
    { id: 4, user: "Alice Brown", type: "Deposit", amount: "$1,000.00", status: "completed", date: "2023-06-12" },
    { id: 5, user: "Charlie Wilson", type: "Withdrawal", amount: "$150.00", status: "failed", date: "2023-06-11" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Users"
              value="123,456"
              description="+10.1% from last month"
              icon={<Users className="h-4 w-4" />}
              trend="up"
            />
            <StatCard
              title="Total Revenue"
              value="$1,234,567"
              description="+12.5% from last month"
              icon={<DollarSign className="h-4 w-4" />}
              trend="up"
            />
            <StatCard
              title="Total Transactions"
              value="987,654"
              description="+7.2% from last month"
              icon={<CreditCard className="h-4 w-4" />}
              trend="up"
            />
            <StatCard
              title="Active Wallets"
              value="45,678"
              description="+5.3% from last month"
              icon={<Wallet className="h-4 w-4" />}
              trend="up"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <ChartCard
              title="Revenue Growth"
              description="Monthly revenue over the last 6 months"
              data={revenueData}
              type="line"
              className="lg:col-span-4"
            />
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Latest 5 transactions across the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{transaction.user}</p>
                        <p className="text-sm text-muted-foreground">
                          {transaction.type} • {transaction.date}
                        </p>
                      </div>
                      <div className="ml-auto font-medium">{transaction.amount}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ChartCard
              title="User Growth"
              description="Monthly user growth over the last 6 months"
              data={userGrowthData}
              type="bar"
            />
            <ChartCard
              title="Transaction Volume"
              description="Monthly transaction volume over the last 6 months"
              data={transactionVolumeData}
              type="line"
            />
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="flex items-center gap-2">
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Conversion Rate</p>
                        <p className="text-sm text-muted-foreground">8.5%</p>
                      </div>
                    </div>
                    <div className="ml-auto text-green-500">+2.1%</div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center gap-2">
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Avg. Transaction</p>
                        <p className="text-sm text-muted-foreground">$123.45</p>
                      </div>
                    </div>
                    <div className="ml-auto text-green-500">+5.3%</div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center gap-2">
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">User Retention</p>
                        <p className="text-sm text-muted-foreground">92.7%</p>
                      </div>
                    </div>
                    <div className="ml-auto text-green-500">+1.2%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Overview</CardTitle>
              <CardDescription>Detailed analytics data will be displayed here</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This section will contain more detailed analytics.</p>
              <p className="mt-4">
                Visit the{" "}
                <a href="/dashboard/analytics" className="text-blue-500 hover:underline">
                  Analytics Dashboard
                </a>{" "}
                for full details.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports Overview</CardTitle>
              <CardDescription>Summary of available reports</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This section will contain links to various reports.</p>
              <p className="mt-4">
                Visit the{" "}
                <a href="/dashboard/reports" className="text-blue-500 hover:underline">
                  Reports Dashboard
                </a>{" "}
                for full details.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
