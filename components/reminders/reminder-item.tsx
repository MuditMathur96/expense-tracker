"use client"
import { Expense, Reminder } from '@/types'
import React, { useMemo, useState } from 'react'
import { TableCell, TableRow } from '@/components/ui/table'
import useExpenseStore from '@/store/useExpenseStore'
import { addExpense, deleteExpense } from '@/db/db'
import { deleteReminder } from '@/db/reminer.db'
import { useAuth } from '@clerk/nextjs'

type Props = {
    data:Reminder
}

function ReminderItem({data}: Props) {
  const categories = useExpenseStore(state=>state.categories);
  const addExpenseToState = useExpenseStore(state=>state.addExpense);


  const expenses = useExpenseStore(state=>state.expenses);
  const {userId} = useAuth()
  const [loading,setLoading] = useState<boolean>(false);

  const isPaid = useMemo(()=>{
      return expenses.find((exp)=>exp.title === data.title);
  },[expenses]); 

  const deleteReminderFromStore = useExpenseStore(state=>state.deleteReminder);
  const category = useMemo(()=>{
    return categories.find((cat)=>cat.categoryId === data.categoryId);
  },[data.categoryId,categories]);

  const handleDelete = async(reminderId:string)=>{

    deleteReminderFromStore(reminderId);
    const result = await deleteReminder(reminderId);
  }

  const handleAddExpense = async()=>{
   if(!userId) return;
    setLoading(true);
  const newExpense:Expense = {
    title:data.title,
    price:data.price,
    categoryId:data.categoryId,
    createdBy:userId

  }

  let res = await addExpense(newExpense);
  setLoading(false);
  if(res.error) return;
  if(res.data) addExpenseToState(res.data);
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
        <div 
        className='w-full flex justify-end'
        >
          <p
          className={`py-1 px-4 rounded-md text-center ${isPaid?"bg-green-200":
          "bg-orange-200 "}`}
          >{isPaid?"paid":"pending"}</p>
        </div>
      </TableCell>
      <TableCell className='text-right pr-10'>
        <div 
        className='flex gap-4 justify-end items-center'
        >
          {!loading && !isPaid && <button
          onClick={()=>handleAddExpense()}
          >Pay</button>}
          <button
          onClick={()=>handleDelete(data.reminderId!)}
          >Delete</button>
        </div>
      </TableCell>
    </TableRow>
  )
}

export default ReminderItem