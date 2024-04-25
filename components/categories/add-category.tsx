"use client"
import { addCategory, addExpense } from '@/db/db';
import useExpenseStore from '@/store/useExpenseStore'
import React, { ChangeEvent, ChangeEventHandler, FormEventHandler, useState } from 'react'
import { Dialog, DialogContent, DialogDescription,
     DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Category, Expense } from '@/types';


type Props = {}

function AddCategory({}: Props) {
    const addCategoryState = useExpenseStore(state=>state.addCategory);
    const [isOpen,setIsOpen] = useState<boolean>(false);
    const [loading,setLoading] = useState<boolean>(false);
    const categories = useExpenseStore(state=>state.categories);
    const [inputData,setInputData] = useState<Category>({
        title:"",
        createdBy:"random user2",
        color:""
        
    })
    const handleAddExpense:FormEventHandler = async(e)=>{
        e.preventDefault();
        setLoading(true);
      let res = await addCategory(inputData);
      setLoading(false);
      setIsOpen(false);
      if(res.error) return;
      if(res.data) addCategoryState(res.data);
      }

    const handleInputChange:ChangeEventHandler<HTMLInputElement> = (e)=>{
        setInputData(prev=>({...prev,[e.target.name]:e.target.value}));
    }
  return (
   

        <Dialog
        open={isOpen}
        onOpenChange={setIsOpen}
        >
            <DialogTrigger 
            asChild
            >

                <Button>Add Category</Button>
            </DialogTrigger>

            <DialogContent >
                <DialogHeader>
                    <DialogTitle>Add a new category</DialogTitle>
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
                    <div className='space-y-1 flex items-center space-x-2'>
                        <label htmlFor='title'>Color</label>
                        <Input
                        className='w-12 h-10'
                        onChange={handleInputChange}
                        type="color"
                        name="color"
                        required />
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

export default AddCategory