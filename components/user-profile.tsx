"use client"
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Avatar,AvatarFallback, AvatarImage } from './ui/avatar'
import { User } from '@prisma/client'
import { Logout } from '@/actions/logout'

export const UserProfile = ({
    user
}:{
    user:User
}) => {
    const avatarFallback = user.name?.charAt(0).toUpperCase()
    const signOut = ()=>{
        Logout()
    }
  return (
    <div className=' w-full flex lg:px-14 py-4
     md:px-8 px-6 justify-center items-center  mb-5'>
        <DropdownMenu>
           <DropdownMenuTrigger>
            <Avatar>
                <AvatarImage src='' alt='Avatar' />
                <AvatarFallback className=' bg-sky-300'>
                    {avatarFallback}
                </AvatarFallback>
            </Avatar>
           </DropdownMenuTrigger>
           <DropdownMenuContent className=' w-72 bg-white'>
            <DropdownMenuItem>
                <div 
                className='w-full flex items-center justify-center p-1 cursor-pointer hover:opacity-95'
                onClick={signOut}
                >
                   <h5 className=' text-sm font-semibold text-blue'>
                    Logout
                   </h5>
                </div>
            </DropdownMenuItem>
           </DropdownMenuContent>
        </DropdownMenu>
     </div>
  )
}
