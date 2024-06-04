"use client"
import { Category } from '@/types'
import React, { useState } from 'react'
import { TableCell, TableRow } from '../ui/table'
import { Edit, Trash } from 'lucide-react'
import EditCategory from './edit-category'
import { deleteCategory } from '@/db/db'
import useExpenseStore from '@/store/useExpenseStore'

type Props = {
  category:Category
}

function CategoryItem({category}: Props) {

  const deleteCategoryFromState = useExpenseStore(state=>state.deleteCategory);
  const [loading,setLoading] = useState<boolean>(false);

  const handleDelete = async(categoryId:string)=>{
        setLoading(true);
        try{
          const result = await deleteCategory(categoryId);
          if(result.error) return;
        }catch{

        }finally{

          deleteCategoryFromState(categoryId);
        }
       
  }

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
        {!loading &&  <button
          disabled={loading}
          onClick={()=>handleDelete(category.categoryId!)}
          ><Trash  width={"20px"} height={"20px"}  /></button>}
        </div>
    </TableCell>
    
  </TableRow>
  )
}

export default CategoryItem