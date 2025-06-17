"use client";

import React, { useEffect, useState } from "react";
import { Wallet, MoreHorizontal } from "lucide-react";
import { Button } from "../../components/ui/button";
import { CardLoader } from "../../components/ui/loader";
import { Card } from "../../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

// Sample data for corporate accounts
const corporateAccounts = [
  {
    id: "CORP-001",
    companyName: "Tech Solutions Ltd",
    accountManager: "John Doe",
    balance: 150000.0,
    status: "Active",
    lastTransaction: "2024-04-23 09:45 AM",
  },
  {
    id: "CORP-002",
    companyName: "Global Finance Inc",
    accountManager: "Jane Smith",
    balance: 95000.0,
    status: "Active",
    lastTransaction: "2024-04-22 11:30 AM",
  },
  {
    id: "CORP-003",
    companyName: "Sunrise Industries",
    accountManager: "Alice Brown",
    balance: 25000.0,
    status: "Inactive",
    lastTransaction: "2024-04-21 03:15 PM",
  },
  {
    id: "CORP-004",
    companyName: "NextGen Enterprises",
    accountManager: "Bob Johnson",
    balance: 70000.0,
    status: "Suspended",
    lastTransaction: "2024-04-20 12:20 PM",
  },
  {
    id: "CORP-005",
    companyName: "GreenTech Corp",
    accountManager: "Charlie Wilson",
    balance: 120000.0,
    status: "Active",
    lastTransaction: "2024-04-23 01:10 PM",
  },
];

export function CorporateAccountsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a network request
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col">
      <header className="border-b">
        <div className="flex h-16 items-center px-4 gap-4">
          <h1 className="text-xl font-semibold">Corporate Accounts Management</h1>
          <span className="text-sm text-muted-foreground">View and manage corporate accounts</span>
        </div>
      </header>

      <main className="p-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <CardLoader key={index} /> // Make sure CardLoader returns skeleton-style cards
            ))
          : corporateAccounts.map((account) => (
              <Card key={account.id} className="p-6 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">{account.companyName}</h2>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="right-0 mt-2 min-w-[150px] bg-black border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden "             >
                      <DropdownMenuItem className="hover:bg-[#3A859E]">View Details</DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-[#3A859E]">Transaction History</DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-[#3A859E]">Employees Account</DropdownMenuItem>
                      {account.status === "Active" && (
                        <DropdownMenuItem className="text-red-600 hover:bg-[#3A859E]">Suspend Account</DropdownMenuItem>
                      )}
                      {account.status === "Suspended" && (
                        <DropdownMenuItem className="text-green-600 hover:bg-[#3A859E]">Reactivate Account</DropdownMenuItem>
                      )}
                      {account.status === "Inactive" && (
                        <DropdownMenuItem className="text-blue-600 hover:bg-[#3A859E]">Activate Account</DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Account Manager: {account.accountManager}</p>
                <p className="text-sm text-muted-foreground mb-2">Balance: ${account.balance.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground mb-2">Last Transaction: {account.lastTransaction}</p>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    account.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : account.status === "Inactive"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  Status: {account.status}
                </span>
              </Card>
            ))}
      </main>
    </div>
  );
}

export default CorporateAccountsPage;
