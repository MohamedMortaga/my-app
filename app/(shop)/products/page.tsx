export const dynamic = 'force-dynamic';
export const fetchCache = 'default-no-store';

import React from 'react';
import { getProducts } from '@/app/services/products.service';
import { IProduct } from '@/app/interfaces/product.interface';
import ProductsItem from '@/app/components/products/ProductsItem';

export default async function ProductsSection() {
  const { data: products }: { data: IProduct[] } = await getProducts();

  return (
    <section className="py-10 container mx-auto px-25">
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-15 mb-15">
        {products.map((product) => (
          <ProductsItem key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
