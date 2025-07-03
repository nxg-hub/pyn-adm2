"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { AlertCircle, CheckCircle, Clock, MessageSquare, Search, User, FilePlus } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { useAdmin } from "../../contexts/AdminContext"
import { Badge } from "../../components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui/dialog"
import { Textarea } from "../../components/ui/textarea"
import DataTable from "../../components/common/DataTable"
import StatCard from "../../components/common/StatCard"
import CreateNewTicket from "./CreateNewTicket";
import AssignTicket from "./assignTicket";
import { fetchSupportTickets } from "../../redux/supportTicketsSlice"
import Pagination from "../../components/ui/pagination"
import { TableLoader } from "../../components/ui/loader";
import { setActiveTicket } from "../../redux/supportTicketsSlice";
import Resolve from "./Resolve";
import AddMessage from "./AddMessage";


const SupportPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const { hasPermission } = useAdmin()
  const [openCreateNew, setOpenCreateNew] = useState(false);
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false)
  const [openResolveModal, setOpenResolveModal] = useState(false);
  const [openAddMessageModal, setOpenAddMessageModal] = useState(false);
  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [replyMessage, setReplyMessage] = useState("")
  const { activeTicket } = useSelector((state) => state.supportTickets);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const [priority, setPriority] = useState('');
  const [category, setCategory] = useState(''); 
  const { tickets, loading, error } = useSelector((state) => state.supportTickets); 
  
useEffect(() => {
  dispatch(fetchSupportTickets({ priority, category}));
  }, [dispatch, priority, category]);


  const ITEMS_PER_PAGE = 5;
  const itemsPerPage = ITEMS_PER_PAGE;

   const filteredData = (tickets)?.filter((ticket) => {
  const matchesSearch =
    ticket.customerId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.customerName?.toLowerCase().includes(searchQuery.toLowerCase());

  const matchesPriority = priority ? ticket.priority === priority : true;
  const matchesCategory = category ? ticket.category === category : true;

  return  matchesSearch && matchesPriority && matchesCategory;

})

const totalTickets= tickets.length
const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
const paginatedData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

const openTickets = tickets?.filter(ticket => ticket.status === "OPEN") || [];
const totalOpenTickets = openTickets.length;

const resolvedTickets = tickets?.filter(ticket => ticket.status === "RESOLVED") || [];
const totalResolvedTickets = resolvedTickets.length;

