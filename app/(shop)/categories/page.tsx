// app/categories/page.tsx
import React from 'react'
import { getCategories } from '@/app/services/categories.service'
import { ICategory } from '@/app/interfaces/category.interface'
import Image from 'next/image'

export default async function CategoriesPage() {
  const { data: categories }: { data: ICategory[] } = await getCategories()

  return (
  <section className="py-10 container mx-auto px-4 lg:px-25">
      <h1 className="text-3xl font-bold mb-8 text-center">All Categories</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category._id}
            className="border rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 text-center bg-white"
          >
            <Image
              src={category.image}
              alt={category.name}
              width={270}
              height={250}
              loading="lazy"
              className="w-full h-[15.625rem] object-contain bg-gray-100 p-2 rounded-md mb-4"
            />
            <h3 className="font-medium text-lg">{category.name}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}
