import React, { useState } from 'react';
import './register.css';
import axios from 'axios';

export const Register = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    dob: '',
    organisation: '',
    // profilepic: null,
  });

  const [formErrors, setFormErrors] = useState({
    username: '',
    email: '',
    password: '',
    dob: '',
    organisation: '',
    // profilepic: '',
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setUser({ ...user, [name]: files[0] });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('dob', user.dob);
    formData.append('organisation', user.organisation);
    // formData.append('profilepic', user.profilepic);

    try {
      const response = await axios.post('http://localhost:5000/api/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      const { token, username, userId } = response.data;
      // Store token and user data in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      localStorage.setItem('userId', userId);

      // Redirect to profile page
      window.location.href = '/profile';
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
    }
  };
  
  return (
    <div className="registration-form">
      <div className="logo-container">
        <img src="../images/CodeMania.jpg" alt="CodeMania" className="logo" />
        <h1 className="site-name">CodeMania</h1>
      </div>
      <form onSubmit={handleSubmit} method="POST">
        <div className="form-group">
          <label>Username</label>
          <input type="text" name="username" value={user.username} onChange={handleChange} className={formErrors.username && 'error'} />
          {formErrors.username && <span className="error-message">{formErrors.username}</span>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={user.email} onChange={handleChange} className={formErrors.email && 'error'} />
          {formErrors.email && <span className="error-message">{formErrors.email}</span>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={user.password} onChange={handleChange} className={formErrors.password && 'error'} />
          {formErrors.password && <span className="error-message">{formErrors.password}</span>}
        </div>
        <div className="form-group">
          <label>Date of Birth</label>
          <input type="date" name="dob" value={user.dob} onChange={handleChange} className={formErrors.dob && 'error'} />
          {formErrors.dob && <span className="error-message">{formErrors.dob}</span>}
        </div>
        <div className="form-group">
          <label>Organization</label>
          <input type="text" name="organisation" value={user.organisation} onChange={handleChange} className={formErrors.organisation && 'error'} />
          {formErrors.organisation && <span className="error-message">{formErrors.organisation}</span>}
        </div>
        {/* <div className="form-group">
          <label>Profile Picture</label>
          <input type="file" name="profilepic" value={user.profilepic} onChange={handleChange} className={formErrors.profilepic && 'error'} />
          {formErrors.profilepic && <span className="error-message">{formErrors.profilepic}</span>}
        </div> */}
        <button type="submit" className="submit-button">Sign Up</button>
      </form>
      <div className="signin-link">
        <span>Have an account? <a href="/login">Sign In</a></span>
      </div>
    </div>
  );
};
export default Register;
