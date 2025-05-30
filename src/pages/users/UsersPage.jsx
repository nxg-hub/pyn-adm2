"use client";

import { useState, useEffect } from "react";
import { Filter, MoreHorizontal, Search, UserPlus } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Avatar, AvatarFallback } from "../../components/ui/avatar"
import avatar from "../../assets/avatar.png"
import Pagination from "../../components/ui/pagination"
import { fetchUsers } from "../../redux/UsersSlice"
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from "../../redux/UsersSlice"
import { setSelectedWalletId } from "../../redux/fetchUserTransactionsSlice"
import { useNavigate } from "react-router-dom";
import FlagUser from "./ActionPages/FlagUser";
import UnflagUserModal from "./ActionPages/UnflagUser";
import InitiatePasswordReset from "./ActionPages/ChangePassword"
import PasswordManagerResetModal from "./ActionPages/ChangePassword";

  
const ITEMS_PER_PAGE = 5;

const itemsPerPage = ITEMS_PER_PAGE;

function UsersPage() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("personalUsers");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [showUnflagModal, setShowUnflagModal] = useState(false);
  const [showFlagModal, setShowFlagModal] = useState(false);
  const [showInitiatePasswordModal, setInitiatePasswordModal] = useState(false);
  const [showPasswordManagerResetModal, setShowPasswordManagerResetModal] = useState(false);



  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const personalUsers = users?.filter((u) => u.userType === "PERSONAL");
  const businessUsers = users?.filter((u) => u.userType === "CORPORATE");

const filteredData = (activeSection === "personalUsers" ? personalUsers : businessUsers)?.filter((user) => {
  const firstNameMatch = user.firstName?.toLowerCase().includes(searchQuery.toLowerCase())
  const emailMatch = user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  return firstNameMatch || emailMatch
})


const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const totalUsers = users?.length || 0;

  return (
    <div className="flex flex-col">
      <header className="border-b">
        <div className="flex h-16 items-center px-4 gap-4">
          <h1 className="text-xl font-semibold">User Management</h1>
          <span className="text-sm text-muted-foreground">
            View and manage all users
          </span>
          <div className="ml-auto flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users..."
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
              <UserPlus className="mr-2 h-4 w-4" />
              Add New User
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <div className="flex gap-10 px-6 py-4 border-b text-gray-600">
        {["personalUsers", "businessUsers"].map((section) => (
          <div
            key={section}
            className="cursor-pointer group"
            onClick={() => setActiveSection(section)}>
            <h1
              className={`relative text-base font-semibold transition-colors duration-300 ${
                activeSection === section ? "text-white bg-gray-600 px-2 rounded-md" : "text-white"
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
                  <TableHead>NAME</TableHead>
                  <TableHead>EMAIL</TableHead>
                  <TableHead>STATUS</TableHead>
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
                            alt="oyu"
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        </Avatar>
                        <div>
                          <div>
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            ID: {user.id}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          user.enabled === true
                            ? "bg-green-100 text-green-800"
                            : user.enabled === false
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                        {user.enabled === true ? "Active" : "Inactive"}
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

                        <DropdownMenuContent   className=" right-0 mb-5 min-w-[150px] bg-black border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden "             
                        >
                          <DropdownMenuItem className="hover:bg-[#3A859E]"
                           onClick={() => {
                            dispatch(setSelectedUser(user));
                            navigate("/user-profile"); }}>View Profile</DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-[#3A859E]"onClick={() => {
                            dispatch(setSelectedUser(user));
                            navigate("/edit-user"); }}>Edit User</DropdownMenuItem>
                             <DropdownMenuItem className="hover:bg-[#3A859E]"onClick={() => {
    dispatch(setSelectedWalletId(user.walletId));
    dispatch(setSelectedUser(user));

    navigate("/transactions"); }}>View Transactions</DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-[#3A859E]"onClick={() => {
                            setInitiatePasswordModal(true);
                            dispatch(setSelectedUser(user));
                          }}>
                            initiate Reset Password
                          </DropdownMenuItem>
                          {/* <DropdownMenuItem className="hover:bg-[#3A859E]"onClick={() => { setInitiatePasswordModal(true)
                              dispatch(setSelectedUser(user));

                             }}>initiate Reset Password</DropdownMenuItem> */}
                             {user.enabled === true && (
                            <DropdownMenuItem className="hover:bg-red-500"onClick={() => { setShowFlagModal(true)
                              dispatch(setSelectedUser(user));

                                                         }}>Flag User</DropdownMenuItem>
                                                        )}
                        
                          {/* {user.enabled === false && (
                            <DropdownMenuItem className="hover:bg-green-400" onClick={() => { setShowUnflagModal(true)
                              dispatch(setSelectedUser(user))
                            }}>
                              Reactivate Account
                            </DropdownMenuItem>
                          )} */}
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
            <UnflagUserModal
                  isOpen={showUnflagModal}
                  onClose={() => setShowUnflagModal(false)}
                />
                <FlagUser
                  isOpen={showFlagModal}
                  onClose={() => setShowFlagModal(false)}
                />
                <InitiatePasswordReset
                  isOpen={showInitiatePasswordModal}
                  onClose={() => setInitiatePasswordModal(false)}
                />
                {/* <PasswordManagerResetModal
                  isOpen={showPasswordManagerResetModal}
                  onClose={() => setShowPasswordManagerResetModal(false)}
                /> */}
            <div className="flex items-center justify-between mt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                itemLabel="Users"
                itemsPerPage={itemsPerPage}
                onPageChange={(page) => setCurrentPage(page)}
                totalItems={
                  activeSection === "personalUsers"
                    ? personalUsers.length
                    : activeSection === "businessUsers"
                    ? businessUsers.length
                    : totalUsers
                }
              />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default UsersPage;
