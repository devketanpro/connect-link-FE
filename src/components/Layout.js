import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import { AccountCircle, Chat, PersonAdd, Home } from '@mui/icons-material';

const useStyles = {
    appBar: {
        backgroundColor: '#2196f3',
    },
    title: {
        flexGrow: 1,
        fontWeight: 'bold',
    },
    iconButton: {
        '&:hover': {
            backgroundColor: '#1565c0',
        },
    },
};

const Layout = () => {
    const navigate = useNavigate();
    const user_data = JSON.parse(localStorage.getItem('user_data'));

    return (
        <div>
            <AppBar position="static" style={useStyles.appBar}>
                <Toolbar
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        backgroundColor: "darkcyan"
                    }}
                >
                    <Typography variant="h6" style={useStyles.title}>
                        Chat App
                    </Typography>
                    <Box>
                        <IconButton
                            color="inherit"
                            aria-label="home"
                            style={useStyles.iconButton}
                            onClick={() => navigate('/')}
                        >
                            <Home />
                        </IconButton>
                        <IconButton
                            color="inherit"
                            aria-label="profile"
                            style={useStyles.iconButton}
                            onClick={() => navigate(`/profile/${user_data?.id}`)}
                        >
                            <AccountCircle />
                        </IconButton>
                        <IconButton
                            color="inherit"
                            aria-label="requests"
                            style={useStyles.iconButton}
                            onClick={() => navigate('/requests')}
                        >
                            <PersonAdd />
                        </IconButton>
                        <IconButton
                            color="inherit"
                            aria-label="chat"
                            style={useStyles.iconButton}
                            onClick={() => navigate('/chat')}
                        >
                            <Chat />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <div style={{ padding: '20px' }}>
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;