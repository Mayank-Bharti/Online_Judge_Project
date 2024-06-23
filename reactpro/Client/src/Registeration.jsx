import React, { useState } from 'react';
import './register.css'; 
const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
    organisation: '',
    profilepic: null,
   
  });

  const [formErrors, setFormErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
    organisation: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
     if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form validation and submission logic here
  };

  return (
    <div className="registration-form">
      <div className="logo-container">
        <img src="../public/images/CodeMania.jpg" alt="CodeMania" className="logo" />
        <h1 className="site-name">CodeMania</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={formErrors.username && 'error'}
          />
          {formErrors.username && <span className="error-message">{formErrors.username}</span>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={formErrors.email && 'error'}
          />
          {formErrors.email && <span className="error-message">{formErrors.email}</span>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={formErrors.password && 'error'}
          />
          {formErrors.password && <span className="error-message">{formErrors.password}</span>}
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={formErrors.confirmPassword && 'error'}
          />
          {formErrors.confirmPassword && <span className="error-message">{formErrors.confirmPassword}</span>}
        </div>
        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className={formErrors.dob && 'error'}
          />
          {formErrors.dob && <span className="error-message">{formErrors.dob}</span>}
        </div>
        <div className="form-group">
          <label>Organization</label>
          <input
            type="text"
            name="organisation"
            value={formData.organisation}
            onChange={handleChange}
            className={formErrors.organisation && 'error'}
          />
          {formErrors.organisation && <span className="error-message">{formErrors.organisation}</span>}
        </div>
        <div className="form-group">
          <label>Profile Picture</label>
          <input
            type="file"
            name="profilepic"
            onChange={handleChange}
            className={formErrors.profilepic && 'error'}
          />
          {formErrors.profilepic && <span className="error-message">{formErrors.profilepic}</span>}
        </div>
        <div className="captcha">
          {/* Integrate  captcha service here */}
          <div className="captcha-message">Success!</div>
        </div>
        <button type="submit" className="submit-button">Sign Up</button>
      </form>
      <div className="signin-link">
        <span>Have an account? <a href="/signin">Sign In</a></span>
      </div>
    </div>
  );
};

export default RegistrationForm;
