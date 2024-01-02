import React, { useState , useEffect} from 'react';
//import './login.css'; // Assuming you have custom styles
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contextAPI/Auth';
import {  toast } from 'react-toastify';
const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    rememberMe: true, // Adding a state for the checkbox
  });

  // handling the input values
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };


    // handling the submission
   

    const Navigate = useNavigate();
    const { isLoggedIn , storeTokenInLS} = useAuth();

    useEffect(() => {
      setTimeout(() => {
        console.log('isLoggedIn changed agter storing:', isLoggedIn);
        // Add any logic that relies on the updated isLoggedIn state here
      }, 500); // Delay by 50 milliseconds
    }, [isLoggedIn]);
    

    const handleSubmit = async (e) => {
      try {
        e.preventDefault();
        console.log(user);
    
        const response = await fetch('https://mern-backend-avo4.onrender.com/mern/main/login', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        const res_data = await response.json();
    
        console.log("Response from server:", res_data);
    
        if (response.ok) {
    
          // Check if the token is present in the response
          if (res_data && res_data.token) {
            // store the token in local storage
            storeTokenInLS(res_data.token);
            console.log('isLoggedIn changed:', isLoggedIn);    
            // Navigate after updating context state
            toast.success("Login Successul");  
            Navigate("/");
            console.log("Token stored in local storage:", res_data.token);
          }
    
        } else {
          toast.warn(JSON.stringify(res_data));
        }
    
      } catch (error) {
        console.log("login form", error);
      }
    };
    

  return (
    <form>
      {/* Email input */}
      <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form2Example1">
          Email address
        </label>
        <input
          type="email"
          id="form2Example1"
          className="form-control"
          name="email"
          value={user.email}
          onChange={handleInput}
        />

      </div>

      {/* Password input */}
      <div className="form-outline mb-4">
      <label className="form-label" htmlFor="form2Example2">
          Password
        </label>
        <input
          type="password"
          id="form2Example2"
          className="form-control"
          name="password"
          value={user.password}
          onChange={handleInput}   />

      </div>

      {/* 2 column grid layout for inline styling */}
      <div className="row mb-4">
        <div className="col d-flex justify-content-center">
          {/* Checkbox */}
          
<div className="form-check">
  <input
    className="form-check-input"
    type="checkbox"
    id="form2Example31"
    name="rememberMe" // Added the name attribute
    checked={user.rememberMe}
    onChange={handleInput} // Added the onChange handler
  />
  <label className="form-check-label" htmlFor="form2Example31">
    Remember me
  </label>
</div>

        </div>

        <div className="col">
          {/* Simple link */}
          <a href="#!">Forgot password?</a>
        </div>
      </div>

      {/* Submit button */}
      <button
        type="button"
        className="btn btn-primary btn-block mb-4"
        onClick={handleSubmit}
      >
        Sign in
      </button>      
    </form>
  );
};

export default Login;