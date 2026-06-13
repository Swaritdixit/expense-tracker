import "../styles/Header.css"
import "../pages/Dashboard"
function Header({logout}){
    return (<header><h1 className="header">Expense Tracker</h1>
        <button classname="logout" onClick={logout}>Logout</button>
        </header>
    );
}
export default Header;