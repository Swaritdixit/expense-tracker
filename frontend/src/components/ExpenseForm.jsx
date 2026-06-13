import {useState,useEffect} from "react";
import "../styles/ExpenseForm.css"
function ExpenseForm({addExpense,updateExpense,editingExpense}){
    const[title,setTitle]=useState("");
    const[amount,setAmount]=useState("");
    const[category,setCategory]=useState("");

    
  function HandleSubmit(e){
   e.preventDefault();
   const expense={
    id:editingExpense
      ? editingExpense.id
      : Date.now(),
    title,amount,category};
    
   if (editingExpense) {

  updateExpense(expense);

} else {

  addExpense(expense);

}
   setTitle("");
   setAmount("");
   setCategory("");
  }
  useEffect(()=>{
  if(editingExpense){
    setTitle(editingExpense.title);
    setAmount(editingExpense.amount);
    setCategory(editingExpense.category);
  }
},[editingExpense]);
    return(
        <form
        className="expense-form"
        onSubmit={HandleSubmit}>
            <input
            className="form-input" 
            type="text" 
            value={title} 
            onChange={(e) =>  setTitle(e.target.value)}
            placeholder="Expense Title"/>
            <input 
            className="form-input" 
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e)=>setAmount(e.target.value)}/>
            <input
            className="form-input" 
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e)=>setCategory(e.target.value)}/>
            <button className="submit-btn">
                {
    editingExpense
      ? "Update Expense"
      : "Add Expense"
  }
            </button>

        </form>

    );
}
export default ExpenseForm