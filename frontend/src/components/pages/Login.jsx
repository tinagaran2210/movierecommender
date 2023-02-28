import React, {useState } from 'react'
import UserService from '../../services/UserService';

const Login = () =>{

  //Declaring variables
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errPW, setErrPW] = useState(null) //Use to check if password error is true or null
  const [errUser, setErrUser] = useState(null) //Use to check if username error is true or null

  //Make the function asynchronous so it will retrieve all API call result then load the page
  const onSubmit = async (e) => {

    e.preventDefault() //prevent page from loading on default

    //Creating object user with password and username as variables
    const user = {
      password,
      username
    };
    
    //Sending the user object to the API call and getting the result
    await UserService.login(user).then((res) => {

      //If successfull show an alert saying login successfull
      alert('Login Successful')
      const data = res.data //Getting the result from the api 
      console.log(res.data)

      //Checking if the user type is 1 redirect to admin page
      if(data.type == "1")
      {
        window.location.href ="/Dashboard";

        //Storing the current user data into session
        localStorage.setItem('id', data.userid)
        localStorage.setItem('username', data.username)
      }
      //Checking if the user type is 2 redirect to homepage which is ViewMovie
      else
        window.location.href ="/ViewMovie";

        //Storing the current user data into session
        localStorage.setItem('id', data.userid)
        localStorage.setItem('username', data.username)

    }).catch(error => { //Catching error 

      console.log(error)
      if(error.response) //Checking if error has a response code
      {
        
        console.log(error.response.status); //Displaying the error message send by the API

        //Checking if the status is 500 an alert message will display and username error will set to true
        if(error.response.status == 500){
          alert("User Does Not Exist");
          setErrUser(true);
        }
        else{

          //Checking if the status is other 500 an alert message will display and password error will set to true
          alert(error.response.data);
          setErrPW(true);
        }
        console.log(error.response.headers);
      }
      //This is to check if the error is server connection error
      else if(error.request){
        console.log(error.request)
      }
      else{
        console.log('Error', error.message)
      }
    })

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
            <h3 className="Auth-form-title">Sign In</h3>
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
              {//Checking if the password error is true then display the error message
                errPW != null && (
                  <div style={{display: "block", color: "red"}}>
                    Username or password is incorrect
                  </div>
              )}
              {//Checking if the username error is true then display the error message
                errUser != null && (
                  <div style={{display: "block", color: "red"}}>
                    User does not exist
                  </div>
              )}
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <br/>
            <p className="forgot-password text-right">
              Forgot Password? <a href="#">Click here</a>
            </p>
            <p className="forgot-password text-right">
              Don't have an account? <a href="/SignUp">Click here</a>
            </p>
          </div>
        </form>
      </div>
    )
}

export default Login