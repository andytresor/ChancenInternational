import React, { useState } from 'react';
import '../../style/authstyles/register.css';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    try {
      const response = await axios.post('http://localhost:3000/auth/register', {
        name,
        email,
        password,
      });
      
      console.log('Registration successful:', response.data);
      // Optionally redirect or show a success message
      if(response.data){
        navigate("/student/student-dashboard");
      }

      // Optionally, you might want to store the token in local storage or context
      const  user  = response.data; // Supposons que l'API renvoie l'objet utilisateur complet 
      if (user.id) { // Vérifie que l'utilisateur et son ID existent // Stocker le token et l'ID utilisateur dans le local storage 
        // localStorage.setItem('token', token); 
        localStorage.setItem('userId', user.id); // Stocker l'ID utilisateur

    }
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="register">
      <div className="form-box">
        <form className="form" onSubmit={handleSubmit}>
          <span className="title">Sign up</span>
          <span className="subtitle">Create a free account with your email.</span>
          <div className="form-container">
            <input
              type="text"
              className="input"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              className="input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="error">** {error} **</p>}
          <button type="submit"><NavLink to="/student/student-dashboard">Sign Up</NavLink></button>
        </form>
        <div className="form-section">
          <p>Have an account? <NavLink to="/auth/login">Log in</NavLink></p>
        </div>
      </div>
    </div>
  );
};

export default Register;