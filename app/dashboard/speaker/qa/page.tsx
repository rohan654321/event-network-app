// app/dashboard/speaker/qa/page.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, ThumbsUp, Clock, CheckCircle, Plus, BarChart3 } from "lucide-react"

interface Question {
  id: string
  question: string
  asker: string
  timestamp: string
  likes: number
  answered: boolean
  session: string
}

interface Poll {
  id: string
  question: string
  options: string[]
  votes: number[]
  live: boolean
  session: string
  createdAt: string
}

export default function QAPage() {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      question: "Could you elaborate more on the machine learning models you mentioned?",
      asker: "Sarah Chen",
      timestamp: "2 hours ago",
      likes: 12,
      answered: true,
      session: "Keynote: Future of AI"
    },
    {
      id: "2",
      question: "What resources do you recommend for beginners in AI?",
      asker: "Mike Rodriguez",
      timestamp: "1 hour ago",
      likes: 8,
      answered: false,
      session: "Hands-on Workshop"
    }
  ])

  const [polls, setPolls] = useState<Poll[]>([
    {
      id: "1",
      question: "Which topic would you like for our next session?",
      options: ["Advanced ML", "AI Ethics", "Practical Applications", "Tools & Frameworks"],
      votes: [45, 23, 67, 34],
      live: true,
      session: "Keynote: Future of AI",
      createdAt: "2024-01-15"
    }
  ])

  const [newPoll, setNewPoll] = useState({
    question: "",
    options: [""]
  })

  const addPollOption = () => {
    setNewPoll(prev => ({
      ...prev,
      options: [...prev.options, ""]
    }))
  }

  const toggleAnswer = (questionId: string) => {
    setQuestions(questions.map(q =>
      q.id === questionId ? { ...q, answered: !q.answered } : q
    ))
  }

  const likeQuestion = (questionId: string) => {
    setQuestions(questions.map(q =>
      q.id === questionId ? { ...q, likes: q.likes + 1 } : q
    ))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Q&A & Polls</h1>
        <p className="text-muted-foreground">Manage audience questions and interactive polls</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Questions Section */}
        <Card>
          <CardHeader>
            <CardTitle>Audience Questions</CardTitle>
            <CardDescription>Review and answer questions from your sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {questions.map((question) => (
                <Card key={question.id} className={question.answered ? "border-green-200" : ""}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary" className="mb-2">
                        {question.session}
                      </Badge>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{question.timestamp}</span>
                      </div>
                    </div>
                    
                    <p className="font-medium mb-3">{question.question}</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => likeQuestion(question.id)}
                        >
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          {question.likes}
                        </Button>
                        <span className="text-sm text-muted-foreground">by {question.asker}</span>
                      </div>
                      
                      <Button
                        variant={question.answered ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleAnswer(question.id)}
                      >
                        {question.answered ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Answered
                          </>
                        ) : (
                          <>
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Answer
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Polls Section */}
        <Card>
          <CardHeader>
            <CardTitle>Live Polls</CardTitle>
            <CardDescription>Create and manage interactive polls</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Create New Poll */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Create New Poll</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pollQuestion">Poll Question</Label>
                  <Input
                    id="pollQuestion"
                    placeholder="Enter your poll question..."
                    value={newPoll.question}
                    onChange={(e) => setNewPoll(prev => ({ ...prev, question: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Options</Label>
                  {newPoll.options.map((option, index) => (
                    <Input
                      key={index}
                      placeholder={`Option ${index + 1}`}
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...newPoll.options]
                        newOptions[index] = e.target.value
                        setNewPoll(prev => ({ ...prev, options: newOptions }))
                      }}
                    />
                  ))}
                  <Button variant="outline" size="sm" onClick={addPollOption}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Option
                  </Button>
                </div>
                
                <Button>Create Poll</Button>
              </CardContent>
            </Card>

            {/* Active Polls */}
            <div className="space-y-4">
              <h3 className="font-semibold">Active Polls</h3>
              {polls.map((poll) => (
                <Card key={poll.id} className={poll.live ? "border-blue-200" : ""}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <Badge variant={poll.live ? "default" : "secondary"}>
                        {poll.live ? "Live" : "Closed"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{poll.session}</span>
                    </div>
                    
                    <p className="font-medium mb-3">{poll.question}</p>
                    
                    <div className="space-y-2">
                      {poll.options.map((option, index) => {
                        const totalVotes = poll.votes.reduce((a, b) => a + b, 0)
                        const percentage = totalVotes > 0 ? (poll.votes[index] / totalVotes) * 100 : 0
                        
                        return (
                          <div key={index} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{option}</span>
                              <span>{poll.votes[index]} votes ({percentage.toFixed(1)}%)</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-xs text-muted-foreground">
                        Total votes: {poll.votes.reduce((a, b) => a + b, 0)}
                      </span>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <BarChart3 className="h-4 w-4 mr-1" />
                          Results
                        </Button>
                        <Button variant="outline" size="sm">
                          {poll.live ? "End Poll" : "Start Poll"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}