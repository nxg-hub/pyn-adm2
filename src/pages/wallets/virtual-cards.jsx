"use client";

import { useState } from "react";
import { Search, Filter, Download, MoreHorizontal, CreditCard } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { TableLoader } from "../../components/ui/loader"; 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

const cards = [
  {
    id: "CARD-001",
    cardNumber: "1234 5678 9876 5432",
    cardholder: "John Doe",
    balance: 1234.56,
    currency: "USD",
    status: "Active",
    expiryDate: "12/25",
  },
  {
    id: "CARD-002",
    cardNumber: "9876 5432 1234 5678",
    cardholder: "Jane Smith",
    balance: 567.89,
    currency: "EUR",
    status: "Active",
    expiryDate: "11/24",
  },
  {
    id: "CARD-003",
    cardNumber: "5678 1234 5432 9876",
    cardholder: "Bob Johnson",
    balance: 0.05,
    currency: "BTC",
    status: "Frozen",
    expiryDate: "01/26",
  },
  {
    id: "CARD-004",
    cardNumber: "4321 8765 2345 6789",
    cardholder: "Alice Brown",
    balance: 2345.67,
    currency: "GBP",
    status: "Active",
    expiryDate: "05/23",
  },
  {
    id: "CARD-005",
    cardNumber: "8765 4321 3456 7890",
    cardholder: "Charlie Wilson",
    balance: 1.5,
    currency: "ETH",
    status: "Frozen",
    expiryDate: "08/24",
  },
];

function VirtualCardsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col">
      <header className="border-b">
        <div className="flex h-16 items-center px-4 gap-4">
          <h1 className="text-xl font-semibold">Virtual Cards</h1>
          <span className="text-sm text-muted-foreground">View and manage user virtual cards</span>
          <div className="ml-auto flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search cards..."
                className="w-[250px] pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Cards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5,432</div>
              <p className="text-xs text-muted-foreground">+8.4% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,234,567.89</div>
              <p className="text-xs text-green-500">+7.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Cards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4,890</div>
              <p className="text-xs text-muted-foreground">90% of total cards</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>User Virtual Cards</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>CARD ID</TableHead>
                  <TableHead>CARD NUMBER</TableHead>
                  <TableHead>CARDHOLDER</TableHead>
                  <TableHead>BALANCE</TableHead>
                  <TableHead>CURRENCY</TableHead>
                  <TableHead>EXPIRY DATE</TableHead>
                  <TableHead>STATUS</TableHead>
                  <TableHead>ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cards.map((card) => (
                  <TableRow key={card.id}>
                    <TableCell className="font-medium">{card.id}</TableCell>
                    <TableCell>{card.cardNumber}</TableCell>
                    <TableCell>{card.cardholder}</TableCell>
                    <TableCell>{card.balance}</TableCell>
                    <TableCell>{card.currency}</TableCell>
                    <TableCell>{card.expiryDate}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          card.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {card.status}
                      </span>
                    </TableCell>
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
                          <DropdownMenuItem>Edit Card</DropdownMenuItem>
                          {card.status === "Active" && (
                            <DropdownMenuItem className="text-red-600">Freeze Card</DropdownMenuItem>
                          )}
                          {card.status === "Frozen" && (
                            <DropdownMenuItem className="text-green-600">Activate Card</DropdownMenuItem>
                          )}
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

export default VirtualCardsPage;
