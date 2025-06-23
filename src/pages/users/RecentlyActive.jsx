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
import { useNavigate } from "react-router-dom"
import InitiatePasswordReset from "./ActionPages/ChangePassword"
import FlagUser from "./ActionPages/FlagUser"
import apiService from "../../services/apiService"


const ITEMS_PER_PAGE = 5;
const itemsPerPage = ITEMS_PER_PAGE;


function RecentlyActive() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [showFlagModal, setShowFlagModal] = useState(false);
  const [showInitiatePasswordModal, setInitiatePasswordModal] = useState(false);


   const GetRecentlyActive= async () => {
    setLoading(true);
    const queryParams = new URLSearchParams({
      page: 1,
      size: 10,
    }).toString();

 try {
      const content = await apiService.getRecentlyActiveUsers(queryParams);
       
      setUsers(content || []);
      
    } catch (error) {
      const message = data.message || 'Unexpected error';
      setErrorMessage(`Failed to load users: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = (users)?.filter((user) => {
    const firstNameMatch = user.firstName?.toLowerCase().includes(searchQuery.toLowerCase())
    const emailMatch = user.email?.toLowerCase().includes(searchQuery.toLowerCase())
    return firstNameMatch || emailMatch
  })
  const totalUsers = users.length


  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    (GetRecentlyActive());
  }, []);


  const handleViewDetails = (user) => {
    setSelectedUser(user);
    navigate("/user-profile", { state: { selectedUser: user } });
  }
  const handleResetPassword = (user) => {
    setSelectedUser(user);
    setInitiatePasswordModal(true)
  }
  const handleFlagUser = (user) => {
    setSelectedUser(user);
    setShowFlagModal(true)
  }
  const handleViewTransactions = (user, walletId) => {
    setSelectedUser({ user, walletId }); // Set both user and walletId in the selectedUser state as an object
    navigate("/transactions", { state: { selectedUser: user, walletId: walletId } });
  };


  return (
    <div>
      {loading ? (
        <TableLoader />
      ) : (
        <div className="flex flex-col">
          <header className="border-b">
            <div className="flex h-16 items-center px-4 gap-4">
              <h1 className="text-xl font-semibold">Recently Active Accounts</h1>
              <span className="text-sm text-muted-foreground">View and manage recently active accounts</span>
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
                    Recently Active Users
                  </h1>
                </div>
              </div>

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
                    {paginatedData.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <img
                                src={user.passportUrl || avatar}
                                alt="image"
                                className="w-10 h-10 rounded-full object-cover"
                              />

                            </Avatar>
                            <div>
                              <div>{user.firstName} {user.lastName}</div>
                              <div className="text-xs text-muted-foreground">ID: {user.id}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>

                          {user.accountNumber}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className=" right-0 mt-2 min-w-[150px] bg-black border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden " >
                              <DropdownMenuItem className="hover:bg-[#3A859E]"
                                onClick={() => handleViewDetails(user)

                                }>View Profile</DropdownMenuItem>
                              {/* <DropdownMenuItem className="hover:bg-[#3A859E]"onClick={() => {
                                                      dispatch(setSelectedUser(user));
                                                      navigate("/edit-user"); }}>Edit User</DropdownMenuItem> */}
                              <DropdownMenuItem className="hover:bg-[#3A859E]"
                                onClick={() =>
                                  handleViewTransactions(user, user.walletId)
                                }>View Transactions</DropdownMenuItem>
                              <DropdownMenuItem className="hover:bg-[#3A859E]" onClick={() => handleResetPassword(user)


                              }>initiate Reset Password</DropdownMenuItem>
                              {user.enabled === true && (
                                <DropdownMenuItem className="hover:bg-red-500" onClick={() => handleFlagUser(user)}>Flag User</DropdownMenuItem>
                              )}
                              {user.enabled === false && (
                                <DropdownMenuItem className="hover:bg-green-400">
                                  Reactivate Account
                                </DropdownMenuItem>
                              )}
                              {user.status === "Pending" && (
                                <DropdownMenuItem className="text-blue-600">
                                  Approve Account
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <FlagUser
                  isOpen={showFlagModal}
                  onClose={() => setShowFlagModal(false)}
                  selectedUser={selectedUser}
                />
                <InitiatePasswordReset
                  isOpen={showInitiatePasswordModal}
                  onClose={() => setInitiatePasswordModal(false)}
                  selectedUser={selectedUser}
                />
                <div className="flex items-center justify-between mt-4">

                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                    itemsPerPage={itemsPerPage}
                    itemLabel="Recently Active Users"
                    totalItems={totalUsers}
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

export default RecentlyActive;