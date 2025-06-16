"use client"

import { useState } from "react"
import { Search, Filter, Download, MoreHorizontal, CreditCard, Wallet } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { CardLoader } from "../../components/ui/loader";
import { Input } from "../../components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { TableLoader } from "../../components/ui/loader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"

const wallets = [
  {
    id: "WAL-001",
    user: "John Doe",
    balance: 2500.0,
    type: "Personal",
    status: "Active",
    lastTransaction: "2024-04-23 10:45 AM",
  },
  {
    id: "WAL-002",
    user: "Sarah Miller",
    balance: 1200.0,
    type: "Business",
    status: "Active",
    lastTransaction: "2024-04-23 11:30 AM",
  },
  {
    id: "WAL-003",
    user: "Robert Johnson",
    balance: 0.0,
    type: "Personal",
    status: "Inactive",
    lastTransaction: "2024-04-22 03:15 PM",
  },
  {
    id: "WAL-004",
    user: "Emily Davis",
    balance: 5000.0,
    type: "Business",
    status: "Active",
    lastTransaction: "2024-04-22 09:20 AM",
  },
  {
    id: "WAL-005",
    user: "Michael Wilson",
    balance: 1800.0,
    type: "Personal",
    status: "Suspended",
    lastTransaction: "2024-04-21 02:10 PM",
  },
]

function WalletsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="flex flex-col">
      <header className="border-b">
        <div className="flex h-16 items-center px-4 gap-4">
          <h1 className="text-xl font-semibold">Wallets Management</h1>
          <span className="text-sm text-muted-foreground">View and manage user wallets</span>
          <div className="ml-auto flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search wallets..."
                className="w-[250px] pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                <DropdownMenuItem>Export as PDF</DropdownMenuItem>
                <DropdownMenuItem>Export as Excel</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Wallets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24,521</div>
              <p className="text-xs text-muted-foreground">+12.5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$4,587,345.75</div>
              <p className="text-xs text-green-500">+8.3% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Wallets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">21,345</div>
              <p className="text-xs text-muted-foreground">87% of total wallets</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>User Wallets</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>WALLET ID</TableHead>
                  <TableHead>USER</TableHead>
                  <TableHead>BALANCE</TableHead>
                  <TableHead>TYPE</TableHead>
                  <TableHead>STATUS</TableHead>
                  <TableHead>ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {wallets.map((wallet) => (
                  <TableRow key={wallet.id}>
                    <TableCell className="font-medium">{wallet.id}</TableCell>
                    <TableCell>{wallet.user}</TableCell>
                    <TableCell>${wallet.balance.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {wallet.type === "Personal" ? (
                          <Wallet className="h-4 w-4 text-blue-500" />
                        ) : (
                          <CreditCard className="h-4 w-4 text-purple-500" />
                        )}
                        {wallet.type}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          wallet.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : wallet.status === "Inactive"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {wallet.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Transaction History</DropdownMenuItem>
                          <DropdownMenuItem>Edit Wallet</DropdownMenuItem>
                          {wallet.status === "Active" && (
                            <DropdownMenuItem className="text-red-600">Suspend Wallet</DropdownMenuItem>
                          )}
                          {wallet.status === "Suspended" && (
                            <DropdownMenuItem className="text-green-600">Reactivate Wallet</DropdownMenuItem>
                          )}
                          {wallet.status === "Inactive" && (
                            <DropdownMenuItem className="text-blue-600">Activate Wallet</DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">Showing 1-5 of 24,521 wallets</div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default WalletsPage
