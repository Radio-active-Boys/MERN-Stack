// Register.jsx
import React, { useState } from 'react';
import "./Register.css";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contextAPI/Auth';
import {  toast } from 'react-toastify';
const Register = () => {
    const[user,setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        dateOfBirth: "",
        gender: "male",
        address: ""

    });
    // handling the input values
    const handleInput = (e) => {
        console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]:value
        })
    };
    // handling the submission
   

    const Navigate = useNavigate();
    const {storeTokenInLS} = useAuth();

    const handleSubmit = async(e) => {
        try {
          e.preventDefault();
          console.log(user);
          
          
          const response = await fetch('http://localhost:5000/mern/main/register',{ 
          method:"POST",
          headers:{
            "Content-Type":"application/json",
          },   

          body: JSON.stringify(user),
          });


          const res_data = await response.json(); // Parse the JSON response         
          console.log("Response from server:", res_data);

        if (res_data.message === "Email already exists") {
            toast.error("Email already exists");
        } else if (res_data.message === "Password doesn't match") {
            toast.error("Password doesn't match");
        } else{
            if (response.ok) {
                // Check if the token is present in the response
                if (res_data && res_data.token) {
                    // Store the token in local storage
                    storeTokenInLS(res_data.token);
                    console.log("Token stored in local storage:", res_data.token);
                }
            
                setUser({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    dateOfBirth: "",
                    gender: "male",
                    address: ""
                });
            
                console.log(response);
                toast.success("Registration Successul");                
                Navigate("/login");
            } else {
                // Handle specific server-side responses
                    toast.info(JSON.stringify(res_data));
            }
        }

        
        } catch (error) {
          console.log("Registration form",error); 
        
        }};
    
    console.log("Registration is here");
    return (
        <>
        
            <section className="registration-container">
                <div className="registration-image bg-primary text-light py-3">
                    <img src="https://th.bing.com/th/id/R.d5cc2848b8023a04305f7f7879683c84?rik=BiRSY779oYSBaQ&riu=http%3a%2f%2fwww.clker.com%2fcliparts%2fh%2fG%2fX%2fd%2fN%2fM%2forange-button-register-here-hi.png&ehk=lSKi2qAC%2bl4d0xn%2biGPu8vndpeZu969cD69%2fPBPEzuk%3d&risl=&pid=ImgRaw&r=0" alt='Register here' />
                </div>
                <div className="registration-form">
                    <h1>Registration Form</h1>
                    <form onSubmit={handleSubmit} method="post">

                                    <label htmlFor="firstName">First Name:</label>
                                    <input type="text" id="firstName" name="firstName" required value = {user.firstName} onChange={handleInput} />

                                    <label htmlFor="lastName">Last Name:</label>
                                    <input type="text" id="lastName" name="lastName" required value = {user.lastName} onChange={handleInput}/>

                                    <label htmlFor="email">Email:</label>
                                    <input type="email" id="email" name="email" required value = {user.email} onChange={handleInput}/>

                                    <label htmlFor="password">Password:</label>
                                    <input type="password" id="password" name="password" minLength="8" required value = {user.password} onChange={handleInput}/>

                                    <label htmlFor="confirmPassword">Confirm Password:</label>
                                    <input type="password" id="confirmPassword" name="confirmPassword" minLength="8" required value = {user.confirmPassword} onChange={handleInput}/>

                                    <label htmlFor="dateOfBirth">Date of Birth:</label>
                                    <input type="date" id="dateOfBirth" name="dateOfBirth" required value = {user.dateOfBirth} onChange={handleInput}/>

                                    <label htmlFor="gender">Gender:</label>
                                    <select id="gender" name="gender" required value = {user.gender} onChange={handleInput}>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>

                                    <label htmlFor="address">Address:</label>
                                    <textarea id="address" name="address" value = {user.address} onChange={handleInput}></textarea>

                                    <button type="submit">Submit</button>
                    </form>
                </div>
                
            </section>
        </>
    );
}

export default Register;