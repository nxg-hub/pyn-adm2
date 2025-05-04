// "use client"

// import { useState } from "react"
// import { Eye, Download, Flag } from "lucide-react"
// import {
//   Card, CardHeader, CardTitle, CardDescription, CardContent,
// } from "@/components/ui/card"
// import {
//   Table, TableHeader, TableRow, TableHead, TableBody, TableCell,
// } from "@/components/ui/table"
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import StatusBadge from "@/components/common/StatusBadge"
// import ActionMenu from "@/components/common/ActionMenu"
// import Pagination from "@/components/common/Pagination"
// import ReasonPromptDialog from "@/components/common/ReasonPromptDialog"
// import { useAdmin } from "@/contexts/AdminContext"

// const internationalAirtimeData = [
//   {
//     id: "INT-001",
//     recipient: "+2348012345678",
//     country: "Nigeria",
//     network: "MTN",
//     amount: "$10",
//     date: "2024-04-10",
//     status: "success",
//   },
//   {
//     id: "INT-002",
//     recipient: "+233501234567",
//     country: "Ghana",
//     network: "Vodafone",
//     amount: "$5",
//     date: "2024-04-11",
//     status: "pending",
//   },
//   {
//     id: "INT-003",
//     recipient: "+254701234567",
//     country: "Kenya",
//     network: "Safaricom",
//     amount: "$8",
//     date: "2024-04-13",
//     status: "failed",
//   },
// ]

// export default function InternationalAirtimeTable() {
//   const { hasPermission } = useAdmin()
//   const [activeTab, setActiveTab] = useState("all")
//   const [selectedTxn, setSelectedTxn] = useState(null)
//   const [isDialogOpen, setIsDialogOpen] = useState(false)
//   const [flagTxn, setFlagTxn] = useState(null)

//   const filtered = internationalAirtimeData.filter(txn =>
//     activeTab === "all" || txn.status === activeTab
//   )

//   const handleViewDetails = (txn) => {
//     setSelectedTxn(txn)
//     setIsDialogOpen(true)
//   }

//   const handleFlag = (txn, reason) => {
//     console.log(`Flagged ${txn.id} for:`, reason)
//     setFlagTxn(null)
//   }

//   const getActionItems = (txn) => {
//     const actions = [
//       {
//         label: "View Details",
//         icon: Eye,
//         onClick: () => handleViewDetails(txn),
//       },
//     ]

//     if (txn.status === "success" && hasPermission("viewFinancialReports")) {
//       actions.push({
//         label: "Download Receipt",
//         icon: Download,
//         onClick: () => console.log(`Downloading receipt for ${txn.id}`),
//       })
//     }

//     if (hasPermission("monitorHighRiskTransactions")) {
//       actions.push({
//         label: "Flag Suspicious",
//         icon: Flag,
//         className: "text-red-600 hover:text-red-700",
//         onClick: () => {
//           setIsDialogOpen(false)
//           setFlagTxn(txn)
//         },
//       })
//     }

//     return actions
//   }

//   return (
//     <>
//       <Card>
//         <CardHeader>
//           <CardTitle>International Airtime</CardTitle>
//           <CardDescription>Track top-ups to international mobile numbers.</CardDescription>
//           <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
//             <TabsList>
//               <TabsTrigger value="all">All</TabsTrigger>
//               <TabsTrigger value="success">Success</TabsTrigger>
//               <TabsTrigger value="pending">Pending</TabsTrigger>
//               <TabsTrigger value="failed">Failed</TabsTrigger>
//             </TabsList>
//           </Tabs>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Transaction ID</TableHead>
//                 <TableHead>Recipient</TableHead>
//                 <TableHead>Country</TableHead>
//                 <TableHead>Network</TableHead>
//                 <TableHead>Amount</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Date</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filtered.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={8} className="text-center text-muted-foreground">
//                     No international airtime transactions for this status.
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 filtered.map(txn => (
//                   <TableRow key={txn.id}>
//                     <TableCell>{txn.id}</TableCell>
//                     <TableCell>{txn.recipient}</TableCell>
//                     <TableCell>{txn.country}</TableCell>
//                     <TableCell>{txn.network}</TableCell>
//                     <TableCell>{txn.amount}</TableCell>
//                     <TableCell><StatusBadge status={txn.status} /></TableCell>
//                     <TableCell>{txn.date}</TableCell>
//                     <TableCell className="text-right">
//                       {!selectedTxn && <ActionMenu actions={getActionItems(txn)} />}
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//           <div className="mt-4">
//             <Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />
//           </div>
//         </CardContent>
//       </Card>

//       {/* Transaction Detail Dialog */}
//       {selectedTxn && (
//         <Dialog open={isDialogOpen} onOpenChange={(open) => {
//           setIsDialogOpen(open)
//           if (!open) setSelectedTxn(null)
//         }}>
//           <DialogContent className="sm:max-w-[500px]">
//             <DialogHeader>
//               <DialogTitle>Transaction Details</DialogTitle>
//               <DialogDescription>Details for {selectedTxn.id}</DialogDescription>
//             </DialogHeader>
//             <div className="grid gap-4 py-4">
//               <div><strong>Recipient:</strong> {selectedTxn.recipient}</div>
//               <div><strong>Country:</strong> {selectedTxn.country}</div>
//               <div><strong>Network:</strong> {selectedTxn.network}</div>
//               <div><strong>Amount:</strong> {selectedTxn.amount}</div>
//               <div><strong>Status:</strong> <StatusBadge status={selectedTxn.status} /></div>
//               <div><strong>Date:</strong> {selectedTxn.date}</div>
//             </div>
//             <DialogFooter>
//               <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       )}

//       {/* Flag Reason Dialog */}
//       {flagTxn && (
//         <ReasonPromptDialog
//           title="Flag Suspicious Transaction"
//           description={`Why are you flagging ${flagTxn.id}?`}
//           onCancel={() => setFlagTxn(null)}
//           onSubmit={(reason) => handleFlag(flagTxn, reason)}
//         />
//       )}
//     </>
//   )
// }
