import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import makeRequest from '../../utils/makeRequest';
import { AUTH_SERVER_API, LOGIN_USER_DETAILS } from '../../constants/apiEndPoints';

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
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
    <div>
      <h1>Login</h1>
      <form action="" method="post" onSubmit={handlSubmit}>
        <input type="text" name="username" value={formData.name} placeholder="Username" onChange={handleChange} />
        <input type="password" name="password" value={formData.password} placeholder="Password" onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
