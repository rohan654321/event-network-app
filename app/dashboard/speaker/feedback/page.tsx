"use client"

import { DashboardShell } from "@/components/layout/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"

export default function FeedbackPage() {
  const feedbackItems = [
    {
      id: "1",
      session: "AI & Machine Learning Workshop",
      rating: 5,
      comment: "Excellent presentation! Very informative and engaging.",
      author: "John Doe",
      date: "June 16, 2025",
    },
    {
      id: "2",
      session: "AI & Machine Learning Workshop",
      rating: 5,
      comment: "Great content and delivery. Learned a lot!",
      author: "Jane Smith",
      date: "June 16, 2025",
    },
    {
      id: "3",
      session: "Future of Web Development",
      rating: 4,
      comment: "Good session, could have more code examples.",
      author: "Bob Johnson",
      date: "July 9, 2025",
    },
  ]

  const avgRating = (feedbackItems.reduce((sum, item) => sum + item.rating, 0) / feedbackItems.length).toFixed(1)

  return (
    <DashboardShell role="speaker" title="Feedback">
      <div className="space-y-6">
        {/* Summary Card */}
        <Card>
          <CardHeader>
            <CardTitle>Feedback Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Average Rating</p>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold">{avgRating}</span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.round(Number.parseFloat(avgRating)) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Total Feedback</p>
                <p className="text-3xl font-bold">{feedbackItems.length}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">5-Star Reviews</p>
                <p className="text-3xl font-bold">{feedbackItems.filter((f) => f.rating === 5).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feedback List */}
        <div className="space-y-4">
          {feedbackItems.map((feedback) => (
            <Card key={feedback.id}>
              <CardContent className="pt-6">
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold">{feedback.session}</p>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < feedback.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{feedback.comment}</p>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{feedback.author}</span>
                  <span>{feedback.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  )
}
