"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Download, MoreHorizontal, CreditCard } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { CardLoader } from "../../components/ui/loader";
import { Input } from "../../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { TableLoader } from "../../components/ui/loader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { fetchVirtualCards, setSelectedCard } from "../../redux/fetchVirtualCardsSlice";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../components/ui/pagination";
import ViewCardDetails from "./ActionPages/virtualCardDetails";
const ITEMS_PER_PAGE = 10;

const itemsPerPage = ITEMS_PER_PAGE;

function VirtualCardsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const [detailsModal, setDetailsModal] = useState(false)
  const cards = useSelector((state) => state.virtualCards.all);

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
    dispatch(fetchVirtualCards());
  }, [])

  const filteredData = (cards).filter((card) => {
    const name = card.name_on_card?.toLowerCase().includes(searchQuery.toLowerCase());
    return  name;
  });

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const totalCards = cards?.length

  const activeCards = cards?.filter (card => card.active === true);

  const totalActive = activeCards.length
  const totalBalance = cards?.reduce((sum, card) => sum + Number(card.amount || 0), 0);

    console.log (paginatedData)

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
                  <CardTitle className="text-sm font-medium">Total Cards</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalCards}</div>
                  <p className="text-xs text-muted-foreground">+8.4% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold"> ₦{totalBalance.toLocaleString()}</div>
                  <p className="text-xs text-green-500">+7.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Active Cards</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalActive}</div>
                  <p className="text-xs text-muted-foreground">90% of total cards</p>
                </CardContent>
              </Card>
            </>
          )}
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
                  <TableHead>CARD TYPE</TableHead>
                  <TableHead>CARDHOLDER</TableHead>
                  <TableHead>BALANCE (NGN)</TableHead>
                  <TableHead>CURRENCY</TableHead>
                  <TableHead>EXPIRY DATE</TableHead>
                  <TableHead>STATUS</TableHead>
                  <TableHead>ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-6">
                      <TableLoader />
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedData.map((card) => (
                    <TableRow key={card.id}>
                      <TableCell className="font-medium">{card.id}</TableCell>
                      <TableCell>  {card.card_type.charAt(0).toUpperCase() + card.card_type.slice(1).toLowerCase()}
</TableCell>
                      <TableCell>{card.name_on_card}</TableCell>
                      <TableCell>{card.amount}</TableCell>
                      <TableCell>{card.currency}</TableCell>
                      <TableCell>{card.expiration}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${card.active === true ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                        >
                          {card.active === true ? "Active" : "Inactive"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="right-0 mt-2 min-w-[150px] bg-black border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden "             >
                            <DropdownMenuItem className="hover:bg-[#3A859E]" onClick= {() => {
                                                        dispatch(setSelectedCard(card));
                                                        setDetailsModal(true)}}>View Details</DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-[#3A859E]">Transaction History</DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-[#3A859E]">Edit Card</DropdownMenuItem>
                            {card.status === "Active" && (
                              <DropdownMenuItem className="text-red-600 hover:bg-[#3A859E]">Freeze Card</DropdownMenuItem>
                            )}
                            {card.status === "Frozen" && (
                              <DropdownMenuItem className="text-green-600 hover:bg-[#3A859E]">Activate Card</DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
                <ViewCardDetails
                isOpen= {detailsModal}
                onClose={() => setDetailsModal(false)}
                
                />
              </TableBody>

            </Table>
            
            
                        <div className="flex items-center justify-between mt-4">
             <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                itemLabel="Virtua Cards"
                itemsPerPage={itemsPerPage}
                onPageChange={(page) => setCurrentPage(page)}
                totalItems={totalCards}
              />
              </div>
          </CardContent>
        </Card>
      </main>
    </div >
  );
}

export default VirtualCardsPage;
