import Image from 'next/image'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function ProgramCard({ name, tags, description, programs, href, image }) {
  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md space-y-4">
      {/* Header */}
      <div className="flex gap-4 items-start">
        <Image src={image} alt={name} fill className="w-20 h-20 object-contain rounded-md" />
        <div>
          <h2 className="text-xl font-bold">{name}</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, idx) => (
              <Badge key={idx} variant="outline" className="bg-muted text-muted-foreground">
                {tag}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-2">{description}</p>
        </div>
      </div>

      {/* Program List */}
      <div className="space-y-6 mt-4">
        {programs.map((program, idx) => (
          <div key={idx} className="border-t pt-4 flex items-start justify-between">
            <div>
              <h3 className="text-base font-semibold">{program.name}</h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {program.description}
              </p>
            </div>
            <a href={program.href} target="_blank" rel="noopener noreferrer">
              <Button size="icon" variant="ghost" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md">
                <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
          </div>
        ))}
      </div>

      {/* More button */}
      <div className="pt-4 text-center">
        <a href={href} target="_blank" rel="noopener noreferrer">
          <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 rounded-full">
            ????
          </Button>
        </a>
      </div>
    </div>
  )
}
