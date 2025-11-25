import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post("http://localhost:9090/auth/login", {
      email,
      password,
    });

    // Save user in local storage
    localStorage.setItem("user", JSON.stringify(response.data));

    setMessage("Login Successful!");

    // ROLE BASED REDIRECT
    if (response.data.role === "ADMIN") {
      navigate("/admin");     // redirect to admin panel
    } else {
      navigate("/home");      // redirect to user home
    }

    console.log("User:", response.data);

  } catch (error) {
    setMessage("Invalid Email or Password" + error);
  }
};


  return (
    <div style={{ width: "300px", margin: "50px auto" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <button type="submit" style={{ width: "100%" }}>
          Login
        </button>
      </form>

      <p>{message}</p>
    </div>
  );
};

export default Login;
