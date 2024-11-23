import { useState, useEffect } from 'react'
import './App.css'
import api from './services/api';

const App = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const response = await api.get('/test'); // Fetch from backend
                setMessage(response.data.message);
            } catch (error) {
                console.error('Error fetching message:', error);
                setMessage('Error connecting to the backend');
            }
        };

        fetchMessage();
    }, []);

    return (
        <div>
            <h1>Frontend-Backend Connection Test</h1>
            <p>{message}</p>
        </div>
    );
};

export default App;
