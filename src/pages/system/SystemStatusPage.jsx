// import { CheckCircle, XCircle, AlertTriangle, RefreshCw } from "lucide-react"
// import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
// import { Button } from "../../components/ui/button"
//
// const services = [
//   {
//     name: "Authentication Service",
//     status: "Operational",
//     uptime: "99.99%",
//     lastIncident: "None",
//   },
//   {
//     name: "Payment Processing",
//     status: "Operational",
//     uptime: "99.95%",
//     lastIncident: "3 days ago",
//   },
//   {
//     name: "Wallet Service",
//     status: "Operational",
//     uptime: "99.98%",
//     lastIncident: "7 days ago",
//   },
//   {
//     name: "Notification Service",
//     status: "Degraded Performance",
//     uptime: "98.75%",
//     lastIncident: "Ongoing",
//   },
//   {
//     name: "KYC Verification",
//     status: "Operational",
//     uptime: "99.90%",
//     lastIncident: "2 days ago",
//   },
//   {
//     name: "API Gateway",
//     status: "Operational",
//     uptime: "99.99%",
//     lastIncident: "None",
//   },
//   {
//     name: "Database Cluster",
//     status: "Operational",
//     uptime: "99.99%",
//     lastIncident: "14 days ago",
//   },
//   {
//     name: "SMS Provider",
//     status: "Outage",
//     uptime: "95.50%",
//     lastIncident: "Ongoing",
//   },
// ]
//
// function SystemStatusPage() {
//   return (
//     <div className="flex flex-col">
//       <main className="flex-1 p-4 md:p-6 space-y-6">
//         <div className="flex justify-between items-center">
//           <div>
//             <h1 className="text-2xl font-bold">System Status</h1>
//             <p className="text-muted-foreground">Last updated: April 24, 2024 10:30 AM</p>
//           </div>
//           <Button>
//             <RefreshCw className="mr-2 h-4 w-4" />
//             Refresh Status
//           </Button>
//         </div>
//
//         <div className="grid gap-4 md:grid-cols-4">
//           <Card>
//             <CardHeader className="pb-2">
//               <CardTitle className="text-sm font-medium">Overall System Status</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="flex items-center gap-2">
//                 <AlertTriangle className="h-5 w-5 text-yellow-500" />
//                 <span className="text-lg font-medium">Partially Degraded</span>
//               </div>
//               <p className="text-xs text-muted-foreground mt-1">2 incidents affecting service</p>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader className="pb-2">
//               <CardTitle className="text-sm font-medium">Uptime (30 days)</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">99.87%</div>
//               <p className="text-xs text-muted-foreground">3 hours of downtime</p>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader className="pb-2">
//               <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">2</div>
//               <p className="text-xs text-yellow-500">Being investigated</p>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader className="pb-2">
//               <CardTitle className="text-sm font-medium">Resolved (30 days)</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">7</div>
//               <p className="text-xs text-green-500">All issues resolved</p>
//             </CardContent>
//           </Card>
//         </div>
//
//         <Card>
//           <CardHeader>
//             <CardTitle>Service Status</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {services.map((service) => (
//                 <div key={service.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
//                   <div className="flex items-center gap-3">
//                     {service.status === "Operational" ? (
//                       <CheckCircle className="h-5 w-5 text-green-500" />
//                     ) : service.status === "Degraded Performance" ? (
//                       <AlertTriangle className="h-5 w-5 text-yellow-500" />
//                     ) : (
//                       <XCircle className="h-5 w-5 text-red-500" />
//                     )}
//                     <div>
//                       <h3 className="font-medium">{service.name}</h3>
//                       <p className="text-sm text-muted-foreground">Uptime: {service.uptime}</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <span
//                       className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
//                         service.status === "Operational"
//                           ? "bg-green-100 text-green-800"
//                           : service.status === "Degraded Performance"
//                             ? "bg-yellow-100 text-yellow-800"
//                             : "bg-red-100 text-red-800"
//                       }`}
//                     >
//                       {service.status}
//                     </span>
//                     <p className="text-xs text-muted-foreground mt-1">Last incident: {service.lastIncident}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//
//         <div className="grid gap-4 md:grid-cols-2">
//           <Card>
//             <CardHeader>
//               <CardTitle>Active Incidents</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div className="p-3 bg-muted/50 rounded-lg border-l-4 border-yellow-500">
//                   <div className="flex justify-between">
//                     <h3 className="font-medium">Notification Service Degraded</h3>
//                     <span className="text-xs text-yellow-500">Investigating</span>
//                   </div>
//                   <p className="text-sm mt-1">Push notifications are experiencing delays of up to 5 minutes.</p>
//                   <p className="text-xs text-muted-foreground mt-2">Started: April 24, 2024 08:15 AM</p>
//                 </div>
//                 <div className="p-3 bg-muted/50 rounded-lg border-l-4 border-red-500">
//                   <div className="flex justify-between">
//                     <h3 className="font-medium">SMS Provider Outage</h3>
//                     <span className="text-xs text-red-500">Major Outage</span>
//                   </div>
//                   <p className="text-sm mt-1">SMS delivery is currently unavailable due to third-party provider issues.</p>
//                   <p className="text-xs text-muted-foreground mt-2">Started: April 24, 2024 09:30 AM</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader>
//               <CardTitle>Recent Maintenance</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div className="p-3 bg-muted/50 rounded-lg">
//                   <div className="flex justify-between">
//                     <h3 className="font-medium">Database Optimization</h3>
//                     <span className="text-xs text-green-500">Completed</span>
//                   </div>
//                   <p className="text-sm mt-1">Scheduled maintenance to optimize database performance.</p>
//                   <p className="text-xs text-muted-foreground mt-2\



