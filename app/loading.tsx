import { Loader } from 'lucide-react';
import React from 'react';
type Props = {}


function Loading({}: Props) {
  return (
    <div className='w-full flex items-center justify-center h-[50vh]'>
        <h1>
          <Loader className='w-12 h-12 md:w-[100px] md:h-[100px] animate-spin' />
        </h1>
    </div>
  )
}

export default Loading