import "../styles/Header.css";
function Header({logout}){
    return (<header><h1 className="header">Expense Tracker</h1>
        <button className="logout" onClick={logout}>Logout</button>
        </header>
    );
}
export default Header;