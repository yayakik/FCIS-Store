import React, { useContext, useState } from 'react';
import '../assets/styles/BuyNow.css';
import { CartContext } from '../context/CartContext';
import { payment } from '../api/payment'
import { Button, Alert, Slide, Snackbar, useTheme, useMediaQuery } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DangerousIcon from '@mui/icons-material/Dangerous';

const BuyNow = () => {
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('success');
    const isMobile = useMediaQuery('(max-width: 600px)');
    const theme = useTheme();
    const { cart, setCart } = useContext(CartContext);

    const handlePayment = async () => {
        console.log(cart.productIds)
        const res = await payment(cart.productIds);
        if (res) {
            showAlert('success', 'paid');
            setCart([]);
        } else {
            showAlert('error', 'paid');
        }
    }


    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };
    function showAlert(type, operation) {
        if (type === 'success') {
            setAlertMessage(`The operation was successful.`);
            setAlertType('success');
        } else if (type) {
            setAlertMessage(`Error The operation.`);
            setAlertType('error');
        }
        setOpenAlert(true);
    };


    return (
        <div className="buy-now-container">
            <h2>Buy Now</h2>

            <div className="payment-methods">
                <h4>Select a payment method:</h4>
                <label><input type="radio" name="payment" defaultChecked /> Cash on Delivery</label>
                <label><input type="radio" name="payment" /> Visa / Mastercard</label>
                <label><input type="radio" name="payment" /> Vodafone Cash</label>
            </div>

            <div className="summary">
                <p style={{ fontWeight: 'bold', textAlign: 'right', color: 'var(--primary-color)' }}>Total Price: {cart?.price || 0} EGP</p>
            </div>

            <Button className="confirm-btn" variant="contained" color="primary" onClick={handlePayment} style={{ background: 'var(--gradient)' }}>Confirm Order</Button>

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

        </div >
    );
};

export default BuyNow;
