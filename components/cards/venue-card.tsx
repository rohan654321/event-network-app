import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Star, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface VenueCardProps {
  id: string
  name: string
  description: string
  location: string
  capacity: number
  rating: number
  image: string
  type: string
}

export function VenueCard({ id, name, description, location, capacity, rating, image, type }: VenueCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-4 right-4">{type}</Badge>
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-2">{name}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>Capacity: {capacity}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{rating.toFixed(1)} rating</span>
          </div>
        </div>
        <div className="flex items-center justify-end pt-4 border-t border-border">
          <Link href={`/venues/${id}`}>
            <Button variant="ghost" size="sm" className="gap-2">
              View Details <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
