import { useState } from "react"
import {AdminHeader} from "../../components/layout/AdminHeader"
import { useAdmin } from "../../contexts/AdminContext"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Switch } from "../../components/ui/switch"
import { Save, Users } from "lucide-react"
import { useNavigate } from "react-router-dom"


const SystemAdminSettings = () => {
    const { currentRole, hasPermission } = useAdmin()
    const navigate= useNavigate ();


    return (
        <div className="flex flex-col">
     <header className="border-b">
            <div className="flex h-16 items-center px-4 gap-4">
              <h1 className="text-xl font-bold">System Admin Settings</h1>
              
               
                </div>
                </header>
                <main className="flex-1 p-4 md:p-6 ">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
         

          
                <Button
      className="w-full md:w-auto cursor-pointer"
      onClick={() => navigate("/dashboard/users/admin-users")}
    >
      <Users className="mr-2 h-4 w-4" />
      View All Admins
    </Button>
          </div>

<Card>
<CardHeader>
  <CardTitle>Admin Role Permissions</CardTitle>
  <CardDescription>Configure permissions for each admin role</CardDescription>
</CardHeader>
<CardContent className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="role-select">Select Role</Label>
    <select
      id="role-select"
      className="flex h-10 w-full rounded-md border border-input bg-black px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      defaultValue="super_admin"
    //   disabled={!hasPermission("admins", "edit")}
    >
      <option value="SUPER_ADMIN">Super Admin</option>
      <option value="OPERATIONS_MANAGER">Operations Manager</option>
      <option value="GENERAL_MANAGER">General Manager</option>
      <option value="FINANCE_MANAGER">Finance Manger</option>
      <option value="CUSTOMER_CARE_REP">Customer Care Rep</option>
    </select>
  </div>

  <div className="space-y-4">
    <div>
      <h3 className="text-lg font-medium">User Management</h3>
      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <div className="flex items-center space-x-2">
          <Switch id="perm-users-view" 
        //   defaultChecked disabled={!hasPermission("admins", "edit")} 
          />
          <Label htmlFor="perm-users-view">View</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="perm-users-create" 
        //   defaultChecked disabled={!hasPermission("admins", "edit")}
           />
          <Label htmlFor="perm-users-create">Create</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="perm-users-edit" 
        //   defaultChecked disabled={!hasPermission("admins", "edit")}
           />
          <Label htmlFor="perm-users-edit">Edit</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="perm-users-delete" 
        //   defaultChecked disabled={!hasPermission("admins", "edit")}
           />
          <Label htmlFor="perm-users-delete">Delete</Label>
        </div>
      </div>
    </div>

    <div>
      <h3 className="text-lg font-medium">Transactions</h3>
      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <div className="flex items-center space-x-2">
          <Switch id="perm-transactions-view" defaultChecked disabled={!hasPermission("admins", "edit")} />
          <Label htmlFor="perm-transactions-view">View</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="perm-transactions-approve"
            defaultChecked
            disabled={!hasPermission("admins", "edit")}
          />
          <Label htmlFor="perm-transactions-approve">Approve</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="perm-transactions-reject"
            defaultChecked
            disabled={!hasPermission("admins", "edit")}
          />
          <Label htmlFor="perm-transactions-reject">Reject</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="perm-transactions-flag" defaultChecked disabled={!hasPermission("admins", "edit")} />
          <Label htmlFor="perm-transactions-flag">Flag</Label>
        </div>
      </div>
    </div>

    <div>
      <h3 className="text-lg font-medium">Wallets</h3>
      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <div className="flex items-center space-x-2">
          <Switch id="perm-wallets-view" defaultChecked disabled={!hasPermission("admins", "edit")} />
          <Label htmlFor="perm-wallets-view">View</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="perm-wallets-create" defaultChecked disabled={!hasPermission("admins", "edit")} />
          <Label htmlFor="perm-wallets-create">Create</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="perm-wallets-freeze" defaultChecked disabled={!hasPermission("admins", "edit")} />
          <Label htmlFor="perm-wallets-freeze">Freeze</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="perm-wallets-unfreeze" defaultChecked disabled={!hasPermission("admins", "edit")} />
          <Label htmlFor="perm-wallets-unfreeze">Unfreeze</Label>
        </div>
      </div>
    </div>
  </div>
</CardContent>
<CardFooter>
  <Button disabled={!hasPermission("admins", "edit")}>
    <Save className="mr-2 h-4 w-4" />
    Save Permissions
  </Button>
</CardFooter>
</Card>
</main>
</div>
    )
}
export default SystemAdminSettings