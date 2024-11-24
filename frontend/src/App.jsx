import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';

function App() {

  return (
    <Router>
        <Routes>
            <Route path="/" element={<RegisterForm />} />
        </Routes>
    </Router>
  )
}

export default App
