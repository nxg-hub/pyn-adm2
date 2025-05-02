import { useState } from "react";
import { Filter, MoreHorizontal, Search, Plus, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Switch } from "../../components/ui/switch";
import { AdminHeader } from "../../components/layout/AdminHeader";
import { useAdmin } from "../../contexts/AdminContext";
import { Breadcrumb } from "../../components/common/Breadcrumb";
import { ButtonLoader } from "../../components/ui/loader";
import { FormModal } from "../../components/ui/modal";

const APIkeys = [
  {
    keyName: "MobileAppProd",
    ApiKey: " sk_live_****ab12",
    status: "Active",
    env: "Production",
    permissions: "Read & Write",
  },
  {
    keyName: "DevTestingKey",
    ApiKey: " sk_test_****cd34",
    status: "Revoked",
    env: "Testing",
    permissions: "Read",
  },
  {
    keyName: "OldWebhookKey",
    ApiKey: " sk_live_****ed34",
    status: "Active",
    env: "Production",
    permissions: "Full Access",
  },
  
];
const ApiKeysSettings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  

  const { hasPermission } = useAdmin();

  
  return (
    <div className="flex flex-col">
      <main className="flex-1 p-4 md:p-6 space-y-6">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 w-full md:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <Button
              variant="outline"
              className="w-full md:w-auto cursor-pointer">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button
              className="w-full md:w-auto cursor-pointer"
              onClick={() => setIsModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Generate New API Key
            </Button>
          </div>
        </div>

        
            <Card>
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                          Key Name
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                          API Key
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                          Env
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                          Permission
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {APIkeys.map((ApiKey) => (
                        <tr key={ApiKey.id} className="border-b">
                         <td className="px-4 py-3 text-sm">
                            {ApiKey.keyName}
                          </td>
                          <td className="px-4 py-3 text-sm">
                          {ApiKey.ApiKey}
                          </td>
                          
                          <td className="px-4 py-3 text-sm">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                ApiKey.status === "Active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}>
                              {ApiKey.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {ApiKey.env}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {ApiKey.permissions}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex items-center gap-2">
                             
                                                   <DropdownMenu>
                                                     <DropdownMenuTrigger asChild>
                                                       <Button variant="ghost" size="icon">
                                                         <MoreHorizontal className="h-4 w-4" />
                                                         <span className="sr-only">Open menu</span>
                                                       </Button>
                                                     </DropdownMenuTrigger>
                                                     <DropdownMenuContent   className="absolute right-0 mt-2 min-w-[150px] bg-black border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden " >     
                                                    {ApiKey.status === "Active" && (
       
                                                       <DropdownMenuItem className="hover:bg-red-500">Revoke</DropdownMenuItem>
                                                    )}
                                                      
                             
                             
                                                     </DropdownMenuContent>
                                                   </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            </main>
            </div>
  )
}
 export default ApiKeysSettings