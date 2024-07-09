// Home.js
import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ textAlign: 'center', mt: 5, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: "150px" }}>
            <Typography variant="h2" gutterBottom style={{ fontWeight: "600" }}>
                Welcome to Our Application
            </Typography>
            <Typography variant="h6" gutterBottom>
                This is a minimal full-stack application with Django and React.
            </Typography>
            <Box sx={{ mt: 3 }}>
                <Button
                    variant="contained"
                    onClick={() => navigate('/login')}
                    sx={{ mx: 1, backgroundColor: "darkcyan" }}
                >
                    Login
                </Button>
                <Button
                    variant="contained"
                    onClick={() => navigate('/register')}
                    sx={{ mx: 1, backgroundColor: "darkcyan" }}
                >
                    Register
                </Button>
            </Box>
        </Box>
    );
};

export default Home;
