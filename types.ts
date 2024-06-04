export type Expense ={
    expenseId?:string,
    title:string,
    categoryId:string | null,
    price:number,
    day?:number,
    month?:number,
    year?:number,
    createdBy:string,
    createdAt?:string,

};

export type Category ={
    categoryId?:string,
    title:string,
    color:string,
    createdAt?:string,
    createdBy:string
}

export type Reminder ={
    reminderId?:string,
    title:string,
    categoryId:string,
    price:number,
    completed?:boolean,
    lastDay:number,
    createdBy:string,
    createdAt?:string,

}


export type IFuncReturnType<T> ={
    error: string | null,
    data: T | null
}