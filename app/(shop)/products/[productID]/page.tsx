// app/(shop)/products/[productID]/page.tsx
export const dynamic = 'force-dynamic';
export const fetchCache = 'default-no-store';

import React from 'react';
import { getProductDetails } from '@/app/services/products.service';
import { IProduct } from '@/app/interfaces/product.interface';
import { Heart, Star } from 'lucide-react';
import ProductSlider from '@/app/components/products/productSlider';
import { Button } from '@/components/ui/button';
import AddToProductButton from '@/app/components/AddToProductButton'; // adjust if your path differs

type Params = { productID: string };

export default async function ProductDetails(
  props: { params: Promise<Params> } // params is async on your Next version
) {
  const { productID } = await props.params; // await params before using it
  const { data: product }: { data: IProduct } = await getProductDetails(productID);

  return (
    <section className="py-10 px-6 xl:px-32">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left - Image Gallery */}
        <div className="flex gap-4">
          <ProductSlider images={product.images} />
        </div>

        {/* Right - Product Info */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold mb-4">{product.title}</h1>

          {/* Rating */}
          <div className="flex items-center gap-x-2">
            <Star className="text-yellow-400 fill-yellow-400 size-4" />
            <span className="text-gray-600 text-sm font-medium">{product.ratingsAverage}</span>
            <span className="text-gray-400 text-sm">({product.ratingsQuantity} Reviews)</span>
            <span className="text-green-600 text-sm font-medium ml-2">In Stock</span>
          </div>

          {/* Price */}
          <div className="text-2xl font-semibold text-red-500">EGP{product.price}</div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>

          {/* Colours */}
          {Array.isArray(product.availableColors) && product.availableColors.length > 0 && (
            <div className="flex gap-2 items-center">
              <span className="text-sm font-medium">Colours:</span>
              {product.availableColors.map((color) => (
                <div
                  key={color}
                  className="w-6 h-6 rounded-full border-2 border-gray-300"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}

          {/* Sizes */}
          <div className="flex gap-2 items-center">
            <span className="text-sm font-medium">Size:</span>
            {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
              <button
                key={size}
                className="h-8 px-3 text-sm border border-gray-400 rounded hover:border-black"
              >
                {size}
              </button>
            ))}
          </div>

          {/* Quantity & Buy */}
          <div className="flex items-center gap-3">
            <div className="flex items-center border rounded">
              <Button className="px-3 py-1 text-lg cursor-pointer">-</Button>
              <span className="px-4 py-1">1</span>
              <Button className="px-3 py-1 text-lg cursor-pointer">+</Button>
            </div>

            <AddToProductButton
              variant="destructive"
              className="hover:bg-red-600 cursor-pointer text-white px-6 py-2 rounded"
              productId={product._id}
            />

            <Button className="bg-transparent cursor-pointer px-4 py-2 hover:bg-gray-100">
              <Heart className="size-5 fill-red-500" />
            </Button>
          </div>

          {/* Delivery Info */}
          <div className="border rounded p-4 mt-4">
            <div className="text-sm font-medium mb-1">🚚 Free Delivery</div>
            <p className="text-sm text-gray-500">Enter your postal code for Delivery Availability</p>
          </div>

          {/* Return Info */}
          <div className="border rounded p-4 mt-2">
            <div className="text-sm font-medium mb-1">🔄 Return Delivery</div>
            <p className="text-sm text-gray-500">
              Free 30 Days Delivery Returns. <span className="underline cursor-pointer">Details</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
