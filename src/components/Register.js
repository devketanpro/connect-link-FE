import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import { useNavigate, Link } from 'react-router-dom';
import API_BASE_URL from '../config';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}api/auth/register/`, {
                username,
                password,
                email,
            });
            navigate('/login');
            setError('');
        } catch (error) {
            console.error('Error registering:', error.response.data);
            setError('There was an error registering!');
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h4 className="register-heading">Register</h4>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="register-input"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="register-input"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="register-input"
                />
                <button type="submit" className="register-button">Register</button>
                {error && <p className="error-message">{error}</p>}
            </form>
                <p>
                    Already have an account? <Link to="/login" className="register-link">Login here</Link>
                </p>
        </div>
    );
};

export default Register;