// "use client"

// import { useState } from "react"
// import { Activity, AlertCircle, CheckCircle, Clock, Database, Download, Server, Settings } from "lucide-react"
// import { Button } from "../../components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
// import {AdminHeader} from "../../components/layout/AdminHeader"
// import { useAdmin } from "../../contexts/AdminContext"
// import {Breadcrumb} from "../../components/common/Breadcrumb"

// const SystemStatusPage = () => {
//   const [activeTab, setActiveTab] = useState("overview")
//   const { hasPermission } = useAdmin()

//   // const breadcrumbItems = [{ label: "System Status", href: "/system" }]

//   if (!hasPermission("viewAdminActivityLogs")) {
//     return (
//         <div className="flex flex-col">
//           {/* <AdminHeader title="System Status" subtitle="Monitor system performance and status" /> */}
//           <main className="flex-1 p-4 md:p-6">
//             {/* <Breadcrumb items={breadcrumbItems} /> */}
//             <div className="mt-6 rounded-md bg-yellow-50 p-4 text-yellow-700">
//               You don't have permission to access this page. Please contact a Super Admin for assistance.
//             </div>
//           </main>
//         </div>
//     )
//   }

//   return (
//       <div className="flex flex-col">
//         {/* <AdminHeader title="System Status" subtitle="Monitor system performance and status" /> */}

//         <main className="flex-1 p-4 md:p-6 space-y-6">
//           {/* <Breadcrumb items={breadcrumbItems} /> */}

//           <div className="flex justify-between items-center">
//             <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//               <TabsList>
//                 <TabsTrigger value="overview">Overview</TabsTrigger>
//                 <TabsTrigger value="services">Services</TabsTrigger>
//                 <TabsTrigger value="logs">System Logs</TabsTrigger>
//                 <TabsTrigger value="activity">Admin Activity</TabsTrigger>
//               </TabsList>
//             </Tabs>

//             <Button>
//               <Download className="mr-2 h-4 w-4" />
//               Export Report
//             </Button>
//           </div>
// <Tabs>
//           <TabsContent value="overview" className={activeTab === "overview" ? "block" : "hidden"}>
//             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//               <Card className="bg-green-50 border-green-200">
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-sm font-medium text-green-700">API Status</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex items-center">
//                     <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
//                     <span className="text-xl font-bold text-green-700">Operational</span>
//                   </div>
//                   <p className="text-xs text-green-600 mt-1">100% uptime in last 24h</p>
//                 </CardContent>
//               </Card>

//               <Card className="bg-green-50 border-green-200">
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-sm font-medium text-green-700">Database Status</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex items-center">
//                     <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
//                     <span className="text-xl font-bold text-green-700">Operational</span>
//                   </div>
//                   <p className="text-xs text-green-600 mt-1">99.9% uptime in last 24h</p>
//                 </CardContent>
//               </Card>

//               <Card className="bg-green-50 border-green-200">
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-sm font-medium text-green-700">Web App Status</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex items-center">
//                     <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
//                     <span className="text-xl font-bold text-green-700">Operational</span>
//                   </div>
//                   <p className="text-xs text-green-600 mt-1">100% uptime in last 24h</p>
//                 </CardContent>
//               </Card>

