"use client"
import { Reminder } from '@/types'
import React, { useEffect, useMemo, useState } from 'react';

import AddReminder from './add-reminder';
import useExpenseStore from '@/store/useExpenseStore';
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from '../ui/table'
import { useAuth } from '@clerk/nextjs'
import ReminderItem from './reminder-item';
import Heading from '../shared/heading';

type Props = {
    reminders:Reminder[]
}


function ReminderList({reminders}: Props) {
  
  const {reminders:remindersInState} = useExpenseStore(state=>state);
  const {isLoaded,userId} = useAuth();

 

  return (
    <div className='w-full space-y-8'>
        <Heading>Reminders</Heading>
        <div 
        className='flex items-center justify-between'
        >
          <AddReminder 
          userId={userId!}
          />
         
        </div>
        <div className='flex flex-col items-center'>
          <Table>
            <TableCaption>List of reminders</TableCaption>
            <TableHeader>
              <TableRow>
                  <TableHead className=''>Title</TableHead>
                  <TableHead className=''>Category</TableHead>
                  <TableHead className='text-right pr-10'>Price</TableHead>
                  <TableHead className='text-right pr-10'>Status</TableHead>
                  <TableHead className='text-right pr-10'>Action</TableHead>
                  
              </TableRow>
            </TableHeader>
            <TableBody>
            {
            remindersInState
            .sort((e1,e2)=>e1.createdAt!>e2.createdAt!?-1:1)
            .map((rem)=><ReminderItem 
            key={rem.reminderId}
            data={rem}
            />)
        }
            </TableBody>
          </Table>
        
        </div>
    </div>
  )
}

export default ReminderList