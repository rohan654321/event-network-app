"use client"

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Users, Share2, Heart, Clock } from "lucide-react"
import Image from "next/image"
import { AIRecommendationsPanel } from "@/components/features/ai-recommendations-panel"
import { PollWidget } from "@/components/features/poll-widget"
import { LiveQA } from "@/components/features/live-qa"

export default function EventDetailPage({ params }: { params: { id: string } }) {
    
  const event = {
    id: params.id,
    title: "Tech Summit 2025",
    description: "Join industry leaders for the biggest tech conference of the year",
    fullDescription:
      "Tech Summit 2025 is the premier event for technology professionals, entrepreneurs, and innovators. Over three days, you'll experience keynote presentations from industry leaders, hands-on workshops, networking sessions, and exhibitions showcasing the latest innovations in technology.",
    date: "June 15-17, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "San Francisco Convention Center, San Francisco, CA",
    attendees: 2500,
    image: "/tech-conference.png",
    category: "Technology",
    price: 299,
    rating: 4.8,
    reviews: 342,
  }

  const agenda = [
    { time: "9:00 AM", title: "Registration & Breakfast", speaker: "" },
    { time: "10:00 AM", title: "Opening Keynote", speaker: "John Smith" },
    { time: "11:30 AM", title: "AI & Machine Learning Workshop", speaker: "Sarah Johnson" },
    { time: "1:00 PM", title: "Lunch Break", speaker: "" },
    { time: "2:00 PM", title: "Cloud Infrastructure Panel", speaker: "Multiple Speakers" },
    { time: "3:30 PM", title: "Networking Break", speaker: "" },
    { time: "4:00 PM", title: "Startup Showcase", speaker: "" },
  ]

  const speakers = [
    { name: "John Smith", title: "CEO, Tech Corp", image: "/man.jpg" },
    { name: "Sarah Johnson", title: "CTO, Innovation Labs", image: "/professional-woman.png" },
    { name: "Michael Chen", title: "Founder, StartupXYZ", image: "/man.jpg" },
  ]

  const aiRecommendations = [
    {
      id: "1",
      title: "Advanced AI Workshop",
      type: "session" as const,
      reason: "Matches your interest in machine learning and AI",
      image: "/tech-conference.png",
      category: "Workshop",
      matchScore: 95,
    },
    {
      id: "2",
      title: "Cloud Architecture Masterclass",
      type: "session" as const,
      reason: "Popular among attendees with your background",
      image: "/tech-conference.png",
      category: "Workshop",
      matchScore: 88,
    },
    {
      id: "3",
      title: "Networking Breakfast",
      type: "event" as const,
      reason: "Connect with industry leaders and peers",
      image: "/tech-conference.png",
      category: "Networking",
      matchScore: 82,
    },
  ]

  const poll = {
    pollId: "poll-1",
    question: "Which topic interests you most?",
    options: [
      { id: "opt-1", text: "Artificial Intelligence & ML", votes: 245, percentage: 42, userVoted: false },
      { id: "opt-2", text: "Cloud Infrastructure", votes: 180, percentage: 31, userVoted: false },
      { id: "opt-3", text: "Web3 & Blockchain", votes: 95, percentage: 16, userVoted: false },
      { id: "opt-4", text: "Cybersecurity", votes: 65, percentage: 11, userVoted: false },
    ],
    totalVotes: 585,
    timeRemaining: "2 hours",
    isLive: true,
  }

  const qaQuestions = [
    {
      id: "q1",
      author: "Alex Johnson",
      avatar: "/man.jpg",
      content: "Will there be recordings of the sessions?",
      timestamp: "2024-01-15T10:30:00Z",
      upvotes: 124,
      userUpvoted: false,
      answers: 3,
      isPinned: true,
      views: 456
    },
    {
      id: "q2",
      author: "Sarah Chen",
      avatar: "/professional-woman.png",
      content: "What's the best way to network at this event?",
      timestamp: "2024-01-15T11:15:00Z",
      upvotes: 89,
      userUpvoted: true,
      answers: 5,
      isPinned: false,
      views: 321
    },
    {
      id: "q3",
      author: "Mike Davis",
      avatar: "/man.jpg",
      content: "Are there any early bird discounts for next year?",
      timestamp: "2024-01-15T14:20:00Z",
      upvotes: 45,
      userUpvoted: false,
      answers: 1,
      isPinned: false,
      views: 198
    },
  ]

  const handleAskQuestion = (question: string) => {
    console.log(`New question: ${question}`)
    // Here you would typically send the question to your backend
  }

  const handleUpvote = (questionId: string) => {
    console.log(`Upvoted question ${questionId}`)
    // Here you would typically update the upvote count in your backend
  }

  const handlePin = (questionId: string) => {
    console.log(`Toggled pin for question ${questionId}`)
    // Here you would typically update the pin status in your backend
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8">
            <Badge className="mb-4">{event.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{event.title}</h1>
            <div className="flex flex-wrap gap-6 text-white">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{event.attendees} attendees</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="agenda">Agenda</TabsTrigger>
                  <TabsTrigger value="speakers">Speakers</TabsTrigger>
                  <TabsTrigger value="polls">Polls</TabsTrigger>
                  <TabsTrigger value="qa">Q&A</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6 mt-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                    <p className="text-muted-foreground leading-relaxed">{event.fullDescription}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-4">What to Expect</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex gap-3">
                        <span className="text-primary">•</span>
                        <span>Keynote presentations from industry leaders</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-primary">•</span>
                        <span>Hands-on workshops and training sessions</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-primary">•</span>
                        <span>Networking opportunities with professionals</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-primary">•</span>
                        <span>Exhibition of latest technologies and products</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-8 pt-8 border-t">
                    <AIRecommendationsPanel
                      recommendations={aiRecommendations}
                      onFeedback={(id, liked) => console.log(`Feedback for ${id}: ${liked ? "liked" : "skipped"}`)}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="agenda" className="space-y-4 mt-6">
                  <h2 className="text-2xl font-bold mb-6">Event Agenda</h2>
                  {agenda.map((item, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="flex gap-4">
                          <div className="shrink-0">
                            <Clock className="w-5 h-5 text-primary mt-1" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-sm text-muted-foreground">{item.time}</p>
                            <p className="font-bold mt-1">{item.title}</p>
                            {item.speaker && <p className="text-sm text-muted-foreground mt-1">by {item.speaker}</p>}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="speakers" className="space-y-6 mt-6">
                  <h2 className="text-2xl font-bold mb-6">Featured Speakers</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {speakers.map((speaker, index) => (
                      <Card key={index}>
                        <CardContent className="pt-6">
                          <div className="flex gap-4">
                            <Image
                              src={speaker.image || "/placeholder.svg"}
                              alt={speaker.name}
                              width={80}
                              height={80}
                              className="rounded-lg"
                            />
                            <div>
                              <p className="font-bold">{speaker.name}</p>
                              <p className="text-sm text-muted-foreground">{speaker.title}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="polls" className="space-y-6 mt-6">
                  <h2 className="text-2xl font-bold mb-6">Live Polls</h2>
                  <PollWidget
                    pollId={poll.pollId}
                    question={poll.question}
                    options={poll.options}
                    totalVotes={poll.totalVotes}
                    timeRemaining={poll.timeRemaining}
                    isLive={poll.isLive}
                    onVote={(optionId) => console.log(`Voted for ${optionId}`)}
                  />
                </TabsContent>

                <TabsContent value="qa" className="space-y-6 mt-6">
                  <h2 className="text-2xl font-bold mb-6">Live Q&A</h2>
                  <LiveQA
                    questions={qaQuestions}
                    onAskQuestion={handleAskQuestion}
                    onUpvote={handleUpvote}
                    onPin={handlePin}
                  />
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle className="text-3xl">${event.price}</CardTitle>
                  <p className="text-sm text-muted-foreground">per ticket</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Rating</span>
                    <span className="font-semibold">
                      {event.rating} ({event.reviews} reviews)
                    </span>
                  </div>

                  <Button className="w-full" size="lg">
                    Register Now
                  </Button>

                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="flex-1 bg-transparent">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="flex-1 bg-transparent">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="border-t border-border pt-4 space-y-3 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">Date & Time</p>
                      <p className="font-semibold">{event.date}</p>
                      <p className="text-muted-foreground">{event.time}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Location</p>
                      <p className="font-semibold">{event.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}