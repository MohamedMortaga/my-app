"use client"
import React from 'react'

export default function error({error}:{error:Error}) {
  return (
    <div>

      <div className="flex flex-col justify-center items-center min-h-screen bg-white px-4">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-400 mb-4 self-start">
        <span className="text-gray-400">Home</span> /{" "}
        <span className="font-semibold text-black">Error</span>
      </div>

      {/* Error Title */}
      <h1 className="text-6xl font-bold text-black mb-4">Something went wrong</h1>

      {/* Error Message */}
      <p className="text-gray-600 mb-6 text-center max-w-xl">
        {error.message || "An unexpected error has occurred. Please try again later."}
      </p>  
    </div>

    </div>

  )
}
