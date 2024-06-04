"use client"
import { getCategory, getExpenses } from '@/db/db'
import React, { useCallback, useEffect } from 'react'
import ExpenseItem from './expense-item';
import ExpenseList from './expense-list';
import { Category, Expense } from '@/types';
import useExpenseStore from '@/store/useExpenseStore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CategoryList from '../categories/category-list';
import Heading from '../shared/heading';
import ExpenseAnalyticsMonthly from '../analytics/expense-analytics-monthly';
import { useAuth } from '@clerk/nextjs';
import { Circle } from 'lucide-react';
import Loading from '@/app/loading';
import { getReminders } from '@/db/reminer.db';

type Props = {
    
}


function Expenses({}: Props) {

  const {setExpenses,setCategory} = useExpenseStore(state=>state);
  const categoryState = useExpenseStore(state=>state.categories);
  const expenseState = useExpenseStore(state=>state.expenses);
  const { isLoaded,userId} = useAuth();

  const fetchData = useCallback(async(userId:string)=>{
    console.log("userId =>",userId);
    const expensesPromise =  getExpenses(userId!);
    const categoriesPromise =  getCategory(userId!);
    const remindersPromise =  getReminders(userId!);

    const [expenses,categories,reminders] = await Promise.all([expensesPromise,categoriesPromise,remindersPromise])
    setExpenses(expenses.data || []);
  setCategory(categories.data || []);
},[]); 
  useEffect(()=>{
    if(isLoaded && userId) fetchData(userId);
},[isLoaded,userId]);

  if(!isLoaded && !userId) return (<div>
    <Loading />
  </div>)


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
       {expenseState.length>0 && userId &&  <div className='min-h-[50vh] '>
          <Heading>Summary:</Heading>
          <ExpenseAnalyticsMonthly
          expenses={expenseState}
          />


        </div>}
    </section>
  )
}

export default Expenses