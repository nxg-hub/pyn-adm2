"use client"

import { useState } from "react"
import { MessageSquare, Send, Clock, User } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Textarea } from "../../components/ui/textarea"
import { useAdmin } from "../../contexts/AdminContext"
import { Badge } from "../../components/ui/badge"

const chats = [
  {
    id: "CHAT-001",
    user: "John Doe",
    status: "Active",
    createdAt: "2024-04-22 09:00 AM",
    messages: [
      { from: "user", content: "Hi, I need help with a transaction." },
      { from: "agent", content: "Sure, can you share more details?" },
    ],
  },
  {
    id: "CHAT-002",
    user: "Emily Davis",
    status: "Resolved",
    createdAt: "2024-04-21 02:15 PM",
    messages: [
      { from: "user", content: "App crashed during payment." },
      { from: "agent", content: "We’ve fixed it. Can you try again?" },
      { from: "user", content: "It works now, thanks!" },
    ],
  },
]

const LiveChatPage = () => {
  const [activeChatId, setActiveChatId] = useState(null)
  const [newMessage, setNewMessage] = useState("")
  const { hasPermission } = useAdmin()

  const handleSendMessage = () => {
    if (activeChatId && newMessage.trim()) {
      console.log(`Sending message to ${activeChatId}: ${newMessage}`)
      setNewMessage("")
    }
  }

  const getStatusBadge = (status) => {
    const classes = {
      Active: "border-blue-200 bg-blue-50 text-blue-700",
      Resolved: "border-green-200 bg-green-50 text-green-700",
    }

    return (
      <Badge variant="outline" className={classes[status]}>
        {status}
      </Badge>
    )
  }

  const renderChatList = (filter) => {
    return chats
      .filter((chat) => filter === "all" || chat.status === filter)
      .map((chat) => (
        <div
          key={chat.id}
          className={`border rounded-lg p-3 mb-3 cursor-pointer hover:bg-muted ${
            activeChatId === chat.id ? "bg-muted" : ""
          }`}
          onClick={() => setActiveChatId(chat.id)}
        >
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <User className="h-4 w-4" />
              <span className="font-medium">{chat.user}</span>
            </div>
            {getStatusBadge(chat.status)}
          </div>
          <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
            <Clock className="h-3 w-3" />
            {chat.createdAt}
          </div>
        </div>
      ))
  }

  const activeChat = chats.find((chat) => chat.id === activeChatId)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Live Chats</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="Active">Active</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">{renderChatList("all")}</TabsContent>
            <TabsContent value="Active" className="mt-4">{renderChatList("Active")}</TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="col-span-2 flex flex-col">
        <CardHeader>
          <CardTitle>
            {activeChat ? `Chat with ${activeChat.user}` : "Select a chat"}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto max-h-[400px] space-y-3">
          {activeChat?.messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[70%] px-4 py-2 rounded-lg ${
                msg.from === "agent"
                  ? "bg-blue-600 text-white ml-auto"
                  : "bg-gray-200 text-black"
              }`}
            >
              <p className="text-sm">{msg.content}</p>
            </div>
          ))}
        </CardContent>
        {activeChat && (
          <div className="p-4 border-t flex items-center gap-2">
            <Textarea
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 min-h-[80px]"
            />
            <Button onClick={handleSendMessage} className="shrink-0">
              <Send className="h-4 w-4 mr-2" /> Send
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}

export default LiveChatPage
