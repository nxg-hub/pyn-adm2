"use client"

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
const SettingsPage = () => {
  const { currentRole, hasPermission } = useAdmin()
  const [generalSettings, setGeneralSettings] = useState({
    companyName: "Payina Financial Services",
    supportEmail: "support@payina.com",
    supportPhone: "+1 (555) 123-4567",
    maintenanceMode: false,
    debugMode: false,
  })

  const [transactionLimits, setTransactionLimits] = useState({
    dailyTransferLimit: "10000",
    singleTransferLimit: "5000",
    dailyWithdrawalLimit: "5000",
    singleWithdrawalLimit: "2000",
    newUserLimit: "1000",
    verifiedUserLimit: "5000",
    businessAccountLimit: "50000",
  })

  const [serviceFees, setServiceFees] = useState({
    transferFee: "1.5",
    withdrawalFee: "2.0",
    internationalTransferFee: "3.5",
    cardIssuanceFee: "10.00",
    monthlyMaintenanceFee: "2.00",
  })

  return (
    <div className="flex flex-col">
 <header className="border-b">
        <div className="flex h-16 items-center px-4 gap-4">
          <h1 className="text-xl font-bold">Settings</h1>
          <span className="text-sm text-muted-foreground">
            Configure Platform Settings
          </span>
           
            </div>
           
        
      </header>
      <main className="flex-1 p-4 md:p-6 space-y-6">
        <Tabs defaultValue="general">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="general">General</TabsTrigger>
            {hasPermission("setTransactionLimits") && <TabsTrigger value="limits">Transaction Limits</TabsTrigger>}
            {hasPermission("setTransactionLimits") && <TabsTrigger value="fees">Service Fees</TabsTrigger>}
            {hasPermission("manageAdmins") && <TabsTrigger value="security">Security</TabsTrigger>}
          </TabsList>

          <TabsContent value="general" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure basic platform settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={generalSettings.companyName}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, companyName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="supportEmail">Support Email</Label>
                    <Input
                      id="supportEmail"
                      type="email"
                      value={generalSettings.supportEmail}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, supportEmail: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="supportPhone">Support Phone</Label>
                    <Input
                      id="supportPhone"
                      value={generalSettings.supportPhone}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, supportPhone: e.target.value })}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">Put the platform in maintenance mode</p>
                    </div>
                    <Switch
                      id="maintenanceMode"
                      checked={generalSettings.maintenanceMode}
                      onCheckedChange={(checked) =>
                        setGeneralSettings({ ...generalSettings, maintenanceMode: checked })
                      }
                      disabled={currentRole !== "Super Admin"}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="debugMode">Debug Mode</Label>
                      <p className="text-sm text-muted-foreground">Enable detailed error logging</p>
                    </div>
                    <Switch
                      id="debugMode"
                      checked={generalSettings.debugMode}
                      onCheckedChange={(checked) => setGeneralSettings({ ...generalSettings, debugMode: checked })}
                      disabled={currentRole !== "Super Admin"}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {hasPermission("setTransactionLimits") && (
            <TabsContent value="limits" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction Limits</CardTitle>
                  <CardDescription>Configure maximum transaction amounts for different user types</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dailyTransferLimit">Daily Transfer Limit ($)</Label>
                      <Input
                        id="dailyTransferLimit"
                        type="number"
                        value={transactionLimits.dailyTransferLimit}
                        onChange={(e) =>
                          setTransactionLimits({ ...transactionLimits, dailyTransferLimit: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="singleTransferLimit">Single Transfer Limit ($)</Label>
                      <Input
                        id="singleTransferLimit"
                        type="number"
                        value={transactionLimits.singleTransferLimit}
                        onChange={(e) =>
                          setTransactionLimits({ ...transactionLimits, singleTransferLimit: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dailyWithdrawalLimit">Daily Withdrawal Limit ($)</Label>
                      <Input
                        id="dailyWithdrawalLimit"
                        type="number"
                        value={transactionLimits.dailyWithdrawalLimit}
                        onChange={(e) =>
                          setTransactionLimits({ ...transactionLimits, dailyWithdrawalLimit: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="singleWithdrawalLimit">Single Withdrawal Limit ($)</Label>
                      <Input
                        id="singleWithdrawalLimit"
                        type="number"
                        value={transactionLimits.singleWithdrawalLimit}
                        onChange={(e) =>
                          setTransactionLimits({ ...transactionLimits, singleWithdrawalLimit: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="newUserLimit">New User Limit ($)</Label>
                      <Input
                        id="newUserLimit"
                        type="number"
                        value={transactionLimits.newUserLimit}
                        onChange={(e) => setTransactionLimits({ ...transactionLimits, newUserLimit: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="verifiedUserLimit">Verified User Limit ($)</Label>
                      <Input
                        id="verifiedUserLimit"
                        type="number"
                        value={transactionLimits.verifiedUserLimit}
                        onChange={(e) =>
                          setTransactionLimits({ ...transactionLimits, verifiedUserLimit: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="businessAccountLimit">Business Account Limit ($)</Label>
                      <Input
                        id="businessAccountLimit"
                        type="number"
                        value={transactionLimits.businessAccountLimit}
                        onChange={(e) =>
                          setTransactionLimits({ ...transactionLimits, businessAccountLimit: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Limits</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          )}

          {hasPermission("setTransactionLimits") && (
            <TabsContent value="fees" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Service Fees</CardTitle>
                  <CardDescription>Configure platform fees and charges</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="transferFee">Transfer Fee (%)</Label>
                      <Input
                        id="transferFee"
                        type="number"
                        step="0.1"
                        value={serviceFees.transferFee}
                        onChange={(e) => setServiceFees({ ...serviceFees, transferFee: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="withdrawalFee">Withdrawal Fee (%)</Label>
                      <Input
                        id="withdrawalFee"
                        type="number"
                        step="0.1"
                        value={serviceFees.withdrawalFee}
                        onChange={(e) => setServiceFees({ ...serviceFees, withdrawalFee: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="internationalTransferFee">International Transfer Fee (%)</Label>
                      <Input
                        id="internationalTransferFee"
                        type="number"
                        step="0.1"
                        value={serviceFees.internationalTransferFee}
                        onChange={(e) => setServiceFees({ ...serviceFees, internationalTransferFee: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardIssuanceFee">Card Issuance Fee ($)</Label>
                      <Input
                        id="cardIssuanceFee"
                        type="number"
                        step="0.01"
                        value={serviceFees.cardIssuanceFee}
                        onChange={(e) => setServiceFees({ ...serviceFees, cardIssuanceFee: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="monthlyMaintenanceFee">Monthly Maintenance Fee ($)</Label>
                      <Input
                        id="monthlyMaintenanceFee"
                        type="number"
                        step="0.01"
                        value={serviceFees.monthlyMaintenanceFee}
                        onChange={(e) => setServiceFees({ ...serviceFees, monthlyMaintenanceFee: e.target.value })}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Fees</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          )}

          {hasPermission("manageAdmins") && (
            <TabsContent value="security" className="mt-6">
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
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  )
}

export default SettingsPage;
