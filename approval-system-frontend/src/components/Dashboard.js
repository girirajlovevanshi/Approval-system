import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../App.css';

const Dashboard = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const role = localStorage.getItem('userRole');
                const endpoint = role === 'initiator'
                    ? '/applications/my-applications'
                    : '/applications';
                const { data } = await api.get(endpoint);
                setApplications(data);
            } catch (error) {
                alert('Error fetching applications.');
            }
        };

        fetchApplications();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <ul>
                {applications.map((app) => (
                    <li key={app._id}>
                        {app.resume} - {app.status} - {app.currentStage}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
