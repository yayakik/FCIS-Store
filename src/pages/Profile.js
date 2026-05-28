import React, { useState, useEffect } from 'react';
import '../assets/styles/Profile.css';
import { Button, Alert, Slide, Snackbar, useTheme, useMediaQuery } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { getUser } from '../api/getUser';
import { editUserInfo } from '../api/editUserInfo';
function Profile() {
    const [userData, setUserData] = useState({ username: '', email: '', DOB: '', country: '', password: '', _id: '' });
    const [isEditable, setIsEditable] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('success');
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const fillUserInfo = async () => {
            const user = await getUser();
            if (user) {
                setUserData({
                    username: user.username,
                    email: user.email,
                    DOB: user.DOB,
                    country: user.country,
                    password: '',
                    _id: user._id
                });
            }
        }

        fillUserInfo();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSave = async () => {
        const res = await editUserInfo(userData);
        if (res) {
            showAlert('success', 'update');
            setIsEditable(false);
        } else {
            showAlert('error', 'update');
        }
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };
    function showAlert(type, operation) {
        if (type === 'success') {
            setAlertMessage(`User Information ${operation}ed successfully!`);
            setAlertType('success');
        } else if (type) {
            setAlertMessage(`Error ${operation}ing User Information!`);
            setAlertType('error');
        }
        setOpenAlert(true);
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h2>Profile</h2>
            </div>
            <div className="profile-details">
                <h3>User Information</h3>
                <div className="profile-fields">
                    <p><strong>Username:</strong> {isEditable ? <input type="text" name="username" value={userData.username} onChange={handleChange} /> : userData.username}</p>
                    <p><strong>Email:</strong> {isEditable ? <input type="email" name="email" value={userData.email} onChange={handleChange} /> : userData.email}</p>
                    <p><strong>Password:</strong> {isEditable ? <input type="password" name="password" value={userData.password} onChange={handleChange} /> : '************'}</p>
                    <p><strong>Date of Birth:</strong> {isEditable ? <input type="date" name="DOB" value={userData.DOB} onChange={handleChange} /> : userData.DOB}</p>
                    <p><strong>Country:</strong> {isEditable ? <input type="text" name="country" value={userData.country} onChange={handleChange} /> : userData.country}</p>
                </div>
            </div>
            <div className="profile-actions">
                {isEditable ? (
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleSave}
                        fullWidth={isMobile}
                        sx={{
                            minWidth: isMobile ? '100%' : '200px',
                            padding: isMobile ? '12px' : '8px 22px'
                        }}
                    >
                        Save Changes
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setIsEditable(true)}
                        fullWidth={isMobile}
                        sx={{
                            minWidth: isMobile ? '100%' : '200px',
                            padding: isMobile ? '12px' : '8px 22px'
                        }}
                    >
                        Edit Profile
                    </Button>
                )}
            </div>

            <Snackbar
                open={openAlert}
                autoHideDuration={3000}
                onClose={handleCloseAlert}
                anchorOrigin={{
                    vertical: isMobile ? 'bottom' : 'bottom',
                    horizontal: isMobile ? 'center' : 'right'
                }}
                TransitionComponent={Slide}
                sx={{
                    bottom: isMobile ? '16px !important' : '24px'
                }}
            >
                <Alert
                    onClose={handleCloseAlert}
                    severity={alertType}
                    variant="filled"
                    icon={alertType === 'success' ? <CheckCircleOutlineIcon /> : <DangerousIcon />}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>

        </div>
    );
}

export default Profile;
