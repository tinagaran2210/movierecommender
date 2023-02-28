import React, { useState } from 'react'
import UserService from '../../services/UserService'

const SignUp = () =>  {
  
    //Declaring variables
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [errEmail, setErrEmail] = useState(null) //Use to check if email error is true or null
    const [errUser, setErrUser] = useState(null) //Use to check if username error is true or null

     //Make the function asynchronous so it will retrieve all API call result then load the page
    const onSubmit = async (e) =>{

        e.preventDefault() //prevent page from loading on default

        //Creating object user with password, username, email, first and last name as variables
        const user = {
            username,
            email,
            firstname,
            lastname,
            password
        }

        //Checking if password 1 and password 2 from the form match 
        if(password === password2)
        {
            //If match, send the user object to the API call 
            await UserService.register(user).then((res) =>{

                alert('Account Registered')
                window.location.href ="/Login";
    
              //Catching error
            }).catch(error =>{

                //Checking if the error message is email
                if(error.response.data == "Email is already in use")
                  setErrEmail(true)
                //Checking if the error message is username
                else if(error.response.data == "Username is already exist")
                  setErrUser(true)

                console.log(error)
            })
        }
        else
            alert('Password Entered Does Not Match') //If the password entered does not match

    }


    return (
      <div className="Auth-form-container"
        style={{
          backgroundImage: `url(https://variety.com/wp-content/uploads/2022/12/100-Greatest-Movies-Variety.jpg?w=1360&h=765&crop=1)`,    
          backgroundSize: 'cover'
        }}
      >
        <form className="Auth-form" onSubmit = {(e) => onSubmit(e)}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>
            <div className="form-group mt-3">
              <label>First Name</label>
              <input
                className="form-control mt-1"
                placeholder="Enter First Name"
                type="text"
                value={firstname}
                onChange ={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Last Name</label>
              <input
                className="form-control mt-1"
                placeholder="Enter Last Name"
                type="text"
                value={lastname}
                onChange ={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Username</label>
              <input
                className="form-control mt-1"
                placeholder="Enter Username"
                type="text"
                value={username}
                onChange ={(e) => setUsername(e.target.value)}
                required
              />
              {//Checking if the username error is true then display the error message
                errUser != null && (
                  <div style={{display: "block", color: "red"}}>
                    Username is already in use
                  </div>
              )}
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value={email}
                onChange ={(e) => setEmail(e.target.value)}
                required
              />
              {//Checking if the email error is true then display the error message
                errEmail != null && (
                  <div style={{display: "block", color: "red"}}>
                    Email is already in use
                  </div>
              )}
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
                onChange ={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Re-Enter Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={password2}
                onChange ={(e) => setPassword2(e.target.value)}
                required
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <br/>
            <p className="forgot-password text-right">
              Already registered <a href="/Login">sign in?</a>
            </p>
          </div>
        </form>
    </div>
  )
}

export default SignUp;