"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { CheckCircle2, Clock } from "lucide-react"

interface PollOption {
  id: string
  text: string
  votes: number
  percentage: number
  userVoted?: boolean
}

interface PollWidgetProps {
  pollId: string
  question: string
  options: PollOption[]
  totalVotes: number
  timeRemaining?: string
  isLive?: boolean
  onVote?: (optionId: string) => void
}

export function PollWidget({
  pollId,
  question,
  options,
  totalVotes,
  timeRemaining,
  isLive = true,
  onVote,
}: PollWidgetProps) {
  const [hasVoted, setHasVoted] = useState(false)

  const handleVote = (optionId: string) => {
    onVote?.(optionId)
    setHasVoted(true)
  }

  const chartData = options.map((opt) => ({
    name: opt.text.substring(0, 15),
    votes: opt.votes,
  }))

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{question}</CardTitle>
            <CardDescription className="mt-2">
              {totalVotes} {totalVotes === 1 ? "vote" : "votes"}
            </CardDescription>
          </div>
          {isLive && (
            <Badge className="gap-1 bg-green-600 hover:bg-green-700">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              Live
            </Badge>
          )}
        </div>
        {timeRemaining && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
            <Clock className="w-3 h-3" />
            {timeRemaining} remaining
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <motion.div className="space-y-3" variants={containerVariants} initial="hidden" animate="visible">
          {options.map((option) => (
            <motion.div key={option.id} variants={itemVariants}>
              <Button
                variant="outline"
                className="w-full justify-start h-auto p-3 bg-transparent hover:bg-muted transition-colors"
                onClick={() => handleVote(option.id)}
                disabled={hasVoted}
              >
                <div className="w-full text-left space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{option.text}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold">{option.percentage}%</span>
                      {option.userVoted && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                    </div>
                  </div>
                  <Progress value={option.percentage} className="h-2" />
                  <span className="text-xs text-muted-foreground">{option.votes} votes</span>
                </div>
              </Button>
            </motion.div>
          ))}
        </motion.div>

        <div className="pt-4 border-t">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="votes" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
