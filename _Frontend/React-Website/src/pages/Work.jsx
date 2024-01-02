import React, { useState, useEffect } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Work = () => {
  const [workData, setWorkData] = useState([]);

  const fetchWorkData = async () => {
    try {
      const response = await fetch('https://mern-backend-avo4.onrender.com/mern/main/work', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setWorkData(data.apiData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchWorkData();
  }, []); // Fetch data when component mounts

  return (
    <>
      <div className="container mt-5" style={{ background: 'white', padding: '20px' }}>
        <div className="row">
          <div className="col-md-8 offset-md-2 text-center">
            <h1 className="display-4">Welcome to My Workpage</h1>
            <p className="lead">Feel free to explore and connect with me!</p>
          </div>
        </div>

        <div className="row mt-5" style={{ background: 'white' }}>
          <div className="col-md-6 offset-md-3 text-center" style={{ background: 'white' }}>
            <img
              src="https://th.bing.com/th/id/OIP.MwXIYeun16gEz6isgzOUKwHaE8?rs=1&pid=ImgDetMain"
              className="img-fluid rounded"
              alt="Welcome Image"
            />
          </div>
        </div>
      </div>

      {/* Separate sections for each work item in three columns */}
      <div className="container mt-5" style={{ background: 'white' }}>
        <div className="row">
          {workData.map((workItem, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-img">
                  <img
                    src="https://th.bing.com/th/id/OIP.tI8spD5GYiVd1XoUuBu2FwHaE9?rs=1&pid=ImgDetMain"
                    alt="our service"
                    width={400}
                  />
                </div>
                <div className="card-datails">
                  <div className="grid grid-two-cols">
                    <p>Expertise: {workItem.expertise}</p>
                    <p>Location: {workItem.location}</p>
                  </div>
                  <h2>{workItem.work}</h2>
                  <p>{workItem.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Work;
