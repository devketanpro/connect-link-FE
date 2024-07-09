import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Avatar, Card, CardContent, Box } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import Logout from './Logout';
import './UserProfile.css';
import API_BASE_URL from '../config';

const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const { userId } = useParams();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        } else {
            const fetchUserData = async () => {
                try {
                    const response = await axios.get(`${API_BASE_URL}api/auth/users/${userId}/`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    setUserData(response.data);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };

            if (userId) {
                fetchUserData();
            }
        }
    }, [userId, token, navigate]);

    if (!userData) {
        return null;
    }

    return (
        <div>
            <Card className="user-profile-card">
                <Box className="avatar-container">
                    <Avatar alt={userData?.username} src={userData?.profile_photo} className="avatar" />
                </Box>
                <CardContent>
                    <Typography variant="h4" className="username">{userData?.username}</Typography>
                    <Typography variant="body1" className="user-profile-text">Email: {userData?.email}</Typography>
                    <Typography variant="body1" className="user-profile-text">First Name: {userData?.first_name}</Typography>
                    <Typography variant="body1" className="user-profile-text">Last Name: {userData?.last_name}</Typography>
                </CardContent>
                <Box display="flex" justifyContent="center" padding="16px">
                    <Logout />
                </Box>
            </Card>
        </div>
    );
};

export default UserProfile;
