import { Box, Container, Typography } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckOutForm from './CheckOutForm';


const stripePromise = loadStripe(import.meta.env.VITE_Stripe_Payment)
const CheckOut = () => {
    return (
        <>
            <Container>
                <Box sx={{ my: '120px' }}>
                    <Elements stripe={stripePromise}>
                        <CheckOutForm></CheckOutForm>
                    </Elements>
                </Box>
            </Container>
        </>
    );
};

export default CheckOut;