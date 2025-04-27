import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'https://dummyjson.com/auth/login',
        {
          username, // Use state for username
          password, // Use state for password
        //   expiresInMins: 30, // Optional parameter
        }
      );
      localStorage.setItem('token', response.data.token);
      navigate('/todos');
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        alert(`Login failed: ${error.response.data.message || 'Invalid credentials'}`);
      } else {
        console.error('Login failed:', error);
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;