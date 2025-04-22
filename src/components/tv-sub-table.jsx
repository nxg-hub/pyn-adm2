"use client"

import { useState } from "react"
import { Eye, Download, Flag } from "lucide-react"
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "./ui/card.jsx"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "./ui/table.jsx"
import { Button } from "./ui/button.jsx"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle,
} from "./ui/dialog.jsx"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs.jsx"
import { useAdmin } from "../contexts/AdminContext.jsx"
import ActionMenu from "./common/ActionMenu.jsx"
import StatusBadge from "./common/StatusBadge.jsx"
import Pagination from "./common/Pagination.jsx"
import ReasonPromptDialog from "../components/common/ReasonPromptDialog.jsx"

const tvSubscriptionData = [
  {
    id: "TV-2001",
    provider: "DSTV",
    amount: "$20",
    account: "1234567890",
    status: "success",
    date: "2024-05-10",
  },
  {
    id: "TV-2002",
    provider: "GoTV",
    amount: "$15",
    account: "0987654321",
    status: "pending",
    date: "2024-05-11",
  },
  {
    id: "TV-2003",
    provider: "Startimes",
    amount: "$10",
    account: "1122334455",
    status: "failed",
    date: "2024-05-12",
  },
]

export function TVSubscriptionTable() {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedTxn, setSelectedTxn] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [flagTxn, setFlagTxn] = useState(null)
  const { hasPermission } = useAdmin()

  const filteredTransactions = tvSubscriptionData.filter(
    (txn) => activeTab === "all" || txn.status === activeTab
  )

  const handleViewDetails = (txn) => {
    setSelectedTxn(txn)
    setIsDialogOpen(true)
  }

  const handleFlagSuspicious = (txn, reason) => {
    console.log(`Flagged ${txn.id} for:`, reason)
    setFlagTxn(null)
  }

  const getActionItems = (txn) => {
    const actions = [
      {
        label: "View Details",
        icon: Eye,
        onClick: () => handleViewDetails(txn),
      },
    ]

    if (txn.status === "success") {
      actions.push({
        label: "Download Receipt",
        icon: Download,
        onClick: () => console.log(`Downloading receipt for ${txn.id}`),
      })
    }

    actions.push({
      label: "Flag Suspicious",
      icon: Flag,
      className: "text-red-600 hover:text-red-700",
      onClick: () => {
        setIsDialogOpen(false)
        setFlagTxn(txn)
      },
    })

    return actions
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>TV Subscription Transactions</CardTitle>
          <CardDescription>Track all your TV service subscription payments.</CardDescription>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="success">Success</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="failed">Failed</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell className="font-medium">{txn.id}</TableCell>
                  <TableCell>{txn.provider}</TableCell>
                  <TableCell>{txn.account}</TableCell>
                  <TableCell>{txn.amount}</TableCell>
                  <TableCell><StatusBadge status={txn.status} /></TableCell>
                  <TableCell>{txn.date}</TableCell>
                  <TableCell className="text-right">
                    {!selectedTxn && <ActionMenu actions={getActionItems(txn)} />}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4">
            <Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />
          </div>
        </CardContent>
      </Card>

      {selectedTxn && (
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) setSelectedTxn(null)
        }}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Transaction Details</DialogTitle>
              <DialogDescription>
                Details for transaction {selectedTxn.id}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div><strong>Provider:</strong> {selectedTxn.provider}</div>
                <div><strong>Account:</strong> {selectedTxn.account}</div>
                <div><strong>Amount:</strong> {selectedTxn.amount}</div>
                <div><strong>Date:</strong> {selectedTxn.date}</div>
                <div><strong>Status:</strong> <StatusBadge status={selectedTxn.status} /></div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {flagTxn && (
        <ReasonPromptDialog
          title="Flag Suspicious Transaction"
          description={`Flag ${flagTxn.id} for suspicious activity`}
          onCancel={() => setFlagTxn(null)}
          onSubmit={(reason) => handleFlagSuspicious(flagTxn, reason)}
        />
      )}
    </>
  )
}
