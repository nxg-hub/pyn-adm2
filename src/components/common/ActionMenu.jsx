"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { MoreHorizontal } from "lucide-react"
import { useAdmin } from "../../contexts/AdminContext"

const ActionMenu = ({ actions, align = "end" }) => {
    const { hasPermission } = useAdmin()

    // Filter actions based on permissions
    const filteredActions = actions.filter((action) => {
        if (!action.requiredPermission) return true
        return hasPermission(action.requiredPermission)
    })

    if (filteredActions.length === 0) return null

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={align} className="w-[160px]">
                {filteredActions.map((action, index) => (
                    <DropdownMenuItem
                        key={index}
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            if (action.onClick) action.onClick()
                        }}
                        className={action.className}
                        disabled={action.disabled}
                    >
                        {action.icon && <action.icon className="mr-2 h-4 w-4" />}
                        {action.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ActionMenu
