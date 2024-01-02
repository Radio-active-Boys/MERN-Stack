import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import "./Navbar.css"; // Link to your CSS file
import { useAuth } from '../contextAPI/Auth';

const Navbar = () => {
  const { isLoggedIn } = useAuth();
  return (
    <header>
      <div className="container">
        <div className="logo-brand">
          <NavLink to="/">My website</NavLink>
        </div>
        <nav>
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/work">Work</NavLink></li>
            <li><NavLink to="/contact">Contact Us</NavLink></li>
            {isLoggedIn ? (
              <><li><NavLink to="/logout">Logout</NavLink></li></>
            ) : (
              <>
                <li><NavLink to="/register">Register</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
