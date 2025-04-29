"use client"

import { useState } from "react"
import { Search, FileText } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "/ui/tabs"
import { Input } from "/ui/input"
import { Button } from "/ui/button"
import { Badge } from "/ui/badge"
import DataTable from "../common/DataTable"
import Pagination from "../common/Pagination"
import { useAdmin } from "../admin-context"

export function KnowledgeBaseTable() {
  const { hasPermission } = useAdmin()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)

  const articles = [
    {
      id: "KB-001",
      title: "How to reset your password",
      category: "account",
      status: "published",
      date: "2023-06-01",
    },
    {
      id: "KB-002",
      title: "Understanding your transaction history",
      category: "transactions",
      status: "draft",
      date: "2023-05-28",
    },
    {
      id: "KB-003",
      title: "How to verify your identity (KYC)",
      category: "kyc",
      status: "published",
      date: "2023-05-15",
    },
    {
      id: "KB-004",
      title: "How to fund your wallet",
      category: "wallet",
      status: "archived",
      date: "2023-04-20",
    },
    {
      id: "KB-005",
      title: "Common payment errors and solutions",
      category: "payment",
      status: "published",
      date: "2023-04-10",
    },
  ]

  const filteredArticles = articles.filter(
    (a) =>
      a.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredArticles.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const columns = [
    { header: "ID", accessorKey: "id" },
    { header: "Title", accessorKey: "title" },
    { header: "Category", accessorKey: "category" },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.original.status
        const badgeMap = {
          published: "success",
          draft: "warning",
          archived: "outline",
        }

        return <Badge variant={badgeMap[status] || "outline"}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
      },
    },
    { header: "Date", accessorKey: "date" },
    {
      header: "Actions",
      cell: ({ row }) => {
        const canEdit = hasPermission("knowledge_base", "edit")
        return (
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              View
            </Button>
            <Button variant="outline" size="sm" disabled={!canEdit}>
              Edit
            </Button>
          </div>
        )
      },
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Knowledge Base</CardTitle>
        <CardDescription>Manage FAQs and help articles for your users</CardDescription>
        <div className="flex flex-col gap-4 pt-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm" className="gap-1">
            <FileText className="h-4 w-4" />
            Add Article
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <DataTable columns={columns} data={currentItems} />
            <Pagination
              totalItems={filteredArticles.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={paginate}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
