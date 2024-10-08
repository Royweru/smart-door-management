import React from 'react'
import {TriangleAlert} from 'lucide-react'
export const ErrorSec = ({
    message
}:{
    message?:string
}) => {
    if(!message) return null
  return (
    <div className=' p-3 rounded-md
      bg-rose-500/65  text-rose-500 flex items-center justify-center gap-x-2'>
        <TriangleAlert className=' font-semibold text-rose-500 size-4' />
        <p className=' text-sm font-semibold'>
             {message}
        </p>
    </div>
  )
}
