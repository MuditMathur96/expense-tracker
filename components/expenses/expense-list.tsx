"use client"
import { Expense } from '@/types'
import React, { useEffect, useMemo, useState } from 'react'
import ExpenseItem from './expense-item'
import useExpenseStore from '@/store/useExpenseStore'
import AddExpense from './add-expense'
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from '../ui/table'
import { useAuth } from '@clerk/nextjs'

type Props = {
    expenses:Expense[]
}


function ExpenseList({expenses}: Props) {
  
  const {expenses:stateExpense,addExpense:stateAddExpense} = useExpenseStore(state=>state);
  const {isLoaded,userId} = useAuth();

  const total = useMemo(()=>{
    return stateExpense.reduce((total,exp)=>total+(+exp.price),0);

  },[stateExpense]);
 

  return (
    <div className='w-full'>
        <div 
        className='flex items-center justify-between'
        >
          <AddExpense 
          userId={userId!}
          />
          <div 
          className='px-4 text-gray-600'
          >
            <p><span>Total</span>
            <span className='hidden md:inline'> expense this month</span>
            : {total} Rupee</p>
          </div>

        </div>
        <div className='flex flex-col items-center'>
          <Table>
            <TableCaption>List of recent expenses this month</TableCaption>
            <TableHeader>
              <TableRow>
                  <TableHead className=''>Title</TableHead>
                  <TableHead className='w-[40%]'>Category</TableHead>
                  <TableHead className='text-right pr-10'>Price</TableHead>
                  <TableHead className='text-right pr-10'>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {
            stateExpense
            .sort((e1,e2)=>e1.createdAt!>e2.createdAt!?-1:1)
            .map((exp)=><ExpenseItem 
            key={exp.expenseId}
            data={exp}
            />)
        }
            </TableBody>
          </Table>
        
        </div>
    </div>
  )
}

export default ExpenseList