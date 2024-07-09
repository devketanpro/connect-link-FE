import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profiles from './components/Profile';
import UserProfile from './components/UserProfile';


const App = () => {
    const token = localStorage.getItem('token');

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profiles" element={<Profiles token={token} />} />
                    <Route path="/profile/:userId" element={<UserProfile />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
