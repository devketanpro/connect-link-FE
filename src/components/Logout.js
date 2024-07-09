import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import './Logout.css';


const Logout = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Perform logout actions (clear localStorage, etc.)
        localStorage.removeItem('token');
        localStorage.removeItem('user_data');
        // Redirect to login page after logout
        navigate('/');
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogoutClick = () => {
        setOpen(true);
    };

    return (
        <>
            <Button onClick={handleLogoutClick} color="inherit" aria-label="logout">
                Logout
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Logout Confirmation</DialogTitle>
                <DialogContent>
                    Are you sure you want to logout?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        No
                    </Button>
                    <Button onClick={handleLogout} color="primary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Logout;
