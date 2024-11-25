import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const { data } = await api.get('/test');
                setUser(data.message);
            } catch (error) {
                setMessage('Error fetching user details');
            }
        };

        fetchUserDetails();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            {user ? <p>{user}</p> : <p>{message}</p>}
        </div>
    );
};

export default Dashboard;