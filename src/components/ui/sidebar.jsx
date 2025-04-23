"use client"

import React, { createContext, useState, useEffect } from "react"
import { Slot } from "@radix-ui/react-slot"
import { PanelLeft } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "./button"
import { Separator } from "./separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"
import { cva } from "class-variance-authority"

const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

const SidebarContext = createContext(null)

function useSidebar() {
    const context = React.useContext(SidebarContext)
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider.")
    }
    return context
}

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkIsMobile()
        window.addEventListener("resize", checkIsMobile)
        return () => window.removeEventListener("resize", checkIsMobile)
    }, [])

    return isMobile
}

const SidebarProvider = React.forwardRef(
    ({ defaultOpen = true, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }, ref) => {
        const isMobile = useIsMobile()
        const [openMobile, setOpenMobile] = useState(false)

        // This is the internal state of the sidebar.
        // We use openProp and setOpenProp for control from outside the component.
        const [_open, _setOpen] = useState(defaultOpen)
        const open = openProp ?? _open
        const setOpen = React.useCallback(
            (value) => {
                const openState = typeof value === "function" ? value(open) : value
                if (setOpenProp) {
                    setOpenProp(openState)
                } else {
                    _setOpen(openState)
                }

                // This sets the cookie to keep the sidebar state.
                localStorage.setItem("sidebar:state", openState.toString())
            },
            [setOpenProp, open],
        )

        // Helper to toggle the sidebar.
        const toggleSidebar = React.useCallback(() => {
            return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
        }, [isMobile, setOpen, setOpenMobile])

        // Adds a keyboard shortcut to toggle the sidebar.
        React.useEffect(() => {
            const handleKeyDown = (event) => {
                if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
                    event.preventDefault()
                    toggleSidebar()
                }
            }

            window.addEventListener("keydown", handleKeyDown)
            return () => window.removeEventListener("keydown", handleKeyDown)
        }, [toggleSidebar])

        // We add a state so that we can do data-state="expanded" or "collapsed".
        // This makes it easier to style the sidebar with Tailwind classes.
        const state = open ? "expanded" : "collapsed"

        const contextValue = React.useMemo(
            () => ({
                state,
                open,
                setOpen,
                isMobile,
                openMobile,
                setOpenMobile,
                toggleSidebar,
            }),
            [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar],
        )

        return (
            <SidebarContext.Provider value={contextValue}>
                <TooltipProvider delayDuration={0}>
                    <div
                        style={{
                            "--sidebar-width": SIDEBAR_WIDTH,
                            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                            ...style,
                        }}
                        className={cn(
                            "group/sidebar-wrapper flex min-h-screen w-full has-[[data-variant=inset]]:bg-sidebar",
                            className,
                        )}
                        ref={ref}
                        {...props}
                    >
                        {children}
                    </div>
                </TooltipProvider>
            </SidebarContext.Provider>
        )
    },
)
SidebarProvider.displayName = "SidebarProvider"

const Sidebar = React.forwardRef(({ side = "left", variant = "sidebar", collapsible = "offcanvas", className, children, ...props }, ref) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

    if (collapsible === "none") {
        return (
            <aside
                ref={ref}
                data-sidebar="root"
                className={cn(
                    "flex h-full flex-col border-r border-gray-700 bg-gray-800",
                    "w-[--sidebar-width]",
                    className
                )}
                style={{
                    "--sidebar-width": SIDEBAR_WIDTH,
                }}
                {...props}
            >
                {children}
            </aside>
        )
    }

    return (
        <aside
            ref={ref}
            data-sidebar="root"
            data-state={state}
            className={cn(
                "fixed top-0 bottom-0 z-40 flex flex-col border-r border-gray-700",
                "bg-gray-800",
                "transition-all duration-300",
                side === "left" ? "left-0" : "right-0",
                isMobile
                    ? cn(
                        "w-[--sidebar-width-mobile]",
                        openMobile ? "translate-x-0" : side === "left" ? "-translate-x-full" : "translate-x-full"
                    )
                    : cn(
                        state === "open" ? "w-[--sidebar-width]" : "w-[--sidebar-width-icon]",
                        "relative"
                    ),
                className
            )}
            style={{
                "--sidebar-width": SIDEBAR_WIDTH,
                "--sidebar-width-mobile": SIDEBAR_WIDTH_MOBILE,
                "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
            }}
            {...props}
        >
            {children}
        </aside>
    )
})
Sidebar.displayName = "Sidebar"

const SidebarContent = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            data-sidebar="content"
            className={cn(
                "flex-1 overflow-auto p-4",
                className
            )}
            {...props}
        />
    )
})
SidebarContent.displayName = "SidebarContent"

const SidebarTrigger = React.forwardRef(({ className, onClick, ...props }, ref) => {
    const { toggleSidebar } = useSidebar()

    return (
        <Button
            ref={ref}
            data-sidebar="trigger"
            variant="ghost"
            size="icon"
            className={cn("h-7 w-7", className)}
            onClick={(event) => {
                onClick?.(event)
                toggleSidebar()
            }}
            {...props}
        >
            <PanelLeft />
            <span className="sr-only">Toggle Sidebar</span>
        </Button>
    )
})
SidebarTrigger.displayName = "SidebarTrigger"

