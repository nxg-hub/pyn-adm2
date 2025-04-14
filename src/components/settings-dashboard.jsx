import { Badge } from "/ui/badge"
import { Save, User, Shield, Bell, Globe, CreditCard, Lock } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "/ui/tabs"
import { Input } from "/ui/input"
import { Button } from "/ui/button"
import { Label } from "/ui/label"
import { Switch } from "/ui/switch"
import { useAdmin } from "./admin-context"

export function SettingsDashboard() {
  const { hasPermission, currentRole } = useAdmin()
  const canEditSettings = hasPermission("settings", "edit")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="admins">Admin Users</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your platform's general settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input id="company-name" defaultValue="Financial Admin" disabled={!canEditSettings} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="support-email">Support Email</Label>
                <Input
                  id="support-email"
                  type="email"
                  defaultValue="support@financialadmin.com"
                  disabled={!canEditSettings}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Default Timezone</Label>
                <select
                  id="timezone"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="UTC"
                  disabled={!canEditSettings}
                >
                  <option value="UTC">UTC</option>
                  <option value="EST">Eastern Standard Time (EST)</option>
                  <option value="CST">Central Standard Time (CST)</option>
                  <option value="PST">Pacific Standard Time (PST)</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="maintenance-mode" disabled={!canEditSettings} />
                <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={!canEditSettings}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Regional Settings</CardTitle>
              <CardDescription>Configure regional settings for your platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="default-currency">Default Currency</Label>
                <select
                  id="default-currency"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="USD"
                  disabled={!canEditSettings}
                >
                  <option value="USD">US Dollar (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                  <option value="GBP">British Pound (GBP)</option>
                  <option value="JPY">Japanese Yen (JPY)</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date-format">Date Format</Label>
                <select
                  id="date-format"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="MM/DD/YYYY"
                  disabled={!canEditSettings}
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="enable-localization" defaultChecked disabled={!canEditSettings} />
                <Label htmlFor="enable-localization">Enable Localization</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={!canEditSettings}>
                <Globe className="mr-2 h-4 w-4" />
                Save Regional Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security settings for your platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Input id="session-timeout" type="number" defaultValue="30" disabled={!canEditSettings} />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="require-2fa" defaultChecked disabled={!canEditSettings} />
                <Label htmlFor="require-2fa">Require Two-Factor Authentication</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="ip-restriction" disabled={!canEditSettings} />
                <Label htmlFor="ip-restriction">Enable IP Restrictions</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-policy">Password Policy</Label>
                <select
                  id="password-policy"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="strong"
                  disabled={!canEditSettings}
                >
                  <option value="basic">Basic (8+ characters)</option>
                  <option value="medium">Medium (8+ chars, letters & numbers)</option>
                  <option value="strong">Strong (8+ chars, uppercase, lowercase, numbers)</option>
                  <option value="very-strong">Very Strong (12+ chars, uppercase, lowercase, numbers, symbols)</option>
                </select>
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={!canEditSettings}>
                <Shield className="mr-2 h-4 w-4" />
                Save Security Settings
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Compliance Settings</CardTitle>
              <CardDescription>Configure compliance settings for your platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="kyc-required" defaultChecked disabled={!canEditSettings} />
                <Label htmlFor="kyc-required">Require KYC Verification</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="aml-screening" defaultChecked disabled={!canEditSettings} />
                <Label htmlFor="aml-screening">Enable AML Screening</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="transaction-monitoring">Transaction Monitoring Level</Label>
                <select
                  id="transaction-monitoring"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="enhanced"
                  disabled={!canEditSettings}
                >
                  <option value="basic">Basic</option>
                  <option value="standard">Standard</option>
                  <option value="enhanced">Enhanced</option>
                </select>
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={!canEditSettings}>
                <Lock className="mr-2 h-4 w-4" />
                Save Compliance Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure notification settings for your platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="email-notifications" defaultChecked disabled={!canEditSettings} />
                <Label htmlFor="email-notifications">Email Notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="sms-notifications" disabled={!canEditSettings} />
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="push-notifications" defaultChecked disabled={!canEditSettings} />
                <Label htmlFor="push-notifications">Push Notifications</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notification-events">Notification Events</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="notify-login" defaultChecked disabled={!canEditSettings} />
                    <Label htmlFor="notify-login">New Login</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="notify-transaction" defaultChecked disabled={!canEditSettings} />
                    <Label htmlFor="notify-transaction">New Transaction</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="notify-kyc" defaultChecked disabled={!canEditSettings} />
                    <Label htmlFor="notify-kyc">KYC Status Change</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="notify-support" defaultChecked disabled={!canEditSettings} />
                    <Label htmlFor="notify-support">Support Ticket Update</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={!canEditSettings}>
                <Bell className="mr-2 h-4 w-4" />
                Save Notification Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Settings</CardTitle>
              <CardDescription>Manage API keys and settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex space-x-2">
                  <Input id="api-key" defaultValue="sk_live_51NzQjKLkdIeifnMa9XgvFdJq7Xt5jGRmN8hTzU" disabled />
                  <Button variant="outline" disabled={!canEditSettings}>
                    Regenerate
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input id="webhook-url" defaultValue="https://example.com/webhook" disabled={!canEditSettings} />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="enable-api" defaultChecked disabled={!canEditSettings} />
                <Label htmlFor="enable-api">Enable API Access</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="api-rate-limit">API Rate Limit (requests per minute)</Label>
                <Input id="api-rate-limit" type="number" defaultValue="100" disabled={!canEditSettings} />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={!canEditSettings}>
                <CreditCard className="mr-2 h-4 w-4" />
                Save API Settings
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Webhook Events</CardTitle>
              <CardDescription>Configure which events trigger webhooks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch id="webhook-transaction" defaultChecked disabled={!canEditSettings} />
                  <Label htmlFor="webhook-transaction">Transaction Events</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="webhook-user" defaultChecked disabled={!canEditSettings} />
                  <Label htmlFor="webhook-user">User Events</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="webhook-wallet" defaultChecked disabled={!canEditSettings} />
                  <Label htmlFor="webhook-wallet">Wallet Events</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="webhook-kyc" defaultChecked disabled={!canEditSettings} />
                  <Label htmlFor="webhook-kyc">KYC Events</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={!canEditSettings}>
                <Save className="mr-2 h-4 w-4" />
                Save Webhook Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="admins" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Admin Users</CardTitle>
              <CardDescription>Manage admin users and permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-end">
                <Button disabled={!hasPermission("admins", "create")}>
                  <User className="mr-2 h-4 w-4" />
                  Invite Admin
                </Button>
              </div>
              <div className="rounded-md border">
                <div className="grid grid-cols-5 p-4 font-medium">
                  <div>Name</div>
                  <div>Email</div>
                  <div>Role</div>
                  <div>Status</div>
                  <div>Actions</div>
                </div>
                <div className="divide-y">
                  <div className="grid grid-cols-5 items-center p-4">
                    <div>John Admin</div>
                    <div>john@example.com</div>
                    <div>Super Admin</div>
                    <div>
                      <Badge variant="success">Active</Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" disabled={!hasPermission("admins", "edit")}>
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" disabled={!hasPermission("admins", "delete")}>
                        Delete
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 items-center p-4">
                    <div>Jane Compliance</div>
                    <div>jane@example.com</div>
                    <div>Compliance Admin</div>
                    <div>
                      <Badge variant="success">Active</Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" disabled={!hasPermission("admins", "edit")}>
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" disabled={!hasPermission("admins", "delete")}>
                        Delete
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 items-center p-4">
                    <div>Bob Support</div>
                    <div>bob@example.com</div>
                    <div>Support Admin</div>
                    <div>
                      <Badge variant="success">Active</Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" disabled={!hasPermission("admins", "edit")}>
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" disabled={!hasPermission("admins", "delete")}>
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
              <CardDescription>Configure permissions for each admin role</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role-select">Select Role</Label>
                <select
                  id="role-select"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="super_admin"
                  disabled={!hasPermission("admins", "edit")}
                >
                  <option value="super_admin">Super Admin</option>
                  <option value="compliance_admin">Compliance Admin</option>
                  <option value="support_admin">Support Admin</option>
                  <option value="finance_admin">Finance Admin</option>
                  <option value="readonly_admin">Read-Only Admin</option>
                </select>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">User Management</h3>
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="perm-users-view" defaultChecked disabled={!hasPermission("admins", "edit")} />
                      <Label htmlFor="perm-users-view">View</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="perm-users-create" defaultChecked disabled={!hasPermission("admins", "edit")} />
                      <Label htmlFor="perm-users-create">Create</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="perm-users-edit" defaultChecked disabled={!hasPermission("admins", "edit")} />
                      <Label htmlFor="perm-users-edit">Edit</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="perm-users-delete" defaultChecked disabled={!hasPermission("admins", "edit")} />
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
        </TabsContent>
      </Tabs>
    </div>
  )
}