//               <Card className="bg-yellow-50 border-yellow-200">
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-sm font-medium text-yellow-700">Payment Gateway</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex items-center">
//                     <Clock className="h-5 w-5 text-yellow-600 mr-2" />
//                     <span className="text-xl font-bold text-yellow-700">Degraded</span>
//                   </div>
//                   <p className="text-xs text-yellow-600 mt-1">95.2% uptime in last 24h</p>
//                 </CardContent>
//               </Card>
//             </div>

//             <div className="mt-6 grid gap-6 md:grid-cols-2">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>System Health</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     <div>
//                       <div className="flex items-center justify-between mb-1">
//                         <span className="text-sm font-medium">CPU Usage</span>
//                         <span className="text-sm font-medium">32%</span>
//                       </div>
//                       <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
//                         <div className="h-full bg-blue-600 rounded-full" style={{ width: "32%" }}></div>
//                       </div>
//                     </div>

//                     <div>
//                       <div className="flex items-center justify-between mb-1">
//                         <span className="text-sm font-medium">Memory Usage</span>
//                         <span className="text-sm font-medium">45%</span>
//                       </div>
//                       <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
//                         <div className="h-full bg-blue-600 rounded-full" style={{ width: "45%" }}></div>
//                       </div>
//                     </div>

//                     <div>
//                       <div className="flex items-center justify-between mb-1">
//                         <span className="text-sm font-medium">Disk Usage</span>
//                         <span className="text-sm font-medium">68%</span>
//                       </div>
//                       <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
//                         <div className="h-full bg-yellow-600 rounded-full" style={{ width: "68%" }}></div>
//                       </div>
//                     </div>

//                     <div>
//                       <div className="flex items-center justify-between mb-1">
//                         <span className="text-sm font-medium">Network Bandwidth</span>
//                         <span className="text-sm font-medium">22%</span>
//                       </div>
//                       <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
//                         <div className="h-full bg-blue-600 rounded-full" style={{ width: "22%" }}></div>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>Recent Incidents</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     <div className="flex items-start">
//                       <div className="flex-shrink-0 mt-0.5">
//                         <AlertCircle className="h-5 w-5 text-yellow-600" />
//                       </div>
//                       <div className="ml-3">
//                         <h3 className="text-sm font-medium">Payment Gateway Degraded Performance</h3>
//                         <p className="text-xs text-gray-500 mt-1">Started: 2024-04-25 08:30 AM</p>
//                         <p className="text-xs text-gray-500">Status: Investigating</p>
//                       </div>
//                     </div>

//                     <div className="flex items-start">
//                       <div className="flex-shrink-0 mt-0.5">
//                         <CheckCircle className="h-5 w-5 text-green-600" />
//                       </div>
//                       <div className="ml-3">
//                         <h3 className="text-sm font-medium">API Rate Limiting Issue</h3>
//                         <p className="text-xs text-gray-500 mt-1">Started: 2024-04-23 14:15 PM</p>
//                         <p className="text-xs text-gray-500">Resolved: 2024-04-23 16:45 PM</p>
//                       </div>
//                     </div>

//                     <div className="flex items-start">
//                       <div className="flex-shrink-0 mt-0.5">
//                         <CheckCircle className="h-5 w-5 text-green-600" />
//                       </div>
//                       <div className="ml-3">
//                         <h3 className="text-sm font-medium">Database Connectivity Issues</h3>
//                         <p className="text-xs text-gray-500 mt-1">Started: 2024-04-20 09:10 AM</p>
//                         <p className="text-xs text-gray-500">Resolved: 2024-04-20 10:30 AM</p>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             <Card className="mt-6">
//               <CardHeader>
//                 <CardTitle>System Metrics</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead>
//                     <tr className="border-b">
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Metric</th>
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Current</th>
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Average</th>
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Peak</th>
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     <tr className="border-b">
//                       <td className="px-4 py-3 text-sm">API Response Time</td>
//                       <td className="px-4 py-3 text-sm">120ms</td>
//                       <td className="px-4 py-3 text-sm">145ms</td>
//                       <td className="px-4 py-3 text-sm">320ms</td>
//                       <td className="px-4 py-3 text-sm">
//                         <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
//                           Good
//                         </span>
//                       </td>
//                     </tr>
//                     <tr className="border-b">
//                       <td className="px-4 py-3 text-sm">Database Query Time</td>
//                       <td className="px-4 py-3 text-sm">85ms</td>
//                       <td className="px-4 py-3 text-sm">92ms</td>
//                       <td className="px-4 py-3 text-sm">210ms</td>
//                       <td className="px-4 py-3 text-sm">
//                         <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
//                           Good
//                         </span>
//                       </td>
//                     </tr>
//                     <tr className="border-b">
//                       <td className="px-4 py-3 text-sm">Error Rate</td>
//                       <td className="px-4 py-3 text-sm">0.8%</td>
//                       <td className="px-4 py-3 text-sm">1.2%</td>
//                       <td className="px-4 py-3 text-sm">3.5%</td>
//                       <td className="px-4 py-3 text-sm">
//                         <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
//                           Good
//                         </span>
//                       </td>
//                     </tr>
//                     <tr className="border-b">
//                       <td className="px-4 py-3 text-sm">Payment Gateway Response Time</td>
//                       <td className="px-4 py-3 text-sm">450ms</td>
//                       <td className="px-4 py-3 text-sm">320ms</td>
//                       <td className="px-4 py-3 text-sm">780ms</td>
//                       <td className="px-4 py-3 text-sm">
//                         <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800">
//                           Degraded
//                         </span>
//                       </td>
//                     </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>
//           </Tabs>
//           <Tabs>