const SidebarHeader = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            data-sidebar="header"
            className={cn(
                "flex flex-none items-center justify-between border-b border-gray-700 px-4 py-3",
                className
            )}
            {...props}
        />
    )
})
SidebarHeader.displayName = "SidebarHeader"

const SidebarFooter = React.forwardRef(({ className, ...props }, ref) => {
    return <div ref={ref} data-sidebar="footer" className={cn("flex flex-col gap-2 p-2", className)} {...props} />
})
SidebarFooter.displayName = "SidebarFooter"

const SidebarSeparator = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <Separator
            ref={ref}
            data-sidebar="separator"
            className={cn("mx-2 w-auto bg-gray-700", className)}
            {...props}
        />
    )
})
SidebarSeparator.displayName = "SidebarSeparator"

const SidebarGroup = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            data-sidebar="group"
            className={cn("space-y-2", className)}
            {...props}
        />
    )
})
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupLabel = React.forwardRef(({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"

    return (
        <Comp
            ref={ref}
            data-sidebar="group-label"
            className={cn(
                "text-xs font-semibold text-gray-400",
                className,
            )}
            {...props}
        />
    )
})
SidebarGroupLabel.displayName = "SidebarGroupLabel"

const SidebarGroupContent = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} data-sidebar="group-content" className={cn("w-full text-sm", className)} {...props} />
))
SidebarGroupContent.displayName = "SidebarGroupContent"

const SidebarMenu = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            data-sidebar="menu"
            className={cn(
                "space-y-1",
                className
            )}
            {...props}
        />
    )
})
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef(({ className, children, ...props }, ref) => {
    return (
        <div
            ref={ref}
            data-sidebar="menu-item"
            className={cn(
                "relative group/menu-item",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
})
SidebarMenuItem.displayName = "SidebarMenuItem"

const SidebarMenuSub = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            data-sidebar="menu-sub"
            className={cn(
                "ml-4 flex flex-col gap-1",
                "text-gray-300",
                className
            )}
            {...props}
        />
    )
})
SidebarMenuSub.displayName = "SidebarMenuSub"

const SidebarMenuSubItem = React.forwardRef(({ className, children, ...props }, ref) => {
    return (
        <div
            ref={ref}
            data-sidebar="menu-sub-item"
            className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2",
                "text-gray-400 hover:text-gray-100 hover:bg-gray-700",
                "transition-colors duration-200",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
})
SidebarMenuSubItem.displayName = "SidebarMenuSubItem"

const sidebarMenuButtonVariants = cva(
    "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm text-gray-300 outline-none ring-gray-700 transition-[width,height,padding] hover:bg-gray-700 hover:text-gray-100 focus-visible:ring-2 active:bg-gray-700 active:text-gray-100 disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-gray-700 data-[active=true]:font-medium data-[active=true]:text-gray-100 data-[state=open]:hover:bg-gray-700 data-[state=open]:hover:text-gray-100 group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
    {
        variants: {
            variant: {
                default: "",
                outline:
                    "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-gray-700 hover:text-gray-100 hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
)

const SidebarMenuButton = React.forwardRef(
    ({ asChild = false, isActive = false, variant = "default", size = "default", tooltip, className, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        const { isMobile, state } = useSidebar()

        const button = (
            <Comp
                ref={ref}
                data-sidebar="menu-button"
                data-size={size}
                data-active={isActive}
                className={cn(sidebarMenuButtonVariants({ variant, className }))}
                {...props}
            />
        )

        if (!tooltip) {
            return button
        }

        if (typeof tooltip === "string") {
            tooltip = {
                children: tooltip,
            }
        }

        return (
            <Tooltip>
                <TooltipTrigger asChild>{button}</TooltipTrigger>
                <TooltipContent side="right" align="center" hidden={state !== "collapsed" || isMobile} {...tooltip} />
            </Tooltip>
        )
    },
)
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarMenuSubButton = React.forwardRef(
    ({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
        const Comp = asChild ? Slot : "a"

        return (
            <Comp
                ref={ref}
                data-sidebar="menu-sub-button"
                data-size={size}
                data-active={isActive}
                className={cn(
                    "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-gray-300 outline-none ring-gray-700 hover:bg-gray-700 hover:text-gray-100 focus-visible:ring-2 active:bg-gray-700 active:text-gray-100 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-gray-100",
                    "data-[active=true]:bg-gray-700 data-[active=true]:text-gray-100",
                    size === "sm" && "text-xs",
                    size === "md" && "text-sm",
                    "group-data-[collapsible=icon]:hidden",
                    className,
                )}
                {...props}
            />
        )
    },
)
SidebarMenuSubButton.displayName = "SidebarMenuSubButton"

export {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarSeparator,
    SidebarTrigger,
    useSidebar,
}
