import React, { useState } from 'react';
import api from '../services/api.js';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'initiator', // Default role
    });
    const [message, setMessage] = useState('Already Have an account');
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/register', formData);
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Registration failed.');
        }
    };
    const navigate = useNavigate();

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <select name="role" value={formData.role} onChange={handleChange}>
                    <option value="initiator">Initiator</option>
                    <option value="reviewer">Reviewer</option>
                    <option value="approver">Approver</option>
                </select>
                <br></br>
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}  {/* message */}
            <button onClick={() => navigate('/login')} >Login</button>
        </div>
    );
};

export default RegisterForm;