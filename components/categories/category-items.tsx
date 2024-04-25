"use client"
import { Category } from '@/types'
import React from 'react'
import { TableCell, TableRow } from '../ui/table'
import { Edit, Trash } from 'lucide-react'
import EditCategory from './edit-category'

type Props = {
  category:Category
}

function CategoryItem({category}: Props) {
  return (
    <TableRow className=''>
    <TableCell className=''>
        <p>{category.title}</p>
    </TableCell>
    <TableCell>
        <div className='flex items-center space-x-4'>
        <div 
        style={{backgroundColor:category?.color}}
        className={`h-4 w-4`} />
        <p>{category?.title}</p>
        </div>
    </TableCell>
    <TableCell>
        <div className='flex  items-center justify-start gap-4'>
          <EditCategory 
          category={category}
          />
          <button><Trash  width={"20px"} height={"20px"}  /></button>
        </div>
    </TableCell>
    
  </TableRow>
  )
}

export default CategoryItem