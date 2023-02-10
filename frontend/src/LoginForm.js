import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      localStorage.setItem("username", username);
      window.location.href = "movie-list";
      setMessage("Login successful");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h1>Login </h1>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button type="submit">Login</button>
      <div className="message">{message}</div>
      <Link to="/signup">New User?</Link>
      <Link to="/admin-login">Admin Login?</Link>
    </form>
  );
};

export default LoginForm;
