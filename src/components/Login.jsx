import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import { loginUser } from './api.js';  // Import the login function

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();  // Initialize navigate function

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const data = await loginUser(email, password);
      setSuccess(data.message);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Navigate to the home page after successful login
      navigate('/home');  // Replace '/home' with your desired home route
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Login</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>

          <div className="d-flex justify-content-between">
            <a href="/forgot-password" className="text-muted">Forgot Password?</a>
            <a href="/register" className="text-muted">Don't have an account? Register</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
