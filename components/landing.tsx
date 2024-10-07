import React from 'react'
import { LandingCard } from './landing-card'

export const Landing = () => {
  return (
    <div className=' min-h-screen bg-[url("/hero.jpeg")] bg-contain 
    bg-center lg:p-24 md:p-16 sm:p-8 p-6 flex flex-col items-center w-full gap-y-3'>
        <div className=' inset-0 w-full h-full absolute bg-black/20 z-0'/>
        <h2 className=' lg:text-5xl md:text-4xl sm:text-3xl text-xl 
        font-semibold justify-center text-white'>
         Opec smart door system
        </h2>
        <LandingCard />
    </div>
  )
}
