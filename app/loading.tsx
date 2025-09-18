import React from 'react'

export default function loading() {
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-white opacity-75 z-50 flex items-center justify-center'>
      <div className="loader"></div>
    </div>
  )
}
