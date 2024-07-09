import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Grid, Button, Avatar, Card, CardContent, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import API_BASE_URL from '../config';
import { Send } from '@mui/icons-material';
import './Profile.css';

const Profiles = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [message, setMessage] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}api/auth/users/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [token]);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSubmitMessage = async () => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}api/interests/`,
                {
                    receiver: selectedUser.id,
                    message: message,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            alert('Message sent successfully!');
            handleCloseDialog();
        } catch (error) {
            console.error('Error sending message:', error);
            if (error.response) {
                console.error('Error response:', error.response.data);
            } else {
                console.error('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="profile-container">
            <Grid container spacing={2}>
                {users.map((user) => (
                    <Grid item key={user.id} xs={12} sm={6} md={4} lg={3}>
                        <Card className="profile-card">
                            <CardContent>
                                <Avatar alt={user.username} src={user.profile_photo} className="profile-avatar" />
                                <Typography variant="h6" className="profile-username">
                                    {user.username}
                                </Typography>
                                <Button
                                    variant="contained"
                                    sx={{ mx: 1, backgroundColor: "darkcyan", marginLeft: "45px", marginTop: "20px" }}
                                    startIcon={<Send />}
                                    onClick={() => { setSelectedUser(user); handleOpenDialog(); }}
                                    className="send-message-button"
                                >
                                    Message
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Message Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Send Message to {selectedUser && selectedUser.username}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Message"
                        type="text"
                        fullWidth
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmitMessage} color="primary">
                        Send
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Profiles;
