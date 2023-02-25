import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './admindashboard.css';

const AddUsers = () => {
const [email, setEmail] = useState("");
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [message, setMessage] = useState("");

const handleSubmit = async (event) => {
event.preventDefault();
if (password !== confirmPassword) {
setMessage("Passwords do not match");
return;
}
try {
const response = await fetch("http://localhost:8080/api/user/signup", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({ email, username, password }),
});
if (!response.ok) {
throw new Error(await response.text());
}
setMessage("User created successfully");
} catch (error) {
setMessage(error.message);
}
};

  return (
<form onSubmit={handleSubmit}>
      <div>
      <div className="menu-bar">

            <ul>
              <li>
                <Link to="/admin-user">Back</Link>
              </li>
            </ul>
          </div>

        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Password</th>
              <th>Confirm Password</th>
            </tr>
          </thead>
          <tbody>
                <td>
               <input
               type="text"
               id="username"
               value={username}
               onChange={(event) => setUsername(event.target.value)}
               required
               /></td>
                <td>
                 <input
                 type="email"
                 id="email"
                 value={email}
                 onChange={(event) => setEmail(event.target.value)}
                 required
                 />
                </td>
                <td><input
                    type="password"
                    id="password"
                    minlength="8"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    /></td>
                    <td><input
                        type="password"
                        id="confirmPassword"
                        minlength="8"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        required
                        /></td>
          </tbody>
        </table>
        <nav>
          <ul className="pagination">

            <br/>
                   <button type="submit" className="close-button">Add User</button>
                   <br/>
                   <br/>
                   {message && <p>{message}</p>}
            </ul>

           </nav>

           </div>
           </form>
    );

};


export default AddUsers;
