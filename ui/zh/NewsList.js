"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const badgeClass = (variant) => {
  switch (variant) {
    case "secondary":
      return "inline-flex items-center gap-1 rounded-full bg-sky-50 text-sky-700 px-2.5 py-1 text-xs font-medium";
    case "outline":
    default:
      return "inline-flex items-center gap-1 rounded-full border border-gray-300 text-gray-600 px-2.5 py-1 text-xs";
  }
};

export function NewsList({ items }) {
  return (
    <div className="space-y-4">
      {items.map((n) => (
        <Card
          key={n.id}
          className="overflow-hidden border border-muted/60 hover:shadow-md transition-shadow"
        >
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-[220px_1fr_48px] gap-4 items-stretch">
              {/* Thumbnail */}
              <a
                href={n.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-[4/3] md:aspect-[4/3] rounded-lg overflow-hidden bg-muted"
              >
                <Image
                  src={n.image.src}
                  alt={n.image.alt}
                  fill
                  priority={false}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 220px"
                />
              </a>

              {/* Text content */}
              <div className="flex flex-col min-w-0">
                {/* Row: author chip */}
                {n.authorLabel ? (
                  <div className="mb-2">
                    <span className={badgeClass("secondary")}>
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      {n.authorLabel}
                    </span>
                  </div>
                ) : null}

                {/* Title */}
                <a href={n.href} target="_blank" rel="noopener noreferrer" className="group">
                  <h3 className="text-lg md:text-xl font-semibold leading-snug line-clamp-2 group-hover:underline">
                    {n.title}
                  </h3>
                </a>

                {/* Badges + date */}
                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <div className="flex flex-wrap gap-1.5 items-center">
                    {n.author ? (
                      <span className={badgeClass("secondary")}>
                        {n.author}
                      </span>
                    ) : null}
                    {(n.badges ?? []).map((b, i) => (
                      <span key={i} className={badgeClass(b.variant)}>
                        {b.label}
                      </span>
                    ))}
                  </div>
                  <time>{n.date}</time>
                </div>

                {/* Excerpt */}
                <p className="mt-3 text-sm md:text-[15px] text-muted-foreground line-clamp-3">
                  {n.excerpt}
                </p>
              </div>

              {/* CTA */}
              <div className="hidden md:flex items-center justify-end">
                <a href={n.href} target="_blank" rel="noopener noreferrer">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full bg-ulead-gradient border-0 text-white hover:text-white hover:opacity-90 p-4"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
