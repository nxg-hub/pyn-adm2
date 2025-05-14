"use client"

import { useState, useEffect } from "react"
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
import { TableLoader } from "../../components/ui/loader"
import { useSelector, useDispatch } from "react-redux"
import { fetchSuspendedUsers, setSelectedDetails } from "../../redux/suspendedAccounts"
import { useNavigate } from "react-router-dom";
import UnsuspendUserModal from "./ActionPages/UnsuspendModal"


const ITEMS_PER_PAGE = 5;
const itemsPerPage =  ITEMS_PER_PAGE;


function SuspendedAccounts() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [ShowUnsuspendModal, setShowUnsuspendModal] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const suspendedUsers = useSelector(state => state.suspendedUsers.all);


  useEffect(() => {
    dispatch(fetchSuspendedUsers());
  }, [dispatch]);


  const filteredData = suspendedUsers?.filter((su) => {
    const firstNameMatch = su.userDetails?.firstName?.toLowerCase().includes(searchQuery.toLowerCase());
    const emailMatch = su.userDetails?.email?.toLowerCase().includes(searchQuery.toLowerCase());
    return firstNameMatch || emailMatch;
  });
const totalUsers = suspendedUsers.length


const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
const paginatedData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);


  return (
    <div>
        {loading ? (
          <TableLoader/>
        ) : (
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
            
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Accounts</CardTitle>
          </CardHeader>
          <div className="flex gap-10 px-6 py-4 border-b text-gray-600">
  <div className="cursor-pointer group">
    <h1 className="relative text-base font-semibold transition-colors duration-300 text-white  px-2 rounded-md">
     Suspended Users
    </h1>
  </div>
</div>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>NAME</TableHead>
                  <TableHead>EMAIL</TableHead>
                  <TableHead>ACCOUNT TYPE</TableHead>
                  <TableHead>ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((item) => (
                  <TableRow key={item.userDetails.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar>
                            <img
                            src= {item.userDetails.passportUrl || avatar}></img>
                          

                        </Avatar>
                        <div>
                          <div>{item.userDetails.firstName} {item.userDetails.lastName}</div>
                          <div className="text-xs text-muted-foreground">ID: {item.userDetails.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{item.userDetails.email}</TableCell>
                    <TableCell>
                    {item.userDetails.userType
    ?.toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())}
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
                           <DropdownMenuItem className="hover:bg-[#3A859E]"
                                             onClick={() => { dispatch(setSelectedDetails(item))
                                              navigate("/view-details"); }}>View Details</DropdownMenuItem>    
                                               <DropdownMenuItem className="hover:bg-[#3A859E]"
                                             onClick={() => { dispatch(setSelectedDetails(item))
                                              setShowUnsuspendModal(true); }}>Unsuspend Account</DropdownMenuItem>                  
                                                  </DropdownMenuContent> 
                      </DropdownMenu>
                    </TableCell>
                    <UnsuspendUserModal
                    isOpen={ShowUnsuspendModal}
                    onClose={() => setShowUnsuspendModal(false)}
                    
                  />
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex items-center justify-between mt-4">
            
            <Pagination
     currentPage={currentPage}
     totalPages={totalPages}
     onPageChange={(page) => setCurrentPage(page)}
      itemsPerPage={itemsPerPage}
      itemLabel="Suspenede Users"
      totalItems={ totalUsers }
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

export default SuspendedAccounts;