import { useState, useEffect } from "react"
import { Search, ChevronLeft  } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Badge } from "../../../components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { useSelector, useDispatch } from "react-redux";
import { fetchActivities } from "../../../redux/AdminActivitySlice"
import Pagination from "../../../components/ui/pagination";
import { useNavigate } from "react-router-dom";
import { TableLoader } from "../../../components/ui/loader"
 

const ITEMS_PER_PAGE = 10;

const ActivityLogs = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const admin = useSelector((state) => state.admins.selectedAdmin);
    const { AdminActivities, loading, error } = useSelector((state) => state.AdminActivities);
    const superAdmin = useSelector((state) => state.admin.admin);

    const adminId = admin?.id;

    useEffect(() => {
      if (adminId && superAdmin?.id) {
        dispatch(fetchActivities({ adminId: adminId, superAdminId: superAdmin.id }));
      }
    }, [adminId, superAdmin?.id, dispatch]);

    // Reset to first page when search query changes
    useEffect(() => {
      setCurrentPage(1);
    }, [searchQuery]);

    console.log('Admin ID:', admin?.id)
    console.log('Admin Activities:', AdminActivities)
    console.log('Loading:', loading)
    console.log('Error:', error)

    // Filter data based on search query
    const filteredData = (AdminActivities || []).filter((activity) => {
      if (!searchQuery) return true;
      const action = activity.actionType?.toLowerCase().includes(searchQuery.toLowerCase());
      return action;
    }); 
    console.log('Filtered Data:', filteredData)

    // Calculate pagination based on filtered data
    const totalFilteredItems = filteredData.length;
    const totalPages = Math.ceil(totalFilteredItems / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handleBack = () => {
      navigate(-1);
    }

    const handlePageChange = (page) => {
      setCurrentPage(page);
    }

    return (
      <div>
        {loading ? (
          <TableLoader/>
        ) : (
          <div className="flex flex-col">
            <button
              onClick={handleBack}
              className="mb-9 text-white text-xl font-medium flex items-center gap-5">
              <ChevronLeft className="h-8 w-8" />
              Back
            </button>
            
            <header className="border-b">
              <div className="flex h-16 items-center px-4 gap-4">
                <h1 className="text-xl font-semibold">Admin Activities</h1>
                <span className="text-sm text-muted-foreground">Monitor Admin Activities</span>
                <div className="ml-auto flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search action type..."
                      className="w-[250px] pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </header>
            
            <Card>
              <CardHeader>
                <CardTitle>Admin Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>TIME STAMP</TableHead>
                      <TableHead>ACTION TYPE</TableHead>
                      <TableHead>DESCRIPTION</TableHead>
                      <TableHead>TARGET TYPE</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((activity, index) => (
                        <TableRow key={activity.id || index}>
                          <TableCell>{activity.id}</TableCell>
                          <TableCell>{new Date(activity.timestamp).toLocaleString()}</TableCell>
                          <TableCell>
                            {activity.actionType
                              ?.toLowerCase()
                              .replace(/_/g, ' ')
                              .replace(/\b\w/g, (char) => char.toUpperCase())
                            }
                          </TableCell>
                          <TableCell>
                            {activity.description
                              ?.toLowerCase()
                              .replace(/_/g, ' ')
                              .replace(/\b\w/g, (char) => char.toUpperCase())
                            }
                          </TableCell>
                          <TableCell>{activity.targetType}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          {searchQuery ? `No activities found matching "${searchQuery}"` : "No activities found"}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                
                {totalFilteredItems > 0 && (
                  <div className="flex items-center justify-between mt-4">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      itemLabel="Activities"
                      itemsPerPage={ITEMS_PER_PAGE}
                      onPageChange={handlePageChange}
                      totalItems={totalFilteredItems}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    )
};

export default ActivityLogs;