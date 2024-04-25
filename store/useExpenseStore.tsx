import { Category, Expense } from "@/types";
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




}


const useExpenseStore = create<Store>((set)=>({

    expenses:[],
    categories:[],
    setExpenses:(data)=>set((state)=>({
        expenses:data
    })),

    addExpense:(data)=>set((state)=>({
        expenses:[data,...state.expenses]
    })),

    deleteExpense:(id)=>set((state)=>({
        expenses:state.expenses.filter((exp)=>exp.expenseId!== id)
    })),


    //categories
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





}))

export default useExpenseStore;