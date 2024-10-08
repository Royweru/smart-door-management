"use client"

import React, { useState } from 'react'
import { AuthFlow } from '../types'
import { LoginCard } from './login-card'
import { SignUpCard } from './sign-up-card'

export const AuthScreen = () => {
    const [state,setState] = useState<AuthFlow>("signIn")
  return (
    <>
    {state==="signIn"?<LoginCard setState={setState} />:<SignUpCard setState={setState}/>}
    </>
  )
}
