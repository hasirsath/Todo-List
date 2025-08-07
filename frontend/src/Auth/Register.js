import React, { useState } from 'react';
import axios from 'axios';

export default function Register({ setAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/auth/register', { email, password });
      localStorage.setItem('token', res.data.token);
      setAuth(true);
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={register}>
        <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required /><br/>
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required /><br/>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
