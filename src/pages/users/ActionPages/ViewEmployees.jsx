import {useEffect, useState} from 'react'
import { MoreHorizontal } from 'lucide-react';
import { Card } from '../../../components/ui/card';
import { CardLoader } from '../../../components/ui/loader';
import { ChevronLeft } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Button } from '../../../components/ui/button';
import Pagination from '../../../components/ui/pagination';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { fetchEmployees, setSelectedCustomerId } from '../../../redux/fetchCorporateCustomerEmployees';
import ViewEmployeesAccount from './ViewEmployeesAccount';

function ViewEmployees  ()  {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const[detailsModal, setDetailsModal] = useState(false)
        const navigate = useNavigate();


    const { customerId: reduxWalletId,  employees, loading, error } = useSelector((state) => state.employees);
    const user = useSelector((state) => state.users.selectedUser);
    const location = useLocation();
const ITEMS_PER_PAGE = 10;

  const itemsPerPage =  ITEMS_PER_PAGE;
  
    const selectedCustomerId = location.state?.id;

    const customerIdToUse = selectedCustomerId || reduxWalletId 


    const handleBack = () => {
      navigate(-1);
    };
  
 useEffect(() => {
      // Only dispatch the action if we have a valid walletId
      if (customerIdToUse) {
        dispatch(fetchEmployees(customerIdToUse));
      }
    }, [customerIdToUse, dispatch]);

const filteredData = (employees)?.filter((employee) => {
  const matchesSearch =
    employee.employeeEmailAddress?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.employeeName?.toLowerCase().includes(searchQuery.toLowerCase());
 return matchesSearch
})

const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

const totalEmployees = employees.length
 return (
  <div className="flex flex-col">
     <button
        onClick={handleBack}
        className="mb-9 text-white text-xl font-medium flex items-center gap-5">
        <ChevronLeft className="h-8 w-8" />
        Back
      </button>
    <header className="border-b">
      <div className="flex h-16 items-center px-4 gap-4">
        <h1 className="text-xl font-semibold">Employees for {user?.accountName?.split('/')[1]}</h1>
       
      </div>
    </header>
 
    <main className="p-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {loading ? (
        Array.from({ length: 5 }).map((_, index) => (
          <CardLoader key={index} />
        ))
      ) : paginatedData.length === 0 ? (
        <div className="col-span-full text-center text-muted-foreground py-8">
          No employees found.
        </div>
      ) : (
        paginatedData.map((employee) => (
          <Card key={employee.id} className="p-6 shadow-md space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-lg font-semibold">
                  {employee.employeeName || "No Name"}
                </h2>
                <p className="text-xs text-muted-foreground">
                  ID: {employee.id}
                </p>
              </div>

              {/* Dropdown for actions */}
              {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                   <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
            </Button>
                </DropdownMenuTrigger>
                        <DropdownMenuContent   className=" right-0 mb-5 min-w-[150px] bg-black border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden "      >       
                  <DropdownMenuItem onClick = {() => {
                    setDetailsModal(true)
                    dispatch(setSelectedCustomerId(employee.id))
                  }}>View Details</DropdownMenuItem>
                  
                </DropdownMenuContent>
              </DropdownMenu> */}
            </div>

            <div className="space-y-1 text-sm text-muted-foreground">
              <p>
                <span className="font-medium text-white">Email:</span>{" "}
                {employee.employeeEmailAddress || "N/A"}
              </p>
              <p>
                <span className="font-medium text-white">Role:</span>{" "}
                {employee.employeeRole}
              </p>
            </div>
          </Card>
      

      

        ))
      )}
      <ViewEmployeesAccount
      isOpen= {detailsModal}
      onClose= {() => setDetailsModal(false)}
      />
       <div className="flex items-center justify-between mt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                itemLabel="Corporate Accounts"
                itemsPerPage={itemsPerPage}
                onPageChange={(page) => setCurrentPage(page)}
                totalItems={totalEmployees }
              />
              </div>
    </main>
  </div>
);

}

export default ViewEmployees