import Expenses from "@/components/expenses/expenses";
import { Button } from "@/components/ui/button";
import { addCategory, addExpense, getCategory, getExpenses } from "@/db/db";

import Image from "next/image";
import { useEffect } from "react";

export const revalidate = 0;

export default async function Home() {
  let expenseData = await getExpenses("random user2");
  let categoryData = await getCategory("random user2")
  return (
    <main className="w-full">
      
      <section className="w-full">
        <Expenses 
        categories={categoryData.data || []}
        expenses={expenseData.data || []} />
      </section>
    </main>
  );
}
