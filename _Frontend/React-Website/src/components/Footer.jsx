import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';  
import { useAuth } from '../contextAPI/Auth';

const Footer = () => {
  const {isLoggedIn} = useAuth();
  return (
    <footer className="bg-primary text-light py-3">
        <div className="row justify-content-center bg-primary text-light py-3">
          <div className="col-md-4 text-center">
            <h5>Quick Links</h5>
            <ul className="list-unstyled footer-links">
              <li><NavLink to="/" className="text-white">Home</NavLink></li>
              <li><NavLink to="/work" className="text-white">Work</NavLink></li>
              <li><NavLink to="/contact" className="text-white">Contact Us</NavLink></li>    
            </ul>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            <p className="text-center text-white">Copyright © 2024 - Radio Active Boys</p>
          </div>
        </div>
    </footer>
  );
};

export default Footer;
