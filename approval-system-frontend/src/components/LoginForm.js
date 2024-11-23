import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../App.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log('Email:', email); // Log email
        console.log('Password:', password); // Log password
        try {
            const response = await api.post('/auth/login', { 
                email,
                password,
            });
            console.log('Response:', response.data); // Log response
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('userRole', response.data.role);
            navigate('/dashboard');
        } catch (error) {
            // Log the entire error object to debug
            console.error('Error during login:', error);
            alert(error.response?.data?.message || "error occurred during login.");
        }
    };

    return (
        <>
        <p>Login</p>
        <form onSubmit={handleLogin}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Login</button>
        </form>
        <br></br>
        <p>Don't Have An Account</p>
        <button onClick={() => navigate('/register')}>Register</button> 
        </>
    );
};

export default LoginForm;
