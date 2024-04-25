"use client"
import { Expense } from '@/types'
import React, { useMemo } from 'react'
import { TableCell, TableRow } from '../ui/table'
import useExpenseStore from '@/store/useExpenseStore'
import { deleteExpense } from '@/db/db'

type Props = {
    data:Expense
}

function ExpenseItem({data}: Props) {
  const categories = useExpenseStore(state=>state.categories);
  const deleteExpenseFromStore = useExpenseStore(state=>state.deleteExpense);
  const category = useMemo(()=>{
    return categories.find((cat)=>cat.categoryId === data.categoryId);
  },[data.categoryId,categories]);

  const handleDelete = async(expenseId:string)=>{

    deleteExpenseFromStore(expenseId);
    const result = await deleteExpense(expenseId);
  }


  return (
    <TableRow className=''>
      <TableCell className=''>
          <p>{data.title}</p>
      </TableCell>
      <TableCell>
          <div className='flex items-center space-x-4'>
          <div 
          style={{backgroundColor:category?.color}}
          className={`h-4 w-4`} />
          <p>{category?.title}</p>
          </div>
      </TableCell>
      <TableCell className='text-right pr-10'>
          <p>{data.price}</p>
      </TableCell>
      <TableCell className='text-right pr-10'>
          <button
          onClick={()=>handleDelete(data.expenseId!)}
          >Delete</button>
      </TableCell>
    </TableRow>
  )
}

export default ExpenseItem