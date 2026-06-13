
import Dashboard from "./pages/Dashboard"
import Register from "./pages/Register"
import Login from "./pages/Login";
import {getExpenses,createExpense,deleteExpenseById,updateExpensesById} from "./services/expenseService"
import "./styles/App.css"
import ProtectedRoute from "./components/ProtectedRoutes";
import{Routes,Route} from "react-router-dom";



function App(){
 
  return(<Routes>
      <Route path="/"  element={<Login />} />

    <Route path="/register" element={<Register />}    />

    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    </Routes>
  );
}
export default App;