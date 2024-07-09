import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';
import API_BASE_URL from '../config';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}api/auth/login/`, {
                username,
                password,
            });
            if (response.status === 200) {
                localStorage.setItem('token', response.data.access);
                localStorage.setItem('user_data', JSON.stringify(response.data.user));
                navigate('/profiles');
                setError('');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            if (error.response) {
                setError('Invalid username or password.');
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h4 className="login-heading">Login</h4>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="login-input"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="login-input"
                />
                <button type="submit" className="login-button">Login</button>
                {error && <p className="error-message">{error}</p>}
            </form>
            <div className="login-options">
                <a href="#" className="forgot-password-link">Forgot password?</a>
                <p className="register-link">
                    Don't have an account? <Link to="/register" className="register-link">Register here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
