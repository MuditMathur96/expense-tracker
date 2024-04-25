"use client"
import { addExpense } from '@/db/db';
import useExpenseStore from '@/store/useExpenseStore'
import React, { ChangeEvent, ChangeEventHandler, FormEventHandler, useState } from 'react'
import { Dialog, DialogContent, DialogDescription,
     DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Expense } from '@/types';


type Props = {}

function AddExpense({}: Props) {
    const addExpenseState = useExpenseStore(state=>state.addExpense);
    const categories = useExpenseStore(state=>state.categories);
    const [loading,setLoading] = useState<boolean>(false);
    const [open,setOpen] = useState<boolean>(false);
    const [inputData,setInputData] = useState<Expense>({
        title:"",
        price:0,
        createdBy:"random user2",
        categoryId:""
        
    })
    const handleAddExpense:FormEventHandler = async(e)=>{
        e.preventDefault();
        setLoading(true);
      let res = await addExpense(inputData);
      setLoading(false);
      setOpen(false);
      if(res.error) return;
      if(res.data) addExpenseState(res.data);
      }

    const handleInputChange:ChangeEventHandler<HTMLInputElement> = (e)=>{
        setInputData(prev=>({...prev,[e.target.name]:e.target.value}));
    }
    const handleSelectChange:ChangeEventHandler<HTMLSelectElement> = (e)=>{
        setInputData(prev=>({...prev,[e.target.name]:e.target.value}));
    }
  return (
   

        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>

                <Button>Add Expense</Button>
            </DialogTrigger>

            <DialogContent >
                <DialogHeader>
                    <DialogTitle>Add a new expense</DialogTitle>
                </DialogHeader>
                <form 
                onSubmit={handleAddExpense}
                className='space-y-4'>
                    <div className='space-y-1'>
                        <label htmlFor='title'>Title</label>
                        <Input
                        onChange={handleInputChange}
                        name="title"
                        required />
                    </div>
                    <div className='space-y-1'>
                        <label htmlFor='title'>Price</label>
                        <Input
                        onChange={handleInputChange}
                        type="number"
                        name="price"
                        required />
                    </div>
                    <div className='space-y-1 flex flex-col'>
                        <label htmlFor='title'>Category</label>
                        <select 
                        value={inputData.categoryId || ""}
                        name="categoryId"
                        onChange={handleSelectChange}
                        required
                        className='p-2 rounded-sm border'>
                            <option className='!p-4'>Select a category</option>
                            {
                                categories.map((cat)=>{
                                    return( <option
                                    className='!p-2'
                                    key={cat.categoryId}
                                    value={cat.categoryId}>
                                        {cat.title}
                                    </option>)
                                })
                            }
                        </select>
                    </div>
                    <div className=' flex'>
                        <Button 
                        disabled={loading}
                        className='ml-auto'>Submit</Button>
                    </div>
                </form>
            </DialogContent>
                    
        </Dialog>

    
  )
}

export default AddExpense