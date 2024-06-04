"use client"
import { getReminders } from "@/db/reminer.db";
import useExpenseStore from "@/store/useExpenseStore";
import { useAuth } from "@clerk/nextjs";
import { useCallback, useEffect } from "react";


import ReminderList from "@/components/reminders/reminder-list";

export default function Reminders(){
    const {setReminder} = useExpenseStore(state=>state);
    const reminderState = useExpenseStore(state=>state.reminders);
    const { isLoaded,userId} = useAuth();
  
    const fetchData = useCallback(async(userId:string)=>{
      console.log("userId =>",userId);
      const reminders =  await getReminders(userId!);
      if(reminders.error) return [];
      setReminder(reminders.data!);
      
  },[]); 
    useEffect(()=>{
      if(isLoaded && userId) fetchData(userId);
  },[isLoaded,userId]);
    return (<div>
        <ReminderList
        reminders={reminderState}
        />
    </div>)
}