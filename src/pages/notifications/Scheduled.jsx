import { useState } from "react";
import { Filter, MoreHorizontal, Search, Send, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Switch } from "../../components/ui/switch";
import { AdminHeader } from "../../components/layout/AdminHeader";
import { useAdmin } from "../../contexts/AdminContext";
import { Breadcrumb } from "../../components/common/Breadcrumb";
import { ButtonLoader } from "../../components/ui/loader";
import { FormModal } from "../../components/ui/modal";

const notifications = [
  {
    id: 1,
    title: "System Maintenance",
    message:
      "The system will be down for maintenance on Sunday, May 5th from 2:00 AM to 4:00 AM UTC.",
    type: "System",
    status: "Scheduled",
    date: "2024-05-01 10:30 AM",
    sentTo: "All Users",
  },
  {
    id: 2,
    title: "New Feature: Virtual Cards",
    message:
      "We've launched virtual cards! Users can now create and manage virtual cards for online payments.",
    type: "Feature",
    status: "Sent",
    date: "2024-04-28 09:15 AM",
    sentTo: "All Users",
  },
  {
    id: 3,
    title: "Security Alert: Update Your Password",
    message:
      "As a security measure, we recommend updating your password regularly.",
    type: "Security",
    status: "Sent",
    date: "2024-04-25 14:45 PM",
    sentTo: "All Users",
  },
  {
    id: 4,
    title: "Transaction Limit Increase",
    message: "Your daily transaction limit has been increased to $10,000.",
    type: "Account",
    status: "Sent",
    date: "2024-04-20 11:30 AM",
    sentTo: "Premium Users",
  },
  {
    id: 5,
    title: "Welcome to Payina!",
    message: "Welcome to Payina! We're excited to have you on board.",
    type: "Onboarding",
    status: "Draft",
    date: "2024-04-18 16:20 PM",
    sentTo: "New Users",
  },
];

