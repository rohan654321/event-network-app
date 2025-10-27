import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface EventCardProps {
  id: string
  title: string
  description: string
  date: string
  location: string
  attendees: number
  image: string
  category: string
  price?: number
}

export function EventCard({
  id,
  title,
  description,
  date,
  location,
  attendees,
  image,
  category,
  price,
}: EventCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-4 right-4">{category}</Badge>
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-2">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{attendees} attendees</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-border">
          {price && <span className="font-bold text-lg">${price}</span>}
          <Link href={`/events/${id}`}>
            <Button variant="ghost" size="sm" className="gap-2">
              View Details <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
