import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import axios from "axios";


function Login() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [login, setlogin] = useState({
    username: '',
    password: '',
    
  });
  const handleSignUpClick = () => {
    setShowSignUp(true);
  };
  const callSignUp=() => {
    alert("sign up");
  };
  const callLogin= async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post(
        "http://127.0.0.1:8000/backapp/login/",
        JSON.stringify(login),
        {
          headers: {
            "Content-Type": "application/json", 
          },
        }
      );
      if (response.status === 200) {
        if (response.data.login_status === 1) {
         alert("Successful");
         window.location.href="http://127.0.0.1:5173/";
        } else{
          alert("unsuccessful");
        }
      }
      
    }catch(e){
        alert("unsuccesful");
    }
    
    
  }
  const handleChange = (e) => {
    const { id, value } = e.target;
    setlogin({ ...login, [id]: value });
  };

  return (
    <>
      <div className="container mt-3 mb-1">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="image-container">
              <img src="images/logo.png" alt="logo" height="25%" width="25%" />
            </div>
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">{showSignUp ? 'Sign Up' : 'Sign In'}</h3>
                <br />
                {showSignUp ? (
                  
                  <form onSubmit={callSignUp}>
                    
                    <div className="form-group">
                      <label>Username</label>
                      <input type="text" className="form-control" id="username" placeholder="Create a username"  required/>
                    </div>
                    <br />
                    <div className="form-group">
                      <label>Full Name</label>
                      <input type="text" className="form-control" id="name" placeholder="Enter your name" required />
                    </div>
                    <br />
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" className="form-control" id="email" placeholder="Enter your email" required />
                    </div>
                    <br />
                    <div className="form-group">
                      <label>New Password</label>
                      <input type="password" className="form-control" id="password" placeholder="create password"  required/>
                    </div>
                    <br />
                    <div className="form-group">
                      <label>Contact No.</label>
                      <input type="number" className="form-control" id="contact" placeholder="Enter your contact no" required/>
                    </div>
                    <br />
                    <div className="form-group">
                      <label>Full Address</label>
                      <input type="text" className="form-control" id="address"  aria-describedby="addressnote" placeholder="Enter your address"required />
                      <small id="addresssnote" class="form-text text-muted">Please specify your delivery address.</small>
                    </div>
                    <br />
                    <div className="text-center">
                      <input className="btn btn-success custom-button" type="submit" value="Sign Up" />
                    </div>
                    
                    
                  </form>
                ) : (
                  /* Sign In */
                  <form onSubmit={callLogin}>
                    
                    <div className="form-group">
                      <label>Username</label>
                      <input type="text" className="form-control" id="username" placeholder="Enter Username"  onChange={handleChange} value={login.username} required />
                    </div>
                    <br />
                    <div className="form-group">
                      <label>Password</label>
                      <input type="password" className="form-control" id="password" placeholder="Enter password"  onChange={handleChange} value={login.password} required />
                    </div>
                    <br />
                    <div className="text-center">
                      <input className="btn btn-success custom-button" type="submit" value="Log In" />
                    </div>
                  </form>
                )}
                <br />
               
                <div className="line-with-text">
                  <hr className="custom-line" />
                  <span className="between-text">
                    {showSignUp ? 'Already a User?' : 'New to Veggie?'}
                  </span>
                  <hr className="custom-sec-line" />
                </div>
                <br />
                <div className="text-center">
                  
                  <button onClick={() => setShowSignUp(!showSignUp)} className="btn btn-light acc-custom-button">
                    {showSignUp ? 'Sign In' : 'Create New Account'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
