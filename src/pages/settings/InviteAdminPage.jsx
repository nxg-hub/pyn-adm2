"use client"

import { useState } from "react"
import { Mail, UserPlus } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { ButtonLoader } from "../../components/ui/loader"
import { useAdmin } from "../../contexts/AdminContext"
import {AdminHeader} from "../../components/layout/AdminHeader"
import {Breadcrumb} from "../../components/common/Breadcrumb"
import { FormModal } from "../../components/ui/modal"

const InviteAdminPage = () => {
  const { currentRole, hasPermission, allRoles } = useAdmin()
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [invitedAdmins, setInvitedAdmins] = useState([
    {
      id: 1,
      email: "john.doe@example.com",
      role: "Operations Manager",
      status: "Pending",
      invitedAt: "2024-04-25 10:30 AM",
    },
    {
      id: 2,
      email: "jane.smith@example.com",
      role: "Finance Manager",
      status: "Accepted",
      invitedAt: "2024-04-24 09:15 AM",
    },
    {
      id: 3,
      email: "robert.johnson@example.com",
      role: "Customer Care Rep",
      status: "Expired",
      invitedAt: "2024-04-20 14:45 PM",
    },
  ])

  const [formData, setFormData] = useState({
    email: "",
    role: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (value) => {
    setFormData((prev) => ({ ...prev, role: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)

      // Add the new invitation to the list
      const newInvitation = {
        id: invitedAdmins.length + 1,
        email: formData.email,
        role: formData.role,
        status: "Pending",
        invitedAt: new Date().toLocaleString(),
      }

      setInvitedAdmins([newInvitation, ...invitedAdmins])

      // Reset form
      setFormData({
        email: "",
        role: "",
      })

      // Close modal
      setIsModalOpen(false)

      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 3000)
    }, 1500)
  }

  const breadcrumbItems = [
    { label: "Settings", href: "/settings" },
    { label: "Admin Management", href: "/settings/admins" },
  ]

  if (!hasPermission("manageAdmins")) {
    return (
      <div className="flex flex-col">
        <AdminHeader title="Admin Management" subtitle="Manage admin users and permissions" />
        <main className="flex-1 p-4 md:p-6">
          <Breadcrumb items={breadcrumbItems} />
          <div className="mt-6 rounded-md bg-yellow-50 p-4 text-yellow-700">
            You don't have permission to access this page. Please contact a Super Admin for assistance.
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <AdminHeader title="Admin Management" subtitle="Manage admin users and permissions" />

      <main className="flex-1 p-4 md:p-6 space-y-6">
        <Breadcrumb items={breadcrumbItems} />

        {isSuccess && (
          <div className="rounded-md bg-green-50 p-4 text-green-700">
            Invitation sent successfully! The admin will receive an email with instructions.
          </div>
        )}

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Admin Invitations</h2>
          <Button onClick={() => setIsModalOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Invite Admin
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Pending Invitations</CardTitle>
            <CardDescription>Manage invitations sent to new admin users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Role</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Invited At</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invitedAdmins.map((admin) => (
                    <tr key={admin.id} className="border-b">
                      <td className="px-4 py-3 text-sm">{admin.email}</td>
                      <td className="px-4 py-3 text-sm">{admin.role}</td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            admin.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : admin.status === "Accepted"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {admin.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">{admin.invitedAt}</td>
                      <td className="px-4 py-3 text-sm">
                        {admin.status === "Pending" && (
                          <Button variant="ghost" size="sm">
                            Resend
                          </Button>
                        )}
                        {admin.status === "Expired" && (
                          <Button variant="ghost" size="sm">
                            Resend
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" className="text-red-600">
                          Cancel
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Invite New Admin"
        description="Send an invitation to a new admin user"
      >
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@example.com"
                className="pl-10"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Admin Role</Label>
            <Select value={formData.role} onValueChange={handleRoleChange} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {allRoles
                  .filter((role) => role !== "Super Admin" || currentRole === "Super Admin")
                  .map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4 flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <ButtonLoader />}
              Send Invitation
            </Button>
          </div>
        </form>
      </FormModal>
    </div>
  )
}

export default InviteAdminPage
