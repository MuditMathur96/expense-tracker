import { SignIn, SignUp } from '@clerk/nextjs'
import React from 'react'

type Props = {}

function SignUpPage({}: Props) {
  return (
    <div>
      <SignUp/>
    </div>
  )
}

export default SignUpPage