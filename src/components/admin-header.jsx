"use client"
import { Link } from "react-router-dom"
import { Bell, Moon, Sun, User } from "lucide-react"
import { useAdmin } from "./admin-context"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu.jsx"
import { Badge } from "./ui/badge.jsx"
import { useTheme } from "../contexts/ThemeProvider"

export function AdminHeader() {
  const { currentRole, roles, changeRole, getCurrentRoleObject } = useAdmin()
  const { theme, setTheme } = useTheme()
  const currentRoleObject = getCurrentRoleObject()

  return (
    <header className="z-30 flex h-16 w-full items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2 md:gap-4">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          <span className="hidden md:inline-block">Financial Admin</span>
        </Link>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Badge
                variant="outline"
                className={`bg-${currentRoleObject.color}-100 text-${currentRoleObject.color}-800 border-${currentRoleObject.color}-200 px-2 py-0.5 text-xs`}
              >
                {currentRoleObject.name}
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Switch Role</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {roles.map((role) => (
              <DropdownMenuItem
                key={role.id}
                onClick={() => changeRole(role.id)}
                className={currentRole === role.id ? "bg-muted" : ""}
              >
                <Badge
                  variant="outline"
                  className={`bg-${role.color}-100 text-${role.color}-800 border-${role.color}-200 mr-2 px-2 py-0.5 text-xs`}
                >
                  {role.name}
                </Badge>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
          <Link to="/dashboard/notifications">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Link>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          <span className="sr-only">Toggle theme</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <User className="h-4 w-4" />
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
