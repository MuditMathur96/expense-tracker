import { ReactNode } from "react";

const Heading = ({children}:{children:ReactNode})=>{
    return (<h1
        className='text-gray-500 font-semibold text-2xl'
        >{children}</h1>)
}

export default Heading;