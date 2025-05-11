"use client"

import { useState, useEffect } from "react"
import { Search, MoreHorizontal } from "lucide-react"
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
import { Avatar } from "../../components/ui/avatar"
import Pagination from "../../components/ui/pagination"
import avatar from "../../assets/avatar.png"
import { TableLoader } from "../../components/ui/loader"
import { useSelector, useDispatch } from "react-redux"
import { fetchUnsuspendedUsers, setSelectedDetails} from "../../redux/unsuspendedAccounts"
import { useNavigate } from "react-router-dom"
import SuspendUserModal from "./ActionPages/SuspendAccount"

const ITEMS_PER_PAGE = 5;

function UnsuspendedAccounts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { all: unsuspendedUsers = [], loading = false } = useSelector(
    (state) => state.unsuspendedAccounts || {}
  );  

  
  useEffect(() => {
    dispatch(fetchUnsuspendedUsers());
    console.log("Loaded users:", unsuspendedUsers);
  }, [dispatch]);

  // const filteredData = Array.isArray(unsuspendedUsers)
  // ? unsuspendedUsers.filter((user) => {
  //     const firstNameMatch = user.userDetails?.firstName?.toLowerCase().includes(searchQuery.toLowerCase());
  //     const emailMatch = user.userDetails?.email?.toLowerCase().includes(searchQuery.toLowerCase());
  //     return firstNameMatch || emailMatch;
  //   })
  // : [];

  const filteredData = unsuspendedUsers?.filter((su) => {
    const firstNameMatch = su.userDetails?.firstName?.toLowerCase().includes(searchQuery.toLowerCase());
    const emailMatch = su.userDetails?.email?.toLowerCase().includes(searchQuery.toLowerCase());
    return firstNameMatch || emailMatch;
  }); 



  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div>
      {loading ? (
        <TableLoader />
      ) : (
        <div className="flex flex-col">
          <header className="border-b">
            <div className="flex h-16 items-center px-4 gap-4">
              <h1 className="text-xl font-semibold">Reactivated Accounts</h1>
              <span className="text-sm text-muted-foreground">View and manage reactivated accounts</span>
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
                  <h1 className="relative text-base font-semibold transition-colors duration-300 text-white px-2 rounded-md">
                    Reactivated Users
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
                              <img src={avatar} alt="User avatar" />
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
                            <DropdownMenuContent className="absolute right-0 mt-2 min-w-[150px] bg-black border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                              <DropdownMenuItem
                                className="hover:bg-[#3A859E]"  
                                onClick={() => {
                                  dispatch(setSelectedDetails(item));
                                  navigate("/view-details");
                                }}
                              >
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="hover:bg-[#3A859E]"
                                onClick={() => {
                                  dispatch(setSelectedDetails(item));
                                  setSelectedUser(item);
                                  setShowSuspendModal(true);
                                }}
                              >
                                Suspend Account
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>

                          <SuspendUserModal
                            isOpen={showSuspendModal}
                            onClose={() => setShowSuspendModal(false)}
                          />
                        </TableCell>
                        <SuspendUserModal
                          isOpen={showSuspendModal}
                          onClose={() => setShowSuspendModal(false)}
                          user={selectedUser}
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
                    itemsPerPage={ITEMS_PER_PAGE}
                    itemLabel="Reactivated Users"
                    totalItems={unsuspendedUsers.length}
                  />
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      )}
    </div>
  );
}

export default UnsuspendedAccounts;
