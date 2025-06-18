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
import { useSelector } from 'react-redux';


const userData = [
  { name: "Jan", value: 125000 },
  { name: "Feb", value: 85000 },
  { name: "Mar", value: 15000 },
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



const UserAnalytics = () => {
   const users = useSelector((state) => state.users.users);


   const personalUsers = users?.filter(user => user.userType === "PERSONAL")
   const businessUsers = users?.filter(user => user.userType === "CORPORATE")

const totalPersonalUsers = personalUsers.length;
const totalBusinessUsers = businessUsers.length;

const userSegmentData = [
  { name: "Business", value: totalBusinessUsers ,color: "#10b981" },
  { name: "Personal", value: totalPersonalUsers, color: "#f59e0b" },
];

  return (
    <div className="flex flex-col">
      <header className="border-b">
        <div className="flex h-16 items-center px-4 gap-4">
          <h1 className="text-xl font-semibold">User Analytics</h1>
          <span className="text-sm text-muted-foreground">
            Registered Users Overview Per Month
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
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Registered Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
              {/* <p className="text-xs text-green-500">
                +12.5% from previous period
              </p> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Personal Registered Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPersonalUsers}</div>
              {/* <p className="text-xs text-green-500">
                +8.3% from previous period
              </p> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Business Registered Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBusinessUsers}</div>
              {/* <p className="text-xs text-red-500">-3.1% from previous period</p> */}
            </CardContent>
          </Card>
        </div>
        <Tabs defaultValue="Total">
          <TabsList>
            <TabsTrigger value="Total">Total Registered Users</TabsTrigger>
            <TabsTrigger value="Personal">Personal Users</TabsTrigger>
            <TabsTrigger value="Business">Business Users</TabsTrigger>
            <TabsTrigger value="Admin">Admin Users</TabsTrigger>
          </TabsList>

          <TabsContent value="Total" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Users</CardTitle>
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
          <TabsContent value="Personal" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Users</CardTitle>
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
          <TabsContent value="Business" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Business Users</CardTitle>
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
          <TabsContent value="Admin" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Admin Users</CardTitle>
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
              <CardTitle> Registered Users Pie Chart</CardTitle>
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

export default UserAnalytics;
