"use client"
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Logout } from '@/actions/logout'

export const LandingCard = () => {
  const onLogout = ()=>{
    Logout()
  }
  return (
    <Card>
      <CardContent className=' bg-neutral-200 rounded-xl shadow-md lg:w-[500px]'>
        <CardHeader>
          <CardTitle >
             Login  / Sign up
          </CardTitle>
        </CardHeader>
      </CardContent>
      <div className=' p-1'>
         <Button
         className=' font-semibold text-white'
         onClick={onLogout}
         >
         SignOut
         </Button>
      </div>
    </Card>
  )
}
