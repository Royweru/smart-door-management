"use client"
import { CheckCircleIcon } from 'lucide-react'
import React from 'react'

export const Success= ({
    message
}:{
    message?:string
}) => {
    if(!message) return null
  return (
    <div className=' p-3 rounded-md
     bg-emerald-400 text-emerald-950 flex items-center justify-center gap-x-2'>
        <CheckCircleIcon className=' text-emerald-800 font-semibold size-4' />
        <p className=' text-sm font-semibold'>
             {message}
        </p>
    </div>
  )
}
