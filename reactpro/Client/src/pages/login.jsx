import React, { useState } from 'react';
import './login.css';

const Login = () => {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      
      const data = await response.json();
      if (response.ok) {
        console.log('Login Successful:', data);
      } else {
        console.error('Login error:', data.message);
      }
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  return (
    <div className="login-form">
      <div className="logo-container">
        <img src="../images/CodeMania.jpg" alt="CodeMania" className="logo" />
        <h1 className="site-name">CodeMania</h1>
      </div>
      <form onSubmit={handleSubmit} method="POST">
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            className={formErrors.username && 'error'}
          />
          {formErrors.username && <span className="error-message">{formErrors.username}</span>}
        </div>
        
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className={formErrors.password && 'error'}
          />
          {formErrors.password && <span className="error-message">{formErrors.password}</span>}
        </div>
       
        <button type="submit" className="login-button">Login</button>
      </form>
      <div className="signup-link">
        <span>Not have an account? <a href="/register">Sign Up</a></span>
      </div>
    </div>
  );
};

export default Login;
