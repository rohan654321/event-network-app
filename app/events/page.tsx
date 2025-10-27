"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { EventCard } from "@/components/cards/event-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, X } from "lucide-react"

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const categories = ["Technology", "Design", "Networking", "Business", "Marketing", "Education"]

  const events = [
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
    {
      id: "4",
      title: "Digital Marketing Summit",
      description: "Learn cutting-edge digital marketing strategies from industry experts",
      date: "July 15-16, 2025",
      location: "Los Angeles, CA",
      attendees: 1500,
      image: "/tech-conference.png",
      category: "Marketing",
      price: 149,
    },
    {
      id: "5",
      title: "Business Leadership Conference",
      description: "Develop leadership skills and network with C-level executives",
      date: "August 5-7, 2025",
      location: "Chicago, IL",
      attendees: 2000,
      image: "/design-conference.png",
      category: "Business",
      price: 399,
    },
    {
      id: "6",
      title: "Web Development Workshop",
      description: "Hands-on workshop covering modern web development practices",
      date: "June 28, 2025",
      location: "Seattle, WA",
      attendees: 300,
      image: "/startup-networking.jpg",
      category: "Technology",
      price: 79,
    },
  ]

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || event.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Header */}
      <section className="border-b border-border bg-muted/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Discover Events</h1>
          <p className="text-muted-foreground mb-6">Find and register for amazing events near you</p>

          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className="bg-transparent"
            >
              {showFilters ? <X className="w-5 h-5" /> : <Filter className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </section>

      {/* Filters */}
      {showFilters && (
        <section className="border-b border-border bg-card py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="font-semibold mb-4">Categories</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                onClick={() => setSelectedCategory(null)}
                className={selectedCategory === null ? "" : "bg-transparent"}
              >
                All Events
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "" : "bg-transparent"}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Events Grid */}
      <section className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredEvents.length > 0 ? (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                Showing {filteredEvents.length} event{filteredEvents.length !== 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} {...event} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">No events found</p>
              <Button onClick={() => setSearchQuery("")}>Clear search</Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
