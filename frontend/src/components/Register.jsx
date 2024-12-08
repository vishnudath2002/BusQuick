import React, { useState } from 'react';
import useStore from '../store';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({ email: '', phone: '', password: '' });
  const { setUser, setError, setLoading } = useStore((state) => ({
    setUser: state.setUser,
    setError: state.setError,
    setLoading: state.setLoading
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/auth/register', formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      const data = response.data;
      if (data.result) {
        setUser(data.result);
      } else {
        setError(data.message || 'Registration failed. Please check your details.');
      }
    } catch (error) {
      console.error('Error registering:', error);
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
        type="text"
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