const Scheduled = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "",
    audience: "all",
  });

  const { hasPermission } = useAdmin();

  const breadcrumbItems = [{ label: "Notifications", href: "/notifications" }];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsModalOpen(false);

      // Reset form
      setFormData({
        title: "",
        message: "",
        type: "",
        audience: "all",
      });
    }, 1500);
  };

  if (!hasPermission("sendPushNotifications")) {
    return (
      <div className="flex flex-col">
        <AdminHeader
          title="Notifications"
          subtitle="Manage system notifications"
        />
        <main className="flex-1 p-4 md:p-6">
          <Breadcrumb items={breadcrumbItems} />
          <div className="mt-6 rounded-md bg-yellow-50 p-4 text-yellow-700">
            You don't have permission to access this page. Please contact a
            Super Admin for assistance.
          </div>
        </main>
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      <main className="flex-1 p-4 md:p-6 space-y-6">
        <Breadcrumb items={breadcrumbItems} />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search notifications..."
              className="pl-8 w-full md:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2 w-full md:w-auto cursor-pointer">
            <Button variant="outline" className="w-full md:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button
              className="w-full md:w-auto cursor-pointer"
              onClick={() => setIsModalOpen(true)}>
              <Send className="mr-2 h-4 w-4" />
              Create Scheduled Notification
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="sent">Sent</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>All Scheduled Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                          Title
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                          Type
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                          Date
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                          Audience
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {notifications.map((notification) => (
                        <tr key={notification.id} className="border-b">
                          <td className="px-4 py-3 text-sm">
                            <div>
                              <div className="font-medium">
                                {notification.title}
                              </div>
                              <div className="text-xs text-gray-500 truncate max-w-[200px]">
                                {notification.message}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {notification.type}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                notification.status === "Sent"
                                  ? "bg-green-100 text-green-800"
                                  : notification.status === "Scheduled"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}>
                              {notification.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {notification.date}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {notification.sentTo}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex items-center gap-2">
                              {/* <Button
                                onClick={() => {
                                  setView(true);
                                  setSelectedNotification(notification);
                                }}
                                variant="ghost"
                                size="sm">
                                View
                              </Button>
                              {notification.status === "Draft" && (
                                <Button variant="ghost" size="sm">
                                  Edit
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600">
                                <Trash2 className="h-4 w-4" />
                              </Button> */}
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4 cursor-pointer" />
                                    <span className="sr-only">Open menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="absolute right-0 mt-2 min-w-[150px] bg-black border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden ">
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setView(true);
                                      setSelectedNotification(notification);
                                    }}
                                    className="hover:bg-[#3A859E]">
                                    View
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setEdit(true);
                                      setFormData(notification);
                                    }}
                                    className="hover:bg-green-400">
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="hover:bg-[#3A859E]">
                                    Delete
                                    <Trash2 className="h-4 w-4 text-red-600 ml-2" />
                                  </DropdownMenuItem>
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
          </TabsContent>

          <TabsContent value="sent" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Sent Scheduled Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                          Title
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                          Type
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                          Date
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                          Audience
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {notifications
                        .filter(
                          (notification) => notification.status === "Sent"
                        )
                        .map((notification) => (
                          <tr key={notification.id} className="border-b">
                            <td className="px-4 py-3 text-sm">
                              <div>
                                <div className="font-medium">
                                  {notification.title}
                                </div>
                                <div className="text-xs text-gray-500 truncate max-w-[200px]">
                                  {notification.message}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {notification.type}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {notification.date}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {notification.sentTo}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <div className="flex items-center gap-2">
                                {/* <Button variant="ghost" size="sm">
                                  View
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-600">
                                  <Trash2 className="h-4 w-4" />
                                </Button> */}
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4 cursor-pointer" />
                                      <span className="sr-only">Open menu</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent className="absolute right-0 mt-2 min-w-[150px] bg-black border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden ">
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setView(true);
                                        setSelectedNotification(notification);
                                      }}
                                      className="hover:bg-[#3A859E]">
                                      View
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setEdit(true);
                                        setSelectedNotification(notification);
                                      }}
                                      className="hover:bg-green-400">
                                      Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="hover:bg-[#3A859E]">
                                      Delete
                                      <Trash2 className="h-4 w-4 text-red-600 ml-2" />
                                    </DropdownMenuItem>
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
          </TabsContent>

          <TabsContent value="scheduled" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                          Title
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                          Type
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                          Date
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                          Audience
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {notifications
                        .filter(
                          (notification) => notification.status === "Scheduled"
                        )
                        .map((notification) => (
                          <tr key={notification.id} className="border-b">
                            <td className="px-4 py-3 text-sm">
                              <div>
                                <div className="font-medium">
                                  {notification.title}
                                </div>
                                <div className="text-xs text-gray-500 truncate max-w-[200px]">
                                  {notification.message}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {notification.type}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {notification.date}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {notification.sentTo}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <div className="flex items-center gap-2">
                                {/* <Button variant="ghost" size="sm">
                                  View
                                </Button>
                                <Button variant="ghost" size="sm">
                                  Edit
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-600">
                                  Cancel
                                </Button> */}
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4 cursor-pointer" />
                                      <span className="sr-only">Open menu</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent className="absolute right-0 mt-2 min-w-[150px] bg-black border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden ">
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setView(true);
                                        setSelectedNotification(notification);
                                      }}
                                      className="hover:bg-[#3A859E]">
                                      View
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setEdit(true);
                                        setSelectedNotification(notification);
                                      }}
                                      className="hover:bg-green-400">
                                      Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="hover:bg-[#3A859E]">
                                      Delete
                                      <Trash2 className="h-4 w-4 text-red-600 ml-2" />
                                    </DropdownMenuItem>
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
          </TabsContent>

          <TabsContent value="draft" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Draft Scheduled Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                          Title
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                          Type
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                          Date
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                          Audience
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {notifications
                        .filter(
                          (notification) => notification.status === "Draft"
                        )
                        .map((notification) => (
                          <tr key={notification.id} className="border-b">
                            <td className="px-4 py-3 text-sm">
                              <div>
                                <div className="font-medium">
                                  {notification.title}
                                </div>
                                <div className="text-xs text-gray-500 truncate max-w-[200px]">
                                  {notification.message}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {notification.type}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {notification.date}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {notification.sentTo}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <div className="flex items-center gap-2">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4 cursor-pointer" />
                                      <span className="sr-only">Open menu</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent className="absolute right-0 mt-2 min-w-[150px] bg-black border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden ">
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setView(true);
                                        setSelectedNotification(notification);
                                      }}
                                      className="hover:bg-[#3A859E]">
                                      View
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="hover:bg-green-400">
                                      Send
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="hover:bg-[#3A859E]">
                                      Delete
                                      <Trash2 className="h-4 w-4 text-red-600 ml-2" />
                                    </DropdownMenuItem>
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
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">
                    System Maintenance Notifications
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Send notifications for scheduled maintenance
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">New Feature Announcements</h3>
                  <p className="text-sm text-muted-foreground">
                    Send notifications for new features
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Security Alerts</h3>
                  <p className="text-sm text-muted-foreground">
                    Send notifications for security alerts
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Marketing Notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    Send marketing notifications to users
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Notification"
        description="Create a Scheduled notification">
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Notification Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter notification title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Notification Message</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Enter notification message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Notification Type</Label>
              <Select
                name="type"
                value={formData.type}
                onValueChange={(value) => handleSelectChange("type", value)}
                required>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="System">System</SelectItem>
                  <SelectItem value="Feature">Feature</SelectItem>
                  <SelectItem value="Security">Security</SelectItem>
                  <SelectItem value="Account">Account</SelectItem>
                  <SelectItem value="Onboarding">Onboarding</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="audience">Target Audience</Label>
              <Select
                name="audience"
                value={formData.audience}
                onValueChange={(value) => handleSelectChange("audience", value)}
                required>
                <SelectTrigger id="audience">
                  <SelectValue placeholder="Select audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="new">New Users</SelectItem>
                  <SelectItem value="premium">Premium Users</SelectItem>
                  <SelectItem value="business">Business Users</SelectItem>
                  <SelectItem value="inactive">Inactive Users</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Notification date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                placeholder="Enter notification date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Notification time</Label>
              <Input
                id="time"
                name="time"
                type="time"
                placeholder="Enter notification time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <ButtonLoader />}
              Send Notification
            </Button>
          </div>
        </form>
      </FormModal>

      <FormModal
        isOpen={view}
        onClose={() => setView(false)}
        title="View Notification"
        description="">
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Notification Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter notification title"
              value={selectedNotification?.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Notification Message</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Enter notification message"
              rows={4}
              value={selectedNotification?.message}
              onChange={handleChange}
              required
            />
          </div>
        </form>
      </FormModal>

      <FormModal
        isOpen={edit}
        onClose={() => setEdit(false)}
        title="Create Notification"
        description="Create a Scheduled notification">
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Notification Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter notification title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Notification Message</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Enter notification message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Notification Type</Label>
              <Select
                name="type"
                value={formData.type}
                onValueChange={(value) => handleSelectChange("type", value)}
                required>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="System">System</SelectItem>
                  <SelectItem value="Feature">Feature</SelectItem>
                  <SelectItem value="Security">Security</SelectItem>
                  <SelectItem value="Account">Account</SelectItem>
                  <SelectItem value="Onboarding">Onboarding</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="audience">Target Audience</Label>
              <Select
                name="audience"
                value={formData.audience}
                onValueChange={(value) => handleSelectChange("audience", value)}
                required>
                <SelectTrigger id="audience">
                  <SelectValue placeholder="Select audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="new">New Users</SelectItem>
                  <SelectItem value="premium">Premium Users</SelectItem>
                  <SelectItem value="business">Business Users</SelectItem>
                  <SelectItem value="inactive">Inactive Users</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Notification date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                placeholder="Enter notification date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Notification time</Label>
              <Input
                id="time"
                name="time"
                type="time"
                placeholder="Enter notification time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <ButtonLoader />}
              Send Notification
            </Button>
          </div>
        </form>
      </FormModal>
    </div>
  );
};

export default Scheduled;
