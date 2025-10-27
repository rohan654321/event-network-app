"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ThumbsUp, Send, MessageSquare, Pin, Eye } from "lucide-react"

interface Question {
  id: string
  author: string
  avatar: string
  content: string
  timestamp: string
  upvotes: number
  userUpvoted?: boolean
  answers: number
  isPinned?: boolean
  views: number
}

interface LiveQAProps {
  questions: Question[]
  onAskQuestion?: (question: string) => void
  onUpvote?: (questionId: string) => void
  onPin?: (questionId: string) => void
}

export function LiveQA({ questions, onAskQuestion, onUpvote, onPin }: LiveQAProps) {
  const [newQuestion, setNewQuestion] = useState("")
  const [sortBy, setSortBy] = useState<"recent" | "popular" | "unanswered">("popular")

  const handleAsk = () => {
    if (newQuestion.trim()) {
      onAskQuestion?.(newQuestion)
      setNewQuestion("")
    }
  }

  const sortedQuestions = [...questions].sort((a, b) => {
    if (sortBy === "popular") return b.upvotes - a.upvotes
    if (sortBy === "unanswered") return b.answers - a.answers
    return 0
  })

  const pinnedQuestions = sortedQuestions.filter((q) => q.isPinned)
  const regularQuestions = sortedQuestions.filter((q) => !q.isPinned)

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Live Q&A</CardTitle>
          <CardDescription>Ask questions and get answers from speakers and organizers</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Ask a question..."
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAsk()}
            />
            <Button onClick={handleAsk} className="gap-2">
              <Send className="w-4 h-4" />
              Ask
            </Button>
          </div>

          <div className="flex gap-2">
            {(["recent", "popular", "unanswered"] as const).map((sort) => (
              <Button
                key={sort}
                size="sm"
                variant={sortBy === sort ? "default" : "outline"}
                onClick={() => setSortBy(sort)}
                className="capitalize"
              >
                {sort}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <ScrollArea className="h-[500px]">
        <div className="space-y-3 pr-4">
          <AnimatePresence>
            {pinnedQuestions.map((question) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="border-primary/50 bg-primary/5">
                  <CardContent className="pt-4">
                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarImage src={question.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{question.author.charAt(0)}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-sm">{question.author}</p>
                          <span className="text-xs text-muted-foreground">{question.timestamp}</span>
                          <Badge variant="secondary" className="text-xs gap-1">
                            <Pin className="w-3 h-3" />
                            Pinned
                          </Badge>
                        </div>

                        <p className="text-sm text-foreground mb-3">{question.content}</p>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 px-2 gap-1"
                            onClick={() => onUpvote?.(question.id)}
                          >
                            <ThumbsUp className={`w-3 h-3 ${question.userUpvoted ? "fill-current" : ""}`} />
                            {question.upvotes}
                          </Button>

                          <div className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            {question.answers} answers
                          </div>

                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {question.views} views
                          </div>

                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 px-2 gap-1 ml-auto"
                            onClick={() => onPin?.(question.id)}
                          >
                            <Pin className="w-3 h-3" />
                            Unpin
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {regularQuestions.map((question) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarImage src={question.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{question.author.charAt(0)}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-sm">{question.author}</p>
                          <span className="text-xs text-muted-foreground">{question.timestamp}</span>
                        </div>

                        <p className="text-sm text-foreground mb-3">{question.content}</p>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 px-2 gap-1"
                            onClick={() => onUpvote?.(question.id)}
                          >
                            <ThumbsUp className={`w-3 h-3 ${question.userUpvoted ? "fill-current" : ""}`} />
                            {question.upvotes}
                          </Button>

                          <div className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            {question.answers} answers
                          </div>

                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {question.views} views
                          </div>

                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 px-2 gap-1 ml-auto"
                            onClick={() => onPin?.(question.id)}
                          >
                            <Pin className="w-3 h-3" />
                            Pin
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </ScrollArea>
    </div>
  )
}
