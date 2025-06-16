"use client"

import { useState } from "react"
import { Search, Clock, FileText, Edit3, Eye } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { AdminHeader } from "../../components/layout/AdminHeader"
import { useAdmin } from "../../contexts/AdminContext"
import { Badge } from "../../components/ui/badge"
import DataTable from "../../components/common/DataTable"
import StatCard from "../../components/common/StatCard"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog"

const articles = [
  {
    id: "KB-101",
    title: "How to reset your password",
    author: "Admin Team",
    category: "Account",
    status: "Published",
    createdAt: "2024-04-18 09:30 AM",
  },
  {
    id: "KB-102",
    title: "Understanding transaction statuses",
    author: "Support Team",
    category: "Transactions",
    status: "Draft",
    createdAt: "2024-04-20 11:15 AM",
  },
  {
    id: "KB-103",
    title: "Getting started with virtual cards",
    author: "Product Team",
    category: "Cards",
    status: "Published",
    createdAt: "2024-04-19 08:00 AM",
  },
]

const KnowledgeBasePage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { hasPermission } = useAdmin()

  const getStatusBadge = (status) => {
    const styles = {
      Published: "border-green-200 bg-green-50 text-green-700",
      Draft: "border-yellow-200 bg-yellow-50 text-yellow-700",
      Archived: "border-gray-200 bg-gray-50 text-gray-700",
    }

    return (
      <Badge variant="outline" className={styles[status] || ""}>
        {status}
      </Badge>
    )
  }

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const columns = [
    {
      key: "id",
      header: "ARTICLE ID",
      render: (row) => <span className="font-medium">{row.id}</span>,
    },
    {
      key: "title",
      header: "TITLE",
    },
    {
      key: "author",
      header: "AUTHOR",
    },
    {
      key: "category",
      header: "CATEGORY",
    },
    {
      key: "status",
      header: "STATUS",
      render: (row) => getStatusBadge(row.status),
    },
    {
      key: "createdAt",
      header: "CREATED",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          {row.createdAt}
        </div>
      ),
    },
    {
      key: "actions",
      header: "ACTIONS",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedArticle(row)
              setDialogOpen(true)
            }}
          >
            <Eye className="mr-1 h-4 w-4" />
            View
          </Button>
          {hasPermission("editKnowledgeBase") && (
            <Button variant="ghost" size="sm">
              <Edit3 className="mr-1 h-4 w-4" />
              Edit
            </Button>
          )}
        </div>
      ),
    },
  ]

  return (
    <div className="flex flex-col">
      <header className="border-b">
              <div className="flex h-16 items-center px-4 gap-4">
                <h1 className="text-xl font-semibold">Knowledge Base</h1>
                <span className="text-sm text-muted-foreground">Manage and maintain help center articles</span>
                <div className="ml-auto flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search support..."
                      className="w-[250px] pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button>Export</Button>
                </div>
              </div>
      </header>

      <main className="flex-1 p-4 md:p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard title="Published Articles" value="128" subtitle="Up 10 this week" trend="up" />
          <StatCard title="Drafts" value="12" subtitle="Pending review" />
          <StatCard title="Categories" value="8" subtitle="All organized" />
          <StatCard title="Avg. Read Time" value="3 min" subtitle="Based on article content" />
        </div>

        <div className="flex items-center justify-between">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search articles..."
              className="w-[300px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {hasPermission("createKnowledgeBase") && <Button>Create New Article</Button>}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="published">Published</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
                <DataTable columns={columns} data={filteredArticles} />
              </TabsContent>
              <TabsContent value="published" className="mt-4">
                <DataTable
                  columns={columns}
                  data={filteredArticles.filter((a) => a.status === "Published")}
                />
              </TabsContent>
              <TabsContent value="draft" className="mt-4">
                <DataTable
                  columns={columns}
                  data={filteredArticles.filter((a) => a.status === "Draft")}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>

      {/* View Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          {selectedArticle && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedArticle.title}</DialogTitle>
                <DialogDescription>
                  ID: {selectedArticle.id} • Status: {selectedArticle.status}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-2 text-sm">
                <p><strong>Author:</strong> {selectedArticle.author}</p>
                <p><strong>Category:</strong> {selectedArticle.category}</p>
                <p><strong>Created:</strong> {selectedArticle.createdAt}</p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default KnowledgeBasePage
