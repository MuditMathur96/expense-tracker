import { CATEGORY_DB, EXPENSE_DB } from "@/constants";
import { Category, Expense, IFuncReturnType, Reminder } from "@/types";
import {db} from '@/firebase';
import {v4 as uuid} from 'uuid';
import { doc,setDoc,getDocs
    ,serverTimestamp,
    query,
    where,
    collection,
    deleteDoc} from 'firebase/firestore';

export const getExpenses = async(userId:string)
                    :Promise<IFuncReturnType<Expense[]>>=>{

    try{
        const TODAY = new Date();
        const expense_collection = collection(db,EXPENSE_DB);
        const q = query(expense_collection,
            where('createdBy','==',userId ),
            where("month","==",TODAY.getMonth()+1)
        )
        const res = await getDocs(q);

        const expenseRes:Expense[] = [];

        res.forEach((doc)=>{
           
            let expense = doc.data();
            expenseRes.push({...expense,createdAt:expense.createdAt?.toDate()} as Expense);
        })
       // console.log(expenseRes);

        return {
            data:expenseRes,
            error:null
        }

    }catch(e:any){
        return {
            data:null,
            error:e.message
        }
    }





}

export const addExpense = async(data:Expense)
                    :Promise<IFuncReturnType<Expense>>=>{

    try{

        let expenseId = uuid();
        //console.log("before doc func");
        const expense_collection = doc(db,EXPENSE_DB,expenseId);
        const Today = new Date();
       // console.log("before add func");
       const dataToSave:Expense={
        ...data,
        expenseId,
        day:Today.getDate(),
        month:Today.getMonth()+1,
        year:Today.getFullYear()
       }
        await setDoc(expense_collection,{...dataToSave,
            createdAt:serverTimestamp()
        });
        //console.log("Expense was created");

        return {
            data:{...data,expenseId},
            error:null
        }

    }catch(e:any){
        return {
            data:null,
            error:e.message
        }
    }





}

export const deleteExpense = async(data:string)
                    :Promise<IFuncReturnType<boolean>>=>{

    try{

        //get collection ref
        //get document ref
        const docRef =  doc(db,EXPENSE_DB,data);
        //delete doc
        await deleteDoc(docRef);


        return {
            data:true,
            error:null
        }

    }catch(e:any){
        return {
            data:null,
            error:e.message
        }
    }





}

export const addReminder = async(data:Reminder)
                    :Promise<IFuncReturnType<string>>=>{

    try{









        return {
            data:"",
            error:null
        }

    }catch(e:any){
        return {
            data:null,
            error:e.message
        }
    }





}

export const deleteReminder = async(data:string)
                    :Promise<IFuncReturnType<string>>=>{

    try{

        







        return {
            data:"",
            error:null
        }

    }catch(e:any){
        return {
            data:null,
            error:e.message
        }
    }





}


export const getCategory = async(userId:string)
                    :Promise<IFuncReturnType<Category[]>>=>{

    try{
        const category_collection = collection(db,CATEGORY_DB);
        const q = query(category_collection,where('createdBy','==',userId))
        const res = await getDocs(q);

        const categories:Category[] = [];

        res.forEach((doc)=>{
           // console.log("received expense =>",doc.data());
            const category= doc.data();
            categories.push({...category,createdAt:category.createdAt?.toDate()} as Category);
        })
      

        return {
            data:categories,
            error:null
        }

    }catch(e:any){
        return {
            data:null,
            error:e.message
        }
    }





}
export const addCategory = async(data:Category)
                    :Promise<IFuncReturnType<Category>>=>{

    try{
        let categoryId = uuid();
        //console.log("before doc func");
        const expense_collection = doc(db,CATEGORY_DB,categoryId);
       // console.log("before add func");
        await setDoc(expense_collection,{...data,
            categoryId,
            createdAt:serverTimestamp()
        });
        //console.log("Expense was created");









        return {
            data:{...data,categoryId},
            error:null
        }

    }catch(e:any){
        return {
            data:null,
            error:e.message
        }
    }





}

export const editCategory = async(data:Category)
                    :Promise<IFuncReturnType<Boolean>>=>{

    try{
        //console.log("before doc func");
        const expense_collection = doc(db,CATEGORY_DB,data.categoryId!);
       // console.log("before add func");
        await setDoc(expense_collection,{...data});
        //console.log("Expense was created"


        return {
            data:true,
            error:null
        }

    }catch(e:any){
        return {
            data:null,
            error:e.message
        }
    }





}


export const deleteCategory = async(data:string)
                    :Promise<IFuncReturnType<boolean>>=>{

    try{

        //get collection ref
        //get document ref
        const docRef =  doc(db,CATEGORY_DB,data);
        //delete doc
        await deleteDoc(docRef);







        return {
            data:true,
            error:null
        }

    }catch(e:any){
        return {
            data:null,
            error:e.message
        }
    }





}