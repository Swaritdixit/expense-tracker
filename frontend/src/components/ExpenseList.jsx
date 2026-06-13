import "../styles/ExpenseList.css"

function ExpenseList({expenses,deleteExpense,setEditingExpense}){
    return (
        <ul className="expense-list">
            <h2>Expenses</h2>
            {   expenses.length === 0 ? (

      <p>No expenses found</p>

    ) : (
                expenses.map((expense)=>(
                    <li className="expense-item"
                    key={expense.id}>
                      <p className="expense-actions">
                        {expense.title}
                      </p>
                    
                      <p className="expense-actions">
                        ₹{expense.amount}
                      </p>
                    
                      <p className="expense-actions">
                        {expense.category}
                      </p>
                    <button  className="delete-btn"
                    onClick={()=>deleteExpense(expense.id)}>
                        Delete
                    </button>
                    <button  className="edit-btn"
                    onClick={()=>setEditingExpense(expense)}>
                        Edit
                    </button>
                      <hr />
                     </li>
                )))
            }
    
        </ul>
    );
}
export default ExpenseList;