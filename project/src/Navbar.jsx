import React , {useState, useContext,useEffect} from 'react';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet, Link } from "react-router-dom";
import { AuthContext } from './AuthContext';
import axios from "axios";

const Navbar = () => {
  
  
  const {setIsLogIn,isLogIn,loggedInUsername,setLoggedInUsername} = useContext(AuthContext);
  const [showSignUp, setShowSignUp] = useState(false);
  
  const [login, setlogin] = useState({
    username: '',
    password: '',
    
  });
  const [signup , setsignup]= useState({
    username: '',
    name: '',
    email: '',
    password: '',
    contact: '',
    address : '',

  })
  
  const callSignUp=async () => {
    try{
      const response = await axios.post(
        "http://127.0.0.1:8000/backapp/signup/",
        JSON.stringify(signup),
        {
          headers: {
            "Content-Type": "application/json", 
          },
        
         
        }
      );
      if (response.status === 200) {
         alert("Login Now");
         setShowSignUp(false);
        
      }
        
      else{
          alert("Username/Email already in use");
        }
      
      
    }catch(e){
        alert(response.error);
    }
    
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
          
      sessionStorage.setItem('user', true);
      sessionStorage.setItem('username', login.username);
         alert("successful");
         setIsLogIn(true);
        sessionStorage.setItem('user',true);
        sessionStorage.setItem('username',login.username);
         setLoggedInUsername(login.username);
         
         closeModal(true)

         
        
        }
        
         else{
          alert("unsuccessful");
        }
      }
      
    }catch(e){
        alert("error");
    }
    
    
  }

  console.log(isLogIn);
  console.log(loggedInUsername)

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
      marginTop : '1.6%',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      
      marginRight: '-20%',
      transform: 'translate(-50%, -50%)',
      width: '71%',
      height: '90%',
      overflow: 'auto',
      innerWidth: '-20%',
      
      
    },
  };
  const handleSignUpChange= (e) => {
    const { id, value } = e.target;
    setsignup({ ...signup, [id]: value });
  }
  const handleChange = (e) => {
    const { id, value } = e.target;
    setlogin({ ...login, [id]: value });
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
   
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
     
 
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
  
        <img
          src="images/logo.png" 
          width="40"
          height="40"
          class="d-inline-block align-top"
          alt="Company Logo"
        />
        <label><b>&nbsp;VEGGIE&nbsp;&nbsp;</b></label>
      
        
      
  {sessionStorage.getItem('user')?.toLowerCase() === 'true' ? (
        <><span className="navbar-text">
            Welcome, {sessionStorage.getItem('username')}
          </span><ul class="navbar-nav mr-auto mt-2 mt-lg-0">
              <li class="nav-item active">
                <a class="nav-link" href="#">My Order</a>
              </li>
            </ul></>

      ) : (
        <button onClick={openModal}>Login</button>
      )}


<Modal
  isOpen={isModalOpen}
  onRequestClose={closeModal}
  contentLabel="login"
  style={customStyles}
  
>

<div class="container mt-3 mb-0">
  <div class="d-flex justify-content-end">
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16" onClick={closeModal}>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
</svg>

  </div>

        <div class="row justify-content-center">
          <div class="col-md-5">
            
            <div class="card">
              <div class="card-body">
                <h3 class="card-title">{showSignUp ? 'Sign Up' : 'Sign In'}</h3>
                <br />
                {showSignUp ? (
                  
                  <form onSubmit={callSignUp}>
                    
                    <div class="form-group">
                      <label>Username</label>
                      <input type="text" class="form-control" id="username" placeholder="Create a username"  onChange={handleSignUpChange} required/>
                    </div>
                    <br />
                    <div class="form-group">
                      <label>Full Name</label>
                      <input type="text" class="form-control" id="name" placeholder="Enter your name" onChange={handleSignUpChange} required />
                    </div>
                    <br />
                    <div class="form-group">
                      <label>Email</label>
                      <input type="email" class="form-control" id="email" placeholder="Enter your email" onChange={handleSignUpChange} required />
                    </div>
                    <br />
                    <div class="form-group">
                      <label>New Password</label>
                      <input type="password" class="form-control" id="password" placeholder="create password" onChange={handleSignUpChange}  required/>
                    </div>
                    <br />
                    <div class="form-group">
                      <label>Contact No.</label>
                      <input type="number" class="form-control" id="contact" placeholder="Enter your contact no" onChange={handleSignUpChange} required/>
                    </div>
                    <br />
                    <div class="form-group">
                      <label>Full Address</label>
                      <input type="text" class="form-control" id="address"  aria-describedby="addressnote" placeholder="Enter your address" onChange= {handleSignUpChange} required />
                      <small id="addresssnote" class="form-text text-muted">Please specify your delivery address.</small>
                    </div>
                    <br />
                    <div class="text-center">
                      <input class="btn btn-success custom-button" type="submit" value="Sign Up" />
                    </div>
                    
                    
                  </form>
                ) : (
                  /* Sign In */
                  <form onSubmit={callLogin}>
                    
                    <div class="form-group">
                      <label>Username</label>
                      <input type="text" class="form-control" id="username" placeholder="Enter Username"  onChange={handleChange} value={login.username} required />
                    </div>
                    <br />
                    <div class="form-group">
                      <label>Password</label>
                      <input type="password" class="form-control" id="password" placeholder="Enter password"  onChange={handleChange} value={login.password} required />
                    </div>
                    <br />
                    <div class="text-center">
                      <input class="btn btn-success custom-button" type="submit" value="Log In" />
                    </div>
                  </form>
                )}
                <br />
               
                <div class="line-with-text">
                  <hr class="custom-line" />
                  <span class="between-text">
                    {showSignUp ? 'Already a User?' : 'New to Veggie?'}
                  </span>
                  <hr class="custom-sec-line" />
                </div>
                <br />
                <div class="text-center">
                  
                  <button onClick={() => setShowSignUp(!showSignUp)} class="btn btn-light acc-custom-button">
                    {showSignUp ? 'Sign In' : 'Create New Account'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
 
     
   </Modal>

     <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home</a>
      </li>
      <li class="nav-item">
        <a id="about" class="nav-link" href="#">About Us</a>
      </li>
      
      <li class="nav-item">
      <a id="about" class="nav-link" href="/cart">Cart</a>
      </li>
      
      
      
    </ul>
    
    <div class="ml-auto d-flex w-50">
          <form class="form-inline w-100">
            <div class="input-group w-100">
              <input
                class="form-control mr-sm-1 fs-8 flex-grow-1" 
                type="search"
                placeholder="Search for Products.."
                aria-label="Search"
              />
              <button class="btn btn-outline-success fs-8 btn-sm" type="submit">
                Search
              </button>
            </div>
          </form>
        </div>
  </div>
</nav>
  );
};

export default Navbar;
