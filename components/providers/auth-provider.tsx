"use client"
import {ClerkProvider} from '@clerk/nextjs';
import { ReactNode } from 'react';

type Props ={
    children:ReactNode
}

const AuthProvider =  ({children}:Props)=>{

    return <ClerkProvider>
        {children}
    </ClerkProvider>

}


export default AuthProvider;