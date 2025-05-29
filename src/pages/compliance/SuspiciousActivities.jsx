import { useState, useEffect } from "react"
import { AlertCircle, CheckCircle, Clock, FileText, Search, Shield, User, XCircle } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"

import { Input } from "../../components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { useAdmin } from "../../contexts/AdminContext"
import { Badge } from "../../components/ui/badge"
import DataTable from "../../components/common/DataTable"
import CreateSuspiciousReport from "./CreateSuspicious"
import Pagination from "../../components/ui/pagination"
import { TableLoader } from "../../components/ui/loader"
import apiService from "../../services/apiService";


const SuspiciousActivities = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const { hasPermission } = useAdmin()
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [suspiciousModal, setSuspiciousModal] = useState('')

 const handleAddSusClick = () => {
    setSuspiciousModal(true);
  };
  const ITEMS_PER_PAGE = 5;

const itemsPerPage = ITEMS_PER_PAGE;

const handleFetchActivities = async () => {
  setIsLoading(true);
  setErrorMessage('');

  try {
    const content = await apiService.SuspiciousActivities(); 

    console.log('Activities content:', content);

    setActivities(content || []);
  } catch (error) {
    const message = error.message || 'Unexpected error';
    setErrorMessage(`Failed to load activities: ${message}`);
  } finally {
    setIsLoading(false);
  }
};

const filteredData = (activities)?.filter((activity) => {
  const NameMatch = activity.customerName?.toLowerCase().includes(searchQuery.toLowerCase())
  // const emailMatch = user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  return NameMatch 
})

const totalActivities= activities.length

const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
const paginatedData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);



useEffect(() => {
    (handleFetchActivities());
  }, []);



  return (
    <div>
      {isLoading ? (
        <TableLoader/>
      ) : (
    <div className="flex flex-col">
 <header className="border-b">
        <div className="flex h-16 items-center px-4 gap-4">
          <h1 className="text-xl font-semibold">Suspicious Activities</h1>
          <span className="text-sm text-muted-foreground">Monitor Suspicious Activities</span>
          <div className="ml-auto flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search verifications..."
                className="w-[250px] pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
  <Button onClick={handleAddSusClick} >
    <Shield className="mr-2 h-4 w-4" />
    Create suspicious activity report
  </Button>
 <CreateSuspiciousReport
          isOpen={suspiciousModal}
           onClose={() => setSuspiciousModal(false)}

          />
            
          </div>
        </div>
      </header>
      <div className="flex items-center justify-between">
      <Button>Export Report</Button>
    </div>
    {hasPermission("monitorHighRiskTransactions") && (
          <Card>
            <CardHeader>
              <CardTitle>Suspicious Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>USER</TableHead>
                                <TableHead>ACTIVITY TYPE</TableHead>
                                <TableHead>RISK LEVEL</TableHead>
                                <TableHead>REPORTED AT</TableHead>
                                <TableHead>ACTIONS</TableHead>

                              </TableRow>
                            </TableHeader>
                            <TableBody>
                               {paginatedData.map((activity) => (
                                                <TableRow key={activity.id}>
                                                  <TableCell className="font-medium">
                                                    <div className="flex items-center gap-3">
                                                      <div>
                                                        <div>{activity.customerName}</div>
                                                        <div className="text-xs text-muted-foreground">ID: {activity.customerId}</div>
                                                      </div>
                                                    </div>
                                                  </TableCell>
                                                  <TableCell>{activity.reportType}</TableCell>
                                                  <TableCell>
                                                     <Badge
          variant="outline"
          className={
          activity.severity === "High risk"
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-yellow-200 bg-yellow-50 text-yellow-700"
          }
        >
          {activity.severity}
        </Badge>
                                                   
                                                      {/* {activity.severity} */}
                                                  </TableCell>
                                                   <TableCell>
                                                        <TableCell>{new Date(activity.createdAt).toLocaleString()}</TableCell>

                                                  </TableCell>
                                                  <TableCell>
                                                     <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Shield className="mr-2 h-4 w-4" />
            Investigate
          </Button>
          <Button variant="ghost" size="sm" className="text-red-600">
            <AlertCircle className="mr-2 h-4 w-4" />
            Escalate
          </Button>
        </div></TableCell>
</TableRow>
                ))}
              </TableBody>
            </Table> <div className="flex items-center justify-between mt-4">
            
            <Pagination
     currentPage={currentPage}
     totalPages={totalPages}
     onPageChange={(page) => setCurrentPage(page)}
      itemsPerPage={itemsPerPage}
      itemLabel="Recently Active Users"
      totalItems={ totalActivities }
   />
         </div>

            </CardContent>
          </Card>
        )}     
    </div>
      )}
      </div>
  )
};

export default SuspiciousActivities;