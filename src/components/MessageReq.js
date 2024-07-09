import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, CardActions, CardContent, Typography, Grid, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';

const MessageRequests = () => {
    const [requests, setRequests] = useState([]);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/login');
        } else {
            fetchRequests();
        }
    }, [token, navigate]);

    const fetchRequests = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}api/interests/received/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setRequests(response.data);
        } catch (error) {
            console.error('Error fetching message requests:', error);
        }
    };

    const handleAccept = async (requestId, senderId) => {
        try {
            navigateToChat(senderId);

            const response = await axios.post(`${API_BASE_URL}api/interests/received/${requestId}/accept/`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Request accepted:', response.data);

            fetchRequests();
        } catch (error) {
            console.error('Error accepting request:', error);
        }
    };

    const handleDecline = async (requestId) => {
        try {
            const response = await axios.post(`${API_BASE_URL}api/interests/received/${requestId}/decline/`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Request declined:', response.data);

            setRequests(requests.filter(request => request.id !== requestId));
        } catch (error) {
            console.error('Error declining request:', error);
        }
    };

    const navigateToChat = (senderId) => {
        navigate(`/chat/${senderId}`);
    };

    return (
        <Container maxWidth="md" style={{ marginTop: '20px' }}>
            <Grid container spacing={3}>
                {requests.map(request => (
                    <Grid item xs={12} key={request.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">From: {request.requested_user}</Typography>
                                <Typography variant="body1">Message: {request.message}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" color="primary" onClick={() => handleAccept(request.id, request.sender_id)}>Accept</Button>
                                <Button variant="contained" color="secondary" onClick={() => handleDecline(request.id)}>Decline</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default MessageRequests;
