import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

export const LandingCard = () => {
  return (
    <Card>
      <CardContent className=' bg-neutral-200 rounded-xl shadow-md lg:w-[500px]'>
        <CardHeader>
          <CardTitle >
             Login  / Sign up
          </CardTitle>
        </CardHeader>
      </CardContent>
    </Card>
  )
}
