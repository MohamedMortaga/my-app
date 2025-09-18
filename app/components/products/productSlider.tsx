'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ProductSlider({ images }: { images: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Left - Thumbnails */}
      <div className="flex md:flex-col gap-3 justify-center">
        {images.map((img, idx) => (
          <Image
            key={idx}
            src={img}
            alt={`Thumbnail ${idx + 1}`}
            width={80}
            height={80}
            onClick={() => setActiveIndex(idx)}
            className={`cursor-pointer object-contain border rounded-md transition-all duration-300 ${
              activeIndex === idx ? 'ring-1 ring-red-300' : ''
            }`}
          />
        ))}
      </div>

      {/* Right - Main Image */}
      <div className="flex-1 flex justify-center items-center">
        <Image
          src={images[activeIndex]}
          alt="Main Product Image"
          width={400}
          height={400}
          className="object-contain bg-gray-100 p-2 rounded-lg"
        />
      </div>
    </div>
  );
}
