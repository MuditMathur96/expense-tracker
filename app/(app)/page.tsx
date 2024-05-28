
import Expenses from "@/components/expenses/expenses";
import { Button } from "@/components/ui/button";
import { addCategory, addExpense, getCategory, getExpenses } from "@/db/db";
import { useAuth } from "@clerk/nextjs";

export const revalidate = 0;

export default async function Home() {
 
  return (
    <main className="w-full">
      
      <section className="w-full">
        <Expenses />
      </section>
    </main>
  );
}
