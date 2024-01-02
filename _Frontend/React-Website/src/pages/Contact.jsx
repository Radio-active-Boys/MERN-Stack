import React, { useState } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../contextAPI/Auth';
import {  toast } from 'react-toastify';
const Contact = () => {
  const [user, setUser] = useState({
    contactName: '',
    email: '',
    message: '',
  });

  const [userData,setUserData] = useState(true);

  const { userDataLogged } = useAuth();
  console.log("Data on click  on contact ", userDataLogged);
  if(userData && userDataLogged){
    setUser({
      contactName: userDataLogged.firstName,
      email: userDataLogged.email,
      message: '',
    });

    setUserData(false);
  }

  // handling the input values
  const handleInput = (e) => {
    let fname = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [fname]: value,
    });
  };

  // handling the submission
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(user);
  
      const response = await fetch('https://mern-backend-avo4.onrender.com/mern/main/contact', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
  
      if (response.ok) {
        // Request was successful (status code 200-299 or 201 in this case)
        const responseData = await response.json();
        console.log(responseData);
        setUser({
          contactName: userDataLogged.firstName,
          email: userDataLogged.email,
          message: '',
        });
        toast.success("Contact form submitted successfully!");
      } else {
        // Request was not successful
        const errorData = await response.json();
        console.log(errorData);
        
        toast.error("Contact form submission failed!");
      }
    } catch (error) {
      console.log("Contact form", error);
      alert("An error occurred while submitting the form.");
    }
  };
  
  

  return (
    <section className="mb-4">
      <h2 className="h1-responsive font-weight-bold text-center my-4">Contact us</h2>
      <p className="text-center w-responsive mx-auto mb-5">We are here to help you</p>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <form id="contact-form" name="contact-form" action="mail.php" method="POST">
            <div className="mb-3">
              <label htmlFor="name" className="form-label text-center">
                Your name
              </label>
              <input
                 type="text"
                 id="name"
                 name="contactName"
                 className="form-control"
                    value={user.contactName}
                 onChange={handleInput}
               />


            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label text-center">
                Your email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className="form-control"
                value={user.email}
                onChange={handleInput}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="message" className="form-label text-center">
                Your message
              </label>
              <textarea
                type="text"
                id="message"
                name="message"
                rows="2"
                className="form-control md-textarea"
                value={user.message}
                onChange={handleInput}
              ></textarea>
            </div>

            <div className="text-center text-md-left">
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                Send
              </button>
            </div>
            <div className="status"></div>
          </form>
        </div>
      </div>

      <section className="d-flex justify-content-center">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107421.56789642954!2d74.77756262150848!3d32.71464725582805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391e84bf169d3525%3A0xf233488eeb8fd8d!2sJammu!5e0!3m2!1sen!2sin!4v1703540609162!5m2!1sen!2sin"
          width="1200"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </section>
  );
};

export default Contact;
