"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Search, Navigation, Phone, Mail, Globe, Users, Clock, Star, X } from "lucide-react"
import Image from "next/image"

interface MapLocation {
  id: string
  name: string
  type: "venue" | "event" | "booth"
  latitude: number
  longitude: number
  address: string
  city: string
  capacity?: number
  occupancy?: number
  rating?: number
  image?: string
  description?: string
  phone?: string
  email?: string
  website?: string
}

export default function MapPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null)
  const [filterType, setFilterType] = useState<"all" | "venue" | "event" | "booth">("all")
  const [mapView, setMapView] = useState<"grid" | "list">("grid")

  const locations: MapLocation[] = [
    {
      id: "1",
      name: "San Francisco Convention Center",
      type: "venue",
      latitude: 37.7845,
      longitude: -122.3994,
      address: "747 Howard Street",
      city: "San Francisco, CA",
      capacity: 5000,
      occupancy: 78,
      rating: 4.9,
      image: "/tech-conference.png",
      description: "State-of-the-art convention center with multiple halls",
      phone: "+1 (415) 974-4000",
      email: "events@sfconventioncenter.com",
      website: "www.sfconventioncenter.com",
    },
    {
      id: "2",
      name: "Tech Summit 2025",
      type: "event",
      latitude: 37.7845,
      longitude: -122.3994,
      address: "747 Howard Street",
      city: "San Francisco, CA",
      capacity: 2000,
      occupancy: 85,
      rating: 4.8,
      image: "/tech-conference.png",
      description: "Annual technology conference featuring industry leaders",
    },
    {
      id: "3",
      name: "The Grand Ballroom",
      type: "venue",
      latitude: 40.7128,
      longitude: -74.006,
      address: "123 Park Avenue",
      city: "New York, NY",
      capacity: 1000,
      occupancy: 60,
      rating: 4.8,
      image: "/design-conference.png",
      description: "Elegant ballroom perfect for galas and corporate events",
      phone: "+1 (212) 555-0100",
      email: "events@grandbballroom.com",
      website: "www.grandbballroom.com",
    },
    {
      id: "4",
      name: "Design Conference 2025",
      type: "event",
      latitude: 40.7128,
      longitude: -74.006,
      address: "123 Park Avenue",
      city: "New York, NY",
      capacity: 800,
      occupancy: 45,
      rating: 4.7,
      image: "/design-conference.png",
      description: "International design conference with workshops and networking",
    },
    {
      id: "5",
      name: "Tech Hub Austin",
      type: "venue",
      latitude: 30.2672,
      longitude: -97.7431,
      address: "456 Tech Drive",
      city: "Austin, TX",
      capacity: 500,
      occupancy: 92,
      rating: 4.7,
      image: "/startup-networking.jpg",
      description: "Modern co-working space ideal for startup events",
      phone: "+1 (512) 555-0200",
      email: "events@techhubaustin.com",
      website: "www.techhubaustin.com",
    },
    {
      id: "6",
      name: "Startup Networking Booth",
      type: "booth",
      latitude: 30.2672,
      longitude: -97.7431,
      address: "456 Tech Drive",
      city: "Austin, TX",
      capacity: 50,
      occupancy: 35,
      description: "Interactive booth for startup networking and demos",
    },
    {
      id: "7",
      name: "Riverside Park Pavilion",
      type: "venue",
      latitude: 34.0522,
      longitude: -118.2437,
      address: "789 Riverside Drive",
      city: "Los Angeles, CA",
      capacity: 2000,
      occupancy: 55,
      rating: 4.6,
      image: "/tech-conference.png",
      description: "Beautiful outdoor venue with scenic views",
      phone: "+1 (213) 555-0300",
      email: "events@riversidepavillion.com",
      website: "www.riversidepavillion.com",
    },
    {
      id: "8",
      name: "Downtown Loft",
      type: "venue",
      latitude: 41.8781,
      longitude: -87.6298,
      address: "321 Industrial Avenue",
      city: "Chicago, IL",
      capacity: 300,
      occupancy: 70,
      rating: 4.8,
      image: "/design-conference.png",
      description: "Industrial-style loft with exposed brick and natural lighting",
      phone: "+1 (312) 555-0400",
      email: "events@downtownloft.com",
      website: "www.downtownloft.com",
    },
  ]

  const filteredLocations = locations.filter((location) => {
    const matchesSearch =
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.address.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || location.type === filterType
    return matchesSearch && matchesType
  })

  const getLocationColor = (type: string) => {
    switch (type) {
      case "venue":
        return "bg-blue-500"
      case "event":
        return "bg-purple-500"
      case "booth":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getLocationIcon = (type: string) => {
    switch (type) {
      case "venue":
        return "🏢"
      case "event":
        return "🎪"
      case "booth":
        return "🏪"
      default:
        return "📍"
    }
  }

  const getOccupancyColor = (occupancy: number) => {
    if (occupancy > 80) return "text-red-600"
    if (occupancy > 50) return "text-yellow-600"
    return "text-green-600"
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Header */}
      <section className="border-b border-border bg-muted/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Event Map</h1>
          <p className="text-muted-foreground mb-6">Discover venues, events, and booths near you</p>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by venue, event, or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={mapView === "grid" ? "default" : "outline"}
                onClick={() => setMapView("grid")}
                className={mapView === "grid" ? "" : "bg-transparent"}
              >
                Grid
              </Button>
              <Button
                variant={mapView === "list" ? "default" : "outline"}
                onClick={() => setMapView("list")}
                className={mapView === "list" ? "" : "bg-transparent"}
              >
                List
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-border bg-card py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filterType === "all" ? "default" : "outline"}
              onClick={() => setFilterType("all")}
              className={filterType === "all" ? "" : "bg-transparent"}
              size="sm"
            >
              All Locations
            </Button>
            <Button
              variant={filterType === "venue" ? "default" : "outline"}
              onClick={() => setFilterType("venue")}
              className={filterType === "venue" ? "" : "bg-transparent"}
              size="sm"
            >
              Venues
            </Button>
            <Button
              variant={filterType === "event" ? "default" : "outline"}
              onClick={() => setFilterType("event")}
              className={filterType === "event" ? "" : "bg-transparent"}
              size="sm"
            >
              Events
            </Button>
            <Button
              variant={filterType === "booth" ? "default" : "outline"}
              onClick={() => setFilterType("booth")}
              className={filterType === "booth" ? "" : "bg-transparent"}
              size="sm"
            >
              Booths
            </Button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Map View */}
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Interactive Map
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative w-full bg-muted rounded-lg overflow-hidden aspect-video border-2 border-border">
                    {/* Simplified Map Grid */}
                    <svg className="w-full h-full" viewBox="0 0 1000 600">
                      <defs>
                        <pattern id="mapGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                          <path
                            d="M 50 0 L 0 0 0 50"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="0.5"
                            opacity="0.1"
                          />
                        </pattern>
                      </defs>
                      <rect width="1000" height="600" fill="url(#mapGrid)" />

                      {/* Map regions */}
                      <text x="100" y="50" fontSize="14" fontWeight="bold" fill="currentColor" opacity="0.5">
                        San Francisco
                      </text>
                      <text x="700" y="150" fontSize="14" fontWeight="bold" fill="currentColor" opacity="0.5">
                        New York
                      </text>
                      <text x="300" y="400" fontSize="14" fontWeight="bold" fill="currentColor" opacity="0.5">
                        Austin
                      </text>
                      <text x="150" y="500" fontSize="14" fontWeight="bold" fill="currentColor" opacity="0.5">
                        Los Angeles
                      </text>
                      <text x="550" y="500" fontSize="14" fontWeight="bold" fill="currentColor" opacity="0.5">
                        Chicago
                      </text>

                      {/* Location markers */}
                      {filteredLocations.map((location) => {
                        const x = (location.longitude + 122.5) * 50
                        const y = (location.latitude - 30) * 50
                        const isSelected = selectedLocation?.id === location.id
                        return (
                          <g key={location.id}>
                            <circle
                              cx={x}
                              cy={y}
                              r={isSelected ? 20 : 15}
                              fill={getLocationColor(location.type)}
                              opacity={isSelected ? 1 : 0.7}
                              className="cursor-pointer hover:opacity-100 transition-opacity"
                              onClick={() => setSelectedLocation(location)}
                            />
                            <text
                              x={x}
                              y={y}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              fontSize="16"
                              className="cursor-pointer"
                              onClick={() => setSelectedLocation(location)}
                            >
                              {getLocationIcon(location.type)}
                            </text>
                          </g>
                        )
                      })}
                    </svg>

                    {/* Legend */}
                    <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur p-3 rounded-lg border border-border text-sm space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span>Venues</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span>Events</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span>Booths</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Details Panel */}
            <div className="lg:col-span-1">
              {selectedLocation ? (
                <Card className="sticky top-20">
                  <CardHeader className="flex flex-row items-start justify-between space-y-0">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{selectedLocation.name}</CardTitle>
                      <Badge className="mt-2" variant="outline">
                        {selectedLocation.type.charAt(0).toUpperCase() + selectedLocation.type.slice(1)}
                      </Badge>
                    </div>
                    <button
                      onClick={() => setSelectedLocation(null)}
                      className="p-1 hover:bg-muted rounded transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {selectedLocation.image && (
                      <div className="relative h-40 w-full overflow-hidden rounded-lg">
                        <Image
                          src={selectedLocation.image || "/placeholder.svg"}
                          alt={selectedLocation.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">{selectedLocation.description}</p>
                    </div>

                    <div className="space-y-3 border-t border-border pt-4">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                        <div className="text-sm">
                          <p className="font-medium">{selectedLocation.address}</p>
                          <p className="text-muted-foreground">{selectedLocation.city}</p>
                        </div>
                      </div>

                      {selectedLocation.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                          <a href={`tel:${selectedLocation.phone}`} className="text-sm text-primary hover:underline">
                            {selectedLocation.phone}
                          </a>
                        </div>
                      )}

                      {selectedLocation.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                          <a href={`mailto:${selectedLocation.email}`} className="text-sm text-primary hover:underline">
                            {selectedLocation.email}
                          </a>
                        </div>
                      )}

                      {selectedLocation.website && (
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-muted-foreground shrink-0" />
                          <a
                            href={`https://${selectedLocation.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline"
                          >
                            {selectedLocation.website}
                          </a>
                        </div>
                      )}
                    </div>

                    {selectedLocation.capacity && (
                      <div className="space-y-3 border-t border-border pt-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Capacity</span>
                          </div>
                          <span className="text-sm font-semibold">{selectedLocation.capacity}</span>
                        </div>

                        {selectedLocation.occupancy !== undefined && (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm font-medium">Occupancy</span>
                            </div>
                            <span className={`text-sm font-semibold ${getOccupancyColor(selectedLocation.occupancy)}`}>
                              {selectedLocation.occupancy}%
                            </span>
                          </div>
                        )}

                        {selectedLocation.rating && (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              <span className="text-sm font-medium">Rating</span>
                            </div>
                            <span className="text-sm font-semibold">{selectedLocation.rating.toFixed(1)}</span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex gap-2 pt-4 border-t border-border">
                      <Button className="flex-1 gap-2" size="sm">
                        <Navigation className="w-4 h-4" />
                        Directions
                      </Button>
                      <Button variant="outline" className="flex-1 bg-transparent" size="sm">
                        Save
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="pt-6 text-center text-muted-foreground">
                    <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Select a location on the map to view details</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* List View */}
          {mapView === "list" && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">All Locations</h2>
              <div className="space-y-4">
                {filteredLocations.map((location) => (
                  <Card
                    key={location.id}
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedLocation(location)}
                  >
                    <CardContent className="pt-6">
                      <div className="flex gap-4">
                        {location.image && (
                          <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded-lg">
                            <Image
                              src={location.image || "/placeholder.svg"}
                              alt={location.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-lg">{location.name}</h3>
                              <Badge className="mt-1" variant="outline">
                                {location.type.charAt(0).toUpperCase() + location.type.slice(1)}
                              </Badge>
                            </div>
                            {location.rating && (
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                <span className="font-semibold">{location.rating.toFixed(1)}</span>
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{location.description}</p>
                          <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              <span>{location.city}</span>
                            </div>
                            {location.capacity && (
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4 text-muted-foreground" />
                                <span>Capacity: {location.capacity}</span>
                              </div>
                            )}
                            {location.occupancy !== undefined && (
                              <div className="flex items-center gap-1">
                                <span className={`font-semibold ${getOccupancyColor(location.occupancy)}`}>
                                  {location.occupancy}% occupied
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
