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

  // Sample data for transactions
  const transactions = [
    {
      id: "TRX123456",
      user: "John Doe",
      type: "deposit",
      amount: "$500.00",
      fee: "$5.00",
      status: "completed",
      date: "2023-06-15",
    },
    {
      id: "TRX123457",
      user: "Jane Smith",
      type: "withdrawal",
      amount: "$200.00",
      fee: "$2.00",
      status: "completed",
      date: "2023-06-14",
    },
    {
      id: "TRX123458",
      user: "Bob Johnson",
      type: "transfer",
      amount: "$300.00",
      fee: "$3.00",
      status: "pending",
      date: "2023-06-13",
    },
    {
      id: "TRX123459",
      user: "Alice Brown",
      type: "deposit",
      amount: "$1,000.00",
      fee: "$10.00",
      status: "completed",
      date: "2023-06-12",
    },
    {
      id: "TRX123460",
      user: "Charlie Wilson",
      type: "withdrawal",
      amount: "$150.00",
      fee: "$1.50",
      status: "failed",
      date: "2023-06-11",
    },
    {
      id: "TRX123461",
      user: "Eve Davis",
      type: "transfer",
      amount: "$450.00",
      fee: "$4.50",
      status: "completed",
      date: "2023-06-10",
    },
    {
      id: "TRX123462",
      user: "Frank Miller",
      type: "deposit",
      amount: "$750.00",
      fee: "$7.50",
      status: "completed",
      date: "2023-06-09",
    },
    {
      id: "TRX123463",
      user: "Grace Taylor",
      type: "withdrawal",
      amount: "$300.00",
      fee: "$3.00",
      status: "pending",
      date: "2023-06-08",
    },
    {
      id: "TRX123464",
      user: "Henry Clark",
      type: "transfer",
      amount: "$250.00",
      fee: "$2.50",
      status: "completed",
      date: "2023-06-07",
    },
    {
      id: "TRX123465",
      user: "Ivy Martin",
      type: "deposit",
      amount: "$500.00",
      fee: "$5.00",
      status: "completed",
      date: "2023-06-06",
    },
    {
      id: "TRX123466",
      user: "Jack Wilson",
      type: "withdrawal",
      amount: "$400.00",
      fee: "$4.00",
      status: "failed",
      date: "2023-06-05",
    },
    {
      id: "TRX123467",
      user: "Karen Brown",
      type: "transfer",
      amount: "$350.00",
      fee: "$3.50",
      status: "completed",
      date: "2023-06-04",
    },
  ]

  // Sample data for charts
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

  // Filter transactions based on search term
  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Paginate transactions
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  // Define columns
  const columns = [
    { header: "Transaction ID", accessorKey: "id" },
    { header: "User", accessorKey: "user" },
    {
      header: "Type",
      accessorKey: "type",
      cell: ({ row }) => {
        const type = row.original.type
        let icon = null

        if (type === "deposit") {
          icon = <ArrowDownRight className="h-4 w-4 text-green-500 mr-1" />
        } else if (type === "withdrawal") {
          icon = <ArrowUpRight className="h-4 w-4 text-red-500 mr-1" />
        } else if (type === "transfer") {
          icon = <CreditCard className="h-4 w-4 text-blue-500 mr-1" />
        }

        return (
          <div className="flex items-center">
            {icon}
            <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
          </div>
        )
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
        const badgeText = status.charAt(0).toUpperCase() + status.slice(1)

        if (status === "completed") {
          badgeVariant = "success"
        } else if (status === "failed") {
          badgeVariant = "destructive"
        } else if (status === "pending") {
          badgeVariant = "warning"
        }

        return <Badge variant={badgeVariant}>{badgeText}</Badge>
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

  // Calculate transaction statistics
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
        <StatCard
          title="Total Transactions"
          value={totalTransactions.toString()}
          description="All transactions"
          icon={<CreditCard className="h-4 w-4" />}
          trend="neutral"
        />
        <StatCard
          title="Completed"
          value={completedTransactions.toString()}
          description={`${Math.round((completedTransactions / totalTransactions) * 100)}% of total`}
          icon={<ArrowDownRight className="h-4 w-4" />}
          trend="up"
        />
        <StatCard
          title="Pending"
          value={pendingTransactions.toString()}
          description={`${Math.round((pendingTransactions / totalTransactions) * 100)}% of total`}
          icon={<CreditCard className="h-4 w-4" />}
          trend="neutral"
        />
        <StatCard
          title="Failed"
          value={failedTransactions.toString()}
          description={`${Math.round((failedTransactions / totalTransactions) * 100)}% of total`}
          icon={<ArrowUpRight className="h-4 w-4" />}
          trend="down"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ChartCard
          title="Transaction Volume"
          description="Monthly transaction volume over the last 6 months"
          data={transactionVolumeData}
          type="line"
          className="lg:col-span-2"
        />
        <ChartCard
          title="Transaction Types"
          description="Distribution of transaction types"
          data={transactionTypeData}
          type="pie"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
          <CardDescription>View and manage all transactions</CardDescription>
          <div className="flex flex-col gap-4 pt-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by ID, user, or type..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                Export
              </Button>
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
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={filteredTransactions.length}
                currentPage={currentPage}
                paginate={paginate}
              />
            </TabsContent>

            <TabsContent value="deposits" className="space-y-4">
              <DataTable columns={columns} data={currentItems.filter((item) => item.type === "deposit")} />
            </TabsContent>

            <TabsContent value="withdrawals" className="space-y-4">
              <DataTable columns={columns} data={currentItems.filter((item) => item.type === "withdrawal")} />
            </TabsContent>

            <TabsContent value="transfers" className="space-y-4">
              <DataTable columns={columns} data={currentItems.filter((item) => item.type === "transfer")} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
