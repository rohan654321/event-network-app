"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { VenueCard } from "@/components/cards/venue-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, X } from "lucide-react"

export default function VenuesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const types = ["Conference Center", "Hotel", "Restaurant", "Outdoor", "Studio", "Warehouse"]

  const venues = [
    {
      id: "1",
      name: "San Francisco Convention Center",
      description: "State-of-the-art convention center with multiple halls and breakout rooms",
      location: "San Francisco, CA",
      capacity: 5000,
      rating: 4.9,
      image: "/tech-conference.png",
      type: "Conference Center",
    },
    {
      id: "2",
      name: "The Grand Ballroom",
      description: "Elegant ballroom perfect for galas, weddings, and corporate events",
      location: "New York, NY",
      capacity: 1000,
      rating: 4.8,
      image: "/design-conference.png",
      type: "Hotel",
    },
    {
      id: "3",
      name: "Tech Hub Austin",
      description: "Modern co-working space ideal for startup events and networking",
      location: "Austin, TX",
      capacity: 500,
      rating: 4.7,
      image: "/startup-networking.jpg",
      type: "Studio",
    },
    {
      id: "4",
      name: "Riverside Park Pavilion",
      description: "Beautiful outdoor venue with scenic views and flexible setup options",
      location: "Los Angeles, CA",
      capacity: 2000,
      rating: 4.6,
      image: "/tech-conference.png",
      type: "Outdoor",
    },
    {
      id: "5",
      name: "Downtown Loft",
      description: "Industrial-style loft with exposed brick and natural lighting",
      location: "Chicago, IL",
      capacity: 300,
      rating: 4.8,
      image: "/design-conference.png",
      type: "Studio",
    },
    {
      id: "6",
      name: "Waterfront Restaurant",
      description: "Upscale restaurant with private dining areas and catering services",
      location: "Seattle, WA",
      capacity: 400,
      rating: 4.7,
      image: "/startup-networking.jpg",
      type: "Restaurant",
    },
  ]

  const filteredVenues = venues.filter((venue) => {
    const matchesSearch =
      venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = !selectedType || venue.type === selectedType
    return matchesSearch && matchesType
  })

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Header */}
      <section className="border-b border-border bg-muted/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Venues</h1>
          <p className="text-muted-foreground mb-6">Discover the perfect venue for your event</p>

          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search venues..."
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
            <h3 className="font-semibold mb-4">Venue Type</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedType === null ? "default" : "outline"}
                onClick={() => setSelectedType(null)}
                className={selectedType === null ? "" : "bg-transparent"}
              >
                All Types
              </Button>
              {types.map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  onClick={() => setSelectedType(type)}
                  className={selectedType === type ? "" : "bg-transparent"}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Venues Grid */}
      <section className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredVenues.length > 0 ? (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                Showing {filteredVenues.length} venue{filteredVenues.length !== 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVenues.map((venue) => (
                  <VenueCard key={venue.id} {...venue} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">No venues found</p>
              <Button onClick={() => setSearchQuery("")}>Clear search</Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
