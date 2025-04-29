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
import ReasonPromptDialog from "./common/ReasonPromptDialog.jsx"

const virtualCardData = [
  {
    id: "VC-001",
    cardholder: "Alice Johnson",
    merchant: "Amazon",
    amount: "$75.00",
    status: "success",
    date: "2024-04-09",
  },
  {
    id: "VC-002",
    cardholder: "David Smith",
    merchant: "Netflix",
    amount: "$15.99",
    status: "pending",
    date: "2024-04-10",
  },
  {
    id: "VC-003",
    cardholder: "Ella Brown",
    merchant: "AliExpress",
    amount: "$120.50",
    status: "failed",
    date: "2024-04-11",
  },
]

export function VirtualCardTable() {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedTxn, setSelectedTxn] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [flagTxn, setFlagTxn] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const { hasPermission } = useAdmin()

  const filtered = virtualCardData.filter(
    (txn) => activeTab === "all" || txn.status === activeTab
  )

  const itemsPerPage = 5
  const paginatedItems = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const totalPages = Math.ceil(filtered.length / itemsPerPage)

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

    if (txn.status === "success" && hasPermission("viewFinancialReports")) {
      actions.push({
        label: "Download Receipt",
        icon: Download,
        onClick: () => console.log(`Downloading receipt for ${txn.id}`),
      })
    }

    if (hasPermission("monitorHighRiskTransactions")) {
      actions.push({
        label: "Flag Suspicious",
        icon: Flag,
        className: "text-red-600 hover:text-red-700",
        onClick: () => {
          setIsDialogOpen(false)
          setFlagTxn(txn)
        },
      })
    }

    return actions
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Virtual Card Transactions</CardTitle>
          <CardDescription>Monitor and manage your virtual card transactions.</CardDescription>
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
                <TableHead>Cardholder</TableHead>
                <TableHead>Merchant</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    No virtual card transactions for this status.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedItems.map((txn) => (
                  <TableRow key={txn.id}>
                    <TableCell>{txn.id}</TableCell>
                    <TableCell>{txn.cardholder}</TableCell>
                    <TableCell>{txn.merchant}</TableCell>
                    <TableCell>{txn.amount}</TableCell>
                    <TableCell><StatusBadge status={txn.status} /></TableCell>
                    <TableCell>{txn.date}</TableCell>
                    <TableCell className="text-right">
                      {!selectedTxn && <ActionMenu actions={getActionItems(txn)} />}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
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
                Details for {selectedTxn.id}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div><strong>Cardholder:</strong> {selectedTxn.cardholder}</div>
                <div><strong>Merchant:</strong> {selectedTxn.merchant}</div>
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
