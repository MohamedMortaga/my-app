import React from 'react';
import Image from 'next/image';
import type { IBrand } from '@/app/interfaces/brand.interface';
import { getBrands } from '@/app/services/brands.service';

export default async function BrandsPage() {
  const { data: brands, error } = await getBrands();

  if (error || brands.length === 0) {
    return (
      <section className="py-10 container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Our Brands</h1>
        <p className="text-center text-gray-500">We couldn’t load brands right now.</p>
      </section>
    );
  }

  return (
    <section className="py-10 container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Brands</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {brands.map((brand: IBrand) => (
          <div
            key={brand._id}
            className="flex flex-col items-center gap-2 border p-4 rounded-md shadow-sm hover:shadow-md transition-all"
          >
            <Image
              src={brand.image || '/placeholder-brand.png'}
              alt={brand.name}
              width={80}
              height={80}
              className="object-contain w-20 h-20"
              unoptimized
            />
            <span className="text-sm font-medium text-center">{brand.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
