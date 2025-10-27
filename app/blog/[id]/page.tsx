"use client"

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Share2, MessageCircle, Clock, Calendar } from "lucide-react"
import Image from "next/image"
import { PollWidget } from "@/components/features/poll-widget"
import { BlogCard } from "@/components/cards/blog-card"

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  const post = {
    id: params.id,
    title: "The Future of Event Technology: AI, Automation, and Beyond",
    excerpt: "Explore how AI and automation are transforming the event industry",
    author: "John Smith",
    authorRole: "Event Technology Expert",
    authorImage: "/man.jpg",
    date: "June 10, 2025",
    category: "Technology",
    image: "/tech-conference.png",
    readTime: 8,
    likes: 342,
    comments: 28,
    shares: 156,
    content: [
      {
        type: "paragraph",
        text: "The event industry is undergoing a significant transformation driven by technological advancements. From AI-powered recommendations to automated registration systems, technology is reshaping how we plan, execute, and experience events.",
      },
      {
        type: "heading",
        text: "The Rise of AI in Event Planning",
      },
      {
        type: "paragraph",
        text: "Artificial Intelligence is revolutionizing event planning by providing data-driven insights and automating repetitive tasks. Event organizers can now leverage AI to predict attendee behavior, personalize experiences, and optimize resource allocation.",
      },
      {
        type: "image",
        src: "/tech-conference.png",
        caption: "AI-powered event analytics dashboard",
      },
      {
        type: "heading",
        text: "Key Benefits of AI in Events",
      },
      {
        type: "list",
        items: [
          "Personalized attendee recommendations based on preferences and behavior",
          "Automated scheduling and conflict resolution",
          "Real-time sentiment analysis and engagement tracking",
          "Predictive analytics for attendance and revenue forecasting",
          "Intelligent chatbots for attendee support",
        ],
      },
      {
        type: "poll",
        question: "Which AI feature would benefit your events most?",
        options: [
          { id: "opt-1", text: "Personalized Recommendations", votes: 145, percentage: 42 },
          { id: "opt-2", text: "Automated Scheduling", votes: 98, percentage: 28 },
          { id: "opt-3", text: "Sentiment Analysis", votes: 65, percentage: 19 },
          { id: "opt-4", text: "Predictive Analytics", votes: 37, percentage: 11 },
        ],
        totalVotes: 345,
      },
      {
        type: "paragraph",
        text: "The integration of AI into event management platforms is not just a trend—it's becoming a necessity. Organizations that embrace these technologies will gain a competitive advantage in delivering superior attendee experiences.",
      },
      {
        type: "heading",
        text: "Looking Ahead",
      },
      {
        type: "paragraph",
        text: "As we move forward, we can expect even more sophisticated AI applications in the event industry. From virtual reality experiences to advanced networking algorithms, the future of events is undoubtedly intertwined with technological innovation.",
      },
    ],
  }

  const relatedPosts = [
    {
      id: "2",
      title: "5 Tips for Successful Event Networking",
      excerpt: "Learn how to make the most of your networking opportunities at events",
      author: "Sarah Johnson",
      date: "June 8, 2025",
      category: "Networking",
      image: "/design-conference.png",
      readTime: 4,
    },
    {
      id: "3",
      title: "Designing Memorable Event Experiences",
      excerpt: "Best practices for creating engaging and memorable event experiences",
      author: "Michael Chen",
      date: "June 5, 2025",
      category: "Design",
      image: "/startup-networking.jpg",
      readTime: 6,
    },
    {
      id: "4",
      title: "Event Marketing Strategies That Work",
      excerpt: "Proven strategies to promote your events and increase attendance",
      author: "Emma Davis",
      date: "June 1, 2025",
      category: "Marketing",
      image: "/tech-conference.png",
      readTime: 7,
    },
  ]

  const comments = [
    {
      id: "c1",
      author: "Alex Johnson",
      avatar: "/man.jpg",
      date: "2 days ago",
      text: "Great insights! AI is definitely changing how we approach event planning. Looking forward to implementing some of these strategies.",
      likes: 24,
    },
    {
      id: "c2",
      author: "Sarah Chen",
      avatar: "/professional-woman.png",
      date: "1 day ago",
      text: "The personalization aspect is particularly interesting. Our attendees have already noticed the difference.",
      likes: 18,
    },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8">
            <Badge className="mb-4">{post.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{post.title}</h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-border">
            <div className="flex items-center gap-3">
              <Image
                src={post.authorImage || "/placeholder.svg"}
                alt={post.author}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <p className="font-semibold">{post.author}</p>
                <p className="text-sm text-muted-foreground">{post.authorRole}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} min read</span>
            </div>
          </div>

          {/* Article Content */}
          <article className="prose prose-sm max-w-none mb-12 space-y-6">
            {post.content.map((block, index) => {
              if (block.type === "paragraph") {
                return (
                  <p key={index} className="text-muted-foreground leading-relaxed">
                    {block.text}
                  </p>
                )
              }

              if (block.type === "heading") {
                return (
                  <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                    {block.text}
                  </h2>
                )
              }

              if (block.type === "image") {
                return (
                  <figure key={index} className="my-8">
                    <div className="relative h-96 rounded-lg overflow-hidden">
                      <Image
                        src={block.src || "/placeholder.svg"}
                        alt={block.caption || "Article image"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {block.caption && (
                      <figcaption className="text-sm text-muted-foreground text-center mt-3">
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                )
              }

              if (block.type === "list") {
                return (
                  <ul key={index} className="space-y-2 ml-6">
                    {block.items?.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-muted-foreground list-disc">
                        {item}
                      </li>
                    ))}
                  </ul>
                )
              }

              if (block.type === "poll") {
                return (
                  <div key={index} className="my-8">
                    <PollWidget
                      pollId={`poll-${index}`}
                      question={block.question || ""}
                      options={block.options || []}
                      totalVotes={block.totalVotes || 0}
                      isLive={false}
                      onVote={(optionId) => console.log(`Voted for ${optionId}`)}
                    />
                  </div>
                )
              }

              return null
            })}
          </article>

          {/* Article Actions */}
          <div className="flex flex-wrap items-center gap-4 py-8 border-t border-b border-border">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Heart className="w-4 h-4" />
              <span>{post.likes} Likes</span>
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <MessageCircle className="w-4 h-4" />
              <span>{post.comments} Comments</span>
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Share2 className="w-4 h-4" />
              <span>{post.shares} Shares</span>
            </Button>
          </div>

          {/* Comments Section */}
          <div className="py-12">
            <h3 className="text-2xl font-bold mb-6">Comments ({comments.length})</h3>
            <div className="space-y-6">
              {comments.map((comment) => (
                <Card key={comment.id}>
                  <CardContent className="pt-6">
                    <div className="flex gap-4 mb-4">
                      <Image
                        src={comment.avatar || "/placeholder.svg"}
                        alt={comment.author}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold">{comment.author}</p>
                          <span className="text-sm text-muted-foreground">{comment.date}</span>
                        </div>
                        <p className="text-muted-foreground mt-2">{comment.text}</p>
                        <Button variant="ghost" size="sm" className="mt-2 gap-1">
                          <Heart className="w-4 h-4" />
                          <span className="text-xs">{comment.likes}</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-8">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-4">Leave a comment</p>
                <textarea
                  placeholder="Share your thoughts..."
                  className="w-full p-3 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={4}
                />
                <Button className="mt-4">Post Comment</Button>
              </CardContent>
            </Card>
          </div>

          {/* Related Articles */}
          <div className="py-12 border-t border-border">
            <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.id} {...relatedPost} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
