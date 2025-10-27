"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Info } from "lucide-react"

interface VenueLocation {
  id: string
  name: string
  x: number
  y: number
  capacity: number
  currentOccupancy: number
  type: "booth" | "session" | "restroom" | "food" | "info"
}

interface VenueMapProps {
  venueName: string
  locations: VenueLocation[]
  onLocationSelect?: (location: VenueLocation) => void
}

const locationTypeColors = {
  booth: "bg-blue-100 text-blue-900",
  session: "bg-purple-100 text-purple-900",
  restroom: "bg-green-100 text-green-900",
  food: "bg-orange-100 text-orange-900",
  info: "bg-gray-100 text-gray-900",
}

const locationTypeIcons = {
  booth: "🏪",
  session: "🎤",
  restroom: "🚻",
  food: "🍽️",
  info: "ℹ️",
}

export function VenueMap({ venueName, locations, onLocationSelect }: VenueMapProps) {
  const [selectedLocation, setSelectedLocation] = useState<VenueLocation | null>(null)

  const handleLocationClick = (location: VenueLocation) => {
    setSelectedLocation(location)
    onLocationSelect?.(location)
  }

  const occupancyPercentage = selectedLocation
    ? (selectedLocation.currentOccupancy / selectedLocation.capacity) * 100
    : 0

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            {venueName} Map
          </CardTitle>
          <CardDescription>Interactive venue layout and navigation</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="relative w-full bg-muted rounded-lg overflow-hidden aspect-video border-2 border-border">
            <svg className="w-full h-full" viewBox="0 0 800 600">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
                </pattern>
              </defs>
              <rect width="800" height="600" fill="url(#grid)" />

              {locations.map((location) => {
                const isSelected = selectedLocation?.id === location.id
                const size = 40
                return (
                  <g key={location.id}>
                    <circle
                      cx={location.x}
                      cy={location.y}
                      r={size}
                      fill={isSelected ? "#3b82f6" : "#e5e7eb"}
                      stroke={isSelected ? "#1e40af" : "#9ca3af"}
                      strokeWidth="2"
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => handleLocationClick(location)}
                    />
                    <text
                      x={location.x}
                      y={location.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-2xl cursor-pointer"
                      onClick={() => handleLocationClick(location)}
                    >
                      {locationTypeIcons[location.type]}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {Object.entries(locationTypeIcons).map(([type, icon]) => (
              <div key={type} className="flex items-center gap-2 text-sm">
                <span className="text-lg">{icon}</span>
                <span className="capitalize text-muted-foreground">{type}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedLocation && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{selectedLocation.name}</CardTitle>
            <Badge className={locationTypeColors[selectedLocation.type]}>{selectedLocation.type}</Badge>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Occupancy</p>
              <div className="space-y-1">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      occupancyPercentage > 80
                        ? "bg-red-500"
                        : occupancyPercentage > 50
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    }`}
                    style={{ width: `${occupancyPercentage}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {selectedLocation.currentOccupancy} / {selectedLocation.capacity} people
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Capacity</p>
              <p className="font-semibold">{selectedLocation.capacity} people</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-mono text-xs">
                X: {selectedLocation.x}, Y: {selectedLocation.y}
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <Button className="flex-1 gap-2" size="sm">
                <Navigation className="w-4 h-4" />
                Get Directions
              </Button>
              <Button variant="outline" className="flex-1 gap-2 bg-transparent" size="sm">
                <Info className="w-4 h-4" />
                Details
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
