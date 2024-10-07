import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

export const LandingCard = () => {
  return (
    <Card>
      <CardContent className=' bg-slate-200 rounded-xl shadow-md'>
        <CardHeader>
          <CardTitle>
             Login  / Sign up
          </CardTitle>
        </CardHeader>
      </CardContent>
    </Card>
  )
}
