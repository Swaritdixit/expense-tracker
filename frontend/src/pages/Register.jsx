import { useState } from "react";
import {registerUser}from"../services/authService";
import{useNavigate} from "react-router-dom"
import { Link } from "react-router-dom";
import "../styles/register.css"
function Register() {

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();
async function handleSubmit(e){

  e.preventDefault();

  try{

    const userData={
      name,
      email,
      password
    };
    await registerUser(userData);
    alert("Check email to verify account");
navigate("/");


   
  }
  catch(err){

   console.log("FULL ERROR:", err);
  console.log("BACKEND RESPONSE:", err.response?.data);

  alert(err.response?.data?.message || "Registration Failed");
}
}

return (
  <div className="register-container">
    <h1>Register</h1>

    <form onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e)=>
          setName(e.target.value)
        }
      />

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
        Register
      </button>

    </form>
    <p>
  Already have an account? <Link to="/">Login</Link>
</p>

  </div>
);
}

export default Register;