import React from 'react'

const AuthLayout = ({children}:{
    children:React.ReactNode
}) => {
  return (
    <div className=' w-full min-h-screen justify-center items-center
     bg-gradient-to-tr from-sky-100 via-blue-400 to-sky-950 flex 
    '>
        {children}
    </div>
  )
}

export default AuthLayout