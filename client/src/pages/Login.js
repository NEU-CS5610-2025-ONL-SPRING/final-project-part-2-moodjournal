import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    console.log(`[Login] handleChange: ${name} = ${value}`);
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log('[Login] submitting form:', form);
    try {
      const res = await axios.post('http://localhost:4000/api/login', form, {
        withCredentials: true,
      });
      console.log('[Login] response:', res);
      console.log('[Login] navigation to /dashboard');
      navigate('/dashboard');
    } catch (err) {
      console.error('[Login] error:', err);
      const errMsg = err.response?.data?.message || 'Login failed';
      console.log('[Login] setting error message:', errMsg);
      setMessage(errMsg);
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>

      {/* Button to go to registration page */}
      <button
        type="button"
        onClick={() => {
          console.log('[Login] navigate to /register');
          navigate('/register');
        }}
        style={{ marginTop: '1rem' }}
      >
        Register
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}
