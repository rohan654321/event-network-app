"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Sparkles, Filter } from "lucide-react"

interface SmartEventFilterProps {
  onFilterChange?: (filters: FilterState) => void
}

interface FilterState {
  matchScore: number
  categories: string[]
  eventTypes: string[]
  priceRange: [number, number]
}

export function SmartEventFilter({ onFilterChange }: SmartEventFilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    matchScore: 70,
    categories: [],
    eventTypes: [],
    priceRange: [0, 500],
  })

  const categories = ["Technology", "Design", "Business", "Networking", "Education"]
  const eventTypes = ["Conference", "Workshop", "Meetup", "Webinar", "Expo"]

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <div>
            <CardTitle>Smart Filters</CardTitle>
            <CardDescription>AI-powered event discovery</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label className="text-base font-semibold">Match Score: {filters.matchScore}%</Label>
          <Slider
            value={[filters.matchScore]}
            onValueChange={(value) => handleFilterChange({ ...filters, matchScore: value[0] })}
            min={0}
            max={100}
            step={5}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">Show events matching your interests</p>
        </div>

        <div className="space-y-3">
          <Label className="text-base font-semibold">Categories</Label>
          <div className="space-y-2">
            {categories.map((cat) => (
              <div key={cat} className="flex items-center space-x-2">
                <Checkbox
                  id={cat}
                  checked={filters.categories.includes(cat)}
                  onCheckedChange={(checked) => {
                    const newCategories = checked
                      ? [...filters.categories, cat]
                      : filters.categories.filter((c) => c !== cat)
                    handleFilterChange({ ...filters, categories: newCategories })
                  }}
                />
                <Label htmlFor={cat} className="font-normal cursor-pointer">
                  {cat}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-base font-semibold">Event Type</Label>
          <div className="space-y-2">
            {eventTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={type}
                  checked={filters.eventTypes.includes(type)}
                  onCheckedChange={(checked) => {
                    const newTypes = checked
                      ? [...filters.eventTypes, type]
                      : filters.eventTypes.filter((t) => t !== type)
                    handleFilterChange({ ...filters, eventTypes: newTypes })
                  }}
                />
                <Label htmlFor={type} className="font-normal cursor-pointer">
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-base font-semibold">
            Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
          </Label>
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => handleFilterChange({ ...filters, priceRange: [value[0], value[1]] })}
            min={0}
            max={1000}
            step={50}
            className="w-full"
          />
        </div>

        <Button className="w-full gap-2">
          <Filter className="w-4 h-4" />
          Apply Filters
        </Button>
      </CardContent>
    </Card>
  )
}
