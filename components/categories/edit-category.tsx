"use client"
import { addCategory, addExpense, editCategory } from '@/db/db';
import useExpenseStore from '@/store/useExpenseStore'
import React, { ChangeEvent, ChangeEventHandler, FormEventHandler, useState } from 'react'
import { Dialog, DialogContent, DialogDescription,
     DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Category, Expense } from '@/types';
import { Edit } from 'lucide-react';


type Props = {
 category:Category
}

function EditCategory({category}: Props) {
    const updateCategoryState = useExpenseStore(state=>state.updateCategory);
    const [isOpen,setIsOpen] = useState<boolean>(false);
    const [loading,setLoading] = useState<boolean>(false);
    const categories = useExpenseStore(state=>state.categories);
    const [inputData,setInputData] = useState<Category>(category);
    const handleEditExpense:FormEventHandler = async(e)=>{
        e.preventDefault();
        setLoading(true);
      let res = await editCategory(inputData);
      setLoading(false);
      setIsOpen(false);
      if(res.error) {
        console.log(res.error);
        return;
      };
      if(res.data) updateCategoryState(inputData);
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

               <button>
               <Edit width={"20px"} height={"20px"} />

               </button>
            </DialogTrigger>

            <DialogContent >
                <DialogHeader>
                    <DialogTitle>Add a new category</DialogTitle>
                </DialogHeader>
                <form 
                onSubmit={handleEditExpense}
                className='space-y-4'>
                    <div className='space-y-1'>
                        <label htmlFor='title'>Title</label>
                        <Input
                        value={inputData.title}
                        onChange={handleInputChange}
                        name="title"
                        required />
                    </div>
                    <div className='space-y-1 flex items-center space-x-2'>
                        <label htmlFor='title'>Color</label>
                        <Input
                        className='w-12 h-10'
                        value={inputData?.color || ""}
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

export default EditCategory