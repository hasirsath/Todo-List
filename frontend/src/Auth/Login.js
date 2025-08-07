import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import GoogleLoginButton from '../MyComponents/GoogleLoginButton';


export default function Login({ setAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setAuth(true);
    } catch (err) {
      alert('Invalid credentials');
      console.error('Login error:', err);
    }
  };
  const handleGoogleSuccess = (jwt) => {
    localStorage.setItem('token', jwt);
    setAuth(true);
    alert('Google login success!');
    // You can redirect or update UI here
  };
  return (
    <>
    <div>
      <h2>Login</h2>
       <h3>Or sign in with Google</h3>
      <GoogleLoginButton onSuccess={handleGoogleSuccess}/>
      <h4>OR</h4>
      <form onSubmit={login}>
        <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required /><br/>
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required /><br/>
        <button type="submit">Login</button>
        </form>
        <p>
            Don't have an account? <Link to="/register">Register here</Link>
        </p>

      
    </div>
    </>
  );
}
