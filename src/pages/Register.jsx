
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = (e) => {
//     e.preventDefault();

//     // Get existing users or create an empty array
//     const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

//     // Check if user already exists
//     const userExists = existingUsers.some(user => user.email === email);
//     if (userExists) {
//       alert("User already registered! Try logging in.");
//       return;
//     }

//     // New user object
//     const newUser = { 
//       name, 
//       email, 
//       password, 
//       favorites: [], 
//       mealsByCategory: {} // Store meals created by user
//     };

//     // Add new user to the list
//     existingUsers.push(newUser);
//     localStorage.setItem("users", JSON.stringify(existingUsers));

//     // Redirect to login
//     navigate("/login");
//   };

//   return (
//     <div className="container">
//       <form onSubmit={handleRegister} className="form">
//         <h2>Register</h2>
//         <input type="text" placeholder="Name" required value={name} onChange={(e) => setName(e.target.value)} />
//         <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
//         <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
//         <button type="submit">Register</button>
//         <p>Already have an account? <a href="/login">Login</a></p>
//       </form>
//     </div>
//   );
// };

// export default Register;


import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { register } = useContext(AuthContext); // Access the register function from AuthContext

  const handleRegister = (e) => {
    e.preventDefault();

    // Use the register function from AuthContext
    register(name, email, password);

    // Redirect to login page or home after successful registration
    navigate("/login"); // Redirect to home page
  };

  return (
    <div className="container">
      <form onSubmit={handleRegister} className="form">
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
        <p>Already have an account? <a href="/login">Login</a></p>
      </form>
    </div>
  );
};

export default Register;
