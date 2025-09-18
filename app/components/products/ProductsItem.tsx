
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { Star } from 'lucide-react';
import { IProduct } from '@/app/interfaces/product.interface';
import AddToProductButton from '../AddToProductButton';

export default function ProductsItem({product}: {product: IProduct}) {
  const colors = ['#F87171', '#60A5FA', '#34D399', '#FBBF24'];
    return (
    <div
        key={product._id}
        className="group relative bg-white p-4 border border-gray-200 rounded-lg shadow hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
    
        {/* Image wrapper with Add to Cart on hover */}
        <div className="relative w-full h-[250px] bg-gray-100 rounded-md overflow-hidden">
        <Link href={`/products/${product._id}`} className="block w-full h-full">
            <Image
            src={product.imageCover}
            alt={product.title}
            width={270}
            height={250}
            loading="lazy"
            className="w-full h-full object-contain"
            />
        </Link>

        {/* Add to Cart button (appears on image hover) */}
        <div className="absolute bottom-0 w-full translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
            <AddToProductButton className="cursor-pointer w-full hover:bg-gray-700  py-3 text-sm rounded-none rounded-b-md" productId={product._id} />
        </div>
        </div>

        {/* Product Title */}
        <Link href={`/products/${product._id}`}>
        <h3 className="text-center font-medium text-base mt-4 text-gray-800 hover:text-black transition line-clamp-1">
            {product.title}
        </h3>
        </Link>
        {/* Ratings and price */}
        <div className="flex items-center justify-center gap-x-1 mt-1">
            <span className="text-sm font-semibold text-red-600">
                ${product.price}
            </span>
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-semibold text-gray-700">
                {product.ratingsAverage.toFixed(1)}
            </span>
            <span className="text-xs text-gray-500">
                ({product.ratingsQuantity})
            </span>
        </div>

        {/* Color Swatches (top-left) */}
        <div className="flex items-center justify-center gap-1 z-10">
        {colors.map((color, idx) => (
            <span
            key={idx}
            className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
            style={{ backgroundColor: color }}
            />
        ))}
        </div>
    </div>
    );
}
