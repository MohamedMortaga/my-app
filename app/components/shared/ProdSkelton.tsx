import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

export default function ProdSkelton() {
  return (
    <section className="py-10 container mx-auto px-4">
      {/* Header Skeleton */}
      <div className="mb-10">
        <Skeleton className="h-4 w-28 mb-3" />
        <Skeleton className="h-6 w-72 mb-1" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="border rounded-lg p-4 shadow-sm flex flex-col items-center space-y-3"
          >
            {/* Image Skeleton */}
            <Skeleton className="w-40 h-40 bg-gray-200 rounded-md" />

            {/* Title */}
            <Skeleton className="h-4 w-28" />

            {/* Price + Rating */}
            <div className="flex justify-between items-center w-full mt-2">
              <Skeleton className="h-4 w-12" />
              <div className="flex items-center space-x-1">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-10" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
