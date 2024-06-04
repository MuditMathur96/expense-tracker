import { Category, Expense, Reminder } from "@/types";
import { create } from "zustand";

type Store={

    expenses:Expense[],
    setExpenses:(data:Expense[])=>void,
    addExpense:(data:Expense)=>void,
    deleteExpense:(data:string)=>void,

    categories:Category[],
    addCategory:(data:Category)=>void,
    setCategory:(data:Category[])=>void,
    updateCategory:(data:Category) =>void,
    deleteCategory:(data:string)=>void,


    reminders: Reminder[],
    addReminder:(data:Reminder)=>void,
    setReminder:(data:Reminder[])=>void,
    updateReminder:(data:Reminder) =>void,
    deleteReminder:(data:string)=>void,




}


const useExpenseStore = create<Store>((set)=>({

    // Initial States
    expenses:[],
    categories:[],
    reminders:[],

    //expenses
    //#region 
    setExpenses:(data)=>set((state)=>({
        expenses:data
    })),

    addExpense:(data)=>set((state)=>({
        expenses:[data,...state.expenses]
    })),

    deleteExpense:(id)=>set((state)=>({
        expenses:state.expenses.filter((exp)=>exp.expenseId!== id)
    })),
    //#endregion


    //reminders
    //#region 
    setReminder:(data)=>set((state)=>({
        reminders:data
    })),
   updateReminder:(data)=>set((state)=>{
    return {
        reminders:state.reminders.map((cat)=>{
            if(cat.reminderId === data.reminderId){
                return data;
            }else return cat;
        })
    }
   }),

    addReminder:(data)=>set((state)=>({
        reminders:[...state.reminders,data]
    })),

    deleteReminder:(id)=>set((state)=>({
        reminders:state.reminders.filter((rem)=>rem.reminderId!==id)
    })),
    //#endregion

    //categories
    //#region 
    setCategory:(data)=>set((state)=>({
         categories:data
    })),
   updateCategory:(data)=>set((state)=>{
    return {
        categories:state.categories.map((cat)=>{
            if(cat.categoryId === data.categoryId){
                return data;
            }else return cat;
        })
    }
   }),

    addCategory:(data)=>set((state)=>({
        categories:[...state.categories,data]
    })),

    deleteCategory:(id)=>set((state)=>({
        categories:state.categories.filter((exp)=>exp.categoryId!== id)
    }))
    //#endregion





}))

export default useExpenseStore;