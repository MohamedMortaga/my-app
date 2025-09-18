import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

export default function CatSkelton() {
  return (
    <section className="py-10 container mx-auto px-4">
      <div className="mb-8">
        <Skeleton className="h-6 w-[180px] mb-2" />
        <Skeleton className="h-4 w-[120px]" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center space-y-4">
            <Skeleton className="w-32 h-32 rounded-md" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
    </section>
  );
}
