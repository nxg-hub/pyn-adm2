import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState} from "react";
import { Filter, MoreHorizontal, Search, UserPlus } from "lucide-react"
import { Input } from "../../../components/ui/input";
import { fetchTransactions , clearSelectedWalletId} from "../../../redux/fetchUserTransactionsSlice";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "../../../components/ui/dropdown-menu"
  import { Button } from "../../../components/ui/button";
import Pagination from "../../../components/ui/pagination";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { TableLoader } from "../../../components/ui/loader";
import { useLocation } from "react-router-dom";


  const ITEMS_PER_PAGE = 10;

  const itemsPerPage =  ITEMS_PER_PAGE;
  
  
  function TransactionHistory() {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [activeSection, setActiveSection] = useState("Credit");
    const { selectedWallet } = useSelector((state) => state.wallets);

    const walletSectionId = selectedWallet?.walletId

    const { walletId: reduxWalletId, transactions, loading, error } = useSelector((state) => state.transactions);
    const user = useSelector((state) => state.users.selectedUser);
        const navigate = useNavigate();
    const location = useLocation();
    
    // Extract selectedUser and selectedWalletId from location state
    const selectedUser = location.state?.selectedUser;
    const selectedWalletId = location.state?.walletId;

  
    // Determine the walletId to use
    const walletIdToUse =  selectedWalletId || reduxWalletId
  
    const handleBack = () => {
      navigate(-1);
    };
  
    useEffect(() => {
      // Only dispatch the action if we have a valid walletId
      if (walletIdToUse) {
        dispatch(fetchTransactions(walletIdToUse));
      }
    }, [walletIdToUse, dispatch]);
  

    
const Credit = transactions?.filter((t) => t.type === "CREDIT") ;
const Debit = transactions?.filter((t) => t.type === "DEBIT") ;

const filteredData = (activeSection === "Credit" ? Credit : Debit)?.filter((transaction) => {
    const type = transaction.type?.toLowerCase().includes(searchQuery.toLowerCase())
    return type
  })
  
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);


const totalTransactions = transactions.length
  return (
    <div>
    {loading ? (
      <TableLoader/>
    ) : (
    <div className="flex flex-col">
         <button
        onClick={handleBack}
        className="mb-9 text-white text-xl font-medium flex items-center gap-5">
        <ChevronLeft className="h-8 w-8" />
        Back
      </button>
      <header className="border-b">
        <div className="flex h-16 items-center px-4 gap-4">
          <h1 className="text-xl font-semibold">Transactions</h1>
          <span className="text-sm text-muted-foreground">View and manage transactions</span>
          <div className="ml-auto flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-[250px] pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
          </div>
        </div>
      </header>
 {/* Tabs */}

      <main className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Transactions for { selectedUser?.firstName || user?.firstName} {selectedUser?.lastName || user?.lastName} </CardTitle>
          </CardHeader>
          <div className="flex gap-10 px-6 py-4 border-b text-gray-700">
        {["Credit", "Debit"].map((section) => (
          <div key={section} className="cursor-pointer group" onClick={() => setActiveSection(section)}>
            <h1
              className={`relative text-lg transition-colors duration-300 ${
                activeSection === section ? "text-white font-bold" : "text-white"
              }`}
            >
              {section.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
              
            </h1>
          </div>
        ))}
      </div>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>DATE</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>DESCRIPTION</TableHead>
                  <TableHead>AMOUNT</TableHead>
                  <TableHead>STATUS</TableHead>
                  <TableHead>ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
              {paginatedData.map((transaction) => (
                  <TableRow key={transaction.id}>
                    
                    <TableCell>{transaction.createdAt}</TableCell>
                    <TableCell>{transaction.id}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          transaction.status === "COMPLETED"
                            ? "bg-green-100 text-green-800"
                            : transaction.status === "FAILED"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
    {transaction.status === "COMPLETED" ? "Completed" : transaction.status === "FAILED" ? "Failed" : "Processing"} 
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

                        <DropdownMenuContent   className="absolute right-0 mt-2 min-w-[150px] bg-black border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden "             
                        >{transaction.status === "PROCESSING" && (
                          <DropdownMenuItem className="hover:bg-[#3A859E]"
                           onClick={() => {
                            // dispatch(setSelectedUser(user));
                            navigate("/user-profile"); }}>Approve</DropdownMenuItem>
                           )}
                          <DropdownMenuItem className="hover:bg-red-400"onClick={() => {
                            // dispatch(setSelectedUser(user));
                            navigate("/edit-user"); }}>Flag</DropdownMenuItem>
                             <DropdownMenuItem className="hover:bg-[#3A859E]"onClick={() => {
    dispatch(setSelectedWalletId(user.walletId));
    // dispatch(setSelectedUser(user));

    navigate("/transactions"); }}>Reverse</DropdownMenuItem>
                          
                          
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
        itemLabel="Transactions"
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => setCurrentPage(page)}
        totalItems={
          activeSection === "Credit"
            ? Credit.length
            : activeSection === "Debit"
            ? Debit.length  
            : totalTransactions
        }

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



export default TransactionHistory;
