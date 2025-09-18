import Link from 'next/link';
import { Button } from '@/components/ui/button';
import React from 'react';

export default function Notfound() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white px-4">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-400 mb-4 self-start">
        <span className="text-gray-400">Home</span> / <span className="font-semibold text-black">404 Error</span>
      </div>

      {/* Main Content */}
      <h1 className="text-6xl font-bold text-black mb-4">404 Not Found</h1>
      <p className="text-gray-600 mb-6 text-center">
        Your visited page not found. You may go home page.
      </p>

      {/* Button to home */}
        <div className='flex justify-center'>
            <Button variant={'destructive'} className='bg-red-500 hover:bg-red-600 cursor-pointer'>
                <Link href='/'>Back to home page</Link>
            </Button>
        </div>
    </div>
  );
}