const assignedTickets = tickets?.filter(ticket => ticket.status === "ASSIGNED") || [];
const totalAssignedTickets = assignedTickets.length;


  const getPriorityBadge = (priority) => {
    const classes = {
      Low: "border-green-200 bg-green-50 text-green-700",
      Medium: "border-blue-200 bg-blue-50 text-blue-700",
      High: "border-red-200 bg-orange-50 text-orange-700",
    }
  
    return (
      <Badge variant="outline" className={classes[priority]}>
        {priority}
      </Badge>
    )
  }

  const getStatusBadge = (status) => {
    const classes = {
      OPEN: "border-blue-200 bg-blue-50 text-blue-700",
      ASSIGNED: "border-yellow-200 bg-yellow-50 text-yellow-700",
      RESOLVED: "border-green-200 bg-green-50 text-green-700",
      IN_PROGRESS: "border-gray-200 bg-gray-50 text-gray-700",
    }

    return (
      <Badge variant="outline" className={classes[status]}>
        {status}
      </Badge>
    )
  }

  const columns = [
    {
      key: "id",
      header: "TICKET ID",
render: (row) => (
  <span className="font-medium" title={row.id}>
    {row.id.slice(0, 5)}...
  </span>
)    },
    {
      key: "user",
      header: "USER",
      render: (row) => (
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" />
          {row.customerName}
        </div>
      ),
    },
    {
      key: "subject",
      header: "SUBJECT",
    },
    {
      key: "status",
      header: "STATUS",
      render: (row) => getStatusBadge(row.status),
    },
    {
      key: "priority",
      header: "PRIORITY",
      render: (row) => getPriorityBadge(row.priority),
    },
   ...(hasPermission("assignSupportTickets")
  ? [
      {
        key: "assignedTo",
        header: "ASSIGNED TO",
        render: (row) =>
          row.assignedToAdminId ? (
            <span className="font-medium" title={row.assignedToAdminId}>
              {row.assignedToAdminId.slice(0, 5)}...
            </span>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                dispatch(setActiveTicket(row));
                setOpenAssignModal(true);
              }}
            >
              Assign
            </Button>
          ),
      },
    ]
  : []),


    {
      key: "createdAt",
      header: "CREATED",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          {row.createdAt}
        </div>
      ),
    },
    {
      key: "actions",
      header: "ACTIONS",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              dispatch(setActiveTicket(row))
              setOpenAddMessageModal(true)
            }}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Add Message
          </Button>
          {/* {row.status !== "RESOLVED" && row.status !== "Closed" && (
            <Button variant="ghost" size="sm"
            onClick={() => {
              dispatch(setActiveTicket(row))
             setOpenResolveModal(true)            }}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Resolve
            </Button>
          )} */}
          {/* {hasPermission("viewFullTransactionHistory") && (
            <Button variant="ghost" size="sm">
              <AlertCircle className="mr-2 h-4 w-4" />
              Escalate
            </Button>
          )} */}
        </div>
      ),
    },
  ]
  const handleCreateNew = () => {
    setOpenCreateNew(true);
  };


  return (
    <div>
      {loading ? (
        <TableLoader/>
      ) : (
    <div className="flex flex-col">
<header className="border-b">
            <div className="flex h-16 items-center px-4 gap-4">
              <h1 className="text-xl font-semibold">Support Tickets</h1>
              <span className="text-sm text-muted-foreground"> Manage customers support tickets and inquiries</span>
            </div>
          </header>
      <main className="flex-1 p-4 md:p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard title="Open Tickets" value={totalOpenTickets} />
          <StatCard title="In Progress" value={totalAssignedTickets} />
          <StatCard title="Resolved" value={totalResolvedTickets} trend="up" />
          <StatCard title="Avg. Response Time" value="2.5h" subtitle="-15min from last week" trend="down" />
        </div>

        <div className="flex items-center justify-between">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-[250px] pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                
                
              </div>
          {hasPermission("assignSupportTickets") && <Button onClick={handleCreateNew}>
            <FilePlus className="mr-2 h-4 w-4" />Create New Ticket</Button>}
        </div>
        <CreateNewTicket
        isOpen={openCreateNew}
        onClose={()=> setOpenCreateNew(false)}
        
        />


        <Card>
          <CardHeader>
            <CardTitle>Support Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All Tickets</TabsTrigger>
                <TabsTrigger value="open">Open</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="resolved">Resolved</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
                <DataTable columns={columns} data={paginatedData} />
              </TabsContent>
              <TabsContent value="open" className="mt-4">
                <DataTable columns={columns} data={paginatedData.filter((ticket) => ticket.status === "OPEN")} />
              </TabsContent>
              <TabsContent value="in-progress" className="mt-4">
                <DataTable columns={columns} 
data={paginatedData.filter((ticket) => ticket.status === "ASSIGNED" || ticket.status === "IN_PROGRESS")}
  />            </TabsContent>
              <TabsContent value="resolved" className="mt-4">
                <DataTable columns={columns} data={paginatedData.filter((ticket) => ticket.status === "RESOLVED")} />
              </TabsContent>
            </Tabs>
            <Pagination
     currentPage={currentPage}
     totalPages={totalPages}
     onPageChange={(page) => setCurrentPage(page)}
      itemsPerPage={itemsPerPage}
      itemLabel="Support Tickets"
      totalItems={ totalTickets }
   />
          </CardContent>
        </Card>

        {/* Reply Dialog */}
        {/* <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reply to Ticket {activeTicket?.id}</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold">{activeTicket?.user}</span>: {activeTicket?.subject}
              </p>
              <Textarea
                placeholder="Write your reply..."
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
              />
            </div>
            <DialogFooter className="mt-4">
              <Button
                onClick={() => {
                  console.log(`Reply to ${activeTicket?.id}:`, replyMessage)
                  setReplyMessage("")
                  setIsReplyDialogOpen(false)
                }}
              >
                Send Reply
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog> */}
        
            <AssignTicket
            isOpen={openAssignModal}
            onClose={() => setOpenAssignModal(false)}/>
            <Resolve
            isOpen={openResolveModal}
            onClose={() => setOpenResolveModal(false)}/>
            <AddMessage
            isOpen={openAddMessageModal}
            onClose={() => setOpenAddMessageModal(false)}
            
            />
      </main>
      
    </div>
      )}
      </div>
  )
}

export default SupportPage