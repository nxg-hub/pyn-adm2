"use client"

import { useState } from "react"
import { ArrowDownRight, ArrowUpRight, CreditCard, Download, Filter, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card.jsx"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import DataTable from "../../src/components/common/DataTable"
import Pagination from "../../src/components/common/Pagination"
import StatCard from "../../src/components/common/StatCard"
import ChartCard from "../../src/components/common/ChartCard"
import ActionMenu from "../../src/components/common/ActionMenu"
import { useAdmin } from "../contexts/AdminContext.jsx"
export function TransactionsOverview() {
  const { hasPermission } = useAdmin()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  const transactions = [
    // ... (same as before)
  ]

  const transactionVolumeData = [
    // ... (same as before)
  ]

  const transactionTypeData = [
    // ... (same as before)
  ]

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const columns = [
    { header: "Transaction ID", accessorKey: "id" },
    { header: "User", accessorKey: "user" },
    {
      header: "Type",
      accessorKey: "type",
      cell: ({ row }) => {
        const type = row.original.type
        let icon = null
        if (type === "deposit") icon = <ArrowDownRight className="h-4 w-4 text-green-500 mr-1" />
        else if (type === "withdrawal") icon = <ArrowUpRight className="h-4 w-4 text-red-500 mr-1" />
        else if (type === "transfer") icon = <CreditCard className="h-4 w-4 text-blue-500 mr-1" />
        return <div className="flex items-center">{icon}<span>{type.charAt(0).toUpperCase() + type.slice(1)}</span></div>
      },
    },
    { header: "Amount", accessorKey: "amount" },
    { header: "Fee", accessorKey: "fee" },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.original.status
        let badgeVariant = "outline"
        if (status === "completed") badgeVariant = "success"
        else if (status === "failed") badgeVariant = "destructive"
        else if (status === "pending") badgeVariant = "warning"
        return <Badge variant={badgeVariant}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
      },
    },
    { header: "Date", accessorKey: "date" },
    {
      header: "Actions",
      cell: ({ row }) => {
        const actions = [{ label: "View Details", onClick: () => console.log("View", row.original.id) }]
        if (hasPermission("transactions", "approve") && row.original.status === "pending") {
          actions.push({ label: "Approve", onClick: () => console.log("Approve", row.original.id) })
          actions.push({ label: "Reject", onClick: () => console.log("Reject", row.original.id) })
        }
        if (hasPermission("transactions", "flag")) {
          actions.push({ label: "Flag for Review", onClick: () => console.log("Flag", row.original.id) })
        }
        return <ActionMenu actions={actions} />
      },
    },
  ]

  const totalTransactions = transactions.length
  const completedTransactions = transactions.filter((t) => t.status === "completed").length
  const pendingTransactions = transactions.filter((t) => t.status === "pending").length
  const failedTransactions = transactions.filter((t) => t.status === "failed").length

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Transactions" value={totalTransactions.toString()} description="All transactions" icon={<CreditCard className="h-4 w-4" />} trend="neutral" />
        <StatCard title="Completed" value={completedTransactions.toString()} description={`${Math.round((completedTransactions / totalTransactions) * 100)}% of total`} icon={<ArrowDownRight className="h-4 w-4" />} trend="up" />
        <StatCard title="Pending" value={pendingTransactions.toString()} description={`${Math.round((pendingTransactions / totalTransactions) * 100)}% of total`} icon={<CreditCard className="h-4 w-4" />} trend="neutral" />
        <StatCard title="Failed" value={failedTransactions.toString()} description={`${Math.round((failedTransactions / totalTransactions) * 100)}% of total`} icon={<ArrowUpRight className="h-4 w-4" />} trend="down" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ChartCard title="Transaction Volume" description="Monthly transaction volume over the last 6 months" data={transactionVolumeData} type="line" className="lg:col-span-2" />
        <ChartCard title="Transaction Types" description="Distribution of transaction types" data={transactionTypeData} type="pie" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
          <CardDescription>View and manage all transactions</CardDescription>
          <div className="flex flex-col gap-4 pt-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by ID, user, or type..." className="pl-8" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1"><Filter className="h-4 w-4" />Filter</Button>
              <Button variant="outline" size="sm" className="gap-1"><Download className="h-4 w-4" />Export</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="deposits">Deposits</TabsTrigger>
              <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
              <TabsTrigger value="transfers">Transfers</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <DataTable columns={columns} data={currentItems} />
              <Pagination currentPage={currentPage} totalItems={filteredTransactions.length} itemsPerPage={itemsPerPage} onPageChange={paginate} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
