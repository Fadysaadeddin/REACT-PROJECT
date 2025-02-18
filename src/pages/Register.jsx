import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const { register } = useContext(AuthContext);

  const handleRegister = (e) => {
    e.preventDefault();

    const responseMessage = register(name, email, password);
    setMessage(responseMessage);

    if (responseMessage === "Registration successful! You can now log in.") {
      setTimeout(() => navigate("/login"), 2000);
    }
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
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
        {message && (
          <h4
            style={{ color: message.includes("successful") ? "green" : "red" }}
          >
            {message}
          </h4>
        )}
      </form>
    </div>
  );
};

export default Register;
