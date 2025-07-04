"use client"

import { useState, useEffect } from "react"
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
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { fetchWallets } from "../../redux/fetchWalletsSlice"
import Pagination from "../../components/ui/pagination"
import { setSelectedWallet } from "../../redux/fetchWalletsSlice"
import ViewWalletDetails from "./ActionPages/ViewWalletDetails"
import { setSelectedWalletId } from "../../redux/fetchUserTransactionsSlice"
import FreezeWallet from "./ActionPages/FreezeWallet"
import UnfreezeWallet from "./ActionPages/UnfreezeWallet"


const ITEMS_PER_PAGE = 10;

const itemsPerPage = ITEMS_PER_PAGE;

function WalletsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [detailsModal, setDetailsModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [freezeModal, setFreezeModal] = useState(false);
  const [unfreezeModal, setUnfreezeModal] = useState(false)

  const wallets = useSelector((state) => state.wallets.all);

  
    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
  
      return () => clearTimeout(timer);
    }, []);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);
  
      return () => clearTimeout(timer);
    }, []);

     useEffect(() => {
      dispatch(fetchWallets());
    }, []);

    const filteredData = (wallets).filter((wallet) => {
    const emailMatch = wallet.name?.toLowerCase().includes(searchQuery.toLowerCase());
    return  emailMatch;
  });

const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const totalWallets = wallets?.length || 0;
  console.log (paginatedData)

  const activeWallets = wallets?.filter (wallet => wallet.blocked === false);

  const totalActive = activeWallets.length

  const totalBalance = wallets?.reduce((sum, wallet) => sum + Number(wallet.balance.amount || 0), 0);



  return (
    <div>
      {loading? (
        <TableLoader/>
      ) : (
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
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => <CardLoader key={index} />)
          ) : (
            <>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Wallets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalWallets}</div>
              <p className="text-xs text-muted-foreground">+12.5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold"> ₦{totalBalance.toLocaleString()}</div>
              <p className="text-xs text-green-500">+8.3% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Wallets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalActive}</div>
              <p className="text-xs text-muted-foreground">87% of total wallets</p>
            </CardContent>
          </Card>
            </>
         )}
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
                  <TableHead>BALANCE (NGN)</TableHead>
                  <TableHead>TYPE</TableHead>
                  <TableHead>STATUS</TableHead>
                  <TableHead>ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((wallet) => (
                  <TableRow key={wallet.walletId}>
                    <TableCell className="font-medium">{wallet.walletId}</TableCell>
                    <TableCell>{wallet.name}</TableCell>
                    <TableCell>  {wallet.balance.amount.toLocaleString()}
</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {wallet.type === "Personal" ? (
                          <Wallet className="h-4 w-4 text-blue-500" />
                        ) : (
                          <CreditCard className="h-4 w-4 text-purple-500" />
                        )}
  {wallet.type.charAt(0).toUpperCase() + wallet.type.slice(1).toLowerCase()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          wallet.blocked === false
                            ? "bg-green-100 text-green-800"
                            : wallet.blocked === true
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {wallet.blocked === false ? "Active" : wallet.blocked === true ? "Inactive" : ""}
                      </span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="right-0 mt-2 min-w-[150px] bg-black border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden "             >
                          <DropdownMenuItem className="hover:bg-[#3A859E]" onClick= {() => {
                            dispatch(setSelectedWallet(wallet));
                            setDetailsModal(true)
                          }}>View Details</DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-[#3A859E]" onClick = {() => {
                            dispatch(setSelectedWallet(wallet));
                            dispatch(setSelectedWalletId(wallet.walletId))
                            navigate('/wallets/transactions');
                          }}>Transaction History</DropdownMenuItem>
                          {/* <DropdownMenuItem className="hover:bg-[#3A859E]">Edit Wallet</DropdownMenuItem> */}
                           {wallet.blocked === false && (
                           <DropdownMenuItem className="text-red-600 hover:bg-[#3A859E]" onClick= {() => {
                            dispatch(setSelectedWallet(wallet));
                            setFreezeModal(true)}}>Freeze Wallet</DropdownMenuItem>
                           )}
                          {wallet.blocked === true && (
                            <DropdownMenuItem className="text-green-600 hover:bg-[#3A859E]"
                             onClick= {() => {
                            dispatch(setSelectedWallet(wallet));
                            setUnfreezeModal(true)}}>Unfreeze Wallet</DropdownMenuItem>
                          )}
                          {wallet.status === "Suspended" && (
                            <DropdownMenuItem className="text-green-600 hover:bg-[#3A859E]">Reactivate Wallet</DropdownMenuItem>
                          )}
                          {wallet.status === "Inactive" && (
                            <DropdownMenuItem className="text-blue-600 hover:bg-[#3A859E]">Activate Wallet</DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                <ViewWalletDetails
                isOpen={detailsModal}
                onClose={() => setDetailsModal(false)}
                />
                <FreezeWallet
                isOpen = {freezeModal}
                onClose={() => setFreezeModal(false)}
                />
                 <UnfreezeWallet
                isOpen = {unfreezeModal}
                onClose={() => setUnfreezeModal(false)}
                />
              </TableBody>
            </Table>
           
                        <div className="flex items-center justify-between mt-4">
             <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                itemLabel="Wallets"
                itemsPerPage={itemsPerPage}
                onPageChange={(page) => setCurrentPage(page)}
                totalItems={totalWallets}
              />
              </div>
          </CardContent>
        </Card>
      </main>
    </div>
      )}
      </div>
  )
}

export default WalletsPage
