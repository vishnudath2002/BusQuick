import React, { useState } from 'react';
import useStore from '../store'; 
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { setUser, setError, setLoading } = useStore(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); 

    try {
      const response = await axios.post('http://localhost:5000/auth/login', formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      const data = response.data;
      if (data.result) { 
        setUser(data.result); 
      } else {
        setError('Login failed. Please check your credentials.'); 
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred. Please try again later.'); 
    } finally {
      setLoading(false); 
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
