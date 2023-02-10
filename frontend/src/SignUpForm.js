import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUpForm.css";

const SignupForm = () => {
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
window.location.href = "/";
} catch (error) {
setMessage(error.message);
}
};

return (
<form className="signup-form" onSubmit={handleSubmit}>
<div>
 <h1>Signup </h1>
<label htmlFor="email">Email:</label>
<input
type="email"
id="email"
value={email}
onChange={(event) => setEmail(event.target.value)}
/>
</div>
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
minlength="8"
value={password}
onChange={(event) => setPassword(event.target.value)}
/>
</div>
<div>
<label htmlFor="confirmPassword">Confirm Password:</label>
<input
type="password"
id="confirmPassword"
minlength="8"
value={confirmPassword}
onChange={(event) => setConfirmPassword(event.target.value)}
/>
</div>
<button type="submit">Sign Up</button>
     <Link to="/">Login here</Link>
<div className="message">{message}</div>
</form>
);
};

export default SignupForm;