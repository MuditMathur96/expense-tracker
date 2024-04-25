"use client"
import { getExpenses } from '@/db/db'
import React, { useEffect } from 'react'
import ExpenseItem from './expense-item';
import ExpenseList from './expense-list';
import { Category, Expense } from '@/types';
import useExpenseStore from '@/store/useExpenseStore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CategoryList from '../categories/category-list';
import Heading from '../shared/heading';
import ExpenseAnalyticsMonthly from '../analytics/expense-analytics-monthly';

type Props = {
    expenses:Expense[],
    categories:Category[]
}


function Expenses({expenses,categories}: Props) {

  const {setExpenses,setCategory} = useExpenseStore(state=>state);
  const categoryState = useExpenseStore(state=>state.categories);
  const expenseState = useExpenseStore(state=>state.expenses);
  useEffect(()=>{
    setExpenses(expenses);
    setCategory(categories);
},[]);


  return (
    <section className='space-y-8 w-full'>
        <Heading>Expense Data:</Heading>

        <div className='w-full min-h-4 bg-slate-50'>
           <Tabs defaultValue='expenses'>
            <TabsList className='grid grid-cols-2'>
                <TabsTrigger value='expenses'>Expenses</TabsTrigger>
                <TabsTrigger value='categories'>Categories</TabsTrigger>
            </TabsList>
            
            <TabsContent value='expenses'>
                <ExpenseList expenses={expenseState} />
            </TabsContent>
            <TabsContent value='categories'>
              <CategoryList categories={categoryState} />
            </TabsContent>

           </Tabs>

        </div>
       {expenseState.length>0 &&  <div className='min-h-[50vh] '>
          <Heading>Summary:</Heading>
          <ExpenseAnalyticsMonthly
          expenses={expenseState}
          />


        </div>}
    </section>
  )
}

export default Expenses