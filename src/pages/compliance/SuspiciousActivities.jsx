import { useState, useEffect } from "react"
import { AlertCircle, Search, Shield} from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Input } from "../../components/ui/input"
import { useAdmin } from "../../contexts/AdminContext"
import { Badge } from "../../components/ui/badge"
import CreateSuspiciousReport from "./CreateSuspicious"
import Pagination from "../../components/ui/pagination"
import { TableLoader } from "../../components/ui/loader"
import apiService from "../../services/apiService";
import ViewSuspiciousActivities from "./ViewSuspiciousActivityDetails"
import SearchFilterBar from "../../components/common/SearchFilterBar"


const SuspiciousActivities = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const { hasPermission } = useAdmin()
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState('');
  const [severity, setSeverity] = useState('');
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
  const NameMatch = activity.customerName?.toLowerCase().includes(searchQuery.toLowerCase());
const matchesSeverity = severity
  ? activity.severity.toLowerCase() === severity.toLowerCase()
  : true;  return NameMatch && matchesSeverity
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
          </div>
          </header>
                <main className="flex-1 p-4 md:p-6 space-y-6">

          <div className="ml-auto flex items-center gap-4">
            <div className="relative">
             <SearchFilterBar
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      filters={[
        {
          label: 'Severity',
          name: 'severity',
          options: ['High risk', 'Low risk'],
          value: severity,
          onChange: setSeverity,
        },
      ]}
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
        
      {/* <div className="flex items-center justify-between">
      <Button>Export Report</Button>
    </div> */}
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
                                <TableHead>SEVERITY</TableHead>
                                <TableHead>REPORTED AT</TableHead>
                                <TableHead>ACTIONS</TableHead>

                              </TableRow>
                            </TableHeader>
                            <TableBody>
                               {paginatedData.map((activity) => (
                                                <TableRow key={activity.id}>
                                                  <TableCell className="font-medium ">
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
                                                                                                     </TableCell>
                                                   <TableCell>
                                                        <TableCell>{new Date(activity.createdAt).toLocaleString()}</TableCell>

                                                  </TableCell>
                                                  <TableCell>
                                                     <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm"
          onClick={() => {
    setSelectedActivity(activity);
    setIsDetailsModalOpen(true);
  }}
>
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
            <ViewSuspiciousActivities
              isOpen={isDetailsModalOpen}  
              onClose= {() => setIsDetailsModalOpen(false)
              }
              selectedActivity= {selectedActivity}
          />
            <Pagination
     currentPage={currentPage}
     totalPages={totalPages}
     onPageChange={(page) => setCurrentPage(page)}
      itemsPerPage={itemsPerPage}
      itemLabel="Suspicious Activities"
      totalItems={ totalActivities }
   />
         </div>

            </CardContent>
          </Card>
        )} 
        </main>    
    </div>
      )}
      </div>
  )
};

export default SuspiciousActivities;