//           <TabsContent value="services" className={activeTab === "services" ? "block" : "hidden"}>
//             <Card>
//               <CardHeader>
//                 <CardTitle>Service Status</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead>
//                     <tr className="border-b">
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Service</th>
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Uptime</th>
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Last Incident</th>
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     <tr className="border-b">
//                       <td className="px-4 py-3 text-sm">
//                         <div className="flex items-center">
//                           <Server className="h-4 w-4 mr-2" />
//                           API Service
//                         </div>
//                       </td>
//                       <td className="px-4 py-3 text-sm">
//                         <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
//                           Operational
//                         </span>
//                       </td>
//                       <td className="px-4 py-3 text-sm">99.98%</td>
//                       <td className="px-4 py-3 text-sm">2024-04-23 14:15 PM</td>
//                       <td className="px-4 py-3 text-sm">
//                         <Button variant="ghost" size="sm">
//                           View Logs
//                         </Button>
//                       </td>
//                     </tr>
//                     <tr className="border-b">
//                       <td className="px-4 py-3 text-sm">
//                         <div className="flex items-center">
//                           <Database className="h-4 w-4 mr-2" />
//                           Database Service
//                         </div>
//                       </td>
//                       <td className="px-4 py-3 text-sm">
//                         <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
//                           Operational
//                         </span>
//                       </td>
//                       <td className="px-4 py-3 text-sm">99.95%</td>
//                       <td className="px-4 py-3 text-sm">2024-04-20 09:10 AM</td>
//                       <td className="px-4 py-3 text-sm">
//                         <Button variant="ghost" size="sm">
//                           View Logs
//                         </Button>
//                       </td>
//                     </tr>
//                     <tr className="border-b">
//                       <td className="px-4 py-3 text-sm">
//                         <div className="flex items-center">
//                           <Activity className="h-4 w-4 mr-2" />
//                           Web Application
//                         </div>
//                       </td>
//                       <td className="px-4 py-3 text-sm">
//                         <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
//                           Operational
//                         </span>
//                       </td>
//                       <td className="px-4 py-3 text-sm">100%</td>
//                       <td className="px-4 py-3 text-sm">None</td>
//                       <td className="px-4 py-3 text-sm">
//                         <Button variant="ghost" size="sm">
//                           View Logs
//                         </Button>
//                       </td>
//                     </tr>
//                     <tr className="border-b">
//                       <td className="px-4 py-3 text-sm">
//                         <div className="flex items-center">
//                           <Settings className="h-4 w-4 mr-2" />
//                           Payment Gateway
//                         </div>
//                       </td>
//                       <td className="px-4 py-3 text-sm">
//                         <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800">
//                           Degraded
//                         </span>
//                       </td>
//                       <td className="px-4 py-3 text-sm">95.2%</td>
//                       <td className="px-4 py-3 text-sm">2024-04-25 08:30 AM</td>
//                       <td className="px-4 py-3 text-sm">
//                         <Button variant="ghost" size="sm">
//                           View Logs
//                         </Button>
//                       </td>
//                     </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>
//           </Tabs>
// <Tabs>
//           <TabsContent value="logs" className={activeTab === "logs" ? "block" : "hidden"}>
//             <Card>
//               <CardHeader>
//                 <CardTitle>System Logs</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead>
//                     <tr className="border-b">
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Timestamp</th>
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Level</th>
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Service</th>
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Message</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     <tr className="border-b">
//                       <td className="px-4 py-3 text-sm">2024-04-25 10:45:23</td>
//                       <td className="px-4 py-3 text-sm">
//                         <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800">
//                           WARNING
//                         </span>
//                       </td>
//                       <td className="px-4 py-3 text-sm">Payment Gateway</td>
//                       <td className="px-4 py-3 text-sm">Increased response time detected (450ms)</td>
//                     </tr>
//                     <tr className="border-b">
//                       <td className="px-4 py-3 text-sm">2024-04-25 10:30:15</td>
//                       <td className="px-4 py-3 text-sm">
//                         <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
//                           INFO
//                         </span>
//                       </td>
//                       <td className="px-4 py-3 text-sm">API Service</td>
//                       <td className="px-4 py-3 text-sm">Rate limiting applied to IP 192.168.1.45</td>
//                     </tr>
//                     <tr className="border-b">
//                       <td className="px-4 py-3 text-sm">2024-04-25 10:15:02</td>
//                       <td className="px-4 py-3 text-sm">
//                         <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-800">
//                           ERROR
//                         </span>
//                       </td>
//                       <td className="px-4 py-3 text-sm">Database Service</td>
//                       <td className="px-4 py-3 text-sm">Connection timeout for query #45982</td>
//                     </tr>
//                     <tr className="border-b">
//                       <td className="px-4 py-3 text-sm">2024-04-25 10:10:45</td>
//                       <td className="px-4 py-3 text-sm">
//                         <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
//                           INFO
//                         </span>
//                       </td>
//                       <td className="px-4 py-3 text-sm">Web Application</td>
//                       <td className="px-4 py-3 text-sm">User login successful: user_id=12345</td>
//                     </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>
//           </Tabs>
//           <Tabs>

