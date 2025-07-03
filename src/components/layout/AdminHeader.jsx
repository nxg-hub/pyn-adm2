"use client"

import { useState } from "react"
import { Bell, ChevronDown, Search, User } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { useAdmin } from "../../contexts/AdminContext"
import { Badge } from "../ui/badge"
import { useSelector } from "react-redux"
import GlobalSearchBar from "../common/GlobalSearchBar"


export function AdminHeader({ title, subtitle }) {
  const [searchQuery, setSearchQuery] = useState("")
  const admin = useSelector((state) => state.admin.admin);
  const { currentRole, setCurrentRole, allRoles } = useAdmin()

 const role = localStorage.getItem('adminRole')
 localStorage.setItem('adminName', `${admin?.firstName} ${admin?.lastName}` )

 const adminName = localStorage.getItem('adminName')

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 gap-4">
        <h1 className="text-xl font-semibold">{title}</h1>
        {subtitle && <span className="text-sm text-muted-foreground">{subtitle}</span>}

       <div className="ml-auto flex items-center gap-4">
            <GlobalSearchBar/>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <span>Role:</span>
                <Badge variant="secondary" className="font-normal">
        {role
         ?.replace(/_/g, ' ')
         .toLowerCase()
         .replace(/\b\w/g, c => c.toUpperCase())}   
                 </Badge>
              </Button>
            </DropdownMenuTrigger>
            
          </DropdownMenu>

          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
              14
            </span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <User className="h-4 w-4" />
                <span>{adminName}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent   className="absolute right-0 mt-2 min-w-[150px] bg-black border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden "     >        
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Security</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
