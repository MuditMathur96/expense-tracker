"use client"
import {PieChart,Pie, ResponsiveContainer, Cell, Legend, Tooltip} from 'recharts';
import useExpenseStore from "@/store/useExpenseStore";
import { Expense } from "@/types";
import { useMemo } from 'react';

type Props ={
    expenses:Expense[]
}

type PieData = {
    name:string,
    value:number,
    color:string
}

const ExpenseAnalyticsMonthly = ({expenses}:Props)=>{

    const categories = useExpenseStore(state=>state.categories);

    const pieData =useMemo(()=>{
        // group by category and count total
        const finalData:PieData[] = [];
        const memo:Record<string,number> ={};
        expenses.forEach((exp)=>{
            if(Object.hasOwn(memo,exp.categoryId!)){
                memo[exp.categoryId!] = memo[exp.categoryId!] + +exp.price;
            }else{
                memo[exp.categoryId!] = +exp.price;
            }
        });

        Object.keys(memo).forEach((key)=>{
            const category= categories.find((cat)=>cat.categoryId === key);
            finalData.push({
                name:category?.title!,
                value:memo[key],
                color:category?.color || ""

            })
        });

        return finalData;


    },[expenses]);
    console.log("== pie data ==",pieData);

   return <ResponsiveContainer
   width={"95%"}
   height={400}
   >
        <PieChart
        width={400}
        height={350}
        cx={"50%"}
        cy={"50%"}
        >
        <Pie 
        data={pieData} 
        dataKey="value" 
        nameKey="name"
        label
        >
            {
               pieData.map((d)=>(<Cell 
               key={d.name}
               fill={d.color}
               />))
            }
        </Pie>
         <Tooltip />
        </PieChart>    
    </ResponsiveContainer>

}


export default ExpenseAnalyticsMonthly;