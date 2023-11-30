import { Box, Container } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckOutForm from './CheckOutForm';
import useAuth from '../../hooks/useAuth';
import { useLoaderData, useParams } from 'react-router-dom';


const stripePromise = loadStripe(import.meta.env.VITE_Stripe_Payment)
const CheckOut = () => {
    const { user } = useAuth()
    const allUsers = useLoaderData()
    const { id } = useParams()
    const singleUser = allUsers.find(user => user._id === id)
    // console.log(singleUser)
    return (
        <>
            <Container>
                <Box height={'100vh'} display={'flex'} sx={{ my: '120px', alignItems: 'center' }}>
                    <Elements stripe={stripePromise}>
                        <CheckOutForm singleUser={singleUser}></CheckOutForm>
                    </Elements>
                </Box>
            </Container>
        </>
    );
};

export default CheckOut;