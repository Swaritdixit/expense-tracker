import Header from "../components/Header"
import ExpenseForm from "../components/ExpenseForm"
import ExpenseList from "../components/ExpenseList"
import CategoryFilter from "../components/CategoryFilter"
import SearchBar from "../components/SearchBar"
import "../styles/App.css"
import {useState,useEffect} from "react"
import { useNavigate }
from "react-router-dom";
function Dashboard() {
 const[expenses,setExpenses]=useState([])
 const[editingExpense,setEditingExpense]=useState(null);
 const[selectedCategory,setSelectedCategory]=useState("All");
const[searchTerm,setSearchTerm]=useState("");

const navigate=usenavigate();
function logout(){
    localStorage.removeItem("token");
    navigate("/");
}

 async function addExpense(expense){
 try{ 
   if(expense.title!==''&&expense.amount!==''&&expense.category!=='')
   { const response=await createExpense(expense);
  setExpenses([...expenses,response.data]);}}
  catch(err){
    console.log(err);
  }
}

async function deleteExpense(id){
  try{
    await deleteExpenseById(id);
  setExpenses(
    expenses.filter((expense)=>expense._id!==id)
  );}
  catch(err){
    console.log(err);
  }
}

async function updateExpense(updatedExpense){
  try{
    const response=await updateExpensesById(updatedExpense._id,updatedExpense);
  setExpenses(
    expenses.map((expense)=>
    expense.id===updatedExpense.id?updatedExpense:expense)
  );
  setEditingExpense(null);}
  catch(err)
  {
    console.log(err);
  }
}
const totalAmount=expenses.reduce((sum,expense)=>sum+Number(expense.amount),0);
const filteredExpenses=selectedCategory==="All"?expenses:expenses.filter(
  (expense)=>expense.category===selectedCategory
);
const displayedExpenses=filteredExpenses.filter((expense)=>expense.title.toLowerCase().includes(searchTerm.toLowerCase()));



useEffect(()=>{getExpenses()
  .then((response)=>{
    setExpenses(response.data);
  });
},[]);
return(<div className="app-container">
    <Header />
    <ExpenseForm
       addExpense={addExpense}
       updateExpense={updateExpense}
       editingExpense={editingExpense}/>
       <SearchBar
       searchTerm={searchTerm}
       setSearchTerm={setSearchTerm}/>
       <CategoryFilter
       selectedCategory={selectedCategory}
           setSelectedCategory={setSelectedCategory}/>
    <ExpenseList expenses={displayedExpenses}
      deleteExpense={deleteExpense}
      setEditingExpense={setEditingExpense}/>
      <div className="total-card">
      <h2>Total Spending:₹{totalAmount}</h2>
      </div>
    </div>);
}

export default Dashboard;