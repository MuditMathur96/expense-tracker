import { Category } from '@/types'
import React from 'react'
import { Button } from '../ui/button'
import { addCategory } from '@/db/db'
import CategoryItem from './category-items'
import useExpenseStore from '@/store/useExpenseStore'
import AddCategory from './add-category'
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from '../ui/table'

type Props = {
    categories:Category[]
}

function CategoryList({categories}: Props) {

    const addCategoryState = useExpenseStore(state=>state.addCategory);
  return (
    <div>
      <AddCategory />
      <Table>
            <TableCaption>A list of all categories</TableCaption>
            <TableHeader>
              <TableRow>
                  <TableHead className=''>Title</TableHead>
                  <TableHead className='w-[40%]'>Color</TableHead>
                  <TableHead> Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {
            categories.map((cat)=><CategoryItem 
            key={cat.categoryId}
            category={cat}
            />)
        }
            </TableBody>
          </Table>

     
    </div>
  )
}

export default CategoryList