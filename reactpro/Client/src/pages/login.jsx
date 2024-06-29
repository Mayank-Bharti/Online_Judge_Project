import React, { useState } from 'react';
import './login.css';

export const Login = () => {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({ 
    username: '',
    password: '',
   });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setUser({
        ...user,
        [name]: files[0],
      });
    } else {
      setUser({
        ...user,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const formData = new FormData();
      // for (const key in user) {
      //   formData.append(key, user[key]);
      // }

      const {username ,password }=user;

      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({username ,password }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error during login:', error);
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
        <span>Not have an account? <a href="/Registration">Sign Up</a></span> 
      </div>
    </div>
  );
};

// export default LoginForm;

