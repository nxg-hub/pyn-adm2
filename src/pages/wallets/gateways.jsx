"use client";

import React from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
// Import the TableLoader from your loader file
import { TableLoader } from "../../components/ui/loader";

// Sample data for payment gateways
const paymentGateways = [
  {
    id: "PG-001",
    name: "PayPal",
    type: "International",
    status: "Active",
    transactions: 1342,
    lastTransaction: "2024-04-23 09:45 AM",
  },
  {
    id: "PG-002",
    name: "Stripe",
    type: "International",
    status: "Active",
    transactions: 2021,
    lastTransaction: "2024-04-22 11:30 AM",
  },
  {
    id: "PG-003",
    name: "Flutterwave",
    type: "Local",
    status: "Inactive",
    transactions: 420,
    lastTransaction: "2024-04-21 04:15 PM",
  },
  {
    id: "PG-004",
    name: "Paystack",
    type: "Local",
    status: "Suspended",
    transactions: 890,
    lastTransaction: "2024-04-20 03:20 PM",
  },
  {
    id: "PG-005",
    name: "Square",
    type: "International",
    status: "Active",
    transactions: 1520,
    lastTransaction: "2024-04-23 01:10 PM",
  },
];

export function PaymentGatewaysPage() {
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
          <h1 className="text-xl font-semibold">Payment Gateways Management</h1>
          <span className="text-sm text-muted-foreground">
            View and manage payment gateways
          </span>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Payment Gateways</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>GATEWAY ID</TableHead>
                  <TableHead>NAME</TableHead>
                  <TableHead>TYPE</TableHead>
                  <TableHead>STATUS</TableHead>
                  <TableHead>TRANSACTIONS</TableHead>
                  <TableHead>LAST TRANSACTION</TableHead>
                  <TableHead>ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-6">
                      <TableLoader />
                    </TableCell>
                  </TableRow>
                ) : paymentGateways.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6">
                      No payment gateways available.
                    </TableCell>
                  </TableRow>
                ) : (
                  paymentGateways.map((gateway) => (
                    <TableRow key={gateway.id}>
                      <TableCell>{gateway.id}</TableCell>
                      <TableCell>{gateway.name}</TableCell>
                      <TableCell>{gateway.type}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            gateway.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : gateway.status === "Inactive"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {gateway.status}
                        </span>
                      </TableCell>
                      <TableCell>{gateway.transactions}</TableCell>
                      <TableCell>{gateway.lastTransaction}</TableCell>
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
                            {gateway.status === "Active" && (
                              <DropdownMenuItem className="text-red-600">
                                Suspend Gateway
                              </DropdownMenuItem>
                            )}
                            {gateway.status === "Suspended" && (
                              <DropdownMenuItem className="text-green-600">
                                Reactivate Gateway
                              </DropdownMenuItem>
                            )}
                            {gateway.status === "Inactive" && (
                              <DropdownMenuItem className="text-blue-600">
                                Activate Gateway
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default PaymentGatewaysPage;
