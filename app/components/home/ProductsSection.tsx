import React from 'react';
import { getProducts } from '@/app/services/products.service';
import { IProduct } from '@/app/interfaces/product.interface';
import SectionTitle from '../shared/SectionTitle';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ProductsItem from '../products/ProductsItem';

export default async function ProductsSection() {
  const { data: products }: { data: IProduct[] } = await getProducts(8);

  return (
     <section className="py-10 container mx-auto px-4 lg:px-25">
        <div className="mx-auto">
            <SectionTitle title="Our Products" sub="Explore Our Products" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
            {products.map((product) => (
                <ProductsItem key={product._id} product={product} />
            ))}
        </div>

        <div className="flex justify-center mt-8">
            <Button variant={"destructive"} asChild>
                <Link href="/products">View All Products</Link>
            </Button>
        </div>
    </section>
  );
}
