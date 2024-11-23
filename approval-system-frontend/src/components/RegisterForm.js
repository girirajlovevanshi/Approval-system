import React, { useState } from 'react';
import api from '../services/api';
import '../App.css';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'initiator',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', formData);
            alert('Registration successful! You can now login.');
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <form onSubmit={handleRegister}>
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
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterForm;
