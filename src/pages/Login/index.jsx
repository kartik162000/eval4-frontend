/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import makeRequest from '../../utils/makeRequest';
import { AUTH_SERVER_API, LOGIN_USER_DETAILS } from '../../constants/apiEndPoints';
import LoginImage from '../../components/LoginImage';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const handlSubmit = async (e) => {
    e.preventDefault();
    const userData = await makeRequest(AUTH_SERVER_API, LOGIN_USER_DETAILS, { data: formData });
    localStorage.setItem('accessToken', userData.token);
    if (userData.success) { navigate('/dashboard'); }
  };
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  return (
    <div className="fullContainer">
      <LoginImage />
      <div className="loginContainer">
        <h1 className="Heading">Login to your CMS+ account</h1>
        <div className="loginBox">
          <form action="" method="post" onSubmit={handlSubmit}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" value={formData.email} placeholder="email" onChange={handleChange} />
            <label htmlFor="email">Password</label>
            <input type="password" name="password" value={formData.password} placeholder="Password" onChange={handleChange} />
            <button type="submit">Login</button>
            <div className="links">
              <a href="url">Forgot Password</a>
              <br />
              <a href="/register">Register User</a>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}

export default Login;
