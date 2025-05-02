
import { useState } from "react"
import {AdminHeader} from "../../components/layout/AdminHeader"
import { useAdmin } from "../../contexts/AdminContext"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Switch } from "../../components/ui/switch"
import Separator from "../../components/ui/separator"
const Security = () => {
  const { currentRole, hasPermission } = useAdmin()
  

  
  
  return (
    <div className="flex flex-col">
 <header className="border-b">
        <div className="flex h-16 items-center px-4 gap-4">
          <h1 className="text-xl font-bold">Security Settings</h1>
          
           
            </div>
            </header>
            <main className="flex-1 p-4 md:p-6 ">
             {hasPermission("setTransactionLimits") && (
                
                <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Configure platform security parameters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="enforce2FA">Enforce 2FA for All Admins</Label>
                        <p className="text-sm text-muted-foreground">
                          Require two-factor authentication for all admin users
                        </p>
                      </div>
                      <Switch id="enforce2FA" defaultChecked={true} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="enforcePasswordPolicy">Enforce Strong Password Policy</Label>
                        <p className="text-sm text-muted-foreground">Require complex passwords for all users</p>
                      </div>
                      <Switch id="enforcePasswordPolicy" defaultChecked={true} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="sessionTimeout">Admin Session Timeout (minutes)</Label>
                        <p className="text-sm text-muted-foreground">Automatically log out inactive admin users</p>
                      </div>
                      <Input id="sessionTimeout" type="number" defaultValue="30" className="w-20" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="ipRestriction">IP Restriction</Label>
                        <p className="text-sm text-muted-foreground">Restrict admin access to specific IP addresses</p>
                      </div>
                      <Switch id="ipRestriction" defaultChecked={false} />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Security Settings</Button>
                </CardFooter>
              </Card>
          )}
      </main>
    </div>
  )
}

export default Security;