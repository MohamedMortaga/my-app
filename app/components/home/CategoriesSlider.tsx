'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import Image from 'next/image'
import { ICategory } from '@/app/interfaces/category.interface'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import { Separator } from '@/components/ui/separator'

// Swiper options
const swiperOptions = {
  slidesPerView: 1, // ✅ FIXED here
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 5,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 15,
    },
    1300: {
      slidesPerView: 6,
      spaceBetween: 30,
    },
  },
  pagination: {
    clickable: true,
    bulletClass: 'swiper-pagination-bullet !size-4 border-2',
    bulletActiveClass: 'swiper-pagination-bullet-active !bg-red-500 border-white',
  },
  modules: [Pagination],
}


interface Props {
  categories: ICategory[]
}

export default function CategoriesSlider({ categories }: Props) {
  return (
    <>
    <Swiper className="cat-swiper" {...swiperOptions}>
      {categories.map((category) => (
        <SwiperSlide className='mb-7' key={category._id}>
          <div className="text-center">
            <Image
              src={category.image}
              alt={category.name}
              width={270}
              height={250}
              loading="lazy"
              className="w-full h-[15.625rem] object-contain bg-gray-100 p-1 rounded-xl mb-4"
            />
            <h3 className="font-medium">{category.name}</h3>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
    <Separator className='mt-10'/>
    </>
  )
}