//           <TabsContent value="activity" className={activeTab === "activity" ? "block" : "hidden"}>
//             <Card>
//               <CardHeader>
//                 <CardTitle>Admin Activity Logs</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead>
//                     <tr className="border-b">
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Timestamp</th>
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Admin</th>
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Role</th>
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Action</th>
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Details</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     <tr className="border-b">
//                       <td className="px-4 py-3 text-sm">2024-04-25 11:30:15</td>
//                       <td className="px-4 py-3 text-sm">john.doe@example.com</td>
//                       <td className="px-4 py-3 text-sm">Super Admin</td>
//                       <td className="px-4 py-3 text-sm">User Account Modified</td>
//                       <td className="px-4 py-3 text-sm">Changed account status for user_id=5678 to "Suspended"</td>
//                     </tr>
//                     <tr className="border-b">
//                       <td className="px-4 py-3 text-sm">2024-04-25 10:45:30</td>
//                       <td className="px-4 py-3 text-sm">jane.smith@example.com</td>
//                       <td className="px-4 py-3 text-sm">Finance Manager</td>
//                       <td className="px-4 py-3 text-sm">Transaction Approved</td>
//                       <td className="px-4 py-3 text-sm">Approved transaction #TRX-20240425-001 for $5,000</td>
//                     </tr>
//                     <tr className="border-b">
//                       <td className="px-4 py-3 text-sm">2024-04-25 10:15:22</td>
//                       <td className="px-4 py-3 text-sm">robert.johnson@example.com</td>
//                       <td className="px-4 py-3 text-sm">Operations Manager</td>
//                       <td className="px-4 py-3 text-sm">KYC Verification</td>
//                       <td className="px-4 py-3 text-sm">Approved KYC documents for user_id=9012</td>
//                     </tr>
//                     <tr className="border-b">
//                       <td className="px-4 py-3 text-sm">2024-04-25 09:50:10</td>
//                       <td className="px-4 py-3 text-sm">emily.davis@example.com</td>
//                       <td className="px-4 py-3 text-sm">Customer Care Rep</td>
//                       <td className="px-4 py-3 text-sm">Support Ticket</td>
//                       <td className="px-4 py-3 text-sm">Resolved support ticket #TKT-001</td>
//                     </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>
//           </Tabs>
//         </main>
//       </div>
//   )
// }

// export default SystemStatusPage

const SystemStatusPage = () => {
  return (
    <div>Coming soon...</div>
  )
}
export default SystemStatusPage

