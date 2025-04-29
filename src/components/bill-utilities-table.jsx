"use client"

import { useState } from "react"
import { Eye, CheckCircle, Clock, XCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle} from "../components/ui/card.jsx"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../components/ui/table.jsx"
import { Button } from "../components/ui/button.jsx"
import {Dialog, DialogContent, DialogDescription, DialogFooter,DialogHeader, DialogTitle} from "../components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs.jsx"
import { useAdmin } from "../contexts/AdminContext.jsx"
import ActionMenu from "../components/common/ActionMenu.jsx"
import StatusBadge from "../components/common/StatusBadge.jsx"
import Pagination from "../components/common/Pagination.jsx"

const bills = [
  {
    id: "BILL-001",
    name: "Electricity",
    provider: "PowerGrid Inc.",
    amount: "$120.50",
    dueDate: "2023-05-20",
    status: "due",
  },
  {
    id: "BILL-002",
    name: "Water",
    provider: "City Water",
    amount: "$45.00",
    dueDate: "2023-05-18",
    status: "paid",
  },
  {
    id: "BILL-003",
    name: "Internet",
    provider: "NetStream",
    amount: "$75.99",
    dueDate: "2023-05-10",
    status: "overdue",
  },
  {
    id: "BILL-004",
    name: "Gas",
    provider: "HeatPlus",
    amount: "$58.00",
    dueDate: "2023-05-22",
    status: "due",
  },
]

export function BillsAndUtilitiesTable() {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedBill, setSelectedBill] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { hasPermission } = useAdmin()

  const handleViewDetails = (bill) => {
    setSelectedBill(bill)
    setIsDialogOpen(true)
  }

  const handleMarkAsPaid = (billId) => {
    console.log(`Marking bill ${billId} as paid`)
    // Add update logic here
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "paid":
        return CheckCircle
      case "due":
        return Clock
      case "overdue":
        return XCircle
      default:
        return Clock
    }
  }

  const getFilteredBills = () =>
    bills.filter(b => activeTab === "all" || b.status === activeTab)

  const getActionItems = (bill) => {
    const actions = [
      {
        label: "View Details",
        icon: Eye,
        onClick: () => handleViewDetails(bill),
      },
    ]

    if (bill.status !== "paid" && hasPermission("markBillsAsPaid")) {
      actions.push({
        label: "Mark as Paid",
        icon: CheckCircle,
        onClick: () => handleMarkAsPaid(bill.id),
        className: "text-green-600 hover:text-green-700",
      })
    }

    return actions
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Bills & Utilities</CardTitle>
          <CardDescription>Track and manage all recurring bills and utilities.</CardDescription>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
              <TabsTrigger value="due">Due</TabsTrigger>
              <TabsTrigger value="overdue">Overdue</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bill ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getFilteredBills().map(bill => (
                <TableRow key={bill.id}>
                  <TableCell className="font-medium">{bill.id}</TableCell>
                  <TableCell>{bill.name}</TableCell>
                  <TableCell>{bill.provider}</TableCell>
                  <TableCell>{bill.amount}</TableCell>
                  <TableCell>{bill.dueDate}</TableCell>
                  <TableCell><StatusBadge status={bill.status} /></TableCell>
                  <TableCell className="text-right">
                    <ActionMenu actions={getActionItems(bill)} />
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

      {selectedBill && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Bill Details</DialogTitle>
              <DialogDescription>Details for bill {selectedBill.id}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium">Name</h4>
                  <p>{selectedBill.name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Provider</h4>
                  <p>{selectedBill.provider}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Amount</h4>
                  <p>{selectedBill.amount}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Due Date</h4>
                  <p>{selectedBill.dueDate}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Status</h4>
                  <StatusBadge status={selectedBill.status} />
                </div>
              </div>
            </div>
            <DialogFooter>
              {selectedBill.status !== "paid" && hasPermission("markBillsAsPaid") ? (
                <Button onClick={() => handleMarkAsPaid(selectedBill.id)}>Mark as Paid</Button>
              ) : (
                <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
