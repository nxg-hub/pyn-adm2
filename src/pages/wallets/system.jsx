"use client";
import React, { useState, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { CardLoader } from "../../components/ui/loader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { TableLoader } from "../../components/ui/loader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

// Sample data for system balances
const systemBalances = [
  {
    id: "BAL-001",
    description: "Main Operational Balance",
    balance: 5000000.0,
    currency: "USD",
    status: "Active",
    lastUpdated: "2024-04-23 12:00 PM",
  },
  {
    id: "BAL-002",
    description: "Reserve Funds",
    balance: 1500000.0,
    currency: "USD",
    status: "Active",
    lastUpdated: "2024-04-22 10:30 AM",
  },
  {
    id: "BAL-003",
    description: "Emergency Funds",
    balance: 250000.0,
    currency: "USD",
    status: "Inactive",
    lastUpdated: "2024-04-21 09:45 AM",
  },
  {
    id: "BAL-004",
    description: "Future Investments",
    balance: 1000000.0,
    currency: "USD",
    status: "Suspended",
    lastUpdated: "2024-04-20 02:15 PM",
  },
  {
    id: "BAL-005",
    description: "External Account Balance",
    balance: 750000.0,
    currency: "EUR",
    status: "Active",
    lastUpdated: "2024-04-23 03:00 PM",
  },
];

export function SystemBalancePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a network request
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate a network request
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);


  return (
    <div className="flex flex-col">
      <header className="border-b">
        <div className="flex h-16 items-center px-4 gap-4">
          <h1 className="text-xl font-semibold">System Balance Management</h1>
          <span className="text-sm text-muted-foreground">View and monitor all system balances</span>
        </div>
      </header>

      <main className="flex-1 space-y-8 p-4">
        {/* Card Layout */}
        <section>
          <h2 className="text-lg font-semibold mb-4">System Balances Overview</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                <CardLoader key={index} />
              ))
              : systemBalances.map((balance) => (
                <Card key={balance.id} className="p-6 shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{balance.description}</h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Balance</DropdownMenuItem>
                        {balance.status === "Active" && (
                          <DropdownMenuItem className="text-red-600">Suspend Balance</DropdownMenuItem>
                        )}
                        {balance.status === "Suspended" && (
                          <DropdownMenuItem className="text-green-600">Reactivate Balance</DropdownMenuItem>
                        )}
                        {balance.status === "Inactive" && (
                          <DropdownMenuItem className="text-blue-600">Activate Balance</DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Currency: {balance.currency}</p>
                  <p className="text-sm text-muted-foreground mb-2">
                    Balance: {balance.currency === "USD" ? "$" : "€"}
                    {balance.balance.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">Last Updated: {balance.lastUpdated}</p>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${balance.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : balance.status === "Inactive"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                  >
                    Status: {balance.status}
                  </span>
                </Card>
              ))}
          </div>
        </section>

        {/* Table Section */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Detailed System Balance Records</h2>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>BALANCE ID</TableHead>
                  <TableHead>DESCRIPTION</TableHead>
                  <TableHead>BALANCE</TableHead>
                  <TableHead>CURRENCY</TableHead>
                  <TableHead>STATUS</TableHead>
                  <TableHead>LAST UPDATED</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      <TableLoader />
                    </TableCell>
                  </TableRow>
                ) : (
                  systemBalances.map((balance) => (
                    <TableRow key={balance.id}>
                      <TableCell>{balance.id}</TableCell>
                      <TableCell>{balance.description}</TableCell>
                      <TableCell>
                        {balance.currency === "USD" ? "$" : "€"}
                        {balance.balance.toLocaleString()}
                      </TableCell>
                      <TableCell>{balance.currency}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${balance.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : balance.status === "Inactive"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                        >
                          {balance.status}
                        </span>
                      </TableCell>
                      <TableCell>{balance.lastUpdated}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>

            </Table>
          </Card>
        </section>
      </main>
    </div>
  );
}

export default SystemBalancePage;
