import { CATEGORY_DB, EXPENSE_DB, REMINDER_DB } from "@/constants";
import { Category, Expense, IFuncReturnType, Reminder } from "@/types";
import { db } from '@/firebase';
import { v4 as uuid } from 'uuid';
import {
    doc, setDoc, getDocs
    , serverTimestamp,
    query,
    where,
    collection,
    deleteDoc
} from 'firebase/firestore';



export const getReminders = async (userId: string)
    : Promise<IFuncReturnType<Reminder[]>> => {

    try {
        const reminder_collection = collection(db, REMINDER_DB);
        const q = query(reminder_collection,
            where('createdBy', '==', userId)
        );
        const res = await getDocs(q);

        const expenseRes: Reminder[] = [];

        res.forEach((doc) => {

            let reminder = doc.data();
            expenseRes.push({ ...reminder, createdAt: reminder.createdAt?.toDate() } as Reminder);
        })
        // console.log(expenseRes);

        return {
            data: expenseRes,
            error: null
        }

    } catch (e: any) {
        return {
            data: null,
            error: e.message
        }
    }





}

export const addReminder = async (data: Reminder)
    : Promise<IFuncReturnType<Reminder>> => {

    try {

        let reminderId = uuid();
        //console.log("before doc func");
        const collection = doc(db, REMINDER_DB, reminderId);
        const Today = new Date();
        // console.log("before add func");
        const dataToSave: Reminder = {
            ...data,
            reminderId,
        }
        await setDoc(collection, {
            ...dataToSave,
            createdAt: serverTimestamp()
        });
        //console.log("Expense was created");

        return {
            data: { ...data, reminderId },
            error: null
        }

    } catch (e: any) {
        return {
            data: null,
            error: e.message
        }
    }





}

export const deleteReminder = async (data: string)
    : Promise<IFuncReturnType<boolean>> => {

    try {

        //get collection ref
        //get document ref
        const docRef = doc(db, REMINDER_DB, data);
        //delete doc
        await deleteDoc(docRef);


        return {
            data: true,
            error: null
        }

    } catch (e: any) {
        return {
            data: null,
            error: e.message
        }
    }





}

export const editReminder = async (data: Category)
    : Promise<IFuncReturnType<Boolean>> => {

    try {
        console.log("before updating category", data);
        const expense_collection = doc(db, CATEGORY_DB, data.categoryId!);
        // console.log("before add func");
        await setDoc(expense_collection, { ...data });
        //console.log("Expense was created"


        return {
            data: true,
            error: null
        }

    } catch (e: any) {
        return {
            data: null,
            error: e.message
        }
    }





}