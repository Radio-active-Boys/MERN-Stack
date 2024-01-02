import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="container mt-5 bg-white d-flex justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <h1 className="display-4">Oops!</h1>
          <p className="lead">The page you are looking for might be temporarily unavailable.</p>
          <img
            src="https://image.freepik.com/free-vector/404-error-abstract-concept-illustration_335657-2243.jpg"
            alt="Error Icon"
            className="img-fluid mt-4"
          />
          <p className="mt-4">
            <NavLink to="/" className="btn btn-primary">
              Go to Home
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
