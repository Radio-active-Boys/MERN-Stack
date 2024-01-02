import React, { useState } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../contextAPI/Auth';

const Home = () => {
  const [user, setUser] = useState({
    userName:'',
    state:'',
  });
  const [userData,setUserData] = useState(true);

  const { userDataLogged } = useAuth();
  console.log("Data on click  on contact ", userDataLogged);
  if(userData && userDataLogged){
    setUser({
      userName: userDataLogged.firstName,
      state:'',
    });

    setUserData(false);
  }
  // handling the input values
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // handling the submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    alert(JSON.stringify(user));
    // Additional actions can be added here, such as sending form data to a server
  };

  return (
    <div className="container mt-5" style={{ background: 'white', padding: '20px' }}>
      <div className="row">
        <div className="col-md-8 offset-md-2 text-center">
        
          <h1 className="display-3" style={{ color: 'red' }}>{user ? `Hi, ${user.userName}` : 'Hi'}</h1>
          <h3 className="display-6">Welcome to My Homepage</h3>
          <p className="lead">Feel free to explore and connect with me!</p>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-6 offset-md-3 text-center">
          <img
            src="https://th.bing.com/th/id/OIP.MwXIYeun16gEz6isgzOUKwHaE8?rs=1&pid=ImgDetMain" // Placeholder image URL, replace with your actual image URL
            className="img-fluid rounded"
            alt="Welcome Image"
          />
        </div>
      </div>
     </div>
     
  );
};

export default Home;
