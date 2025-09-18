"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

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
              <Link
                href={n.href}
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
              </Link>

              {/* Text content */}
              <div className="flex flex-col min-w-0">
                {/* Row: author chip */}
                {n.authorLabel ? (
                  <div className="mb-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300 px-2.5 py-1 text-xs font-medium">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      {n.authorLabel}
                    </span>
                  </div>
                ) : null}

                {/* Title */}
                <Link href={n.href} className="group">
                  <h3 className="text-lg md:text-xl font-semibold leading-snug line-clamp-2 group-hover:underline">
                    {n.title}
                  </h3>
                </Link>

                {/* Badges + date */}
                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <div className="flex flex-wrap gap-1.5">
                    {(n.badges ?? []).map((b, i) =>
                      <div key={i} className={i === 0 ? "text-sky-700 font-bold" : ""}>
                        {b.label}
                      </div>)
                    }
                  </div>
                  <span className="mx-1"></span>
                  <time>{n.date}</time>
                </div>

                {/* Excerpt */}
                <p className="mt-3 text-sm md:text-[15px] text-muted-foreground line-clamp-3">
                  {n.excerpt}
                </p>
              </div>

              {/* CTA */}
              <div className="hidden md:flex items-center justify-end">
                <Link href={n.href}>
                  <Button size="icon" variant="secondary" className="rounded-full bg-ulead-gradient border-0 text-white hover:text-white hover:opacity-90 p-4">
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
