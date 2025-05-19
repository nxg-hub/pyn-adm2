import { BarChart, LineChart, PieChart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import StatCard from "./common/StatCard"
import ChartCard from "./common/ChartCard"
// import { useAdmin } from "./admin-context"

export function AnalyticsDashboard() {
  // const { hasPermission } = useAdmin()

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

  const transactionTypeData = [
    { name: "Deposits", value: 45 },
    { name: "Withdrawals", value: 30 },
    { name: "Transfers", value: 25 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row">
        <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* <StatCard
              title="Total Revenue"
              value="$1,234,567"
              description="+12.5% from last month"
              icon={<LineChart className="h-4 w-4" />}
              trend="up"
            />
            <StatCard
              title="Active Users"
              value="45,678"
              description="+5.2% from last month"
              icon={<BarChart className="h-4 w-4" />}
              trend="up"
            />
            <StatCard
              title="Transaction Volume"
              value="123,456"
              description="+8.3% from last month"
              icon={<PieChart className="h-4 w-4" />}
              trend="up"
            />
            <StatCard
              title="Average Transaction"
              value="$123.45"
              description="-2.1% from last month"
              icon={<LineChart className="h-4 w-4" />}
              trend="down"
            /> */}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ChartCard
              title="Revenue Growth"
              description="Monthly revenue over the last 6 months"
              data={revenueData}
              type="line"
              className="col-span-2"
            />
            <ChartCard
              title="Transaction Types"
              description="Distribution of transaction types"
              data={transactionTypeData}
              type="pie"
            />
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* <StatCard
              title="Total Revenue"
              value="$1,234,567"
              description="+12.5% from last month"
              icon={<LineChart className="h-4 w-4" />}
              trend="up"
            /> */}
            {/* <StatCard
              title="Transaction Fees"
              value="$234,567"
              description="+10.2% from last month"
              icon={<BarChart className="h-4 w-4" />}
              trend="up"
            /> */}
            {/* <StatCard
              title="Subscription Revenue"
              value="$34,567"
              description="+15.3% from last month"
              icon={<PieChart className="h-4 w-4" />}
              trend="up"
            /> */}
            {/* <StatCard
              title="Other Revenue"
              value="$4,567"
              description="-5.1% from last month"
              icon={<LineChart className="h-4 w-4" />}
              trend="down"
            /> */}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <ChartCard
              title="Revenue Growth"
              description="Monthly revenue over the last 6 months"
              data={revenueData}
              type="line"
            />
            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
                <CardDescription>Revenue by source</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Transaction Fees</p>
                      <p className="text-xs text-muted-foreground">70% of total revenue</p>
                    </div>
                    <p className="text-lg font-bold">$864,197</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Subscriptions</p>
                      <p className="text-xs text-muted-foreground">20% of total revenue</p>
                    </div>
                    <p className="text-lg font-bold">$246,913</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Other</p>
                      <p className="text-xs text-muted-foreground">10% of total revenue</p>
                    </div>
                    <p className="text-lg font-bold">$123,457</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Users"
              value="123,456"
              description="+8.5% from last month"
              icon={<LineChart className="h-4 w-4" />}
              trend="up"
            />
            <StatCard
              title="Active Users"
              value="45,678"
              description="+5.2% from last month"
              icon={<BarChart className="h-4 w-4" />}
              trend="up"
            />
            <StatCard
              title="New Users"
              value="1,234"
              description="+12.3% from last month"
              icon={<PieChart className="h-4 w-4" />}
              trend="up"
            />
            <StatCard
              title="Churn Rate"
              value="2.1%"
              description="-0.5% from last month"
              icon={<LineChart className="h-4 w-4" />}
              trend="down"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <ChartCard
              title="User Growth"
              description="Monthly user growth over the last 6 months"
              data={userGrowthData}
              type="line"
            />
            <Card>
              <CardHeader>
                <CardTitle>User Demographics</CardTitle>
                <CardDescription>User distribution by region</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">North America</p>
                      <p className="text-xs text-muted-foreground">40% of total users</p>
                    </div>
                    <p className="text-lg font-bold">49,382</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Europe</p>
                      <p className="text-xs text-muted-foreground">30% of total users</p>
                    </div>
                    <p className="text-lg font-bold">37,037</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Asia</p>
                      <p className="text-xs text-muted-foreground">20% of total users</p>
                    </div>
                    <p className="text-lg font-bold">24,691</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Other</p>
                      <p className="text-xs text-muted-foreground">10% of total users</p>
                    </div>
                    <p className="text-lg font-bold">12,346</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Transactions"
              value="987,654"
              description="+7.5% from last month"
              icon={<LineChart className="h-4 w-4" />}
              trend="up"
            />
            <StatCard
              title="Transaction Volume"
              value="$12,345,678"
              description="+9.2% from last month"
              icon={<BarChart className="h-4 w-4" />}
              trend="up"
            />
            <StatCard
              title="Average Transaction"
              value="$123.45"
              description="-2.1% from last month"
              icon={<PieChart className="h-4 w-4" />}
              trend="down"
            />
            <StatCard
              title="Failed Transactions"
              value="1.2%"
              description="-0.3% from last month"
              icon={<LineChart className="h-4 w-4" />}
              trend="down"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ChartCard
              title="Transaction Volume"
              description="Monthly transaction volume over the last 6 months"
              data={transactionVolumeData}
              type="line"
              className="col-span-2"
            />
            <ChartCard
              title="Transaction Types"
              description="Distribution of transaction types"
              data={transactionTypeData}
              type="pie"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
