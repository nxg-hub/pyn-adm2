"use client";

import React, { useEffect, useState } from "react";
import { Wallet, MoreHorizontal } from "lucide-react";
import { Button } from "../../components/ui/button";
import { CardLoader } from "../../components/ui/loader";
import { Card } from "../../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import Pagination from "../../components/ui/pagination";
import { useSelector } from "react-redux";
import apiService from "../../services/apiService";


const ITEMS_PER_PAGE = 10;

const itemsPerPage = ITEMS_PER_PAGE;

export function CorporateAccountsPage() {
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState([]);

  const users = useSelector((state) => state.users.users);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");


 const businessUsers = users?.filter((u) => u.userType === "CORPORATE") || [];

const filteredData = (businessUsers)?.filter((account) => {
  const matchesSearch =
    account.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    account.firstName?.toLowerCase().includes(searchQuery.toLowerCase());

 

  return  matchesSearch;

})
console.log("Business Users:", businessUsers);

const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
console.log(paginatedData)
  useEffect(() => {
    // Simulate a network request
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleFetchBalance = async (Id) => {
  setLoading(true);

  try {
    const balance = await apiService.fetchBalance(Id);
setBalance(balance || []);
    
  } catch (error) {
    
  const message = error.message || 'Unexpected error';
    setErrorMessage(`Failed to load balance: ${message}`);
  } finally {
    setLoading(false);
  }

  };

  useEffect(() => {
    (handleFetchBalance());
  }, []);


  return (
    <div className="flex flex-col">
      <header className="border-b">
        <div className="flex h-16 items-center px-4 gap-4">
          <h1 className="text-xl font-semibold">Corporate Accounts Management</h1>
          <span className="text-sm text-muted-foreground">View and manage corporate accounts</span>
        </div>
      </header>

      <main className="p-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <CardLoader key={index} /> // Make sure CardLoader returns skeleton-style cards
            ))
          : paginatedData.map((account) => (
              <Card key={account.id} className="p-6 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">{account.accountName?.split('/')[1] || "No Name"}</h2>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="right-0 mt-2 min-w-[150px] bg-black border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden "             >
                      <DropdownMenuItem className="hover:bg-[#3A859E]">View Details</DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-[#3A859E]">Transaction History</DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-[#3A859E]">Employees Account</DropdownMenuItem>
                      {account.enabled === true && (
                        <DropdownMenuItem className="text-red-600 hover:bg-[#3A859E]">Suspend Account</DropdownMenuItem>
                      )}
                      {account.enabled === false && (
                        <DropdownMenuItem className="text-green-600 hover:bg-[#3A859E]">Reactivate Account</DropdownMenuItem>
                      )}
                      {account.status === "Inactive" && (
                        <DropdownMenuItem className="text-blue-600 hover:bg-[#3A859E]">Activate Account</DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Account Manager: {account.accountManager} None For now</p>
                {/* <p className="text-sm text-muted-foreground mb-2">Balance: {balance.balance.currency} {balance.balance.amount.toLocaleString()}</p> */}
                <p className="text-sm text-muted-foreground mb-2">Last Transaction: {account.lastTransaction}</p>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    account.enabled === true
                      ? "bg-green-100 text-green-800"
                      : account.enabled === false
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  Status: {account.enabled === true ? "Active" : account.enabled === false ? "Inactive" : ""}
                </span>
                
              </Card>
            ))}
            <div className="flex items-center justify-between mt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                itemLabel="Corporate Accounts"
                itemsPerPage={itemsPerPage}
                onPageChange={(page) => setCurrentPage(page)}
                totalItems={businessUsers.length }
              />
              </div>
      </main>
    </div>
  );
}

export default CorporateAccountsPage;
