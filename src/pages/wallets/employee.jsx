"use client";

import React from "react";
// import { MoreHorizontal, Wallet } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

// Sample data for Employees
const employees = [
  {
    id: "WDRAW-001",
    user: "John Doe",
    amount: 500.0,
    status: "Completed",
    date: "2024-04-23 10:45 AM",
  },
  {
    id: "WDRAW-002",
    user: "Jane Smith",
    amount: 250.0,
    status: "Pending",
    date: "2024-04-22 02:20 PM",
  },
  {
    id: "WDRAW-003",
    user: "Alice Brown",
    amount: 1000.0,
    status: "Failed",
    date: "2024-04-21 01:15 PM",
  },
];

export function EmployeesPage() {
  return (
    <div className="flex flex-col">
      <header className="border-b">
        <div className="flex h-16 items-center px-4 gap-4">
          <h1 className="text-xl font-semibold">Funding employees</h1>
          <span className="text-sm text-muted-foreground">Manage user withdrawal requests</span>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employees ID</TableHead>
                  <TableHead>AMOUNT</TableHead>
                  <TableHead>STATUS</TableHead>
                  <TableHead>DATE</TableHead>
                  <TableHead>ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employees) => (
                  <TableRow key={employees.id}>
                    <TableCell>{employees.id}</TableCell>
                    <TableCell>{employees.user}</TableCell>
                    <TableCell>${employees.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            employees.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : employees.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {employees.status}
                      </span>
                    </TableCell>
                    <TableCell>{employees.date}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Transaction History</DropdownMenuItem>
                          {/* <DropdownMenuItem>Withdrawal</DropdownMenuItem> */}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default EmployeesPage ;
