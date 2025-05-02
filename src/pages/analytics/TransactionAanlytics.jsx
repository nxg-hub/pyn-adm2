import React from "react";
import { Calendar, Download } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const userData = [
  { name: "Jan", value: 125000 },
  { name: "Feb", value: 85000 },
  { name: "Mar", value: 175000 },
  { name: "Apr", value: 95000 },
  { name: "May", value: 65000 },
  { name: "Jun", value: 45000 },
  { name: "Jul", value: 75000 },
  { name: "Aug", value: 75000 },
  { name: "Sep", value: 75000 },
  { name: "Oct", value: 75000 },
  { name: "Nov", value: 75000 },
  { name: "Dec", value: 75000 },
];

const userSegmentData = [
  { name: "Transfers", value: 60, color: "#3b82f6" },
  { name: "Bills", value: 10, color: "#10b981" },
  { name: "Airtime", value: 20, color: "#f59e0b" },
  { name: "Betting", value: 10, color: "#f59e0b" },
];

const TransactionAanlytics = () => {
  return (
    <div className="flex flex-col">
      <header className="border-b">
        <div className="flex h-16 items-center px-4 gap-4">
          <h1 className="text-xl font-semibold">Transactions Analytics</h1>
          <span className="text-sm text-muted-foreground">
            Transactions Overview Per Month
          </span>
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
        <div className="grid gap-4 md:grid-cols-5">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">427,832</div>
              {/* <p className="text-xs text-green-500">
            +12.5% from previous period
          </p> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Transfers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">58,456</div>
              {/* <p className="text-xs text-green-500">
            +8.3% from previous period
          </p> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Airtime Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32,543</div>
              {/* <p className="text-xs text-red-500">-3.1% from previous period</p> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Bills Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32,543</div>
              {/* <p className="text-xs text-red-500">-3.1% from previous period</p> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Betting Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32,543</div>
              {/* <p className="text-xs text-red-500">-3.1% from previous period</p> */}
            </CardContent>
          </Card>
        </div>
        <Tabs defaultValue="Transfers">
          <TabsList>
            <TabsTrigger value="Transfers"> Transfers </TabsTrigger>
            <TabsTrigger value="Airtime">Airtime </TabsTrigger>
            <TabsTrigger value="Bills">Bills</TabsTrigger>
            <TabsTrigger value="TV">TV </TabsTrigger>
            <TabsTrigger value="Betting">Betting </TabsTrigger>
          </TabsList>

          <TabsContent value="Transfers" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Transfer Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={userData}>
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
          </TabsContent>
          <TabsContent value="Airtime" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Airtime Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={userData}>
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
          </TabsContent>
          <TabsContent value="Bills" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Bill Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={userData}>
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
          </TabsContent>
          <TabsContent value="TV" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>TV Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={userData}>
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
          </TabsContent>
          <TabsContent value="Betting" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Betting Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={userData}>
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
          </TabsContent>
        </Tabs>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Transactions Pie Representation</CardTitle>
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
                        dataKey="value">
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
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: segment.color }}></div>
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
  );
};

export default TransactionAanlytics;
