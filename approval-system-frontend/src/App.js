import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';

const App = () => {  return (
    <div className="App">
      <header className="App-header">
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
      </header>
    </div>
  );
}

export default App;
