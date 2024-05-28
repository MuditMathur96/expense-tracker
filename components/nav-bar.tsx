"use client"
import React from 'react'
import NavItem from './nav-items'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { SignIn } from '@clerk/clerk-react'


type Props = {}
const authRoutes =[
  {
    title:"Login",
    href:"/auth/sign-in"
  },
]

const userRoutes =[
  {
    title:"Reminder",
    href:"/reminders"
  },
]

function NavBar({}: Props) {

  const routes = userRoutes;
  return (
    <nav className='w-full
    flex items-center justify-between
    p-4
    h-16'>
        <div>
          <SignedIn>
          <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
        <div>
          {
            routes.map((route)=><NavItem 
            key={route.href}
            title={route.title} 
            href={route.href} />)
          }

        </div>
    </nav>
  )
}

export default NavBar