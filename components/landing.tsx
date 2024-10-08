import React from 'react'

import { User } from '@prisma/client'
import { Button } from './ui/button'
import { LandingCard } from './landing-card'

export const Landing = ({
  user
}:{
  user:User|null
}) => {
  if (user) return <LandingCard />
  
  return (
    <div className=' min-h-screen bg-[url("/hero.jpeg")] bg-contain 
    bg-center lg:p-24 md:p-16 sm:p-8 p-6 flex flex-col items-center w-full gap-y-3'>
        <div className=' inset-0 w-full h-full absolute bg-black/20 z-0'/>
        <h2 className=' lg:text-5xl md:text-4xl sm:text-3xl text-xl 
        font-semibold justify-center text-red'>
         Opec smart door system
        </h2>
        <p className=' text-md font-light text-neutral-300 leading-relaxed'>
          Login or sign up to be part of our community to get access to our services and access to doors !

        </p>
        <Button className=' font-semibold ' variant={"secondary"} size={"lg"}>
           Sign Up
        </Button>
        <Button className=' font-semibold text-red-600' variant={"ghost"} size={"lg"}>
           Login
        </Button>
    </div>
  )
}
