import { useState } from "react";
import {loginUser} from "../services/authService";
import {useNavigate} from "react-router-dom"
import { Link } from "react-router-dom";
import "../styles/Login.css"
function Login() {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
const navigate=useNavigate();
async function handleSubmit(e){

  e.preventDefault();

  try{

    const userData = {
      email,
      password
    };

    const response =
      await loginUser(userData);

    localStorage.setItem(
      "token",
      response.data.token
    );

    navigate("/dashboard");

  }
  catch(err){

    console.log(err);

    alert("Invalid Credentials");

  }

}
  return (
  <div className="login-container">
    <h1>Login</h1>

    <form onSubmit={handleSubmit}>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e)=>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>
          setPassword(e.target.value)
        }
      />

      <button type="submit">
        Login
      </button>

    </form>
    <p>
  Don't have an account?
  <Link to="/register">
    Register
  </Link>
</p>
  </div>
);
}

export default Login;