"use client"
import React from 'react'
import NavItem from './nav-items'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { SignIn } from '@clerk/clerk-react'
import Image from 'next/image';
import Link from 'next/link'


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
    h-16'>
        
        <div className='flex-1
        flex items-center gap-2 lg:gap-4
        '>
          <div className=' '>
            <Link
            href="/"
            >
            <Image 
            height={40}
            width={40}
            src="/logo.svg" 
            className='h-10'
            alt="Expense tracker" />
            </Link>
          </div>
          {
            routes.map((route)=><NavItem 
            key={route.href}
            title={route.title} 
            href={route.href} />)
          }

        </div>

        <div>
          <SignedIn>
          <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
    </nav>
  )
}

export default NavBar