import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate , Link } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const storedUser = users.find(
      (user) => user.name === name && user.password === password
    );

    if (storedUser) {
      login(storedUser);
      localStorage.setItem("user", JSON.stringify(storedUser));
      navigate("/home");
    } else {
      setErrorMessage("Invalid name or password!");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleLogin} className="form">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/" >login</Link>
        </p>
        {errorMessage && <h4 style={{ color: "red" }}>{errorMessage}</h4>}
      </form>
    </div>
  );
};

export default Login;
