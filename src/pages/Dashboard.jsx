import { BarChart3, ChevronRight, Clock, DollarSign, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useAdmin } from "../contexts/AdminContext"
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from "../redux/UsersSlice";
import { fetchAdmins } from "../redux/adminsSlice"
import { useState, useEffect } from "react"



const transactionData = [
  { name: "Jan", value: 1200 },
  { name: "Feb", value: 1900 },
  { name: "Mar", value: 1500 },
  { name: "Apr", value: 2400 },
  { name: "May", value: 2800 },
  { name: "Jun", value: 3200 },
  { name: "Jul", value: 3800 },
]



function Dashboard() {
  const dispatch = useDispatch()

  const { currentRole, hasPermission } = useAdmin();
  const users = useSelector((state) => state.users.users); 


   useEffect(() => { 
          dispatch(fetchUsers());
          dispatch(fetchAdmins());
          localStorage.getItem("adminRole")
        }
  , [dispatch]);

  const personalUsers = users.filter((user) => user.userType === "PERSONAL");
const businessUsers = users.filter((user) => user.userType === "CORPORATE");

  const totalUsers = users?.length;

const personalPercent = Math.round((personalUsers.length / totalUsers) * 100);
const businessPercent = Math.round((businessUsers.length / totalUsers) * 100);

const userSegments = [
  {
    name: "Personal",
    value: personalPercent,
    color: "#3b82f6", 
  },
  {
    name: "Business",
    value: businessPercent,
    color: "#f59e0b", 
  },
];

const personalAngle = (personalPercent / 100) * 360;
const businessAngle = (businessPercent / 100) * 360;

  return (
    <div className="flex flex-col">
      <main className="flex-1 p-4 md:p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers}</div>
              <p className="text-xs text-muted-foreground">+12.5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Successful Transactions</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,487</div>
              <p className="text-xs text-muted-foreground">+8.2% from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,289</div>
              <p className="text-xs text-muted-foreground">+5.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-red-500">Require attention</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-7">
          <Card className="md:col-span-4">
            <CardHeader>
              <CardTitle>Transaction Volume</CardTitle>
              <CardDescription>Transaction volume over the last 7 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={transactionData}>
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
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Active Users</CardTitle>
              <CardDescription>User segments by account type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <div
                  className="w-[200px] h-[200px] relative rounded-full"
                  style={{
                    background: `conic-gradient(
                      #3b82f6 0deg ${personalAngle}deg,
                      #f59e0b ${personalAngle}deg ${personalAngle + businessAngle}deg
                    )`,
                  }}
                >
                  <div className="absolute inset-[15%] bg-white rounded-full flex items-center justify-center">
                    <span className="font-bold text-black">{totalUsers}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-4 mt-4">
                {userSegments.map((segment) => (
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
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Urgent Activities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {hasPermission("kycVerification") && (
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div>
                    <h4 className="font-medium">User Verification Approval</h4>
                    <p className="text-sm text-muted-foreground">27 users waiting to be verified</p>
                  </div>
                  <Button size="sm">Review</Button>
                </div>
              )}
              {hasPermission("approveRejectTransactions") && (
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div>
                    <h4 className="font-medium">Large Transaction</h4>
                    <p className="text-sm text-muted-foreground">$50,000+ transaction needs approval</p>
                  </div>
                  <Button size="sm">Review</Button>
                </div>
              )}
              {hasPermission("handleDisputesSupport") && (
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div>
                    <h4 className="font-medium">Account Dispute</h4>
                    <p className="text-sm text-muted-foreground">5 disputes escalated for resolution</p>
                  </div>
                  <Button size="sm">Review</Button>
                </div>
              )}
              {hasPermission("monitorHighRiskTransactions") && (
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div>
                    <h4 className="font-medium">Suspicious Trades</h4>
                    <p className="text-sm text-muted-foreground">3 transactions flagged for review</p>
                  </div>
                  <Button size="sm">Review</Button>
                </div>
              )}
              {!hasPermission("kycVerification") &&
                !hasPermission("approveRejectTransactions") &&
                !hasPermission("handleDisputesSupport") &&
                !hasPermission("monitorHighRiskTransactions") && (
                  <div className="text-center p-4 text-muted-foreground">
                    No urgent activities available for your role.
                  </div>
                )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {hasPermission("kycVerification") && (
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div>
                    <h4 className="font-medium">KYC Verification</h4>
                    <p className="text-sm text-muted-foreground">15 documents waiting for approval</p>
                  </div>
                  <Button size="sm">Review</Button>
                </div>
              )}
              {hasPermission("approveWithdrawals") && (
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div>
                    <h4 className="font-medium">Large Withdrawals</h4>
                    <p className="text-sm text-muted-foreground">7 withdrawals over $5,000</p>
                  </div>
                  <Button size="sm">Review</Button>
                </div>
              )}
              {hasPermission("monitorHighRiskTransactions") && (
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div>
                    <h4 className="font-medium">Flagged Transactions</h4>
                    <p className="text-sm text-muted-foreground">12 transactions flagged for suspicious activity</p>
                  </div>
                  <Button size="sm">Review</Button>
                </div>
              )}
              {hasPermission("manageAdmins") && (
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div>
                    <h4 className="font-medium">New API Requests</h4>
                    <p className="text-sm text-muted-foreground">3 merchants requesting API access</p>
                  </div>
                  <Button size="sm">Review</Button>
                </div>
              )}
              {!hasPermission("kycVerification") &&
                !hasPermission("approveWithdrawals") &&
                !hasPermission("monitorHighRiskTransactions") &&
                !hasPermission("manageAdmins") && (
                  <div className="text-center p-4 text-muted-foreground">
                    No pending approvals available for your role.
                  </div>
                )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center">
            <div>
              <CardTitle>Transaction Management</CardTitle>
              <CardDescription>Monitor and manage recent transactions</CardDescription>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Button>Search</Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All Transactions</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="failed">Failed</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 border-b px-4 py-3 font-medium">
                    <div>Transaction ID</div>
                    <div>User</div>
                    <div>Amount</div>
                    <div>Status</div>
                    <div>Actions</div>
                  </div>
                  <div className="divide-y">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="grid grid-cols-5 items-center px-4 py-3">
                        <div className="font-mono text-sm">TRX-{Math.floor(Math.random() * 1000000)}</div>
                        <div>Jane Doe</div>
                        <div>${(Math.random() * 1000).toFixed(2)}</div>
                        <div>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              i % 3 === 0
                                ? "bg-yellow-100 text-yellow-800"
                                : i % 3 === 1
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {i % 3 === 0 ? "Pending" : i % 3 === 1 ? "Completed" : "Failed"}
                          </span>
                        </div>
                        <div>
                          <Button variant="ghost" size="sm">
                            View Details <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="peing" className="mt-4">
                {/* Similar content for pending transactions */}
              </TabsContent>
              <TabsContent value="completed" className="mt-4">
                {/* Similar content for completed transactions */}
              </TabsContent>
              <TabsContent value="failed" className="mt-4">
                {/* Similar content for failed transactions */}
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">Showing 1-5 of 235 transactions</div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}

export default Dashboard
