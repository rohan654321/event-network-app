"use client"

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { EventCard } from "@/components/cards/event-card"
import { ArrowRight, Sparkles, Users, Calendar, MapPin, TrendingUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  const trendingEvents = [
    {
      id: "1",
      title: "Tech Summit 2025",
      description: "Join industry leaders for the biggest tech conference of the year",
      date: "June 15-17, 2025",
      location: "San Francisco, CA",
      attendees: 2500,
      image: "/tech-conference.png",
      category: "Technology",
      price: 299,
    },
    {
      id: "2",
      title: "Design Conference",
      description: "Explore the latest trends in UX/UI design and digital innovation",
      date: "July 8-10, 2025",
      location: "New York, NY",
      attendees: 1200,
      image: "/design-conference.png",
      category: "Design",
      price: 199,
    },
    {
      id: "3",
      title: "Startup Networking Event",
      description: "Connect with founders, investors, and entrepreneurs",
      date: "June 22, 2025",
      location: "Austin, TX",
      attendees: 800,
      image: "/startup-networking.jpg",
      category: "Networking",
      price: 99,
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Event Organizer",
      content:
        "Event Network made it incredibly easy to organize and manage our annual conference. The platform is intuitive and powerful.",
      avatar: "/diverse-woman-portrait.png",
    },
    {
      name: "Michael Chen",
      role: "Venue Manager",
      description:
        "The booking system is seamless. We've increased our venue utilization by 40% since using Event Network.",
      avatar: "/man.jpg",
    },
    {
      name: "Emma Davis",
      role: "Attendee",
      content:
        "I love how easy it is to discover events and connect with other professionals. The networking features are fantastic!",
      avatar: "/professional-woman.png",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Welcome to Event Network</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-balance">
                Connect, Network, and Grow Your Professional Circle
              </h1>
              <p className="text-lg text-muted-foreground text-balance">
                Discover amazing events, manage registrations, and build meaningful connections with professionals in
                your industry.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/events">
                  <Button size="lg" className="gap-2">
                    Explore Events <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="lg" variant="outline">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-96 hidden md:block">
              <Image src="/professional-networking-event.png" alt="Hero" fill className="object-cover rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Event Network?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to discover, manage, and grow through events
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Calendar,
                title: "Easy Event Discovery",
                description: "Browse thousands of events tailored to your interests and location",
              },
              {
                icon: Users,
                title: "Professional Networking",
                description: "Connect with like-minded professionals and build lasting relationships",
              },
              {
                icon: MapPin,
                title: "Global Coverage",
                description: "Find events happening worldwide or in your local area",
              },
              {
                icon: TrendingUp,
                title: "Analytics & Insights",
                description: "Track attendance, engagement, and ROI for your events",
              },
              {
                icon: Sparkles,
                title: "AI Recommendations",
                description: "Get personalized event suggestions based on your preferences",
              },
              {
                icon: Users,
                title: "Community Features",
                description: "Chat, share, and collaborate with other attendees",
              },
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-shadow"
                >
                  <Icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Trending Events */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Trending Events</h2>
              <p className="text-muted-foreground">Discover the most popular events happening now</p>
            </div>
            <Link href="/events">
              <Button variant="outline" className="gap-2 bg-transparent">
                View All <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-lg text-muted-foreground">Join thousands of satisfied users</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-6 rounded-lg border border-border bg-card">
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join Event Network today and discover amazing events and professional connections
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="gap-2">
                Sign Up Now <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/events">
              <Button size="lg" variant="outline">
                Browse Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
