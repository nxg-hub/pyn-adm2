"use client"

import { useState } from "react"
import { Filter, MoreHorizontal, Search, UserPlus } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Avatar, AvatarFallback } from "../../components/ui/avatar"
import Pagination from "../../components/ui/pagination"
import avatar from "../../assets/avatar.png"

const accounts = [
  {
    id: "#12345",
    name: "John Doe",
    email: "john@example.com",
    account_no: "1234567891",
    avatar: "JD",
  },
  {
    id: "#12346",
    name: "Sarah Miller",
    email: "sarah@example.com",
    account_no: "1234567891",
    avatar: "SM",
  },
  {
    id: "#12347",
    name: "Robert Johnson",
    email: "robert@example.com",
    account_no: "1234567891",
    avatar: "RJ",
  },
  {
    id: "#12348",
    name: "Maria Garcia",
    email: "maria@example.com",
    account_no: "1234567891",
    avatar: "MG",
  },
  {
    id: "#12349",
    name: "David Wilson",
    email: "david@example.com",
    account_no: "1234567891",
    avatar: "DW",
  },
  {
    id: "#12349",
    name: "David Wilson",
    email: "david@example.com",
    account_no: "1234567891",
    avatar: "DW",
  },
  {
    id: "#12349",
    name: "David Wilson",
    email: "david@example.com",
    account_no: "1234567891",
    avatar: "DW",
  },
  {
    id: "#12349",
    name: "David Wilson",
    email: "david@example.com",
    account_no: "1234567891",
    avatar: "DW",
  }, {
    id: "#12349",
    name: "David Wilson",
    email: "david@example.com",
    account_no: "1234567891",
    avatar: "DW",
  }, {
    id: "#12349",
    name: "David Wilson",
    email: "david@example.com",
    account_no: "1234567891",
    avatar: "DW",
  }, {
    id: "#12349",
    name: "David Wilson",
    email: "david@example.com",
    account_no: "1234567891",
    avatar: "DW",
  }, {
    id: "#12349",
    name: "David Wilson",
    email: "david@example.com",
    account_no: "1234567891",
    avatar: "DW",
  },
]
const ITEMS_PER_PAGE = 5;
const itemsPerPage =  ITEMS_PER_PAGE;

const totalAccounts = accounts.length

function SuspendedAccounts() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(accounts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = accounts.slice(startIndex, startIndex + ITEMS_PER_PAGE);


  return (
    <div className="flex flex-col">
      <header className="border-b">
        <div className="flex h-16 items-center px-4 gap-4">
          <h1 className="text-xl font-semibold">Suspended Accounts</h1>
          <span className="text-sm text-muted-foreground">View and manage suspended accounts</span>
          <div className="ml-auto flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search accounts..."
                className="w-[250px] pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            {/* <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add New User
            </Button> */}
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>NAME</TableHead>
                  <TableHead>EMAIL</TableHead>
                  <TableHead>ACCOUNT_NO</TableHead>
                  <TableHead>ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar>
                            <img
                            src= { avatar}></img>
                          

                        </Avatar>
                        <div>
                          <div>{account.name}</div>
                          <div className="text-xs text-muted-foreground">ID: {account.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{account.email}</TableCell>
                    <TableCell>
                     
                        {account.account_no}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent   className="absolute right-0 mt-2 min-w-[150px] bg-black border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden " >            
                          <DropdownMenuItem className="hover:bg-[#3A859E]">View Profile</DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-green-400">Reactivate Account</DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-[#3A859E]">Reset Password</DropdownMenuItem>

                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex items-center justify-between mt-4">
            
            <Pagination
     currentPage={currentPage}
     totalPages={totalPages}
     onPageChange={(page) => setCurrentPage(page)}
     totalItems={totalAccounts}
     itemsPerPage={itemsPerPage}
     itemLabel="accounts"
   />
         </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default SuspendedAccounts;