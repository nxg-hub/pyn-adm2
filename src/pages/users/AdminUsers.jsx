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
import avatar from "../../assets/avatar.png"
import Pagination from "../../components/ui/pagination"
import { useDispatch, useSelector } from 'react-redux';
import AdminInvite from "./InviteAdmin/AddAdminModal"
import { useNavigate } from "react-router-dom";
import DeleteAdminModal from "./AdminActionPages/DeleteAdmin"
import AdminPasswordReset from "./AdminActionPages/ResetPassword"
import { setSelectedAdmin, fetchAdmins } from "../../redux/adminsSlice"
import UpdatePermission from "./AdminActionPages/UpdatePermission"  
import { TableLoader } from "../../components/ui/loader"

const ITEMS_PER_PAGE = 5;
const itemsPerPage =  ITEMS_PER_PAGE;

function AdminsPage() {
  const { admins, loading, error } = useSelector((state) => state.admins); 
  const admin = useSelector((state) => state.admin.admin);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("superAdmin");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAdminPasswordModal, setAdminPasswordModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [inviteModal, setInviteModal] = useState('')
  const [showUpdateModal, setShowUpdateModal] = useState('')

  useEffect(() => {
    dispatch(fetchAdmins());
  }, [dispatch]);

  const superAdmin = admins?.filter((a) => a.adminUserType === "SUPER_ADMIN") ;
  const customerCareReps = admins?.filter((a) => a.adminUserType === "CUSTOMER_CARE_REP") ;
  const financeManagers = admins?.filter((a) => a.adminUserType === "FINANCE_MANAGER") ;
  const generalManagers = admins?.filter((a) => a.adminUserType === "GENERAL_MANAGER") ;
  const operationsManagers = admins?.filter((a) => a.adminUserType === "OPERATIONS_MANAGER") ;

  const adminSections = {
    superAdmin,
    customerCareReps,
    financeManagers,
    generalManagers,
    operationsManagers,
  };
  const selectedAdmins = adminSections[activeSection] || [];

  // Then, filter it
  const filteredData = selectedAdmins.filter((admin) => {
    const firstNameMatch = admin.firstName?.toLowerCase().includes(searchQuery.toLowerCase());
    const emailMatch = admin.email?.toLowerCase().includes(searchQuery.toLowerCase());
    return firstNameMatch || emailMatch;
  });
const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleAddAdminClick = () => {
    setInviteModal(true);
  };

  const handleRefresh = () => {
    dispatch(fetchAdmins());
  };

  const totalAdmins = admins?.length || 0;

  // Loading state
  

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-500 text-center">
          <h2 className="text-xl font-semibold mb-2">Error Loading Admins</h2>
          <p className="mb-4">{error}</p>
          <Button onClick={handleRefresh}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {loading ? (
       <TableLoader />
    ) : (
    <div className="flex flex-col">
      <header className="border-b">
        <div className="flex h-16 items-center px-4 gap-4">
          <h1 className="text-xl font-semibold">Admins</h1>
          <span className="text-sm text-muted-foreground">View and manage all admins</span>
          <div className="ml-auto flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search admins..."
                className="w-[250px] pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" onClick={handleRefresh}>
              <Filter className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            {admin?.adminUserType === "SUPER_ADMIN" && (
              <Button onClick={handleAddAdminClick}>
                <UserPlus className="mr-2 h-4 w-4" />
                Add New Admin
              </Button>
            )}
          </div>
        </div>
      </header>   

      <main className="flex-1 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>ADMINS ({totalAdmins})</CardTitle>
          </CardHeader>
          <div className="flex gap-5 px-4 py-2 border-b text-gray-600">
            {["superAdmin", "customerCareReps", "financeManagers", "generalManagers", "operationsManagers"].map((section) => (
              <div key={section} className="cursor-pointer group" onClick={() => setActiveSection(section)}>
                <h1
                  className={`relative text-base font-semibold transition-colors duration-300 ${
                    activeSection === section ? "text-white bg-gray-600 px-1 rounded-md" : "text-white"
                  }`}
                >
                  {section.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                  <span className="ml-1 text-xs">({adminSections[section]?.length || 0})</span>
                </h1>
              </div>
            ))}
          </div>

          <CardContent>
            {paginatedData.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  {searchQuery ? `No admins found matching "${searchQuery}"` : "No admins found"}
                </p>
              </div>
            ) : (
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
                  {paginatedData.map((admin) => (
                    <TableRow key={admin.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <Avatar>
                              <img
                              src={admin.passportUrl || avatar}
                              alt="image"
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          </Avatar>
                          <div>
                            <div>{admin.firstName} {admin.lastName}</div>
                            <div className="text-xs text-muted-foreground">ID: {admin.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{admin.email}</TableCell>

                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            admin.enabled === true
                              ? "bg-green-100 text-green-800"
                              : admin.enabled === false
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {admin.enabled === true ? "Active" : "Inactive"} 
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

                          <DropdownMenuContent className="right-0 mt-2 min-w-[150px] bg-black border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                            <DropdownMenuItem className="hover:bg-[#3A859E]" onClick={() => {
                              dispatch(setSelectedAdmin(admin));
                              navigate("/admin-profile"); 
                            }}>View Profile</DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-[#3A859E]"
                            onClick={() => {
                              dispatch(setSelectedAdmin(admin));
                              navigate("/edit-admin"); 
                            }}>Edit Admin</DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-[#3A859E]"
                            onClick={() => { 
                              setShowUpdateModal(true)
                              dispatch(setSelectedAdmin(admin));
                            }}>Update Permission</DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-[#3A859E]"
                            onClick={() => { 
                              setAdminPasswordModal(true)
                              dispatch(setSelectedAdmin(admin));
                            }}>Reset Password</DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-[#3A859E]" onClick={() => { 
                              dispatch(setSelectedAdmin(admin));
                              navigate("/view-activities");
                            }}>View Activity Logs</DropdownMenuItem>
                            {admin.enabled === true && (
                              <DropdownMenuItem className="hover:bg-red-500" onClick={() => { 
                                setShowDeleteModal(true)
                                dispatch(setSelectedAdmin(admin));                              
                              }}>Delete Admin</DropdownMenuItem>
                            )}
                            {admin.enabled === false && (
                              <DropdownMenuItem className="hover:bg-green-400">Reactivate Account</DropdownMenuItem>
                            )}
                            {admin.status === "Pending" && (
                              <DropdownMenuItem className="text-blue-600">Approve Account</DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            
            <DeleteAdminModal
              isOpen={showDeleteModal}
              onClose={() => setShowDeleteModal(false)}
            />
            <UpdatePermission
              isOpen={showUpdateModal}
              onClose={() => setShowUpdateModal(false)}
            />
            <AdminPasswordReset
              isOpen={showAdminPasswordModal}
              onClose={() => setAdminPasswordModal(false)}
            />
            
            {paginatedData.length > 0 && (
              <div className="flex items-center justify-between mt-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => setCurrentPage(page)}
                  totalItems={totalAdmins}
                  itemsPerPage={itemsPerPage}
                  itemLabel="admins"
                />
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      {inviteModal && (
        <AdminInvite
          isOpen={inviteModal}
          onClose={() => setInviteModal(false)}
        />
      )}
    </div>
    )}
    </div> 
  )
}

export default AdminsPage