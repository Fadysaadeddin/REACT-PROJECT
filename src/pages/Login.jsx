

import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Get all registered users
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find matching user
    const storedUser = users.find(user => user.email === email && user.password === password);

    if (storedUser) {
      login(storedUser); // ✅ Store the full user object
      localStorage.setItem("user", JSON.stringify(storedUser)); // ✅ Save current user
      navigate("/home"); // Redirect to Home
    } else {
      // alert("Invalid email or password!");
      setErrorMessage("Invalid email or password!"); // Set error message
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleLogin} className="form">
        <h2>Login</h2>
        <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
        <p>Don't have an account? <a href="/">Register</a></p>
         {errorMessage && <h4 style={{ color: "red" }}>{errorMessage}</h4>} 
      </form>
    
    </div>
  );
};

export default Login;
