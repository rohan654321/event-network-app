"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Paperclip, Smile, Reply, MessageCircle, Search, MoreVertical, FileText, ImageIcon } from "lucide-react"

interface ChatMessage {
  id: string
  author: string
  avatar: string
  content: string
  timestamp: string
  reactions: Array<{ emoji: string; count: number; userReacted: boolean }>
  replies: number
  attachments?: Array<{ type: "image" | "file"; name: string; url: string }>
  isThread?: boolean
}

interface AdvancedChatProps {
  messages: ChatMessage[]
  onSendMessage?: (message: string) => void
  onReply?: (messageId: string) => void
  onReact?: (messageId: string, emoji: string) => void
}

const REACTION_EMOJIS = ["👍", "❤️", "😂", "😮", "😢", "🔥"]

export function AdvancedChat({ messages, onSendMessage, onReply, onReact }: AdvancedChatProps) {
  const [newMessage, setNewMessage] = useState("")
  const [selectedThread, setSelectedThread] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showReactions, setShowReactions] = useState<string | null>(null)

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage?.(newMessage)
      setNewMessage("")
    }
  }

  const filteredMessages = messages.filter(
    (msg) =>
      msg.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.author.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[600px]">
      <Card className="lg:col-span-3 flex flex-col">
        <CardHeader className="pb-3 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Event Discussion</CardTitle>
            <div className="relative w-48">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                className="pl-8 h-8 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            {filteredMessages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="group"
              >
                <div className="flex gap-3 hover:bg-muted/50 p-2 rounded-lg transition-colors">
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarImage src={message.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{message.author.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm">{message.author}</p>
                      <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                      {message.isThread && (
                        <Badge variant="secondary" className="text-xs">
                          Thread
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-foreground mt-1 wrap-break-word">{message.content}</p>

                    {message.attachments && message.attachments.length > 0 && (
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {message.attachments.map((att, idx) => (
                          <div key={idx} className="flex items-center gap-1 px-2 py-1 bg-muted rounded text-xs">
                            {att.type === "image" ? (
                              <ImageIcon className="w-3 h-3" />
                            ) : (
                              <FileText className="w-3 h-3" />
                            )}
                            {att.name}
                          </div>
                        ))}
                      </div>
                    )}

                    {message.reactions.length > 0 && (
                      <div className="flex gap-1 mt-2 flex-wrap">
                        {message.reactions.map((reaction) => (
                          <button
                            key={reaction.emoji}
                            className={`px-2 py-1 rounded text-xs flex items-center gap-1 transition-colors ${
                              reaction.userReacted
                                ? "bg-primary/20 border border-primary"
                                : "bg-muted hover:bg-muted/80"
                            }`}
                            onClick={() => onReact?.(message.id, reaction.emoji)}
                          >
                            {reaction.emoji} {reaction.count}
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 px-2 text-xs gap-1"
                        onClick={() => setShowReactions(showReactions === message.id ? null : message.id)}
                      >
                        <Smile className="w-3 h-3" />
                        React
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 px-2 text-xs gap-1"
                        onClick={() => {
                          setSelectedThread(message.id)
                          onReply?.(message.id)
                        }}
                      >
                        <Reply className="w-3 h-3" />
                        Reply
                      </Button>
                      {message.replies > 0 && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 px-2 text-xs gap-1"
                          onClick={() => setSelectedThread(message.id)}
                        >
                          <MessageCircle className="w-3 h-3" />
                          {message.replies} replies
                        </Button>
                      )}
                    </div>

                    <AnimatePresence>
                      {showReactions === message.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex gap-1 mt-2 p-2 bg-muted rounded flex-wrap"
                        >
                          {REACTION_EMOJIS.map((emoji) => (
                            <button
                              key={emoji}
                              className="hover:bg-background p-1 rounded transition-colors"
                              onClick={() => {
                                onReact?.(message.id, emoji)
                                setShowReactions(null)
                              }}
                            >
                              {emoji}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>

        <CardContent className="border-t pt-4 space-y-2">
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="flex-1"
            />
            <Button size="sm" variant="outline" className="px-2 bg-transparent">
              <Paperclip className="w-4 h-4" />
            </Button>
            <Button size="sm" onClick={handleSend} className="gap-2">
              <Send className="w-4 h-4" />
              Send
            </Button>
          </div>
        </CardContent>
      </Card>

      {selectedThread && (
        <Card className="flex flex-col">
          <CardHeader className="pb-3 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Thread</CardTitle>
              <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => setSelectedThread(null)}>
                ×
              </Button>
            </div>
          </CardHeader>

          <ScrollArea className="flex-1">
            <div className="p-3 space-y-3">
              {messages
                .filter((m) => m.id === selectedThread)
                .map((msg) => (
                  <div key={msg.id} className="text-xs">
                    <p className="font-semibold">{msg.author}</p>
                    <p className="text-muted-foreground mt-1">{msg.content}</p>
                  </div>
                ))}
            </div>
          </ScrollArea>

          <CardContent className="border-t pt-3 space-y-2">
            <Input placeholder="Reply in thread..." className="h-8 text-xs" />
            <Button size="sm" className="w-full">
              Reply
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
