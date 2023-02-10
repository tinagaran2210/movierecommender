import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = () => {
  const [adminname, setadminname] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/user/adminlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ adminname, password }),
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      localStorage.setItem("adminname", adminname);
      window.location.href = "admin-dashboard";
      setMessage("Login successful");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h1>Admin Login </h1>
      <div>
        <label htmlFor="adminname">Admin Userame:</label>
        <input
          type="text"
          id="adminname"
          value={adminname}
          onChange={(event) => setadminname(event.target.value)}
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
      <Link to="/">User Login?</Link>
    </form>
  );
};

export default LoginForm;
