import "../styles/Header.css"

function Header({logout}){
    return (<header><h1 className="header">Expense Tracker</h1>
        <button onClick={logout}>Logout</button>
        </header>
    );
}
export default Header;