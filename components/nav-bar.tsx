"use client"
import React from 'react'
import NavItem from './nav-items'


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
    href:"/reminder"
  },
]

function NavBar({}: Props) {

  const routes = userRoutes;
  return (
    <nav className='w-full
    flex items-center justify-between
    p-4
    h-16'>
        <div><NavItem 
        href={"/"}
        title="User"
        /></div>
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